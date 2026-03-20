'use client'

import { useState } from 'react'
import type { Match, Pick } from '@/types/domain'
import FeaturedCard from './FeaturedCard'
import LeagueSection from './LeagueSection'

interface MatchTimelineProps {
  matches: Match[]
}

function groupByLeague(matches: Match[]) {
  const groups: Record<string, { leagueName: string; country: string; matches: Match[] }> = {}

  for (const match of matches) {
    if (!groups[match.league.id]) {
      groups[match.league.id] = {
        leagueName: match.league.name,
        country: match.league.country,
        matches: [],
      }
    }
    groups[match.league.id].matches.push(match)
  }

  return Object.values(groups)
}

export default function MatchTimeline({ matches }: MatchTimelineProps) {
  const [selectedPicks, setSelectedPicks] = useState<Record<string, Pick>>({})

  const featured = matches.slice(0, 3)
  const leagues = groupByLeague(matches)

  function handlePickSelect(matchId: string, pick: Pick, _odd: number) {
    setSelectedPicks((prev) => {
      if (prev[matchId] === pick) {
        const next = { ...prev }
        delete next[matchId]
        return next
      }
      return { ...prev, [matchId]: pick }
    })
  }

  return (
    <div className="flex flex-col rounded-[var(--radius-pill)] border border-border-light bg-surface">
      <div className="px-6 pt-5">
        <h2 className="text-lg font-bold text-text-primary">Destacados del día</h2>
      </div>

      <div className="flex gap-3 overflow-x-auto px-6 py-3">
        {featured.map((match) => (
          <FeaturedCard
            key={match.id}
            match={match}
            selectedPick={selectedPicks[match.id] ?? null}
            onPickSelect={handlePickSelect}
          />
        ))}
      </div>

      {leagues.map((league) => (
        <LeagueSection
          key={league.leagueName}
          leagueName={league.leagueName}
          country={league.country}
          matches={league.matches}
          selectedPicks={selectedPicks}
          onPickSelect={handlePickSelect}
        />
      ))}
    </div>
  )
}
