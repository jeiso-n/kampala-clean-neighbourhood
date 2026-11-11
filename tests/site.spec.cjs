const { test, expect } = require('@playwright/test');

const pages = [
  'index.html', 'about.html', 'schedules.html', 'collectors.html',
  'report.html', 'waste-guide.html', 'recycling.html', 'notices.html',
  'faq.html', 'privacy.html', 'contact.html',
];

test.describe('Kampala Clean Neighbourhood - browser smoke tests', () => {
  for (const path of pages) {
    test(`${path} loads with a title, main content and shared navigation`, async ({ page }) => {
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      const response = await page.goto(`/${path}`);
      expect(response && response.ok(), `${path} should return HTTP 200`).toBeTruthy();
      await expect(page).toHaveTitle(/.+/);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('nav[aria-label="Main Navigation"]')).toBeVisible();
      await expect(page.locator('nav[aria-label="Main Navigation"] a.nav-link')).toHaveCount(9);
      expect(pageErrors, `Uncaught JavaScript errors on ${path}`).toEqual([]);
    });
  }

  test('main navigation links open the expected pages', async ({ page }) => {
    await page.goto('/index.html');
    const links = page.locator('nav[aria-label="Main Navigation"] a.nav-link');
    for (let i = 0; i < await links.count(); i++) {
      const href = await links.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
      const response = await page.request.get(new URL(href, 'http://127.0.0.1:4173').toString());
      expect(response.ok(), `Navigation target ${href} should exist`).toBeTruthy();
    }
  });

  test('report form validates required fields and populates parishes by division', async ({ page }) => {
    await page.goto('/report.html');
    const division = page.locator('#report-division');
    const parish = page.locator('#report-parish');
    await expect(parish).toBeDisabled();
    await division.selectOption('Central');
    await expect(parish).toBeEnabled();
    await expect(parish.locator('option')).toContainText(['Nakasero', 'Kamwokya I']);
    await page.locator('#report-problem-form button[type="submit"]').click();
    await expect(page.locator('#report-category')).toHaveClass(/is-invalid/);
    await expect(page.locator('#report-location')).toHaveClass(/is-invalid/);
  });

  test('contact form shows its clearly labelled demo confirmation', async ({ page }) => {
    await page.goto('/contact.html');
    await page.locator('#contact-name').fill('Playwright Test');
    await page.locator('#contact-email').fill('test@example.com');
    await page.locator('#contact-message').fill('Automated browser test - no real message.');
    await page.locator('#contact-form button[type="submit"]').click();
    await expect(page.locator('#contact-form')).toBeVisible();
    await expect(page.locator('#contact-name')).toHaveValue('');
  });

  for (const viewport of [{ name: 'mobile', width: 390, height: 844 }, { name: 'tablet', width: 768, height: 1024 }, { name: 'desktop', width: 1365, height: 900 }]) {
    test(`homepage renders at ${viewport.name} viewport`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/index.html');
      await expect(page.locator('main')).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
      }));
      expect(dimensions.document, `Horizontal overflow at ${viewport.name}: ${JSON.stringify(dimensions)}`).toBeLessThanOrEqual(dimensions.viewport + 2);
    });
  }
});
