const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const html = readFileSync(require('node:path').join(__dirname, '../index.html'), 'utf8');
const script = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)][0][1];
function setup(clipboard = { writeText: async () => {} }) {
  const elements = new Map();
  for (const [, id] of html.matchAll(/id="([^"]+)"/g)) {
    elements.set(id, { value: '', innerText: '', attrs: {}, select() {},
      setAttribute(k, v) { this.attrs[k] = v; }, classList: { add() {}, remove() {} } });
  }
  const context = vm.createContext({ document: { getElementById: id => elements.get(id) },
    navigator: { clipboard }, setTimeout: () => 0 });
  vm.runInContext(script, context);
  function calculate(values) {
    ['spend', 'aov', 'clicks', 'conversions'].forEach((name, i) => {
      elements.get('calc-' + name).value = String(values[i]);
    });
    context.calculateROAS();
    return ['revenue', 'roas', 'cpa', 'cvr'].map(name => elements.get('res-' + name).innerText);
  }
  return { context, elements, calculate };
}
test('standard campaign and decimal money', () => {
  const { calculate } = setup();
  assert.deepEqual(calculate([15000, 1200, 1250, 45]), ['54,000', '3.60x', '333.33', '3.60%']);
  assert.deepEqual(calculate([10.5, 5.25, 10, 2]), ['10.5', '1.00x', '5.25', '20.00%']);
});
test('undefined ratios are N/A while genuine zero results remain zero', () => {
  const { calculate } = setup();
  assert.deepEqual(calculate([100, 20, 10, 0]), ['0', '0.00x', 'N/A', '0.00%']);
  assert.deepEqual(calculate([0, 20, 0, 2]), ['40', 'N/A', '0.00', 'N/A']);
  assert.deepEqual(calculate([0, 0, 0, 0]), ['0', 'N/A', 'N/A', 'N/A']);
});
test('invalid inputs do not leave misleading or stale results; correction recovers', () => {
  const { calculate, elements } = setup();
  for (const input of [[-1, 20, 10, 2], ['', 20, 10, 2], [100, 20, 1.5, 2],
    [100, 20, 10, 0.5], ['NaN', 20, 10, 2], ['Infinity', 20, 10, 2], [100, 1e308, 10, 2]]) {
    assert.deepEqual(calculate(input), ['N/A', 'N/A', 'N/A', 'N/A']);
    assert.ok(elements.get('calc-error').innerText);
  }
  calculate([100, 20, 10, 2]);
  assert.equal(elements.get('calc-error').innerText, '');
  assert.equal(elements.get('calc-spend').attrs['aria-invalid'], 'false');
});
test('copy waits for clipboard success', async () => {
  let finish;
  const { context, elements } = setup({ writeText: () => new Promise(resolve => { finish = resolve; }) });
  const copying = context.copyText('vid-output', 'vid-copy-status');
  assert.equal(elements.get('vid-copy-status').innerText, 'Copying…');
  finish(); await copying;
  assert.equal(elements.get('vid-copy-status').innerText, 'Copied!');
});
test('denied or unavailable clipboard gives manual-copy guidance', async () => {
  for (const clipboard of [null, { writeText: async () => { throw new Error('denied'); } }]) {
    const { context, elements } = setup(clipboard);
    await context.copyText('img-output', 'img-copy-status');
    assert.match(elements.get('img-copy-status').innerText, /copy it manually/);
  }
});
