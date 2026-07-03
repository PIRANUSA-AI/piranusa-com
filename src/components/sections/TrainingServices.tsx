import type { Locale } from '@/types/content'

type Copy = {
  eyebrow: string
  heading: string
  body: string
  points: string[]
  cta: string
}

const COPY: Record<Locale, Copy> = {
  id: {
    eyebrow: 'TRAINING & LAYANAN',
    heading: 'Bukan hanya software, kami melatih dan mensertifikasi tim Anda',
    body: 'Investasi software baru hanya bernilai jika tim Anda benar-benar menguasainya. PIRANUSA menyediakan fasilitas training dan sertifikasi CAD & BIM yang didukung oleh instruktur berpengalaman.',
    points: [
      'Training CAD 2D & 3D bersertifikat resmi',
      'Implementasi BIM end-to-end dengan dukungan penuh',
      'Sertifikasi tim untuk standar kompetensi profesional',
    ],
    cta: 'PROGRAM TRAINING',
  },
  en: {
    eyebrow: 'TRAINING & SERVICES',
    heading: 'More than software, we train and certify your team',
    body: 'New software only pays off when your team truly masters it. PIRANUSA provides CAD & BIM training and certification facilities backed by experienced instructors.',
    points: [
      'Officially certified 2D & 3D CAD training',
      'End-to-end BIM implementation with full support',
      'Team certification for professional competency standards',
    ],
    cta: 'TRAINING PROGRAM',
  },
}

// Three training photos supplied by the client.
const PHOTOS = [
  { src: '/images/training-1.svg', alt: 'Sesi training kelas PIRANUSA' },
  { src: '/images/training-2.svg', alt: 'Praktik langsung CAD di workstation' },
  { src: '/images/training-3.svg', alt: 'Pendampingan implementasi BIM' },
] as const

export function TrainingServices({ locale }: { locale: Locale }) {
  const t = COPY[locale]

  return (
    <section className="relative bg-white text-navy">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* left: eyebrow */}
          <div className="lg:col-span-3">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-orange">
              {t.eyebrow}
            </p>
          </div>

          {/* right: heading + wireframe render + body + points */}
          <div className="relative lg:col-span-9">
            {/* orange wireframe render — overlaps heading top-right on desktop */}
            <img
              aria-hidden
              src="/images/asset-training.png"
              alt=""
              className="pointer-events-none absolute -top-10 right-0 hidden w-80 select-none lg:block"
            />

            <h2 className="relative max-w-2xl border-l-[3px] border-orange pl-6 font-sans text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-5xl">
              {t.heading}
            </h2>

            <p className="mt-8 max-w-xl font-sans text-sm leading-relaxed text-navy/70 md:text-base">
              {t.body}
            </p>

            <ul className="mt-6 space-y-3">
              {t.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 font-sans text-sm leading-relaxed text-navy/80"
                >
                  <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-orange" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* three training photos */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 md:mt-20">
          {PHOTOS.map((photo) => (
            <img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14">
          <a
            href="#"
            className="accent-bar inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.15em] text-navy transition-colors hover:text-orange"
          >
            {t.cta}
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
