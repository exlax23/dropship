'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M2 12 Q4 6 6 12 Q8 18 10 12 Q12 6 14 12 Q16 18 18 12 Q20 6 22 12"
                  stroke="#00d4ff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-lg font-bold tracking-widest">FREQ</span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Built for musicians who demand more. Cut the cable without cutting
              corners.
            </p>
            <div className="mt-6">
              <p className="text-xs text-muted mb-3 uppercase tracking-wider">
                Stay in the loop
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-surface-2 border border-white/10 rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-brand/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand text-black text-sm font-semibold rounded-full hover:bg-cyan-300 transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted uppercase tracking-wider mb-4">
              Shop
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/products"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products/freq-one"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  FREQ One
                </Link>
              </li>
              <li>
                <Link
                  href="/products/freq-pro"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  FREQ Pro
                </Link>
              </li>
              <li>
                <Link
                  href="/products/freq-mini"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  FREQ Mini
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs text-muted uppercase tracking-wider mb-4">
              Support
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/#faq"
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <span className="text-foreground/60">
                  Free shipping over $75
                </span>
              </li>
              <li>
                <span className="text-foreground/60">30-day returns</span>
              </li>
              <li>
                <span className="text-foreground/60">
                  1-year warranty
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © 2026 FREQ. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted">
            <span className="hover:text-foreground transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-foreground transition-colors cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
