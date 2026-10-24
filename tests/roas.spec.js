const { test, expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

test.beforeEach(async ({ page }) => {
  const fileUrl = pathToFileURL(
    path.resolve(__dirname, '..', 'index.html')
  ).href;

  await page.goto(fileUrl);
  await page.locator('#tab-roas').click();
});

test('displays the expected default ROAS metrics', async ({ page }) => {
  await expect(page.locator('#res-revenue')).toHaveText('54,000');
  await expect(page.locator('#res-roas')).toHaveText('3.60x');
  await expect(page.locator('#res-cpa')).toHaveText('333.33');
  await expect(page.locator('#res-cvr')).toHaveText('3.60%');
});

test('updates metrics when ad spend changes', async ({ page }) => {
  await page.locator('#calc-spend').fill('10000');

  await expect(page.locator('#res-revenue')).toHaveText('54,000');
  await expect(page.locator('#res-roas')).toHaveText('5.40x');
  await expect(page.locator('#res-cpa')).toHaveText('222.22');
});

test('shows validation errors for negative ad spend', async ({ page }) => {
  await page.locator('#calc-spend').fill('-100');

  await expect(page.locator('#calc-spend-error'))
    .toHaveText('Value cannot be negative. Enter 0 or greater.');

  await expect(page.locator('#calc-spend'))
    .toHaveAttribute('aria-invalid', 'true');

  await expect(page.locator('#res-roas')).toHaveText('—');
});

test('handles zero ad spend without Infinity or NaN', async ({ page }) => {
  await page.locator('#calc-spend').fill('0');

  await expect(page.locator('#res-roas')).toHaveText('0.00x');
  await expect(page.locator('#res-cpa')).toHaveText('0.00');

  await expect(page.locator('#res-roas')).not.toContainText('Infinity');
  await expect(page.locator('#res-roas')).not.toContainText('NaN');
});

test('handles zero conversions', async ({ page }) => {
  await page.locator('#calc-conversions').fill('0');

  await expect(page.locator('#res-revenue')).toHaveText('0');
  await expect(page.locator('#res-roas')).toHaveText('0.00x');
  await expect(page.locator('#res-cpa')).toHaveText('0.00');
  await expect(page.locator('#res-cvr')).toHaveText('0.00%');
});

test('clears validation errors when invalid input is corrected', async ({ page }) => {
  await page.locator('#calc-spend').fill('-100');

  await expect(page.locator('#res-roas')).toHaveText('—');

  await page.locator('#calc-spend').fill('15000');

  await expect(page.locator('#calc-spend-error')).toBeHidden();
  await expect(page.locator('#calc-spend'))
    .toHaveAttribute('aria-invalid', 'false');
  await expect(page.locator('#res-roas')).toHaveText('3.60x');
});