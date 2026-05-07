import { test, expect } from "@playwright/test";

test.describe("Blog Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");
  });

  test("blog page loads successfully", async ({ page }) => {
    const response = await page.goto("/blog");
    expect(response?.status()).toBe(200);
  });

  test("blog page title contains Blog", async ({ page }) => {
    await expect(page).toHaveTitle(/Blog/);
  });

  test("blog page header is visible", async ({ page }) => {
    const header = page.locator("h1");
    await expect(header).toBeVisible();
  });

  test("blog page shows Blog heading or tag heading", async ({ page }) => {
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    const text = await heading.textContent();
    expect(text?.length).toBeGreaterThan(0);
  });

  test("blog page has tag filter section", async ({ page }) => {
    const allFilter = page.locator("a:has-text('All')");
    await expect(allFilter).toBeVisible();
  });

  test("tag filter shows All button", async ({ page }) => {
    const allButton = page.locator("a[href='/blog']:has-text('All')");
    await expect(allButton).toBeVisible();
  });

  test("blog page shows empty state or posts", async ({ page }) => {
    // Since content/posts may be empty, either "No posts found" or post cards should appear
    const noPosts = page.locator("text=No posts found");
    const postCards = page.locator("main a[href^='/blog/']");

    const noPostsVisible = await noPosts.isVisible().catch(() => false);
    const cardsCount = await postCards.count();

    // Either no posts message or at least one post card
    expect(noPostsVisible || cardsCount > 0).toBeTruthy();
  });

  test("navigating to blog from navbar works", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const blogLink = page.locator("header nav a[href='/blog']");
    await blogLink.click();

    await page.waitForURL("/blog");
    expect(page.url()).toContain("/blog");
  });

  test("blog page has navigation bar", async ({ page }) => {
    const nav = page.locator("header nav");
    await expect(nav).toBeVisible();
  });

  test("blog page has footer", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("All tag filter link has correct href", async ({ page }) => {
    const allLink = page.locator("a[href='/blog']");
    await expect(allLink).toBeVisible();
  });

  test("blog page is responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");

    const header = page.locator("h1");
    await expect(header).toBeVisible();
  });

  test("tag filter buttons have correct structure", async ({ page }) => {
    // The tag filter area should exist with at least the "All" link
    const filterArea = page.locator("a[href='/blog']");
    await expect(filterArea).toBeVisible();
  });

  test("blog page description text is present", async ({ page }) => {
    const description = page.locator("p");
    await expect(description.first()).toBeVisible();
  });
});
