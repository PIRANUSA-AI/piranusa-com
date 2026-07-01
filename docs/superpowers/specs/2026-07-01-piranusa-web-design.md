# Piranusa Web — Design Spec

**Tanggal:** 2026-07-01
**Project:** Company profile + blog PT Piranti Nusantara Teknologi (piranusa.com)
**Tujuan utama:** Menangkan SEO melawan situs WordPress lama, dibuktikan dengan data terukur.

## 1. Konteks & Masalah

Piranusa = distributor resmi ZWCAD & Archicad Indonesia (jual lisensi software CAD/BIM/3D + security). Situs sekarang WordPress (tema `troma`) — **Core Web Vitals FAILED** menurut Google (lihat `2026-07-01-seo-baseline-scorecard.md`). CEO berpengalaman SEO percaya "Google suka WordPress" karena rebuild custom perusahaan gagal berulang sejak 2025. Diagnosa sebenarnya: rebuild lama jatuh ke jebakan (CSR/HTML kosong, URL berubah tanpa 301, blog tak dimigrasi), bukan karena "custom". 

Ini **migrasi**, bukan greenfield murni: kode dibangun dari nol, tapi aset SEO (URL, artikel, authority) diwarisi dari WP yang masih live.

## 2. Stack (final, terkunci)

- **Frontend:** Next.js 14 App Router, **SSG** (`generateStaticParams`), Server Components default
- **Styling:** Tailwind CSS (mengikuti desain Figma)
- **Backend/CMS:** **Payload CMS v3** (native Next.js, satu repo, satu deploy)
- **Database:** PostgreSQL (self-host / lokal, milik sendiri)
- **i18n:** Payload `localized` (ID/EN) + Next.js locale routing (`/id`, `/en`) + `hreflang`
- **Bahasa:** Indonesia + Inggris (bilingual, sesuai brand & Figma)

Alasan menang SEO: SSG mengirim HTML penuh saat build (anti CSR-trap), Server Components meminimalkan JS, `next/image` membunuh masalah gambar 15 MB, hosting edge menekan TTFB.

## 3. Halaman (dari Figma: node file sj4kaNQZVq0FPp1ugvHJZR)

Figma mendefinisikan 5 section + blog:
1. **Homepage** — hero "we get IT done", produk unggulan, testimoni klien, feed blog terbaru
2. **Product Overview** — daftar semua produk (ZWCAD, Archicad, ZW3D, SketchUp, Enscape, dll)
3. **Product Detail** — per produk (contoh Figma: ZWCAD), versi, fitur, poin utama, CTA WhatsApp
4. **About Us** (TENTANG KAMI) — profil, visi misi, nilai, klien
5. **Contact Us** (HUBUNGI KAMI) — alamat, telepon, WA, form/peta
6. **Blog** — list artikel + halaman artikel; konten ditulis tim marketing via Payload

## 4. Payload Collections

| Collection | Field utama | Localized |
|---|---|---|
| `Posts` | title, slug, richText content, coverImage, excerpt, metaDescription, category, status(draft/published), publishedAt | ✅ |
| `Products` | name, slug, description, version, logo, gallery, category, features[], ctaWhatsapp | ✅ |
| `Categories` | name, slug | ✅ |
| `Testimonials` | clientName, logo, quote, youtubeUrl | ✅ |
| `Pages` | (opsional) konten statis editable per section | ✅ |
| `Media` | upload gambar (auto resize via Payload) | — |
| `Users` | admin marketing (auth Payload) | — |

Admin panel auto-generate di `/admin` → marketing menulis tanpa ngoding.

## 5. SEO Core (fitur yang menentukan kemenangan)

- **Rendering:** semua halaman SSG. Blog SSG + rebuild saat publish (ISR / on-demand revalidation).
- **HTML terbaca bot:** konten penuh di HTML mentah (View Source), bukan `<div id="root">` kosong.
- **`sitemap.xml`** auto-generate (termasuk semua artikel + produk, per locale).
- **`robots.txt`** — allow crawl, arahkan ke sitemap.
- **Schema JSON-LD:** `Organization` (global), `Product` (halaman produk), `Article` (blog), `BreadcrumbList`.
- **Metadata per halaman:** title, description, canonical, OpenGraph, Twitter card — via Next Metadata API, per locale.
- **`hreflang`** ID↔EN di setiap halaman.
- **`next/image`** — semua gambar (WebP/AVIF, resize, lazy, width/height untuk CLS 0).
- **Font lokal** (`next/font`) — no layout shift, no request eksternal.
- **Target:** Lighthouse Performance 95+, SEO 100, CWV PASSED, berat <2 MB, TTFB <0.2s.

## 6. Strategi Migrasi (kritikal — salah = ranking drop)

1. **Audit WP live** — crawl semua URL ke-index + ekspor semua artikel blog.
2. **Peta URL** lama → baru (spreadsheet: url_lama, url_baru, status).
3. **301 redirect** semua URL lama via `next.config.js` `redirects()` — wajib, tanpa kecuali.
4. **Migrasi artikel** WP → Payload (import konten + gambar).
5. **Baseline GSC** direkam sebelum cutover.
6. **Staging + noindex** → buktikan scorecard menang tanpa risiko.
7. **Cutover domain** dengan 301 lengkap → warisi authority + dapat kecepatan.
8. **Monitor GSC** 2-4 minggu → posisi stabil/naik, index utuh = bukti final.

## 7. Struktur Project (monorepo tunggal, Payload di dalam Next.js)

```
piranusa-web/
  src/
    app/
      (frontend)/[locale]/        # halaman publik (SSG)
        page.tsx                  # homepage
        products/page.tsx         # overview
        products/[slug]/page.tsx  # detail
        about/page.tsx
        contact/page.tsx
        blog/page.tsx
        blog/[slug]/page.tsx
      (payload)/admin/            # admin CMS auto
      api/                        # Payload API + sitemap route
    collections/                  # definisi Payload
    components/                   # UI dari Figma (Tailwind)
    lib/                          # helpers (seo, i18n, payload client)
  payload.config.ts
  next.config.js                  # redirects 301 di sini
  docs/superpowers/specs/
```

## 8. Testing & Verifikasi

- Build lulus tanpa error, `next build` menghasilkan halaman static.
- View Source tiap halaman → konten penuh terbaca.
- Lighthouse lokal tiap halaman → catat skor, isi scorecard.
- Rich Results Test → schema valid.
- Cek `sitemap.xml` + `robots.txt` accessible.
- Cek `hreflang` benar antar locale.

## 9. Fase Eksekusi & Prioritas

**Prioritas #1 mutlak: SEO + performance.** Semua benchmark (PageSpeed/CrUX, Lighthouse, GTmetrix) harus HIJAU. Angka baseline WP di scorecard = target yang dilampaui.

**Tahap 1 (SEKARANG): Frontend + SEO teknis**
- 6 halaman mengikuti Figma, SSG + Server Components + `next/image`
- SEO layer penuh: sitemap, robots, schema JSON-LD, metadata+OG+hreflang per locale
- **Mock data lokal** (`src/data/*.ts`) dengan shape SAMA PERSIS dengan collection Payload → saat backend nyusul, cukup ganti sumber import, komponen tak berubah (zero rework)
- Verifikasi tiap halaman: Lighthouse 95+/SEO 100, CWV pass, <2MB, GTmetrix A

**Tahap 2 (nanti): Backend Payload**
- Payload collections + admin + Postgres, ganti mock data → API

**Tahap 3 (nanti): Migrasi WP**
- Crawl, 301, import artikel, cutover, monitor GSC

### Out of Scope (YAGNI)
- Backend/Payload/Postgres/admin — DITUNDA (Tahap 2)
- Migrasi WP / 301 — DITUNDA (Tahap 3)
- E-commerce / checkout — lead via WhatsApp
- Customer portal / login publik
- Domain final — build fase pakai localhost

## 10. Definisi Sukses

- **Teknis (instan):** scorecard custom menang telak vs WP di semua metrik → bukti untuk CEO.
- **SEO (bertahap):** setelah cutover, GSC menunjukkan index utuh + posisi stabil/naik dalam 2-4 minggu, TANPA kehilangan ranking lama.
