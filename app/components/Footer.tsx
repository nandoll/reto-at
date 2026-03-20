import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="flex h-[52px] items-center justify-between px-[var(--spacing-xl)]">
      <div className="flex items-center gap-2">
        <Zap className="h-3.5 w-3.5 text-text-placeholder" />
        <span className="text-xs font-semibold text-text-secondary">
          BetDay Lite
        </span>
      </div>
      <span className="text-[11px] text-text-placeholder">
        Simulación educativa · No involucra dinero real
      </span>
      <div className="flex items-center gap-2.5">
        <span className="text-[11px] text-text-placeholder">© 2026</span>
        <span className="rounded border border-text-placeholder px-1.5 py-0.5 text-[10px] font-bold text-text-placeholder">
          18+
        </span>
      </div>
    </footer>
  )
}
