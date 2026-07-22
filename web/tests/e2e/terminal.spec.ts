import { test, expect } from "@playwright/test";

test.describe("3. Interactive Terminal Emulator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/es");
  });

  test("terminal container scrolls into view and autotypes ./ower --help", async ({ page }) => {
    const terminal = page.locator(".cursor-text");
    await terminal.scrollIntoViewIfNeeded();
    await expect(page.getByText("./ower --help")).toBeVisible();
  });

  test("terminal completes typing and renders help text", async ({ page }) => {
    const terminal = page.locator(".cursor-text");
    await terminal.scrollIntoViewIfNeeded();
    
    // Wait for the input box to appear (indicating boot completed)
    const input = page.getByRole("textbox", { name: "terminal input" });
    await expect(input).toBeVisible({ timeout: 10000 });
    
    // Help output should be rendered
    await expect(page.getByText("comandos disponibles:")).toBeVisible();
  });

  test("typing help lists available commands", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "terminal input" });
    await expect(input).toBeVisible({ timeout: 10000 });
    
    await input.fill("help");
    await input.press("Enter");
    
    await expect(page.getByText("whoami        → quien soy")).toBeVisible();
  });

  test("typing whoami returns biography details", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "terminal input" });
    await expect(input).toBeVisible({ timeout: 10000 });
    
    await input.fill("whoami");
    await input.press("Enter");
    
    await expect(page.getByText("ower_frank_lopez_arela")).toBeVisible();
    await expect(page.getByText("→ Junior Data Engineer & Backend Developer")).toBeVisible();
  });

  test("typing stack returns backend, database and machine learning tags", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "terminal input" });
    await expect(input).toBeVisible({ timeout: 10000 });
    
    await input.fill("stack");
    await input.press("Enter");
    
    await expect(page.getByText("data:    SQL avanzado · Python · Pandas · Power BI")).toBeVisible();
    await expect(page.getByText("ml:      ONNX Runtime · Random Forest · XAI")).toBeVisible();
  });

  test("typing projects returns churninsight, nexia-2026, and chakrita", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "terminal input" });
    await expect(input).toBeVisible({ timeout: 10000 });
    
    await input.fill("projects");
    await input.press("Enter");
    
    await expect(page.getByText("churninsight/")).toBeVisible();
    await expect(page.getByText("nexia-2026/")).toBeVisible();
    await expect(page.getByText("chakrita/")).toBeVisible();
  });

  test("typing sql returns metric ASCII table", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "terminal input" });
    await expect(input).toBeVisible({ timeout: 10000 });
    
    await input.fill("sql");
    await input.press("Enter");
    
    await expect(page.getByText("┌─────────────────┬───────┐")).toBeVisible();
    await expect(page.getByText("│ sql_avanzado    │  ███  │")).toBeVisible();
    await expect(page.getByText("3 rows · 0.002s")).toBeVisible();
  });

  test("typing peru returns geolocation and volcanic coordinates", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "terminal input" });
    await expect(input).toBeVisible({ timeout: 10000 });
    
    await input.fill("peru");
    await input.press("Enter");
    
    await expect(page.getByText("AREQUIPA, PERU")).toBeVisible();
    await expect(page.getByText("16.40°S 71.53°W · 2,335 m s.n.m.")).toBeVisible();
  });

  test("typing contact returns email and profile status", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "terminal input" });
    await expect(input).toBeVisible({ timeout: 10000 });
    
    await input.fill("contact");
    await input.press("Enter");
    
    await expect(page.getByText("email:    owerfrank2004@gmail.com")).toBeVisible();
    await expect(page.getByText("status:   DISPONIBLE PARA ROLES JUNIOR DATA ENGINEER")).toBeVisible();
  });

  test("typing sudo hire-me prints credentials and recruiter interview instructions", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "terminal input" });
    await expect(input).toBeVisible({ timeout: 10000 });
    
    await input.fill("sudo hire-me");
    await input.press("Enter");
    
    await expect(page.getByText("[sudo] password for recruiter:")).toBeVisible();
    await expect(page.getByText("candidato verificado: 51 certs")).toBeVisible();
  });

  test("typing invalid command displays command not found error in red", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "terminal input" });
    await expect(input).toBeVisible({ timeout: 10000 });
    
    await input.fill("invalidcmd123");
    await input.press("Enter");
    
    await expect(page.getByText("comando no encontrado: invalidcmd123")).toBeVisible();
  });

  test("typing clear removes history lines from terminal output", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "terminal input" });
    await expect(input).toBeVisible({ timeout: 10000 });
    
    await input.fill("whoami");
    await input.press("Enter");
    await expect(page.getByText("ower_frank_lopez_arela")).toBeVisible();
    
    await input.fill("clear");
    await input.press("Enter");
    
    // Check that terminal output lines are cleared
    await expect(page.getByText("ower_frank_lopez_arela")).not.toBeVisible();
  });

  test("arrow keys navigate command history", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "terminal input" });
    await expect(input).toBeVisible({ timeout: 10000 });
    
    await input.fill("whoami");
    await input.press("Enter");
    
    await input.fill("stack");
    await input.press("Enter");
    
    // Press ArrowUp once -> gets "stack"
    await input.press("ArrowUp");
    await expect(input).toHaveValue("stack");
    
    // Press ArrowUp twice -> gets "whoami"
    await input.press("ArrowUp");
    await expect(input).toHaveValue("whoami");
    
    // Press ArrowDown -> gets "stack"
    await input.press("ArrowDown");
    await expect(input).toHaveValue("stack");
  });

  test("clicking a chip button executes the command immediately", async ({ page }) => {
    const input = page.getByRole("textbox", { name: "terminal input" });
    await expect(input).toBeVisible({ timeout: 10000 });
    
    const chipButton = page.getByRole("button", { name: "peru", exact: true });
    await chipButton.click();
    
    await expect(page.getByText("16.40°S 71.53°W · 2,335 m s.n.m.")).toBeVisible();
  });
});

test.describe("3. Interactive Terminal Emulator - Accessibility Media Query", () => {
  test.use({ colorScheme: "dark", prefersReducedMotion: "reduce" });

  test("reduced-motion media query skips typing animation and boots instantly", async ({ page }) => {
    await page.goto("/es");
    // Verify it is immediately booted
    const input = page.getByRole("textbox", { name: "terminal input" });
    await expect(input).toBeVisible();
    await expect(page.getByText("comandos disponibles:")).toBeVisible();
  });
});
