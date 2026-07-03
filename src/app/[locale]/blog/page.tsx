import type { Metadata } from 'next'
import Image from 'next/image'
import { setRequestLocale } from 'next-intl/server'
import { getPosts } from '@/lib/content'
import { buildMetadata, breadcrumbSchema } from '@/lib/seo'
import type { Locale } from '@/types/content'
import { Link } from '@/i18n/routing'
import { JsonLd } from '@/components/JsonLd'

const META = {
  id: {
    title: 'Blog — Wawasan CAD, BIM & Rendering | Piranusa',
    description:
      'Artikel dan wawasan seputar CAD, BIM, rendering, dan teknologi desain terbaru dari PIRANUSA, distributor resmi software desain terkemuka.',
  },
  en: {
    title: 'Blog — CAD, BIM & Rendering Insights | Piranusa',
    description:
      'Articles and insights on CAD, BIM, rendering, and the latest design technology from PIRANUSA, official distributor of leading design software.',
  },
} as const

const COPY: Record<Locale, { eyebrow: string; heading: string; subhead: string; readMore: string; dateLocale: string }> = {
  id: {
    eyebrow: 'BLOG',
    heading: 'Wawasan CAD, BIM & Rendering',
    subhead:
      'Tips, tren, dan panduan praktis seputar software desain 2D/3D, BIM, dan rendering untuk membantu produktivitas tim Anda.',
    readMore: 'Baca selengkapnya',
    dateLocale: 'id-ID',
  },
  en: {
    eyebrow: 'BLOG',
    heading: 'CAD, BIM & Rendering Insights',
    subhead:
      'Tips, trends, and practical guides on 2D/3D design, BIM, and rendering software to help boost your team’s productivity.',
    readMore: 'Read more',
    dateLocale: 'en-US',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = META[locale as Locale]
  return buildMetadata({
    title: t.title,
    description: t.description,
    path: '/blog',
    locale: locale as Locale,
  })
}

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const typedLocale = locale as Locale
  const t = COPY[typedLocale]
  const posts = getPosts(typedLocale)

  const homeName = typedLocale === 'id' ? 'Beranda' : 'Home'
  const blogName = 'Blog'

  const [featured, ...rest] = posts

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(t.dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <main className="bg-navy text-white">
      <JsonLd
        data={breadcrumbSchema([
          { name: homeName, url: `/${typedLocale}` },
          { name: blogName, url: `/${typedLocale}/blog` },
        ])}
      />

      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="accent-bar font-mono text-xs uppercase tracking-[0.25em] text-orange">
          {t.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-sans text-3xl font-extrabold md:text-5xl">
          {t.heading}
        </h1>
        <p className="mt-6 max-w-2xl text-base text-white/80">{t.subhead}</p>

        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-14 grid grid-cols-1 gap-8 overflow-hidden rounded-xl border border-white/10 bg-white/5 md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto">
              <Image
                src={featured.coverImage}
                alt={featured.title[typedLocale]}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
              <time
                dateTime={featured.publishedAt}
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-orange"
              >
                {formatDate(featured.publishedAt)}
              </time>
              <h2 className="font-sans text-2xl font-extrabold leading-tight md:text-3xl">
                {featured.title[typedLocale]}
              </h2>
              <p className="text-sm text-white/70 md:text-base">{featured.excerpt[typedLocale]}</p>
              <span className="mt-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-orange">
                {t.readMore}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-colors hover:border-orange/40"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title[typedLocale]}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <time
                    dateTime={post.publishedAt}
                    className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/70"
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                  <h3 className="font-sans text-lg font-bold leading-snug group-hover:text-orange">
                    {post.title[typedLocale]}
                  </h3>
                  <p className="line-clamp-3 text-sm text-white/70">{post.excerpt[typedLocale]}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
