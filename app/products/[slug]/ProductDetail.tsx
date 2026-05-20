'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import type { Product } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'
import Button from '@/components/ui/Button'

export default function ProductDetail({
  product,
  related,
}: {
  product: Product
  related: Product[]
}) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="pt-28 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <Link
            href="/products"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            ← All Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div
              className={`rounded-2xl bg-gradient-to-br ${product.gradient} h-80 flex items-center justify-center border border-white/5`}
            >
              <ProductVisual product={product} size="lg" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            {product.badge && (
              <span
                className="inline-flex w-fit px-3 py-1 rounded-full text-xs font-bold text-black mb-4"
                style={{ backgroundColor: product.accentColor }}
              >
                {product.badge}
              </span>
            )}
            <p className="text-xs text-muted uppercase tracking-widest mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {product.name}
            </h1>
            <p className="text-foreground/50 mb-6">{product.tagline}</p>

            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <ul className="space-y-2 mb-8">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/60">
                  <span style={{ color: product.accentColor }} className="mt-0.5 shrink-0">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-white/10 rounded-full overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  −
                </button>
                <span className="px-4 text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2 text-foreground/60 hover:text-foreground transition-colors"
                >
                  +
                </button>
              </div>
              <Button onClick={handleAdd} size="lg" className="flex-1">
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </Button>
            </div>

            <p className="text-xs text-muted">
              Free shipping on orders over $75 · 30-day returns · 1-year warranty
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h2 className="text-2xl font-bold mb-6">Specs</h2>
          <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
            {Object.entries(product.specs).map(([key, value], i) => (
              <div
                key={key}
                className={`flex justify-between px-6 py-4 text-sm ${
                  i !== Object.entries(product.specs).length - 1
                    ? 'border-b border-white/5'
                    : ''
                }`}
              >
                <span className="text-muted">{key}</span>
                <span className="font-medium text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {related.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-6">Musicians Also Bought</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function ProductVisual({ product, size }: { product: Product; size?: 'lg' }) {
  const s = size === 'lg' ? 120 : 80
  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={s} height={s} viewBox="0 0 80 80" fill="none">
        <rect
          x="15"
          y="25"
          width="50"
          height="30"
          rx="6"
          fill={product.accentColor}
          fillOpacity="0.12"
          stroke={product.accentColor}
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        <rect
          x="23"
          y="33"
          width="30"
          height="14"
          rx="3"
          fill={product.accentColor}
          fillOpacity="0.25"
        />
        <circle cx="60" cy="40" r="4" fill={product.accentColor} fillOpacity="0.7" />
        <circle cx="60" cy="40" r="2" fill={product.accentColor} />
        <rect x="37" y="55" width="6" height="16" rx="3" fill={product.accentColor} fillOpacity="0.4" />
        <path
          d="M25 16 Q32.5 8 40 16 Q47.5 24 55 16"
          stroke={product.accentColor}
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span
        className="text-xs font-bold tracking-widest uppercase"
        style={{ color: product.accentColor, opacity: 0.6 }}
      >
        FREQ
      </span>
    </div>
  )
}
