'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  { id: 'cover', component: SlideCover },
  { id: 'market', component: SlideMarket },
  { id: 'advantage', component: SlideAdvantage },
  { id: 'products', component: SlideProducts },
  { id: 'uniteconomics', component: SlideUnitEconomics },
  { id: 'tiktok', component: SlideTikTok },
  { id: 'budget', component: SlideBudget },
  { id: 'projections', component: SlideProjections },
  { id: 'viral', component: SlideViral },
  { id: 'scale', component: SlideScale },
  { id: 'start', component: SlideStart },
]

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

export default function PitchDeck() {
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)

  const go = useCallback(
    (next: number) => {
      if (next < 0 || next >= slides.length) return
      setDir(next > index ? 1 : -1)
      setIndex(next)
    },
    [index]
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') go(index + 1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(index - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index])

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX
      touchStartY.current = e.touches[0].clientY
    }
    const onTouchEnd = (e: TouchEvent) => {
      const dx = touchStartX.current - e.changedTouches[0].clientX
      const dy = Math.abs(touchStartY.current - e.changedTouches[0].clientY)
      if (Math.abs(dx) > 40 && dy < 60) go(index + (dx > 0 ? 1 : -1))
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [go, index])

  const Slide = slides[index].component

  return (
    <div className="fixed inset-0 bg-[#080808] overflow-hidden select-none">
      <AnimatePresence custom={dir} mode="wait">
        <motion.div
          key={index}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.32, 0, 0.67, 0] }}
          className="absolute inset-0 flex flex-col overflow-y-auto"
        >
          <Slide />
        </motion.div>
      </AnimatePresence>

      {/* Nav dots + arrows */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 disabled:opacity-20 transition-all touch-manipulation"
        >
          ←
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all touch-manipulation ${
                i === index ? 'w-4 h-1.5 bg-[#7ab87a]' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(index + 1)}
          disabled={index === slides.length - 1}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 disabled:opacity-20 transition-all touch-manipulation"
        >
          →
        </button>
      </div>

      <div className="fixed top-4 right-4 text-xs text-white/20 z-50 tabular-nums">
        {index + 1} / {slides.length}
      </div>
    </div>
  )
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

const G = '#7ab87a'
const BLUE = '#60a5fa'
const PURPLE = '#c084fc'
const AMBER = '#fbbf24'

function Stagger({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {children}
    </motion.div>
  )
}

function Item({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
      }}
    >
      {children}
    </motion.div>
  )
}

/** Wraps a slide's content with consistent mobile-safe padding + bottom spacing for nav */
function SlideWrap({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <div
      className={`min-h-screen w-full px-5 md:px-12 pb-20 pt-8 md:pt-0 max-w-5xl mx-auto flex flex-col ${
        center ? 'items-center justify-center' : 'justify-center'
      }`}
    >
      {children}
    </div>
  )
}

// ─── SLIDE 1: COVER ──────────────────────────────────────────────────────────
function SlideCover() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-[600px] md:h-[600px] rounded-full"
          style={{ background: `radial-gradient(circle, ${G}0a 0%, transparent 70%)` }}
        />
      </div>
      <Stagger className="text-center z-10 w-full">
        <Item><div className="text-5xl md:text-7xl mb-4">🐱</div></Item>
        <Item>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-2">PURA</h1>
        </Item>
        <Item>
          <p className="text-sm md:text-xl text-white/40 tracking-widest uppercase mb-8 md:mb-12">
            Pet Wellness · $500 to Start
          </p>
        </Item>
        <Item>
          <div className="flex gap-6 md:gap-8 justify-center text-center">
            {[
              { n: '75%', l: 'avg gross margin' },
              { n: '$260B', l: 'pet industry TAM' },
              { n: '#1', l: 'TikTok: cats' },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-2xl md:text-3xl font-bold" style={{ color: G }}>{s.n}</p>
                <p className="text-[10px] md:text-xs text-white/40 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </Item>
      </Stagger>
    </div>
  )
}

// ─── SLIDE 2: MARKET ─────────────────────────────────────────────────────────
function SlideMarket() {
  const stats = [
    { icon: '💰', value: '$260B', label: 'Global pet industry 2026', color: G },
    { icon: '📱', value: '60%', label: 'Pet purchases now online', color: BLUE },
    { icon: '📈', value: '8%', label: 'YoY market growth', color: PURPLE },
    { icon: '❤️', value: '2.4×', label: 'Pet owner impulse spend vs. average', color: AMBER },
  ]

  return (
    <SlideWrap>
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-2" style={{ color: G }}>The Opportunity</p></Item>
        <Item>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            The pet industry is<br /><span style={{ color: G }}>recession-proof.</span>
          </h2>
        </Item>
        <Item>
          <p className="text-white/40 text-sm mb-6 max-w-lg">
            People cut their own spending before cutting pet spending. In 2009 recession, pet spending grew 5%. In COVID, it surged 15%.
          </p>
        </Item>
        <Item>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="text-2xl mb-2">{s.icon}</div>
                <p className="text-xl md:text-2xl font-bold mb-0.5" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[11px] text-white/40 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </Item>
      </Stagger>
    </SlideWrap>
  )
}

// ─── SLIDE 3: UNFAIR ADVANTAGE ───────────────────────────────────────────────
function SlideAdvantage() {
  return (
    <SlideWrap>
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-2" style={{ color: G }}>Why You Win</p></Item>
        <Item>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 md:mb-10">
            Your cat is your<br /><span style={{ color: G }}>marketing department.</span>
          </h2>
        </Item>
        <Item>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                icon: '📹',
                title: 'Free Ad Creative',
                body: 'One lick mat video = UGC content worth $500+ in paid creative. Cats film themselves.',
                color: G,
              },
              {
                icon: '🔄',
                title: 'Built-in Authenticity',
                body: "You use these on your actual cat. Real results, real trust. Paid influencers can't replicate this.",
                color: BLUE,
              },
              {
                icon: '📊',
                title: 'Algorithm Advantage',
                body: 'Cat content gets 3.2× the engagement of non-pet posts on TikTok. The algorithm is already on your side.',
                color: PURPLE,
              },
            ].map((c) => (
              <div key={c.title} className="bg-white/5 rounded-xl p-4 md:p-6 border border-white/5">
                <div className="text-2xl mb-2">{c.icon}</div>
                <p className="font-bold text-sm mb-1" style={{ color: c.color }}>{c.title}</p>
                <p className="text-xs md:text-sm text-white/50 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </Item>
      </Stagger>
    </SlideWrap>
  )
}

// ─── SLIDE 4: PRODUCTS ───────────────────────────────────────────────────────
function SlideProducts() {
  const prods = [
    { emoji: '🌿', name: 'PURA Lick Mat', price: 32, cost: 7, margin: 78, color: G, desc: 'Calming enrichment mat' },
    { emoji: '💧', name: 'PURA Flow', price: 64, cost: 18, margin: 72, color: BLUE, desc: 'Filtered water fountain' },
    { emoji: '✨', name: 'PURA Calm Chews', price: 44, cost: 10, margin: 77, color: PURPLE, desc: 'Natural calming supplement' },
  ]

  return (
    <SlideWrap>
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-2" style={{ color: G }}>The Products</p></Item>
        <Item>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
            3 SKUs. <span style={{ color: G }}>75% avg margin.</span>
          </h2>
        </Item>
        <Item><p className="text-white/40 text-sm mb-5">No inventory. Ships direct from supplier to customer.</p></Item>
        <Item>
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            {prods.map((p) => (
              <div key={p.name} className="bg-white/5 rounded-xl p-3 md:p-6 border border-white/5">
                <div className="text-3xl md:text-5xl mb-2 md:mb-4">{p.emoji}</div>
                <p className="font-bold text-white text-xs md:text-base mb-0.5">{p.name}</p>
                <p className="text-[10px] md:text-xs text-white/40 mb-3">{p.desc}</p>
                <div className="space-y-1 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/40">Retail</span>
                    <span className="text-white font-semibold">${p.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Cost</span>
                    <span className="text-white/50">${p.cost}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-1">
                    <span className="text-white/40">Margin</span>
                    <span className="font-bold" style={{ color: p.color }}>{p.margin}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Item>
      </Stagger>
    </SlideWrap>
  )
}

// ─── SLIDE 5: UNIT ECONOMICS ─────────────────────────────────────────────────
function SlideUnitEconomics() {
  return (
    <SlideWrap>
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-2" style={{ color: G }}>The Math</p></Item>
        <Item>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 md:mb-8">
            How you make money<br /><span style={{ color: G }}>per sale.</span>
          </h2>
        </Item>
        <Item>
          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-white/5">
              <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-wider mb-3">
                Example: PURA Flow Fountain ($64)
              </p>
              {[
                { label: 'Customer pays', value: '$64.00', style: 'text-white' },
                { label: 'Supplier cost', value: '−$18.00', style: 'text-red-400' },
                { label: 'Payment processing (3%)', value: '−$1.92', style: 'text-red-400/60' },
                { label: 'Gross profit', value: '$44.08', style: 'text-white font-bold', border: true },
                { label: 'Organic TikTok CAC', value: '$0', style: 'text-green-400' },
                { label: 'Paid TikTok CAC (avg)', value: '−$28', style: 'text-yellow-400' },
              ].map((row) => (
                <div
                  key={row.label}
                  className={`flex justify-between items-center py-2 text-sm ${
                    (row as { border?: boolean }).border ? 'border-t border-white/10 mt-1 pt-3' : ''
                  }`}
                >
                  <span className="text-white/50 text-xs md:text-sm">{row.label}</span>
                  <span className={`text-xs md:text-sm ${row.style}`}>{row.value}</span>
                </div>
              ))}
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              <div className="text-center">
                <p className="text-[10px] text-white/40 mb-1">Organic profit/order</p>
                <p className="text-2xl md:text-3xl font-bold" style={{ color: G }}>$44</p>
                <p className="text-[10px] text-white/30 mt-0.5">69% net margin</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-white/40 mb-1">Paid ads profit/order</p>
                <p className="text-2xl md:text-3xl font-bold text-yellow-400">$16</p>
                <p className="text-[10px] text-white/30 mt-0.5">25% net margin</p>
              </div>
            </div>
          </div>
        </Item>
      </Stagger>
    </SlideWrap>
  )
}

// ─── SLIDE 6: TIKTOK FLYWHEEL ────────────────────────────────────────────────
function SlideTikTok() {
  const steps = [
    { icon: '🎬', label: 'Film cat daily', sub: '30-sec lick mat, fountain, or reaction', color: G },
    { icon: '📱', label: 'Post to TikTok', sub: 'Consistency beats quality early on', color: BLUE },
    { icon: '👁️', label: 'Views come in', sub: '2–20k typical for new pet accounts', color: PURPLE },
    { icon: '🛍️', label: 'Link in bio', sub: 'TikTok Shop → direct in-app checkout', color: AMBER },
    { icon: '🔄', label: 'Boost winners', sub: 'Spark Ads on posts that already pop', color: G },
  ]

  return (
    <SlideWrap>
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-2" style={{ color: G }}>Growth Engine</p></Item>
        <Item>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
            The TikTok flywheel.<br /><span style={{ color: G }}>Organic first.</span>
          </h2>
        </Item>
        <Item>
          <p className="text-white/40 text-sm mb-5">Zero ad spend to start. Post daily, find what lands, then amplify.</p>
        </Item>
        <Item>
          {/* Vertical on mobile, horizontal on desktop */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-2">
            {steps.map((s, i) => (
              <div key={s.label} className="flex md:flex-col items-center gap-3 md:gap-1 md:flex-1">
                <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex md:flex-col md:text-center items-center gap-3 md:gap-2 w-full md:w-auto md:p-4">
                  <div className="text-2xl shrink-0">{s.icon}</div>
                  <div className="md:text-center">
                    <p className="text-xs font-bold" style={{ color: s.color }}>{s.label}</p>
                    <p className="text-[10px] text-white/40 leading-snug">{s.sub}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="text-white/20 text-sm md:hidden shrink-0">↓</div>
                )}
                {i < steps.length - 1 && (
                  <div className="text-white/20 text-sm hidden md:block shrink-0">→</div>
                )}
              </div>
            ))}
          </div>
        </Item>
        <Item>
          <div className="mt-4 bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-xs text-green-400">
            💡 One viral cat video (100–500k views) can generate more revenue than 3 months of paid ads.
          </div>
        </Item>
      </Stagger>
    </SlideWrap>
  )
}

// ─── SLIDE 7: BUDGET ─────────────────────────────────────────────────────────
function SlideBudget() {
  const spend = [
    { item: 'Product samples (test before selling)', amount: 100, pct: 20, color: G },
    { item: 'TikTok Spark Ads (boost organic winners)', amount: 250, pct: 50, color: BLUE },
    { item: 'Domain + Cloudflare hosting (1 yr)', amount: 25, pct: 5, color: PURPLE },
    { item: 'Reserve (refunds, customer service)', amount: 125, pct: 25, color: '#555' },
  ]

  return (
    <SlideWrap>
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-2" style={{ color: G }}>The $500 Plan</p></Item>
        <Item>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
            Where every dollar<br /><span style={{ color: G }}>goes.</span>
          </h2>
        </Item>
        <Item><p className="text-white/40 text-sm mb-5">$0 in inventory upfront — you only pay COGS when a customer orders.</p></Item>
        <Item>
          <div className="space-y-2.5">
            {spend.map((s) => (
              <div key={s.item} className="bg-white/5 rounded-xl p-3.5 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs md:text-sm text-white/70">{s.item}</span>
                  <span className="text-sm font-bold text-white ml-3 shrink-0">${s.amount}</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: s.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Item>
        <Item>
          <p className="mt-3 text-center text-[11px] text-white/25">
            Email marketing (Klaviyo) — free tier covers first 250 subscribers
          </p>
        </Item>
      </Stagger>
    </SlideWrap>
  )
}

// ─── SLIDE 8: PROJECTIONS ────────────────────────────────────────────────────
function SlideProjections() {
  // Realistic numbers: most dropshippers lose money M1, break even M2-3, profit by M3-4
  const months = [
    { m: 'M1', orders: 3, revenue: 150, profit: -340, note: 'Testing' },
    { m: 'M2', orders: 12, revenue: 600, profit: -60, note: 'Learning' },
    { m: 'M3', orders: 32, revenue: 1600, profit: 380, note: '1st profit' },
    { m: 'M4', orders: 70, revenue: 3500, profit: 1200, note: 'Growing' },
    { m: 'M5', orders: 140, revenue: 7000, profit: 3000, note: 'Scaling' },
    { m: 'M6', orders: 230, revenue: 11500, profit: 5400, note: 'Real $$$' },
  ]

  const maxRevenue = Math.max(...months.map((m) => m.revenue))

  return (
    <SlideWrap>
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-2" style={{ color: G }}>Honest Projections</p></Item>
        <Item>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-1">
            Month-by-month.<br /><span style={{ color: G }}>No sugar-coating.</span>
          </h2>
        </Item>
        <Item>
          <p className="text-white/40 text-xs mb-4">
            Assumes daily posting, no viral hits until M5. First profitable month: Month 3.
          </p>
        </Item>
        <Item>
          <div className="flex items-end gap-2 h-28 mb-2">
            {months.map((m) => (
              <div key={m.m} className="flex-1 flex flex-col items-center gap-1">
                <p className="text-[9px] font-bold leading-none" style={{ color: m.profit > 0 ? G : '#ef4444' }}>
                  {m.profit > 0 ? `+$${(m.profit / 1000).toFixed(1)}k` : `−$${Math.abs(m.profit)}`}
                </p>
                <motion.div
                  className="w-full rounded-t"
                  style={{ backgroundColor: m.profit > 0 ? G : '#ef4444', opacity: 0.75 }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(m.revenue / maxRevenue) * 88}px` }}
                  transition={{ duration: 0.55, delay: months.indexOf(m) * 0.07, ease: 'easeOut' }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-5">
            {months.map((m) => (
              <div key={m.m} className="flex-1 text-center">
                <p className="text-[9px] font-bold text-white/50">{m.m}</p>
                <p className="text-[8px] text-white/25">{m.note}</p>
              </div>
            ))}
          </div>
        </Item>
        <Item>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { v: '$11.5K', l: 'Month 6 revenue' },
              { v: '$5.4K', l: 'Month 6 profit' },
              { v: '3–4 mo', l: 'To first profit' },
            ].map((s) => (
              <div key={s.l} className="bg-white/5 rounded-lg p-2.5">
                <p className="text-lg md:text-2xl font-bold" style={{ color: G }}>{s.v}</p>
                <p className="text-[10px] text-white/40 mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </Item>
      </Stagger>
    </SlideWrap>
  )
}

// ─── SLIDE 9: VIRAL SCENARIO ─────────────────────────────────────────────────
function SlideViral() {
  return (
    <SlideWrap>
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-2" style={{ color: AMBER }}>Upside Scenario</p></Item>
        <Item>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
            One viral video.<br /><span style={{ color: AMBER }}>Real math.</span>
          </h2>
        </Item>
        <Item>
          <p className="text-white/40 text-sm mb-5">
            Not the plan — but it&apos;s real. Cat accounts go viral every week.
          </p>
        </Item>
        <Item>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: 'Views', value: '200K', sub: 'Realistic for a cat account within 2 months', color: AMBER },
              { label: 'Conversion', value: '0.2%', sub: 'Conservative for engaged pet audiences', color: AMBER },
              { label: 'Orders', value: '400', sub: 'From one organic post', color: AMBER },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 rounded-xl p-3 border border-amber-500/20 text-center">
                <p className="text-xl md:text-2xl font-bold mb-0.5" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[10px] font-semibold text-white mb-1">{s.label}</p>
                <p className="text-[9px] text-white/35 leading-snug">{s.sub}</p>
              </div>
            ))}
          </div>
        </Item>
        <Item>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { top: '400 orders × $47 avg', val: '$18,800', label: 'Revenue', color: 'text-white' },
                { top: 'After ~$13 COGS/order', val: '$13,600', label: 'Gross profit', color: `text-[${AMBER}]` },
                { top: 'Organic = $0 CAC', val: '$13.6K', label: 'From 1 video', color: G },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-[10px] text-white/40 mb-1">{s.top}</p>
                  <p className="text-xl md:text-2xl font-bold" style={{ color: s.color === 'text-white' ? 'white' : s.color }}>{s.val}</p>
                  <p className="text-[10px] text-white/40 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Item>
      </Stagger>
    </SlideWrap>
  )
}

// ─── SLIDE 10: SCALE ─────────────────────────────────────────────────────────
function SlideScale() {
  const phases = [
    {
      phase: 'Phase 1',
      label: '$0 → $1K/mo',
      timeline: 'Month 1–3',
      color: G,
      actions: ['Post daily, test content angles', 'Find which product converts best', 'Build first 50 email subscribers'],
    },
    {
      phase: 'Phase 2',
      label: '$1K → $6K/mo',
      timeline: 'Month 3–6',
      color: BLUE,
      actions: ['Spark Ads on proven content', 'Add product bundles to increase AOV', 'Reach out to micro-influencers (5–50k followers)'],
    },
    {
      phase: 'Phase 3',
      label: '$6K → $20K/mo',
      timeline: 'Month 7–12',
      color: PURPLE,
      actions: ['Meta retargeting for site visitors', 'Klaviyo email flows (abandoned cart)', 'Expand to 5–6 SKUs'],
    },
  ]

  return (
    <SlideWrap>
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-2" style={{ color: G }}>The Roadmap</p></Item>
        <Item>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Realistic path to<br /><span style={{ color: G }}>$20K/month.</span>
          </h2>
        </Item>
        <Item>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {phases.map((p) => (
              <div key={p.phase} className="bg-white/5 rounded-xl p-4 border border-white/5">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{p.phase} · {p.timeline}</p>
                <p className="text-lg md:text-xl font-bold mb-3" style={{ color: p.color }}>{p.label}</p>
                <ul className="space-y-1.5">
                  {p.actions.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-xs text-white/55">
                      <span style={{ color: p.color }} className="mt-0.5 shrink-0">✓</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Item>
        <Item>
          <p className="mt-4 text-center text-xs text-white/30">
            At $20K/mo revenue with ~50% blended margin ={' '}
            <span className="text-white/55 font-semibold">$10K/month take-home</span>
            {' '}· Timeline: 9–12 months of consistent work
          </p>
        </Item>
      </Stagger>
    </SlideWrap>
  )
}

// ─── SLIDE 11: START ─────────────────────────────────────────────────────────
function SlideStart() {
  const steps = [
    { n: '1', action: 'Order the Lick Mat sample', detail: 'Cheapest to test ($7), highest viral content potential. Order this week.' },
    { n: '2', action: 'Film your cat on it', detail: 'First lick reaction, enrichment content, calm close-up. No editing needed.' },
    { n: '3', action: 'Set up TikTok Shop', detail: 'Free, 20 minutes. Direct checkout in-app = higher conversion than website.' },
    { n: '4', action: 'Post every day', detail: 'Consistency beats quality at the start. The algorithm rewards frequency.' },
    { n: '5', action: 'Boost what pops', detail: 'After 2–3 weeks: put $250 in Spark Ads behind the video with the most organic views.' },
  ]

  return (
    <SlideWrap>
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-2" style={{ color: G }}>Start This Week</p></Item>
        <Item>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            5 steps to your<br /><span style={{ color: G }}>first sale.</span>
          </h2>
        </Item>
        <Item>
          <div className="space-y-2.5">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-3 bg-white/5 rounded-xl p-3.5 border border-white/5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-black text-xs font-bold mt-0.5"
                  style={{ backgroundColor: G }}
                >
                  {s.n}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{s.action}</p>
                  <p className="text-xs text-white/40 mt-0.5 leading-snug">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Item>
        <Item>
          <div className="mt-4 text-center">
            <p className="text-lg md:text-2xl font-bold" style={{ color: G }}>freq.exlax.org</p>
            <p className="text-xs text-white/30 mt-1">Site is live · Your cat is the star</p>
          </div>
        </Item>
      </Stagger>
    </SlideWrap>
  )
}
