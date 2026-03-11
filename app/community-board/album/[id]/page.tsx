import { AlbumDetail } from "./album-detail"
import { sql } from "@/lib/db"
import { formatDateKorean } from "@/lib/date"

export default async function AlbumDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await sql`SELECT * FROM albums WHERE id = ${Number(id)}`

  if (result.length === 0) {
    return <AlbumDetail id={id} album={null} />
  }

  const row = result[0]
  const rawPhotos = typeof row.photos === "string" ? JSON.parse(row.photos) : row.photos || []
  const photos: { src: string; alt: string }[] = rawPhotos.map((p: string | { src: string; alt: string }, i: number) =>
    typeof p === "string" ? { src: p, alt: `${row.title} ${i + 1}` } : p
  )
  return (
    <AlbumDetail
      id={id}
      album={{
        title: row.title,
        date: formatDateKorean(row.date),
        photos,
      }}
    />
  )
}
