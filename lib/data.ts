import type { MatchesResponse, BetsResponse } from '@/types/domain'
import matchesData from '@/data/matches.json'
import betsData from '@/data/bets-seed.json'

export function getMatches(): MatchesResponse {
  return matchesData as MatchesResponse
}

export function getBetsSeed(): BetsResponse {
  return betsData as BetsResponse
}
