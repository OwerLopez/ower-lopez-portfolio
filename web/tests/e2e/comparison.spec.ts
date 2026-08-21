import { test, expect } from "@playwright/test";

test.describe("5. Work Section & Project Matrix", () => {
  test("renders featured project ChurnInsight", async ({ page }) => {
    await page.goto("/es");
    const workSection = page.locator("#work");
    await workSection.scrollIntoViewIfNeeded();

    await expect(workSection.getByRole("heading", { name: "ChurnInsight" })).toBeVisible();
    await expect(workSection.getByText("96%").first()).toBeVisible();
  });

  test("renders secondary projects in the grid", async ({ page }) => {
    await page.goto("/es");
    const workSection = page.locator("#work");
    await workSection.scrollIntoViewIfNeeded();

    await expect(workSection.getByRole("heading", { name: "NEXIA 2026" })).toBeVisible();
    await expect(workSection.getByRole("heading", { name: "Chakrita" })).toBeVisible();
    await expect(workSection.getByRole("heading", { name: "VisionTransit AI" })).toBeVisible();
    await expect(workSection.getByRole("heading", { name: "GestorTareasPro" })).toBeVisible();
  });

  test("renders comparison matrix table", async ({ page }) => {
    await page.goto("/es");
    const table = page.locator("#work table");
    await table.scrollIntoViewIfNeeded();

    await expect(table).toBeVisible();
    await expect(table.locator("tr", { hasText: "ChurnInsight" })).toBeVisible();
  });
});
