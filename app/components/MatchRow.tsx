"use client";

import type { Match, Pick } from "@/types/domain";
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
    <div className="flex items-center gap-5 rounded-[var(--radius-md)] border border-border-medium bg-surface px-4 py-0 h-[72px]">
      <span className="w-10 text-xs font-semibold text-text-tertiary">
        {time}
      </span>

      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-sm font-medium text-text-primary">
          {match.homeTeam.name}
        </span>
        <span className="text-sm text-text-secondary">
          {match.awayTeam.name}
        </span>
      </div>

      <div className="flex gap-2">
        <OddButton
          pick="HOME"
          odd={match.market.odds.home}
          selected={selectedPicks.includes("HOME")}
          onClick={() =>
            onPickSelect?.(match.id, "HOME", match.market.odds.home)
          }
        />
        <OddButton
          pick="DRAW"
          odd={match.market.odds.draw}
          selected={selectedPicks.includes("DRAW")}
          onClick={() =>
            onPickSelect?.(match.id, "DRAW", match.market.odds.draw)
          }
        />
        <OddButton
          pick="AWAY"
          odd={match.market.odds.away}
          selected={selectedPicks.includes("AWAY")}
          onClick={() =>
            onPickSelect?.(match.id, "AWAY", match.market.odds.away)
          }
        />
      </div>
    </div>
  );
}
