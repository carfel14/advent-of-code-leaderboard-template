"use client"

import { useEffect, useState } from "react"

interface HeroPortraitProps {
  headerImageUrl: string
  title: string
}

export function HeroPortrait({ headerImageUrl, title }: HeroPortraitProps) {
  const [lightPhase, setLightPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLightPhase((prev) => (prev + 1) % 12)
    }, 200)
    return () => clearInterval(interval)
  }, [])

  const lightColors = ["#ff4444", "#44ff44", "#ffcc00", "#44aaff"]

  return (
    <div className="relative mb-6">
      {/* Pixel light border */}
      <div className="absolute -inset-4 pointer-events-none">
        {/* Top lights */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`top-${i}`}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              left: `${8 + i * 8}%`,
              top: "-8px",
              backgroundColor: lightColors[(i + lightPhase) % lightColors.length],
              boxShadow: `0 0 8px ${lightColors[(i + lightPhase) % lightColors.length]}`,
              opacity: (i + lightPhase) % 3 === 0 ? 1 : 0.4,
            }}
          />
        ))}
        {/* Bottom lights */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`bottom-${i}`}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              left: `${8 + i * 8}%`,
              bottom: "-8px",
              backgroundColor: lightColors[(i + lightPhase + 2) % lightColors.length],
              boxShadow: `0 0 8px ${lightColors[(i + lightPhase + 2) % lightColors.length]}`,
              opacity: (i + lightPhase + 1) % 3 === 0 ? 1 : 0.4,
            }}
          />
        ))}
        {/* Left lights */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`left-${i}`}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              left: "-8px",
              top: `${12 + i * 12}%`,
              backgroundColor: lightColors[(i + lightPhase + 1) % lightColors.length],
              boxShadow: `0 0 8px ${lightColors[(i + lightPhase + 1) % lightColors.length]}`,
              opacity: (i + lightPhase + 2) % 3 === 0 ? 1 : 0.4,
            }}
          />
        ))}
        {/* Right lights */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`right-${i}`}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              right: "-8px",
              top: `${12 + i * 12}%`,
              backgroundColor: lightColors[(i + lightPhase + 3) % lightColors.length],
              boxShadow: `0 0 8px ${lightColors[(i + lightPhase + 3) % lightColors.length]}`,
              opacity: (i + lightPhase) % 3 === 0 ? 1 : 0.4,
            }}
          />
        ))}
      </div>

      {/* Holly leaves decoration */}
      <div className="absolute -top-6 -left-6 z-10">
        <div className="relative">
          <div className="w-4 h-6 bg-pine-green rounded-full rotate-45" />
          <div className="w-4 h-6 bg-pine-green rounded-full -rotate-45 absolute top-0 left-2" />
          <div className="w-2 h-2 bg-christmas-red rounded-full absolute top-2 left-1" />
          <div className="w-2 h-2 bg-christmas-red rounded-full absolute top-3 left-3" />
        </div>
      </div>
      <div className="absolute -top-6 -right-6 z-10 scale-x-[-1]">
        <div className="relative">
          <div className="w-4 h-6 bg-pine-green rounded-full rotate-45" />
          <div className="w-4 h-6 bg-pine-green rounded-full -rotate-45 absolute top-0 left-2" />
          <div className="w-2 h-2 bg-christmas-red rounded-full absolute top-2 left-1" />
          <div className="w-2 h-2 bg-christmas-red rounded-full absolute top-3 left-3" />
        </div>
      </div>

      {/* Portrait frame */}
      <div className="relative w-36 h-36 md:w-44 md:h-44 border-4 border-gold bg-muted overflow-hidden">
        {/* Pixelated inner border */}
        <div className="absolute inset-2 border-2 border-dashed border-pine-green" />

        {/* Placeholder for portrait */}
        <div className="absolute inset-4 bg-crt-blue flex items-center justify-center">
          <img
            src={headerImageUrl}
            alt={`${title} portrait`}
            className="w-full h-full object-cover"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* Santa hat overlay hint */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
          <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[20px] border-l-transparent border-r-transparent border-b-christmas-red" />
          <div className="w-8 h-2 bg-cream -mt-1 rounded-sm mx-auto" />
          <div className="w-3 h-3 bg-cream rounded-full absolute -top-1 left-1/2 -translate-x-1/2" />
        </div>
      </div>
    </div>
  )
}
