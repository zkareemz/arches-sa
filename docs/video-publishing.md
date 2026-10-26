# Video publishing

Video entries live in both locale objects in `src/data/content.ts` under
`projects.videos`. Keep each Arabic and English entry aligned by YouTube ID and
slug.

Before publishing an entry:

- Confirm Arches has permission to use the video, thumbnail, music, and any
  identifiable people shown.
- Confirm the project name and facts with the project team.
- Add an accurate Arabic and English title and description. Make captions
  available for spoken content.
- Keep the slug stable after publication. If it must change, add a Firebase
  Hosting 301 redirect from the old `/videos/<slug>/` path to the new path, and
  add the equivalent `/en/videos/<slug>/` redirect.
- Set `published` to `true` only after approval by the firm's assigned internal
  video owner. The owner should verify rights, metadata, captions, project
  details, and the thumbnail before deployment.
- Set `publishedAt` to an ISO calendar date (`YYYY-MM-DD`) when the original
  publication date is known. The gallery sorts dated entries newest first;
  undated entries retain their source order. Set `featured: true` to pin an
  approved entry above the date order.

To withdraw a video, set `published` to `false`, add Firebase Hosting 301
redirects from its Arabic and English watch paths to the corresponding video
gallery, then build and deploy. Keep the entry in both locales so the redirect
can be reviewed alongside the content change.

Publishing is manual: rebuild and deploy after changing the entries. Reassess a
CMS when the library approaches 20–30 videos or non-developers need to publish
regularly. Set `PUBLIC_PLAUSIBLE_DOMAIN` in the deployment environment to turn
on the optional Plausible script and video interaction events; leave it unset
until the firm's analytics account is ready.
