interface DayBadgeProps {
  day: number
  status: 0 | 1 | 2 // 0 = unsolved, 1 = silver (1 star), 2 = gold (2 stars)
}

export function DayBadge({ day, status }: DayBadgeProps) {
  const baseClasses =
    "w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[6px] md:text-[8px] border-2 transition-all"

  if (status === 0) {
    return (
      <div className={`${baseClasses} border-border bg-muted text-muted-foreground`} title={`Day ${day}: Not Started`}>
        {day}
      </div>
    )
  }

  if (status === 1) {
    return (
      <div className={`${baseClasses} border-silver bg-silver/20 text-silver`} title={`Day ${day}: 1 Star`}>
        <span className="text-[8px] md:text-[10px]">★</span>
      </div>
    )
  }

  // Gold status with glow effect
  return (
    <div
      className={`${baseClasses} border-gold bg-gold/30 text-gold`}
      style={{
        animation: "pulse-glow 2s ease-in-out infinite",
        animationDelay: `${day * 0.1}s`,
      }}
      title={`Day ${day}: 2 Stars (Complete!)`}
    >
      <span className="text-[8px] md:text-[10px]">★</span>
    </div>
  )
}
