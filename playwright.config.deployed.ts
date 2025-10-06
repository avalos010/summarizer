import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for testing deployed environments
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    // Use deployed URL instead of localhost
    baseURL: process.env.BASE_URL || "https://your-deployed-app.com",
    trace: "on-first-retry",
    // Add extra timeout for deployed environments
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  // Test against deployed environment
  projects: [
    {
      name: "chromium-deployed",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox-deployed",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit-deployed",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  // No local server needed - testing deployed app
  webServer: undefined,
});
