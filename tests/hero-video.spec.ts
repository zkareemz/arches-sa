import { expect, test } from "@playwright/test";

const heroVideo = "[data-hero-video]";
const heroOverlay = "#hero-overlay";
const revealTimeout = 6_000;

test("hero video starts playing after the intro reveal", async ({ page }) => {
  await page.addInitScript(() => {
    window.addEventListener("load", () => {
      const loadedAt = performance.now();
      const overlay = document.querySelector<HTMLElement>("#hero-overlay");
      if (!overlay) return;

      const observer = new MutationObserver(() => {
        if (overlay.style.display !== "none") return;
        Object.assign(window, {
          __heroRevealAfterLoad: performance.now() - loadedAt,
        });
        observer.disconnect();
      });
      observer.observe(overlay, { attributeFilter: ["style"] });
    });
  });

  await page.goto("/");

  const video = page.locator(heroVideo);
  await expect(video).toBeVisible();
  await expect(page.locator(heroOverlay)).toBeHidden({
    timeout: revealTimeout,
  });
  await expect
    .poll(
      () =>
        video.evaluate((element) => (element as HTMLVideoElement).currentTime),
      { timeout: 7_000 },
    )
    .toBeGreaterThan(0.1);

  const revealAfterLoad = await page.evaluate(
    () =>
      (
        window as Window & {
          __heroRevealAfterLoad?: number;
        }
      ).__heroRevealAfterLoad,
  );
  expect(revealAfterLoad).toBeGreaterThanOrEqual(2_900);
});

test("hero reveal completes while video playback is stalled", async ({
  page,
}) => {
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = function () {
      return new Promise<void>(() => {});
    };
  });

  await page.goto("/");

  await expect(page.locator(heroOverlay)).toBeHidden({
    timeout: revealTimeout,
  });
  await expect(page.locator(heroVideo)).toHaveAttribute(
    "data-hero-state",
    "fallback-timeout",
  );
});

test("hero reaches its final state without CSS mask support", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const setProperty = CSSStyleDeclaration.prototype.setProperty;
    CSSStyleDeclaration.prototype.setProperty = function (
      property: string,
      value: string | null,
      priority?: string,
    ) {
      if (property.endsWith("mask-image")) return;
      setProperty.call(this, property, value, priority);
    };
  });

  await page.goto("/");

  await expect(page.locator(heroOverlay)).toBeHidden({
    timeout: revealTimeout,
  });
  await expect(page.locator(heroVideo)).toHaveAttribute(
    "data-hero-state",
    "playing",
  );
});

test("blocked autoplay reveals the static rendered fallback", async ({
  page,
}) => {
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = function () {
      return Promise.reject(
        new DOMException("Simulated autoplay policy", "NotAllowedError"),
      );
    };
  });

  await page.goto("/");

  const video = page.locator(heroVideo);
  await expect(page.locator(heroOverlay)).toBeHidden({
    timeout: revealTimeout,
  });
  await expect(video).toHaveAttribute("data-hero-state", "fallback-policy");
  await expect(video).toHaveAttribute("poster", "/background-video-poster.jpg");
  await expect(video).not.toHaveAttribute("autoplay", "");
});

test("reduced motion immediately uses the static rendered fallback", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const video = page.locator(heroVideo);
  await expect(page.locator(heroOverlay)).toBeHidden();
  await expect(video).toHaveAttribute("data-hero-state", "reduced-motion");
  await expect(video).toHaveJSProperty("paused", true);
  await expect(video).toHaveAttribute("poster", "/background-video-poster.jpg");
});
