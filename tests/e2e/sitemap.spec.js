const {test, expect} = require('@playwright/test');

test.describe('Sitemap Page', () => {
  test('sitemap page loads and displays sections', async ({page}) => {
    await page.goto('/sitemap/');

    await expect(page.locator('h1:has-text("🗺️ Site Directory")')).toBeVisible();

    // Check for different sections
    await expect(page.locator('h2:has-text("📚 Main Pages")')).toBeVisible();
    await expect(page.locator('h2:has-text("👤 Personal")')).toBeVisible();
    await expect(page.locator('h2:has-text("🔍 Discovery")')).toBeVisible();
    await expect(page.locator('h2:has-text("📝 Recent Posts")')).toBeVisible();
  });

  test('sitemap links are functional', async ({page}) => {
    await page.goto('/sitemap/');

    // Test main page links
    await page.click('a[href="/about/"]:has-text("👋 About")');
    await expect(page).toHaveURL(/\/about\//);

    await page.goto('/sitemap/');
    await page.click('a[href="/blog/"]:has-text("✍️ Blog")');
    await expect(page).toHaveURL(/\/blog\//);
  });

  test('recent posts section shows actual posts', async ({page}) => {
    await page.goto('/sitemap/');

    const recentPostsSection = page.locator('h2:has-text("📝 Recent Posts")').locator('..');

    // Should show recent blog posts
    await expect(recentPostsSection.locator('a:has-text("Markdown Syntax Showcase")')).toBeVisible();
    await expect(recentPostsSection.locator('a:has-text("Building for the Independent Web")')).toBeVisible();
  });
});
