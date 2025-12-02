"use client"

export function SantaSleigh() {
  return (
    <div
      className="fixed top-16 left-0 z-20 pointer-events-none"
      style={{
        animation: "sleigh 20s linear infinite",
      }}
    >
      {/* Pixel art sleigh */}
      <div className="relative" style={{ imageRendering: "pixelated" }}>
        {/* Reindeer */}
        <div className="absolute -left-12 top-2">
          <div className="flex gap-1">
            {/* Antlers */}
            <div className="w-1 h-2 bg-bronze" />
            <div className="w-1 h-3 bg-bronze" />
          </div>
          <div className="w-4 h-3 bg-bronze rounded-sm" />
          <div className="flex gap-1 -mt-1">
            <div className="w-1 h-2 bg-bronze" />
            <div className="w-1 h-2 bg-bronze" />
          </div>
          {/* Red nose */}
          <div className="absolute top-2 -left-1 w-2 h-2 bg-christmas-red rounded-full animate-pulse" />
        </div>

        {/* Sleigh body */}
        <div className="relative">
          <div className="w-10 h-6 bg-christmas-red rounded-sm border-2 border-gold" />
          <div
            className="absolute -bottom-1 left-0 w-12 h-2 bg-gold rounded-b-lg"
            style={{
              clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
            }}
          />
        </div>

        {/* Santa */}
        <div className="absolute -top-3 left-2">
          <div className="w-3 h-3 bg-cream rounded-full" /> {/* Head */}
          <div className="w-1 h-2 bg-christmas-red absolute -top-2 left-1" /> {/* Hat */}
          <div className="w-2 h-1 bg-cream absolute -top-2 left-0" /> {/* Hat trim */}
        </div>

        {/* Gift bag */}
        <div className="absolute top-0 right-0 w-4 h-5 bg-pine-green rounded-t-sm" />
      </div>
    </div>
  )
}
