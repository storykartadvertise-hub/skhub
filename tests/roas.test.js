
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/function calculateROAS\(\)\s*\{[\s\S]*?\n        \}/);

if (!match) {
    throw new Error('calculateROAS() function not found in index.html');
}

function createElement(value = '') {
    return {
        value: String(value),
        innerText: '',
        textContent: '',
        hidden: false,
        validity: { badInput: false },
        attributes: {},
        setCustomValidity(message) {
            this.customError = message;
        },
        setAttribute(name, value) {
            this.attributes[name] = value;
        }
    };
}

function setup(values = {}) {
    const elements = {};
    const defaults = {
        'calc-spend': 15000,
        'calc-aov': 1200,
        'calc-clicks': 1250,
        'calc-conversions': 45
    };

    for (const [id, value] of Object.entries({ ...defaults, ...values })) {
        elements[id] = createElement(value);
        elements[`${id}-error`] = createElement();
    }

    for (const id of ['res-revenue', 'res-roas', 'res-cpa', 'res-cvr']) {
        elements[id] = createElement();
    }

    const document = {
        getElementById(id) {
            if (!elements[id]) {
                throw new Error(`Unexpected element ID: ${id}`);
            }
            return elements[id];
        }
    };

    vm.runInNewContext(`${match[0]}; calculateROAS();`, { document });

    return elements;
}

test('valid inputs calculate expected metrics', () => {
    const e = setup();

    assert.equal(e['res-revenue'].innerText, '54,000');
    assert.equal(e['res-roas'].innerText, '3.60x');
    assert.equal(e['res-cpa'].innerText, '333.33');
    assert.equal(e['res-cvr'].innerText, '3.60%');
});

test('negative ad spend shows validation and clears results', () => {
    const e = setup({ 'calc-spend': -1 });

    assert.match(e['calc-spend-error'].textContent, /cannot be negative/i);
    assert.equal(e['calc-spend-error'].hidden, false);
    assert.equal(e['calc-spend'].attributes['aria-invalid'], 'true');

    for (const id of ['res-revenue', 'res-roas', 'res-cpa', 'res-cvr']) {
        assert.equal(e[id].innerText, '—');
    }
});

test('zero ad spend does not produce Infinity or NaN', () => {
    const e = setup({ 'calc-spend': 0 });

    assert.equal(e['res-roas'].innerText, '0.00x');
    assert.doesNotMatch(
        Object.values(e).map(x => x.innerText).join(' '),
        /Infinity|NaN/
    );
});

test('zero conversions produce zero CPA and revenue', () => {
    const e = setup({ 'calc-conversions': 0 });

    assert.equal(e['res-revenue'].innerText, '0');
    assert.equal(e['res-cpa'].innerText, '0.00');
    assert.equal(e['res-cvr'].innerText, '0.00%');
});

test('correcting negative input restores calculated results', () => {
    const e = setup({ 'calc-spend': -1 });

    e['calc-spend'].value = '15000';
    vm.runInNewContext(`${match[0]}; calculateROAS();`, {
        document: {
            getElementById(id) {
                return e[id];
            }
        }
    });

    assert.equal(e['calc-spend-error'].hidden, true);
    assert.equal(e['calc-spend'].attributes['aria-invalid'], 'false');
    assert.equal(e['res-roas'].innerText, '3.60x');
});
