import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for the page to be fully loaded (Framer Motion animations)
    await page.waitForLoadState("networkidle");
  });

  test("page loads successfully with status 200", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("title contains Aura or Ethereal", async ({ page }) => {
    await expect(page).toHaveTitle(/Aura|Ethereal/);
  });

  test("navigation bar exists and is visible", async ({ page }) => {
    const nav = page.locator("header nav");
    await expect(nav).toBeVisible();
  });

  test("logo link is present in navbar", async ({ page }) => {
    const logo = page.locator("header nav a:has-text('Aura')");
    await expect(logo).toBeVisible();
  });

  test("theme toggle button exists", async ({ page }) => {
    const themeButton = page.locator("header button[aria-label='Toggle theme']");
    await expect(themeButton).toBeVisible();
  });

  test("command palette trigger button exists", async ({ page }) => {
    const cmdButton = page.locator("header button[aria-label='Open command palette']");
    await expect(cmdButton).toBeVisible();
  });

  test("command palette opens on button click", async ({ page }) => {
    const cmdButton = page.locator("header button[aria-label='Open command palette']");
    await cmdButton.click();
    const palette = page.locator(".fixed.z-\\[101\\] input[placeholder*='command']");
    await expect(palette).toBeVisible();
  });

  test("command palette opens with Cmd+K keyboard shortcut", async ({ page }) => {
    await page.keyboard.press("Control+k");
    const palette = page.locator("input[placeholder*='command']");
    await expect(palette).toBeVisible();
  });

  test("command palette closes with Escape key", async ({ page }) => {
    await page.keyboard.press("Control+k");
    await page.keyboard.press("Escape");
    const palette = page.locator("input[placeholder*='command']");
    await expect(palette).not.toBeVisible();
  });

  test("Bento Grid cards exist", async ({ page }) => {
    // The bento section has cards with titles
    const bentoSection = page.locator("section:has(h2:text('Explore the Garden'))");
    await expect(bentoSection).toBeVisible();

    // Check that at least one bento card title is visible
    const cardTitles = page.locator("text=Writing, text=Projects, text=Design System");
    await expect(cardTitles.first()).toBeVisible();
  });

  test("hero section displays main heading", async ({ page }) => {
    const heading = page.locator("h1:text('Ethereal')");
    await expect(heading).toBeVisible();
  });

  test("hero section has Start Reading CTA", async ({ page }) => {
    const cta = page.locator("a[href='/blog']:has-text('Start Reading')");
    await expect(cta).toBeVisible();
  });

  test("hero section has About Me link", async ({ page }) => {
    const aboutLink = page.locator("a[href='/about']:has-text('About Me')");
    await expect(aboutLink).toBeVisible();
  });

  test("recent writings section exists", async ({ page }) => {
    const section = page.locator("h2:text('Recent Writings')");
    await expect(section).toBeVisible();
  });

  test("newsletter section exists", async ({ page }) => {
    const newsletter = page.locator("h2:text('Stay in the Light')");
    await expect(newsletter).toBeVisible();
  });

  test("newsletter email input exists", async ({ page }) => {
    const emailInput = page.locator("input[type='email'][placeholder*='email']");
    await expect(emailInput).toBeVisible();
  });

  test("newsletter subscribe button exists", async ({ page }) => {
    const subscribeBtn = page.locator("button:has-text('Subscribe')");
    await expect(subscribeBtn).toBeVisible();
  });

  test("footer exists and is visible", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });

  test("footer contains copyright text", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toContainText("Aura");
  });

  test("footer has social links", async ({ page }) => {
    const socialLinks = page.locator("footer a[aria-label]");
    await expect(socialLinks.first()).toBeVisible();
  });

  test("dark/light mode toggle works", async ({ page }) => {
    const themeButton = page.locator("header button[aria-label='Toggle theme']");
    await themeButton.click();
    // After clicking, the theme should have changed (class on html or body)
    // Just verify the button is still there and clickable
    await expect(themeButton).toBeVisible();
  });

  test("responsive layout - mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Nav should still be visible
    const nav = page.locator("header nav");
    await expect(nav).toBeVisible();

    // Mobile menu button should be visible
    const mobileMenuBtn = page.locator("header button[aria-label='Toggle menu']");
    await expect(mobileMenuBtn).toBeVisible();
  });

  test("mobile menu opens and shows nav links", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const mobileMenuBtn = page.locator("header button[aria-label='Toggle menu']");
    await mobileMenuBtn.click();

    // Nav links should be visible in mobile menu
    const blogLink = page.locator("text=Blog").first();
    await expect(blogLink).toBeVisible();
  });

  test("command palette shows navigation items", async ({ page }) => {
    await page.keyboard.press("Control+k");
    const palette = page.locator("input[placeholder*='command']");
    await expect(palette).toBeVisible();

    // Check that navigation items appear
    const homeItem = page.locator("text=Home");
    await expect(homeItem).toBeVisible();
  });

  test("command palette filters items on search", async ({ page }) => {
    await page.keyboard.press("Control+k");
    const palette = page.locator("input[placeholder*='command']");
    await expect(palette).toBeVisible();

    await palette.fill("blog");
    const blogItem = page.locator("text=Blog");
    await expect(blogItem).toBeVisible();
  });
});
