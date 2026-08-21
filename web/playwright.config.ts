import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  /* Run tests sequentially for rock-solid stability on local server */
  fullyParallel: false,
  workers: 1,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Reporter to use. */
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["list"]
  ],
  /* Shared settings for all the projects below. */
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    viewport: { width: 1280, height: 720 },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Run production server before starting the tests */
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000/es",
    reuseExistingServer: true,
    timeout: 60000,
  },
});
