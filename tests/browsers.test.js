/* eslint-disable unicorn/prefer-module */
// @ts-check
const { test } = require('@playwright/test');

test('Test browsers', async ({ page }) => {
  await page.goto('http://127.0.0.1:8080');
  await page.pause();
});
