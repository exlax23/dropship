export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  price: number
  originalPrice?: number
  category: 'guitar' | 'bass' | 'keys'
  badge?: string
  gradient: string
  accentColor: string
  specs: Record<string, string>
  features: string[]
  related: string[]
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'freq-one',
    name: 'FREQ One',
    tagline: 'Your first taste of freedom.',
    price: 89,
    category: 'guitar',
    badge: 'Best Seller',
    gradient: 'from-cyan-900/40 via-surface to-surface',
    accentColor: '#00d4ff',
    specs: {
      Range: '100 ft',
      'Battery Life': '6 hours',
      Latency: '<5ms',
      Connector: '1/4" TRS',
      'Charge Time': '1.5 hours',
    },
    features: [
      'Plug-and-play — no pairing required',
      'Rechargeable via USB-C',
      'Works with any 1/4" instrument',
      'LED signal strength indicator',
      'Zero tone coloration',
    ],
    related: ['freq-pro', 'freq-mini'],
  },
  {
    id: '2',
    slug: 'freq-pro',
    name: 'FREQ Pro',
    tagline: 'Dual-channel. Rechargeable. Unstoppable.',
    price: 129,
    originalPrice: 159,
    category: 'guitar',
    badge: 'Pro Pick',
    gradient: 'from-violet-900/40 via-surface to-surface',
    accentColor: '#a855f7',
    specs: {
      Range: '200 ft',
      'Battery Life': '8 hours',
      Channels: 'Dual',
      Latency: '<3ms',
      'Charge Time': '2 hours',
    },
    features: [
      'Dual-channel — swap guitars mid-set',
      'Extended 200ft stage range',
      'Fast-charge 8-hour battery',
      'Built-in noise gate',
      'Stage-ready metal housing',
    ],
    related: ['freq-one', 'freq-mini'],
  },
  {
    id: '3',
    slug: 'freq-mini',
    name: 'FREQ Mini',
    tagline: 'Ultra-compact. Big signal.',
    price: 79,
    category: 'keys',
    gradient: 'from-emerald-900/40 via-surface to-surface',
    accentColor: '#10b981',
    specs: {
      Range: '80 ft',
      'Battery Life': '5 hours',
      Weight: '28g',
      Connector: '1/4" TRS + 3.5mm',
      'Charge Time': '1 hour',
    },
    features: [
      'Ultra-compact — smaller than a matchbox',
      'Keys, bass, and guitar ready',
      'Silent pairing mode',
      'LED status ring',
      'Dual connector included',
    ],
    related: ['freq-one', 'freq-pro'],
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
