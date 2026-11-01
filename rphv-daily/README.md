# RPHV DAILY — web portal prototype

This is a mobile-first editorial portal for RPHV DAILY (PEOPLE, PROCESS & TECHNOLOGY), covering Sales, Service, Spares, Used Cars and Accounts.

**Preview only.** The design is pending the publisher's approval. The HTML deliberately includes a noindex directive, and the issue is labelled EDITORIAL PREVIEW. Do not remove these gates or claim the site is an approved public publication until explicitly authorised.

## Architecture
- Static HTML, CSS and JavaScript; no API keys, database, paid fonts or runtime dependencies.
- `index.html` is the portal. `styles.css` controls the navy editorial visual system. `app.js` renders the latest edition, archive, full report and source register.
- `issues.json` is the only content source to edit for new editions. It contains article metadata, date, factual source definitions, metrics, departmental recommendations, a 15-minute huddle, caveats, source URLs and corrections.
- Current pilot: Issue 005, dated 1 November 2026. It cites SIAM's original 15 October 2026 July–September quarter release.
- The portal can be updated by ChatGPT through the connected GitHub tools by making reviewed edits to `issues.json`. Future Git-host integrations can automatically rebuild/deploy after an approved commit.

## Editorial publication gate
Each new issue must contain:
1. Correct issue number and India publication date, without skipped/reused numbers.
2. An identifiable original public source, linked using HTTPS; source publication date AND *actual reporting period*.
3. Correct data type: wholesales vs registrations; survey vs transaction; provisional vs final; estimate vs reported number.
4. Every consequential number checked against its original table, exclusions, unit and denominator. Never substitute a secondary source for a missing primary source without labelling the gap.
5. Exactly five desks: Sales, Service, Spares, Used Cars and Accounts. For each: original practical check, owner-ready metric and short rationale.
6. A 15-minute operational exercise with realistic responsibilities.
7. Clear editorial interpretation separated from sourced facts; no unverified claims about individual dealers or brands.
8. A list of limitations (coverage exclusions, unequal comparison windows, missing states, provisional data or non-comparable growth rates).
9. Human editorial approval before changing the edition `status` from `editorial-preview` or `draft` to `published`.
10. Visible dated correction notes if important reported facts change.

The renderer shows `status: published` issues and editorial-preview issues only while top-level `version` starts with `web-preview`. Other drafts stay out of the portal. Keep confidential drafts in a separate private workspace or unmerged branch, not this public repository.

## Quality check
Before merging a new issue: validate JSON syntax, test both desktop and 360px mobile widths, test every original-source link, verify site has no horizontal scrolling or clipped headlines, and review the main report for accuracy, accidental plagiarism and potentially misleading phrasing.

## Hosting
This branch is staged in the existing `rphazarika/rphventures` repository under `rphv-daily/`. It does not change the personal homepage on `main`.

Recommended hosting: connect the repository to a static hosting provider that allows commercial sites (e.g. Cloudflare Pages, with build command blank and output directory `rphv-daily` after merging), or Vercel Pro if upgraded. **Do not deploy this business portal to Vercel Hobby**; Hobby terms restrict commercial usage. Do not attach a domain or publish approved editions without the publisher's instruction.

In Cloudflare Pages, choose this GitHub repo, select a production branch after reviewing and merging, set output directory to `rphv-daily` (no build command), and later connect the final custom domain. The site serves from `index.html`, with in-page article routes using URL fragments.

## Next iteration after design approval
- Static prerendering for SEO, full URLs and individual canonical article pages.
- RSS feed, sitemap, and searchable multi-issue archive.
- Scheduled source-intake and drafting, a factual-claim audit table and explicit approve/publish separation.
- Disclosure of material corrections and source updates. Optionally add consent-based subscriber notifications.
