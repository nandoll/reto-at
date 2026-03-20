import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Providers from './providers'
import AuthStatus from './components/AuthStatus'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <header className="flex items-center justify-between border-b px-6 py-3">
            <span className="font-bold">BetDay Lite</span>
            <AuthStatus />
          </header>
          <div className="flex flex-1 flex-col">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
