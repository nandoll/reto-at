'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useBetStore, type PlacedBet } from '@/store/bet-store'
import { useStoreHydration } from '@/store/use-store-hydration'
import type { Match } from '@/types/domain'

const pickLabels = { HOME: '1', DRAW: 'X', AWAY: '2' } as const

const statusConfig = {
  PENDING: { label: 'Pendiente', text: 'text-status-pending', bg: 'bg-primary-light' },
  WON: { label: 'Ganada', text: 'text-status-won', bg: 'bg-status-won-bg' },
  LOST: { label: 'Perdida', text: 'text-status-lost', bg: 'bg-status-lost-bg' },
} as const

interface BetDetailProps {
  betId: string
  seedBet: PlacedBet | null
  seedBets: PlacedBet[]
  matches: Match[]
}

export default function BetDetail({ betId, seedBet, seedBets, matches }: BetDetailProps) {
  const hydrated = useStoreHydration()
  const { placedBets } = useBetStore()

  const storeBet = hydrated ? placedBets.find((b) => b.id === betId) : null
  const bet = storeBet ?? seedBet

  if (!bet) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <p className="text-text-tertiary">Apuesta no encontrada</p>
      </div>
    )
  }

  const match = matches.find((m) => m.id === bet.matchId)
  const config = statusConfig[bet.status]

  const otherBets = [
    ...(hydrated ? placedBets : []),
    ...seedBets,
  ]
    .filter((b, i, arr) => arr.findIndex((x) => x.id === b.id) === i)
    .filter((b) => b.id !== betId && b.status === 'PENDING')
    .slice(0, 2)

  const otherMatches = matches
    .filter((m) => m.id !== bet.matchId)
    .slice(0, 2)

  return (
    <div className="flex flex-col gap-3 p-4">
      <Link href="/profile" className="flex items-center gap-2 text-sm text-text-tertiary hover:text-text-secondary">
        <ArrowLeft className="h-4 w-4" />
        Volver al perfil
      </Link>

      <div className="flex gap-4">
        {/* Main card */}
        <div className="flex-1 rounded-[var(--radius-pill)] border border-border-light bg-surface p-7">
          <h1 className="text-lg font-bold text-text-primary">Detalle de tu apuesta</h1>
          <p className="mt-1 text-xs text-text-tertiary">
            Apuesta #{bet.id} · realizada el {new Date(bet.placedAt).toLocaleDateString('es-PE')}
          </p>

          <div className="mt-5 flex items-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${config.text} ${config.bg}`}>
                {config.label}
              </span>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-extrabold text-text-primary">
                {bet.homeTeam}
              </h2>
              <h2 className="text-xl font-extrabold text-text-primary">
                vs {bet.awayTeam}
              </h2>
              {match && (
                <p className="mt-1 text-xs text-text-tertiary">
                  {match.league.name} · {match.league.country}
                </p>
              )}
              <p className="text-xs text-text-tertiary">
                Empieza en{' '}
                {new Date(bet.placedAt).toLocaleTimeString('es-PE', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                })}
              </p>
            </div>

            <div className="flex flex-col items-end gap-1 text-right">
              <span className="text-xs text-text-tertiary">Tu apuesta</span>
              <span className="text-2xl font-extrabold text-primary">
                {bet.odd.toFixed(2)}
              </span>
              <span className="text-xs text-text-secondary">
                {pickLabels[bet.pick]} · {bet.homeTeam === bet.awayTeam ? '' : pickLabels[bet.pick] === '1' ? bet.homeTeam : pickLabels[bet.pick] === '2' ? bet.awayTeam : 'Empate'}
              </span>
              <span className="mt-2 text-xs text-text-tertiary">
                Apostaste S/. {bet.stake.toFixed(2)}
              </span>
              {bet.status === 'WON' && bet.return !== null && (
                <span className="text-sm font-bold text-gain-positive">
                  Ganaste +S/. {bet.return.toFixed(2)}
                </span>
              )}
              {bet.status === 'PENDING' && (
                <span className="text-sm font-bold text-status-pending">
                  Ganar S/. {(bet.odd * bet.stake).toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex w-[380px] shrink-0 flex-col gap-4">
          {otherBets.length > 0 && (
            <div className="rounded-[var(--radius-pill)] border border-border-light bg-surface p-6">
              <h3 className="text-sm font-bold text-text-primary">Tus otras apuestas activas</h3>
              <div className="mt-3 flex flex-col gap-3">
                {otherBets.map((b) => {
                  const m = matches.find((x) => x.id === b.matchId)
                  return (
                    <Link
                      key={b.id}
                      href={`/bets/${b.id}`}
                      className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border-light p-3 hover:border-primary"
                    >
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-text-primary">
                          {b.homeTeam} vs {b.awayTeam}
                        </p>
                        <p className="text-[10px] text-text-tertiary">
                          {pickLabels[b.pick]} · {b.odd.toFixed(2)}
                        </p>
                      </div>
                      {m && (
                        <div className="flex gap-1">
                          <span className="rounded bg-odd-default-bg px-2 py-1 text-[10px] font-bold text-primary">
                            {m.market.odds.home.toFixed(2)}
                          </span>
                          <span className="rounded bg-odd-default-bg px-2 py-1 text-[10px] font-bold text-text-tertiary">
                            {m.market.odds.draw.toFixed(2)}
                          </span>
                          <span className="rounded bg-odd-default-bg px-2 py-1 text-[10px] font-bold text-text-tertiary">
                            {m.market.odds.away.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          <div className="rounded-[var(--radius-pill)] border border-border-light bg-surface p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-text-primary">Otros partidos hoy</h3>
              <Link href="/" className="text-xs font-semibold text-primary hover:underline">
                Ver todos →
              </Link>
            </div>
            <div className="mt-3 flex gap-3">
              {otherMatches.map((m) => (
                <div
                  key={m.id}
                  className="flex-1 rounded-[var(--radius-lg)] border border-border-medium p-3"
                  style={{ background: 'linear-gradient(135deg, #FFF5F5 0%, #FFFFFF 40%, #F8F9FF 100%)' }}
                >
                  <p className="text-xs font-semibold text-text-primary">
                    {m.homeTeam.name} vs {m.awayTeam.name}
                  </p>
                  <div className="mt-2 flex gap-1">
                    <span className="rounded bg-odd-default-bg px-2 py-1 text-[10px] font-bold text-primary">
                      {m.market.odds.home.toFixed(2)}
                    </span>
                    <span className="rounded bg-odd-default-bg px-2 py-1 text-[10px] font-bold text-text-tertiary">
                      {m.market.odds.draw.toFixed(2)}
                    </span>
                    <span className="rounded bg-odd-default-bg px-2 py-1 text-[10px] font-bold text-text-tertiary">
                      {m.market.odds.away.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
