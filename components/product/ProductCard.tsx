'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import type { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group relative bg-surface rounded-2xl border border-white/5 overflow-hidden hover:border-white/10 transition-colors"
    >
      <Link href={`/products/${product.slug}`}>
        <div className={`relative h-52 bg-gradient-to-br ${product.gradient} flex items-center justify-center`}>
          <ProductVisual product={product} />
          {product.badge && (
            <div
              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-black"
              style={{ backgroundColor: product.accentColor }}
            >
              {product.badge}
            </div>
          )}
          {product.originalPrice && (
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-red-500/90 text-white">
              Sale
            </div>
          )}
        </div>

        <div className="p-6">
          <p className="text-xs text-muted uppercase tracking-widest mb-1">{product.category}</p>
          <h3 className="text-lg font-bold text-foreground mb-1">{product.name}</h3>
          <p className="text-sm text-foreground/50 mb-4">{product.tagline}</p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>

      <div className="px-6 pb-6">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => addItem(product)}
          className="w-full py-3 rounded-full text-sm font-semibold border border-white/10 text-foreground/70 hover:border-brand/50 hover:text-brand transition-all duration-200 hover:bg-brand/5"
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  )
}

function ProductVisual({ product }: { product: Product }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="text-6xl"
        style={{ filter: `drop-shadow(0 0 20px ${product.accentColor}40)` }}
      >
        {product.emoji}
      </div>
      <span
        className="text-xs font-bold tracking-widest uppercase"
        style={{ color: product.accentColor, opacity: 0.7 }}
      >
        PURA
      </span>
    </div>
  )
}
