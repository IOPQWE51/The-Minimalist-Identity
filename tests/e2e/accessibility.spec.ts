import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
  });

  test("page has a lang attribute on html element", async ({ page }) => {
    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBeTruthy();
    expect(lang).toBe("en");
  });

  test("page has a title", async ({ page }) => {
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test("all images have alt text", async ({ page }) => {
    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const alt = await images.nth(i).getAttribute("alt");
      expect(alt).not.toBeNull();
    }
  });

  test("email input has proper labeling", async ({ page }) => {
    const emailInput = page.locator("input[type='email']");
    await expect(emailInput).toBeVisible();

    const placeholder = await emailInput.getAttribute("placeholder");
    expect(placeholder).toBeTruthy();
  });

  test("command palette trigger has aria-label", async ({ page }) => {
    const cmdButton = page.locator(
      "header button[aria-label='Open command palette']"
    );
    await expect(cmdButton).toBeVisible();
  });

  test("theme toggle has aria-label", async ({ page }) => {
    const themeButton = page.locator(
      "header button[aria-label='Toggle theme']"
    );
    await expect(themeButton).toBeVisible();
  });

  test("mobile menu toggle has aria-label", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const menuButton = page.locator(
      "header button[aria-label='Toggle menu']"
    );
    await expect(menuButton).toBeVisible();
  });

  test("social links have aria-label", async ({ page }) => {
    const socialLinks = page.locator("footer a[aria-label]");
    const count = await socialLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const label = await socialLinks.nth(i).getAttribute("aria-label");
      expect(label).toBeTruthy();
      expect(label.length).toBeGreaterThan(0);
    }
  });

  test("keyboard navigation works - Tab focuses interactive elements", async ({
    page,
  }) => {
    await page.keyboard.press("Tab");

    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();
  });

  test("command palette is keyboard accessible", async ({ page }) => {
    await page.keyboard.press("Control+k");
    const palette = page.locator("input[placeholder*='command']");
    await expect(palette).toBeVisible();

    const focused = page.locator(":focus");
    const tagName = await focused.evaluate((el) => el.tagName);
    expect(tagName).toBe("INPUT");

    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");

    await page.keyboard.press("Escape");
    await expect(palette).not.toBeVisible();
  });

  test("heading hierarchy is correct - h1 exists", async ({ page }) => {
    const h1 = page.locator("h1");
    await expect(h1).toBeVisible();

    const h1Count = await h1.count();
    expect(h1Count).toBe(1);
  });

  test("heading hierarchy - h2 elements exist", async ({ page }) => {
    const h2 = page.locator("h2");
    const count = await h2.count();
    expect(count).toBeGreaterThan(0);
  });

  test("links have discernible text", async ({ page }) => {
    const links = page.locator("a[href]");
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute("aria-label");

      const hasText = text && text.trim().length > 0;
      const hasAria = ariaLabel && ariaLabel.trim().length > 0;
      expect(hasText || hasAria).toBeTruthy();
    }
  });

  test("buttons have discernible text or aria-label", async ({ page }) => {
    const buttons = page.locator("button");
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute("aria-label");

      const hasText = text && text.trim().length > 0;
      const hasAria = ariaLabel && ariaLabel.trim().length > 0;
      expect(hasText || hasAria).toBeTruthy();
    }
  });

  test("page has proper meta description", async ({ page }) => {
    const metaDescription = page.locator("meta[name='description']");
    const content = await metaDescription.getAttribute("content");
    expect(content).toBeTruthy();
    expect(content.length).toBeGreaterThan(0);
  });

  test("page has proper viewport meta tag", async ({ page }) => {
    const viewport = page.locator("meta[name='viewport']");
    await expect(viewport).toBeAttached();
  });

  test("color scheme meta or dark mode support exists", async ({ page }) => {
    const html = page.locator("html");
    const classList = await html.getAttribute("class");
    expect(classList).not.toBeNull();
  });

  test("focus is visible on interactive elements", async ({ page }) => {
    await page.keyboard.press("Tab");

    const focused = page.locator(":focus");
    const count = await focused.count();
    expect(count).toBeGreaterThan(0);
  });

  test("skip to content or main landmark exists", async ({ page }) => {
    const main = page.locator("main");
    await expect(main).toBeVisible();
  });

  test("nav landmark exists", async ({ page }) => {
    const nav = page.locator("header nav");
    await expect(nav).toBeVisible();
  });

  test("footer landmark exists", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});
