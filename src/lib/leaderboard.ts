import { unstable_cache } from "next/cache"
import { getAppConfig } from "@/lib/config"

export type DayStatus = 0 | 1 | 2

export interface Player {
  rank: number
  username: string
  days: DayStatus[]
  totalStars: number
  score: number
}

export interface LeaderboardData {
  players: Player[]
  lastUpdated: string | null
}

interface AocStar {
  get_star_ts: number
  star_index: number
}

type AocDayCompletion = Partial<Record<"1" | "2", AocStar>>

interface AocMember {
  id: number
  name: string | null
  local_score: number
  stars: number
  last_star_ts: number
  completion_day_level: Record<string, AocDayCompletion>
}

interface AocLeaderboardResponse {
  event: string
  members: Record<string, AocMember>
  day1_ts?: number
  num_days?: number
  owner_id?: number
}

interface GenericPlayer {
  rank?: number
  username?: string
  totalStars?: number
  score?: number
  days?: number[]
}

interface GenericLeaderboardPayload {
  players?: GenericPlayer[]
  lastUpdated?: string | null
}

const MAX_DAYS = 12
const AOC_SESSION = process.env.AOC_SESSION
const APP_CONFIG = getAppConfig()
const LEADERBOARD_API_URL = process.env.LEADERBOARD_API_URL ?? APP_CONFIG.leaderboardUrl

const buildDays = (gold: number, silver: number): DayStatus[] =>
  Array.from({ length: MAX_DAYS }, (_, index) => {
    if (index < gold) return 2
    if (index < gold + silver) return 1
    return 0
  })

const normalizeDaysArray = (days: number[] | undefined): DayStatus[] => {
  if (!Array.isArray(days)) return buildDays(0, 0)

  return Array.from({ length: MAX_DAYS }, (_, index) => {
    const value = Number(days[index])
    if (value === 2) return 2
    if (value === 1) return 1
    return 0
  })
}

const FALLBACK_PLAYERS: Player[] = [
  { rank: 1, username: "SANTA_DEV", days: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], totalStars: 24, score: 9850 },
  { rank: 2, username: "ELF_CODER", days: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0], totalStars: 21, score: 8720 },
  { rank: 3, username: "FROSTY_JS", days: [2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0], totalStars: 18, score: 7540 },
  { rank: 4, username: "RUDOLPH_PY", days: [2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0], totalStars: 15, score: 6230 },
  { rank: 5, username: "GRINCH_GO", days: [2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0], totalStars: 13, score: 5180 },
  { rank: 6, username: "SNOW_RUST", days: [2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0], totalStars: 11, score: 4420 },
  { rank: 7, username: "JINGLE_TS", days: [2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0], totalStars: 9, score: 3650 },
  { rank: 8, username: "NORTH_CPP", days: [2, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0], totalStars: 7, score: 2890 },
  { rank: 9, username: "CAROL_RB", days: [2, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], totalStars: 5, score: 2100 },
  { rank: 10, username: "HOLLY_SQL", days: [2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], totalStars: 3, score: 1250 },
]

const normalizeDaysFromCompletion = (completion: Record<string, AocDayCompletion>, maxDays: number): DayStatus[] => {
  return Array.from({ length: maxDays }, (_, index) => {
    const dayData = completion[String(index + 1)]
    if (!dayData) return 0
    if (dayData["2"]) return 2
    if (dayData["1"]) return 1
    return 0
  })
}

const normalizePlayersFromAoc = (payload: AocLeaderboardResponse | null): LeaderboardData => {
  if (!payload || !payload.members) return { players: [], lastUpdated: null }

  const effectiveDays = Math.min(MAX_DAYS, payload.num_days ?? MAX_DAYS)

  const playersWithTimestamps = Object.values(payload.members)
    .map((member, index) => {
      const username =
        typeof member.name === "string" && member.name.trim().length > 0
          ? member.name
          : member.id
            ? `Anon_${member.id}`
            : `PLAYER_${index + 1}`

      const days = normalizeDaysFromCompletion(member.completion_day_level, effectiveDays)

      return {
        username,
        totalStars: member.stars,
        score: member.local_score,
        days,
        lastStarTs: member.last_star_ts,
      }
    })
    .sort((a, b) => b.score - a.score || b.totalStars - a.totalStars || a.username.localeCompare(b.username))

  const players: Player[] = playersWithTimestamps.map((player, idx) => ({
    rank: idx + 1,
    username: player.username,
    totalStars: player.totalStars,
    score: player.score,
    days: player.days,
  }))

  const lastStar = playersWithTimestamps.reduce((max, player) => Math.max(max, player.lastStarTs), 0)
  const lastUpdated = lastStar ? new Date(lastStar * 1000).toISOString() : new Date().toISOString()

  return { players, lastUpdated }
}

const normalizeGenericPlayers = (payload: GenericLeaderboardPayload | GenericPlayer[] | null): LeaderboardData => {
  const rawPlayers = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.players)
      ? payload.players
      : null

  if (!rawPlayers) return { players: [], lastUpdated: null }

  const players = rawPlayers
    .map((candidate, index) => {
      const rank = typeof candidate.rank === "number" ? candidate.rank : index + 1
      const username = typeof candidate.username === "string" ? candidate.username : `PLAYER_${index + 1}`
      const totalStars = typeof candidate.totalStars === "number" ? candidate.totalStars : 0
      const score = typeof candidate.score === "number" ? candidate.score : 0
      const days = normalizeDaysArray(candidate.days)

      return { rank, username, totalStars, score, days }
    })
    .filter((item): item is Player => Boolean(item))

  const lastUpdated = typeof payload?.lastUpdated === "string" ? payload.lastUpdated : null

  return { players, lastUpdated }
}

const isAocLeaderboardResponse = (payload: unknown): payload is AocLeaderboardResponse =>
  typeof payload === "object" &&
  payload !== null &&
  "members" in payload &&
  typeof (payload as AocLeaderboardResponse).members === "object" &&
  (payload as AocLeaderboardResponse).members !== null

const parseLeaderboardPayload = (payload: unknown): LeaderboardData => {
  if (isAocLeaderboardResponse(payload)) {
    const fromAoc = normalizePlayersFromAoc(payload)
    if (fromAoc.players.length) return fromAoc
  }

  const fromGeneric = normalizeGenericPlayers(payload as GenericLeaderboardPayload)
  return fromGeneric
}

const fetchLeaderboard = unstable_cache(
  async (): Promise<LeaderboardData> => {
    if (!LEADERBOARD_API_URL) {
      return { players: FALLBACK_PLAYERS, lastUpdated: null }
    }

    const headers: Record<string, string> = {}
    if (AOC_SESSION) {
      headers.Cookie = `session=${AOC_SESSION}`
    }

    const response = await fetch(LEADERBOARD_API_URL, {
      headers,
      next: { revalidate: 1200 },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch leaderboard (${response.status})`)
    }

    const payload: unknown = await response.json()
    const parsed = parseLeaderboardPayload(payload)

    return {
      players: parsed.players.length ? parsed.players : FALLBACK_PLAYERS,
      lastUpdated: parsed.lastUpdated ?? new Date().toISOString(),
    }
  },
  ["leaderboard-data"],
  { revalidate: 600 }
)

export async function getLeaderboardData(): Promise<LeaderboardData> {
  try {
    return await fetchLeaderboard()
  } catch (error) {
    console.error("Falling back to cached leaderboard:", error)
    return { players: FALLBACK_PLAYERS, lastUpdated: null }
  }
}
