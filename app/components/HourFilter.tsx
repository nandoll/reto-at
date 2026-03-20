'use client'

interface HourFilterProps {
  hours: string[]
  selected: string | null
  onSelect: (hour: string | null) => void
}

export default function HourFilter({ hours, selected, onSelect }: HourFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-6 py-3">
      <button
        onClick={() => onSelect(null)}
        className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
          selected === null
            ? 'bg-primary text-white'
            : 'border border-border-medium bg-surface text-text-secondary hover:border-primary'
        }`}
      >
        Todos
      </button>
      {hours.map((hour) => (
        <button
          key={hour}
          onClick={() => onSelect(hour)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            selected === hour
              ? 'bg-primary text-white'
              : 'border border-border-medium bg-surface text-text-secondary hover:border-primary'
          }`}
        >
          {hour}
        </button>
      ))}
    </div>
  )
}
