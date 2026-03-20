'use client'

import Link from 'next/link'
import type { PlacedBet } from '@/store/bet-store'
import TeamCrest from './TeamCrest'

const pickLabels = { HOME: '1', DRAW: 'X', AWAY: '2' } as const

const statusConfig = {
  PENDING: {
    label: 'PENDING',
    bg: 'bg-surface border border-border-light',
    badge: 'bg-primary text-white',
    textMuted: false,
  },
  WON: {
    label: 'WON',
    bg: 'bg-status-won-bg border border-status-won/20',
    badge: 'border border-status-won text-status-won',
    textMuted: false,
  },
  LOST: {
    label: 'LOST',
    bg: 'bg-status-lost-bg border border-border-light',
    badge: 'border border-status-lost text-status-lost',
    textMuted: true,
  },
} as const

interface ProfileBetCardProps {
  bet: PlacedBet
}

export default function ProfileBetCard({ bet }: ProfileBetCardProps) {
  const config = statusConfig[bet.status]
  const pickedTeam = bet.pick === 'HOME' ? bet.homeTeam : bet.pick === 'AWAY' ? bet.awayTeam : 'Empate'

  return (
    <Link
      href={`/bets/${bet.id}`}
      className={`block rounded-[var(--radius-lg)] ${config.bg} p-5 transition-shadow hover:shadow-md`}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <TeamCrest teamId={bet.homeTeamId} teamName={bet.homeTeam} size={20} />
            <TeamCrest teamId={bet.awayTeamId} teamName={bet.awayTeam} size={20} />
            <span className={`text-sm font-bold ${config.textMuted ? 'text-text-tertiary' : 'text-text-primary'}`}>
              {bet.homeTeam} vs {bet.awayTeam}
            </span>
          </div>
          <span className="text-xs text-text-tertiary">
            Tu apuesta: {pickedTeam} ({pickLabels[bet.pick]}) · Cuota {bet.odd.toFixed(2)}
          </span>
        </div>
        <span className={`shrink-0 rounded px-2.5 py-1 text-[10px] font-bold ${config.badge}`}>
          {config.label}
        </span>
      </div>

      <div className="mt-4 flex flex-col items-end gap-0.5">
        <span className="text-xs text-text-tertiary">
          Apostaste S/.{bet.stake.toFixed(2)}
        </span>
        {bet.status === 'WON' && bet.return !== null && (
          <span className="text-sm font-bold text-gain-positive">
            Ganaste: +S/.{bet.return.toFixed(2)}
          </span>
        )}
        {bet.status === 'PENDING' && (
          <span className="text-sm font-bold text-primary">
            Ganar: S/.{(bet.odd * bet.stake).toFixed(2)}
          </span>
        )}
        {bet.status === 'LOST' && (
          <span className="text-sm text-text-tertiary">
            Perdiste: -S/.{bet.stake.toFixed(2)}
          </span>
        )}
      </div>
    </Link>
  )
}
