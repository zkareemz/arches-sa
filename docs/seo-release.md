# SEO implementation and release

The homepage retains all eight original sections in the same order: hero, about, services, why Arches, projects, award, team and contact. All three about points, twelve service sub-items, four differentiators, gallery categories, team members, award, map and enquiry-form fields remain. `src/content/Home.astro` is unchanged.

## Implemented

- Refined Arabic homepage wording around an engineering office in Riyadh and villa design, preserving the brand sentiment and existing service scope.
- Added architectural design, construction supervision/project management and interior design pages, with English equivalents derived from Arabic. Routes are documented in [the plan](seo-plan.md).
- Added unique titles/descriptions, canonical URLs, reciprocal language alternates, business/website/page structured data, breadcrumbs, robots.txt and an eight-page sitemap, using `https://arches.sa`.
- Added branded Arabic and English PNG sharing images, Open Graph and large-image card metadata. `npm run social` regenerates them and the public logo; development and production builds run this automatically.
- Added working native HTML menu navigation, service links and equivalent-page language switching. Fixed service anchor IDs lost by the Reveal wrapper.
- Localized gallery labels and anonymized image descriptions, while keeping the entire gallery. Service examples render as HTML images and links. No completion dates, project locations or client names were inferred from folder names.
- Unified both locales to the Arabic contact details, award claim and operating history, and published the confirmed address.
- Preserved the enquiry form and its fields. Without `PUBLIC_WEB3FORMS_ACCESS_KEY`, it prepares a WhatsApp message for the visitor to review and send. With a valid key, it uses Web3Forms. See `.env.example`; rebuild after changing this setting. No live Web3Forms delivery was tested because no key was supplied.
- Made scroll reveal an enhancement to visible content. Hero copy is immediately visible, has a readable scrim above the image, and the video has a poster and a single metadata preload setting. Reduced-motion visitors do not start video playback through the animation script.
- Added Firebase permanent redirects from the discovered old `/contact-us/` and `/about-us-2/` URLs to the corresponding homepage sections, including slashless variants. Unknown URLs retain 404 behavior.

## Verification

- `npm run build`: passed; eight content pages plus the error page and sitemap generated.
- `npm run check`: passed with no errors or warnings; three existing unused-code/type hints remain.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:seo`: all 16 checks passed across desktop and mobile. After the final hero contrast correction, all six affected metadata/rendering/no-JavaScript checks passed again.
- Checks cover page metadata, language pairs, structured business data, internal page links, responsive overflow, retained homepage blocks and form fields, service anchors, menu and language navigation, WhatsApp handoff, sitemap and error handling. External WhatsApp navigation is intercepted: no messages are sent.
- Visually reviewed Arabic mobile/desktop homepage and service previews, an English desktop service preview, and the Arabic sharing card. Browser captures are under ignored `test-results/`.
- `git diff --check`: passed.

To run browser checks elsewhere, build first, install Chromium with `npx playwright install chromium`, then run `npm run test:seo`. Alternatively, use installed Chrome with `PLAYWRIGHT_CHANNEL=chrome npm run test:seo`. The tests start and stop their own local preview on port 4322.

## Live release follow-up

The code is prepared locally; deployment and external account setup have not been performed.

1. Publish the build on the confirmed `arches.sa` domain. Check HTTPS, `/en/`, service URLs, the four legacy redirects and a genuine HTTP 404 on the deployed Firebase site. The preview server verifies site output, not Firebase's redirect rules.
2. Verify ownership of `arches.sa` in Google Search Console and submit `https://arches.sa/sitemap.xml`. Inspect the Arabic homepage and service pages, then monitor indexing, relevant search queries, impressions and clicks. These steps require the owner's account access.
3. Once the existing Google Business Profile finishes verification, check its name, phone, address and website against the site. Add the actual public profile URL when available. Do not create a duplicate profile.
4. Test live sharing previews using the public URLs on WhatsApp and other intended platforms. The deployed PNG images must remain publicly fetchable. Clear platform preview caches if an older preview persists.
5. Measure mobile performance on the live domain with PageSpeed Insights and monitor field Core Web Vitals when data becomes available. Local functional/browser checks do not establish real-world performance scores or search ranking improvements.
6. Keep adding useful, accurate project context and new work over time. Project-specific names, locations, stages and case studies should come from approved business facts. Track qualified enquiries alongside search traffic to judge the targeting.

## References

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google language alternates](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google local ranking guidance](https://support.google.com/business/answer/7091?hl=en)
- [Open Graph protocol](https://ogp.me/)
- [Firebase Hosting configuration](https://firebase.google.com/docs/hosting/full-config)
