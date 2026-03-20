'use client'

import { Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AuthStatus from './AuthStatus'

export default function Header() {
  const pathname = usePathname()

  return (
    <header
      className="flex h-[72px] items-center justify-between px-[var(--spacing-xl)]"
      style={{
        background: 'linear-gradient(90deg, #CC0000E6 0%, #9A0000E6 100%)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 4px 20px #CC000030',
      }}
    >
      <div className="flex items-center gap-10">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-white" />
          <span className="text-2xl font-extrabold text-white">BetDay</span>
          <span className="rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold text-white">
            LITE
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-bold ${pathname === '/' ? 'text-white' : 'text-white/50 hover:text-white/70'}`}
          >
            Inicio
          </Link>
          <Link
            href="/profile"
            className={`text-sm ${pathname === '/profile' ? 'font-bold text-white' : 'text-white/50 hover:text-white/70'}`}
          >
            Perfil
          </Link>
        </nav>
      </div>
      <AuthStatus />
    </header>
  )
}
