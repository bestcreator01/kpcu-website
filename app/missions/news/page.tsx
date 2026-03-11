"use client"

import { useState } from "react"
import useSWR, { mutate as globalMutate } from "swr"
import { SubPageLayout } from "@/components/sub-page-layout"
import { Button } from "@/components/ui/button"
import { TablePagination } from "@/components/table-pagination"
import { useAdmin } from "@/hooks/use-admin"
import { Plus, Pencil, Trash2, X, Calendar, ArrowLeft } from "lucide-react"
import { formatDateDot, formatDateKorean, isNewDate, getTodayDenver } from "@/lib/date"
import { Badge } from "@/components/ui/badge"

type MissionNews = {
  id: number
  title: string
  date: string
  content: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function MissionNewsFormModal({ item, onClose, onSaved }: { item?: MissionNews | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    title: item?.title || "",
    date: item?.date ? String(item.date).split("T")[0] : getTodayDenver(),
    content: item?.content || "",
  })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    if (item) {
      await fetch(`/api/mission-news/${item.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    } else {
      await fetch("/api/mission-news", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    }
    onSaved()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background rounded-xl shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">{item ? "선교 소식 수정" : "새 선교 소식"}</h3>
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
            <label className="block text-sm font-medium text-foreground mb-1">{"내용"}</label>
            <textarea
              value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[200px]"
              placeholder={"선교 소식 내용을 입력하세요..."}
              required
            />
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

function MissionNewsDetail({ item, onBack }: { item: MissionNews; onBack: () => void }) {
  return (
    <div className="space-y-4">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" />{"목록으로 돌아가기"}
      </button>
      <h2 className="text-xl md:text-2xl font-bold text-foreground">{item.title}</h2>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4 text-primary" />
        <span>{formatDateKorean(item.date)}</span>
      </div>
      <div className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-wrap">{item.content}</div>
    </div>
  )
}

export default function MissionNewsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [modal, setModal] = useState<{ item?: MissionNews | null } | null>(null)
  const [viewItem, setViewItem] = useState<MissionNews | null>(null)
  const { isAdmin } = useAdmin()

  const swrKey = `/api/mission-news?page=${currentPage}&limit=10`
  const { data } = useSWR<{ items: MissionNews[]; total: number; totalPages: number }>(swrKey, fetcher)
  const items = data?.items || []
  const totalPages = data?.totalPages || 1

  const refresh = () => globalMutate(swrKey)

  const handleDelete = async (id: number) => {
    if (!confirm("삭제하시겠습니까?")) return
    await fetch(`/api/mission-news/${id}`, { method: "DELETE" })
    refresh()
  }

  const formatDate = formatDateDot

  return (
    <SubPageLayout category="선교와 전도" title="선교 소식">
      {viewItem ? (
        <MissionNewsDetail item={viewItem} onBack={() => setViewItem(null)} />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{"총 "}{data?.total || 0}{"개의 소식"}</p>
            {isAdmin && (
              <Button size="sm" onClick={() => setModal({})}>
                <Plus className="h-4 w-4 mr-1" />{"새 소식 등록"}
              </Button>
            )}
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            {items.map((item) => (
              <div key={item.id} className="border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 md:px-6 md:py-5 gap-1 sm:gap-4">
                  <button onClick={() => setViewItem(item)} className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm md:text-lg text-foreground hover:text-primary transition-colors">{item.title}</span>
                      {isNewDate(item.date) && <Badge className="bg-accent text-accent-foreground text-[10px] px-1.5 py-0 flex-shrink-0">N</Badge>}
                    </div>
                  </button>
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
              <div className="px-6 py-12 text-center text-muted-foreground text-sm">{"등록된 선교 소식이 없습니다."}</div>
            )}
          </div>

          <TablePagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}

      {modal && <MissionNewsFormModal item={modal.item} onClose={() => setModal(null)} onSaved={refresh} />}
    </SubPageLayout>
  )
}
