import { test, expect } from '@playwright/test';

test('copyright year is current', async ({ page }) => {
  // Load the page
  await page.goto(`file://${process.cwd()}/index.html`);

  // Locate the year element
  const yearElement = page.locator('#year');

  // Verify the year is the current year
  const currentYear = new Date().getFullYear().toString();
  await expect(yearElement).toHaveText(currentYear);
});
