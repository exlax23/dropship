'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCartStore } from '@/lib/store'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore()
  const [submitted, setSubmitted] = useState(false)

  const subtotal = total()
  const shipping = subtotal >= 75 ? 0 : 9.99
  const orderTotal = subtotal + shipping

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <div className="pt-32 pb-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <div
            className="w-20 h-20 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center mx-auto mb-8"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Order Confirmed</h1>
          <p className="text-foreground/50 mb-2">
            You&apos;re going wireless. Confirmation sent to your email.
          </p>
          <p className="text-sm text-muted mb-10">Ships within 1 business day.</p>
          <Button href="/">Back to Home</Button>
        </motion.div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 px-6 text-center">
        <p className="text-foreground/50 mb-6">Nothing to check out.</p>
        <Button href="/products">Shop Now</Button>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-10"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-8"
          >
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-4">
                Contact
              </h2>
              <div className="space-y-4">
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-brand/50 transition-colors"
                />
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-4">
                Shipping
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="First name"
                    className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-brand/50 transition-colors"
                  />
                  <input
                    required
                    type="text"
                    placeholder="Last name"
                    className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-brand/50 transition-colors"
                  />
                </div>
                <input
                  required
                  type="text"
                  placeholder="Address"
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-brand/50 transition-colors"
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="City"
                    className="col-span-2 bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-brand/50 transition-colors"
                  />
                  <input
                    required
                    type="text"
                    placeholder="ZIP"
                    className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-brand/50 transition-colors"
                  />
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-4">
                Payment
              </h2>
              <div className="bg-surface border border-white/10 rounded-xl p-4 text-sm text-muted text-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-2 text-brand/60">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                Stripe payment integration ready.
                <br />
                Add{' '}
                <code className="text-brand/70 text-xs">
                  NEXT_PUBLIC_STRIPE_KEY
                </code>{' '}
                to activate.
              </div>
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-brand/50 transition-colors"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-brand/50 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-brand/50 transition-colors"
                  />
                </div>
              </div>
            </motion.section>

            <Button type="submit" size="lg" className="w-full">
              Place Order — ${orderTotal.toFixed(2)}
            </Button>
          </form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-surface rounded-2xl border border-white/5 p-6 sticky top-24">
              <h2 className="font-bold mb-6 text-sm uppercase tracking-widest text-muted">
                Order Summary
              </h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.slug} className="flex gap-3 text-sm">
                    <div
                      className={`w-12 h-12 shrink-0 rounded-lg bg-gradient-to-br ${item.product.gradient} flex items-center justify-center`}
                    >
                      <svg width="20" height="20" viewBox="0 0 80 80" fill="none">
                        <rect x="20" y="30" width="40" height="20" rx="4" fill={item.product.accentColor} fillOpacity="0.4" stroke={item.product.accentColor} strokeWidth="1.5" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{item.product.name}</p>
                      <p className="text-muted text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/5 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-foreground/60">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-foreground/60">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <span className="text-brand">Free</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-white/5 pt-2 flex justify-between font-bold text-foreground">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
