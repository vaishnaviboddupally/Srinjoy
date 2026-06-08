import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import RouteCurtain from '@/components/RouteCurtain'
import WhatsAppButton from '@/components/WhatsAppButton'
import BackToTop from '@/components/BackToTop'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: 'Srinjoy Interiors — Award-Winning Interior Design',
    template: '%s | Srinjoy Interiors',
  },
  description:
    'Srinjoy Interiors crafts exceptional interiors for residential, commercial, and hospitality spaces. Award-winning design built around your story.',
  keywords: [
    'interior design',
    'Srinjoy Interiors',
    'luxury interiors',
    'residential design',
    'commercial interiors',
    'hospitality design',
    'Rudhvi',
    'interiors_by_srinjoy',
  ],
  openGraph: {
    title: 'Srinjoy Interiors',
    description: 'Award-winning interior design studio.',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Srinjoy Interiors' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Srinjoy Interiors',
    description: 'Award-winning interior design studio.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-cream text-charcoal font-sans antialiased overflow-x-hidden">
        <LenisProvider>
          <ScrollProgress />
          <RouteCurtain />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
          <BackToTop />
        </LenisProvider>
      </body>
    </html>
  )
}
