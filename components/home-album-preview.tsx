import { Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FadeIn } from "@/components/fade-in"
import { sql } from "@/lib/db"
import { parseLocalDate } from "@/lib/date"

export async function HomeAlbumPreview() {
  const albums = await sql`SELECT * FROM albums ORDER BY date DESC LIMIT 1`
  const featured = albums[0]

  if (!featured) return null

  const rawPhotos = typeof featured.photos === "string" ? JSON.parse(featured.photos) : featured.photos || []
  const photos: { src: string; alt: string }[] = rawPhotos.map((p: string | { src: string; alt: string }) => typeof p === "string" ? { src: p, alt: "" } : p)
  const thumbnail = photos[0]?.src || featured.thumbnail_url || ""
  const formatDate = (date: string) => {
    const { year, month, day } = parseLocalDate(date)
    return `${String(year).slice(2)}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`
  }

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container">
        <div>
          <FadeIn>
            <p className="text-xs md:text-sm font-semibold tracking-widest uppercase text-primary mb-1">Photo Gallery</p>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-8">{"교회앨범"}</h2>
          </FadeIn>

          <FadeIn delay={100}>
            <Link href={`/community-board/album/${featured.id}`} className="group block relative">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-xl" />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-5">
                  <h3 className="font-semibold text-white text-sm sm:text-lg md:text-2xl">{featured.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs sm:text-sm md:text-base text-white/70 mt-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(featured.date)}</span>
                  </div>
                </div>
              </div>
            </Link>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-4 text-right">
              <Link
                href="/community-board/album"
                className="text-sm md:text-base text-primary hover:underline"
              >
                {"전체 보기 \u2192"}
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
