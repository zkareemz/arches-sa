import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:4322",
    browserName: "chromium",
    ...(process.env.PLAYWRIGHT_CHANNEL
      ? { channel: process.env.PLAYWRIGHT_CHANNEL }
      : {}),
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop",
      testIgnore: "hero-video.spec.ts",
      use: { viewport: { width: 1440, height: 1000 } },
    },
    {
      name: "mobile",
      testIgnore: "hero-video.spec.ts",
      use: { ...devices["iPhone 13"], defaultBrowserType: "chromium" },
    },
    {
      name: "webkit",
      testMatch: "hero-video.spec.ts",
      use: {
        browserName: "webkit",
        viewport: { width: 1440, height: 1000 },
      },
    },
  ],
  webServer: {
    command: "node tests/preview.mjs",
    url: "http://127.0.0.1:4322",
    reuseExistingServer: !process.env.CI,
  },
});
