import { test, expect } from '@playwright/test';

// Use mobile viewport or desktop - default config in Playwright without .use is standard desktop viewport
// We will test 3 cases as requested

test.describe('Quote Form', () => {

  test('happy path with all fields filled (including phone)', async ({ page }) => {
    let capturedMailto = null;
    page.on('request', req => {
      if (req.url().startsWith('mailto:')) {
        capturedMailto = req.url();
      }
    });

    await page.goto(`file://${process.cwd()}/index.html`);

    // Fill the form
    await page.fill('input[name="name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="phone"]', '123-456-7890');
    await page.selectOption('select[name="service"]', 'Custom PC Build');
    await page.fill('textarea[name="message"]', 'I want a high-end gaming PC.');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for the request to be captured
    await expect.poll(() => capturedMailto).not.toBeNull();

    // Verify the URL
    expect(capturedMailto).toContain('mailto:contact@ecanenterprises.ca');

    // Parse the URL to verify subject and body
    const url = new URL(capturedMailto);
    const subject = url.searchParams.get('subject');
    const body = url.searchParams.get('body');

    expect(subject).toBe('Quote Request: Custom PC Build - John Doe');
    expect(body).toContain('Name: John Doe');
    expect(body).toContain('Email: john@example.com');
    expect(body).toContain('Phone: 123-456-7890');
    expect(body).toContain('Service: Custom PC Build');
    expect(body).toContain('Details:\nI want a high-end gaming PC.');

    // Verify status message is shown
    const statusMsg = page.locator('#form-status');
    await expect(statusMsg).toBeVisible();
  });

  test('happy path without optional phone number', async ({ page }) => {
    let capturedMailto = null;
    page.on('request', req => {
      if (req.url().startsWith('mailto:')) {
        capturedMailto = req.url();
      }
    });

    await page.goto(`file://${process.cwd()}/index.html`);

    // Fill the form (no phone)
    await page.fill('input[name="name"]', 'Jane Doe');
    await page.fill('input[name="email"]', 'jane@example.com');
    await page.selectOption('select[name="service"]', 'Hardware Purchase');
    await page.fill('textarea[name="message"]', 'Looking for an RTX 4090.');

    // Submit the form
    await page.click('button[type="submit"]');

    // Wait for the request to be captured
    await expect.poll(() => capturedMailto).not.toBeNull();

    const url = new URL(capturedMailto);
    const body = url.searchParams.get('body');

    expect(body).toContain('Phone: Not provided');

    // Verify status message is shown
    const statusMsg = page.locator('#form-status');
    await expect(statusMsg).toBeVisible();
  });

  test('form validation failure blocks submission', async ({ page }) => {
    let capturedMailto = null;
    page.on('request', req => {
      if (req.url().startsWith('mailto:')) {
        capturedMailto = req.url();
      }
    });

    await page.goto(`file://${process.cwd()}/index.html`);

    // Only fill name, miss other required fields like email and message
    await page.fill('input[name="name"]', 'Incomplete User');

    // Attempt to submit the form
    await page.click('button[type="submit"]');

    // Wait a bit to ensure no mailto request is fired
    await page.waitForTimeout(500);

    // Verify no request was made
    expect(capturedMailto).toBeNull();

    // Verify status message remains hidden
    const statusMsg = page.locator('#form-status');
    await expect(statusMsg).toBeHidden();
  });
});
