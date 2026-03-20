import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Pick, BetStatus } from "@/types/domain";

export interface BetItem {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  pick: Pick;
  odd: number;
  stake: number;
}

export interface PlacedBet extends BetItem {
  id: string;
  status: BetStatus;
  return: number | null;
  placedAt: string;
}

function simulateStatus(): {
  status: BetStatus;
  returnMultiplier: number | null;
} {
  const rand = Math.random();
  if (rand < 0.6) return { status: "PENDING", returnMultiplier: null };
  if (rand < 0.8) return { status: "WON", returnMultiplier: 1 };
  return { status: "LOST", returnMultiplier: 0 };
}

interface BetStore {
  bets: BetItem[];
  placedBets: PlacedBet[];
  addBet: (bet: Omit<BetItem, "stake">) => void;
  removeBet: (matchId: string, pick?: Pick) => void;
  updateStake: (matchId: string, pick: Pick, stake: number) => void;
  placeBets: () => void;
  clearAll: () => void;
}

export const useBetStore = create<BetStore>()(
  persist(
    (set) => ({
      bets: [],
      placedBets: [],

      addBet: (bet) =>
        set((state) => {
          const exists = state.bets.find(
            (b) => b.matchId === bet.matchId && b.pick === bet.pick,
          );
          if (exists) {
            return {
              bets: state.bets.filter(
                (b) => !(b.matchId === bet.matchId && b.pick === bet.pick),
              ),
            };
          }
          return { bets: [...state.bets, { ...bet, stake: 10 }] };
        }),

      removeBet: (matchId, pick) =>
        set((state) => ({
          bets: state.bets.filter((b) =>
            pick
              ? !(b.matchId === matchId && b.pick === pick)
              : b.matchId !== matchId,
          ),
        })),

      updateStake: (matchId, pick, stake) => {
        const safe = Math.min(Math.max(isNaN(stake) ? 1 : stake, 1), 99999);
        set((state) => ({
          bets: state.bets.map((b) =>
            b.matchId === matchId && b.pick === pick ? { ...b, stake: safe } : b,
          ),
        }));
      },

      placeBets: () =>
        set((state) => {
          const newPlaced: PlacedBet[] = state.bets.map((bet) => {
            const { status, returnMultiplier } = simulateStatus();
            return {
              ...bet,
              id: `bet_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
              status,
              return:
                returnMultiplier !== null
                  ? bet.odd * bet.stake * returnMultiplier
                  : null,
              placedAt: new Date().toISOString(),
            };
          });
          return {
            bets: [],
            placedBets: [...newPlaced, ...state.placedBets],
          };
        }),

      clearAll: () => set({ bets: [] }),
    }),
    { name: "betday-bets" },
  ),
);
