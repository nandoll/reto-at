'use client'

import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Zap } from 'lucide-react'

interface LoginModalProps {
  open: boolean
  onClose: () => void
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true))
    } else {
      setVisible(false)
    }
  }, [open])

  if (!open) return null

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      })

      if (result?.error) {
        setError('Credenciales inválidas')
        return
      }

      onClose()
      router.refresh()
    } catch {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        visible ? 'bg-black/65' : 'bg-black/0'
      }`}
      onClick={onClose}
    >
      <div
        className={`flex overflow-hidden rounded-[20px] bg-surface shadow-2xl shadow-black/30 transition-all duration-300 ${
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{ width: 820, height: 480 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Brand Panel */}
        <div
          className="flex w-[360px] shrink-0 flex-col items-center justify-center gap-4 p-10"
          style={{
            background: 'linear-gradient(180deg, #CC0000 0%, #8B0000 100%)',
          }}
        >
          <Zap className="h-12 w-12 text-white" />
          <span className="text-4xl font-extrabold text-white">BetDay</span>
          <p className="text-center text-[15px] leading-relaxed text-white/75">
            Tu simulador de{'\n'}apuestas deportivas
          </p>
        </div>

        {/* Right Form Panel */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col justify-center gap-5 px-9 py-10"
        >
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-lg font-extrabold text-primary">BetDay</span>
          </div>

          <h2 className="text-lg font-bold text-text-primary">
            Inicia sesión para apostar
          </h2>
          <p className="text-[13px] text-text-tertiary">
            Ingresa tus datos para realizar apuestas
          </p>

          {error && <p className="text-sm text-primary">{error}</p>}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-text-secondary">
              Correo electrónico
            </label>
            <input
              name="email"
              type="email"
              required
              defaultValue="demo@betday.com"
              className="rounded-[var(--radius-md)] border border-border-medium px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-text-secondary">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              required
              defaultValue="demo123"
              className="rounded-[var(--radius-md)] border border-border-medium px-3 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex h-11 items-center justify-center rounded-[var(--radius-md)] bg-primary text-sm font-bold text-white transition-colors hover:bg-primary-hover disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}
