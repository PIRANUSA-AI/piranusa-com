'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Locale } from '@/types/content'

const COPY: Record<
  Locale,
  {
    eyebrow: string
    heading: string
    items: { q: string; a: string }[]
  }
> = {
  id: {
    eyebrow: 'Frequently Asked Questions',
    heading: 'Informasi yang Mungkin Anda Cari',
    items: [
      {
        q: 'Produk apa saja yang disediakan oleh Piranusa?',
        a: 'Piranusa menyediakan software desain profesional seperti ZWCAD, Archicad, ZW3D, Enscape, SketchUp, D5 Render, Adobe, Kaspersky, dan Microsoft dengan lisensi resmi.',
      },
      {
        q: 'Apakah Piranusa menyediakan layanan pelatihan?',
        a: 'Ya. Kami menyediakan pelatihan resmi untuk setiap produk agar tim Anda dapat memaksimalkan penggunaan software sesuai kebutuhan proyek.',
      },
      {
        q: 'Apakah tersedia dukungan teknis setelah pembelian?',
        a: 'Tentu. Setiap pembelian dilengkapi dukungan teknis dari tim bersertifikat untuk memastikan software berjalan optimal.',
      },
      {
        q: 'Apakah Piranusa melayani klien di seluruh Indonesia?',
        a: 'Ya. Dengan kantor di Jakarta dan Surabaya, kami melayani klien di seluruh wilayah Indonesia baik on-site maupun daring.',
      },
      {
        q: 'Bagaimana cara berkonsultasi atau mendapatkan penawaran?',
        a: 'Hubungi kami melalui WhatsApp, telepon, atau email. Tim kami akan membantu menyusun penawaran sesuai kebutuhan Anda.',
      },
    ],
  },
  en: {
    eyebrow: 'Frequently Asked Questions',
    heading: 'Information You Might Be Looking For',
    items: [
      {
        q: 'What products does Piranusa provide?',
        a: 'Piranusa provides professional design software such as ZWCAD, Archicad, ZW3D, Enscape, SketchUp, D5 Render, Adobe, Kaspersky, and Microsoft with official licenses.',
      },
      {
        q: 'Does Piranusa provide training services?',
        a: 'Yes. We offer official training for every product so your team can get the most out of the software for your projects.',
      },
      {
        q: 'Is technical support available after purchase?',
        a: 'Absolutely. Every purchase includes technical support from our certified team to keep your software running optimally.',
      },
      {
        q: 'Does Piranusa serve clients across Indonesia?',
        a: 'Yes. With offices in Jakarta and Surabaya, we serve clients throughout Indonesia, both on-site and remotely.',
      },
      {
        q: 'How can I get a consultation or a quote?',
        a: 'Reach us via WhatsApp, phone, or email. Our team will help prepare a quote tailored to your needs.',
      },
    ],
  },
}

export function FaqSection({ locale }: { locale: Locale }) {
  const t = COPY[locale]
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-navy py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-[1fr_2fr] md:gap-16">
        <div>
          <p className="accent-bar text-xs font-semibold uppercase tracking-[0.2em] text-orange">
            {t.eyebrow}
          </p>
        </div>

        <div>
          <h2 className="max-w-xl text-3xl font-bold leading-tight text-white md:text-4xl">
            {t.heading}
          </h2>

          <div className="mt-10 flex flex-col gap-3">
            {t.items.map((item, i) => {
              const isOpen = open === i
              return (
                <div key={item.q} className="overflow-hidden rounded-md bg-white">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-stretch text-left"
                  >
                    <span className="flex w-12 shrink-0 items-center justify-center bg-orange text-white">
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </span>
                    <span className="flex-1 px-5 py-4 text-sm font-semibold text-navy md:text-base">
                      {item.q}
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 pl-[68px] text-sm leading-relaxed text-navy/70">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
