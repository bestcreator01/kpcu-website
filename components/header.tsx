"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Youtube, Instagram, ChevronDown, LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAdmin } from "@/hooks/use-admin"

const navCategories = [
  {
    name: "교회소개",
    items: [
      { name: "교회 소개", href: "/about" },
      { name: "섬기는 사람들", href: "/about/staff" },
      { name: "예배 안내", href: "/worship-times" },
      { name: "교회 일정", href: "/about/calendar" },
      { name: "온라인 헌금", href: "/offering" },
      { name: "오시는 길", href: "/location" },
    ],
  },
  {
    name: "예배",
    items: [
      { name: "주일 설교", href: "/sermons" },
    ],
  },
  {
    name: "양육",
    items: [
      { name: "성경공부", href: "/nurture/bible-study" },
      { name: "새가족 안내", href: "/nurture/newcomers" },
    ],
  },
  {
    name: "공동체",
    items: [
      { name: "주일학교", href: "/community/sunday-school" },
      { name: "Youth & EM", href: "/community/youth-em" },
      { name: "청년부", href: "/community/young-adults" },
      { name: "목장", href: "/community/mokjang" },
    ],
  },
  {
    name: "선교와 전도",
    items: [
      { name: "선교사역", href: "/missions" },
      { name: "선교 소식", href: "/missions/news" },
    ],
  },
  {
    name: "커뮤니티",
    items: [
      { name: "교회 소식", href: "/news" },
      { name: "교회 앨범", href: "/community-board/album" },
    ],
  },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const { isAdmin, logout } = useAdmin()

  return (
    <header className="sticky top-0 z-[60] w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 md:h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
          <Image
            src="/icon.png"
            alt="유타한인장로교회 로고"
            width={44}
            height={44}
            className="h-8 w-8 md:h-11 md:w-11"
          />
          <div>
            <span className="font-bold text-base sm:text-lg md:text-2xl block leading-tight">유타한인장로교회</span>
            <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-none hidden sm:block">Korean Presbyterian Church of Utah</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navCategories.map((cat) => (
            <div
              key={cat.name}
              className="relative"
              onMouseEnter={() => setOpenDropdown(cat.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className="flex items-center gap-1 px-4 py-2.5 text-base font-medium text-foreground/80 hover:text-primary transition-colors rounded-md hover:bg-muted"
                type="button"
              >
                {cat.name}
                <ChevronDown className="h-4 w-4" />
              </button>
              {openDropdown === cat.name && (
                <div className="absolute top-full left-0 pt-1 min-w-[180px] z-50">
                  <div className="bg-card border border-border rounded-lg shadow-lg py-1">
                    {cat.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Social + Mobile Toggle */}
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex h-10 w-10">
            <Link href="https://www.youtube.com/@kpcu8086" target="_blank" rel="noopener noreferrer">
              <Youtube className="h-6 w-6" />
              <span className="sr-only">YouTube</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hidden sm:flex h-10 w-10">
            <Link href="https://www.instagram.com/kpcucollege/" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
          </Button>
          {isAdmin ? (
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={async () => { await logout(); window.location.reload() }}
            >
              <LogOut className="h-4 w-4" />
              <span className="text-xs">{"로그아웃"}</span>
            </Button>
          ) : (
            <Button variant="ghost" size="icon" asChild className="hidden sm:flex h-10 w-10">
              <Link href="/admin/login">
                <LogIn className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">{"관리자 로그인"}</span>
              </Link>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden relative z-[100]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 top-14 z-[70] bg-black/30"
            onClick={() => setMobileOpen(false)}
          />
          <div className="lg:hidden fixed left-0 right-0 top-14 bottom-0 z-[80] bg-background overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: "touch" }}>
            <nav className="px-4 py-5 pb-20 space-y-1">
              {navCategories.map((cat) => (
                <div key={cat.name} className="mb-3">
                  <div className="px-3 py-2 text-xs font-bold text-primary tracking-wider border-b border-border">
                    {cat.name}
                  </div>
                  {cat.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 text-base text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors active:bg-muted"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-border mt-3 px-3">
                <div className="flex items-center space-x-6">
                  <Link href="https://www.youtube.com/@kpcu8086" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground" onClick={() => setMobileOpen(false)}>
                    <Youtube className="h-6 w-6" />
                    <span className="text-sm">YouTube</span>
                  </Link>
                  <Link href="https://www.instagram.com/kpcucollege/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground" onClick={() => setMobileOpen(false)}>
                    <Instagram className="h-6 w-6" />
                    <span className="text-sm">Instagram</span>
                  </Link>
                </div>
                {isAdmin ? (
                  <button
                    onClick={async () => { await logout(); setMobileOpen(false); window.location.reload() }}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    {"로그아웃"}
                  </button>
                ) : (
                  <Link
                    href="/admin/login"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    <LogIn className="h-4 w-4" />
                    {"로그인"}
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
