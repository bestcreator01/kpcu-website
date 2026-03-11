"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export type SidebarLink = { name: string; href: string }

const sidebarConfigs: Record<string, SidebarLink[]> = {
  교회소개: [
    { name: "교회 소개", href: "/about" },
    { name: "섬기는 사람들", href: "/about/staff" },
    { name: "예배 안내", href: "/worship-times" },
    { name: "교회 일정", href: "/about/calendar" },
    { name: "온라인 헌금", href: "/offering" },
    { name: "오시는 길", href: "/location" },
  ],
  예배: [
    { name: "주일 설교", href: "/sermons" },
  ],
  양육: [
    { name: "성경공부", href: "/nurture/bible-study" },
    { name: "새가족 안내", href: "/nurture/newcomers" },
  ],
  공동체: [
    { name: "주일학교", href: "/community/sunday-school" },
    { name: "Youth & EM", href: "/community/youth-em" },
    { name: "청년부", href: "/community/young-adults" },
    { name: "목장", href: "/community/mokjang" },
  ],
  "선교와 전도": [
    { name: "선교사역", href: "/missions" },
    { name: "선교 소식", href: "/missions/news" },
  ],
  커뮤니티: [
    { name: "교회 소식", href: "/news" },
    { name: "교회 앨범", href: "/community-board/album" },
  ],
}

export function SubPageLayout({
  category,
  title,
  children,
}: {
  category: string
  title: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const links = sidebarConfigs[category] || []
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative h-32 sm:h-48 md:h-56 overflow-hidden">
          <img
            src="/images/hero-banner.png"
            alt="유타한인장로교회"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
        </section>

        <section className="py-6 sm:py-10 md:py-14">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Sidebar -- collapsible on mobile */}
              <aside className="lg:w-56 flex-shrink-0">
                {/* Mobile: collapsible toggle */}
                <button
                  type="button"
                  className="lg:hidden w-full flex items-center justify-between bg-primary text-primary-foreground px-4 py-3 rounded-lg"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <span className="font-bold text-base">{category}</span>
                  <ChevronDown className={`h-5 w-5 transition-transform ${sidebarOpen ? "rotate-180" : ""}`} />
                </button>
                {/* Desktop: always visible header */}
                <div className="hidden lg:block bg-primary text-primary-foreground px-5 py-3.5 rounded-t-lg">
                  <h2 className="font-bold text-lg text-center">{category}</h2>
                </div>
                {/* Nav links */}
                <nav className={`border border-t-0 border-border rounded-b-lg overflow-hidden ${sidebarOpen ? "block" : "hidden lg:block"}`}>
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-3 text-sm border-b border-border last:border-b-0 transition-colors ${
                        pathname === link.href
                          ? "text-primary font-semibold border-l-3 border-l-primary bg-primary/5"
                          : "text-foreground hover:bg-muted hover:text-primary"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </aside>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground mb-2 flex-wrap">
                  <Link href="/" className="hover:text-primary transition-colors">
                    홈
                  </Link>
                  <span>{'>'}</span>
                  <span>{category}</span>
                  <span>{'>'}</span>
                  <span className="text-foreground">{title}</span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6 pb-3 border-b border-border">
                  {title}
                </h1>
                {children}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
