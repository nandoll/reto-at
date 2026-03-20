'use client'

import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Trash2 } from 'lucide-react'
import { useBetStore } from '@/store/bet-store'
import BetCard from './BetCard'
import Toast from './Toast'

export default function CuponSidebar() {
  const { data: session } = useSession()
  const { bets, removeBet, updateStake, clearAll } = useBetStore()
  const [toast, setToast] = useState<{ message: string; detail?: string } | null>(null)

  const totalStake = bets.reduce((sum, b) => sum + b.stake, 0)
  const totalWin = bets.reduce((sum, b) => sum + b.odd * b.stake, 0)

  const handlePlaceBets = useCallback(() => {
    if (!session?.user) {
      // Late Auth Gate — will be handled by login modal in next branch
      return
    }

    setToast({
      message: '¡Apuesta registrada!',
      detail: `${bets.length} apuesta${bets.length > 1 ? 's' : ''} · S/. ${totalStake.toFixed(2)}`,
    })
    clearAll()
  }, [session, bets.length, totalStake, clearAll])

  return (
    <>
      <div className="w-80 shrink-0 overflow-hidden rounded-[var(--radius-lg)] border border-border-medium bg-surface shadow-lg shadow-black/5">
        <div className="flex h-12 items-center justify-between bg-primary px-4">
          <span className="text-sm font-bold text-white">Cupón</span>
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">
            {bets.length}
          </span>
        </div>

        {bets.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <p className="text-xs text-text-tertiary">Tu cupón está vacío</p>
          </div>
        ) : (
          <>
            <div className="max-h-[400px] overflow-y-auto">
              {bets.map((bet) => (
                <BetCard
                  key={bet.matchId}
                  bet={bet}
                  onRemove={removeBet}
                  onStakeChange={updateStake}
                />
              ))}
            </div>

            <button
              onClick={clearAll}
              className="flex w-full items-center justify-center gap-1.5 border-b border-border-light px-3.5 py-2.5"
            >
              <Trash2 className="h-3.5 w-3.5 text-text-tertiary" />
              <span className="text-xs font-medium text-text-tertiary">Limpiar todo</span>
            </button>

            <div className="flex flex-col gap-2 p-3.5">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Apuesta total</span>
                <span className="font-semibold text-text-primary">S/. {totalStake.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Ganancia total</span>
                <span className="font-bold text-gain-positive">S/. {totalWin.toFixed(2)}</span>
              </div>

              <button
                onClick={handlePlaceBets}
                className="mt-1 flex h-11 items-center justify-center rounded-[var(--radius-md)] bg-primary text-sm font-bold text-white transition-colors hover:bg-primary-hover"
              >
                Realizar apuesta S/. {totalStake.toFixed(2)}
              </button>

              <span className="text-center text-[11px] text-text-tertiary">
                {bets.length} partido{bets.length > 1 ? 's' : ''}
              </span>
            </div>
          </>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          detail={toast.detail}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
