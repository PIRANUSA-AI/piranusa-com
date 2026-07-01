# Piranusa Web — Frontend + SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build all 6 Piranusa pages from Figma as a Next.js 14 SSG site with full technical SEO, hitting green on PageSpeed/Lighthouse/GTmetrix — backend deferred, mock data used.

**Architecture:** Next.js 14 App Router, fully static (SSG) with Server Components by default. Content comes from local mock data (`src/data/*.ts`) shaped identically to future Payload collections, so swapping in the backend later requires no component changes. SEO is built in from the first page: per-locale metadata, JSON-LD schema, auto sitemap/robots, hreflang, and `next/image` for every image.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, next-intl (i18n ID/EN), next/font, next/image. Figma MCP for design tokens + assets. Vitest + Testing Library for unit/render tests. Lighthouse CLI for perf verification.

## Global Constraints

- Every page MUST be SSG (`export const dynamic = 'force-static'` or static by default; no `cookies()`/`headers()` in page render paths).
- Server Components by default; `"use client"` ONLY on interactive leaf components (contact form, mobile nav toggle, WhatsApp button).
- Every image via `next/image` with explicit `width`/`height` (CLS 0). No raw `<img>`.
- Every page exports Next `Metadata` (title, description, canonical, OpenGraph, hreflang alternates) per locale.
- Bilingual: locales `id` (default) + `en`. Routes prefixed `/id`, `/en`.
- Fonts via `next/font` (self-hosted, no external request).
- Mock data shape = future Payload collection shape. Types live in `src/types/`.
- Page weight target <2 MB; Lighthouse Performance ≥95, SEO =100, Accessibility ≥95, Best Practices ≥95; CWV PASSED.
- Colors, spacing, fonts, and copy come from Figma file `sj4kaNQZVq0FPp1ugvHJZR` — pull via MCP at execution, never invent.

---

### Task 1: Scaffold Next.js 14 + Tailwind + TypeScript

**Files:**
- Create: `package.json`, `next.config.js`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `src/app/globals.css`
- Create: `.gitignore` (already present — verify)

**Interfaces:**
- Produces: working `next dev` / `next build`; Tailwind classes usable; `@/` path alias → `src/`.

- [ ] **Step 1: Scaffold app**

```bash
cd ~/Projects/work/piranusa-web
npx create-next-app@14 . --typescript --tailwind --app --src-dir --import-alias "@/*" --no-eslint --use-npm
```
If prompted about non-empty dir (docs/ exists), choose to continue without overwriting.

- [ ] **Step 2: Verify build runs**

Run: `npm run build`
Expected: build succeeds, generates `.next/`.

- [ ] **Step 3: Verify dev server**

Run: `npm run dev` then open `http://localhost:3000`
Expected: default Next page renders. Stop server after.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: scaffold Next.js 14 + Tailwind + TS"
```

---

### Task 2: i18n routing (ID/EN) with next-intl

**Files:**
- Create: `src/i18n/routing.ts`, `src/i18n/request.ts`, `src/middleware.ts`
- Create: `messages/id.json`, `messages/en.json`
- Modify: `next.config.js` (wrap with next-intl plugin)
- Move: `src/app/` pages under `src/app/[locale]/`
- Test: `tests/i18n/routing.test.ts`

**Interfaces:**
- Produces: `routing` object with `locales = ['id','en']`, `defaultLocale = 'id'`; `Link`, `redirect`, `usePathname` from `@/i18n/routing`; middleware handling locale prefix.

- [ ] **Step 1: Install**

```bash
npm install next-intl
```

- [ ] **Step 2: Write failing test for routing config**

```typescript
// tests/i18n/routing.test.ts
import { routing } from '@/i18n/routing'
import { describe, it, expect } from 'vitest'

describe('i18n routing', () => {
  it('supports id and en with id default', () => {
    expect(routing.locales).toEqual(['id', 'en'])
    expect(routing.defaultLocale).toBe('id')
  })
})
```

- [ ] **Step 3: Install + configure Vitest**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```
Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
})
```
Add to `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 4: Run test to verify it fails**

Run: `npx vitest run tests/i18n/routing.test.ts`
Expected: FAIL — cannot find `@/i18n/routing`.

- [ ] **Step 5: Create routing config**

```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['id', 'en'],
  defaultLocale: 'id',
})

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
```

- [ ] **Step 6: Create request config + middleware**

```typescript
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }
  return { locale, messages: (await import(`../../messages/${locale}.json`)).default }
})
```
```typescript
// src/middleware.ts
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: ['/', '/(id|en)/:path*', '/((?!_next|_vercel|api|.*\\..*).*)'],
}
```

- [ ] **Step 7: Wrap next.config + move pages under [locale]**

```javascript
// next.config.js
const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = withNextIntl(nextConfig)
```
Move `src/app/page.tsx` → `src/app/[locale]/page.tsx`. Create `src/app/[locale]/layout.tsx`:
```tsx
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import '../globals.css'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as any)) notFound()
  setRequestLocale(locale)
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
```
Create empty message files `messages/id.json` = `{}`, `messages/en.json` = `{}`. Delete old `src/app/layout.tsx` if it conflicts.

- [ ] **Step 8: Run test + build**

Run: `npx vitest run tests/i18n/routing.test.ts && npm run build`
Expected: test PASS; build generates `/id` and `/en` static routes.

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: i18n routing ID/EN with next-intl, static per-locale"
```

---

### Task 3: Design tokens from Figma → Tailwind config

**Files:**
- Modify: `tailwind.config.ts`
- Create: `src/app/fonts.ts`
- Modify: `src/app/[locale]/layout.tsx` (apply font)

**Interfaces:**
- Produces: Tailwind theme with Piranusa colors/spacing/radius; font exported as `fontSans`.

- [ ] **Step 1: Pull design tokens from Figma (MCP)**

Call `mcp__figma__get_variable_defs` with `fileKey: sj4kaNQZVq0FPp1ugvHJZR`, `nodeId: 10020:454` (HOMEPAGE). Record exact hex colors, spacing scale, radii. Identify the font family used (check text nodes).

- [ ] **Step 2: Map tokens into tailwind.config.ts**

Extend `theme.extend.colors` / `spacing` / `borderRadius` with the exact Figma values (e.g. Piranusa orange brand from the hero). Do NOT guess — use pulled values.

- [ ] **Step 3: Set up font via next/font**

```typescript
// src/app/fonts.ts
import { <FigmaFont> } from 'next/font/google' // or next/font/local if custom
export const fontSans = <FigmaFont>({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
```
Apply `fontSans.variable` to `<html>` className in layout; set `font-sans` in Tailwind to `var(--font-sans)`.

- [ ] **Step 4: Verify build + visual token smoke**

Run: `npm run build`
Expected: build passes. Add a temp swatch to homepage, run `npm run dev`, confirm brand color matches Figma screenshot, then remove swatch.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: Figma design tokens + font in Tailwind"
```

---

### Task 4: Mock data types + fixtures (Payload-shaped)

**Files:**
- Create: `src/types/content.ts`
- Create: `src/data/products.ts`, `src/data/posts.ts`, `src/data/testimonials.ts`, `src/data/categories.ts`
- Create: `src/lib/content.ts` (accessor functions)
- Test: `tests/lib/content.test.ts`

**Interfaces:**
- Produces: types `Product`, `Post`, `Testimonial`, `Category`, each with `Localized<T>` fields; accessors `getProducts(locale)`, `getProduct(slug, locale)`, `getPosts(locale)`, `getPost(slug, locale)`, `getTestimonials(locale)`. These accessor signatures are the seam — Task 2-of-backend swaps their internals to Payload without changing callers.

- [ ] **Step 1: Write failing test**

```typescript
// tests/lib/content.test.ts
import { getProducts, getProduct, getPosts } from '@/lib/content'
import { describe, it, expect } from 'vitest'

describe('content accessors', () => {
  it('returns products localized to id', () => {
    const products = getProducts('id')
    expect(products.length).toBeGreaterThan(0)
    expect(typeof products[0].name).toBe('string')
    expect(products[0].slug).toBeTruthy()
  })
  it('gets a single product by slug', () => {
    const all = getProducts('id')
    const one = getProduct(all[0].slug, 'id')
    expect(one?.slug).toBe(all[0].slug)
  })
  it('returns posts localized to en', () => {
    expect(getPosts('en').length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/lib/content.test.ts`
Expected: FAIL — cannot find `@/lib/content`.

- [ ] **Step 3: Define types**

```typescript
// src/types/content.ts
export type Locale = 'id' | 'en'
export type Localized<T> = Record<Locale, T>

export interface Category { slug: string; name: Localized<string> }

export interface Product {
  slug: string
  name: Localized<string>
  description: Localized<string>
  version: string
  logo: string          // /images path
  gallery: string[]
  category: string      // category slug
  features: Localized<string[]>
  ctaWhatsapp: string
}

export interface Post {
  slug: string
  title: Localized<string>
  excerpt: Localized<string>
  content: Localized<string>   // markdown/html for now
  coverImage: string
  category: string
  metaDescription: Localized<string>
  publishedAt: string          // ISO
}

export interface Testimonial {
  clientName: string
  logo: string
  quote: Localized<string>
  youtubeUrl?: string
}
```

- [ ] **Step 4: Create fixtures + accessors**

Populate `src/data/products.ts` etc. with real Piranusa content pulled from the WP audit (ZWCAD, Archicad, ZW3D, SketchUp, Enscape, D5 Render — bilingual). Then:
```typescript
// src/lib/content.ts
import type { Locale, Product, Post, Testimonial } from '@/types/content'
import { products } from '@/data/products'
import { posts } from '@/data/posts'
import { testimonials } from '@/data/testimonials'

export function getProducts(_locale: Locale): Product[] { return products }
export function getProduct(slug: string, _locale: Locale): Product | undefined {
  return products.find((p) => p.slug === slug)
}
export function getPosts(_locale: Locale): Post[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}
export function getPost(slug: string, _locale: Locale): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
export function getTestimonials(_locale: Locale): Testimonial[] { return testimonials }
```
(Localization is applied at render by reading `field[locale]`; accessors return full objects so the Payload swap is trivial.)

- [ ] **Step 5: Run test to verify it passes**

Run: `npx vitest run tests/lib/content.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: Payload-shaped mock data + content accessors"
```

---

### Task 5: SEO core library (metadata, schema, helpers)

**Files:**
- Create: `src/lib/seo.ts` (metadata builder + JSON-LD builders)
- Create: `src/components/JsonLd.tsx`
- Test: `tests/lib/seo.test.ts`

**Interfaces:**
- Consumes: `Locale`, `Product`, `Post` from Task 4.
- Produces:
  - `buildMetadata({ title, description, path, locale, image? }): Metadata` — includes canonical + `alternates.languages` (hreflang) + OpenGraph.
  - `organizationSchema()`, `productSchema(product, locale)`, `articleSchema(post, locale)`, `breadcrumbSchema(items)` — return plain JS objects.
  - `<JsonLd data={...} />` — renders `<script type="application/ld+json">`.
- `SITE_URL` constant (env `NEXT_PUBLIC_SITE_URL` fallback `http://localhost:3000`).

- [ ] **Step 1: Write failing tests**

```typescript
// tests/lib/seo.test.ts
import { buildMetadata, organizationSchema, productSchema, breadcrumbSchema } from '@/lib/seo'
import { describe, it, expect } from 'vitest'

describe('seo', () => {
  it('builds metadata with canonical + hreflang', () => {
    const m = buildMetadata({ title: 'X', description: 'd', path: '/products', locale: 'id' })
    expect(m.title).toBe('X')
    expect(m.alternates?.canonical).toContain('/id/products')
    expect(m.alternates?.languages?.['en']).toContain('/en/products')
    expect(m.openGraph?.title).toBe('X')
  })
  it('organization schema has @type Organization', () => {
    expect(organizationSchema()['@type']).toBe('Organization')
  })
  it('product schema uses localized name', () => {
    const p = { slug: 'zwcad', name: { id: 'ZWCAD', en: 'ZWCAD' }, description: { id: 'a', en: 'b' }, version: '2026', logo: '/l.png', gallery: [], category: 'cad', features: { id: [], en: [] }, ctaWhatsapp: '' }
    expect(productSchema(p as any, 'id').name).toBe('ZWCAD')
  })
  it('breadcrumb schema lists items', () => {
    const b = breadcrumbSchema([{ name: 'Home', url: '/id' }])
    expect(b.itemListElement[0].position).toBe(1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/lib/seo.test.ts`
Expected: FAIL — cannot find `@/lib/seo`.

- [ ] **Step 3: Implement seo.ts**

```typescript
// src/lib/seo.ts
import type { Metadata } from 'next'
import type { Locale, Product, Post } from '@/types/content'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const COMPANY = 'PT Piranti Nusantara Teknologi'

export function buildMetadata(opts: {
  title: string; description: string; path: string; locale: Locale; image?: string
}): Metadata {
  const { title, description, path, locale, image } = opts
  const clean = path.startsWith('/') ? path : `/${path}`
  const url = `${SITE_URL}/${locale}${clean === '/' ? '' : clean}`
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        id: `${SITE_URL}/id${clean === '/' ? '' : clean}`,
        en: `${SITE_URL}/en${clean === '/' ? '' : clean}`,
      },
    },
    openGraph: {
      title, description, url, siteName: 'Piranusa', locale,
      type: 'website', images: image ? [{ url: image }] : undefined,
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: COMPANY, alternateName: 'Piranusa', url: SITE_URL,
    sameAs: ['https://www.linkedin.com/', 'https://www.instagram.com/zwcad.piranusa'],
  }
}
export function productSchema(p: Product, locale: Locale) {
  return {
    '@context': 'https://schema.org', '@type': 'Product',
    name: p.name[locale], description: p.description[locale], brand: { '@type': 'Brand', name: p.name[locale] },
  }
}
export function articleSchema(post: Post, locale: Locale) {
  return {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: post.title[locale], description: post.metaDescription[locale],
    datePublished: post.publishedAt, image: `${SITE_URL}${post.coverImage}`,
    publisher: { '@type': 'Organization', name: COMPANY },
  }
}
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE_URL}${it.url}`,
    })),
  }
}
```

- [ ] **Step 4: Implement JsonLd component**

```tsx
// src/components/JsonLd.tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

- [ ] **Step 5: Run tests to verify pass**

Run: `npx vitest run tests/lib/seo.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: SEO core — metadata builder, JSON-LD schema, hreflang"
```

---

### Task 6: Auto sitemap.xml + robots.txt

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Test: `tests/app/sitemap.test.ts`

**Interfaces:**
- Consumes: `getProducts`, `getPosts` (Task 4), `SITE_URL`, `routing` locales.
- Produces: Next-native `sitemap()` and `robots()` route handlers producing valid XML/txt at build.

- [ ] **Step 1: Write failing test**

```typescript
// tests/app/sitemap.test.ts
import sitemap from '@/app/sitemap'
import { describe, it, expect } from 'vitest'

describe('sitemap', () => {
  it('includes homepage for both locales and product urls', () => {
    const entries = sitemap()
    const urls = entries.map((e) => e.url)
    expect(urls.some((u) => u.endsWith('/id'))).toBe(true)
    expect(urls.some((u) => u.endsWith('/en'))).toBe(true)
    expect(urls.some((u) => u.includes('/products/'))).toBe(true)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run tests/app/sitemap.test.ts`
Expected: FAIL — cannot find `@/app/sitemap`.

- [ ] **Step 3: Implement sitemap + robots**

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { getProducts, getPosts } from '@/lib/content'
import { routing } from '@/i18n/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/products', '/about', '/contact', '/blog']
  const entries: MetadataRoute.Sitemap = []
  for (const locale of routing.locales) {
    for (const p of staticPaths) entries.push({ url: `${SITE_URL}/${locale}${p}`, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.8 })
    for (const prod of getProducts(locale)) entries.push({ url: `${SITE_URL}/${locale}/products/${prod.slug}`, changeFrequency: 'monthly', priority: 0.7 })
    for (const post of getPosts(locale)) entries.push({ url: `${SITE_URL}/${locale}/blog/${post.slug}`, lastModified: post.publishedAt, changeFrequency: 'monthly', priority: 0.6 })
  }
  return entries
}
```
```typescript
// src/app/robots.ts
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
```

- [ ] **Step 4: Run test + build, verify XML**

Run: `npx vitest run tests/app/sitemap.test.ts && npm run build && npm run start &` then `curl -s localhost:3000/sitemap.xml | head` and `curl -s localhost:3000/robots.txt`
Expected: test PASS; sitemap.xml lists locale + product + blog URLs; robots.txt points to sitemap. Stop server.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: auto sitemap.xml + robots.txt (all locales, products, posts)"
```

---

### Task 7: Shared layout shell — Navbar + Footer (from Figma)

**Files:**
- Create: `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/LocaleSwitcher.tsx` (client)
- Create: `src/components/ui/WhatsappButton.tsx` (client)
- Modify: `src/app/[locale]/layout.tsx` (inject Navbar/Footer + Organization JSON-LD)
- Assets: `public/images/` (logo etc. from Figma)
- Test: `tests/components/Navbar.test.tsx`

**Interfaces:**
- Consumes: `Link` from `@/i18n/routing`, `organizationSchema` + `JsonLd`.
- Produces: `<Navbar locale>`, `<Footer locale>` server components; global chrome present on every page.

- [ ] **Step 1: Pull Figma context for nav + footer**

Call `mcp__figma__get_design_context` on the HOMEPAGE header and footer nodes (from metadata: footer text node `18168:436` region, top nav). Call `mcp__figma__download_assets` for the Piranusa logo + social icons → save to `public/images/`.

- [ ] **Step 2: Write failing render test**

```tsx
// tests/components/Navbar.test.tsx
import { render, screen } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'
import { describe, it, expect, vi } from 'vitest'
vi.mock('@/i18n/routing', () => ({ Link: (p: any) => <a href={p.href}>{p.children}</a> }))

describe('Navbar', () => {
  it('renders nav links', () => {
    render(<Navbar locale="id" />)
    expect(screen.getByRole('navigation')).toBeTruthy()
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/components/Navbar.test.tsx`
Expected: FAIL — cannot find `@/components/layout/Navbar`.

- [ ] **Step 4: Build Navbar/Footer/LocaleSwitcher/WhatsappButton**

Implement matching Figma tokens/layout. Nav uses `<nav>`, semantic `<header>`/`<footer>`, `next/image` logo with width/height, `Link` for internal routes. `LocaleSwitcher` and `WhatsappButton` marked `"use client"`. Keep interactivity minimal.

- [ ] **Step 5: Inject into layout + add Organization schema**

In `src/app/[locale]/layout.tsx`, wrap `{children}` with `<Navbar>` above and `<Footer>` below; add `<JsonLd data={organizationSchema()} />` and `<WhatsappButton />`.

- [ ] **Step 6: Run test + build**

Run: `npx vitest run tests/components/Navbar.test.tsx && npm run build`
Expected: test PASS; build static.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: Navbar + Footer + locale switcher + WhatsApp button from Figma"
```

---

### Task 8: Homepage (from Figma)

**Files:**
- Modify: `src/app/[locale]/page.tsx`
- Create: `src/components/sections/Hero.tsx`, `FeaturedProducts.tsx`, `Testimonials.tsx`, `LatestPosts.tsx`
- Test: `tests/app/homepage.test.tsx`

**Interfaces:**
- Consumes: `getProducts`, `getTestimonials`, `getPosts`, `buildMetadata`.
- Produces: static homepage with `generateMetadata`.

- [ ] **Step 1: Pull Figma HOMEPAGE sections**

`mcp__figma__get_design_context` on hero (node under `10020:454`), featured products, testimonials (`our clients` `18573:1834`), updates/blog feed. `download_assets` for hero image + product logos.

- [ ] **Step 2: Write failing test**

```tsx
// tests/app/homepage.test.tsx
import { render, screen } from '@testing-library/react'
import Home from '@/app/[locale]/page'
import { describe, it, expect, vi } from 'vitest'
vi.mock('@/i18n/routing', () => ({ Link: (p: any) => <a href={p.href}>{p.children}</a> }))

describe('Homepage', () => {
  it('renders hero tagline', async () => {
    const ui = await Home({ params: Promise.resolve({ locale: 'id' }) } as any)
    render(ui)
    expect(screen.getByText(/we get it done/i)).toBeTruthy()
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx vitest run tests/app/homepage.test.tsx`
Expected: FAIL.

- [ ] **Step 4: Implement homepage + sections**

Build sections from Figma tokens. `page.tsx` reads mock data via accessors, exports `generateMetadata` using `buildMetadata`. All images `next/image`. Set `setRequestLocale(locale)`.

- [ ] **Step 5: Run test + build**

Run: `npx vitest run tests/app/homepage.test.tsx && npm run build`
Expected: PASS + static `/id` `/en`.

- [ ] **Step 6: Lighthouse gate**

Run: `npm run start &` then `npx lighthouse http://localhost:3000/id --only-categories=performance,seo,accessibility,best-practices --form-factor=mobile --screenEmulation.mobile --chrome-flags="--headless --no-sandbox" --output=json --output-path=/tmp/lh-home.json --quiet`
Expected: Performance ≥95, SEO =100, Accessibility ≥95, Best Practices ≥95. If any fails, fix (image sizing, unused JS) before commit. Record numbers into scorecard.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: homepage from Figma — hero, featured, testimonials, latest posts"
```

---

### Task 9: Product Overview page

**Files:**
- Create: `src/app/[locale]/products/page.tsx`, `src/components/sections/ProductGrid.tsx`, `src/components/ui/ProductCard.tsx`
- Test: `tests/app/products.test.tsx`

**Interfaces:**
- Consumes: `getProducts`, `buildMetadata`, `breadcrumbSchema`.

- [ ] **Step 1: Pull Figma PRODUCT OVERVIEW** (`mcp__figma__get_design_context` on `18235:381` / `product overview 2` `18302:1009`).

- [ ] **Step 2: Write failing test**

```tsx
// tests/app/products.test.tsx
import { render, screen } from '@testing-library/react'
import Products from '@/app/[locale]/products/page'
import { describe, it, expect, vi } from 'vitest'
vi.mock('@/i18n/routing', () => ({ Link: (p: any) => <a href={p.href}>{p.children}</a> }))
describe('Product overview', () => {
  it('renders product cards', async () => {
    const ui = await Products({ params: Promise.resolve({ locale: 'id' }) } as any)
    render(ui)
    expect(screen.getAllByRole('link').length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 3: Run to verify fail** → `npx vitest run tests/app/products.test.tsx` → FAIL.

- [ ] **Step 4: Implement** grid + card + `generateMetadata` + `<JsonLd>` breadcrumb. Images `next/image`.

- [ ] **Step 5: Test + build** → `npx vitest run tests/app/products.test.tsx && npm run build` → PASS.

- [ ] **Step 6: Lighthouse gate** on `/id/products` (same thresholds as Task 8). Fix if red.

- [ ] **Step 7: Commit** → `git add -A && git commit -m "feat: product overview page from Figma"`

---

### Task 10: Product Detail page (SSG per product)

**Files:**
- Create: `src/app/[locale]/products/[slug]/page.tsx`
- Create: `src/components/sections/ProductHero.tsx`, `ProductFeatures.tsx`
- Test: `tests/app/product-detail.test.tsx`

**Interfaces:**
- Consumes: `getProduct`, `getProducts` (for `generateStaticParams`), `productSchema`, `breadcrumbSchema`, `buildMetadata`.
- Produces: `generateStaticParams` returning every `{locale, slug}`; 404 via `notFound()` for unknown slug.

- [ ] **Step 1: Pull Figma PRODUCT DETAILS ZWCAD** (`18504:1869`, poin utama `18533:2086`).

- [ ] **Step 2: Write failing test**

```tsx
// tests/app/product-detail.test.tsx
import { render, screen } from '@testing-library/react'
import Detail, { generateStaticParams } from '@/app/[locale]/products/[slug]/page'
import { getProducts } from '@/lib/content'
import { describe, it, expect, vi } from 'vitest'
vi.mock('@/i18n/routing', () => ({ Link: (p: any) => <a href={p.href}>{p.children}</a> }))
describe('Product detail', () => {
  it('generates params for all products x locales', async () => {
    const params = await generateStaticParams()
    expect(params.length).toBe(getProducts('id').length * 2)
  })
  it('renders product name', async () => {
    const slug = getProducts('id')[0].slug
    const ui = await Detail({ params: Promise.resolve({ locale: 'id', slug }) } as any)
    render(ui)
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
  })
})
```

- [ ] **Step 3: Run to verify fail** → FAIL.

- [ ] **Step 4: Implement** with `generateStaticParams`, `notFound()` on missing, Product + Breadcrumb JSON-LD, CTA WhatsApp, `next/image` gallery.

- [ ] **Step 5: Test + build** → PASS; build shows one static page per product per locale.

- [ ] **Step 6: Lighthouse gate** on one `/id/products/<slug>`. Fix if red.

- [ ] **Step 7: Commit** → `git commit -m "feat: product detail SSG per product with Product schema"`

---

### Task 11: About Us page

**Files:**
- Create: `src/app/[locale]/about/page.tsx`, `src/components/sections/VisiMisi.tsx`, `NilaiKami.tsx`
- Test: `tests/app/about.test.tsx`

- [ ] **Step 1: Pull Figma ABOUT US** (`about us 2` `18325:996`, `visi misi` `18965:4705`, `nilai yg kami pegang` `18212:407`).
- [ ] **Step 2: Failing test** — render About, assert an `<h1>` present (`tests/app/about.test.tsx`, same pattern as Task 9 test). Run → FAIL.
- [ ] **Step 3: Implement** sections from Figma + `generateMetadata` + breadcrumb JSON-LD. Images `next/image`.
- [ ] **Step 4: Test + build** → PASS.
- [ ] **Step 5: Lighthouse gate** on `/id/about`. Fix if red.
- [ ] **Step 6: Commit** → `git commit -m "feat: about us page from Figma"`

---

### Task 12: Contact Us page (with client form)

**Files:**
- Create: `src/app/[locale]/contact/page.tsx`, `src/components/sections/ContactInfo.tsx`, `src/components/ui/ContactForm.tsx` (client)
- Test: `tests/app/contact.test.tsx`, `tests/components/ContactForm.test.tsx`

**Interfaces:**
- `ContactForm` is `"use client"`; on submit builds a WhatsApp `wa.me` link (no backend). Contact info (address JL. K.H. Mas Mansyur No.121, phone (021) 25558805, WA +628111085850) rendered server-side.

- [ ] **Step 1: Pull Figma CONTACT US** (`18660:3671`, `HUBUNGI KAMI` `18694:3329`).
- [ ] **Step 2: Failing test** — `ContactForm` renders inputs + submit builds `wa.me` URL with encoded message. Run → FAIL.
- [ ] **Step 3: Implement** form (client) + info section (server) + `generateMetadata` + breadcrumb. Add `LocalBusiness`/`Organization` contact schema via `<JsonLd>`.
- [ ] **Step 4: Test + build** → PASS.
- [ ] **Step 5: Lighthouse gate** on `/id/contact`. Fix if red (form JS must stay tiny).
- [ ] **Step 6: Commit** → `git commit -m "feat: contact page + WhatsApp form from Figma"`

---

### Task 13: Blog list + article pages (SSG)

**Files:**
- Create: `src/app/[locale]/blog/page.tsx`, `src/app/[locale]/blog/[slug]/page.tsx`
- Create: `src/components/ui/PostCard.tsx`, `src/components/sections/PostBody.tsx`
- Test: `tests/app/blog.test.tsx`

**Interfaces:**
- Consumes: `getPosts`, `getPost`, `articleSchema`, `breadcrumbSchema`, `buildMetadata`.
- Produces: `generateStaticParams` for all posts × locales; `notFound()` on unknown slug.

- [ ] **Step 1: Pull Figma blog/updates styling** (homepage `Updates` feed as reference; article layout uses PostBody typography from tokens).
- [ ] **Step 2: Write failing test**

```tsx
// tests/app/blog.test.tsx
import BlogList from '@/app/[locale]/blog/page'
import Article, { generateStaticParams } from '@/app/[locale]/blog/[slug]/page'
import { getPosts } from '@/lib/content'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
vi.mock('@/i18n/routing', () => ({ Link: (p: any) => <a href={p.href}>{p.children}</a> }))
describe('Blog', () => {
  it('params cover all posts x locales', async () => {
    expect((await generateStaticParams()).length).toBe(getPosts('id').length * 2)
  })
  it('article renders title h1', async () => {
    const slug = getPosts('id')[0].slug
    render(await Article({ params: Promise.resolve({ locale: 'id', slug }) } as any))
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy()
  })
})
```
- [ ] **Step 3: Run to verify fail** → FAIL.
- [ ] **Step 4: Implement** list (PostCard grid) + article (`generateStaticParams`, `notFound()`, Article + Breadcrumb JSON-LD, `next/image` cover). Render content (markdown/html) safely.
- [ ] **Step 5: Test + build** → PASS; static page per post per locale.
- [ ] **Step 6: Lighthouse gate** on `/id/blog` and one article. Fix if red.
- [ ] **Step 7: Commit** → `git commit -m "feat: blog list + article SSG with Article schema"`

---

### Task 14: Full-site SEO + performance audit gate (all benchmarks green)

**Files:**
- Modify: `docs/superpowers/specs/2026-07-01-seo-baseline-scorecard.md` (fill Next.js result column)
- Create: `scripts/audit.sh` (runs Lighthouse on all routes)

**Interfaces:**
- Consumes: full built site.
- Produces: recorded green scores; scorecard "Next.js hasil" column filled.

- [ ] **Step 1: Write audit script**

```bash
# scripts/audit.sh
#!/usr/bin/env bash
set -e
BASE=${1:-http://localhost:3000}
ROUTES=(/id /id/products /id/about /id/contact /id/blog /en /en/products)
for r in "${ROUTES[@]}"; do
  out="/tmp/lh${r//\//_}.json"
  npx lighthouse "$BASE$r" --only-categories=performance,seo,accessibility,best-practices \
    --form-factor=mobile --screenEmulation.mobile --chrome-flags="--headless --no-sandbox" \
    --output=json --output-path="$out" --quiet
  node -e "const r=require('$out').categories;console.log('$r', Object.fromEntries(Object.entries(r).map(([k,v])=>[k,Math.round(v.score*100)])))"
done
```

- [ ] **Step 2: Build + run audit**

Run: `npm run build && npm run start & sleep 3 && bash scripts/audit.sh`
Expected: every route Performance ≥95, SEO =100, Accessibility ≥95, Best Practices ≥95.

- [ ] **Step 3: Fix any red** — common levers: convert stray `"use client"` to server, ensure all images have width/height + `sizes`, remove unused deps, check no render-blocking. Re-run until all green.

- [ ] **Step 4: Validate structured data + meta**

Manually: `curl -s localhost:3000/id | grep -o 'application/ld+json'` (schema present), check `<link rel="alternate" hreflang>` in HTML source, `curl localhost:3000/sitemap.xml`. Optionally paste a public staging URL into Google Rich Results Test later.

- [ ] **Step 5: Fill scorecard**

Update the scorecard's "Next.js hasil" column with recorded numbers. Confirm all green vs WP baseline.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: full-site SEO+perf audit — all benchmarks green, scorecard filled"
```

---

## Self-Review Notes

- **Spec coverage:** 6 pages (Tasks 8-13) ✓; SEO core — metadata/schema/hreflang (5), sitemap/robots (6), next/image enforced per task ✓; i18n ID/EN (2) ✓; Figma tokens+assets via MCP (3,7-13) ✓; mock data Payload-shaped (4) ✓; benchmark green gate (8-14) ✓. Backend/migration correctly deferred (spec §9).
- **Deferred with seam:** content accessors (Task 4) are the swap point for Payload — no component reads `src/data` directly.
- **Verification:** every page task ends with a Lighthouse gate; Task 14 is the whole-site green gate tying back to the baseline scorecard.
