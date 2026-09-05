# Arches SEO implementation plan

Status: implemented locally; validation and production follow-up are recorded in [SEO release](seo-release.md). Business and targeting decisions are recorded in [SEO discovery](seo-discovery.md).

Hard constraint: preserve every existing homepage section and content block in its current order, including the enquiry form. Refine wording and add service links without deleting existing content. This supersedes the earlier proposal to replace the form.

## Content and pages

Keep the current visual identity. Develop the Arabic copy first, then derive matching English content and business facts from it.

| Page                               | Proposed Arabic title                              | Route                                 |
| ---------------------------------- | -------------------------------------------------- | ------------------------------------- |
| Home                               | أقواس — مكتب هندسي في الرياض لتصميم الفلل والإشراف | `/`                                   |
| Architectural design               | تصميم فلل في الرياض — التصميم المعماري من أقواس    | `/services/architectural-design/`     |
| Project management and supervision | إشراف هندسي وإدارة مشاريع البناء بالرياض — أقواس   | `/services/construction-supervision/` |
| Interiors                          | تصميم داخلي للفلل بالرياض والتأثيث — أقواس         | `/services/interior-design/`          |

English equivalents use the same paths under `/en/`. Keep Arabic at the prefix-free root.

Each service page explains the service, its existing documented stages/deliverables, relevant Arches project examples, links to related services, and a WhatsApp contact action. Preserve the broader multidisciplinary identity while emphasizing villa homeowners. Use natural related phrases rather than repetition targets. Do not invent project locations, completion status, prices, credentials or testimonials. Do not expose client names from gallery folders.

Homepage heading proposal: «مكتب هندسي في الرياض لتصميم فيلتك». Retain the existing brand sentiment in supporting copy. Service detail comes from the existing Arabic service descriptions; permitting remains part of architectural design.

## Enquiries and business identity

Make WhatsApp the primary action on homepage and service pages, using `https://wa.me/966559995768` with optional localized enquiry text. Retain `tel:` and email links. Preserve the enquiry form and all its fields; when no Web3Forms key is configured, let visitors prepare their enquiry in the form and continue to WhatsApp to send it, with clear localized labeling. A configured key enables the original submission channel.

Use the confirmed office address, Arabic-reference contact details, founding history and award information consistently across both languages. Localize gallery controls and descriptions. Use existing Arches project assets for service imagery.

## Search and sharing implementation

- Use `https://arches.sa` for the site origin, self-referencing canonical URLs, sharing URLs and sitemap entries.
- Give each content page its own title, description and descriptive H1, with a logical heading hierarchy.
- Restore working header navigation; add ordinary HTML links between homepage and service pages. Language switching preserves the equivalent page.
- Add reciprocal `ar`/`en` alternate-language links and Arabic fallback links only for actual page pairs.
- Generate a sitemap for public content pages and robots.txt pointing to it. Exclude the error page from the sitemap and give it appropriate error metadata.
- Add business structured data using confirmed visible facts, plus breadcrumbs on service pages. Omit unsupported hours, ratings and social-account URLs.
- Produce branded raster sharing images from existing assets, with localized titles. Include Open Graph image/URL/locale metadata and large-image card metadata. Inspect crops and Arabic text rendering.
- Render useful service/project content and images in static HTML. Make reveal animations progressive enhancements so text is visible if JavaScript fails.
- Measure and address hero loading and delayed text visibility; preserve responsive images, lazy loading below the fold and reduced-motion support.
- Inspect discoverable legacy production URLs and provide appropriate redirect mappings where a corresponding replacement exists. Do not redirect all unknown URLs to the homepage.

## Validation and release follow-up

Run production build and Astro type checking, then inspect generated HTML for unique metadata, valid local links, reciprocal language URLs, correct sitemap entries, valid structured data and accessible sharing images. Review Arabic RTL and English layouts at mobile and desktop sizes; check navigation and contact link destinations without sending enquiries. Measure page performance where tooling permits.

Document production-only checks separately: real HTTP redirects and 404s, social crawler access, Search Console verification and sitemap submission, indexing reports, and the Google Business Profile once verification completes. Track relevant search impressions, clicks and enquiries over time; ranking is not guaranteed by completing the website changes.

## Primary references

- [Google localized page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions): reciprocal, fully qualified language alternate URLs for corresponding pages.
- [Google local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business): structured business information must accurately represent the business.
- [Open Graph protocol](https://ogp.me/): page title, type, URL and image metadata for link previews.
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): useful content, descriptive structure and search visibility fundamentals.
