import { SubPageLayout } from "@/components/sub-page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BookOpen, FileText, Newspaper } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { sql } from "@/lib/db"
import { notFound } from "next/navigation"
import { formatDateKorean } from "@/lib/date"

export const dynamic = "force-dynamic"

type Announcement = {
  text: string
  details: string[]
}

type BulletinImage = {
  url: string
  type: "image" | "pdf"
  name: string
}

function normalizeAnnouncements(raw: Announcement[] | string[] | string): Announcement[] {
  const parsed = typeof raw === "string" ? JSON.parse(raw) : raw || []
  return parsed.map((a: string | Announcement) =>
    typeof a === "string" ? { text: a, details: [] } : { text: a.text || "", details: a.details || [] }
  )
}

function normalizeBulletins(raw: BulletinImage[] | string | undefined | null): BulletinImage[] {
  if (!raw) return []
  const parsed = typeof raw === "string" ? JSON.parse(raw) : raw
  return Array.isArray(parsed) ? parsed : []
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await sql`SELECT * FROM church_news WHERE id = ${Number(id)}`

  if (result.length === 0) {
    notFound()
  }

  const news = result[0]
  const announcements = normalizeAnnouncements(news.announcements)
  const bulletins = normalizeBulletins(news.bulletin_images)

  return (
    <SubPageLayout category="커뮤니티" title="교회 소식">
      <div className="space-y-6">
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {"소식 목록"}
        </Link>

        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">{news.title}</h2>
          <p className="text-sm text-muted-foreground">{formatDateKorean(news.date)}</p>
        </div>

        {/* Announcements */}
        {announcements.length > 0 && (
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-muted px-5 py-2.5 text-xs font-semibold text-muted-foreground border-b border-border">
              {"교회 소식"}
            </div>
            {announcements.map((item, index) => (
              <div key={index} className="px-5 py-4 border-b border-border last:border-b-0">
                <div className="flex items-start gap-3">
                  <span className="text-base font-bold text-primary flex-shrink-0 mt-0.5">{index + 1}.</span>
                  <div className="space-y-2 flex-1">
                    <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap">{item.text}</p>
                    {item.details.length > 0 && (
                      <ul className="space-y-1.5 ml-1">
                        {item.details.map((detail, dIdx) => (
                          <li key={dIdx} className="text-sm text-muted-foreground leading-relaxed flex items-start gap-1.5">
                            <span className="flex-shrink-0 mt-0.5">{"- "}</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bible Reading */}
        {news.bible_reading && (
          <Card className="border-primary/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-primary" />
                {"2026 성경 1독 프로젝트"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{news.bible_reading}</p>
            </CardContent>
          </Card>
        )}

        {/* Bulletin (주보) */}
        {bulletins.length > 0 && (
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Newspaper className="h-5 w-5 text-primary" />
              {"주보"}
            </h3>
            <div className="space-y-4">
              {bulletins.map((b, i) => (
                b.type === "image" ? (
                  <div key={i} className="relative w-full overflow-hidden rounded-lg border border-border bg-muted">
                    <Image
                      src={b.url}
                      alt={`주보 ${i + 1}`}
                      width={1200}
                      height={1600}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ) : (
                  <div key={i} className="rounded-lg border border-border overflow-hidden">
                    <iframe
                      src={b.url}
                      className="w-full h-[600px] bg-muted"
                      title={`주보 PDF ${i + 1}`}
                    />
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-primary hover:bg-muted transition-colors border-t border-border"
                    >
                      <FileText className="h-4 w-4" />
                      {"주보 PDF 새 탭에서 열기"}
                    </a>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </SubPageLayout>
  )
}
