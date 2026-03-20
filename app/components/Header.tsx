"use client";

import { useState } from "react";
import { Zap, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import AuthStatus from "./AuthStatus";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const initial = session?.user?.name?.charAt(0).toUpperCase() ?? "U";

  return (
    <>
      <header
        className="flex h-14 items-center justify-between px-4 lg:h-[72px] lg:px-[var(--spacing-xl)]"
        style={{
          background: "linear-gradient(90deg, #CC0000E6 0%, #9A0000E6 100%)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 4px 20px #CC000030",
        }}
      >
        <div className="flex items-center gap-6 lg:gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-white lg:h-6 lg:w-6" />
            <span className="text-lg font-extrabold text-white lg:text-2xl">
              BetDay
            </span>
            <span className="rounded bg-white/20 px-1.5 py-0.5 text-[8px] font-bold text-white lg:text-[10px]">
              LITE
            </span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            <Link
              href="/"
              className={`text-sm font-bold ${pathname === "/" ? "text-white" : "text-white/50 hover:text-white/70"}`}
            >
              Inicio
            </Link>
            <Link
              href="/profile"
              className={`text-sm ${pathname === "/profile" ? "font-bold text-white" : "text-white/50 hover:text-white/70"}`}
            >
              Perfil
            </Link>
          </nav>
        </div>

        {/* Desktop auth */}
        <div className="hidden lg:block">
          <AuthStatus />
        </div>

        {/* Mobile right: avatar + hamburger */}
        <div className="flex items-center gap-2.5 lg:hidden">
          {session?.user && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">
              {initial}
            </div>
          )}
          <button onClick={() => setMenuOpen(true)} aria-label="Menú">
            <Menu className="h-5 w-5 text-white" />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-64 flex-col bg-surface shadow-xl">
            <div className="flex items-center justify-between border-b border-border-light px-4 py-4">
              <span className="text-sm font-bold text-text-primary">Menú</span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5 text-text-secondary" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-4">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={`rounded-[var(--radius-md)] px-4 py-3 text-sm font-medium ${
                  pathname === "/"
                    ? "bg-primary-light font-bold text-primary"
                    : "text-text-primary hover:bg-surface-secondary"
                }`}
              >
                Inicio
              </Link>
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className={`rounded-[var(--radius-md)] px-4 py-3 text-sm font-medium ${
                  pathname === "/profile"
                    ? "bg-primary-light font-bold text-primary"
                    : "text-text-primary hover:bg-surface-secondary"
                }`}
              >
                Perfil
              </Link>
            </nav>

            <div className="mt-auto border-t border-border-light p-4">
              {session?.user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {initial}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="rounded-[var(--radius-md)] border border-border-medium px-4 py-2.5 text-sm text-text-secondary hover:bg-surface-secondary"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-[var(--radius-md)] bg-primary px-4 py-2.5 text-center text-sm font-bold text-white"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
