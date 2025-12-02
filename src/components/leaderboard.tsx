import { getLeaderboardData } from "@/lib/leaderboard"
import { DayBadge } from "./day-badge"
import { RankBadge } from "./rank-badge"

const formatUpdatedAt = (timestamp: string | null) => {
  if (!timestamp) return "NO DISPONIBLE"
  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) return "NO DISPONIBLE"

  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(date)

  return `${formatted.replace(/,/g, "").toUpperCase()} UTC`
}

export async function Leaderboard() {
  const { players, lastUpdated } = await getLeaderboardData()
  const updatedLabel = formatUpdatedAt(lastUpdated)

  return (
    <div className="w-full max-w-5xl">
      {/* Table header decorations */}
      <div className="flex justify-center gap-2 mb-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-2 h-2 bg-pine-green rotate-45" />
        ))}
      </div>

      {/* Retro terminal window */}
      <div className="border-4 border-pine-green bg-card/90 backdrop-blur-sm">
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-pine-green border-b-2 border-gold">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-christmas-red rounded-sm" />
            <div className="w-3 h-3 bg-gold rounded-sm" />
            <div className="w-3 h-3 bg-cream rounded-sm" />
          </div>
          <span className="text-[8px] text-cream ml-2 tracking-wider">LEADERBOARD.EXE</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-border bg-muted/50">
                <th className="px-2 md:px-4 py-3 text-[6px] md:text-[10px] text-gold text-left tracking-widest">RANKING</th>
                <th className="px-2 md:px-4 py-3 text-[6px] md:text-[10px] text-gold text-left tracking-widest">
                  USERNAME
                </th>
                <th className="px-2 md:px-4 py-3 text-[6px] md:text-[10px] text-gold text-center tracking-widest">
                  <span className="hidden md:inline">ESTRELLAS POR DIAS (1-12)</span>
                  <span className="md:hidden">DAYS</span>
                </th>
                <th className="px-2 md:px-4 py-3 text-[6px] md:text-[10px] text-gold text-center tracking-widest">
                  ESTRELLAS
                </th>
                <th className="px-2 md:px-4 py-3 text-[6px] md:text-[10px] text-gold text-right tracking-widest">
                  PUNTAJE
                </th>
              </tr>
            </thead>
            <tbody>
              {players.length === 0 ? (
                <tr>
                  <td className="px-2 md:px-4 py-6 text-center text-[8px] md:text-[10px] text-muted-foreground" colSpan={5}>
                    No hay datos del leaderboard disponibles.
                  </td>
                </tr>
              ) : (
                players.map((player) => (
                  <tr
                    key={player.rank}
                    className={`border-b border-border/50 transition-colors hover:bg-muted/30 ${
                      player.rank === 1
                        ? "bg-gold/10"
                        : player.rank === 2
                          ? "bg-silver/10"
                          : player.rank === 3
                            ? "bg-bronze/10"
                            : ""
                    }`}
                  >
                    <td className="px-2 md:px-4 py-3">
                      <RankBadge rank={player.rank} />
                    </td>
                    <td className="px-2 md:px-4 py-3">
                      <div className="flex items-center gap-2">
                        {player.rank === 1 && (
                          <span className="text-christmas-red" title="Santa Hat">
                            🎅
                          </span>
                        )}
                        {player.rank === 2 && (
                          <span className="text-silver" title="Reindeer">
                            🦌
                          </span>
                        )}
                        {player.rank === 3 && (
                          <span className="text-bronze" title="Snowmen">
                            ⛄
                          </span>
                        )}
                        <span
                          className={`text-[7px] md:text-[9px] tracking-wider ${
                            player.rank === 1
                              ? "text-gold"
                              : player.rank === 2
                                ? "text-silver"
                                : player.rank === 3
                                  ? "text-bronze"
                                  : "text-cream"
                          }`}
                        >
                          {player.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 md:px-4 py-3">
                      <div className="flex gap-[2px] md:gap-1 justify-center flex-wrap">
                        {player.days.map((status, dayIndex) => (
                          <DayBadge key={dayIndex} day={dayIndex + 1} status={status} />
                        ))}
                      </div>
                    </td>
                    <td className="px-2 md:px-4 py-3 text-center">
                      <span className="text-[8px] md:text-[16px] text-gold">★</span>
                      <span className="text-[8px] md:text-[12px] text-cream ml-1">{player.totalStars}</span>
                    </td>
                    <td className="px-2 md:px-4 py-3 text-right">
                      <span className="text-[8px] md:text-[10px] text-pine-green font-bold tracking-wider">
                        {player.score.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Terminal footer */}
        <div className="px-3 py-2 bg-muted/50 border-t border-border">
          <p className="text-[8px] text-muted-foreground tracking-wider">
            {">"} ULTIMA ACTUALIZACION: {updatedLabel} <span className="animate-pulse">█</span>
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-[6px] md:text-[7px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-border bg-muted" />
          <span>SIN RESOLVER</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-silver bg-silver/30 flex items-center justify-center">
            <span className="text-silver text-[8px]">★</span>
          </div>
          <span>1 RESUELTO (PLATA)</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 md:w-5 md:h-5 border-2 border-gold bg-gold/30 flex items-center justify-center"
            style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
          >
            <span className="text-gold text-[8px]">★</span>
          </div>
          <span>2 RESUELTOS (ORO)</span>
        </div>
      </div>
    </div>
  )
}
