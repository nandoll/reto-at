"use client";

interface HourFilterProps {
  hours: string[];
  selected: Set<string>;
  onToggle: (hour: string) => void;
  onReset: () => void;
}

export default function HourFilter({
  hours,
  selected,
  onToggle,
  onReset,
}: HourFilterProps) {
  const allSelected = selected.size === 0;

  return (
    <div className="flex gap-2 overflow-x-auto px-6 py-3">
      <button
        onClick={onReset}
        className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
          allSelected
            ? "bg-primary text-white"
            : "border border-border-medium bg-surface text-text-secondary hover:border-primary"
        }`}
      >
        Todos
      </button>
      {hours.map((hour) => (
        <button
          key={hour}
          onClick={() => onToggle(hour)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            selected.has(hour)
              ? "bg-primary text-white"
              : "border border-border-medium bg-surface text-text-secondary hover:border-primary"
          }`}
        >
          {hour}
        </button>
      ))}
    </div>
  );
}
