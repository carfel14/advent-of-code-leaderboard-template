import type React from "react"
import type { Metadata, Viewport } from "next"
import { Press_Start_2P } from "next/font/google"
import { getAppConfig } from "@/lib/config"
import "./globals.css"

const title = getAppConfig().branding.title

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: title,
  description: "A retro pixel-art inspired Christmas coding challenge leaderboard",
}

export const viewport: Viewport = {
  themeColor: "#0a0f1a",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${pressStart2P.className} antialiased`}>{children}</body>
    </html>
  )
}
