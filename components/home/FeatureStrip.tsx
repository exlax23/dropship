'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: <LeafIcon />,
    label: 'Vet-Reviewed',
    sub: 'Every formula checked',
  },
  {
    icon: <ShieldIcon />,
    label: 'BPA-Free',
    sub: 'Food-grade materials only',
  },
  {
    icon: <HeartIcon />,
    label: 'Made for Cats',
    sub: 'Not a dog product rebranded',
  },
  {
    icon: <TruckIcon />,
    label: 'Fast Shipping',
    sub: 'Free over $50',
  },
]

export default function FeatureStrip() {
  return (
    <section className="border-y border-white/5 bg-surface" id="features">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-brand-glow border border-brand/20 flex items-center justify-center text-brand">
                {feature.icon}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{feature.label}</p>
                <p className="text-muted text-xs mt-0.5">{feature.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LeafIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 8C8 10 5.9 16.17 3.82 19.34a1 1 0 00.95 1.5h10.46a1 1 0 00.86-.49C19.4 16.14 20 12 17 8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 19c0-3 2-5 5-6" strokeLinecap="round" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 3v5h-7V8z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}
