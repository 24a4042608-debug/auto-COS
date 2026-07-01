export interface BrandStory {
  year: string;
  title: string;
  description: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  coverImage: string;
  year: string;
  season: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: string;
  description: string;
  shortDescription: string;
  images: string[];
  collectionSlug: string;
  fabric: string;
  care: string[];
  details: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  isEditorsPick?: boolean;
  isNewArrival?: boolean;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  align: 'left' | 'right' | 'center';
  quote?: string;
  products: string[]; // Related product slugs
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  content: string[];
  author: string;
}

export interface StoreLocation {
  city: string;
  name: string;
  address: string;
  phone: string;
  hours: string[];
}

export const LUXURY_COLLECTIONS: Collection[] = [
  {
    id: 'c1',
    slug: 'la-silhouette-et-le-vide',
    name: 'La Silhouette et le Vide',
    tagline: 'An exploration of empty space and form.',
    description: 'Inspired by brutalist architecture and mid-century tailoring, this collection uses sharp angles, oversized shoulders, and dramatic draping to redefine the boundary between garment and body. Each piece is crafted from heavy Italian wool and structured silk organza.',
    coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
    year: '2026',
    season: 'Autumn / Winter'
  },
  {
    id: 'c2',
    slug: 'organic-minimalism',
    name: 'Organic Minimalism',
    tagline: 'Quiet luxury in raw, breathable fibers.',
    description: 'A study in restraint. Designed for effortless transitions, this capsule highlights raw organic cotton, unbleached linen, and pure Mongolian cashmere. Undyed finishes show off the natural variations of the plant and animal fibers.',
    coverImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop',
    year: '2026',
    season: 'Spring / Summer'
  },
  {
    id: 'c3',
    slug: 'technical-brutalisme',
    name: 'Technical Brutalisme',
    tagline: 'Performance details met with architectural cuts.',
    description: 'Bridging high-performance technical fabrics with sculptural haute couture styling. Waterproof membranes, taped seams, and lightweight technical nylons are fashioned into flowing, elegant shapes that defy conventional outerwear.',
    coverImage: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1200&auto=format&fit=crop',
    year: '2026',
    season: 'Monsoon / Transition'
  }
];

export const LUXURY_PRODUCTS: Product[] = [
  {
    id: 'p1',
    slug: 'silk-organza-trench',
    name: 'Silk Organza Trench Coat',
    price: '$2,850',
    shortDescription: 'A structured, semi-translucent trench coat woven from pure Italian mulberry silk organza.',
    description: 'Redefining the classic trench, this sheer statement piece is engineered to float over undergarments with structural grace. Features hand-finished horn buttons, an oversized storm flap, and raw edges that emphasize the material\'s delicate transparency.',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop'
    ],
    collectionSlug: 'la-silhouette-et-le-vide',
    fabric: '100% Italian Mulberry Silk Organza. Buttons: 100% Genuine Buffalo Horn.',
    care: [
      'Dry clean only by specialists.',
      'Do not wash or tumble dry.',
      'Cool iron with a press cloth if necessary.'
    ],
    details: [
      'Oversized silhouette with drop shoulders',
      'Storm flap detail with double button styling',
      'Removable belt with embroidered eyelets',
      'Semi-sheer finish showing internal craftsmanship seams'
    ],
    colors: [
      { name: 'Alabaster', hex: '#F6F5F2' },
      { name: 'Obsidian', hex: '#111111' }
    ],
    sizes: ['FR 34', 'FR 36', 'FR 38', 'FR 40'],
    isEditorsPick: true,
    isNewArrival: true
  },
  {
    id: 'p2',
    slug: 'cashmere-cocoon-knitwear',
    name: 'Cashmere Cocoon Knitwear',
    price: '$1,200',
    shortDescription: 'A heavy-gauge sweater crafted from undyed Mongolian cashmere with an arching back contour.',
    description: 'Spun from the finest Grade-A cashmere fibers, this sweater features a unique cocoon-like shape that arches gracefully at the back. The yarn is completely undyed, maintaining its signature lofty hand-feel and breathable warmth.',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1000&auto=format&fit=crop'
    ],
    collectionSlug: 'organic-minimalism',
    fabric: '100% Grade-A Mongolian Cashmere (Undyed). Hand-harvested.',
    care: [
      'Hand wash in cold water using neutral soap.',
      'Dry flat on a clean towel in the shade.',
      'Do not wring or hang to dry.'
    ],
    details: [
      'Curved cocoon back volume',
      'Extended mock neck collar',
      'Ribbed knit details on cuffs and hem',
      'Extremely soft lofted texture'
    ],
    colors: [
      { name: 'Warm Taupe', hex: '#C2B6A6' },
      { name: 'Charcoal', hex: '#373A40' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isEditorsPick: true,
    isNewArrival: true
  },
  {
    id: 'p3',
    slug: 'asymmetric-wool-blazer',
    name: 'Asymmetric Virgin Wool Blazer',
    price: '$1,950',
    shortDescription: 'An sculptural blazer featuring an off-center closure and dramatic draped lapel.',
    description: 'Constructed using traditional sartorial floating canvas techniques, this blazer wraps the torso with structured asymmetry. The fabric is a robust, clean-finished virgin wool sourced from an historic mill in Biella, Italy.',
    images: [
      'https://images.unsplash.com/photo-1548624149-f7b3e55047b7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1000&auto=format&fit=crop'
    ],
    collectionSlug: 'la-silhouette-et-le-vide',
    fabric: 'Shell: 100% Virgin Wool (Italy). Lining: 100% Cupro.',
    care: [
      'Dry clean only by heritage dry cleaners.',
      'Store on a broad-shoulder wooden hanger.'
    ],
    details: [
      'Single-button asymmetric wrap construction',
      'Floating interior chest canvas',
      'Hidden slip pocket at front closure',
      'Working cuff buttonholes'
    ],
    colors: [
      { name: 'Midnight', hex: '#1C2333' },
      { name: 'Cream', hex: '#FFFDF9' }
    ],
    sizes: ['IT 38', 'IT 40', 'IT 42', 'IT 44'],
    isEditorsPick: false,
    isNewArrival: true
  },
  {
    id: 'p4',
    slug: 'technical-shell-parka',
    name: 'Technical Shell Parka',
    price: '$1,650',
    shortDescription: 'An ultra-light, waterproof shell featuring architectural draping and laser-cut details.',
    description: 'Merging technical excellence with high fashion, this waterproof shell uses a customized matte nylon membrane. Designed with an oversized circular volume that drapes beautifully when worn open, it features fully taped internal seams.',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop'
    ],
    collectionSlug: 'technical-brutalisme',
    fabric: '92% Nylon, 8% Elastane. 3-Layer waterproof membrane with DWR finish.',
    care: [
      'Machine wash cold on gentle cycle.',
      'Tumble dry low to reactivate water repellent finish.',
      'Do not use fabric softeners.'
    ],
    details: [
      'Fully seam-sealed 10k waterproof rating',
      'Asymmetric dual-zipper front ventilation',
      'Concealed hood with laser-cut eyelets',
      'Waterproof AquaGuard zippers'
    ],
    colors: [
      { name: 'Sandstorm', hex: '#DFD3C3' },
      { name: 'Black', hex: '#1C1C1C' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isEditorsPick: true,
    isNewArrival: false
  },
  {
    id: 'p5',
    slug: 'raw-cotton-trouser',
    name: 'Raw Cotton Pleated Trouser',
    price: '$780',
    shortDescription: 'A wide-leg trouser cut from heavy, double-twisted organic cotton drill.',
    description: 'These trousers offer a robust architectural structure. They feature deep double front pleats, a high-rise waistband, and a long pooling hem. Made from natural, uncombed GOTS certified cotton that shows microscopic specks of the cotton plant.',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?q=80&w=1000&auto=format&fit=crop'
    ],
    collectionSlug: 'organic-minimalism',
    fabric: '100% GOTS Certified Organic Cotton (Unbleached). 14oz.',
    care: [
      'Wash inside out in cold water.',
      'Do not bleach.',
      'Line dry to maintain fabric shape and texture.'
    ],
    details: [
      'Double front knife-pleats',
      'Extra-wide cuff pooling design',
      'Adjustable side waist adjusters with silver hardware',
      'French seam finishing inside'
    ],
    colors: [
      { name: 'Off-White', hex: '#FAF9F6' },
      { name: 'Charcoal', hex: '#2F3640' }
    ],
    sizes: ['28', '30', '32', '34'],
    isEditorsPick: false,
    isNewArrival: true
  }
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'lb1',
    title: 'The Poetry of Spacing',
    subtitle: 'Fall / Winter Campaign',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop',
    align: 'left',
    quote: 'In tailoring, what is omitted is as critical as what is sewn. The volume of air surrounding the body creates the character.',
    products: ['silk-organza-trench', 'asymmetric-wool-blazer']
  },
  {
    id: 'lb2',
    title: 'Undyed Purity',
    subtitle: 'Spring / Summer Campaign',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    align: 'right',
    quote: 'Allowing raw, uncombed organic textures to express their narrative without artificial interference.',
    products: ['cashmere-cocoon-knitwear', 'raw-cotton-trouser']
  },
  {
    id: 'lb3',
    title: 'Architectural Performance',
    subtitle: 'Monsoon Campaign',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
    align: 'center',
    quote: 'Protecting the organic form through geometric shieldings.',
    products: ['technical-shell-parka']
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'j1',
    slug: 'poetry-of-spacing-cocoon-silhouette',
    title: 'The Poetry of Spacing: Designing the Cocoon Silhouette',
    subtitle: 'A conversation with our chief draper on structural volume and air.',
    category: 'Design Manifesto',
    date: 'June 18, 2026',
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1200&auto=format&fit=crop',
    content: [
      'Tailoring has always been defined by its closeness to the skin. The classic suit is padded, structured, and cinched to match human anatomy. But what happens when we step away from constraints and allow the fabric to map its own trajectory?',
      'Our latest collection, "La Silhouette et le Vide," plays explicitly with the space between. By contouring the garment away from the spine, we establish a dynamic pocket of space—an architectural void that fills with movement.',
      'Our lead draper, speaking from our Paris atelier, explains: "We spent three months adjusting the curve of the cashmere knit sleeve. It isn\'t simply oversized; it is an engineered parabola that supports itself. The garment does not hang on the body; it frames it."'
    ],
    author: 'Elena Rostova'
  },
  {
    id: 'j2',
    slug: 'from-wool-to-wardrobe-craft-of-biella',
    title: 'From Wool to Wardrobe: The Craft of Italian Tailoring',
    subtitle: 'Tracing our virgin wool from the green foothills of Biella to the atelier.',
    category: 'Craftsmanship',
    date: 'May 04, 2026',
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1200&auto=format&fit=crop',
    content: [
      'Deep in the Piedmont region of Northern Italy lies Biella, a town renowned for its pristine alpine waters. It is these very waters, low in calcium and sodium, that wash our raw virgin wool, giving it a softness and flexibility that cannot be replicated anywhere else on Earth.',
      'We partner with a fourth-generation family mill that blends traditional wash methods with modern, closed-loop water treatment. 98% of the water used in the washing process is recycled back into the local ecosystem cleaner than when it entered.',
      'This wool is then woven on historical looms that operate at slow speeds to preserve the natural curl and resilience of the wool fiber. When you touch the Asymmetric Blazer, you are feeling centuries of regional mastery.'
    ],
    author: 'Marcus Vance'
  },
  {
    id: 'j3',
    slug: 'undyed-fibers-ecological-implications',
    title: 'The Beauty of Zero Dye: Ecological Implications of Raw Textiles',
    subtitle: 'Why the future of fashion might be uncolored.',
    category: 'Sustainability',
    date: 'April 12, 2026',
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1200&auto=format&fit=crop',
    content: [
      'Chemical dyeing is historically one of the most toxic segments of garment manufacturing. By selecting unbleached, undyed wool, cashmere, and organic cotton, we eliminate 100% of the dyeing process chemicals and reduce our water footprint by over 80%.',
      'But the ecological benefits are only half the story. Visually, undyed fibers possess a depth of color that is impossible to achieve artificially. The natural cream of organic cotton has microscopic speckles of the plant stem, giving it a genuine, tactile luxury.',
      'Our commitment is to never dye our core collection capsules, showing the world that authentic luxury is found in the unaltered colors of nature.'
    ],
    author: 'Clara Dupont'
  }
];

export const BRAND_TIMELINE: BrandStory[] = [
  {
    year: '2020',
    title: 'The Inception',
    description: 'Founded in Milan by a collective of designers and architects with a mission to create sculptural, high-fashion outerwear.'
  },
  {
    year: '2022',
    title: 'The Zero Dye Initiative',
    description: 'Completely eliminated artificial dyes from all organic capsules, partnering with heritage mills in Biella and Kyoto.'
  },
  {
    year: '2024',
    title: 'Paris Atelier Launch',
    description: 'Opened our dedicated high-tailoring atelier in Le Marais, Paris, focusing on bespoke draping and technical construction.'
  },
  {
    year: '2026',
    title: 'Architectural Campaigns',
    description: 'Released the flagship lookbook trilogy exploring brutalist spaces and the relationship between structural volume and human movement.'
  }
];

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    city: 'Paris',
    name: 'Atelier & Flagship Marais',
    address: '42 Rue de Sévigné, 75003 Paris, France',
    phone: '+33 1 42 74 98 12',
    hours: ['Mon - Sat: 11:00 - 19:00', 'Sunday: Closed']
  },
  {
    city: 'Milan',
    name: 'Milano Quadrilatero',
    address: 'Via della Spiga, 15, 20121 Milano MI, Italy',
    phone: '+39 02 7600 8714',
    hours: ['Mon - Sat: 10:00 - 19:30', 'Sunday: 11:00 - 18:00']
  },
  {
    city: 'Tokyo',
    name: 'Aoyama Sanctuary',
    address: '5-11-9 Minami-Aoyama, Minato-ku, Tokyo 107-0062, Japan',
    phone: '+81 3 5468 9801',
    hours: ['Everyday: 11:00 - 20:00']
  }
];
