"use client";

import { useState } from "react";
import type { Match, Pick } from "@/types/domain";
import { useBetStore } from "@/store/bet-store";
import { useStoreHydration } from "@/store/use-store-hydration";
import FeaturedCard from "./FeaturedCard";
import LeagueSection from "./LeagueSection";
import HourFilter from "./HourFilter";

interface MatchTimelineProps {
  matches: Match[];
}

function getHourSlot(startTime: string): string {
  const date = new Date(startTime);
  return `${String(date.getHours()).padStart(2, "0")}:00`;
}

function getUniqueHours(matches: Match[]): string[] {
  const hours = new Set(matches.map((m) => getHourSlot(m.startTime)));
  return Array.from(hours).sort();
}

function groupByLeague(matches: Match[]) {
  const groups: Record<
    string,
    { leagueId: string; leagueName: string; country: string; matches: Match[] }
  > = {};

  for (const match of matches) {
    if (!groups[match.league.id]) {
      groups[match.league.id] = {
        leagueId: match.league.id,
        leagueName: match.league.name,
        country: match.league.country,
        matches: [],
      };
    }
    groups[match.league.id].matches.push(match);
  }

  return Object.values(groups);
}

export default function MatchTimeline({ matches }: MatchTimelineProps) {
  const hydrated = useStoreHydration();
  const { bets, addBet } = useBetStore();
  const [selectedHours, setSelectedHours] = useState<Set<string>>(new Set());

  const selectedPicks: Record<string, Pick[]> = {};
  if (hydrated) {
    for (const bet of bets) {
      if (!selectedPicks[bet.matchId]) selectedPicks[bet.matchId] = [];
      if (!selectedPicks[bet.matchId].includes(bet.pick))
        selectedPicks[bet.matchId].push(bet.pick);
    }
  }

  const hours = getUniqueHours(matches);
  const filtered =
    selectedHours.size > 0
      ? matches.filter((m) => selectedHours.has(getHourSlot(m.startTime)))
      : matches;

  function handleHourToggle(hour: string) {
    setSelectedHours((prev) => {
      const next = new Set(prev);
      if (next.has(hour)) next.delete(hour);
      else next.add(hour);
      return next;
    });
  }

  const featured = matches.slice(0, 3);
  const leagues = groupByLeague(filtered);

  function handlePickSelect(matchId: string, pick: Pick, odd: number) {
    const match = matches.find((m) => m.id === matchId);
    if (!match) return;

    addBet({
      matchId,
      homeTeamId: match.homeTeam.id,
      homeTeam: match.homeTeam.name,
      awayTeamId: match.awayTeam.id,
      awayTeam: match.awayTeam.name,
      pick,
      odd,
    });
  }

  return (
    <div className="flex flex-col rounded-[var(--radius-pill)] border border-border-light bg-surface">
      <div className="px-6 pt-5">
        <h2 className="text-lg font-bold text-text-primary">
          Destacados del día
        </h2>
      </div>

      <div className="flex gap-3 overflow-x-auto px-6 py-3">
        {featured.map((match, i) => (
          <FeaturedCard
            key={match.id}
            match={match}
            labelIndex={i}
            selectedPick={hydrated ? (selectedPicks[match.id] ?? []) : []}
            onPickSelect={handlePickSelect}
          />
        ))}
      </div>

      <HourFilter
        hours={hours}
        selected={selectedHours}
        onToggle={handleHourToggle}
        onReset={() => setSelectedHours(new Set())}
      />

      {leagues.map((league) => (
        <LeagueSection
          key={league.leagueId}
          leagueName={league.leagueName}
          country={league.country}
          matches={league.matches}
          selectedPicks={selectedPicks}
          onPickSelect={handlePickSelect}
        />
      ))}
    </div>
  );
}
