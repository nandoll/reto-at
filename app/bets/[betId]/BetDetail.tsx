"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useBetStore, type PlacedBet } from "@/store/bet-store";
import { useStoreHydration } from "@/store/use-store-hydration";
import type { Match } from "@/types/domain";
import TeamCrest from "@/app/components/TeamCrest";
import FeaturedCard from "@/app/components/FeaturedCard";

const pickLabels = { HOME: "1", DRAW: "X", AWAY: "2" } as const;

const statusBadge = {
  PENDING: "bg-primary text-white",
  WON: "border border-status-won text-status-won",
  LOST: "border border-status-lost text-status-lost",
} as const;

interface BetDetailProps {
  betId: string;
  seedBet: PlacedBet | null;
  seedBets: PlacedBet[];
  matches: Match[];
}

export default function BetDetail({
  betId,
  seedBet,
  seedBets,
  matches,
}: BetDetailProps) {
  const hydrated = useStoreHydration();
  const { placedBets } = useBetStore();

  const storeBet = hydrated ? placedBets.find((b) => b.id === betId) : null;
  const bet = storeBet ?? seedBet;

  if (!bet) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <p className="text-text-tertiary">Apuesta no encontrada</p>
      </div>
    );
  }

  const match = matches.find((m) => m.id === bet.matchId);
  const pickedTeam =
    bet.pick === "HOME"
      ? bet.homeTeam
      : bet.pick === "AWAY"
        ? bet.awayTeam
        : "Empate";

  const otherBets = [...(hydrated ? placedBets : []), ...seedBets]
    .filter((b, i, arr) => arr.findIndex((x) => x.id === b.id) === i)
    .filter((b) => b.id !== betId && b.status === "PENDING")
    .slice(0, 2);

  const otherMatch = matches.find((m) => m.id !== bet.matchId);

  return (
    <div className="flex flex-col gap-3 p-3 lg:p-4">
      <Link
        href="/profile"
        className="flex items-center gap-2 text-sm text-text-tertiary hover:text-text-secondary"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al perfil
      </Link>

      <div className="flex flex-col items-start gap-4 lg:flex-row">
        {/* Main card */}
        <div className="w-full flex-1 self-start rounded-[var(--radius-pill)] border border-border-light bg-surface p-4 lg:p-7">
          <h1 className="text-base font-bold text-text-primary lg:text-lg">
            Detalle de tu apuesta
          </h1>
          <p className="mt-1 text-xs text-text-tertiary">
            Revisa el estado de tu apuesta y explora otros partidos disponibles
          </p>

          {/* Mobile: stacked layout */}
          <div
            className="mt-4 flex flex-col gap-4 rounded-[var(--radius-lg)] border border-border-light p-4 lg:hidden"
            style={{
              background:
                "linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 50%, #F8F9FF 100%)",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className={`rounded px-2.5 py-1 text-[10px] font-bold ${statusBadge[bet.status]}`}
              >
                {bet.status}
              </span>
              {match && (
                <span className="text-[10px] text-text-tertiary">
                  {new Date(bet.placedAt).toLocaleDateString("es-PE")}
                </span>
              )}
            </div>

            <div className="flex items-center justify-center gap-6">
              <div className="flex flex-col items-center gap-1">
                <TeamCrest
                  teamId={bet.homeTeamId}
                  teamName={bet.homeTeam}
                  size={44}
                />
                <span className="text-[10px] font-bold text-text-tertiary">
                  {match?.homeTeam.shortName ?? ""}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold text-text-tertiary">VS</span>
                <span className="text-[9px] text-text-placeholder">1X2</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <TeamCrest
                  teamId={bet.awayTeamId}
                  teamName={bet.awayTeam}
                  size={44}
                />
                <span className="text-[10px] font-bold text-text-tertiary">
                  {match?.awayTeam.shortName ?? ""}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
                Tu apuesta
              </span>
              <span className="text-sm text-text-primary">
                {pickedTeam} ({pickLabels[bet.pick]})
              </span>
              <span className="text-2xl font-extrabold text-primary">
                {bet.odd.toFixed(2)}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-tertiary">Apostaste</span>
                <span className="text-text-primary">
                  S/.{bet.stake.toFixed(2)}
                </span>
              </div>
              {bet.status === "PENDING" && (
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gain-positive">
                    Ganancia potencial
                  </span>
                  <span className="font-bold text-gain-positive">
                    S/.{(bet.odd * bet.stake).toFixed(2)}
                  </span>
                </div>
              )}
              {bet.status === "WON" && bet.return !== null && (
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-gain-positive">
                    Ganaste
                  </span>
                  <span className="font-bold text-gain-positive">
                    +S/.{bet.return.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            <span className="text-center text-[9px] text-text-placeholder">
              ID: {bet.id}
            </span>
          </div>

          {/* Desktop: 3-column layout */}
          <div
            className="mt-5 hidden items-center rounded-[var(--radius-lg)] border border-border-light p-6 lg:flex"
            style={{
              background:
                "linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 50%, #F8F9FF 100%)",
            }}
          >
            {/* Left: status + teams + date */}
            <div className="flex w-[240px] shrink-0 flex-col gap-1">
              <span
                className={`self-start rounded px-2.5 py-1 text-[10px] font-bold ${statusBadge[bet.status]}`}
              >
                {bet.status}
              </span>
              <h2 className="mt-1 text-2xl font-extrabold leading-tight text-text-primary">
                {bet.homeTeam}
              </h2>
              <h2 className="text-2xl font-extrabold leading-tight text-text-primary">
                vs {bet.awayTeam}
              </h2>
              {match && (
                <p className="mt-1 text-xs text-text-tertiary">
                  {new Date(bet.placedAt).toLocaleDateString("es-PE")} ·{" "}
                  {match.league.name}
                </p>
              )}
            </div>

            {/* Center: crests */}
            <div className="flex flex-1 items-center justify-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <TeamCrest
                  teamId={bet.homeTeamId}
                  teamName={bet.homeTeam}
                  size={56}
                />
                <span className="text-[10px] font-bold text-text-tertiary">
                  {match?.homeTeam.shortName ?? ""}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm font-bold text-text-tertiary">VS</span>
                <span className="text-[9px] text-text-placeholder">1X2</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <TeamCrest
                  teamId={bet.awayTeamId}
                  teamName={bet.awayTeam}
                  size={56}
                />
                <span className="text-[10px] font-bold text-text-tertiary">
                  {match?.awayTeam.shortName ?? ""}
                </span>
              </div>
            </div>

            {/* Right: bet info */}
            <div className="flex w-[240px] shrink-0 flex-col items-center gap-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
                Tu apuesta
              </span>
              <span className="text-sm text-text-primary">
                {pickedTeam} ({pickLabels[bet.pick]})
              </span>
              <span className="text-3xl font-extrabold text-primary">
                {bet.odd.toFixed(2)}
              </span>
              <div className="mt-1 flex w-full items-center justify-between text-xs">
                <span className="text-text-tertiary">Apostaste</span>
                <span className="text-text-primary">
                  S/.{bet.stake.toFixed(2)}
                </span>
              </div>
              {bet.status === "PENDING" && (
                <div className="flex w-full items-center justify-between text-xs">
                  <span className="font-semibold text-gain-positive">
                    Ganancia potencial
                  </span>
                  <span className="font-bold text-gain-positive">
                    S/.{(bet.odd * bet.stake).toFixed(2)}
                  </span>
                </div>
              )}
              {bet.status === "WON" && bet.return !== null && (
                <div className="flex w-full items-center justify-between text-xs">
                  <span className="font-semibold text-gain-positive">
                    Ganaste
                  </span>
                  <span className="font-bold text-gain-positive">
                    +S/.{bet.return.toFixed(2)}
                  </span>
                </div>
              )}
              <span className="mt-2 text-[9px] text-text-placeholder">
                ID: {bet.id} · {new Date(bet.placedAt).toLocaleString("es-PE")}
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex w-full shrink-0 flex-col gap-4 lg:w-[380px]">
          {otherBets.length > 0 && (
            <div className="rounded-[var(--radius-pill)] border border-border-light bg-surface p-4 lg:p-6">
              <h3 className="mb-3 text-sm font-bold text-text-primary">
                Tus otras apuestas activas
              </h3>
              <div className="flex flex-col gap-3">
                {otherBets.map((b) => {
                  const m = matches.find((x) => x.id === b.matchId);
                  if (!m) return null;
                  return (
                    <Link
                      key={b.id}
                      href={`/bets/${b.id}`}
                      className="rounded-[var(--radius-lg)] border border-border-light p-4 hover:border-primary"
                    >
                      <span className="text-[10px] text-text-tertiary">
                        {new Date(b.placedAt).toLocaleTimeString("es-PE", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}{" "}
                        · {b.status}
                      </span>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <TeamCrest
                          teamId={b.homeTeamId}
                          teamName={b.homeTeam}
                          size={16}
                        />
                        <span className="text-xs font-semibold text-text-primary">
                          {b.homeTeam}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TeamCrest
                          teamId={b.awayTeamId}
                          teamName={b.awayTeam}
                          size={16}
                        />
                        <span className="text-xs text-text-secondary">
                          {b.awayTeam}
                        </span>
                      </div>
                      <div className="mt-2 flex gap-1.5">
                        {(["HOME", "DRAW", "AWAY"] as const).map((pick) => {
                          const odd =
                            pick === "HOME"
                              ? m.market.odds.home
                              : pick === "DRAW"
                                ? m.market.odds.draw
                                : m.market.odds.away;
                          const name =
                            pick === "HOME"
                              ? m.homeTeam.name
                              : pick === "DRAW"
                                ? "Empate"
                                : m.awayTeam.name;
                          const isSelected = b.pick === pick;
                          return (
                            <div
                              key={pick}
                              className={`flex flex-1 flex-col items-center rounded-[var(--radius-md)] py-1.5 ${
                                isSelected
                                  ? "bg-primary text-white"
                                  : "bg-odd-default-bg"
                              }`}
                            >
                              <span
                                className={`text-xs font-bold ${isSelected ? "text-white" : "text-primary"}`}
                              >
                                {odd.toFixed(2)}
                              </span>
                              <span
                                className={`text-[9px] ${isSelected ? "text-white/70" : "text-text-tertiary"}`}
                              >
                                {name}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {otherMatch && (
            <div className="rounded-[var(--radius-pill)] border border-border-light bg-surface p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-text-primary">
                  Otros partidos hoy
                </h3>
                <Link
                  href="/"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Ver todos →
                </Link>
              </div>
              <div className="mt-3">
                <FeaturedCard match={otherMatch} labelIndex={0} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
