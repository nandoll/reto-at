'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TicketX } from 'lucide-react'
import { useBetStore } from '@/store/bet-store'
import { useStoreHydration } from '@/store/use-store-hydration'
import type { BetStatus } from '@/types/domain'
import ProfileBetCard from './ProfileBetCard'

const filters: { label: string; value: BetStatus | null }[] = [
  { label: 'Todos', value: null },
  { label: 'Pendientes', value: 'PENDING' },
  { label: 'Ganadas', value: 'WON' },
  { label: 'Perdidas', value: 'LOST' },
]

export default function ProfileBetList() {
  const hydrated = useStoreHydration()
  const { placedBets } = useBetStore()
  const [statusFilter, setStatusFilter] = useState<BetStatus | null>(null)

  const bets = hydrated ? placedBets : []
  const filtered = statusFilter
    ? bets.filter((b) => b.status === statusFilter)
    : bets

  const stats = {
    total: bets.length,
    won: bets.filter((b) => b.status === 'WON').length,
    totalStaked: bets.reduce((sum, b) => sum + b.stake, 0),
    totalReturn: bets.reduce((sum, b) => sum + (b.return ?? 0), 0),
  }

  const winRate = stats.total > 0 ? Math.round((stats.won / stats.total) * 100) : 0

  if (!hydrated) {
    return (
      <div className="flex flex-col gap-4 p-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-[var(--radius-lg)] bg-surface-secondary" />
        ))}
      </div>
    )
  }

  if (bets.length === 0) {
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-gain-positive">+S/. {stats.totalReturn.toFixed(0)}</span>
          <span className="text-[10px] text-text-tertiary">Retorno</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-text-primary">{winRate}%</span>
          <span className="text-[10px] text-text-tertiary">Acierto</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-text-primary">{stats.total}</span>
          <span className="text-[10px] text-text-tertiary">Apuestas</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold text-text-primary">S/. {stats.totalStaked.toFixed(0)}</span>
          <span className="text-[10px] text-text-tertiary">Apostado</span>
        </div>
      </div>

      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f.label}
            onClick={() => setStatusFilter(f.value)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              statusFilter === f.value
                ? 'bg-primary text-white'
                : 'border border-border-medium bg-surface text-text-secondary hover:border-primary'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((bet) => (
          <ProfileBetCard key={bet.id} bet={bet} />
        ))}
      </div>
    </div>
  )
}
