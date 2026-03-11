import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Nanum_Pen_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _nanumPen = Nanum_Pen_Script({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "유타한인장로교회 - 유타주 솔트레이크시티",
  description: "하나님의 사랑과 은혜로 세워진 교회입니다. 모든 이들을 환영합니다.",
  generator: "v0.app",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
