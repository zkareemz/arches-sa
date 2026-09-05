import { expect, test } from "@playwright/test";

const origin = "https://arches.sa";
const slugs = [
  "architectural-design",
  "construction-supervision",
  "interior-design",
];

for (const locale of ["ar", "en"]) {
  const home = locale === "ar" ? "/" : "/en/";
  const paths = [home, ...slugs.map((slug) => `${home}services/${slug}/`)];

  test(`${locale}: all pages have unique, crawlable metadata and working internal links`, async ({
    page,
    request,
  }) => {
    const titles = new Set<string>();
    for (const path of paths) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute(
        "dir",
        locale === "ar" ? "rtl" : "ltr",
      );
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      const title = await page.title();
      expect(titles.has(title)).toBe(false);
      titles.add(title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${origin}${path}`,
      );
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        /\S.{40}/,
      );
      await expect(
        page.locator('meta[name="robots"][content*="noindex"]'),
      ).toHaveCount(0);
      const arPath = path.replace(/^\/en\//, "/");
      await expect(page.locator('link[hreflang="ar"]')).toHaveAttribute(
        "href",
        `${origin}${arPath}`,
      );
      await expect(page.locator('link[hreflang="en"]')).toHaveAttribute(
        "href",
        `${origin}/en${arPath}`,
      );
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        "content",
        `${origin}${path}`,
      );
      const social = await page
        .locator('meta[property="og:image"]')
        .getAttribute("content");
      const image = await request.get(new URL(social!).pathname);
      expect(image.status()).toBe(200);
      expect(image.headers()["content-type"]).toContain("image/png");
      const schema = JSON.parse(
        await page.locator('script[type="application/ld+json"]').innerText(),
      );
      const business = schema["@graph"].find(
        (item: Record<string, unknown>) =>
          item["@type"] === "ProfessionalService",
      );
      expect(business.telephone).toBe("+966559995768");
      expect(business.email).toBe("info@arches.sa");
      expect(business.address.postalCode).toBe("13315");
      if (path.includes("/services/")) {
        expect(
          schema["@graph"].some(
            (item: Record<string, unknown>) =>
              item["@type"] === "BreadcrumbList",
          ),
        ).toBe(true);
      }
      const links = await page
        .locator('a[href^="/"]')
        .evaluateAll((anchors) => anchors.map((a) => a.getAttribute("href")!));
      for (const href of new Set(links)) {
        const target = new URL(href, "http://127.0.0.1:4322");
        expect((await request.get(target.pathname)).status(), href).toBe(200);
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1,
        ),
      ).toBe(true);
      if (path === home || path.endsWith("/architectural-design/")) {
        if (path === home) {
          const layers = await page.evaluate(() => {
            const style = (selector: string) =>
              getComputedStyle(document.querySelector(selector)!);
            return {
              overlay: Number(style("#hero-overlay").zIndex),
              scrim: Number(style(".hero__scrim").zIndex),
              opacity: style(".hero__scrim").opacity,
            };
          });
          expect(layers.scrim).toBeGreaterThan(layers.overlay);
          expect(layers.opacity).toBe("1");
        }
        await page.evaluate(() => document.fonts.ready);
        await page.screenshot({
          path: test
            .info()
            .outputPath(path === home ? "home.png" : "service.png"),
          animations: "disabled",
        });
      }
    }
  });

  test(`${locale}: homepage retains its sections, blocks, service anchors and form`, async ({
    page,
  }) => {
    await page.goto(home);
    expect(
      await page
        .locator("main > section")
        .evaluateAll((sections) =>
          sections.map((section) => section.id || "hero"),
        ),
    ).toEqual([
      "hero",
      "about",
      "services",
      "why",
      "projects",
      "award",
      "team",
      "contact",
    ]);
    await expect(page.locator("#about h3")).toHaveCount(3);
    await expect(page.locator("#services article")).toHaveCount(3);
    await expect(page.locator("#services h4")).toHaveCount(12);
    await expect(page.locator("#why h3")).toHaveCount(4);
    await expect(page.locator("#projects [data-cat-index]")).toHaveCount(3);
    await expect(page.locator("#team img")).toHaveCount(2);
    for (const name of ["name", "email", "message"])
      await expect(page.locator(`[name="${name}"]`)).toHaveCount(1);
    for (const index of ["01", "02", "03"])
      await expect(page.locator(`#service-${index}`)).toHaveCount(1);
    await page.locator("[data-navigation] summary").click();
    await expect(page.locator("[data-navigation] nav")).toBeVisible();
    await page
      .locator(
        `[data-navigation] a[href="${home}services/architectural-design/"]`,
      )
      .click();
    await expect(page).toHaveURL(/\/services\/architectural-design\/$/);
    await page.locator("header > a").first().click();
    await expect(page).toHaveURL(
      locale === "ar"
        ? /\/en\/services\/architectural-design\/$/
        : /4322\/services\/architectural-design\/$/,
    );
  });

  test(`${locale}: preserved form hands the enquiry to WhatsApp without sending it`, async ({
    page,
  }) => {
    await page.goto(home);
    await page.locator('[name="name"]').fill("SEO test visitor");
    await page.locator('[name="email"]').fill("visitor@example.com");
    await page
      .locator('[name="message"]')
      .fill("Test villa enquiry & layout requirements");
    let destination = "";
    await page.route("https://wa.me/**", (route) => {
      destination = route.request().url();
      return route.fulfill({
        status: 200,
        contentType: "text/plain",
        body: "WhatsApp destination intercepted; no enquiry sent.",
      });
    });
    await page.locator("[data-submit]").click();
    await expect.poll(() => destination).not.toBe("");
    const url = new URL(destination);
    expect(url.pathname).toBe("/966559995768");
    expect(url.searchParams.get("text")).toContain(
      "Test villa enquiry & layout requirements",
    );
    expect(url.searchParams.get("text")).toContain("visitor@example.com");
  });
}

test("sitemap lists all eight content pages and 404 stays excluded", async ({
  request,
  page,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml.match(/<loc>/g)).toHaveLength(8);
  expect(xml).not.toContain("404");
  expect(xml).not.toContain("web.app");
  expect(await (await request.get("/robots.txt")).text()).toContain(
    `${origin}/sitemap.xml`,
  );
  const response = await page.goto("/not-a-real-page/");
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, follow",
  );
});

test("homepage and service content remain visible without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  for (const path of ["/", "/services/architectural-design/"]) {
    await page.goto(`http://127.0.0.1:4322${path}`);
    await expect(page.locator("h1")).toBeVisible();
    for (const element of await page.locator("[data-reveal]").all()) {
      await expect(element).toHaveCSS("opacity", "1");
    }
    await page.locator("[data-navigation] summary").click();
    await expect(page.locator("[data-navigation] nav")).toBeVisible();
  }
  await context.close();
});
