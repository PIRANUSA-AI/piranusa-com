import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { getPost, getPosts } from '@/lib/content'
import { buildMetadata, articleSchema, breadcrumbSchema } from '@/lib/seo'
import type { Locale } from '@/types/content'
import { Link } from '@/i18n/routing'
import { JsonLd } from '@/components/JsonLd'

const LOCALES: Locale[] = ['id', 'en']

const COPY: Record<Locale, { back: string; dateLocale: string; related: string; ctaHeading: string; ctaButton: string }> = {
  id: {
    back: 'Kembali ke Blog',
    dateLocale: 'id-ID',
    related: 'Artikel lainnya',
    ctaHeading: 'Butuh solusi software desain untuk tim Anda?',
    ctaButton: 'KONSULTASI GRATIS',
  },
  en: {
    back: 'Back to Blog',
    dateLocale: 'en-US',
    related: 'More articles',
    ctaHeading: 'Need design software solutions for your team?',
    ctaButton: 'FREE CONSULTATION',
  },
}

export async function generateStaticParams() {
  const posts = getPosts('id')
  return LOCALES.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const typedLocale = locale as Locale
  const post = getPost(slug, typedLocale)

  if (!post) {
    return { title: 'Piranusa' }
  }

  return buildMetadata({
    title: `${post.title[typedLocale]} — Piranusa`,
    description: post.metaDescription[typedLocale],
    path: `/blog/${slug}`,
    locale: typedLocale,
    image: post.coverImage,
  })
}

export default async function BlogArticle({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const typedLocale = locale as Locale
  const post = getPost(slug, typedLocale)

  if (!post) {
    notFound()
  }

  const t = COPY[typedLocale]
  const homeName = typedLocale === 'id' ? 'Beranda' : 'Home'
  const blogName = 'Blog'

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(t.dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })

  const related = getPosts(typedLocale)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)

  return (
    <main className="bg-navy text-white">
      <JsonLd data={articleSchema(post, typedLocale)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: homeName, url: `/${typedLocale}` },
          { name: blogName, url: `/${typedLocale}/blog` },
          { name: post.title[typedLocale], url: `/${typedLocale}/blog/${slug}` },
        ])}
      />

      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-orange transition-colors hover:text-orange/80"
        >
          <span aria-hidden>←</span>
          {t.back}
        </Link>

        <time
          dateTime={post.publishedAt}
          className="mt-8 block font-mono text-[11px] uppercase tracking-[0.1em] text-white/70"
        >
          {formatDate(post.publishedAt)}
        </time>
        <h1 className="mt-3 font-sans text-3xl font-extrabold leading-tight md:text-5xl">
          {post.title[typedLocale]}
        </h1>
        <p className="mt-5 text-lg text-white/80">{post.excerpt[typedLocale]}</p>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-xl">
          <Image
            src={post.coverImage}
            alt={post.title[typedLocale]}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        <div
          className="prose-article mt-12"
          dangerouslySetInnerHTML={{ __html: post.content[typedLocale] }}
        />
      </article>

      {related.length > 0 && (
        <section className="border-t border-white/10 bg-navy-800">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <h2 className="font-sans text-xl font-extrabold md:text-2xl">{t.related}</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-colors hover:border-orange/40 sm:flex-row"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-auto sm:w-40 sm:shrink-0">
                    <Image
                      src={rel.coverImage}
                      alt={rel.title[typedLocale]}
                      fill
                      sizes="(max-width: 640px) 100vw, 160px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <time
                      dateTime={rel.publishedAt}
                      className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/60"
                    >
                      {formatDate(rel.publishedAt)}
                    </time>
                    <h3 className="font-sans text-base font-bold leading-snug group-hover:text-orange">
                      {rel.title[typedLocale]}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-orange">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-16 text-navy md:flex-row md:items-center md:justify-between md:py-20">
          <h2 className="max-w-xl font-sans text-2xl font-extrabold md:text-3xl">{t.ctaHeading}</h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-navy px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-navy/90"
          >
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  )
}
