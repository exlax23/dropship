'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote:
      "My cat Mochi used to scratch herself raw during thunderstorms. After two weeks of the Calm Chews she just... sleeps through them. I'm genuinely shocked.",
    name: 'Priya S.',
    role: 'Cat mom of 2, Portland OR',
    rating: 5,
    initial: 'P',
    color: '#7ab87a',
  },
  {
    quote:
      "The Flow Fountain is the best $64 I've ever spent on this cat. He was chronically dehydrated — vet confirmed his kidney values improved at his last checkup.",
    name: 'James R.',
    role: 'Verified buyer',
    rating: 5,
    initial: 'J',
    color: '#60a5fa',
  },
  {
    quote:
      "I bought the lick mat to slow her eating and now it's a 20-minute enrichment activity. She goes nuts for it. Also made the cutest TikTok of my life.",
    name: 'Sofia M.',
    role: '47k followers @sofiacatmom',
    rating: 5,
    initial: 'S',
    color: '#c084fc',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs text-brand uppercase tracking-widest mb-4 font-semibold">
            Real Cat Parents
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Happy Cats. Obsessed Owners.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="bg-surface-2 rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <svg key={idx} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-black text-sm font-bold"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
