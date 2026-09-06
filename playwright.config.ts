import { defineConfig, devices } from "@playwright/test";

const chromiumChannel = process.env.PLAYWRIGHT_CHANNEL
  ? { channel: process.env.PLAYWRIGHT_CHANNEL }
  : {};

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:4322",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "desktop",
      testIgnore: "hero-video.spec.ts",
      use: {
        browserName: "chromium",
        ...chromiumChannel,
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "mobile",
      testIgnore: "hero-video.spec.ts",
      use: {
        ...devices["iPhone 13"],
        browserName: "chromium",
        ...chromiumChannel,
      },
    },
    {
      name: "hero-chromium",
      testMatch: "hero-video.spec.ts",
      use: {
        browserName: "chromium",
        ...chromiumChannel,
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "hero-webkit",
      testMatch: "hero-video.spec.ts",
      use: {
        browserName: "webkit",
        viewport: { width: 1440, height: 1000 },
      },
    },
    {
      name: "hero-webkit-mobile",
      testMatch: "hero-video.spec.ts",
      use: {
        ...devices["iPhone 13"],
        browserName: "webkit",
      },
    },
  ],
  webServer: {
    command: "node tests/preview.mjs",
    url: "http://127.0.0.1:4322",
    reuseExistingServer: !process.env.CI,
  },
});
