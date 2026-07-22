import { test, expect } from "@playwright/test";

test.describe("4. Reaction Bar", () => {
  test("renders three reaction buttons with mock count values", async ({ page }) => {
    // Intercept GET for each reaction key
    await page.route("**/v1/owerlopez-portfolio/react-fire/", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 12 }) });
    });
    await page.route("**/v1/owerlopez-portfolio/react-rocket/", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 34 }) });
    });
    await page.route("**/v1/owerlopez-portfolio/react-heart/", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 56 }) });
    });

    await page.goto("/es");
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    const fireBtn = page.getByRole("button", { name: "Impresionante (12)" });
    const rocketBtn = page.getByRole("button", { name: "Contratable (34)" });
    const heartBtn = page.getByRole("button", { name: "Me encanta (56)" });

    await expect(fireBtn).toBeVisible();
    await expect(rocketBtn).toBeVisible();
    await expect(heartBtn).toBeVisible();
  });

  test("clicking a reaction button performs optimistic update instantly", async ({ page }) => {
    await page.route("**/v1/owerlopez-portfolio/react-fire/", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 10 }) });
    });
    await page.route("**/v1/owerlopez-portfolio/react-rocket/", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 20 }) });
    });
    await page.route("**/v1/owerlopez-portfolio/react-heart/", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 30 }) });
    });

    // Mock voting API up trigger to delay 2 seconds to prove optimistic update
    await page.route("**/v1/owerlopez-portfolio/react-fire/up", async (route) => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 11 }) });
    });

    await page.goto("/es");
    const fireBtn = page.getByRole("button", { name: "Impresionante (10)" });
    await fireBtn.scrollIntoViewIfNeeded();
    await fireBtn.click();

    // The count should instantly increase to 11 in the UI before network resolves
    await expect(page.getByRole("button", { name: "Impresionante (11)" })).toBeVisible();
  });

  test("clicking a reaction button disables the button", async ({ page }) => {
    await page.route("**/v1/owerlopez-portfolio/react-fire/", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 5 }) });
    });
    await page.route("**/v1/owerlopez-portfolio/react-rocket/", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 10 }) });
    });
    await page.route("**/v1/owerlopez-portfolio/react-heart/", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 15 }) });
    });
    await page.route("**/v1/owerlopez-portfolio/react-fire/up", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 6 }) });
    });

    await page.goto("/es");
    const fireBtn = page.getByRole("button", { name: "Impresionante (5)" });
    await fireBtn.scrollIntoViewIfNeeded();
    await fireBtn.click();

    await expect(fireBtn).toBeDisabled();
  });

  test("voted state persists using localStorage across page reloads", async ({ page }) => {
    await page.route("**/v1/owerlopez-portfolio/react-fire/", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 100 }) });
    });
    await page.route("**/v1/owerlopez-portfolio/react-rocket/", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 100 }) });
    });
    await page.route("**/v1/owerlopez-portfolio/react-heart/", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 100 }) });
    });
    await page.route("**/v1/owerlopez-portfolio/react-heart/up", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 101 }) });
    });

    await page.goto("/es");
    const heartBtn = page.getByRole("button", { name: "Me encanta (100)" });
    await heartBtn.scrollIntoViewIfNeeded();
    await heartBtn.click();
    
    // Verify it is disabled
    await expect(heartBtn).toBeDisabled();

    // Reload page
    await page.reload();

    const heartBtnReloaded = page.getByRole("button", { name: "Me encanta (100)" });
    await expect(heartBtnReloaded).toBeDisabled();
  });

  test("network failures on voting (GET up) do not crash the UI", async ({ page }) => {
    await page.route("**/v1/owerlopez-portfolio/react-fire/", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 10 }) });
    });
    await page.route("**/v1/owerlopez-portfolio/react-rocket/", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 10 }) });
    });
    await page.route("**/v1/owerlopez-portfolio/react-heart/", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ count: 10 }) });
    });
    // Force up to fail with 500
    await page.route("**/v1/owerlopez-portfolio/react-fire/up", async (route) => {
      await route.fulfill({ status: 500, contentType: "application/json", body: "Server Error" });
    });

    await page.goto("/es");
    const fireBtn = page.getByRole("button", { name: "Impresionante (10)" });
    await fireBtn.scrollIntoViewIfNeeded();
    await fireBtn.click();

    // UI should keep the optimistic vote and not crash
    await expect(page.getByRole("button", { name: "Impresionante (11)" })).toBeVisible();
    await expect(fireBtn).toBeDisabled();
  });

  test("failure loading initial counts hides the reaction bar completely", async ({ page }) => {
    // Force GET counts to fail
    await page.route("**/v1/owerlopez-portfolio/react-fire/", async (route) => {
      await route.abort("failed");
    });

    await page.goto("/es");
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    // The reaction bar buttons should not be in the DOM
    const fireBtn = page.getByRole("button", { name: /Impresionante/ });
    await expect(fireBtn).not.toBeAttached();
  });
});
