"use client";

import type { Match, Pick } from "@/types/domain";
import MatchRow from "./MatchRow";

interface LeagueSectionProps {
  leagueName: string;
  country: string;
  matches: Match[];
  selectedPicks: Record<string, Pick[]>;
  onPickSelect: (matchId: string, pick: Pick, odd: number) => void;
}

const leagueBadges: Record<string, { crest: string }> = {
  premier_league: { crest: "/crests/premier_league.png" },
};

export default function LeagueSection({
  leagueName,
  country,
  matches,
  selectedPicks,
  onPickSelect,
}: LeagueSectionProps) {
  const leagueId = matches[0]?.league.id ?? "";
  const badge = leagueBadges[leagueId];

  return (
    <div className="flex flex-col gap-3 px-3 pb-4 lg:px-6 lg:pb-6">
      <div className="flex items-center justify-between bg-surface px-3 py-3 lg:px-5">
        <div className="flex items-center gap-3">
          {badge && (
            <div className="flex h-11 w-11 items-center justify-center rounded-full ">
              <img
                src={badge.crest}
                alt={leagueName}
                className="h-full w-full object-contain"
              />
            </div>
          )}
          <div>
            <span className="text-base font-bold text-text-primary">
              {leagueName}
            </span>
            <span className="ml-2 text-xs text-text-tertiary">{country}</span>
          </div>
        </div>
        <span className="rounded-full border border-border-medium px-3 py-1 text-xs text-text-tertiary">
          {matches.length} partidos
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {matches.map((match) => (
          <MatchRow
            key={match.id}
            match={match}
            selectedPicks={selectedPicks[match.id] ?? []}
            onPickSelect={onPickSelect}
          />
        ))}
      </div>
    </div>
  );
}
