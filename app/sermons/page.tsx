"use client"

import { useState } from "react"
import useSWR, { mutate as globalMutate } from "swr"
import { SubPageLayout } from "@/components/sub-page-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TablePagination } from "@/components/table-pagination"
import { useAdmin } from "@/hooks/use-admin"
import { Plus, Pencil, Trash2, X } from "lucide-react"
import Link from "next/link"
import { formatDateDot, isNewDate, getTodayDenver } from "@/lib/date"

type Sermon = {
  id: number
  series: string
  date: string
  title: string
  scripture: string
  pastor: string
  youtube_url: string | null
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function SermonFormModal({ sermon, onClose, onSaved }: { sermon?: Sermon | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    series: sermon?.series || "",
    date: sermon?.date ? String(sermon.date).split("T")[0] : getTodayDenver(),
    title: sermon?.title || "",
    scripture: sermon?.scripture || "",
    pastor: sermon?.pastor || "손유진 목사",
    youtube_url: sermon?.youtube_url || "",
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    if (sermon) {
      await fetch(`/api/sermons/${sermon.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    } else {
      await fetch("/api/sermons", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    }
    onSaved()
    onClose()
  }

  const set = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background rounded-xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">{sermon ? "설교 수정" : "새 설교 등록"}</h3>
          <button onClick={onClose}><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">{"시리즈"}</label>
            <input type="text" value={form.series} onChange={(e) => set("series", e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">{"날짜"}</label>
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">{"설교자"}</label>
              <input type="text" value={form.pastor} onChange={(e) => set("pastor", e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">{"설교 제목"}</label>
            <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">{"성경 본문"}</label>
            <input type="text" value={form.scripture} onChange={(e) => set("scripture", e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">{"YouTube URL"}</label>
            <input type="url" value={form.youtube_url} onChange={(e) => set("youtube_url", e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="outline" onClick={onClose}>{"취소"}</Button>
            <Button type="submit" disabled={saving}>{saving ? "저장 중..." : sermon ? "수정" : "등록"}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function SermonsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [modal, setModal] = useState<{ sermon?: Sermon | null } | null>(null)
  const { isAdmin } = useAdmin()

  const swrKey = `/api/sermons?page=${currentPage}&limit=10`
  const { data } = useSWR<{ sermons: Sermon[]; total: number; totalPages: number }>(swrKey, fetcher)
  const sermons = data?.sermons || []
  const totalPages = data?.totalPages || 1
  const total = data?.total || 0

  const refresh = () => { globalMutate(swrKey) }

  const handleDelete = async (id: number) => {
    if (!confirm("이 설교를 삭제하시겠습니까?")) return
    await fetch(`/api/sermons/${id}`, { method: "DELETE" })
    refresh()
  }

  const isNew = isNewDate
  const formatDate = formatDateDot

  return (
    <SubPageLayout category="예배" title="주일 설교">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{"총 "}{total}{"개의 설교"}</p>
          {isAdmin && (
            <Button size="sm" onClick={() => setModal({})}>
              <Plus className="h-4 w-4 mr-1" />{"새 설교 등록"}
            </Button>
          )}
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="hidden md:grid bg-muted px-5 py-2.5 grid-cols-12 gap-4 text-xs font-semibold text-muted-foreground border-b border-border">
            <span className="col-span-2">{"날짜"}</span>
            <span className="col-span-5">{"설교 제목"}</span>
            <span className="col-span-3">{"성경 본문"}</span>
            <span className="col-span-2 text-right">{isAdmin ? "관리" : "설교자"}</span>
          </div>

          {sermons.map((sermon) => (
            <div key={sermon.id} className="border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors">
              <div className="md:hidden px-4 py-4 space-y-1.5">
                <Link href={`/sermons/${sermon.id}`} className="block">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground leading-snug">{sermon.title}</span>
                    {isNew(sermon.date) && <Badge className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0 flex-shrink-0">N</Badge>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1.5">
                    <span className="text-primary font-medium">{formatDate(sermon.date)}</span>
                    <span>{sermon.scripture}</span>
                    <span>{sermon.pastor}</span>
                  </div>
                </Link>
                {isAdmin && (
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => setModal({ sermon })} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"><Pencil className="h-3 w-3" />{"수정"}</button>
                    <button onClick={() => handleDelete(sermon.id)} className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"><Trash2 className="h-3 w-3" />{"삭제"}</button>
                  </div>
                )}
              </div>

              <div className="hidden md:grid px-5 py-3.5 grid-cols-12 gap-4 items-center">
                <Link href={`/sermons/${sermon.id}`} className="col-span-2 text-sm text-primary font-medium">{formatDate(sermon.date)}</Link>
                <Link href={`/sermons/${sermon.id}`} className="col-span-5 flex items-center gap-2">
                  <span className="text-sm text-foreground hover:text-primary transition-colors">{sermon.title}</span>
                  {isNew(sermon.date) && <Badge className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0">N</Badge>}
                </Link>
                <Link href={`/sermons/${sermon.id}`} className="col-span-3 text-xs text-muted-foreground">{sermon.scripture}</Link>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  {isAdmin ? (
                    <>
                      <button onClick={() => setModal({ sermon })} className="hover:text-primary"><Pencil className="h-3.5 w-3.5 text-muted-foreground" /></button>
                      <button onClick={() => handleDelete(sermon.id)} className="hover:text-destructive"><Trash2 className="h-3.5 w-3.5 text-muted-foreground" /></button>
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground">{sermon.pastor}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {modal && <SermonFormModal sermon={modal.sermon} onClose={() => setModal(null)} onSaved={refresh} />}
    </SubPageLayout>
  )
}
