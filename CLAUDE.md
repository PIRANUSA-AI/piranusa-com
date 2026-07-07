# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Next.js dev server (port 3000)
- `npm run build` / `npm run start` — production build/serve
- `npm run lint` — Next.js ESLint
- `npm run test` — Vitest (jsdom + Testing Library). Single file: `npx vitest run tests/path/to/file.test.ts`
- No dedicated `typecheck` script; run `npx tsc --noEmit` directly

No env vars are required for local dev — there's no `.env.example`; check `src/app/api/contact` before assuming the contact form needs one if you touch it.

## Architecture

Public marketing site for Piranusa (CAD/BIM distributor), Next.js App Router with `next-intl` for i18n.

- All routed pages live under `src/app/[locale]/` (`about`, `blog`, `contact`, `products`, `training`) — the `[locale]` segment is required by `next-intl`; there is no locale-less route tree. Locales are `id` (default) and `en`, configured in `src/i18n/routing.ts`; translated strings live in `messages/{locale}.json`, loaded per-request in `src/i18n/request.ts`.
- `src/app/api/contact` is the only API route (contact form submission).
- `src/data/*.ts` holds static content (products, categories, posts, testimonials) used to render pages at build time — this is a content-as-code site, not backed by a CMS/DB.
- `src/lib/seo.ts` builds page metadata (canonical + hreflang alternates per locale) — used across pages needing SEO metadata; `src/lib/content.ts` has shared content-lookup helpers.
- `docs/superpowers/` holds design/SEO specs and plans for past feature work (e.g. the homepage redesign) — check there for the rationale behind existing page structure before restructuring.

Tests in `tests/` mirror this structure (`tests/app/*`, `tests/components/*`, `tests/lib/*`, `tests/i18n/*`) using Testing Library + jsdom.
