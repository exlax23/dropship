export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  price: number
  cost: number
  originalPrice?: number
  category: 'calm' | 'hydration' | 'wellness'
  badge?: string
  gradient: string
  accentColor: string
  emoji: string
  specs: Record<string, string>
  features: string[]
  related: string[]
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'pura-lick-mat',
    name: 'PURA Lick Mat',
    tagline: 'Calm your cat in minutes.',
    price: 32,
    cost: 7,
    category: 'calm',
    badge: 'Best Seller',
    gradient: 'from-green-900/40 via-surface to-surface',
    accentColor: '#7ab87a',
    emoji: '🌿',
    specs: {
      Material: 'Food-grade silicone',
      Size: '9" × 9"',
      Suction: '4 heavy-duty cups',
      'Dishwasher safe': 'Yes',
      'Works with': 'Wet food, treats, puree',
    },
    features: [
      'Slows eating to prevent vomiting and bloating',
      'Reduces anxiety during grooming, vet trips, storms',
      'Mental enrichment keeps bored cats stimulated',
      'Textured ridges maximize lick engagement',
      'Vet-recommended enrichment design',
    ],
    related: ['pura-flow', 'pura-calm-chews'],
  },
  {
    id: '2',
    slug: 'pura-flow',
    name: 'PURA Flow',
    tagline: 'Pure water. Happy kidneys.',
    price: 64,
    cost: 18,
    originalPrice: 79,
    category: 'hydration',
    badge: 'Top Rated',
    gradient: 'from-sky-900/40 via-surface to-surface',
    accentColor: '#60a5fa',
    emoji: '💧',
    specs: {
      Capacity: '2.5 L (84 oz)',
      Filter: 'Triple-layer, lasts 30 days',
      Noise: '<30 dB (whisper-quiet)',
      Material: 'BPA-free Tritan',
      Power: 'USB-C, 2W',
    },
    features: [
      'Flowing water encourages cats to drink 2x more',
      'Triple filtration removes hair, debris, and odors',
      'Whisper-quiet pump — won\'t startle light sleepers',
      'Wide basin fits flat-faced breeds (Persians, Exotics)',
      'Dishwasher-safe, stain-resistant finish',
    ],
    related: ['pura-lick-mat', 'pura-calm-chews'],
  },
  {
    id: '3',
    slug: 'pura-calm-chews',
    name: 'PURA Calm Chews',
    tagline: 'Chill. Naturally.',
    price: 44,
    cost: 10,
    category: 'wellness',
    gradient: 'from-purple-900/40 via-surface to-surface',
    accentColor: '#c084fc',
    emoji: '✨',
    specs: {
      Count: '60 soft chews',
      'Key ingredients': 'L-theanine, Chamomile, Valerian',
      Flavor: 'Chicken (cats love it)',
      'Safe for': 'Cats 6 months+',
      'Per serving': '1 chew daily',
    },
    features: [
      'L-theanine promotes calm without drowsiness',
      'Chamomile and valerian root for natural relaxation',
      'No melatonin — safe for long-term daily use',
      'Soft, chicken-flavored chew cats actually eat',
      'Formulated with veterinary input',
    ],
    related: ['pura-lick-mat', 'pura-flow'],
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
