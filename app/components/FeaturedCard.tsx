"use client";

import { Flame, Trophy, Scale } from "lucide-react";
import type { Match, Pick } from "@/types/domain";
import TeamCrest from "./TeamCrest";

interface FeaturedCardProps {
  match: Match;
  labelIndex?: number;
  selectedPick?: Pick[] | null;
  onPickSelect?: (matchId: string, pick: Pick, odd: number) => void;
}

const cardConfig = [
  { label: "Popular · 3 apuestas", Icon: Flame },
  { label: "Derby · Big Six", Icon: Trophy },
  { label: "Parejo · Spread 0.51", Icon: Scale },
];

export default function FeaturedCard({
  match,
  labelIndex,
  selectedPick = [],
  onPickSelect,
}: FeaturedCardProps) {
  const config = labelIndex !== undefined ? cardConfig[labelIndex] : null;
  const picks = selectedPick ?? [];
  const time = new Date(match.startTime).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const odds = [
    {
      pick: "HOME" as Pick,
      odd: match.market.odds.home,
      name: match.homeTeam.name,
    },
    { pick: "DRAW" as Pick, odd: match.market.odds.draw, name: "Empate" },
    {
      pick: "AWAY" as Pick,
      odd: match.market.odds.away,
      name: match.awayTeam.name,
    },
  ];
  const maxOdd = Math.max(...odds.map((o) => o.odd));

  return (
    <div
      className="flex w-full shrink-0 flex-col gap-2 rounded-[var(--radius-lg)] border border-border-medium p-3 lg:min-w-[320px] lg:flex-1 lg:items-center lg:gap-3 lg:p-5"
      style={{
        background:
          "linear-gradient(135deg, #FFF5F5 0%, #FFFFFF 40%, #F8F9FF 100%)",
      }}
    >
      {config && (
        <span className="flex items-center gap-1 self-start rounded-full bg-primary-light px-3 py-1 text-[10px] font-bold text-primary">
          <config.Icon className="h-3 w-3" />
          {config.label}
        </span>
      )}

      {/* Mobile: compact teams */}
      <div className="flex flex-col gap-1 lg:hidden">
        <div className="flex items-center gap-1.5">
          <TeamCrest
            teamId={match.homeTeam.id}
            teamName={match.homeTeam.name}
            size={16}
          />
          <span className="text-[13px] font-semibold text-text-primary">
            {match.homeTeam.name}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <TeamCrest
            teamId={match.awayTeam.id}
            teamName={match.awayTeam.name}
            size={16}
          />
          <span className="text-[13px] font-medium text-text-secondary">
            {match.awayTeam.name}
          </span>
        </div>
      </div>

      {/* Desktop: large crests + full info */}
      <div className="hidden lg:flex lg:items-center lg:gap-4">
        <TeamCrest
          teamId={match.homeTeam.id}
          teamName={match.homeTeam.name}
          size={48}
        />
        <span className="text-xs font-medium text-text-tertiary">vs</span>
        <TeamCrest
          teamId={match.awayTeam.id}
          teamName={match.awayTeam.name}
          size={48}
        />
      </div>

      <span className="hidden text-sm font-bold text-text-primary lg:block">
        {match.homeTeam.name} vs {match.awayTeam.name}
      </span>

      <span className="hidden text-xs text-text-tertiary lg:block">
        {time} · {match.league.name}
      </span>

      <div className="flex w-full gap-2 lg:gap-2">
        {odds.map((o) => {
          const isMax = o.odd === maxOdd;
          const isSelected = picks.includes(o.pick);

          return (
            <button
              key={o.pick}
              onClick={() => onPickSelect?.(match.id, o.pick, o.odd)}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-md)] border py-2 text-sm font-bold transition-all duration-200 lg:flex-row lg:gap-0 lg:py-2.5 ${
                isSelected
                  ? "border-primary bg-primary text-white shadow-md shadow-primary/30"
                  : isMax
                    ? "border-primary bg-white text-primary"
                    : "border-border-medium bg-white text-text-primary"
              }`}
            >
              <span>{o.odd.toFixed(2)}</span>
              <span
                className={`text-[8px] font-medium lg:hidden ${isSelected ? "text-white/70" : "text-text-tertiary"}`}
              >
                {o.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { cardConfig };
