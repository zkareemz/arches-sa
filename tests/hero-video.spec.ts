import { expect, test } from "@playwright/test";

test("hero video is primed before the mask starts revealing it", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.addEventListener("DOMContentLoaded", () => {
      const overlay = document.querySelector<HTMLElement>("#hero-overlay");
      const video =
        document.querySelector<HTMLVideoElement>("[data-hero-video]");
      if (!overlay || !video) return;

      const initialMask = overlay.style.maskImage;
      const observer = new MutationObserver(() => {
        if (overlay.style.maskImage === initialMask) return;

        Object.assign(window, {
          __heroRevealState: {
            paused: video.paused,
            readyState: video.readyState,
          },
        });
        observer.disconnect();
      });
      observer.observe(overlay, { attributeFilter: ["style"] });
    });
  });

  await page.goto("/");

  await expect
    .poll(
      () =>
        page.evaluate(
          () =>
            (
              window as Window & {
                __heroRevealState?: {
                  paused: boolean;
                  readyState: number;
                };
              }
            ).__heroRevealState,
        ),
      { timeout: 4_000 },
    )
    .not.toBeUndefined();

  const revealState = await page.evaluate(
    () =>
      (
        window as Window & {
          __heroRevealState?: {
            paused: boolean;
            readyState: number;
          };
        }
      ).__heroRevealState,
  );
  if (!revealState) throw new Error("The hero mask did not start revealing");

  expect(revealState.readyState).toBeGreaterThanOrEqual(2);
  expect(revealState.paused).toBe(true);
});

test("hero video starts playing after the intro reveal", async ({ page }) => {
  await page.goto("/");

  const video = page.locator("[data-hero-video]");
  await expect(video).toBeVisible();
  await expect
    .poll(
      () =>
        video.evaluate((element) => (element as HTMLVideoElement).currentTime),
      { timeout: 7_000 },
    )
    .toBeGreaterThan(0.1);
});
