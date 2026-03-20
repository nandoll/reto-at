'use client'

import type { Pick } from '@/types/domain'

const pickLabels: Record<Pick, string> = {
  HOME: '1',
  DRAW: 'X',
  AWAY: '2',
}

interface OddButtonProps {
  pick: Pick
  odd: number
  selected?: boolean
  onClick?: () => void
}

export default function OddButton({ pick, odd, selected, onClick }: OddButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center rounded-[var(--radius-md)] px-4 py-2 text-center transition-all duration-200 ${
        selected
          ? 'bg-primary text-white shadow-md shadow-primary/30'
          : 'bg-odd-default-bg text-text-primary hover:bg-border-medium'
      }`}
    >
      <span className="text-[10px] font-medium text-text-tertiary">
        {pickLabels[pick]}
      </span>
      <span className={`text-sm font-bold ${selected ? 'text-white' : 'text-primary'}`}>
        {odd.toFixed(2)}
      </span>
    </button>
  )
}
