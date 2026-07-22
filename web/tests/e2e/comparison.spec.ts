import { test, expect } from "@playwright/test";

test.describe("5. Project Comparison Widget", () => {
  test("renders correct headers in Spanish", async ({ page }) => {
    await page.goto("/es");
    const table = page.locator("table");
    await table.scrollIntoViewIfNeeded();

    await expect(table.getByRole("columnheader", { name: "Proyecto" })).toBeVisible();
    await expect(table.getByRole("columnheader", { name: "Dominio" })).toBeVisible();
    await expect(table.getByRole("columnheader", { name: "Stack principal" })).toBeVisible();
    await expect(table.getByRole("columnheader", { name: "Resultado clave" })).toBeVisible();
    await expect(table.getByRole("columnheader", { name: "Rol" })).toBeVisible();
    await expect(table.getByRole("columnheader", { name: "Año" })).toBeVisible();
  });

  test("renders correct headers in English", async ({ page }) => {
    await page.goto("/en");
    const table = page.locator("table");
    await table.scrollIntoViewIfNeeded();

    await expect(table.getByRole("columnheader", { name: "Project" })).toBeVisible();
    await expect(table.getByRole("columnheader", { name: "Domain" })).toBeVisible();
    await expect(table.getByRole("columnheader", { name: "Core stack" })).toBeVisible();
    await expect(table.getByRole("columnheader", { name: "Key result" })).toBeVisible();
    await expect(table.getByRole("columnheader", { name: "Role" })).toBeVisible();
    await expect(table.getByRole("columnheader", { name: "Year" })).toBeVisible();
  });

  test("renders row values matching the project comparative stats", async ({ page }) => {
    await page.goto("/es");
    const table = page.locator("table");
    await table.scrollIntoViewIfNeeded();

    // Verify row for ChurnInsight
    const churninsightRow = table.locator("tr", { hasText: "ChurnInsight" });
    await expect(churninsightRow).toBeVisible();
    await expect(churninsightRow.getByText("Plataforma ML / Data")).toBeVisible();
    await expect(churninsightRow.getByText("Java 17 · Spring Boot · ONNX")).toBeVisible();
    await expect(churninsightRow.getByText("Latencia 2000ms → 20ms · Recall 96%")).toBeVisible();

    // Verify row for NEXIA 2026
    const nexiaRow = table.locator("tr", { hasText: "NEXIA 2026" });
    await expect(nexiaRow).toBeVisible();
    await expect(nexiaRow.getByText("IA aplicada a educacion")).toBeVisible();

    // Verify row for Chakrita
    const chakritaRow = table.locator("tr", { hasText: "Chakrita" });
    await expect(chakritaRow).toBeVisible();
    await expect(chakritaRow.getByText("IoT / Agtech movil")).toBeVisible();
  });

  test("table container supports horizontal scrollability on mobile", async ({ page }) => {
    await page.goto("/es");
    await page.setViewportSize({ width: 375, height: 667 });
    const tableContainer = page.locator(".overflow-x-auto").first();
    await tableContainer.scrollIntoViewIfNeeded();
    
    // The table wrapper has horizontal overflow property
    await expect(tableContainer).toHaveCSS("overflow-x", "auto");
  });
});
