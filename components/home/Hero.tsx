'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <BackgroundGlow />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand/30 bg-brand-glow text-brand text-xs font-semibold tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          Free Shipping on Orders Over $50
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-bold tracking-tight text-foreground leading-none"
          >
            Your Cat.
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-bold tracking-tight text-brand leading-none"
          >
            Elevated.
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-foreground/50 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Premium wellness essentials for cats — calming enrichment, pure hydration,
          and natural supplements that actually work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/products" size="lg">
            Shop the Collection
          </Button>
          <Button href="#showcase" variant="secondary" size="lg">
            See What&apos;s Inside
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20"
        >
          <CatPaws />
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}

function BackgroundGlow() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px]" />
      <div className="absolute top-2/3 left-1/3 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,#080808_100%)]" />
    </div>
  )
}

function CatPaws() {
  const paws = [
    { x: 15, delay: 0 }, { x: 30, delay: 0.15 }, { x: 50, delay: 0.3 },
    { x: 70, delay: 0.45 }, { x: 85, delay: 0.6 },
  ]

  return (
    <div className="relative h-16 max-w-md mx-auto opacity-25">
      {paws.map((paw, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${paw.x}%`, top: i % 2 === 0 ? '0' : '50%' }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, delay: paw.delay, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#7ab87a">
            <ellipse cx="12" cy="15" rx="5" ry="4" />
            <ellipse cx="6" cy="10" rx="2.5" ry="2" />
            <ellipse cx="18" cy="10" rx="2.5" ry="2" />
            <ellipse cx="9" cy="7" rx="2" ry="1.5" />
            <ellipse cx="15" cy="7" rx="2" ry="1.5" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-xs text-muted uppercase tracking-widest">Scroll</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-4 h-4 border-b-2 border-r-2 border-muted rotate-45"
      />
    </motion.div>
  )
}
