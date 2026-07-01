import type { Locale, Testimonial } from '@/types/content'

const COPY: Record<Locale, { eyebrow: string; heading: string }> = {
  id: { eyebrow: 'BUKTI SOSIAL YANG NYATA', heading: 'Dipercaya Perusahaan Terkemuka Indonesia' },
  en: { eyebrow: 'REAL SOCIAL PROOF', heading: "Trusted by Indonesia's Leading Companies" },
}

export function Testimonials({
  locale,
  testimonials,
}: {
  locale: Locale
  testimonials: Testimonial[]
}) {
  const t = COPY[locale]

  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange">{t.eyebrow}</p>
        <h2 className="mt-4 max-w-2xl font-sans text-2xl font-extrabold md:text-4xl">
          {t.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.clientName}
              className="flex flex-col justify-between gap-6 rounded-lg border border-white/10 bg-white/5 p-6"
            >
              <blockquote className="text-sm leading-relaxed text-white/80">
                &ldquo;{testimonial.quote[locale]}&rdquo;
              </blockquote>
              <figcaption className="font-sans text-sm font-bold uppercase tracking-[0.1em] text-orange">
                {testimonial.clientName}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
