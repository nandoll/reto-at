'use client'

import { useSession, signOut } from 'next-auth/react'
import { User } from 'lucide-react'
import Link from 'next/link'

export default function AuthStatus() {
  const { data: session, status } = useSession()

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

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5">
        <User className="h-4 w-4 text-white" />
        <span className="text-sm font-medium text-white">{session.user.name}</span>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="text-sm text-white/70 hover:text-white"
      >
        Salir
      </button>
    </div>
  )
}
