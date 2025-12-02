interface RankBadgeProps {
  rank: number
}

export function RankBadge({ rank }: RankBadgeProps) {
  if (rank === 1) {
    return (
      <div className="relative inline-flex items-center justify-center w-8 h-8">
        {/* Gold trophy background */}
        <div
          className="absolute inset-0 bg-gold"
          style={{
            clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 60%, 70% 100%, 30% 100%, 0% 60%, 0% 20%)",
            animation: "sparkle 1.5s ease-in-out infinite",
          }}
        />
        <span className="relative z-10 text-[10px] text-crt-blue font-bold">1</span>
      </div>
    )
  }

  if (rank === 2) {
    return (
      <div className="relative inline-flex items-center justify-center w-8 h-8">
        {/* Silver wreath border effect */}
        <div
          className="absolute inset-0 border-2 border-silver bg-silver/20"
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />
        <span className="relative z-10 text-[10px] text-silver font-bold">2</span>
      </div>
    )
  }

  if (rank === 3) {
    return (
      <div className="relative inline-flex items-center justify-center w-8 h-8">
        {/* Bronze circle */}
        <div className="absolute inset-1 bg-bronze/30 border-2 border-bronze rounded-full" />
        <span className="relative z-10 text-[10px] text-bronze font-bold">3</span>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center justify-center w-8 h-8">
      <span className="text-[10px] text-muted-foreground">{rank}</span>
    </div>
  )
}
