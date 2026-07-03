import Image from 'next/image'
import { Link } from '@/i18n/routing'
import type { Locale, Post } from '@/types/content'

const COPY: Record<Locale, { eyebrow: string; heading: string; viewAll: string; dateLocale: string }> = {
  id: {
    eyebrow: 'ARTIKEL TERBARU',
    heading: 'Wawasan CAD, BIM & Rendering',
    viewAll: 'Lihat semua artikel',
    dateLocale: 'id-ID',
  },
  en: {
    eyebrow: 'LATEST ARTICLES',
    heading: 'CAD, BIM & Rendering Insights',
    viewAll: 'View all articles',
    dateLocale: 'en-US',
  },
}

export function LatestPosts({ locale, posts }: { locale: Locale; posts: Post[] }) {
  const t = COPY[locale]
  const latest = posts.slice(0, 3)

  return (
    <section className="bg-navy-800 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="accent-bar font-mono text-xs uppercase tracking-[0.25em] text-orange">
          {t.eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl font-sans text-2xl font-extrabold md:text-4xl">
          {t.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-white/5"
            >
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={post.coverImage}
                  alt={post.title[locale]}
                  width={480}
                  height={270}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <time
                  dateTime={post.publishedAt}
                  className="font-mono text-[11px] uppercase tracking-[0.1em] text-white/70"
                >
                  {new Date(post.publishedAt).toLocaleDateString(t.dateLocale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <h3 className="font-sans text-lg font-bold text-white group-hover:text-orange">
                  {post.title[locale]}
                </h3>
                <p className="line-clamp-3 text-sm text-white/70">{post.excerpt[locale]}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-orange hover:text-orange/80"
          >
            {t.viewAll}
          </Link>
        </div>
      </div>
    </section>
  )
}
