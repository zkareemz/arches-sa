import { expect, test } from "@playwright/test";

for (const [locale, path, firstTitle] of [
  ["ar", "/", "فيلا السليمانية 3"],
  ["en", "/en/", "فيلا السليمانية 3"],
] as const) {
  test(`${locale}: project video gallery opens and closes its selected film`, async ({
    page,
  }) => {
    await page.route("https://www.youtube-nocookie.com/**", (route) =>
      route.abort(),
    );
    await page.goto(path);

    const cards = page.locator("#projects [data-video-trigger]");
    await expect(cards).toHaveCount(3);
    await expect(cards.first()).toHaveAccessibleName(new RegExp(firstTitle));

    await cards.first().click();

    const modal = page.locator("#video-gallery-modal");
    await expect(modal).toBeVisible();
    await expect(modal.locator("#video-gallery-title")).toHaveText(firstTitle);
    await expect(modal.locator("iframe")).toHaveAttribute(
      "src",
      /youtube-nocookie\.com\/embed\/Rp5MGOSAg5o\?autoplay=1/,
    );

    await modal.locator("[data-video-close]").click();
    await expect(modal).toBeHidden();
    await expect(modal.locator("iframe")).toHaveCount(0);
  });
}
