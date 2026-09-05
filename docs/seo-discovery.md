# SEO discovery

Status: interview completed and implementation approved, including preservation of all homepage sections and blocks. See [SEO release](seo-release.md) for completed work, verification and external follow-up.

## Confirmed direction

- Arches is a multidisciplinary engineering office in Riyadh, Saudi Arabia.
- Develop Arabic content first, then derive English from the agreed Arabic.
- Arabic content is the authoritative reference for business facts (confirmed by the user). Align English to Arabic where they differ, including contact details, award information and operating history. Use `info@arches.sa` and `+966559995768` in both languages; the Arabic content identifies `https://arches.sa` as the business website.
- Improve search visibility and prepare pages for social sharing.
- New pages may use existing content; missing business facts must be confirmed.
- Ask one question at a time and wait for the answer.
- Primary audience: homeowners planning a new villa in Riyadh. Architectural design is the entry service, with supervision and interiors as potential follow-on services (confirmed by the user).

## Content findings

Read both locales in `src/data/content.ts`, the older `src/content.md`, and the gallery data accessor, generator and consuming component.

- Services cover residential architectural design, concept development, construction drawings and permitting; project management and site supervision; interior design and furnishing.
- Arabic and English disagree on phone number, email address, and award name/awarding organization. Arabic mentions operation since 2015; English omits this.
- The older scratch content has a different domain and contact details; it is not the active source.
- The current project section consumes a generated gallery, not the placeholder project list in `content.ts`. Do not derive real project case studies from that unused list.
- Gallery labels and controls need Arabic localization; generated image descriptions currently come from folder names and sequence numbers.

## Initial technical findings

- The layout has titles, descriptions, language/direction and basic Open Graph tags.
- Canonical links, alternate-language links, social preview image metadata, and business structured data are absent from the layout.
- Astro's configured site is `https://arches-sa.web.app`, while authoritative Arabic content references `https://arches.sa`; align generated metadata URLs with the Arabic reference and verify production behavior.
- No sitemap integration or public robots.txt was found in the inspected source.

## Candidate Arabic search phrases

These are based on service relevance, not measured search volume or competition:

- مكتب هندسي في الرياض
- مكتب استشارات هندسية بالرياض
- تصميم فلل الرياض
- تصميم معماري الرياض
- إشراف هندسي على البناء بالرياض
- إدارة مشاريع البناء بالرياض
- تصميم داخلي للفلل بالرياض

Agreed page focus:

| Page                               | Main search phrase             |
| ---------------------------------- | ------------------------------ |
| Homepage                           | مكتب هندسي في الرياض           |
| Architectural design               | تصميم فلل في الرياض            |
| Project management and supervision | إشراف هندسي على البناء بالرياض |
| Interior design and furnishing     | تصميم داخلي للفلل بالرياض      |

The user approved creating these three service pages alongside the homepage. Derive service descriptions from the existing Arabic material and use related search phrases naturally.

## Interview decisions

- Confirmed: prioritize enquiries from homeowners planning a new villa in Riyadh, beginning with architectural design.
- Positioning: the user directed us to derive differentiators from existing content. Lead with customized design suited to the homeowner's needs, supported by architectural design, supervision and interiors under one roof, continuity from concept to handover, and BIM coordination. These are existing business claims, not independently verified customer testimonials.
- Ask only for business facts that cannot be obtained from the current content or environment.
- Confirmed: resolve conflicts in favor of Arabic content; do not ask again about facts it already supplies.
- Confirmed: adopt the four-page focus above and create the three service pages.
- Confirmed: all gallery images represent Arches projects. They may support service pages as examples of the firm's work. Completion status is not established; use neutral project/design wording rather than claiming every image depicts a completed building. Do not use private client names from folder paths as public project titles.
- Confirmed: a Google Business Profile has been created and is awaiting verification. Do not create a duplicate or assume the listing is publicly accessible. Connecting its verified public URL and checking its details remain follow-up work.
- Confirmed public office address: شارع الأمير سلمان بن محمد بن سعود، حي الصحافة، الرياض 13315، المملكة العربية السعودية. English: Prince Salman bin Mohammed bin Saud Street, Al Sahafa, Riyadh 13315, Saudi Arabia. The user confirmed the address surfaced from the indexed existing contact page at `https://arches.sa/contact-us/`; use it in visible contact content and business structured data.
- Confirmed: WhatsApp on `+966559995768` is the primary enquiry channel, with phone and email alternatives. Use a clear localized action such as «تواصل معنا لتصميم فيلتك».
- Implementation approved with a hard constraint: preserve all homepage sections, blocks and content, including the enquiry form. Wording may be refined for SEO and service pages added. This overrides the previous form replacement proposal. Preserve its fields and use an explicitly labeled WhatsApp handoff when no form key is configured.

## Additional audit findings

- The header menu button has no corresponding navigation overlay or toggle handler; restore usable, crawlable navigation.
- The gallery uses JavaScript buttons rather than links to project pages. Any future project pages need confirmed project facts, not inferences from image filenames.
- Reveal content is hidden by default until JavaScript runs; improve resilience.
- The enquiry form still has a placeholder access key.
- Measure hero loading and delayed heading visibility before choosing performance changes.

## Reference principles

- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide): useful content and clear structure; avoid keyword stuffing. SEO cannot guarantee first position.
- [Google local ranking guidance](https://support.google.com/business/answer/7091?hl=en): local visibility depends on relevance, distance and prominence, extending beyond website changes.
