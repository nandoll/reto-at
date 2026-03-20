export interface League {
  id: string
  name: string
  country: string
}

export interface Team {
  id: string
  name: string
  shortName: string
}

export type Pick = 'HOME' | 'DRAW' | 'AWAY'

export interface Odds {
  home: number
  draw: number
  away: number
}

export interface Market {
  type: '1X2'
  odds: Odds
}

export interface Match {
  id: string
  startTime: string
  league: League
  homeTeam: Team
  awayTeam: Team
  market: Market
}

export interface MatchesResponse {
  date: string
  timezone: string
  matches: Match[]
}

export type BetStatus = 'PENDING' | 'WON' | 'LOST'

export interface Bet {
  id: string
  matchId: string
  placedAt: string
  pick: Pick
  odd: number
  stake: number
  status: BetStatus
  return: number | null
}

export interface BetsResponse {
  bets: Bet[]
}
