import { test, expect } from "@playwright/test";

test.describe("3. SEO Tags & Structured Data", () => {
  test("page title matches localized title", async ({ page }) => {
    await page.goto("/es");
    await expect(page).toHaveTitle(/Ower Frank L[oó]pez Arela/);

    await page.goto("/en");
    await expect(page).toHaveTitle(/Ower Frank L[oó]pez Arela/);
  });

  test("meta description matches localized description", async ({ page }) => {
    await page.goto("/es");
    const esDesc = page.locator('meta[name="description"]');
    await expect(esDesc).toHaveAttribute("content", /backend/i);

    await page.goto("/en");
    const enDesc = page.locator('meta[name="description"]');
    await expect(enDesc).toHaveAttribute("content", /backend/i);
  });

  test("canonical link is correct for current URL", async ({ page }) => {
    await page.goto("/es");
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", "https://owerlopez.dev/es");

    await page.goto("/en");
    const canonicalEn = page.locator('link[rel="canonical"]');
    await expect(canonicalEn).toHaveAttribute("href", "https://owerlopez.dev/en");
  });

  test("alternate link tags exist for supported languages", async ({ page }) => {
    await page.goto("/es");
    const altEs = page.locator('link[rel="alternate"][hreflang="es"]');
    await expect(altEs).toHaveAttribute("href", "https://owerlopez.dev/es");

    const altEn = page.locator('link[rel="alternate"][hreflang="en"]');
    await expect(altEn).toHaveAttribute("href", "https://owerlopez.dev/en");

    const altDefault = page.locator('link[rel="alternate"][hreflang="x-default"]');
    await expect(altDefault).toHaveAttribute("href", "https://owerlopez.dev/es");
  });

  test("open graph metadata tags are present", async ({ page }) => {
    await page.goto("/es");
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "website");
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute("content", /Ower Frank L[oó]pez Arela/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Ower Frank L[oó]pez Arela/);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://owerlopez.dev/es");
  });

  test("json-ld structured data is valid and maps correct Person schema", async ({ page }) => {
    await page.goto("/es");
    const script = page.locator('script[type="application/ld+json"]');
    await expect(script).toBeAttached();

    const textContent = await script.textContent();
    expect(textContent).not.toBeNull();
    const data = JSON.parse(textContent || "{}");

    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("Person");
    expect(data["name"]).toBe("Ower Frank Lopez Arela");
    expect(data["email"]).toBe("owerfrank2004@gmail.com");
  });
});
