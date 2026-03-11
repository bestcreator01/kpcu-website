import { SubPageLayout } from "@/components/sub-page-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, BookOpen, User } from "lucide-react"
import Link from "next/link"
import { sql } from "@/lib/db"
import { notFound } from "next/navigation"
import { formatDateKorean } from "@/lib/date"

function extractYoutubeEmbed(url: string): string | null {
  try {
    const u = new URL(url)
    let videoId = ""
    let startTime = ""

    if (u.hostname.includes("youtube.com")) {
      videoId = u.searchParams.get("v") || ""
      const t = u.searchParams.get("t")
      if (t) startTime = t.replace("s", "")
    } else if (u.hostname.includes("youtu.be")) {
      videoId = u.pathname.slice(1)
      const t = u.searchParams.get("t")
      if (t) startTime = t.replace("s", "")
    }

    if (!videoId) return null
    return startTime
      ? `https://www.youtube.com/embed/${videoId}?start=${startTime}`
      : `https://www.youtube.com/embed/${videoId}`
  } catch {
    return null
  }
}

const formatDate = formatDateKorean

export default async function SermonDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await sql`SELECT * FROM sermons WHERE id = ${Number(id)}`

  if (result.length === 0) {
    notFound()
  }

  const sermon = result[0]
  const embedUrl = sermon.youtube_url ? extractYoutubeEmbed(sermon.youtube_url) : null

  return (
    <SubPageLayout category="예배" title="주일 설교">
      <div className="space-y-6">
        <Link
          href="/sermons"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {"설교 목록"}
        </Link>

        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {sermon.title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary" />
              {formatDate(sermon.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-primary" />
              {sermon.scripture}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-primary" />
              {sermon.pastor}
            </span>
          </div>
        </div>

        {embedUrl && (
          <div className="aspect-video rounded-lg overflow-hidden border border-border shadow-sm">
            <iframe
              src={embedUrl}
              title={sermon.title}
              width="100%"
              height="100%"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}

        <div className="bg-muted/50 rounded-lg p-5 space-y-2">
          <h3 className="font-semibold text-foreground">{"설교 정보"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="flex gap-2">
              <span className="text-muted-foreground">{"시리즈:"}</span>
              <span className="text-foreground">{sermon.series}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">{"본문:"}</span>
              <span className="text-foreground">{sermon.scripture}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">{"설교자:"}</span>
              <span className="text-foreground">{sermon.pastor}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">{"날짜:"}</span>
              <span className="text-foreground">{formatDate(sermon.date)}</span>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
