import type { Locale } from '@/types/content'

type Column = {
  title: string
  points: string[]
  logos: string[]
}

const COPY: Record<
  Locale,
  {
    eyebrow: string
    heading: string
    columns: Column[]
  }
> = {
  id: {
    eyebrow: 'SOLUSI BERDASARKAN INDUSTRI',
    heading: 'Kami memahami setiap Industri memiliki kebutuhan yang berbeda',
    columns: [
      {
        title: 'Arsitektur & Konstruksi',
        points: [
          'Software BIM & CAD terintegrasi untuk proyek arsitektur dan konstruksi',
          'Implementasi BIM end-to-end dengan dukungan tim lokal berpengalaman',
          'Training & sertifikasi resmi untuk meningkatkan kompetensi tim Anda',
        ],
        logos: ['ZWCAD', 'Archicad', 'SketchUp'],
      },
      {
        title: 'Manufaktur & Desain Produk',
        points: [
          'Alternatif CAD terjangkau dengan lisensi perpetual — bayar sekali, pakai selamanya',
          'Solusi terintegrasi CAD/CAM/CAE untuk seluruh siklus pengembangan produk',
          'Dukungan teknis lokal yang responsif tanpa harus menunggu vendor luar negeri',
        ],
        logos: ['ZWCAD', 'ZW3D'],
      },
    ],
  },
  en: {
    eyebrow: 'INDUSTRY-BASED SOLUTIONS',
    heading: 'We understand every Industry has different needs',
    columns: [
      {
        title: 'Architecture & Construction',
        points: [
          'Integrated BIM & CAD software for architecture and construction projects',
          'End-to-end BIM implementation backed by an experienced local team',
          'Official training & certification to raise your team’s competency',
        ],
        logos: ['ZWCAD', 'Archicad', 'SketchUp'],
      },
      {
        title: 'Manufacturing & Product Design',
        points: [
          'Affordable CAD alternative with perpetual license — pay once, use forever',
          'Integrated CAD/CAM/CAE solution for the entire product development cycle',
          'Responsive local technical support without waiting on overseas vendors',
        ],
        logos: ['ZWCAD', 'ZW3D'],
      },
    ],
  },
}

const COLUMN_IMAGES = ['/images/solutions-1.svg', '/images/solution-2.svg']

export function IndustrySolutions({ locale }: { locale: Locale }) {
  const t = COPY[locale]

  return (
    <section className="relative z-10 overflow-hidden bg-navy text-white">
      {/* warm blur glow, bottom-left behind the wireframe */}
      <img
        src="/images/asset-blur-solution.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-20 left-0 h-[70%] w-[45%] object-contain object-left-bottom"
      />

      {/* wireframe building — large, anchored bottom-left, bleeds off edges */}
      <img
        src="/images/wireframe-building.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -left-8 hidden w-[42%] max-w-[560px] object-contain object-bottom lg:block"
      />

      {/* solution accent — bottom-left, bleeds off edge */}
      <img
        src="/images/asset-solution.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-10 hidden w-[30%] max-w-[380px] object-contain object-left-bottom lg:block"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* left: eyebrow (wireframe sits behind, absolute) */}
          <div className="lg:col-span-4">
            <p className="font-mono text-xs font-bold uppercase leading-relaxed tracking-[0.28em] text-orange">
              {t.eyebrow.split(' ').map((w, i) => (
                <span key={i} className="block">
                  {w}
                </span>
              ))}
            </p>
          </div>

          {/* right: heading + two solution columns */}
          <div className="lg:col-span-8">
            <h2 className="border-l-[3px] border-orange pl-6 font-sans text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-5xl">
              {t.heading}
            </h2>

            <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
              {t.columns.map((col, i) => (
                <div key={col.title}>
                  <h3 className="font-sans text-lg font-bold text-orange md:text-xl">
                    {col.title}
                  </h3>

                  <ul className="mt-5 space-y-4">
                    {col.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 font-sans text-sm leading-relaxed text-white/70"
                      >
                        <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-orange" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* logo row — placeholders */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {col.logos.map((logo) => (
                      <div
                        key={logo}
                        className="flex h-11 min-w-[92px] items-center justify-center rounded border border-white/20 bg-white/[0.03] px-4 font-mono text-xs font-bold tracking-wide text-white/60"
                      >
                        {logo}
                      </div>
                    ))}
                  </div>

                  {/* product image */}
                  <img
                    src={COLUMN_IMAGES[i]}
                    alt={col.title}
                    className="mt-6 aspect-[16/10] w-full rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
