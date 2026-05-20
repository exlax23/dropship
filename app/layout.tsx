import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import Shell from '@/components/layout/Shell'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'FREQ — Cut the Cable. Keep the Tone.',
  description:
    'Premium wireless instrument systems for musicians who refuse to compromise. Zero latency. 100ft range. Universal fit.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
