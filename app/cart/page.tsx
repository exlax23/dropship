'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import Button from '@/components/ui/Button'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCartStore()

  const count = itemCount()
  const subtotal = total()
  const shipping = subtotal >= 75 ? 0 : 9.99

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-foreground">
            Your Cart
            {count > 0 && (
              <span className="text-muted text-2xl font-normal ml-3">
                ({count} {count === 1 ? 'item' : 'items'})
              </span>
            )}
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="text-6xl mb-6">🎸</div>
            <p className="text-foreground/50 mb-8">Your cart is empty.</p>
            <Button href="/products">Shop the Lineup</Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.product.slug}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-surface rounded-2xl border border-white/5 p-6 flex items-center gap-6"
                  >
                    <div
                      className={`w-20 h-20 rounded-xl bg-gradient-to-br ${item.product.gradient} shrink-0 flex items-center justify-center`}
                    >
                      <CartProductIcon color={item.product.accentColor} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-semibold text-foreground hover:text-brand transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-muted mt-0.5 capitalize">
                        {item.product.category}
                      </p>
                      <p className="text-sm font-bold text-foreground mt-2">
                        ${item.product.price}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center border border-white/10 rounded-full overflow-hidden text-sm">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.slug, item.quantity - 1)
                          }
                          className="px-3 py-1.5 text-foreground/60 hover:text-foreground transition-colors"
                        >
                          −
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.slug, item.quantity + 1)
                          }
                          className="px-3 py-1.5 text-foreground/60 hover:text-foreground transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.slug)}
                        className="text-muted hover:text-red-400 transition-colors text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-surface rounded-2xl border border-white/5 p-6 sticky top-24">
                <h2 className="font-bold text-foreground mb-6">Summary</h2>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between text-foreground/60">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/60">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-brand">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted">
                      Add ${(75 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <div className="border-t border-white/5 pt-3 flex justify-between font-bold text-foreground">
                    <span>Total</span>
                    <span>${(subtotal + shipping).toFixed(2)}</span>
                  </div>
                </div>
                <Button href="/checkout" size="lg" className="w-full">
                  Checkout
                </Button>
                <div className="mt-4 text-center">
                  <Link
                    href="/products"
                    className="text-xs text-muted hover:text-foreground transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CartProductIcon({ color }: { color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 80 80" fill="none">
      <rect x="20" y="30" width="40" height="20" rx="4" fill={color} fillOpacity="0.2" stroke={color} strokeOpacity="0.4" strokeWidth="1.5" />
      <circle cx="55" cy="40" r="3" fill={color} fillOpacity="0.8" />
      <rect x="37" y="50" width="6" height="10" rx="2" fill={color} fillOpacity="0.4" />
    </svg>
  )
}
