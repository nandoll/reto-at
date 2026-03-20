'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function AuthStatus() {
  const { data: session, status } = useSession()

  if (status === 'loading') return null

  if (!session?.user) {
    return (
      <Link href="/login" className="text-sm hover:underline">
        Ingresar
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      <span>{session.user.name}</span>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="hover:underline"
      >
        Salir
      </button>
    </div>
  )
}
