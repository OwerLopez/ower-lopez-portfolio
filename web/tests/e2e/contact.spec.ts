import { test, expect } from "@playwright/test";

test.describe("4. Contact Links & Copy Action", () => {
  test("contact section contains correct email", async ({ page }) => {
    await page.goto("/es");
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    await expect(contactSection.getByText("owerfrank2004@gmail.com")).toBeVisible();
  });

  test("contact cards contain correct social links with secure rel", async ({ page }) => {
    await page.goto("/es");
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    const linkedinLink = contactSection.locator('a[href*="linkedin.com"]').first();
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute("target", "_blank");
    await expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");

    const githubLink = contactSection.locator('a[href*="github.com"]').first();
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute("target", "_blank");
    await expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("clicking copy button shows feedback confirmation", async ({ page }) => {
    await page.goto("/es");
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    const copyBtn = contactSection.getByRole("button", { name: "Copiar" });
    await expect(copyBtn).toBeVisible();
    await copyBtn.click();
    await expect(contactSection.getByText("Copiado")).toBeVisible();
  });
});
