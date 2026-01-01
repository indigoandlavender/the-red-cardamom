import type { Metadata } from 'next'
import { Space_Grotesk, Newsreader } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://theredcardamom.com'),
  title: {
    default: 'The Red Cardamom',
    template: '%s | The Red Cardamom',
  },
  description: 'Food history, chemistry, and hospitality from Namibia to China. The stories behind what we eat.',
  keywords: ['food history', 'spice trade', 'culinary culture', 'hospitality', 'salt road', 'spice road', 'coffee', 'tea', 'food anthropology'],
  authors: [{ name: 'Jacqueline Ng' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theredcardamom.com',
    siteName: 'The Red Cardamom',
    title: 'The Red Cardamom',
    description: 'Food history, chemistry, and hospitality from Namibia to China.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Red Cardamom',
    description: 'Food history, chemistry, and hospitality from Namibia to China.',
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${newsreader.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
