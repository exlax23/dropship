import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'
import Shell from '@/components/layout/Shell'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'PURA — Your Cat. Elevated.',
  description:
    'Premium pet wellness products for cats. Calming enrichment, pure hydration, and natural supplements — because your cat deserves better.',
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
