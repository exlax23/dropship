'use client'

import { motion } from 'framer-motion'

const features = [
  {
    icon: <ZapIcon />,
    label: 'Zero Latency',
    sub: '<5ms signal delay',
  },
  {
    icon: <WaveIcon />,
    label: '100ft Range',
    sub: 'Stage-ready distance',
  },
  {
    icon: <PlugIcon />,
    label: 'Universal Fit',
    sub: 'Guitar, bass, keys',
  },
  {
    icon: <BatteryIcon />,
    label: '8-Hour Battery',
    sub: 'Full night, no recharge',
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
                <p className="font-semibold text-foreground text-sm">
                  {feature.label}
                </p>
                <p className="text-muted text-xs mt-0.5">{feature.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ZapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}

function WaveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12 Q4 6 6 12 Q8 18 10 12 Q12 6 14 12 Q16 18 18 12 Q20 6 22 12" strokeLinecap="round" />
    </svg>
  )
}

function PlugIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22v-5M9 8V2M15 8V2M17 8H7a1 1 0 00-1 1v3a5 5 0 0010 0V9a1 1 0 00-1-1z" strokeLinecap="round" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="7" width="18" height="10" rx="2" />
      <path d="M20 10v4M7 11h6" strokeLinecap="round" />
    </svg>
  )
}
