'use client'

import { useState, useEffect, useCallback } from 'react'
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
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') go(index + 1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(index - 1)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
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
          transition={{ duration: 0.4, ease: [0.32, 0, 0.67, 0] }}
          className="absolute inset-0 flex flex-col"
        >
          <Slide />
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        <button
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 disabled:opacity-20 transition-all"
        >
          ←
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`rounded-full transition-all ${
                i === index ? 'w-5 h-1.5 bg-[#7ab87a]' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(index + 1)}
          disabled={index === slides.length - 1}
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 disabled:opacity-20 transition-all"
        >
          →
        </button>
      </div>

      <div className="fixed top-6 right-8 text-xs text-white/20 z-50 tabular-nums">
        {index + 1} / {slides.length}
      </div>
    </div>
  )
}

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
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
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
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
    >
      {children}
    </motion.div>
  )
}

function SlideCover() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{ background: `radial-gradient(circle, ${G}08 0%, transparent 70%)` }} />
      </div>
      <Stagger className="text-center z-10">
        <Item><div className="text-7xl mb-6">🐱</div></Item>
        <Item><h1 className="text-7xl md:text-8xl font-bold tracking-tight text-white mb-3">PURA</h1></Item>
        <Item><p className="text-xl text-white/40 tracking-widest uppercase mb-12">Pet Wellness · $500 → $10K/mo</p></Item>
        <Item>
          <div className="flex gap-8 justify-center text-center">
            {[
              { n: '78%', l: 'avg gross margin' },
              { n: '$260B', l: 'pet industry TAM' },
              { n: '#1', l: 'TikTok category: cats' },
            ].map((s) => (
              <div key={s.l}>
                <p className="text-3xl font-bold" style={{ color: G }}>{s.n}</p>
                <p className="text-xs text-white/40 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </Item>
      </Stagger>
    </div>
  )
}

function SlideMarket() {
  const stats = [
    { icon: '💰', value: '$260B', label: 'Global pet industry 2026', color: G },
    { icon: '📱', value: '60%', label: 'Pet purchases now happen online', color: BLUE },
    { icon: '📈', value: '8%', label: 'Year-over-year market growth', color: PURPLE },
    { icon: '❤️', value: '2.4x', label: 'Pet owners spend vs. non-owners on impulse', color: AMBER },
  ]

  return (
    <div className="flex-1 flex flex-col justify-center px-12 max-w-5xl mx-auto w-full">
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-3" style={{ color: G }}>The Opportunity</p></Item>
        <Item><h2 className="text-5xl font-bold text-white mb-4">The pet industry is<br /><span style={{ color: G }}>recession-proof.</span></h2></Item>
        <Item><p className="text-white/40 mb-12 max-w-lg">People cut their own expenses before cutting pet expenses. In 2009 recession, pet spending grew 5%. In COVID, it surged 15%.</p></Item>
        <Item>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 rounded-2xl p-5 border border-white/5">
                <div className="text-3xl mb-3">{s.icon}</div>
                <p className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-white/40 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </Item>
      </Stagger>
    </div>
  )
}

function SlideAdvantage() {
  return (
    <div className="flex-1 flex flex-col justify-center px-12 max-w-5xl mx-auto w-full">
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-3" style={{ color: G }}>Why You Win</p></Item>
        <Item><h2 className="text-5xl font-bold text-white mb-12">Your cat is your<br /><span style={{ color: G }}>marketing department.</span></h2></Item>
        <Item>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: '📹',
                title: 'Free Ad Creative',
                body: 'One video of your cat using the lick mat = 30 seconds of UGC content worth $500 in paid creative. Cats film themselves.',
                color: G,
              },
              {
                icon: '🔄',
                title: 'Built-in Authenticity',
                body: "You use the products on your own cat. Real reviews, real results, real trust. Paid influencers can't buy this.",
                color: BLUE,
              },
              {
                icon: '📊',
                title: 'Algorithm Advantage',
                body: 'Cat content averages 3.2x the engagement of non-pet content on TikTok. The algorithm loves your niche.',
                color: PURPLE,
              },
            ].map((c) => (
              <div key={c.title} className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <div className="text-3xl mb-3">{c.icon}</div>
                <p className="font-bold text-white mb-2" style={{ color: c.color }}>{c.title}</p>
                <p className="text-sm text-white/50 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </Item>
      </Stagger>
    </div>
  )
}

function SlideProducts() {
  const prods = [
    { emoji: '🌿', name: 'PURA Lick Mat', price: 32, cost: 7, margin: 78, color: G, desc: 'Calming enrichment mat' },
    { emoji: '💧', name: 'PURA Flow', price: 64, cost: 18, margin: 72, color: BLUE, desc: 'Filtered water fountain' },
    { emoji: '✨', name: 'PURA Calm Chews', price: 44, cost: 10, margin: 77, color: PURPLE, desc: 'Natural calming supplement' },
  ]

  return (
    <div className="flex-1 flex flex-col justify-center px-12 max-w-5xl mx-auto w-full">
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-3" style={{ color: G }}>The Products</p></Item>
        <Item><h2 className="text-5xl font-bold text-white mb-3">3 SKUs. <span style={{ color: G }}>75% avg margin.</span></h2></Item>
        <Item><p className="text-white/40 mb-10">No inventory. No warehouse. Ships direct from supplier to your customer.</p></Item>
        <Item>
          <div className="grid grid-cols-3 gap-4">
            {prods.map((p) => (
              <div key={p.name} className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <div className="text-5xl mb-4">{p.emoji}</div>
                <p className="font-bold text-white mb-1">{p.name}</p>
                <p className="text-xs text-white/40 mb-4">{p.desc}</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/40">Retail</span>
                    <span className="text-white font-semibold">${p.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Cost</span>
                    <span className="text-white/60">${p.cost}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-1.5">
                    <span className="text-white/40">Margin</span>
                    <span className="font-bold" style={{ color: p.color }}>{p.margin}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Item>
      </Stagger>
    </div>
  )
}

function SlideUnitEconomics() {
  return (
    <div className="flex-1 flex flex-col justify-center px-12 max-w-4xl mx-auto w-full">
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-3" style={{ color: G }}>The Math</p></Item>
        <Item><h2 className="text-5xl font-bold text-white mb-10">How you make money<br /><span style={{ color: G }}>per sale.</span></h2></Item>
        <Item>
          <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-4">Example: PURA Flow Fountain ($64)</p>
              {[
                { label: 'Customer pays', value: '$64.00', color: 'text-white' },
                { label: 'Supplier cost (dropship)', value: '−$18.00', color: 'text-red-400' },
                { label: 'Payment processing (3%)', value: '−$1.92', color: 'text-red-400/70' },
                { label: 'Gross profit', value: '$44.08', color: 'text-white font-bold', highlight: true },
                { label: 'Organic TikTok CAC', value: '−$0', color: 'text-green-400' },
                { label: 'Paid TikTok CAC (avg)', value: '−$22', color: 'text-yellow-400' },
              ].map((row) => (
                <div key={row.label} className={`flex items-center justify-between py-2.5 ${(row as { highlight?: boolean }).highlight ? 'border-t border-white/10 mt-1 pt-3' : ''}`}>
                  <span className="text-sm text-white/60">{row.label}</span>
                  <span className={`text-sm ${row.color}`}>{row.value}</span>
                </div>
              ))}
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xs text-white/40 mb-1">Organic TikTok profit/order</p>
                <p className="text-3xl font-bold" style={{ color: G }}>$44</p>
                <p className="text-xs text-white/30 mt-1">69% net margin</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-white/40 mb-1">Paid ads profit/order</p>
                <p className="text-3xl font-bold text-yellow-400">$22</p>
                <p className="text-xs text-white/30 mt-1">34% net margin</p>
              </div>
            </div>
          </div>
        </Item>
      </Stagger>
    </div>
  )
}

function SlideTikTok() {
  const steps = [
    { icon: '🎬', label: 'Film your cat', sub: '30-sec lick mat or fountain video', color: G },
    { icon: '📱', label: 'Post to TikTok', sub: 'Daily — no need to go viral yet', color: BLUE },
    { icon: '👁️', label: 'Algorithm picks it up', sub: '5–50k views typical for pet content', color: PURPLE },
    { icon: '🛍️', label: 'TikTok Shop link', sub: 'Viewers click → buy in-app', color: AMBER },
    { icon: '🔄', label: 'Reinvest into ads', sub: 'Boost top performing content', color: G },
  ]

  return (
    <div className="flex-1 flex flex-col justify-center px-12 max-w-5xl mx-auto w-full">
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-3" style={{ color: G }}>Growth Engine</p></Item>
        <Item><h2 className="text-5xl font-bold text-white mb-3">The TikTok flywheel.<br /><span style={{ color: G }}>Organic first.</span></h2></Item>
        <Item><p className="text-white/40 mb-10">Start with zero ad spend. Post daily. Find what works. Then put money behind it.</p></Item>
        <Item>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2 shrink-0">
                <div className="bg-white/5 rounded-2xl p-5 border border-white/5 text-center w-36">
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <p className="text-xs font-bold mb-1" style={{ color: s.color }}>{s.label}</p>
                  <p className="text-[10px] text-white/40 leading-snug">{s.sub}</p>
                </div>
                {i < steps.length - 1 && <div className="text-white/20 text-xl shrink-0">→</div>}
              </div>
            ))}
          </div>
        </Item>
        <Item>
          <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-sm text-green-400">
            💡 <strong>Key insight:</strong> One viral cat video (500k views, 0.3% conversion) = 1,500 orders = ~$66,000 gross profit. Your cat might be your best employee.
          </div>
        </Item>
      </Stagger>
    </div>
  )
}

function SlideBudget() {
  const spend = [
    { item: 'Product samples (test what you sell)', amount: 100, pct: 20, color: G },
    { item: 'TikTok Spark Ads (boost organic wins)', amount: 250, pct: 50, color: BLUE },
    { item: 'Domain + Cloudflare hosting (1 yr)', amount: 25, pct: 5, color: PURPLE },
    { item: 'Klaviyo email (free tier) + misc tools', amount: 0, pct: 0, color: AMBER },
    { item: 'Reserve (customer service, refunds)', amount: 125, pct: 25, color: '#555' },
  ]

  return (
    <div className="flex-1 flex flex-col justify-center px-12 max-w-4xl mx-auto w-full">
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-3" style={{ color: G }}>The $500 Plan</p></Item>
        <Item><h2 className="text-5xl font-bold text-white mb-3">Where every dollar<br /><span style={{ color: G }}>goes.</span></h2></Item>
        <Item><p className="text-white/40 mb-8">No inventory risk. $0 in product until a customer orders.</p></Item>
        <Item>
          <div className="space-y-3">
            {spend.map((s) => (
              <div key={s.item} className="bg-white/5 rounded-xl p-4 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-white/70">{s.item}</span>
                  <span className="text-sm font-bold text-white">${s.amount}</span>
                </div>
                {s.pct > 0 && (
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: s.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Item>
        <Item>
          <div className="mt-4 text-center text-xs text-white/30">
            Total spend: $500 · No inventory purchase required · Dropship model = zero upfront product cost
          </div>
        </Item>
      </Stagger>
    </div>
  )
}

function SlideProjections() {
  const months = [
    { m: 'M1', orders: 8, revenue: 440, profit: -180, note: 'Testing' },
    { m: 'M2', orders: 35, revenue: 1925, profit: 680, note: 'Content hits' },
    { m: 'M3', orders: 90, revenue: 4950, profit: 2100, note: 'Audience grows' },
    { m: 'M4', orders: 180, revenue: 9900, profit: 4800, note: 'Repeat buyers' },
    { m: 'M5', orders: 310, revenue: 17050, profit: 8900, note: 'Viral moment' },
    { m: 'M6', orders: 480, revenue: 26400, profit: 14200, note: 'Compounding' },
  ]

  const maxRevenue = Math.max(...months.map((m) => m.revenue))

  return (
    <div className="flex-1 flex flex-col justify-center px-12 max-w-5xl mx-auto w-full">
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-3" style={{ color: G }}>Conservative Projections</p></Item>
        <Item><h2 className="text-5xl font-bold text-white mb-2">Month-by-month.<br /><span style={{ color: G }}>No hockey sticks.</span></h2></Item>
        <Item><p className="text-white/40 mb-8">Based on consistent daily posting, no viral hits assumed until Month 5.</p></Item>
        <Item>
          <div className="flex items-end gap-3 h-40 mb-3">
            {months.map((m) => (
              <div key={m.m} className="flex-1 flex flex-col items-center gap-1">
                <p className="text-xs font-bold" style={{ color: m.profit > 0 ? G : '#ef4444' }}>
                  {m.profit > 0 ? `+$${(m.profit / 1000).toFixed(1)}k` : `-$${Math.abs(m.profit)}`}
                </p>
                <motion.div
                  className="w-full rounded-t-lg"
                  style={{ backgroundColor: m.profit > 0 ? G : '#ef4444', opacity: 0.8 }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(m.revenue / maxRevenue) * 120}px` }}
                  transition={{ duration: 0.6, delay: months.indexOf(m) * 0.08, ease: 'easeOut' }}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            {months.map((m) => (
              <div key={m.m} className="flex-1 text-center">
                <p className="text-xs font-bold text-white/60">{m.m}</p>
                <p className="text-[9px] text-white/30">{m.note}</p>
              </div>
            ))}
          </div>
        </Item>
        <Item>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold" style={{ color: G }}>$26.4K</p>
              <p className="text-xs text-white/40">Month 6 revenue</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: G }}>$30.5K</p>
              <p className="text-xs text-white/40">6-month total profit</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: G }}>480</p>
              <p className="text-xs text-white/40">Orders in Month 6</p>
            </div>
          </div>
        </Item>
      </Stagger>
    </div>
  )
}

function SlideViral() {
  return (
    <div className="flex-1 flex flex-col justify-center px-12 max-w-4xl mx-auto w-full">
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-3" style={{ color: AMBER }}>Upside Scenario</p></Item>
        <Item><h2 className="text-5xl font-bold text-white mb-3">One viral video.<br /><span style={{ color: AMBER }}>Life-changing math.</span></h2></Item>
        <Item><p className="text-white/40 mb-10">This is not the plan — but it happens regularly to people with cat accounts.</p></Item>
        <Item>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Video views', value: '500K', sub: '1 video, ~2 weeks after posting', color: AMBER },
              { label: 'Conversion rate', value: '0.3%', sub: 'Conservative for cat content', color: AMBER },
              { label: 'Orders generated', value: '1,500', sub: 'From a single post', color: AMBER },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 rounded-2xl p-5 border border-amber-500/20 text-center">
                <p className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs font-semibold text-white mb-1">{s.label}</p>
                <p className="text-[10px] text-white/40">{s.sub}</p>
              </div>
            ))}
          </div>
        </Item>
        <Item>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-xs text-white/40 mb-1">1,500 orders × avg $47</p>
                <p className="text-3xl font-bold text-white">$70,500</p>
                <p className="text-xs text-white/40 mt-1">Revenue</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1">After COGS (~$13/order)</p>
                <p className="text-3xl font-bold" style={{ color: AMBER }}>$51,000</p>
                <p className="text-xs text-white/40 mt-1">Gross profit</p>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1">CAC = $0 (organic)</p>
                <p className="text-3xl font-bold" style={{ color: G }}>$51K</p>
                <p className="text-xs text-white/40 mt-1">Net from 1 video</p>
              </div>
            </div>
          </div>
        </Item>
      </Stagger>
    </div>
  )
}

function SlideScale() {
  const phases = [
    {
      phase: 'Phase 1',
      label: '$0 → $2K/mo',
      timeline: 'Month 1–2',
      color: G,
      actions: ['Post daily cat content', 'Test all 3 products organically', 'Build email list from buyers'],
    },
    {
      phase: 'Phase 2',
      label: '$2K → $10K/mo',
      timeline: 'Month 3–4',
      color: BLUE,
      actions: ['Spark Ads on best content', 'Introduce product bundles', 'Micro-influencer outreach'],
    },
    {
      phase: 'Phase 3',
      label: '$10K → $50K/mo',
      timeline: 'Month 5–6+',
      color: PURPLE,
      actions: ['Meta retargeting campaigns', 'Klaviyo email flows', 'Add 2–3 new SKUs'],
    },
  ]

  return (
    <div className="flex-1 flex flex-col justify-center px-12 max-w-5xl mx-auto w-full">
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-3" style={{ color: G }}>The Roadmap</p></Item>
        <Item><h2 className="text-5xl font-bold text-white mb-10">From first post to<br /><span style={{ color: G }}>$50K/month.</span></h2></Item>
        <Item>
          <div className="grid grid-cols-3 gap-4">
            {phases.map((p) => (
              <div key={p.phase} className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{p.phase} · {p.timeline}</p>
                <p className="text-2xl font-bold mb-4" style={{ color: p.color }}>{p.label}</p>
                <ul className="space-y-2">
                  {p.actions.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-white/60">
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
          <div className="mt-6 text-center text-sm text-white/30">
            At $50K/mo revenue with 54% blended margin = <span className="text-white/60 font-semibold">$27K/month take-home</span>
          </div>
        </Item>
      </Stagger>
    </div>
  )
}

function SlideStart() {
  const steps = [
    { n: '1', action: 'Order product samples', detail: 'PURA Lick Mat first — cheapest to test, most viral content potential' },
    { n: '2', action: 'Film your cat this week', detail: 'Lick mat reaction, fountain setup, before/after calm — natural, no editing needed' },
    { n: '3', action: 'Set up TikTok Shop', detail: 'Free, takes 20 minutes, direct checkout in-app = fewer drop-offs than website' },
    { n: '4', action: 'Post every day', detail: 'Consistency > quality at the start. The algorithm rewards frequency.' },
    { n: '5', action: 'Put $250 behind what pops', detail: 'Find the video with the most organic views → Spark Ad → scale it' },
  ]

  return (
    <div className="flex-1 flex flex-col justify-center px-12 max-w-4xl mx-auto w-full">
      <Stagger>
        <Item><p className="text-xs tracking-widest uppercase mb-3" style={{ color: G }}>Start This Week</p></Item>
        <Item><h2 className="text-5xl font-bold text-white mb-10">5 steps to your<br /><span style={{ color: G }}>first sale.</span></h2></Item>
        <Item>
          <div className="space-y-3">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-4 bg-white/5 rounded-xl p-4 border border-white/5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-black text-sm font-bold"
                  style={{ backgroundColor: G }}
                >
                  {s.n}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{s.action}</p>
                  <p className="text-xs text-white/40 mt-0.5">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Item>
        <Item>
          <div className="mt-6 text-center">
            <p className="text-2xl font-bold" style={{ color: G }}>freq.exlax.org</p>
            <p className="text-xs text-white/30 mt-1">Site is live. Products are ready. Your cat is the star.</p>
          </div>
        </Item>
      </Stagger>
    </div>
  )
}
