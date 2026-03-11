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

type Announcement = {
  text: string
  details: string[]
}

type ChurchNews = {
  id: number
  title: string
  date: string
  announcements: Announcement[] | string[]
  bible_reading: string | null
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function normalizeAnnouncements(raw: Announcement[] | string[] | string): Announcement[] {
  const parsed = typeof raw === "string" ? JSON.parse(raw) : raw || []
  return parsed.map((a: string | Announcement) =>
    typeof a === "string" ? { text: a, details: [] } : { text: a.text || "", details: a.details || [] }
  )
}

function ChurchNewsFormModal({ item, onClose, onSaved }: { item?: ChurchNews | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    title: item?.title || "",
    date: item?.date ? String(item.date).split("T")[0] : getTodayDenver(),
    bible_reading: item?.bible_reading || "",
  })
  const [announcements, setAnnouncements] = useState<Announcement[]>(
    item?.announcements ? normalizeAnnouncements(item.announcements) : [{ text: "", details: [] }]
  )
  const [saving, setSaving] = useState(false)

  const addAnnouncement = () => setAnnouncements([...announcements, { text: "", details: [] }])
  const removeAnnouncement = (idx: number) => setAnnouncements(announcements.filter((_, i) => i !== idx))
  const updateAnnouncementText = (idx: number, val: string) => {
    const updated = [...announcements]
    updated[idx] = { ...updated[idx], text: val }
    setAnnouncements(updated)
  }

  const addDetail = (annIdx: number) => {
    const updated = [...announcements]
    updated[annIdx] = { ...updated[annIdx], details: [...updated[annIdx].details, ""] }
    setAnnouncements(updated)
  }
  const removeDetail = (annIdx: number, detIdx: number) => {
    const updated = [...announcements]
    updated[annIdx] = { ...updated[annIdx], details: updated[annIdx].details.filter((_, i) => i !== detIdx) }
    setAnnouncements(updated)
  }
  const updateDetail = (annIdx: number, detIdx: number, val: string) => {
    const updated = [...announcements]
    const details = [...updated[annIdx].details]
    details[detIdx] = val
    updated[annIdx] = { ...updated[annIdx], details }
    setAnnouncements(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const filtered = announcements
      .filter((a) => a.text.trim())
      .map((a) => ({ text: a.text.trim(), details: a.details.filter((d) => d.trim()) }))
    const payload = { ...form, announcements: filtered }

    if (item) {
      await fetch(`/api/church-news/${item.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    } else {
      await fetch("/api/church-news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    }
    onSaved()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">{item ? "교회 소식 수정" : "새 교회 소식"}</h3>
          <button onClick={onClose}><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">{"제목"}</label>
              <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">{"날짜"}</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">{"성경 1독 (이번 주 읽기표)"}</label>
            <textarea
              value={form.bible_reading}
              onChange={(e) => setForm({ ...form, bible_reading: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px]"
              placeholder={"월: 민 1-2장\n화: 민 3-4장\n수: 민 5-6장\n목: 민 7장\n금: 민 8-9장\n토: 민 10-11장"}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-foreground">{"공지 사항"}</label>
              <Button type="button" size="sm" variant="outline" onClick={addAnnouncement}>
                <Plus className="h-3.5 w-3.5 mr-1" />{"항목 추가"}
              </Button>
            </div>
            <div className="space-y-4">
              {announcements.map((a, idx) => (
                <div key={idx} className="border border-border rounded-lg p-3 space-y-2">
                  <div className="flex gap-2 items-start">
                    <span className="text-sm font-bold text-primary pt-2 w-6 flex-shrink-0">{idx + 1}.</span>
                    <textarea
                      value={a.text}
                      onChange={(e) => updateAnnouncementText(idx, e.target.value)}
                      className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[50px]"
                      placeholder={`공지 ${idx + 1}번 내용`}
                    />
                    {announcements.length > 1 && (
                      <button type="button" onClick={() => removeAnnouncement(idx)} className="pt-2 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {/* Sub-items */}
                  <div className="ml-8 space-y-1.5">
                    {a.details.map((d, detIdx) => (
                      <div key={detIdx} className="flex gap-2 items-center">
                        <span className="text-xs text-muted-foreground flex-shrink-0">{"- "}</span>
                        <input
                          type="text"
                          value={d}
                          onChange={(e) => updateDetail(idx, detIdx, e.target.value)}
                          className="flex-1 px-2 py-1.5 border border-border rounded bg-background text-foreground text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder={"세부 사항"}
                        />
                        <button type="button" onClick={() => removeDetail(idx, detIdx)} className="text-muted-foreground hover:text-destructive">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => addDetail(idx)}
                      className="text-xs text-primary hover:underline"
                    >
                      {"+ 세부 항목 추가"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="outline" onClick={onClose}>{"취소"}</Button>
            <Button type="submit" disabled={saving}>{saving ? "저장 중..." : item ? "수정" : "등록"}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [modal, setModal] = useState<{ item?: ChurchNews | null } | null>(null)
  const { isAdmin } = useAdmin()

  const swrKey = `/api/church-news?page=${currentPage}&limit=10`
  const { data } = useSWR<{ items: ChurchNews[]; total: number; totalPages: number }>(swrKey, fetcher)
  const items = data?.items || []
  const totalPages = data?.totalPages || 1
  const total = data?.total || 0

  const refresh = () => globalMutate(swrKey)

  const handleDelete = async (id: number) => {
    if (!confirm("삭제하시겠습니까?")) return
    await fetch(`/api/church-news/${id}`, { method: "DELETE" })
    refresh()
  }

  const formatDate = formatDateDot
  const isNew = isNewDate

  return (
    <SubPageLayout category="커뮤니티" title="교회 소식">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{"총 "}{total}{"개의 소식"}</p>
          {isAdmin && (
            <Button size="sm" onClick={() => setModal({})}>
              <Plus className="h-4 w-4 mr-1" />{"새 소식 등록"}
            </Button>
          )}
        </div>

        <div className="border border-border rounded-lg overflow-hidden">
          {items.map((item) => (
            <div key={item.id} className="border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 md:px-8 md:py-6 gap-1 sm:gap-4">
                <Link href={`/news/${item.id}`} className="text-left flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm md:text-lg text-foreground hover:text-primary transition-colors">{item.title}</span>
                    {isNew(item.date) && <Badge className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0 flex-shrink-0">N</Badge>}
                  </div>
                </Link>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs md:text-base text-muted-foreground">{formatDate(item.date)}</span>
                  {isAdmin && (
                    <div className="flex gap-1.5">
                      <button onClick={() => setModal({ item })} className="hover:text-primary"><Pencil className="h-3.5 w-3.5 text-muted-foreground" /></button>
                      <button onClick={() => handleDelete(item.id)} className="hover:text-destructive"><Trash2 className="h-3.5 w-3.5 text-muted-foreground" /></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="px-6 py-12 text-center text-muted-foreground text-sm">{"등록된 교회 소식이 없습니다."}</div>
          )}
        </div>

        <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      {modal && <ChurchNewsFormModal item={modal.item} onClose={() => setModal(null)} onSaved={refresh} />}
    </SubPageLayout>
  )
}
