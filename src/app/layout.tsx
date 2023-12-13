import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import CookieBanner from '@/components/CockieBanner'
import GtmScript from '@/components/GtmScript'
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'S Soumyakanta',
  description: 'A crative front-end developer from Bhubaneswar,India',
  robots: {
    index: true ,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <GtmScript />
        <meta name='robots' content='index,follow' />
      </Head>
      <GoogleAnalytics GA_MEASUREMENT_ID={`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
      <body className={inter.className}>
        
      <iframe src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0" 
              width="0"
      > </iframe>
        {children}
        <CookieBanner />
      </body>
      <Analytics />
    </html>
  )
}
