import { expect, test } from "@playwright/test";

for (const [locale, path, videoTitle] of [
  ["ar", "/", "فيلا السليمانية"],
  ["en", "/en/", "Alsulimania Villa"],
] as const) {
  test(`${locale}: project video gallery renders its featured film`, async ({
    page,
  }) => {
    await page.route("https://www.youtube-nocookie.com/**", (route) =>
      route.abort(),
    );
    await page.goto(path);

    const video = page.locator("#projects figure iframe");
    await expect(video).toHaveCount(1);
    await expect(video).toHaveAttribute("title", videoTitle);
    await expect(video).toHaveAttribute(
      "src",
      /youtube-nocookie\.com\/embed\/hzozCJQtmS8\?modestbranding=1&rel=0/,
    );
    await expect(video).not.toHaveAttribute("src", /autoplay/);
    await expect(page.locator("#projects figure figcaption")).toHaveText(
      videoTitle,
    );
    await expect(page.locator("#projects [data-video-trigger]")).toHaveCount(0);
    await expect(page.locator("#video-gallery-modal")).toHaveCount(0);
  });
}
