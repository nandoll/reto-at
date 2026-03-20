'use client'

import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'

interface ToastProps {
  message: string
  detail?: string
  onClose: () => void
}

export default function Toast({ message, detail, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed top-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-[var(--radius-md)] border border-[#4CAF5044] bg-surface px-4 py-3.5 shadow-lg transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}
    >
      <CheckCircle className="h-5 w-5 text-status-won" />
      <div>
        <p className="text-sm font-semibold text-text-primary">{message}</p>
        {detail && <p className="text-xs text-text-tertiary">{detail}</p>}
      </div>
    </div>
  )
}
