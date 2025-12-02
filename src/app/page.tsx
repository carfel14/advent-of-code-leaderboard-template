import { CRTScreen } from "@/components/crt-screen"
import { Snowfall } from "@/components/snowfall"
import { ChristmasTree } from "@/components/christmas-tree"
import { SantaSleigh } from "@/components/santa-sleigh"
import { HeroPortrait } from "@/components/hero-portrait"
import { TitleBanner } from "@/components/title-banner"
import { Leaderboard } from "@/components/leaderboard"
import { getAppConfig } from "@/lib/config"

export default function Home() {
  const { branding } = getAppConfig()

  return (
    <CRTScreen>
      <Snowfall />
      <SantaSleigh />

      <div className="relative z-10 min-h-screen flex">
        {/* Christmas Tree - Left Side */}
        <div className="hidden lg:block fixed left-4 top-1/2 -translate-y-1/2">
          <ChristmasTree />
        </div>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center px-4 py-8 lg:px-24">
          <HeroPortrait headerImageUrl={branding.headerImageUrl} title={branding.title} />
          <TitleBanner title={branding.title} subtitle={branding.subtitle} />
          <Leaderboard />

          {/* Footer */}
          <footer className="mt-8 text-center">
            <p className="text-[8px] text-muted-foreground tracking-wider">
              {branding.footerText}
            </p>
          </footer>
        </main>

        {/* Christmas Tree - Right Side (mobile) */}
        <div className="lg:hidden fixed right-2 bottom-4 scale-50 origin-bottom-right">
          <ChristmasTree />
        </div>
      </div>
    </CRTScreen>
  )
}
