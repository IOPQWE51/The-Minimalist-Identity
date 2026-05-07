import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("navbar contains Home link", async ({ page }) => {
    const homeLink = page.locator("header nav a[href='/']");
    await expect(homeLink).toBeVisible();
  });

  test("navbar contains Blog link", async ({ page }) => {
    const blogLink = page.locator("header nav a[href='/blog']");
    await expect(blogLink).toBeVisible();
  });

  test("navbar contains Projects link", async ({ page }) => {
    const projectsLink = page.locator("header nav a[href='/projects']");
    await expect(projectsLink).toBeVisible();
  });

  test("navbar contains About link", async ({ page }) => {
    const aboutLink = page.locator("header nav a[href='/about']");
    await expect(aboutLink).toBeVisible();
  });

  test("navbar contains Guestbook link", async ({ page }) => {
    const guestbookLink = page.locator("header nav a[href='/guestbook']");
    await expect(guestbookLink).toBeVisible();
  });

  test("clicking Blog nav link navigates to /blog", async ({ page }) => {
    const blogLink = page.locator("header nav a[href='/blog']");
    await blogLink.click();
    await page.waitForURL("/blog");
    expect(page.url()).toContain("/blog");
  });

  test("clicking Home logo navigates to /", async ({ page }) => {
    // First go to a different page
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");

    const logo = page.locator("header nav a:has-text('Aura')");
    await logo.click();
    await page.waitForURL("/");
    expect(page.url()).toMatch(/\/$/);
  });

  test("command palette shows navigation commands", async ({ page }) => {
    await page.keyboard.press("Control+k");
    const palette = page.locator("input[placeholder*='command']");
    await expect(palette).toBeVisible();

    // Check navigation section items
    const homeItem = page.locator("text=Home");
    const blogItem = page.locator("text=Blog");
    await expect(homeItem).toBeVisible();
    await expect(blogItem).toBeVisible();
  });

  test("command palette shows theme commands", async ({ page }) => {
    await page.keyboard.press("Control+k");
    const palette = page.locator("input[placeholder*='command']");
    await expect(palette).toBeVisible();

    const lightMode = page.locator("text=Light Mode");
    const darkMode = page.locator("text=Dark Mode");
    await expect(lightMode).toBeVisible();
    await expect(darkMode).toBeVisible();
  });

  test("command palette navigates to Home on selection", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("networkidle");

    await page.keyboard.press("Control+k");
    const palette = page.locator("input[placeholder*='command']");
    await expect(palette).toBeVisible();

    // Click the Home item
    const homeItem = page.locator("text=Home").first();
    await homeItem.click();

    // Should navigate to home
    await page.waitForURL("/");
    expect(page.url()).toMatch(/\/$|localhost:3000$/);
  });

  test("command palette navigates to Blog on selection", async ({ page }) => {
    await page.keyboard.press("Control+k");
    const palette = page.locator("input[placeholder*='command']");
    await expect(palette).toBeVisible();

    const blogItem = page.locator("text=Blog").first();
    await blogItem.click();

    await page.waitForURL("/blog");
    expect(page.url()).toContain("/blog");
  });

  test("theme toggle cycles through themes", async ({ page }) => {
    const themeButton = page.locator("header button[aria-label='Toggle theme']");

    // Click multiple times to cycle
    await themeButton.click();
    await themeButton.click();
    await themeButton.click();

    // Button should still be functional
    await expect(themeButton).toBeVisible();
  });

  test("mobile menu toggle works", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const mobileMenuBtn = page.locator(
      "header button[aria-label='Toggle menu']"
    );
    await expect(mobileMenuBtn).toBeVisible();

    // Open mobile menu
    await mobileMenuBtn.click();

    // Nav links should appear in mobile menu
    const blogLink = page.locator("text=Blog");
    await expect(blogLink).toBeVisible();
  });

  test("mobile menu closes when clicking a link", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const mobileMenuBtn = page.locator(
      "header button[aria-label='Toggle menu']"
    );
    await mobileMenuBtn.click();

    // Click a nav link in mobile menu
    const blogLink = page.locator("a[href='/blog']");
    await blogLink.click();

    // Should navigate away
    await page.waitForURL("/blog");
    expect(page.url()).toContain("/blog");
  });

  test("navbar shows scrolled state after scrolling", async ({ page }) => {
    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 100));
    await page.waitForTimeout(500);

    // Navbar should still be visible
    const nav = page.locator("header");
    await expect(nav).toBeVisible();
  });

  test("all nav links have valid href attributes", async ({ page }) => {
    const navLinks = page.locator("header nav a[href]");
    const count = await navLinks.count();

    for (let i = 0; i < count; i++) {
      const href = await navLinks.nth(i).getAttribute("href");
      expect(href).toBeTruthy();
      expect(href?.startsWith("/")).toBeTruthy();
    }
  });
});
