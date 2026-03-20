'use client'

import type { Pick } from '@/types/domain'

interface OddButtonProps {
  pick: Pick
  odd: number
  teamName?: string
  selected?: boolean
  onClick?: () => void
}

export default function OddButton({ odd, teamName, selected, onClick }: OddButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-[88px] flex-col items-center rounded-[var(--radius-md)] px-2 py-2 text-center transition-all duration-200 ${
        selected
          ? 'bg-primary text-white shadow-md shadow-primary/30'
          : 'bg-odd-default-bg text-text-primary hover:bg-border-medium'
      }`}
    >
      <span className={`text-sm font-bold ${selected ? 'text-white' : 'text-primary'}`}>
        {odd.toFixed(2)}
      </span>
      {teamName && (
        <span className={`truncate w-full text-[10px] leading-tight ${selected ? 'text-white/70' : 'text-text-tertiary'}`}>
          {teamName}
        </span>
      )}
    </button>
  )
}
