import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import Link from "next/link"
import { sql } from "@/lib/db"
import { formatDateKorean } from "@/lib/date"

export async function HomeNewsPreview() {
  const newsItems = await sql`SELECT id, title, date FROM church_news ORDER BY date DESC LIMIT 3`

  const formatDate = formatDateKorean

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div>
          <FadeIn>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-4xl font-bold text-foreground">{"교회 소식"}</h2>
              <Link href="/news">
                <Button variant="outline" className="group bg-transparent text-sm md:text-base">
                  {"전체 보기"}
                  <ArrowRight className="ml-1 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </FadeIn>

          <div className="space-y-4">
            {newsItems.map((news, index) => (
              <FadeIn key={news.id} delay={index * 100}>
                <Link href={`/news/${news.id}`} className="block">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 md:px-8 md:py-6 gap-1 sm:gap-4">
                      <h3 className="font-medium text-sm md:text-lg text-foreground">{news.title}</h3>
                      <div className="flex items-center gap-1.5 text-xs md:text-base text-muted-foreground flex-shrink-0">
                        <Calendar className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        <span>{formatDate(news.date)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
            {newsItems.length === 0 && (
              <div className="text-center py-8 text-muted-foreground text-sm">
                {"등록된 소식이 없습니다."}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
