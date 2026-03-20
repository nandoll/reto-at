import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import Providers from './providers'
import Header from './components/Header'
import Footer from './components/Footer'
import './globals.css'

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'BetDay Lite',
  description: 'Apuestas deportivas del día — Reto técnico',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
