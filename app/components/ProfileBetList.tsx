'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TicketX } from 'lucide-react'
import { useBetStore, type PlacedBet } from '@/store/bet-store'
import { useStoreHydration } from '@/store/use-store-hydration'
import type { BetStatus } from '@/types/domain'
import ProfileBetCard from './ProfileBetCard'

interface ProfileBetListProps {
  seedBets: PlacedBet[]
}

export default function ProfileBetList({ seedBets }: ProfileBetListProps) {
  const hydrated = useStoreHydration()
  const { placedBets } = useBetStore()
  const [statusFilter, setStatusFilter] = useState<BetStatus | null>(null)

  const userBets = hydrated ? placedBets : []
  const allBets = [
    ...userBets,
    ...seedBets.filter((sb) => !userBets.some((ub) => ub.id === sb.id)),
  ]

  const counts = {
    total: allBets.length,
    PENDING: allBets.filter((b) => b.status === 'PENDING').length,
    WON: allBets.filter((b) => b.status === 'WON').length,
    LOST: allBets.filter((b) => b.status === 'LOST').length,
  }

  const filtered = statusFilter
    ? allBets.filter((b) => b.status === statusFilter)
    : allBets

  const stats = {
    profit: allBets.reduce((sum, b) => sum + (b.return ?? 0), 0),
    winRate: counts.total > 0 ? Math.round((counts.WON / counts.total) * 100) : 0,
    active: counts.PENDING,
    totalStaked: allBets.reduce((sum, b) => sum + b.stake, 0),
  }

  const filters: { label: string; value: BetStatus | null; count: number }[] = [
    { label: 'Todas', value: null, count: counts.total },
    { label: 'Pendientes', value: 'PENDING', count: counts.PENDING },
    { label: 'Ganadas', value: 'WON', count: counts.WON },
    { label: 'Perdidas', value: 'LOST', count: counts.LOST },
  ]

  if (allBets.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <TicketX className="h-12 w-12 text-text-placeholder" />
        <h2 className="text-lg font-bold text-text-primary">Sin apuestas aún</h2>
        <p className="max-w-xs text-center text-sm text-text-tertiary">
          Explora los partidos de BetDay y realiza tu primera apuesta
        </p>
        <Link
          href="/"
          className="rounded-[var(--radius-md)] bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-hover"
        >
          Ver partidos
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">

      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.label}
            onClick={() => setStatusFilter(f.value)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              statusFilter === f.value
                ? 'bg-primary text-white'
                : 'border border-border-medium bg-surface text-text-secondary hover:border-primary'
            }`}
          >
            {f.label}
            <span className={`text-[10px] ${statusFilter === f.value ? 'text-white/70' : 'text-text-tertiary'}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((bet) => (
          <ProfileBetCard key={bet.id} bet={bet} />
        ))}
      </div>
    </div>
  )
}
