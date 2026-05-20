'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { products } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'

const categories = ['all', 'guitar', 'bass', 'keys'] as const
type Category = (typeof categories)[number]

export default function ProductsPage() {
  const [active, setActive] = useState<Category>('all')

  const filtered =
    active === 'all' ? products : products.filter((p) => p.category === active)

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs text-brand uppercase tracking-widest mb-3 font-semibold">
            All Products
          </p>
          <h1 className="text-5xl font-bold text-foreground mb-8">
            The FREQ Lineup
          </h1>

          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  active === cat
                    ? 'bg-brand text-black'
                    : 'border border-white/10 text-foreground/60 hover:border-white/20 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted">
            No products in this category yet.
          </div>
        )}
      </div>
    </div>
  )
}
