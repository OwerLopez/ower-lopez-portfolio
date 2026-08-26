import { test, expect } from "@playwright/test";

test.describe("5. Work Section & Project Matrix", () => {
  test("renders featured project ChurnInsight", async ({ page }) => {
    await page.goto("/es");
    const workSection = page.locator("#work");
    await workSection.scrollIntoViewIfNeeded();

    await expect(workSection.getByRole("heading", { name: "ChurnInsight" })).toBeVisible();
    await expect(workSection.getByText("96%").first()).toBeVisible();
  });

  test("renders projects in carousel and navigates slides", async ({ page }) => {
    await page.goto("/es");
    const workSection = page.locator("#work");
    await workSection.scrollIntoViewIfNeeded();

    await expect(workSection.getByRole("heading", { name: "ChurnInsight" })).toBeVisible();

    const nextBtn = workSection.getByRole("button", { name: "Proyecto siguiente" });
    await expect(nextBtn).toBeVisible();
    await nextBtn.click();

    await expect(workSection.getByRole("heading", { name: "VisionTransit AI" })).toBeVisible();

    await nextBtn.click();
    await expect(workSection.getByRole("heading", { name: /NEXIA 2026/ })).toBeVisible();
  });

  test("verifies project metrics and modal scrolling", async ({ page }) => {
    await page.goto("/es");
    const workSection = page.locator("#work");
    await workSection.scrollIntoViewIfNeeded();

    await expect(workSection.getByText("96.0% Recall")).toBeVisible();
  });

  test("filters projects by category", async ({ page }) => {
    await page.goto("/es");
    const workSection = page.locator("#work");
    await workSection.scrollIntoViewIfNeeded();

    const backendFilter = workSection.getByRole("button", { name: /Backend & APIs/i });
    await expect(backendFilter).toBeVisible();
    await backendFilter.click();

    await expect(workSection.getByRole("heading", { name: "ChurnInsight" })).toBeVisible();
    await workSection.getByRole("button", { name: "Proyecto siguiente" }).click();
    await expect(workSection.getByRole("heading", { name: /NEXIA 2026/ })).toBeVisible();
  });

  test("runs live ONNX inference simulator", async ({ page }) => {
    await page.goto("/es");
    const workSection = page.locator("#work");
    await workSection.scrollIntoViewIfNeeded();

    const runBtn = workSection.getByRole("button", { name: /Simular Inferencia ONNX/i });
    await expect(runBtn).toBeVisible();
    await runBtn.click();

    // Verify it calculates
    await expect(workSection.getByText("P99 In-Memory Latency:")).toBeVisible();
  });

  test("opens and closes deep dive modal on project click", async ({ page }) => {
    await page.goto("/es");
    const workSection = page.locator("#work");
    await workSection.scrollIntoViewIfNeeded();

    const inspectBtn = workSection.getByTitle("Inspeccionar detalles técnicos").first();
    await expect(inspectBtn).toBeVisible();
    await inspectBtn.click();

    // Modal dialog should be visible with technical info
    await expect(page.getByText("Auditado y verificado en GitHub")).toBeVisible();

    // Close button
    const closeBtn = page.getByRole("button", { name: "Cerrar modal de inspección" });
    await expect(closeBtn).toBeVisible();
    await closeBtn.click();
    await expect(page.getByText("Auditado y verificado en GitHub")).not.toBeVisible();
  });
});
