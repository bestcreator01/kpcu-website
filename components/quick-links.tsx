import { Clock, MapPin, Video, Newspaper, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { FadeIn } from "@/components/fade-in"
import Link from "next/link"

const links = [
  {
    icon: Clock,
    title: "예배 시간",
    description: "주일 예배 및 모임 안내",
    href: "/worship-times",
  },
  {
    icon: MapPin,
    title: "오시는 길",
    description: "교회 위치 및 교통 안내",
    href: "/#map",
  },
  {
    icon: Video,
    title: "주일 예배",
    description: "온라인 예배 시청",
    href: "/sermons",
  },
  {
    icon: Newspaper,
    title: "교회 소식",
    description: "공지사항 및 새 소식",
    href: "/news",
  },
  {
    icon: Heart,
    title: "온라인 헌금",
    description: "헌금 안내",
    href: "/offering",
  },
]

export function QuickLinks() {
  return (
    <section className="pt-10 pb-8 md:pt-20 md:pb-14 bg-background">
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-6 items-stretch">
          {links.map((link, index) => {
            const Icon = link.icon
            return (
              <FadeIn key={link.title} delay={index * 80} direction="up" className="h-full">
                <Link href={link.href} className="group block h-full">
                  <Card className="h-full transition-all hover:shadow-md hover:-translate-y-0.5 border-border/60">
                    <CardContent className="p-3 sm:p-5 md:p-8 h-full flex flex-col items-center justify-center text-center gap-2 md:gap-3">
                      <div className="h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                        <Icon className="h-5 w-5 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="font-semibold text-xs sm:text-base md:text-lg text-foreground">{link.title}</h3>
                        <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed hidden md:block mt-1 min-h-[2.5rem]">{link.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
