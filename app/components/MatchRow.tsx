"use client";

import type { Match, Pick } from "@/types/domain";
import TeamCrest from "./TeamCrest";
import OddButton from "./OddButton";

interface MatchRowProps {
  match: Match;
  selectedPicks?: Pick[];
  onPickSelect?: (matchId: string, pick: Pick, odd: number) => void;
}

export default function MatchRow({
  match,
  selectedPicks = [],
  onPickSelect,
}: MatchRowProps) {
  const time = new Date(match.startTime).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="flex flex-col gap-2 rounded-[var(--radius-md)] border border-border-medium bg-surface p-3 lg:h-[72px] lg:flex-row lg:items-center lg:gap-5 lg:px-4 lg:py-0">
      <span className="text-xs font-semibold text-text-tertiary lg:w-10">
        {time}
      </span>

      {/* Mobile: teams stacked with crest inline */}
      <div className="flex flex-col gap-0.5 lg:hidden">
        <div className="flex items-center gap-2">
          <TeamCrest
            teamId={match.homeTeam.id}
            teamName={match.homeTeam.name}
            size={16}
          />
          <span className="text-sm font-semibold text-text-primary">
            {match.homeTeam.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <TeamCrest
            teamId={match.awayTeam.id}
            teamName={match.awayTeam.name}
            size={16}
          />
          <span className="text-sm text-text-secondary">
            {match.awayTeam.name}
          </span>
        </div>
      </div>

      {/* Desktop: crests column + names column */}
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:gap-3">
        <div className="flex flex-col items-center gap-0.5">
          <TeamCrest
            teamId={match.homeTeam.id}
            teamName={match.homeTeam.name}
            size={20}
          />
          <TeamCrest
            teamId={match.awayTeam.id}
            teamName={match.awayTeam.name}
            size={20}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-text-primary">
            {match.homeTeam.name}
          </span>
          <span className="text-sm text-text-secondary">
            {match.awayTeam.name}
          </span>
        </div>
      </div>

      {/* Mobile subtitle */}
      <span className="text-[10px] text-text-tertiary lg:hidden">
        Resultado del partido (1X2) · {match.league.name}
      </span>

      <div className="flex gap-2">
        <OddButton
          pick="HOME"
          odd={match.market.odds.home}
          teamName={match.homeTeam.name}
          selected={selectedPicks.includes("HOME")}
          onClick={() =>
            onPickSelect?.(match.id, "HOME", match.market.odds.home)
          }
        />
        <OddButton
          pick="DRAW"
          odd={match.market.odds.draw}
          teamName="Empate"
          selected={selectedPicks.includes("DRAW")}
          onClick={() =>
            onPickSelect?.(match.id, "DRAW", match.market.odds.draw)
          }
        />
        <OddButton
          pick="AWAY"
          odd={match.market.odds.away}
          teamName={match.awayTeam.name}
          selected={selectedPicks.includes("AWAY")}
          onClick={() =>
            onPickSelect?.(match.id, "AWAY", match.market.odds.away)
          }
        />
      </div>
    </div>
  );
}
