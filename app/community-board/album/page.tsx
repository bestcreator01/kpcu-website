"use client"

import { useState, useCallback } from "react"
import useSWR, { mutate as globalMutate } from "swr"
import { SubPageLayout } from "@/components/sub-page-layout"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ImageIcon, Plus, Trash2, X, Upload } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAdmin } from "@/hooks/use-admin"
import { formatDateKorean, isNewDate, getTodayDenver } from "@/lib/date"
import { Badge } from "@/components/ui/badge"

type PhotoItem = string | { src: string; alt: string }

type Album = {
  id: number
  title: string
  date: string
  thumbnail_url?: string
  photos: PhotoItem[]
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function AlbumFormModal({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(getTodayDenver())
  const [photos, setPhotos] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const uploadFiles = async (files: FileList | File[]) => {
    if (photos.length + files.length > 10) {
      alert("사진은 최대 10장까지 업로드할 수 있습니다.")
      return
    }
    setUploading(true)
    const urls: string[] = []
    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: formData })
      if (res.ok) {
        const data = await res.json()
        urls.push(data.url)
      }
    }
    setPhotos((prev) => [...prev, ...urls])
    setUploading(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files) uploadFiles(e.dataTransfer.files)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (photos.length === 0) { alert("사진을 최소 1장 이상 업로드해주세요."); return }
    setSaving(true)
    await fetch("/api/albums", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, date, photos }) })
    onSaved()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">{"새 앨범 만들기"}</h3>
          <button onClick={onClose}><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">{"앨범 제목"}</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">{"날짜"}</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">{"사진 (최대 10장, 첫 번째가 썸네일)"}</label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive ? "border-primary bg-primary/5" : "border-border"}`}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
            >
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">{"여기로 사진을 끌어놓거나"}</p>
              <label className="cursor-pointer">
                <Button type="button" size="sm" variant="outline" asChild>
                  <span>{"파일 선택"}</span>
                </Button>
                <input type="file" className="hidden" multiple accept="image/*" onChange={(e) => e.target.files && uploadFiles(e.target.files)} />
              </label>
              {uploading && <p className="text-sm text-primary mt-2">{"업로드 중..."}</p>}
            </div>
          </div>

          {photos.length > 0 && (
            <div className="grid grid-cols-5 gap-2">
              {photos.map((url, i) => (
                <div key={url} className="relative group aspect-square rounded-lg overflow-hidden border border-border">
                  <Image src={url} alt={`Photo ${i + 1}`} fill className="object-cover" />
                  {i === 0 && (
                    <span className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded">{"썸네일"}</span>
                  )}
                  <button
                    type="button"
                    onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 bg-background/80 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3.5 w-3.5 text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="outline" onClick={onClose}>{"취소"}</Button>
            <Button type="submit" disabled={saving || photos.length === 0}>{saving ? "저장 중..." : "앨범 만들기"}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AlbumPage() {
  const [modal, setModal] = useState(false)
  const { isAdmin } = useAdmin()

  const swrKey = "/api/albums?page=1&limit=50"
  const { data } = useSWR<{ albums: Album[] }>(swrKey, fetcher)
  const albums = data?.albums || []

  const refresh = () => globalMutate(swrKey)

  const handleDelete = async (id: number) => {
    if (!confirm("이 앨범을 삭제하시겠습니까?")) return
    await fetch(`/api/albums/${id}`, { method: "DELETE" })
    refresh()
  }

  const formatDate = formatDateKorean

  const getPhotoUrls = (album: Album): string[] => {
    const raw: PhotoItem[] = typeof album.photos === "string" ? JSON.parse(album.photos) : album.photos || []
    return raw.map((p) => typeof p === "string" ? p : p.src)
  }

  return (
    <SubPageLayout category="커뮤니티" title="교회 앨범">
      {isAdmin && (
        <div className="flex justify-end mb-4">
          <Button size="sm" onClick={() => setModal(true)}>
            <Plus className="h-4 w-4 mr-1" />{"새 앨범"}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => {
          const photos = getPhotoUrls(album)
          const thumbnail = album.thumbnail_url || photos[0] || ""
          return (
            <div key={album.id} className="relative group">
              <Link href={`/community-board/album/${album.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group/card">
                  <CardContent className="p-4 pb-0">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                      {thumbnail ? (
                        <Image src={thumbnail} alt={album.title} fill className="object-cover group-hover/card:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="flex items-center justify-center h-full"><ImageIcon className="h-10 w-10 text-muted-foreground/40" /></div>
                      )}
                    </div>
                  </CardContent>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground group-hover/card:text-primary transition-colors">{album.title}</h3>
                      {isNewDate(album.date) && <Badge className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0 flex-shrink-0">N</Badge>}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(album.date)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ImageIcon className="h-3.5 w-3.5" />
                        <span>{photos.length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              {isAdmin && (
                <button
                  onClick={() => handleDelete(album.id)}
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-border"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              )}
            </div>
          )
        })}
      </div>

      {albums.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-40" />
          <p>{"아직 등록된 앨범이 없습니다."}</p>
        </div>
      )}

      {modal && <AlbumFormModal onClose={() => setModal(false)} onSaved={refresh} />}
    </SubPageLayout>
  )
}
