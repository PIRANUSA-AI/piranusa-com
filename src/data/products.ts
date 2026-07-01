import type { Product } from '@/types/content'

const ctaWhatsapp = '+628111085850'

export const products: Product[] = [
  {
    slug: 'zwcad',
    name: { id: 'ZWCAD', en: 'ZWCAD' },
    description: {
      id: 'ZWCAD adalah software CAD 2D/3D yang menjadi alternatif AutoCAD dengan kompatibilitas penuh terhadap format .dwg. Cocok untuk arsitek, engineer, dan drafter yang membutuhkan tools gambar teknik yang cepat dan familiar.',
      en: 'ZWCAD is a 2D/3D CAD software that serves as an AutoCAD alternative with full .dwg format compatibility. Ideal for architects, engineers, and drafters who need fast, familiar technical drawing tools.',
    },
    version: '2026',
    logo: '/images/products/zwcad-logo.png',
    gallery: [
      '/images/products/zwcad-1.jpg',
      '/images/products/zwcad-2.jpg',
      '/images/products/zwcad-3.jpg',
    ],
    category: 'cad',
    features: {
      id: [
        'Kompatibilitas penuh dengan format file .dwg',
        'Antarmuka familiar bagi pengguna AutoCAD',
        'Mendukung gambar teknik 2D dan model 3D',
        'Harga lisensi lebih terjangkau dibanding kompetitor',
      ],
      en: [
        'Full compatibility with .dwg file format',
        'Familiar interface for AutoCAD users',
        'Supports 2D technical drawing and 3D modeling',
        'More affordable licensing than competitors',
      ],
    },
    ctaWhatsapp,
  },
  {
    slug: 'archicad',
    name: { id: 'Archicad', en: 'Archicad' },
    description: {
      id: 'Archicad adalah software BIM (Building Information Modeling) yang dirancang khusus untuk arsitek. Memungkinkan desain, dokumentasi, dan kolaborasi proyek bangunan dalam satu model 3D terpadu.',
      en: 'Archicad is a Building Information Modeling (BIM) software designed specifically for architects. It enables design, documentation, and project collaboration within a single unified 3D model.',
    },
    version: '29',
    logo: '/images/products/archicad-logo.png',
    gallery: [
      '/images/products/archicad-1.jpg',
      '/images/products/archicad-2.jpg',
      '/images/products/archicad-3.jpg',
    ],
    category: 'bim',
    features: {
      id: [
        'Workflow BIM end-to-end untuk arsitektur',
        'Kolaborasi real-time dengan tim engineer via BIMcloud',
        'Dokumentasi konstruksi otomatis dari model 3D',
        'Terintegrasi dengan fitur AI untuk desain lebih cepat',
      ],
      en: [
        'End-to-end BIM workflow for architecture',
        'Real-time collaboration with engineering teams via BIMcloud',
        'Automated construction documentation from the 3D model',
        'Integrated AI features for faster design',
      ],
    },
    ctaWhatsapp,
  },
  {
    slug: 'zw3d',
    name: { id: 'ZW3D', en: 'ZW3D' },
    description: {
      id: 'ZW3D adalah software CAD/CAM 3D yang dirancang untuk kebutuhan manufaktur dan desain produk. Menggabungkan pemodelan solid, surface, dan machining dalam satu platform.',
      en: 'ZW3D is a 3D CAD/CAM software built for manufacturing and product design needs. It combines solid modeling, surface modeling, and machining in a single platform.',
    },
    version: '2026',
    logo: '/images/products/zw3d-logo.png',
    gallery: [
      '/images/products/zw3d-1.jpg',
      '/images/products/zw3d-2.jpg',
      '/images/products/zw3d-3.jpg',
    ],
    category: 'cad',
    features: {
      id: [
        'Pemodelan hybrid solid dan surface',
        'Modul CAM terintegrasi untuk mesin CNC',
        'Mendukung desain cetakan (mold) dan produk manufaktur',
        'Interoperabilitas dengan format CAD populer lainnya',
      ],
      en: [
        'Hybrid solid and surface modeling',
        'Integrated CAM module for CNC machining',
        'Supports mold design and manufacturing product design',
        'Interoperability with other popular CAD formats',
      ],
    },
    ctaWhatsapp,
  },
  {
    slug: 'sketchup',
    name: { id: 'SketchUp', en: 'SketchUp' },
    description: {
      id: 'SketchUp adalah software pemodelan 3D yang intuitif untuk kebutuhan arsitektur, desain interior, dan konstruksi. Terkenal karena kemudahan belajar dan kecepatan dalam membuat konsep desain.',
      en: 'SketchUp is an intuitive 3D modeling software for architecture, interior design, and construction needs. Known for its ease of learning and speed in producing design concepts.',
    },
    version: '2026',
    logo: '/images/products/sketchup-logo.png',
    gallery: [
      '/images/products/sketchup-1.jpg',
      '/images/products/sketchup-2.jpg',
      '/images/products/sketchup-3.jpg',
    ],
    category: '3d',
    features: {
      id: [
        'Antarmuka intuitif, mudah dipelajari pemula',
        'Library model 3D siap pakai dari 3D Warehouse',
        'Ekstensi plugin yang luas untuk berbagai kebutuhan',
        'Cocok untuk konsep desain cepat hingga presentasi klien',
      ],
      en: [
        'Intuitive interface, easy for beginners to learn',
        'Ready-to-use 3D model library from 3D Warehouse',
        'Extensive plugin ecosystem for various needs',
        'Great for fast design concepts through client presentations',
      ],
    },
    ctaWhatsapp,
  },
  {
    slug: 'enscape',
    name: { id: 'Enscape', en: 'Enscape' },
    description: {
      id: 'Enscape adalah plugin real-time rendering dan virtual reality untuk arsitektur, memungkinkan visualisasi instan langsung dari software desain seperti Archicad, Revit, dan SketchUp.',
      en: 'Enscape is a real-time rendering and virtual reality plugin for architecture, enabling instant visualization directly from design software such as Archicad, Revit, and SketchUp.',
    },
    version: '2026',
    logo: '/images/products/enscape-logo.png',
    gallery: [
      '/images/products/enscape-1.jpg',
      '/images/products/enscape-2.jpg',
      '/images/products/enscape-3.jpg',
    ],
    category: 'rendering',
    features: {
      id: [
        'Rendering real-time langsung dari software desain',
        'Dukungan virtual reality (VR) untuk walkthrough proyek',
        'Tidak perlu proses render terpisah yang lama',
        'Integrasi langsung dengan Archicad, Revit, SketchUp, dan Rhino',
      ],
      en: [
        'Real-time rendering directly from design software',
        'Virtual reality (VR) support for project walkthroughs',
        'No lengthy separate rendering process required',
        'Direct integration with Archicad, Revit, SketchUp, and Rhino',
      ],
    },
    ctaWhatsapp,
  },
  {
    slug: 'd5-render',
    name: { id: 'D5 Render', en: 'D5 Render' },
    description: {
      id: 'D5 Render adalah software rendering real-time berbasis AI yang dirancang untuk visualisasi arsitektur berkualitas tinggi dengan waktu kerja yang jauh lebih singkat.',
      en: 'D5 Render is an AI-powered real-time rendering software designed for high-quality architectural visualization with significantly shorter turnaround time.',
    },
    version: '2026',
    logo: '/images/products/d5-render-logo.png',
    gallery: [
      '/images/products/d5-render-1.jpg',
      '/images/products/d5-render-2.jpg',
      '/images/products/d5-render-3.jpg',
    ],
    category: 'rendering',
    features: {
      id: [
        'Rendering real-time dengan kualitas visual tinggi',
        'Fitur AI untuk mempercepat pembuatan material dan scene',
        'Library aset dan material siap pakai yang luas',
        'Ekspor gambar, video, dan panorama 360 derajat',
      ],
      en: [
        'Real-time rendering with high visual quality',
        'AI features to speed up material and scene creation',
        'Extensive library of ready-to-use assets and materials',
        'Export images, video, and 360-degree panoramas',
      ],
    },
    ctaWhatsapp,
  },
]
