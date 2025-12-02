"use client"

import { useEffect, useState } from "react"

export function ChristmasTree() {
  const [lights, setLights] = useState<boolean[]>([])

  useEffect(() => {
    // Initialize random light states
    setLights(Array.from({ length: 12 }, () => Math.random() > 0.5))

    // Animate lights
    const interval = setInterval(() => {
      setLights((prev) => prev.map(() => Math.random() > 0.3))
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const ornaments = [
    { symbol: "{}", color: "bg-gold", top: "25%", left: "45%" },
    { symbol: "<>", color: "bg-christmas-red", top: "40%", left: "30%" },
    { symbol: "01", color: "bg-cream", top: "40%", left: "60%" },
    { symbol: "//", color: "bg-pine-green", top: "55%", left: "25%" },
    { symbol: "()", color: "bg-gold", top: "55%", left: "55%" },
    { symbol: "[]", color: "bg-christmas-red", top: "70%", left: "35%" },
    { symbol: "&&", color: "bg-cream", top: "70%", left: "65%" },
    { symbol: ";;", color: "bg-gold", top: "85%", left: "45%" },
  ]

  const lightPositions = [
    { top: "20%", left: "48%" },
    { top: "30%", left: "35%" },
    { top: "30%", left: "62%" },
    { top: "45%", left: "22%" },
    { top: "45%", left: "75%" },
    { top: "60%", left: "18%" },
    { top: "60%", left: "80%" },
    { top: "75%", left: "28%" },
    { top: "75%", left: "72%" },
    { top: "90%", left: "40%" },
    { top: "90%", left: "60%" },
    { top: "35%", left: "48%" },
  ]

  const lightColors = ["bg-christmas-red", "bg-gold", "bg-pine-green", "bg-cream"]

  return (
    <div className="relative w-32 h-48" style={{ imageRendering: "pixelated" }}>
      {/* Star on top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
        <div
          className="w-6 h-6 bg-gold"
          style={{
            clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            animation: "sparkle 1s ease-in-out infinite",
          }}
        />
      </div>

      {/* Tree layers */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        {/* Top triangle */}
        <div className="w-0 h-0 border-l-[24px] border-r-[24px] border-b-[32px] border-l-transparent border-r-transparent border-b-pine-green" />
      </div>
      <div className="absolute top-10 left-1/2 -translate-x-1/2">
        {/* Middle triangle */}
        <div className="w-0 h-0 border-l-[36px] border-r-[36px] border-b-[40px] border-l-transparent border-r-transparent border-b-pine-green" />
      </div>
      <div className="absolute top-14 left-1/2 -translate-x-1/2">
        {/* Bottom triangle */}
        <div className="w-0 h-0 border-l-[48px] border-r-[48px] border-b-[48px] border-l-transparent border-r-transparent border-b-pine-green" />
      </div>

      {/* Trunk */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-bronze" />

      {/* Ornaments */}
      {ornaments.map((ornament, i) => (
        <div
          key={i}
          className={`absolute w-5 h-5 ${ornament.color} flex items-center justify-center text-[6px] text-crt-blue font-bold rounded-sm`}
          style={{ top: ornament.top, left: ornament.left, transform: "translate(-50%, -50%)" }}
        >
          {ornament.symbol}
        </div>
      ))}

      {/* Blinking lights */}
      {lightPositions.map((pos, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 rounded-full transition-opacity duration-200 ${lightColors[i % lightColors.length]}`}
          style={{
            top: pos.top,
            left: pos.left,
            transform: "translate(-50%, -50%)",
            opacity: lights[i % lights.length] ? 1 : 0.2,
            boxShadow: lights[i % lights.length] ? `0 0 6px 2px currentColor` : "none",
          }}
        />
      ))}
    </div>
  )
}
