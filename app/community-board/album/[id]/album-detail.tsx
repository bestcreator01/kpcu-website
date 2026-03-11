"use client"

import { SubPageLayout } from "@/components/sub-page-layout"
import Image from "next/image"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight, Calendar, ImageIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface AlbumDetailProps {
  id: string
  album: {
    title: string
    date: string
    photos: { src: string; alt: string }[]
  } | null
}

export function AlbumDetail({ id, album }: AlbumDetailProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  if (!album) {
    return (
      <SubPageLayout category="커뮤니티" title="앨범을 찾을 수 없습니다">
        <p className="text-muted-foreground">{"요청하신 앨범이 존재하지 않습니다."}</p>
      </SubPageLayout>
    )
  }

  const closeLightbox = () => setLightboxIndex(null)
  const prevPhoto = () => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : album.photos.length - 1))
  const nextPhoto = () => setLightboxIndex((prev) => (prev !== null && prev < album.photos.length - 1 ? prev + 1 : 0))

  return (
    <SubPageLayout category="커뮤니티" title={album.title}>
      <Link
        href="/community-board/album"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        {"교회 앨범으로 돌아가기"}
      </Link>
      <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{album.date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ImageIcon className="h-4 w-4" />
          <span>{album.photos.length}{"장"}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
        {album.photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => setLightboxIndex(index)}
            className="relative aspect-[4/3] overflow-hidden rounded-xl group cursor-pointer"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox() }}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevPhoto() }}
            className="absolute left-4 text-white/80 hover:text-white z-10"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextPhoto() }}
            className="absolute right-4 text-white/80 hover:text-white z-10"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
          <div className="relative w-[90vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={album.photos[lightboxIndex].src}
              alt={album.photos[lightboxIndex].alt}
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-6 text-white/70 text-sm">
            {lightboxIndex + 1} / {album.photos.length}
          </div>
        </div>
      )}
    </SubPageLayout>
  )
}
