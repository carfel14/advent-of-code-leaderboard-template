import rawConfig from "../../config.json"

export interface BrandingConfig {
  title: string
  subtitle: string
  headerImageUrl: string
  footerText: string
}

export interface AppConfig {
  leaderboardUrl: string
  branding: BrandingConfig
}

type RawConfig = Partial<AppConfig> & {
  // Support common misspelling from the example/config
  leaderboardURl?: string
}

const DEFAULT_CONFIG: AppConfig = {
  leaderboardUrl: "https://adventofcode.com/2025/leaderboard/private/view/000000.json",
  branding: {
    title: "Advent of Code",
    subtitle: "Leaderboard",
    headerImageUrl: "/diddy.png",
    footerText: "<> DIDDY'S MALVADOS Y ASOCIADOS </> © 2025",
  },
}

let cachedConfig: AppConfig | null = null

const asRawConfig = (value: unknown): RawConfig => {
  if (typeof value === "object" && value !== null) {
    return value as RawConfig
  }
  return {}
}

const asString = (value: unknown, fallback: string): string =>
  typeof value === "string" && value.trim().length > 0 ? value : fallback

const normalizeConfig = (raw: RawConfig): AppConfig => {
  const branding = raw.branding ?? {}

  const leaderboardUrl =
    typeof raw.leaderboardUrl === "string"
      ? raw.leaderboardUrl
      : typeof raw.leaderboardURl === "string"
        ? raw.leaderboardURl
        : DEFAULT_CONFIG.leaderboardUrl

  return {
    leaderboardUrl,
    branding: {
      title: asString(branding.title, DEFAULT_CONFIG.branding.title),
      subtitle: asString(branding.subtitle, DEFAULT_CONFIG.branding.subtitle),
      headerImageUrl: asString(branding.headerImageUrl, DEFAULT_CONFIG.branding.headerImageUrl),
      footerText: asString(branding.footerText, DEFAULT_CONFIG.branding.footerText),
    },
  }
}

export function getAppConfig(): AppConfig {
  if (cachedConfig) return cachedConfig

  const raw = asRawConfig(rawConfig)
  cachedConfig = normalizeConfig(raw)

  return cachedConfig
}
