'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  { id: 'cover', component: SlideCover },
  { id: 'problem', component: SlideProblem },
  { id: 'solution', component: SlideSolution },
  { id: 'market', component: SlideMarket },
  { id: 'product', component: SlideProduct },
  { id: 'model', component: SlideModel },
  { id: 'gtm', component: SlideGTM },
  { id: 'traction', component: SlideTraction },
  { id: 'financials', component: SlideFinancials },
  { id: 'ask', component: SlideAsk },
  { id: 'closing', component: SlideClosing },
]

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

export default function PitchDeck() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)

  const go = useCallback(
    (next: number) => {
      if (next < 0 || next >= slides.length) return
      setDir(next > index ? 1 : -1)
      setIndex(next)
    },
    [index]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ')
        go(index + 1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(index - 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [go, index])

  const Slide = slides[index].component

  return (
    <div className="fixed inset-0 bg-background overflow-hidden select-none">
      <AnimatePresence custom={dir} mode="wait">
        <motion.div
          key={index}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.32, 0, 0.67, 0] }}
          className="absolute inset-0 flex flex-col"
        >
          <Slide />
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-foreground hover:border-white/20 disabled:opacity-20 transition-all"
        >
          ←
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all ${
                i === index
                  ? 'w-5 h-1.5 bg-brand'
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(index + 1)}
          disabled={index === slides.length - 1}
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-foreground hover:border-white/20 disabled:opacity-20 transition-all"
        >
          →
        </button>
      </div>

      {/* Slide counter */}
      <div className="fixed top-6 right-8 text-xs text-muted z-50 tabular-nums">
        {index + 1} / {slides.length}
      </div>

      {/* FREQ mark */}
      <div className="fixed top-6 left-8 flex items-center gap-2 z-50">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M2 12 Q4 6 6 12 Q8 18 10 12 Q12 6 14 12 Q16 18 18 12 Q20 6 22 12"
            stroke="#00d4ff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-sm font-bold tracking-widest text-foreground/60">
          FREQ
        </span>
      </div>
    </div>
  )
}

/* ─── Slide components ─────────────────────────────────────────── */

function Stagger({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Item({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SlideLayout({
  children,
  accent,
}: {
  children: React.ReactNode
  accent?: string
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-16 py-20 relative max-w-5xl mx-auto w-full">
      {accent && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-10"
          style={{ background: accent }}
        />
      )}
      {children}
    </div>
  )
}

function Tag({ children }: { children: string }) {
  return (
    <p className="text-xs text-brand uppercase tracking-widest font-semibold mb-5">
      {children}
    </p>
  )
}

/* 01 — Cover */
function SlideCover() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center relative px-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand/5 rounded-full blur-[160px]" />
      </div>
      <Stagger className="flex flex-col items-center">
        <Item>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            className="mb-8"
          >
            <path
              d="M2 12 Q4 6 6 12 Q8 18 10 12 Q12 6 14 12 Q16 18 18 12 Q20 6 22 12"
              stroke="#00d4ff"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Item>
        <Item>
          <h1 className="text-7xl md:text-9xl font-bold tracking-widest text-foreground mb-4">
            FREQ
          </h1>
        </Item>
        <Item>
          <p className="text-xl text-foreground/40 mb-12 tracking-wide">
            Cut the Cable. Keep the Tone.
          </p>
        </Item>
        <Item>
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-white/10" />
            <p className="text-sm text-muted uppercase tracking-widest">
              Business Overview · 2026
            </p>
            <div className="h-px w-12 bg-white/10" />
          </div>
        </Item>
      </Stagger>
    </div>
  )
}

/* 02 — Problem */
function SlideProblem() {
  const pains = [
    { icon: '🎸', text: 'Trip on cables mid-performance' },
    { icon: '🎵', text: 'Cables color and degrade tone' },
    { icon: '😤', text: 'Setup takes longer than soundcheck' },
    { icon: '💸', text: 'Premium wireless costs $300+' },
  ]
  return (
    <SlideLayout accent="#ef4444">
      <Stagger className="w-full max-w-2xl">
        <Item>
          <Tag>The Problem</Tag>
        </Item>
        <Item>
          <h2 className="text-5xl font-bold text-foreground mb-4 leading-tight">
            Cables are killing the performance.
          </h2>
        </Item>
        <Item>
          <p className="text-foreground/40 mb-12 text-lg">
            Every live musician knows the frustration. The market has ignored
            mid-tier players for too long.
          </p>
        </Item>
        <div className="grid grid-cols-2 gap-4">
          {pains.map((p, i) => (
            <Item key={i}>
              <div className="bg-surface rounded-2xl border border-white/5 p-5 flex items-start gap-4">
                <span className="text-2xl">{p.icon}</span>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {p.text}
                </p>
              </div>
            </Item>
          ))}
        </div>
      </Stagger>
    </SlideLayout>
  )
}

/* 03 — Solution */
function SlideSolution() {
  return (
    <SlideLayout accent="#00d4ff">
      <Stagger className="w-full max-w-2xl text-center flex flex-col items-center">
        <Item>
          <Tag>The Solution</Tag>
        </Item>
        <Item>
          <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Premium wireless at a price musicians can actually afford.
          </h2>
        </Item>
        <Item>
          <p className="text-foreground/40 text-lg mb-14 max-w-lg">
            FREQ delivers sub-5ms latency, 100ft range, and plug-and-play
            simplicity — for a fraction of the cost of legacy brands.
          </p>
        </Item>
        <div className="grid grid-cols-3 gap-6 w-full">
          {[
            { val: '<5ms', label: 'Latency' },
            { val: '100ft', label: 'Range' },
            { val: '$79–$129', label: 'Price Point' },
          ].map((s, i) => (
            <Item key={i}>
              <div className="bg-surface rounded-2xl border border-brand/20 p-6 text-center">
                <p className="text-3xl font-bold text-brand mb-1">{s.val}</p>
                <p className="text-xs text-muted uppercase tracking-wider">
                  {s.label}
                </p>
              </div>
            </Item>
          ))}
        </div>
      </Stagger>
    </SlideLayout>
  )
}

/* 04 — Market */
function SlideMarket() {
  return (
    <SlideLayout accent="#a855f7">
      <Stagger className="w-full max-w-3xl">
        <Item>
          <Tag>Market Opportunity</Tag>
        </Item>
        <Item>
          <h2 className="text-5xl font-bold text-foreground mb-12 leading-tight">
            A $7B market with a clear gap.
          </h2>
        </Item>
        <div className="flex gap-8 items-end mb-12">
          {[
            {
              label: 'TAM',
              val: '$7B',
              sub: 'Global music accessories',
              h: 'h-40',
              color: 'bg-white/10',
            },
            {
              label: 'SAM',
              val: '$800M',
              sub: 'Wireless instrument systems',
              h: 'h-28',
              color: 'bg-violet-500/30',
            },
            {
              label: 'SOM',
              val: '$12M',
              sub: 'US mid-tier musicians (yr 3)',
              h: 'h-16',
              color: 'bg-brand/40',
            },
          ].map((m, i) => (
            <Item key={i} className="flex-1 flex flex-col items-center">
              <p className="text-2xl font-bold text-foreground mb-2">{m.val}</p>
              <div
                className={`w-full ${m.h} ${m.color} rounded-xl mb-3 border border-white/5`}
              />
              <p className="text-xs font-bold text-muted uppercase tracking-wider">
                {m.label}
              </p>
              <p className="text-xs text-muted text-center mt-1">{m.sub}</p>
            </Item>
          ))}
        </div>
        <Item>
          <div className="bg-surface rounded-2xl border border-white/5 p-5 flex gap-4 items-start">
            <span className="text-brand text-xl shrink-0">→</span>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Live music revenue hit a record $12.8B in 2025. Musicians are
              investing in gear again — and the wireless segment is growing at
              8.5% CAGR. The $79–$149 tier is virtually empty.
            </p>
          </div>
        </Item>
      </Stagger>
    </SlideLayout>
  )
}

/* 05 — Product */
function SlideProduct() {
  const products = [
    {
      name: 'FREQ One',
      price: '$89',
      cogs: '~$35',
      margin: '61%',
      tag: 'Best Seller',
      color: '#00d4ff',
      desc: 'Guitar & bass. Plug-and-play. 100ft.',
    },
    {
      name: 'FREQ Pro',
      price: '$129',
      cogs: '~$45',
      margin: '65%',
      tag: 'Pro Pick',
      color: '#a855f7',
      desc: 'Dual-channel. 200ft. 8hr battery.',
    },
    {
      name: 'FREQ Mini',
      price: '$79',
      cogs: '~$28',
      margin: '65%',
      tag: 'Keys & Bass',
      color: '#10b981',
      desc: 'Ultra-compact. 80ft. Silent pairing.',
    },
  ]
  return (
    <SlideLayout>
      <Stagger className="w-full max-w-3xl">
        <Item>
          <Tag>The Lineup</Tag>
        </Item>
        <Item>
          <h2 className="text-5xl font-bold text-foreground mb-10">
            3 SKUs. 60%+ margins.
          </h2>
        </Item>
        <div className="space-y-4">
          {products.map((p, i) => (
            <Item key={i}>
              <div className="bg-surface rounded-2xl border border-white/5 p-5 flex items-center gap-6">
                <div
                  className="w-12 h-12 rounded-xl shrink-0"
                  style={{ background: p.color + '22', border: `1px solid ${p.color}44` }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-5 h-5 rounded" style={{ background: p.color + '66' }} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-foreground">{p.name}</p>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full text-black font-semibold"
                      style={{ background: p.color }}
                    >
                      {p.tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted">{p.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-bold text-foreground">{p.price}</p>
                  <p className="text-xs text-muted">
                    COGS {p.cogs} ·{' '}
                    <span className="text-brand">{p.margin} GM</span>
                  </p>
                </div>
              </div>
            </Item>
          ))}
        </div>
      </Stagger>
    </SlideLayout>
  )
}

/* 06 — Business Model */
function SlideModel() {
  return (
    <SlideLayout accent="#10b981">
      <Stagger className="w-full max-w-3xl">
        <Item>
          <Tag>Business Model</Tag>
        </Item>
        <Item>
          <h2 className="text-5xl font-bold text-foreground mb-4 leading-tight">
            Asset-light. High-margin. Scalable.
          </h2>
        </Item>
        <Item>
          <p className="text-foreground/40 text-lg mb-10">
            Pure dropshipping. Zero inventory. Every dollar goes to customer acquisition.
          </p>
        </Item>
        <Item>
          <div className="bg-surface rounded-2xl border border-white/5 p-6 mb-6">
            <div className="flex items-center gap-0 text-sm">
              {[
                { label: 'Customer orders', color: 'bg-brand/20 text-brand' },
                { arrow: true },
                { label: 'FREQ processes payment', color: 'bg-violet-500/20 text-violet-400' },
                { arrow: true },
                { label: 'Supplier ships direct', color: 'bg-emerald-500/20 text-emerald-400' },
              ].map((s, i) =>
                'arrow' in s ? (
                  <span key={i} className="text-muted mx-2">→</span>
                ) : (
                  <div key={i} className={`flex-1 px-3 py-2 rounded-xl text-center text-xs font-medium ${s.color}`}>
                    {s.label}
                  </div>
                )
              )}
            </div>
          </div>
        </Item>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Avg. Order Value', val: '$99' },
            { label: 'Gross Margin', val: '62%' },
            { label: 'Gross Profit / Order', val: '$61' },
          ].map((m, i) => (
            <Item key={i}>
              <div className="bg-surface rounded-2xl border border-white/5 p-5 text-center">
                <p className="text-3xl font-bold text-brand mb-1">{m.val}</p>
                <p className="text-xs text-muted uppercase tracking-wider">
                  {m.label}
                </p>
              </div>
            </Item>
          ))}
        </div>
      </Stagger>
    </SlideLayout>
  )
}

/* 07 — Go-to-Market */
function SlideGTM() {
  const channels = [
    {
      icon: '📱',
      name: 'TikTok / Reels',
      desc: 'Founder is a musician. Authentic "went wireless" content outperforms paid ads.',
      tag: 'Primary',
      color: 'text-brand',
    },
    {
      icon: '🎯',
      name: 'Paid Social',
      desc: 'Target Guitar Center buyers, Sweetwater followers, and music production audiences.',
      tag: 'Week 3+',
      color: 'text-violet-400',
    },
    {
      icon: '✉️',
      name: 'Email',
      desc: 'Klaviyo abandoned cart flows and post-purchase upsell sequences. $0 to start.',
      tag: 'Month 2',
      color: 'text-emerald-400',
    },
    {
      icon: '🔍',
      name: 'SEO',
      desc: '"Wireless guitar transmitter" — high intent, moderate competition. Compound growth.',
      tag: 'Month 3',
      color: 'text-amber-400',
    },
  ]
  return (
    <SlideLayout>
      <Stagger className="w-full max-w-3xl">
        <Item>
          <Tag>Go-to-Market</Tag>
        </Item>
        <Item>
          <h2 className="text-5xl font-bold text-foreground mb-10 leading-tight">
            Authentic first. Paid second.
          </h2>
        </Item>
        <div className="grid grid-cols-2 gap-4">
          {channels.map((c, i) => (
            <Item key={i}>
              <div className="bg-surface rounded-2xl border border-white/5 p-5 h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{c.icon}</span>
                  <span className={`text-xs font-semibold ${c.color}`}>
                    {c.tag}
                  </span>
                </div>
                <p className="font-bold text-foreground mb-1">{c.name}</p>
                <p className="text-sm text-muted leading-relaxed">{c.desc}</p>
              </div>
            </Item>
          ))}
        </div>
      </Stagger>
    </SlideLayout>
  )
}

/* 08 — Traction */
function SlideTraction() {
  const items = [
    { done: true, label: 'Brand identity created — FREQ' },
    { done: true, label: 'Full e-commerce site built (Next.js 16, Vercel-ready)' },
    { done: true, label: 'Product catalog designed — 3 SKUs at 60%+ margins' },
    { done: true, label: 'Cart, checkout, and email capture functional' },
    { done: true, label: 'Business plan and go-to-market strategy defined' },
    { done: false, label: 'Stripe payment integration (next 48 hrs)' },
    { done: false, label: 'Supplier sourced and samples ordered' },
    { done: false, label: 'First TikTok video posted' },
    { done: false, label: 'First paid order' },
  ]
  return (
    <SlideLayout accent="#00d4ff">
      <Stagger className="w-full max-w-2xl">
        <Item>
          <Tag>Where We Are</Tag>
        </Item>
        <Item>
          <h2 className="text-5xl font-bold text-foreground mb-10 leading-tight">
            Built in days. Revenue-ready in weeks.
          </h2>
        </Item>
        <div className="space-y-3">
          {items.map((item, i) => (
            <Item key={i}>
              <div
                className={`flex items-center gap-4 px-5 py-3.5 rounded-xl border ${
                  item.done
                    ? 'bg-brand/5 border-brand/20'
                    : 'bg-surface border-white/5'
                }`}
              >
                <span
                  className={`text-sm font-bold shrink-0 ${
                    item.done ? 'text-brand' : 'text-muted'
                  }`}
                >
                  {item.done ? '✓' : '○'}
                </span>
                <p
                  className={`text-sm ${
                    item.done ? 'text-foreground' : 'text-muted'
                  }`}
                >
                  {item.label}
                </p>
              </div>
            </Item>
          ))}
        </div>
      </Stagger>
    </SlideLayout>
  )
}

/* 09 — Financials */
function SlideFinancials() {
  const months = [
    { m: 'M1', orders: 5, rev: 495, profit: 180, adSpend: 150 },
    { m: 'M2', orders: 12, rev: 1188, profit: 480, adSpend: 200 },
    { m: 'M3', orders: 22, rev: 2178, profit: 940, adSpend: 250 },
    { m: 'M4', orders: 35, rev: 3465, profit: 1560, adSpend: 300 },
    { m: 'M5', orders: 50, rev: 4950, profit: 2380, adSpend: 350 },
    { m: 'M6', orders: 70, rev: 6930, profit: 3560, adSpend: 400 },
  ]
  const maxRev = Math.max(...months.map((m) => m.rev))

  return (
    <SlideLayout>
      <Stagger className="w-full max-w-3xl">
        <Item>
          <Tag>Financial Projections</Tag>
        </Item>
        <Item>
          <h2 className="text-4xl font-bold text-foreground mb-2">
            $6,900+ revenue by month 6.
          </h2>
        </Item>
        <Item>
          <p className="text-foreground/40 mb-8 text-base">
            Conservative model at $99 AOV. Organic + $350/mo paid social.
          </p>
        </Item>
        <Item>
          <div className="bg-surface rounded-2xl border border-white/5 p-6 mb-6">
            <div className="flex items-end gap-3 h-32">
              {months.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col-reverse gap-0.5">
                    <div
                      className="w-full bg-brand/40 rounded-sm"
                      style={{ height: `${(m.profit / maxRev) * 100}px` }}
                    />
                    <div
                      className="w-full bg-white/10 rounded-sm"
                      style={{
                        height: `${((m.rev - m.profit) / maxRev) * 100}px`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-muted">{m.m}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-white/10" />
                <span className="text-muted">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-brand/40" />
                <span className="text-muted">Gross Profit</span>
              </div>
            </div>
          </div>
        </Item>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Month 6 Revenue', val: '$6,930' },
            { label: 'Month 6 Net Profit', val: '$3,560' },
            { label: '6-Month Cumulative', val: '$18,206' },
          ].map((s, i) => (
            <Item key={i}>
              <div className="bg-surface rounded-xl border border-white/5 p-4 text-center">
                <p className="text-xl font-bold text-brand">{s.val}</p>
                <p className="text-xs text-muted mt-1">{s.label}</p>
              </div>
            </Item>
          ))}
        </div>
      </Stagger>
    </SlideLayout>
  )
}

/* 10 — The Ask */
function SlideAsk() {
  const spend = [
    { item: 'Domain + Hosting (1yr)', cost: '$12', note: 'Vercel free tier' },
    { item: 'Product Samples (3 SKUs)', cost: '$100', note: 'Test before selling' },
    { item: 'TikTok / Instagram Ads', cost: '$350', note: 'Weeks 3–8' },
    { item: 'Stripe + Email Services', cost: '$0', note: 'Free tiers' },
    { item: 'Reserve', cost: '$38', note: 'Buffer' },
  ]
  return (
    <SlideLayout accent="#f59e0b">
      <Stagger className="w-full max-w-2xl">
        <Item>
          <Tag>The Ask</Tag>
        </Item>
        <Item>
          <h2 className="text-5xl font-bold text-foreground mb-3 leading-tight">
            $500 to first revenue.
          </h2>
        </Item>
        <Item>
          <p className="text-foreground/40 text-lg mb-10">
            Zero inventory. Zero risk of unsold stock. Pure validation budget.
          </p>
        </Item>
        <div className="space-y-3 mb-8">
          {spend.map((s, i) => (
            <Item key={i}>
              <div className="flex items-center justify-between bg-surface rounded-xl border border-white/5 px-5 py-3.5">
                <div>
                  <p className="text-sm font-medium text-foreground">{s.item}</p>
                  <p className="text-xs text-muted">{s.note}</p>
                </div>
                <span className="text-sm font-bold text-foreground">
                  {s.cost}
                </span>
              </div>
            </Item>
          ))}
        </div>
        <Item>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 flex gap-4">
            <span className="text-amber-400 text-xl shrink-0">💡</span>
            <p className="text-sm text-foreground/60 leading-relaxed">
              At a $61 gross profit per order, you break even on ad spend after
              just 6 paid orders. Everything after that is profit.
            </p>
          </div>
        </Item>
      </Stagger>
    </SlideLayout>
  )
}

/* 11 — Closing */
function SlideClosing() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center relative px-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[160px]" />
      </div>
      <Stagger className="flex flex-col items-center max-w-2xl">
        <Item>
          <p className="text-xs text-brand uppercase tracking-widest font-semibold mb-8">
            The Opportunity
          </p>
        </Item>
        <Item>
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            The site is live. The market is ready. The founder plays guitar.
          </h2>
        </Item>
        <Item>
          <p className="text-foreground/40 text-lg mb-14 max-w-lg">
            Most dropshippers sell what they find on a spreadsheet. FREQ sells
            what the founder actually needs — and knows how to talk about it.
          </p>
        </Item>
        <Item>
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-16 bg-white/10" />
            <p className="text-sm text-muted">freqgear.com</p>
            <div className="h-px w-16 bg-white/10" />
          </div>
        </Item>
        <Item>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand/10 border border-brand/20 text-brand text-sm font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            Ready to launch · Just needs Stripe wired
          </div>
        </Item>
      </Stagger>
    </div>
  )
}
