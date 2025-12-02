"use client"

import type { ReactNode } from "react"

interface CRTScreenProps {
  children: ReactNode
}

export function CRTScreen({ children }: CRTScreenProps) {
  return (
    <div className="relative min-h-screen bg-crt-blue overflow-hidden">
      {/* CRT curved screen effect */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, transparent 70%, rgba(0,0,0,0.4) 100%)
          `,
          borderRadius: "8px",
        }}
      />

      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.3) 2px,
            rgba(0, 0, 0, 0.3) 4px
          )`,
        }}
      />

      {/* Screen glow */}
      <div
        className="fixed inset-0 pointer-events-none z-30"
        style={{
          boxShadow: "inset 0 0 150px 20px rgba(0, 50, 30, 0.2)",
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-20"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
