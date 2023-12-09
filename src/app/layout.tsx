import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import CookieBanner from '@/components/CockieBanner'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'S Soumyakanta',
  description: 'A crative front-end developer from Bhubaneswar,India',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <GoogleAnalytics GA_MEASUREMENT_ID={`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
      <body className={inter.className}>
        {children}
        <CookieBanner />
      </body>
      <Analytics />
    </html>
  )
}
