import type { MatchesResponse, BetsResponse } from "@/types/domain";
import type { PlacedBet } from "@/store/bet-store";
import matchesData from "@/data/matches.json";
import betsData from "@/data/bets-seed.json";

export function getMatches(): MatchesResponse {
  return matchesData as MatchesResponse;
}

export function getBetsSeed(): BetsResponse {
  return betsData as BetsResponse;
}

export function getEnrichedSeedBets(): PlacedBet[] {
  const matches = getMatches();
  const bets = getBetsSeed();
  const matchMap = new Map(matches.matches.map((m) => [m.id, m]));

  return bets.bets.map((bet) => {
    const match = matchMap.get(bet.matchId);
    return {
      id: bet.id,
      matchId: bet.matchId,
      homeTeam: match?.homeTeam.name ?? "Equipo local",
      awayTeam: match?.awayTeam.name ?? "Equipo visitante",
      pick: bet.pick,
      odd: bet.odd,
      stake: bet.stake,
      status: bet.status,
      return: bet.return,
      placedAt: bet.placedAt,
    };
  });
}
