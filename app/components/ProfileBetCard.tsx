'use client'

import Link from 'next/link'
import type { PlacedBet } from '@/store/bet-store'

const pickLabels = { HOME: '1', DRAW: 'X', AWAY: '2' } as const

const statusConfig = {
  PENDING: {
    label: 'Pendiente',
    border: 'border-status-pending',
    bg: 'bg-surface',
    text: 'text-status-pending',
  },
  WON: {
    label: 'Ganada',
    border: 'border-status-won',
    bg: 'bg-status-won-bg',
    text: 'text-status-won',
  },
  LOST: {
    label: 'Perdida',
    border: 'border-border-medium',
    bg: 'bg-status-lost-bg',
    text: 'text-status-lost',
  },
} as const

interface ProfileBetCardProps {
  bet: PlacedBet
}

export default function ProfileBetCard({ bet }: ProfileBetCardProps) {
  const config = statusConfig[bet.status]

  return (
    <Link href={`/bets/${bet.id}`} className={`block rounded-[var(--radius-lg)] border-l-4 ${config.border} ${config.bg} p-4 transition-shadow hover:shadow-md`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${config.text} bg-surface`}>
            {config.label}
          </span>
        </div>
        <span className="text-xs text-text-tertiary">
          {pickLabels[bet.pick]} · {bet.odd.toFixed(2)}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold text-text-primary">
        {bet.homeTeam} vs {bet.awayTeam}
      </p>

      <p className="mt-0.5 text-[10px] text-text-tertiary">
        Resultado del partido (1X2)
      </p>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-text-secondary">
          Apostaste S/. {bet.stake.toFixed(2)}
        </span>
        {bet.status === 'WON' && bet.return !== null && (
          <span className="text-xs font-bold text-gain-positive">
            Ganaste +S/. {bet.return.toFixed(2)}
          </span>
        )}
        {bet.status === 'PENDING' && (
          <span className="text-xs font-semibold text-status-pending">
            Ganar S/. {(bet.odd * bet.stake).toFixed(2)}
          </span>
        )}
      </div>
    </Link>
  )
}
