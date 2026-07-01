# Piranusa SEO Baseline & Scorecard

> Baseline metrik WordPress lama (piranusa.com) — direkam 2026-06-30/07-01.
> Kolom "Next.js hasil" diisi setelah staging jadi. Ini bukti terukur untuk presentasi CEO.

## Sumber data (3 tool independen, semua sepakat)

| Sumber | Jenis | Verdict utama |
|---|---|---|
| Google PageSpeed Insights (CrUX/field) | Data user Chrome asli, 28 hari | **Core Web Vitals: FAILED** |
| Google Lighthouse (lab, mobile) | Simulasi 1x | Performance **37/100** |
| GTmetrix (pihak ketiga) | Lab, Seattle | Grade **F** |

Field data (CrUX) = yang Google pakai untuk ranking. Ini tidak bisa dibantah.

## Scorecard — WordPress vs target Next.js

| Metrik | Alat | WP sekarang | Target Next.js | Next.js hasil |
|---|---|---|---|---|
| CWV Assessment (field) | PSI | **FAILED** | **PASSED** | _TBD_ |
| Performance (lab mobile) | Lighthouse | 37 | 95+ | _TBD_ |
| Performance (lab desktop) | PSI | 52 | 98+ | _TBD_ |
| LCP (field desktop) | PSI | 5.7s | <2.0s | _TBD_ |
| LCP (lab mobile) | Lighthouse | 32.0s | <2.5s | _TBD_ |
| INP (field) | PSI | 87ms ✅ | <200ms | _TBD_ |
| CLS (field) | PSI | 0.12 🟠 | <0.1 | _TBD_ |
| FCP (field) | PSI | 4.0s | <1.5s | _TBD_ |
| TTFB (field) | PSI | 3.4s | <0.2s | _TBD_ |
| SEO score | Lighthouse | 85 | 100 | _TBD_ |
| Berat halaman | GTmetrix | 25.5 MB | <2 MB | _TBD_ |
| GTmetrix Grade | GTmetrix | F (23%) | A (90%+) | _TBD_ |
| Agentic Browsing | PSI | 0/2 | 2/2 | _TBD_ |

## Akar masalah (dari audit GTmetrix)

1. **Gambar tidak dikompres** — potensi hemat **15.2 MB** dari total 25.5 MB. Biang utama.
2. **JavaScript berat** — 1.8s waktu eksekusi JS, render-blocking (hemat 2.2s).
3. **Server lambat** — TTFB 3.4s, root document 1.6s. Hosting WP + tema `troma`.
4. **65 request chains, 20 long tasks** — plugin (Slider Revolution) menumpuk.

## Kenapa Next.js menang (mapping akar → solusi)

| Akar masalah WP | Solusi Next.js |
|---|---|
| Gambar 15 MB tak dikompres | `next/image` → auto WebP/AVIF + resize + lazy load |
| JS render-blocking | Server Components (0 JS default), `"use client"` hanya di komponen interaktif |
| TTFB 3.4s | SSG (HTML pre-built) + hosting edge/CDN → TTFB <0.2s |
| Tema + plugin bloat | Codebase bersih, hanya dependency terpakai (tree-shaking) |

## Kalimat pamungkas untuk CEO

> "Pak, tiga tool — dua milik Google — verdict sama. Google resmi kasih label FAILED pada Core Web Vitals. Terukur: 25 MB per halaman, 15 MB-nya gambar tak dikompres, server respon 3.4 detik. Ini bukan soal WordPress vs custom — Google menghukum yang LAMBAT. Next.js SSG kirim <2 MB, TTFB <0.2s. Saya tidak berdebat opini, saya tunjukkan angka yang sama, custom menang."

## Aturan presentasi (jangan dilanggar)

- JANGAN janji "ranking #1 minggu pertama". Ranking butuh minggu/bulan + dipengaruhi authority. CEO yang paham SEO langsung tahu itu bohong.
- Yang dijanjikan: (1) menang metrik teknis SEKARANG (100% terkendali), (2) tidak menghilangkan ranking lama, (3) indikator naik terukur di Search Console 2-4 minggu setelah live.
- Dua babak: Babak 1 = diagnosa WP + baseline (meeting ini). Babak 2 = scorecard custom + monitor GSC (setelah staging).
