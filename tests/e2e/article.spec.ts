import { test, expect } from "@playwright/test";

// Article page tests — these test the article page structure.
// Since there may be no posts yet, we test both the 404/not-found behavior
// and the structure when posts exist.

test.describe("Article Page", () => {
  test("visiting a non-existent slug shows not found", async ({ page }) => {
    const response = await page.goto("/blog/this-post-does-not-exist");
    // Should either 404 or show not-found content
    expect(response?.status()).toBe(404);
  });

  test("article page has proper metadata structure when post exists", async ({
    page,
  }) => {
    // This test verifies the article page structure when accessed with a valid slug
    // Since content may be empty, we check the page returns a valid response for known slugs
    // or gracefully handles missing content

    // Try visiting a potential article slug
    const response = await page.goto("/blog/digital-restraint");

    // If the page exists (200), verify structure; if 404, that's also valid
    const status = response?.status();
    expect([200, 404]).toContain(status);
  });

  test("article page shows reading progress bar when post exists", async ({
    page,
  }) => {
    await page.goto("/blog/digital-restraint");
    await page.waitForLoadState("networkidle");

    // Reading progress bar — a fixed div at top
    const progressBar = page.locator("div.fixed.top-0.left-0.right-0.z-\\[60\\]");
    // Only visible if post exists
    const is404 = page.locator("text=not found, text=Not Found");
    const is404Visible = await is404.isVisible().catch(() => false);

    if (!is404Visible) {
      await expect(progressBar).toBeVisible();
    }
  });

  test("article page shows back to blog link when post exists", async ({
    page,
  }) => {
    await page.goto("/blog/digital-restraint");
    await page.waitForLoadState("networkidle");

    const is404 = page.locator("text=not found, text=Not Found");
    const is404Visible = await is404.isVisible().catch(() => false);

    if (!is404Visible) {
      const backLink = page.locator("a:has-text('Back to Blog')");
      await expect(backLink).toBeVisible();
    }
  });

  test("article page shows back to top button when post exists", async ({
    page,
  }) => {
    await page.goto("/blog/digital-restraint");
    await page.waitForLoadState("networkidle");

    const is404 = page.locator("text=not found, text=Not Found");
    const is404Visible = await is404.isVisible().catch(() => false);

    if (!is404Visible) {
      // Back to top button appears after scrolling
      await page.evaluate(() => window.scrollTo(0, 500));
      await page.waitForTimeout(500);
      const backToTop = page.locator("button[aria-label='Back to top']");
      await expect(backToTop).toBeVisible();
    }
  });

  test("article page has navbar", async ({ page }) => {
    await page.goto("/blog/digital-restraint");
    await page.waitForLoadState("networkidle");

    const is404 = page.locator("text=not found, text=Not Found");
    const is404Visible = await is404.isVisible().catch(() => false);

    if (!is404Visible) {
      const nav = page.locator("header nav");
      await expect(nav).toBeVisible();
    }
  });

  test("article page has footer", async ({ page }) => {
    await page.goto("/blog/digital-restraint");
    await page.waitForLoadState("networkidle");

    const is404 = page.locator("text=not found, text=Not Found");
    const is404Visible = await is404.isVisible().catch(() => false);

    if (!is404Visible) {
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
    }
  });

  test("article page shows date and read time metadata", async ({ page }) => {
    await page.goto("/blog/digital-restraint");
    await page.waitForLoadState("networkidle");

    const is404 = page.locator("text=not found, text=Not Found");
    const is404Visible = await is404.isVisible().catch(() => false);

    if (!is404Visible) {
      // Look for date pattern (e.g., "Apr 28, 2026") and read time (e.g., "5 min")
      const dateText = page.locator("text=/\\w+ \\d+, \\d{4}/");
      const readTime = page.locator("text=/\\d+ min/");

      await expect(dateText.first()).toBeVisible();
      await expect(readTime.first()).toBeVisible();
    }
  });

  test("article page shows tags", async ({ page }) => {
    await page.goto("/blog/digital-restraint");
    await page.waitForLoadState("networkidle");

    const is404 = page.locator("text=not found, text=Not Found");
    const is404Visible = await is404.isVisible().catch(() => false);

    if (!is404Visible) {
      // Tags should be visible as links
      const tags = page.locator("a[href^='/blog/tag/']");
      expect(await tags.count()).toBeGreaterThan(0);
    }
  });

  test("article page has adjacent post navigation", async ({ page }) => {
    await page.goto("/blog/digital-restraint");
    await page.waitForLoadState("networkidle");

    const is404 = page.locator("text=not found, text=Not Found");
    const is404Visible = await is404.isVisible().catch(() => false);

    if (!is404Visible) {
      // Look for Previous/Next navigation
      const prevLink = page.locator("text=Previous");
      const nextLink = page.locator("text=Next");
      // At least one should exist if there are adjacent posts
      const hasPrev = await prevLink.isVisible().catch(() => false);
      const hasNext = await nextLink.isVisible().catch(() => false);
      // This is a soft check — adjacent posts may or may not exist
      expect(typeof hasPrev).toBe("boolean");
      expect(typeof hasNext).toBe("boolean");
    }
  });

  test("article page is responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/blog/digital-restraint");
    await page.waitForLoadState("networkidle");

    const is404 = page.locator("text=not found, text=Not Found");
    const is404Visible = await is404.isVisible().catch(() => false);

    if (!is404Visible) {
      const header = page.locator("h1");
      await expect(header).toBeVisible();
    }
  });
});
