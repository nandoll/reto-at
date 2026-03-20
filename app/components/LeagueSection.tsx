'use client'

import type { Match, Pick } from '@/types/domain'
import MatchRow from './MatchRow'

interface LeagueSectionProps {
  leagueName: string
  country: string
  matches: Match[]
  selectedPicks: Record<string, Pick>
  onPickSelect: (matchId: string, pick: Pick, odd: number) => void
}

export default function LeagueSection({
  leagueName,
  country,
  matches,
  selectedPicks,
  onPickSelect,
}: LeagueSectionProps) {
  return (
    <div className="flex flex-col gap-3 px-6 pb-6">
      <div className="flex items-center justify-between rounded-none bg-surface px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-base font-bold text-text-primary">{leagueName}</span>
          <span className="text-xs text-text-tertiary">{country}</span>
        </div>
        <span className="text-xs text-text-tertiary">{matches.length} partidos</span>
      </div>

      <div className="flex flex-col gap-3">
        {matches.map((match) => (
          <MatchRow
            key={match.id}
            match={match}
            selectedPick={selectedPicks[match.id] ?? null}
            onPickSelect={onPickSelect}
          />
        ))}
      </div>
    </div>
  )
}
