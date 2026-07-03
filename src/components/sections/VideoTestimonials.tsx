import type { Locale } from '@/types/content'

type VideoTestimonial = {
  quote: string
  clientName: string
  role: string
}

const ITEMS: VideoTestimonial[] = [
  {
    quote:
      'Software ini paling mendekati dengan program CAD yang sebelumnya jika dilihat dari command, output, dan cara printout-nya. License juga sangat mudah diinstal, dan kami sudah memakai ZWCAD selama enam tahun tanpa ada kendala.',
    clientName: 'PT. MidPlaza',
    role: 'CAD MANAGER',
  },
  {
    quote:
      'PT Bridgestone Tire Indonesia sangat menghargai ZW3D karena meningkatkan produktivitas desain dengan fitur lengkap & user-friendly. Biaya terjangkau menjadi solusi ekonomis tanpa mengurangi kualitas. Kami sangat merekomendasikan ZW3D untuk perusahaan yang membutuhkan solusi 3D CAD handal.',
    clientName: 'PT Bridgestone Tire Indonesia',
    role: 'DESIGN & ENGINEERING',
  },
  {
    quote:
      'Software ZWCAD menurut Kami sangat menjawab dan sesuai dengan kebutuhan tim Atelier Riri untuk membantu proses desain serta menggambar dan sangat membantu dalam membuat gambar kerja karena sangat cepat dan ringan saat membuka file. Fitur-fitur yang ada di dalam ZWCAD sangat bermanfaat untuk tim.',
    clientName: 'Atelier Riri',
    role: 'ARCHITECTURAL STUDIO',
  },
]

const COPY: Record<Locale, { eyebrow: string; heading: string }> = {
  id: {
    eyebrow: 'APA KATA KLIEN KAMI',
    heading: 'Video testimonial dari klien nyata, bukan sekadar kata-kata',
  },
  en: {
    eyebrow: 'WHAT OUR CLIENTS SAY',
    heading: 'Video testimonials from real clients, not just words',
  },
}

export function VideoTestimonials({ locale }: { locale: Locale }) {
  const t = COPY[locale]

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          {/* left: eyebrow */}
          <div className="lg:col-span-4">
            <p className="font-mono text-xs font-bold uppercase leading-relaxed tracking-[0.28em] text-orange">
              {t.eyebrow}
            </p>
          </div>

          {/* right: heading */}
          <div className="lg:col-span-8">
            <h2 className="max-w-2xl font-sans text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-5xl">
              {t.heading}
            </h2>
          </div>
        </div>

        {/* testimonial columns */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {ITEMS.map((item) => (
            <figure key={item.clientName} className="flex flex-col">
              {/* quote mark */}
              <span aria-hidden className="font-serif text-4xl font-bold leading-none text-orange">
                &ldquo;
              </span>

              <blockquote className="mt-4 border-l-2 border-orange/70 pl-4 text-sm leading-relaxed text-white/75">
                {item.quote}
              </blockquote>

              <figcaption className="mt-6">
                <p className="font-sans text-base font-bold text-orange">{item.clientName}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                  {item.role}
                </p>
              </figcaption>

              {/* video thumbnail placeholder */}
              <div className="group relative mt-6 aspect-video overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-blue/30 to-navy">
                {/* placeholder label */}
                <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {item.clientName}
                </div>
                <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                  Testimonial
                </div>
                {/* play button */}
                <button
                  type="button"
                  aria-label={`Putar video testimonial ${item.clientName}`}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange text-navy shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </button>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
