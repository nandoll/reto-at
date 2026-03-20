'use client'

import { Flame, Trophy, Scale } from 'lucide-react'
import type { Match, Pick } from '@/types/domain'
import TeamCrest from './TeamCrest'

interface FeaturedCardProps {
  match: Match
  labelIndex?: number
  selectedPick?: Pick[] | null
  onPickSelect?: (matchId: string, pick: Pick, odd: number) => void
}

const cardConfig = [
  { label: 'Popular · 3 apuestas', Icon: Flame },
  { label: 'Derby · Big Six', Icon: Trophy },
  { label: 'Parejo · Spread 0.51', Icon: Scale },
]

export default function FeaturedCard({ match, labelIndex, selectedPick = [], onPickSelect }: FeaturedCardProps) {
  const config = labelIndex !== undefined ? cardConfig[labelIndex] : null
  const picks = selectedPick ?? []
  const time = new Date(match.startTime).toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const odds = [
    { pick: 'HOME' as Pick, odd: match.market.odds.home },
    { pick: 'DRAW' as Pick, odd: match.market.odds.draw },
    { pick: 'AWAY' as Pick, odd: match.market.odds.away },
  ]
  const maxOdd = Math.max(...odds.map((o) => o.odd))

  return (
    <div
      className="flex min-w-[320px] flex-1 flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-border-medium p-5"
      style={{
        background: 'linear-gradient(135deg, #FFF5F5 0%, #FFFFFF 40%, #F8F9FF 100%)',
      }}
    >
      {config && (
        <span className="flex items-center gap-1 self-start rounded-full bg-primary-light px-3 py-1 text-[10px] font-bold text-primary">
          <config.Icon className="h-3 w-3" />
          {config.label}
        </span>
      )}

      <div className="flex items-center gap-4">
        <TeamCrest teamId={match.homeTeam.id} teamName={match.homeTeam.name} size={48} />
        <span className="text-xs font-medium text-text-tertiary">vs</span>
        <TeamCrest teamId={match.awayTeam.id} teamName={match.awayTeam.name} size={48} />
      </div>

      <span className="text-sm font-bold text-text-primary">
        {match.homeTeam.name} vs {match.awayTeam.name}
      </span>

      <span className="text-xs text-text-tertiary">
        {time} · {match.league.name}
      </span>

      <div className="flex w-full gap-2">
        {odds.map((o) => {
          const isMax = o.odd === maxOdd
          const isSelected = picks.includes(o.pick)

          return (
            <button
              key={o.pick}
              onClick={() => onPickSelect?.(match.id, o.pick, o.odd)}
              className={`flex flex-1 items-center justify-center rounded-[var(--radius-md)] border py-2.5 text-sm font-bold transition-all duration-200 ${
                isSelected
                  ? 'border-primary bg-primary text-white shadow-md shadow-primary/30'
                  : isMax
                    ? 'border-primary bg-white text-primary'
                    : 'border-border-medium bg-white text-text-primary'
              }`}
            >
              {o.odd.toFixed(2)}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { cardConfig }
