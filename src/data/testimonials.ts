import type { Testimonial } from '@/types/content'

export const testimonials: Testimonial[] = [
  {
    clientName: 'PT Indovickers Furnitama',
    logo: '/images/clients/pt-indovickers-furnitama.png',
    quote: {
      id: 'ZWCAD sangat membantu tim desain kami dalam menghasilkan gambar teknik furnitur secara cepat dan akurat, tanpa perlu membeli lisensi software CAD yang mahal.',
      en: 'ZWCAD has greatly helped our design team produce furniture technical drawings quickly and accurately, without needing to purchase expensive CAD software licenses.',
    },
  },
  {
    clientName: 'PT PLN Indonesia Power',
    logo: '/images/clients/pt-pln-indonesia-power.png',
    quote: {
      id: 'Dukungan tim Piranusa dalam implementasi ZWCAD di lingkungan kerja kami sangat responsif, membantu proses adopsi software berjalan lancar di berbagai unit kerja.',
      en: 'Piranusa\'s support team was very responsive during ZWCAD implementation in our work environment, helping the software adoption process run smoothly across various work units.',
    },
  },
  {
    clientName: 'PT Bridgestone Tire Indonesia',
    logo: '/images/clients/pt-bridgestone-tire-indonesia.png',
    quote: {
      id: 'Dengan ZW3D, tim engineering kami dapat mempercepat proses desain dan machining komponen produksi tanpa mengorbankan tingkat presisi yang dibutuhkan industri manufaktur.',
      en: 'With ZW3D, our engineering team can speed up the design and machining process for production components without compromising the precision required by the manufacturing industry.',
    },
  },
]
