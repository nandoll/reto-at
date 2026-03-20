import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 rounded-[var(--radius-pill)] border border-border-light bg-surface px-16 py-20">
        <h1 className="text-6xl font-extrabold text-primary">404</h1>
        <p className="text-lg font-bold text-text-primary">Página no encontrada</p>
        <p className="max-w-xs text-center text-sm text-text-tertiary">
          La página que buscas no existe o fue movida. Vuelve al inicio para seguir apostando.
        </p>
        <Link
          href="/"
          className="mt-2 flex items-center gap-2 rounded-[var(--radius-md)] bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-hover"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
