import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: 0,
  workers: 1,
  reporter: [["list"], ["html", { outputFolder: "playwright-report", open: "never" }]],
  use: {
    ...devices["Desktop Chrome"],
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "https://app.wingify.com",
    channel: "chrome",
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    screenshot: "off",
    trace: "off",
    video: "off"
  }
});
