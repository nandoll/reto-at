import { describe, it, expect } from 'vitest'
import type { Match, Bet, Pick, BetStatus } from '@/types/domain'

describe('Domain types', () => {
  it('Match structure matches JSON schema', () => {
    const match: Match = {
      id: 'match_001',
      startTime: '2026-02-12T00:00:00-05:00',
      league: { id: 'premier_league', name: 'Premier League', country: 'England' },
      homeTeam: { id: 'bha', name: 'Brighton', shortName: 'BHA' },
      awayTeam: { id: 'bre', name: 'Brentford', shortName: 'BRE' },
      market: { type: '1X2', odds: { home: 4.67, draw: 4.44, away: 5.96 } },
    }

    expect(match.id).toBe('match_001')
    expect(match.market.type).toBe('1X2')
    expect(match.market.odds.home).toBeTypeOf('number')
  })

  it('Bet structure matches JSON schema', () => {
    const bet: Bet = {
      id: 'bet_001',
      matchId: 'match_042',
      placedAt: '2026-02-12T19:25:00-05:00',
      pick: 'AWAY',
      odd: 5.35,
      stake: 30,
      status: 'LOST',
      return: 0,
    }

    expect(bet.pick).toBe('AWAY')
    expect(bet.status).toBe('LOST')
    expect(bet.return).toBe(0)
  })

  it('Pick type only allows valid values', () => {
    const validPicks: Pick[] = ['HOME', 'DRAW', 'AWAY']
    expect(validPicks).toHaveLength(3)
  })

  it('BetStatus type only allows valid values', () => {
    const validStatuses: BetStatus[] = ['PENDING', 'WON', 'LOST']
    expect(validStatuses).toHaveLength(3)
  })

  it('Pending bet has null return', () => {
    const pendingBet: Bet = {
      id: 'bet_002',
      matchId: 'match_004',
      placedAt: '2026-02-12T01:15:00-05:00',
      pick: 'HOME',
      odd: 1.71,
      stake: 40,
      status: 'PENDING',
      return: null,
    }

    expect(pendingBet.status).toBe('PENDING')
    expect(pendingBet.return).toBeNull()
  })
})
