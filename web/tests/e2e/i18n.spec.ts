import { test, expect } from "@playwright/test";

test.describe("1. Localization & i18n", () => {
  test("default url redirects to /es", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/es/);
  });

  test("direct url to /en serves English version", async ({ page }) => {
    await page.goto("/en");
    await expect(page).toHaveURL(/\/en/);
    await expect(page.getByText("OPEN TO JUNIOR DATA ENGINEER ROLES")).toBeVisible();
  });

  test("direct url to /es serves Spanish version", async ({ page }) => {
    await page.goto("/es");
    await expect(page).toHaveURL(/\/es/);
    await expect(page.getByText("DISPONIBLE PARA ROLES JUNIOR DATA ENGINEER")).toBeVisible();
  });

  test("locale switcher toggles languages and updates URL", async ({ page }) => {
    await page.goto("/es");
    const switcher = page.getByRole("group", { name: "Seleccionar idioma" });
    await expect(switcher).toBeVisible();

    const enLink = switcher.getByRole("link", { name: "EN" });
    await enLink.click();
    await expect(page).toHaveURL(/\/en/);

    const esLink = switcher.getByRole("link", { name: "ES" });
    await esLink.click();
    await expect(page).toHaveURL(/\/es/);
  });

  test("locale switcher preserves pathname and hash", async ({ page }) => {
    await page.goto("/es#work");
    const switcher = page.getByRole("group", { name: "Seleccionar idioma" });
    const enLink = switcher.getByRole("link", { name: "EN" });
    await enLink.click();
    await expect(page).toHaveURL(/\/en#work/);
  });

  test("active language switcher link has aria-current='true'", async ({ page }) => {
    await page.goto("/es");
    const switcher = page.getByRole("group", { name: "Seleccionar idioma" });
    const esLink = switcher.getByRole("link", { name: "ES" });
    await expect(esLink).toHaveAttribute("aria-current", "true");
  });

  test("inactive language switcher link does not have aria-current", async ({ page }) => {
    await page.goto("/es");
    const switcher = page.getByRole("group", { name: "Seleccionar idioma" });
    const enLink = switcher.getByRole("link", { name: "EN" });
    await expect(enLink).not.toHaveAttribute("aria-current");
  });

  test("non-existent locale /fr redirects to /es/fr and renders 404", async ({ page }) => {
    await page.goto("/fr");
    await expect(page).toHaveURL(/\/es\/fr/);
    // Let's assert something that indicates 404. Let's look for "404" or localized not found text.
    await expect(page.locator("body")).toContainText("404");
  });
});
