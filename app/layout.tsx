import type { Metadata } from 'next'
import { Instrument_Serif, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

// Instrument Serif - elegant, breathable for titles
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
})

// Space Grotesk for body text
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-body',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://theredcardamom.com'),
  title: {
    default: 'The Red Cardamom | Food History Along the Salt & Spice Roads',
    template: '%s | The Red Cardamom',
  },
  description: 'Stories of food as covenant, currency, and war. Tracing the salt roads of Africa and spice routes of Asia — the history behind what we eat.',
  keywords: ['food history', 'spice trade', 'salt trade', 'culinary culture', 'hospitality', 'salt road', 'spice road', 'saffron', 'pepper', 'nutmeg', 'coffee history', 'food anthropology', 'Africa', 'Asia', 'Morocco', 'India', 'Indonesia', 'Japan'],
  authors: [{ name: 'Jacqueline Ng' }],
  creator: 'Dancing with Lions',
  publisher: 'The Red Cardamom',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theredcardamom.com',
    siteName: 'The Red Cardamom',
    title: 'The Red Cardamom | Food History Along the Salt & Spice Roads',
    description: 'Stories of food as covenant, currency, and war. Tracing the salt roads of Africa and spice routes of Asia.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Red Cardamom - Food History',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Red Cardamom | Food History Along the Salt & Spice Roads',
    description: 'Stories of food as covenant, currency, and war. Tracing the salt roads of Africa and spice routes of Asia.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://theredcardamom.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZJC98Q7XJF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZJC98Q7XJF');
          `}
        </Script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
