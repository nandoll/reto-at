import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Pick } from '@/types/domain'

export interface BetItem {
  matchId: string
  homeTeam: string
  awayTeam: string
  pick: Pick
  odd: number
  stake: number
}

interface BetStore {
  bets: BetItem[]
  addBet: (bet: Omit<BetItem, 'stake'>) => void
  removeBet: (matchId: string) => void
  updateStake: (matchId: string, stake: number) => void
  clearAll: () => void
}

export const useBetStore = create<BetStore>()(
  persist(
    (set) => ({
      bets: [],

      addBet: (bet) =>
        set((state) => {
          const exists = state.bets.find((b) => b.matchId === bet.matchId)
          if (exists) {
            if (exists.pick === bet.pick) {
              return { bets: state.bets.filter((b) => b.matchId !== bet.matchId) }
            }
            return {
              bets: state.bets.map((b) =>
                b.matchId === bet.matchId ? { ...b, pick: bet.pick, odd: bet.odd } : b
              ),
            }
          }
          return { bets: [...state.bets, { ...bet, stake: 10 }] }
        }),

      removeBet: (matchId) =>
        set((state) => ({
          bets: state.bets.filter((b) => b.matchId !== matchId),
        })),

      updateStake: (matchId, stake) =>
        set((state) => ({
          bets: state.bets.map((b) =>
            b.matchId === matchId ? { ...b, stake } : b
          ),
        })),

      clearAll: () => set({ bets: [] }),
    }),
    { name: 'betday-bets' }
  )
)
