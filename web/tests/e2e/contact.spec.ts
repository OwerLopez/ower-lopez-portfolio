import { test, expect } from "@playwright/test";

test.describe("7. Contact Links & Interactions", () => {
  test("contact actions contain correct email anchor link", async ({ page }) => {
    await page.goto("/es");
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    const emailCta = contactSection.getByRole("link", { name: "Escribeme" });
    await expect(emailCta).toBeVisible();
    await expect(emailCta).toHaveAttribute("href", "mailto:owerfrank2004@gmail.com");

    const emailTextLink = contactSection.locator('a[href="mailto:owerfrank2004@gmail.com"]').last();
    await expect(emailTextLink).toContainText("owerfrank2004@gmail.com");
  });

  test("contact actions contain correct linkedin anchor link", async ({ page }) => {
    await page.goto("/es");
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    const linkedinCta = contactSection.getByRole("link", { name: "LinkedIn" });
    await expect(linkedinCta).toBeVisible();
    await expect(linkedinCta).toHaveAttribute("href", "https://www.linkedin.com/in/owerfrank-data/");
  });

  test("contact actions contain correct github anchor link", async ({ page }) => {
    await page.goto("/es");
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    const githubCta = contactSection.getByRole("link", { name: "GitHub" });
    await expect(githubCta).toBeVisible();
    await expect(githubCta).toHaveAttribute("href", "https://github.com/OwerLopez");
  });

  test("external links have secure rel attributes", async ({ page }) => {
    await page.goto("/es");
    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();

    const linkedinCta = contactSection.getByRole("link", { name: "LinkedIn" });
    await expect(linkedinCta).toHaveAttribute("target", "_blank");
    await expect(linkedinCta).toHaveAttribute("rel", "noopener noreferrer");

    const githubCta = contactSection.getByRole("link", { name: "GitHub" });
    await expect(githubCta).toHaveAttribute("target", "_blank");
    await expect(githubCta).toHaveAttribute("rel", "noopener noreferrer");
  });
});
