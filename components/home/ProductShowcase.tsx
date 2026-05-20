'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { products } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'

export default function ProductShowcase() {
  return (
    <section className="py-24 px-6" id="showcase">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs text-brand uppercase tracking-widest mb-4 font-semibold">
            The Lineup
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Pick Your Freedom
          </h2>
          <p className="text-foreground/50 max-w-md mx-auto">
            Every FREQ system ships with everything you need to go wireless
            tonight.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/products"
            className="text-sm text-brand/70 hover:text-brand transition-colors underline underline-offset-4"
          >
            View all products →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
