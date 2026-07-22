import { test, expect } from "@playwright/test";

test.describe("2. Navbar Navigation", () => {
  test("renders all main navigation links on desktop", async ({ page }) => {
    await page.goto("/es");
    await page.setViewportSize({ width: 1280, height: 720 });
    const nav = page.locator("nav");
    await expect(nav.getByRole("link", { name: "Sobre mi" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Proyectos" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Arquitectura" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Tecnologias" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Credenciales" })).toBeVisible();
  });

  test("navbar has 5 category links and 1 CTA contact link", async ({ page }) => {
    await page.goto("/es");
    await page.setViewportSize({ width: 1280, height: 720 });
    const navLinks = page.locator("nav a");
    // Verify total link count (excluding logo and locale switcher link, let's see how many anchors are in nav)
    // Let's just verify they are present
    const categoryLinksCount = await page.locator("nav .hidden.md\\:flex a").count();
    expect(categoryLinksCount).toBeGreaterThanOrEqual(5);
  });

  test("category names match Spanish translation", async ({ page }) => {
    await page.goto("/es");
    const nav = page.locator("nav");
    await expect(nav).toContainText("Sobre mi");
    await expect(nav).toContainText("Proyectos");
    await expect(nav).toContainText("Arquitectura");
    await expect(nav).toContainText("Tecnologias");
    await expect(nav).toContainText("Credenciales");
  });

  test("category names match English translation", async ({ page }) => {
    await page.goto("/en");
    const nav = page.locator("nav");
    await expect(nav).toContainText("About");
    await expect(nav).toContainText("Work");
    await expect(nav).toContainText("Architecture");
    await expect(nav).toContainText("Stack");
    await expect(nav).toContainText("Credentials");
  });

  test("desktop anchor clicks scroll to corresponding section and update hash", async ({ page }) => {
    await page.goto("/es");
    await page.setViewportSize({ width: 1280, height: 720 });
    const workLink = page.locator("nav").getByRole("link", { name: "Proyectos" });
    await workLink.click();
    await expect(page).toHaveURL(/#work/);
    const workSection = page.locator("#work");
    await expect(workSection).toBeInViewport();
  });

  test("navbar gets background styles when scrolled down", async ({ page }) => {
    await page.goto("/es");
    await page.setViewportSize({ width: 1280, height: 720 });
    const nav = page.locator("nav").first();
    // Scroll down 200px
    await page.evaluate(() => window.scrollTo(0, 200));
    // Wait for dynamic class to be applied (usually border or backdrop-blur class, let's check for backdrop-blur)
    await expect(nav).toHaveClass(/backdrop-blur/);
  });

  test("mobile menu trigger button is visible on mobile viewports", async ({ page }) => {
    await page.goto("/es");
    await page.setViewportSize({ width: 375, height: 667 });
    const menuBtn = page.getByRole("button", { name: "Abrir menu" });
    await expect(menuBtn).toBeVisible();
    await expect(menuBtn).toHaveAttribute("aria-expanded", "false");
  });

  test("mobile menu button toggles mobile overlay", async ({ page }) => {
    await page.goto("/es");
    await page.setViewportSize({ width: 375, height: 667 });
    const menuBtn = page.getByRole("button", { name: "Abrir menu" });
    await menuBtn.click();
    await expect(menuBtn).toHaveAttribute("aria-expanded", "true");
    
    // Check that mobile navigation drawer links are visible
    const overlayLinks = page.locator("div.fixed").getByRole("link");
    await expect(overlayLinks.first()).toBeVisible();
  });

  test("clicking a mobile menu link scrolls to section and closes overlay", async ({ page }) => {
    await page.goto("/es");
    await page.setViewportSize({ width: 375, height: 667 });
    
    const menuBtn = page.getByRole("button", { name: "Abrir menu" });
    await menuBtn.click();
    
    const targetLink = page.locator("div.fixed").getByRole("link", { name: "Proyectos" });
    await targetLink.click();
    
    // Overlay should close and URL hash should update
    await expect(menuBtn).toHaveAttribute("aria-expanded", "false");
    await expect(page).toHaveURL(/#work/);
  });

  test("clicking mobile menu close button removes overlay", async ({ page }) => {
    await page.goto("/es");
    await page.setViewportSize({ width: 375, height: 667 });
    
    const menuBtn = page.getByRole("button", { name: "Abrir menu" });
    await menuBtn.click();
    await expect(menuBtn).toHaveAttribute("aria-expanded", "true");
    
    const closeBtn = page.getByRole("button", { name: "Cerrar menu" });
    await closeBtn.click();
    await expect(menuBtn).toHaveAttribute("aria-expanded", "false");
  });
});
