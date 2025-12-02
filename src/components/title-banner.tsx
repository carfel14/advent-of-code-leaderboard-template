interface TitleBannerProps {
  title: string
  subtitle: string
}

export function TitleBanner({ title, subtitle }: TitleBannerProps) {
  const normalizedTitle = title.toUpperCase()

  return (
    <div className="relative mb-8 text-center">
      {/* Decorative ribbon ends */}
      <div
        className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-12 bg-christmas-red"
        style={{
          clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
        }}
      />
      <div
        className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-12 bg-christmas-red"
        style={{
          clipPath: "polygon(0 0, 0 100%, 100% 50%)",
        }}
      />

      {/* Main banner */}
      <div className="relative bg-christmas-red border-4 border-gold px-6 py-4 md:px-12 md:py-6">
        {/* Pixel pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 4px,
            rgba(255,255,255,0.1) 4px,
            rgba(255,255,255,0.1) 8px
          )`,
          }}
        />

        <h1 className="text-[10px] md:text-sm text-cream tracking-wider leading-relaxed">
          <span className="text-gold">★</span> {normalizedTitle} <span className="text-gold">★</span>
        </h1>
        <h2 className="text-[8px] md:text-xs text-gold mt-2 tracking-widest">{subtitle}</h2>
        
      </div>

      {/* Hanging ornaments */}
      <div className="absolute -bottom-6 left-1/4">
        <div className="w-1 h-4 bg-gold" />
        <div
          className="w-4 h-4 bg-gold rounded-full"
          style={{
            animation: "sparkle 2s ease-in-out infinite",
          }}
        />
      </div>
      <div className="absolute -bottom-8 right-1/3">
        <div className="w-1 h-6 bg-christmas-red" />
        <div className="w-5 h-5 bg-christmas-red rounded-full" />
      </div>
    </div>
  )
}
