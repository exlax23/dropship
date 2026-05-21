'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#7ab87a" strokeWidth="1.5" />
                <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4" stroke="#7ab87a" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="12" r="1.5" fill="#7ab87a" />
              </svg>
              <span className="text-lg font-bold tracking-widest">PURA</span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Premium wellness for cats who deserve better. Calm, hydrated, thriving.
            </p>
            <div className="mt-6">
              <p className="text-xs text-muted mb-3 uppercase tracking-wider">
                Cat care tips & early access
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-surface-2 border border-white/10 rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-brand/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-brand text-black text-sm font-semibold rounded-full hover:opacity-90 transition-opacity"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted uppercase tracking-wider mb-4">Shop</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="text-foreground/60 hover:text-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products/pura-lick-mat" className="text-foreground/60 hover:text-foreground transition-colors">
                  PURA Lick Mat
                </Link>
              </li>
              <li>
                <Link href="/products/pura-flow" className="text-foreground/60 hover:text-foreground transition-colors">
                  PURA Flow Fountain
                </Link>
              </li>
              <li>
                <Link href="/products/pura-calm-chews" className="text-foreground/60 hover:text-foreground transition-colors">
                  PURA Calm Chews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs text-muted uppercase tracking-wider mb-4">Support</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#faq" className="text-foreground/60 hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li><span className="text-foreground/60">Free shipping over $50</span></li>
              <li><span className="text-foreground/60">30-day returns</span></li>
              <li><span className="text-foreground/60">Vet-reviewed products</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">© 2026 PURA. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-muted">
            <span className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
