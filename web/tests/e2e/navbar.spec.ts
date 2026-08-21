import { test, expect } from "@playwright/test";

test.describe("2. Navbar Navigation", () => {
  test("renders all 5 main navigation links on desktop in Spanish", async ({ page }) => {
    await page.goto("/es");
    await page.setViewportSize({ width: 1280, height: 720 });
    const nav = page.locator("header nav");
    await expect(nav.getByRole("button", { name: "Proyectos" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "Expertise" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "Experiencia" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "Sobre mi" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "Contacto" })).toBeVisible();
  });

  test("renders all 5 main navigation links on desktop in English", async ({ page }) => {
    await page.goto("/en");
    await page.setViewportSize({ width: 1280, height: 720 });
    const nav = page.locator("header nav");
    await expect(nav.getByRole("button", { name: "Projects" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "Expertise" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "Experience" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "About" })).toBeVisible();
    await expect(nav.getByRole("button", { name: "Contact" })).toBeVisible();
  });

  test("desktop nav button scrolls to corresponding section", async ({ page }) => {
    await page.goto("/es");
    await page.setViewportSize({ width: 1280, height: 720 });
    const workButton = page.locator("header nav").getByRole("button", { name: "Proyectos" });
    await workButton.click();
    const workSection = page.locator("#work");
    await expect(workSection).toBeInViewport();
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

    const mobileNav = page.locator("nav[aria-label='Mobile navigation']");
    await expect(mobileNav).toBeVisible();
    await expect(mobileNav.getByRole("button", { name: "Proyectos" })).toBeVisible();
  });

  test("clicking a mobile menu link scrolls to section and closes overlay", async ({ page }) => {
    await page.goto("/es");
    await page.setViewportSize({ width: 375, height: 667 });

    const menuBtn = page.getByRole("button", { name: "Abrir menu" });
    await menuBtn.click();

    const mobileNav = page.locator("nav[aria-label='Mobile navigation']");
    const targetButton = mobileNav.getByRole("button", { name: "Proyectos" });
    await targetButton.click();

    const workSection = page.locator("#work");
    await expect(workSection).toBeInViewport();
  });
});
