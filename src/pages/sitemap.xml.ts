import type { APIRoute } from "astro";

import { getContent, servicePath, SITE_URL } from "../data/content";

export const GET: APIRoute = () => {
  const paths = [
    "/",
    "/en/",
    ...["ar", "en"].flatMap((locale) =>
      getContent(locale).services.items.map((service) =>
        servicePath(service.slug, locale),
      ),
    ),
  ];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${SITE_URL}${path}</loc></url>`).join("")}</urlset>`,
    {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    },
  );
};
