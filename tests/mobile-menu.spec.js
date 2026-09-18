import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 667 } });

test('mobile menu toggle', async ({ page }) => {
  // Load the page
  await page.goto(`file://${process.cwd()}/index.html`);

  // Locate the menu button and the mobile menu
  const menuBtn = page.locator('#menu-btn');
  const mobileMenu = page.locator('#mobile-menu');

  // Verify initial state
  await expect(mobileMenu).toBeHidden();
  await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');

  // Click the menu button to open
  await menuBtn.click();

  // Verify open state
  await expect(mobileMenu).toBeVisible();
  await expect(menuBtn).toHaveAttribute('aria-expanded', 'true');

  // Click the menu button to close
  await menuBtn.click();

  // Verify closed state
  await expect(mobileMenu).toBeHidden();
  await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
});
