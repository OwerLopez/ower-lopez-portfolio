import { test, expect } from "@playwright/test";

test.describe("8. GitHub Live Integration", () => {
  const profileMock = {
    public_repos: 45,
    followers: 128
  };

  const reposMock = [
    {
      name: "ChurnInsight-Backend",
      html_url: "https://github.com/OwerLopez/ChurnInsight-Backend",
      description: "Plataforma de prediccion de abandono - Java Spring Boot",
      language: "Java",
      stargazers_count: 5,
      forks_count: 2,
      pushed_at: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 days ago
      fork: false
    },
    {
      name: "telecom-churn-ml-pipeline",
      html_url: "https://github.com/OwerLopez/telecom-churn-ml-pipeline",
      description: "Data pipelines and Random Forest training using Python",
      language: "Python",
      stargazers_count: 10,
      forks_count: 1,
      pushed_at: new Date(Date.now() - 3600000 * 24 * 10).toISOString(), // 10 days ago
      fork: false
    },
    {
      name: "novachef-restaurant-platform",
      html_url: "https://github.com/OwerLopez/novachef-restaurant-platform",
      description: "Restaurant management backend with NestJS",
      language: "TypeScript",
      stargazers_count: 0,
      forks_count: 0,
      pushed_at: new Date(Date.now() - 3600000 * 24 * 45).toISOString(), // ~1.5 months ago
      fork: false
    },
    {
      name: "ai-workflow-recorder",
      html_url: "https://github.com/OwerLopez/ai-workflow-recorder",
      description: "Desktop assistant recorder built in Python",
      language: "Python",
      stargazers_count: 2,
      forks_count: 0,
      pushed_at: new Date(Date.now() - 3600000 * 24 * 100).toISOString(), // ~3 months ago
      fork: false
    },
    {
      name: "other-cool-repo",
      html_url: "https://github.com/OwerLopez/other-cool-repo",
      description: "Miscellaneous frontend scripts",
      language: "JavaScript",
      stargazers_count: 1,
      forks_count: 0,
      pushed_at: new Date(Date.now() - 3600000 * 24 * 500).toISOString(), // >1 year ago
      fork: false
    },
    {
      name: "simple-bash-script",
      html_url: "https://github.com/OwerLopez/simple-bash-script",
      description: "Bash scripts helper utilities",
      language: "Shell",
      stargazers_count: 0,
      forks_count: 0,
      pushed_at: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
      fork: false
    }
  ];

  test.beforeEach(async ({ page }) => {
    // Clear session storage to avoid cache hits during tests
    await page.addInitScript(() => {
      window.sessionStorage.clear();
    });
  });

  test("renders public repos and followers count from mock profile", async ({ page }) => {
    await page.route("**/users/OwerLopez", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(profileMock) });
    });
    await page.route("**/users/OwerLopez/repos*", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(reposMock) });
    });

    await page.goto("/es");
    const githubSection = page.locator("#github");
    await githubSection.scrollIntoViewIfNeeded();

    await expect(githubSection.getByText("45")).toBeVisible();
    await expect(githubSection.getByText("128")).toBeVisible();
  });

  test("renders 6 repositories in the grid from mock repos list", async ({ page }) => {
    await page.route("**/users/OwerLopez", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(profileMock) });
    });
    await page.route("**/users/OwerLopez/repos*", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(reposMock) });
    });

    await page.goto("/es");
    const githubSection = page.locator("#github");
    await githubSection.scrollIntoViewIfNeeded();

    await expect(githubSection.getByText("ChurnInsight-Backend")).toBeVisible();
    await expect(githubSection.getByText("telecom-churn-ml-pipeline")).toBeVisible();
    await expect(githubSection.getByText("novachef-restaurant-platform")).toBeVisible();
    await expect(githubSection.getByText("ai-workflow-recorder")).toBeVisible();
    await expect(githubSection.getByText("other-cool-repo")).toBeVisible();
    await expect(githubSection.getByText("simple-bash-script")).toBeVisible();
  });

  test("renders languages, stars, forks, and updated time ago strings", async ({ page }) => {
    await page.route("**/users/OwerLopez", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(profileMock) });
    });
    await page.route("**/users/OwerLopez/repos*", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(reposMock) });
    });

    await page.goto("/es");
    const githubSection = page.locator("#github");
    await githubSection.scrollIntoViewIfNeeded();

    // Verify Star count for first repo
    const churnRepo = githubSection.locator("a", { hasText: "ChurnInsight-Backend" });
    await expect(churnRepo.getByText("5")).toBeVisible();
    await expect(churnRepo.getByText("2")).toBeVisible(); // Fork count
    await expect(churnRepo.getByText("Java")).toBeVisible();

    // Verify relative date (e.g., pushed_at for Simple Bash Script is 1 day ago)
    const simpleBashRepo = githubSection.locator("a", { hasText: "simple-bash-script" });
    // In Spanish, 1 day ago is "hace 1 día" or relative format. Let's assert it contains "hace" or "día" or similar.
    await expect(simpleBashRepo).toContainText(/hace|día|days/);
  });

  test("handles API load failure by displaying error fallback link", async ({ page }) => {
    // Mock API request to fail
    await page.route("**/users/OwerLopez", async (route) => {
      await route.fulfill({ status: 500, body: "Error" });
    });
    await page.route("**/users/OwerLopez/repos*", async (route) => {
      await route.fulfill({ status: 500, body: "Error" });
    });

    await page.goto("/es");
    const githubSection = page.locator("#github");
    await githubSection.scrollIntoViewIfNeeded();

    // Error text should be shown
    await expect(githubSection.getByText("No se pudo cargar GitHub en este momento.")).toBeVisible();
    // Fallback direct link is visible
    const fallbackLink = githubSection.getByRole("link", { name: "github.com/OwerLopez" });
    await expect(fallbackLink).toBeVisible();
    await expect(fallbackLink).toHaveAttribute("href", "https://github.com/OwerLopez");
  });
});
