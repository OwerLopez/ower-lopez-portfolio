import { test, expect } from "@playwright/test";

test.describe("1. Localization & i18n", () => {
  test("default url redirects to /es", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/es/);
  });

  test("direct url to /en serves English version", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveURL(/\/en/);
    await expect(page.locator("body")).toContainText("Available for Junior Data Engineer & Backend roles");
  });

  test("direct url to /es serves Spanish version", async ({ page }) => {
    await page.goto("/es");
    await expect(page).toHaveURL(/\/es/);
    await expect(page.locator("body")).toContainText("Disponible para roles Junior Data Engineer & Backend");
  });

  test("locale switcher toggles between ES and EN", async ({ page }) => {
    await page.goto("/es");
    const enLink = page.locator("header").getByRole("link", { name: /EN|Switch to English/i });
    await expect(enLink).toBeVisible();
    await enLink.click();
    await expect(page).toHaveURL(/\/en/);

    const esLink = page.locator("header").getByRole("link", { name: /^ES$|Cambiar a Español/i });
    await expect(esLink).toBeVisible();
    await esLink.click();
    await expect(page).toHaveURL(/\/es/);
  });

  test("non-existent route renders 404 page", async ({ page }) => {
    await page.goto("/es/non-existent-page");
    await expect(page.locator("body")).toContainText("404");
  });
});
