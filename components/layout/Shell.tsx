'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isFullscreen = pathname.startsWith('/pitch')

  if (isFullscreen) return <>{children}</>

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}
