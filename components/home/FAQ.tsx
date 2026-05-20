'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Does it work with my instrument?',
    a: "Yes. FREQ systems work with any instrument that has a standard 1/4\" output — guitars, basses, keyboards, and more. The FREQ Mini also includes a 3.5mm adapter.",
  },
  {
    q: 'Will this affect my tone?',
    a: "No. FREQ uses a high-fidelity digital signal chain that preserves the full frequency response of your instrument. Most players report no audible difference from a premium cable.",
  },
  {
    q: 'What is the latency?',
    a: 'The FREQ One delivers <5ms latency. The FREQ Pro delivers <3ms. Both are below the threshold of human perception (around 7-10ms), so you will never feel or hear any delay.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping (5-7 business days) is free on orders over $75. Expedited shipping (2-3 days) is $12. All orders ship within 1 business day.',
  },
  {
    q: "What's your return policy?",
    a: 'We offer a no-questions-asked 30-day return policy. If it does not work for your setup, we will refund you in full — including return shipping.',
  },
  {
    q: 'Can I use two FREQ systems at once?',
    a: 'The FREQ Pro supports dual-channel operation, letting you switch between two instruments instantly. You can also run multiple FREQ systems simultaneously — they operate on automatically selected channels.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 px-6" id="faq">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs text-brand uppercase tracking-widest mb-4 font-semibold">
            Questions
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            FAQ
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-surface rounded-xl border border-white/5 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left text-sm font-semibold text-foreground hover:text-brand transition-colors"
              >
                {faq.q}
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 shrink-0 text-muted text-xl leading-none"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <p className="px-6 pb-5 text-sm text-foreground/50 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
