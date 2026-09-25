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

test('mobile menu auto-closes when a link is clicked', async ({ page }) => {
  await page.goto(`file://${process.cwd()}/index.html`);

  const menuBtn = page.locator('#menu-btn');
  const mobileMenu = page.locator('#mobile-menu');

  // Get all links inside the mobile menu
  const menuLinks = mobileMenu.locator('a');
  const linkCount = await menuLinks.count();

  for (let i = 0; i < linkCount; i++) {
    // Reopen menu for this iteration
    await menuBtn.click();

    // Verify menu is visible and expanded is true before clicking link
    await expect(mobileMenu).toBeVisible();
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'true');

    // Click the specific link
    await menuLinks.nth(i).click();

    // Verify menu is hidden and expanded is false after clicking link
    await expect(mobileMenu).toBeHidden();
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
  }

  // Verify button still works to reopen the menu after all clicks
  await menuBtn.click();
  await expect(mobileMenu).toBeVisible();
  await expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
});
