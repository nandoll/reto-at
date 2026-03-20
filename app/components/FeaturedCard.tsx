'use client'

import type { Match, Pick } from '@/types/domain'
import OddButton from './OddButton'

interface FeaturedCardProps {
  match: Match
  selectedPick?: Pick | null
  onPickSelect?: (matchId: string, pick: Pick, odd: number) => void
}

export default function FeaturedCard({ match, selectedPick, onPickSelect }: FeaturedCardProps) {
  const time = new Date(match.startTime).toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <div
      className="flex min-w-[280px] flex-col gap-2.5 rounded-[var(--radius-lg)] border border-border-medium p-4"
      style={{
        background: 'linear-gradient(135deg, #FFF5F5 0%, #FFFFFF 40%, #F8F9FF 100%)',
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="h-10 w-10 rounded-full"
          style={{
            backgroundColor: '#C8102E',
            boxShadow: '0 0 12px #C8102E40',
          }}
        />
        <span className="text-xs text-text-tertiary">vs</span>
        <div
          className="h-10 w-10 rounded-full"
          style={{
            backgroundColor: '#EF0107',
            boxShadow: '0 0 12px #EF010740',
          }}
        />
      </div>

      <span className="text-sm font-bold text-text-primary">
        {match.homeTeam.name} vs {match.awayTeam.name}
      </span>

      <span className="text-xs text-text-tertiary">
        {time} · {match.league.name}
      </span>

      <div className="flex gap-2">
        <OddButton
          pick="HOME"
          odd={match.market.odds.home}
          selected={selectedPick === 'HOME'}
          onClick={() => onPickSelect?.(match.id, 'HOME', match.market.odds.home)}
        />
        <OddButton
          pick="DRAW"
          odd={match.market.odds.draw}
          selected={selectedPick === 'DRAW'}
          onClick={() => onPickSelect?.(match.id, 'DRAW', match.market.odds.draw)}
        />
        <OddButton
          pick="AWAY"
          odd={match.market.odds.away}
          selected={selectedPick === 'AWAY'}
          onClick={() => onPickSelect?.(match.id, 'AWAY', match.market.odds.away)}
        />
      </div>
    </div>
  )
}
