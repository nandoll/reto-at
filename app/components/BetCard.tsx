'use client'

import { X } from 'lucide-react'
import type { BetItem } from '@/store/bet-store'

const pickLabels = { HOME: '1', DRAW: 'X', AWAY: '2' } as const

interface BetCardProps {
  bet: BetItem
  onRemove: (matchId: string) => void
  onStakeChange: (matchId: string, stake: number) => void
}

export default function BetCard({ bet, onRemove, onStakeChange }: BetCardProps) {
  const potentialWin = (bet.odd * bet.stake).toFixed(2)

  return (
    <div className="flex flex-col gap-2 border-b border-border-light px-3.5 py-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-text-primary">
            {bet.homeTeam} vs {bet.awayTeam}
          </span>
        </div>
        <button onClick={() => onRemove(bet.matchId)} className="text-text-placeholder hover:text-text-secondary">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <span className="text-[10px] text-text-tertiary">
        Resultado del partido (1X2)
      </span>

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-primary">
          {pickLabels[bet.pick]}
        </span>
        <span className="text-sm font-bold text-primary">{bet.odd.toFixed(2)}</span>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-[10px] text-text-tertiary">S/.</span>
        <input
          type="number"
          min={1}
          value={bet.stake}
          onChange={(e) => onStakeChange(bet.matchId, Math.max(1, Number(e.target.value)))}
          className="w-16 rounded border border-border-medium px-2 py-1 text-xs text-text-primary outline-none focus:border-primary"
        />
      </div>

      <span className="text-right text-[11px] font-semibold text-gain-positive">
        Ganar: S/. {potentialWin}
      </span>
    </div>
  )
}
