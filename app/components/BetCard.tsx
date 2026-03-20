'use client'

import { X } from 'lucide-react'
import type { Pick } from '@/types/domain'
import type { BetItem } from '@/store/bet-store'
import TeamCrest from './TeamCrest'

const quickStakes = [5, 10, 20]

interface BetCardProps {
  bet: BetItem
  onRemove: (matchId: string, pick?: Pick) => void
  onStakeChange: (matchId: string, pick: Pick, stake: number) => void
}

export default function BetCard({ bet, onRemove, onStakeChange }: BetCardProps) {
  const potentialWin = (bet.odd * bet.stake).toFixed(2)
  const pickedTeam = bet.pick === 'HOME' ? bet.homeTeam : bet.pick === 'AWAY' ? bet.awayTeam : 'Empate'

  return (
    <div className="flex flex-col gap-2 border-b border-border-light px-3.5 py-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TeamCrest teamId={bet.homeTeamId} teamName={bet.homeTeam} size={16} />
          <TeamCrest teamId={bet.awayTeamId} teamName={bet.awayTeam} size={16} />
          <span className="text-xs font-semibold text-text-primary">
            {bet.homeTeam} vs {bet.awayTeam}
          </span>
        </div>
        <button
          onClick={() => onRemove(bet.matchId, bet.pick)}
          className="text-text-placeholder hover:text-text-secondary"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <span className="text-[10px] text-text-tertiary">
        Resultado del partido (1X2)
      </span>

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-primary">{pickedTeam}</span>
        <span className="text-lg font-bold text-primary">{bet.odd.toFixed(2)}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-0.5 rounded border border-border-medium px-2 py-1">
          <span className="text-[10px] text-text-tertiary">S/.</span>
          <input
            type="number"
            min={1}
            value={bet.stake}
            onChange={(e) =>
              onStakeChange(bet.matchId, bet.pick, Math.max(1, Number(e.target.value)))
            }
            className="w-12 bg-transparent text-xs text-text-primary outline-none"
          />
        </div>
        {quickStakes.map((amount) => (
          <button
            key={amount}
            onClick={() => onStakeChange(bet.matchId, bet.pick, bet.stake + amount)}
            className="rounded-full border border-border-medium px-2.5 py-1 text-[10px] font-semibold text-text-secondary hover:border-primary"
          >
            +{amount}
          </button>
        ))}
      </div>

      <span className="text-right text-[11px] font-semibold text-gain-positive">
        Ganar: S/. {potentialWin}
      </span>
    </div>
  )
}
