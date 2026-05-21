'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Are these products safe for my cat?',
    a: 'Yes. Every PURA product is made from food-grade, BPA-free materials and formulated with veterinary input. The Calm Chews use L-theanine and chamomile — both well-studied, widely recommended by vets for feline anxiety. No melatonin, no sedatives.',
  },
  {
    q: 'My cat is picky. Will they actually use the lick mat?',
    a: 'Most cats take to it immediately with wet food or Churu-style treat tubes. If yours is hesitant, start with a tiny amount on the mat and let curiosity do the work. The texture naturally triggers their licking instinct.',
  },
  {
    q: 'How often do I replace the Flow Fountain filter?',
    a: 'Every 30 days with one cat, every 2-3 weeks with multiple cats. Replacement filters are available in 3-packs on our site. The pump itself lasts 12–18 months with weekly cleaning.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping (5-7 business days) is free on orders over $50. Expedited shipping (2-3 days) is $9.99. All orders ship within 1 business day.',
  },
  {
    q: "What's your return policy?",
    a: "30-day no-questions-asked returns. If your cat doesn't take to a product, we'll refund you in full — including return shipping. We'd rather you try it risk-free than not try it at all.",
  },
  {
    q: 'Can I use the Calm Chews with my cat\'s current medication?',
    a: "The chews are generally safe alongside most medications, but always check with your vet if your cat is on prescription drugs. L-theanine has a strong safety profile, but your vet knows your cat's full picture.",
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">FAQ</h2>
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
