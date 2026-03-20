'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ChevronDown, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function AuthStatus() {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (status === 'loading') return null

  if (!session?.user) {
    return (
      <Link
        href="/login"
        className="rounded-[var(--radius-md)] bg-white px-6 py-3 text-sm font-bold text-primary"
      >
        Iniciar Sesión
      </Link>
    )
  }

  const initial = session.user.name?.charAt(0).toUpperCase() ?? 'U'

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3"
      >
        <span className="text-sm font-medium text-white">{session.user.name}</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-primary">
          {initial}
        </div>
        <ChevronDown className={`h-4 w-4 text-white/70 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-[var(--radius-md)] border border-border-medium bg-surface shadow-lg">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-text-primary hover:bg-surface-secondary"
          >
            <LogOut className="h-4 w-4 text-text-tertiary" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}
