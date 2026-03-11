"use client"

import { useState, useCallback } from "react"
import useSWR, { mutate as globalMutate } from "swr"
import { SubPageLayout } from "@/components/sub-page-layout"
import { ChevronLeft, ChevronRight, Plus, Pencil, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAdmin } from "@/hooks/use-admin"
import { getTodayDenver, parseLocalDate } from "@/lib/date"

type CalendarEvent = {
  id: number
  title: string
  date: string
  category: string
  description: string | null
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

const DAYS = ["일", "월", "화", "수", "목", "금", "토"]
const CATEGORIES = [
  { value: "church", label: "교회 행사", color: "bg-primary" },
  { value: "department", label: "부서 행사", color: "bg-accent" },
  { value: "season", label: "절기", color: "bg-destructive" },
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month - 1, 1).getDay()
}

function EventModal({
  year, month, day, event, onClose, onSaved,
}: {
  year: number; month: number; day: number
  event?: CalendarEvent | null
  onClose: () => void; onSaved: () => void
}) {
  const [title, setTitle] = useState(event?.title || "")
  const [category, setCategory] = useState(event?.category || "church")
  const [description, setDescription] = useState(event?.description || "")
  const [saving, setSaving] = useState(false)

  const dateStr = event
    ? String(event.date).split("T")[0]
    : `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const payload = { title, date: dateStr, category, description: description || null }

    if (event) {
      await fetch(`/api/calendar/${event.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    } else {
      await fetch("/api/calendar", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
    }
    onSaved()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background rounded-xl shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">
            {event ? "일정 수정" : `${month}월 ${day}일 일정 추가`}
          </h3>
          <button onClick={onClose}><X className="h-5 w-5 text-muted-foreground" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">{"제목"}</label>
            <input
              type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="일정 제목을 입력하세요"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">{"카테고리"}</label>
            <select
              value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">{"설명 (선택)"}</label>
            <input
              type="text" value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="추가 설명"
            />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button type="button" variant="outline" onClick={onClose}>{"취소"}</Button>
            <Button type="submit" disabled={saving || !title.trim()}>
              {saving ? "저장 중..." : event ? "수정" : "추가"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function CalendarPage() {
  const todayDenver = getTodayDenver()
  const [tYInit, tMInit] = todayDenver.split("-").map(Number)
  const [year, setYear] = useState(tYInit)
  const [month, setMonth] = useState(tMInit)
  const [modal, setModal] = useState<{ day: number; event?: CalendarEvent | null } | null>(null)
  const [addMode, setAddMode] = useState(false)
  const { isAdmin } = useAdmin()

  const swrKey = `/api/calendar?year=${year}&month=${month}`
  const { data: events = [] } = useSWR<CalendarEvent[]>(swrKey, fetcher)

  const refresh = useCallback(() => { globalMutate(swrKey) }, [swrKey])

  const handleDelete = async (id: number) => {
    if (!confirm("이 일정을 삭제하시겠습니까?")) return
    await fetch(`/api/calendar/${id}`, { method: "DELETE" })
    refresh()
  }

  const prevMonth = () => {
    if (month === 1) { setYear(year - 1); setMonth(12) }
    else setMonth(month - 1)
  }
  const nextMonth = () => {
    if (month === 12) { setYear(year + 1); setMonth(1) }
    else setMonth(month + 1)
  }

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const [tY, tM, tD] = todayDenver.split("-").map(Number)
  const isToday = (d: number) => d === tD && month === tM && year === tY

  const getEventsForDay = (day: number) => {
    return events.filter((e) => {
      const { day: eDay } = parseLocalDate(e.date)
      return eDay === day
    })
  }

  const getCategoryColor = (cat: string) => {
    return CATEGORIES.find((c) => c.value === cat)?.color || "bg-muted"
  }

  return (
    <SubPageLayout category="교회소개" title="교회 일정">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-xl md:text-2xl font-bold text-foreground text-center">
              {year}{"년 "}{month}{"월"}
            </h2>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          {isAdmin && (
            <Button
              variant={addMode ? "default" : "outline"}
              size="sm"
              onClick={() => setAddMode(!addMode)}
              className="flex items-center gap-1.5"
            >
              {addMode ? (
                <><X className="h-4 w-4" /><span>{"취소"}</span></>
              ) : (
                <><Plus className="h-4 w-4" /><span>{"일정 추가"}</span></>
              )}
            </Button>
          )}
        </div>
        {addMode && (
          <p className="text-sm text-primary font-medium text-center bg-primary/5 rounded-lg py-2">
            {"아래 캘린더에서 날짜를 클릭하여 일정을 추가하세요"}
          </p>
        )}

        <div className="border border-border rounded-lg overflow-hidden">
          <div className="grid grid-cols-7 border-b border-border">
            {DAYS.map((day, i) => (
              <div key={day} className={`py-2.5 text-center text-xs font-semibold ${i === 0 ? "text-destructive" : i === 6 ? "text-primary" : "text-muted-foreground"}`}>
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {cells.map((day, idx) => {
              const dayEvents = day ? getEventsForDay(day) : []
              const dayIndex = idx % 7
              return (
                <div
                  key={idx}
                  className={`min-h-[80px] md:min-h-[100px] p-1.5 border-b border-r border-border relative group ${!day ? "bg-muted/30" : addMode ? "bg-card cursor-pointer hover:bg-primary/5 transition-colors" : "bg-card"}`}
                  onClick={() => {
                    if (day && addMode) {
                      setModal({ day })
                      setAddMode(false)
                    }
                  }}
                >
                  {day && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center justify-center h-6 w-6 text-xs font-medium rounded-full ${isToday(day) ? "bg-primary text-primary-foreground" : dayIndex === 0 ? "text-destructive" : dayIndex === 6 ? "text-primary" : "text-foreground"}`}>
                          {day}
                        </span>
                      </div>
                      <div className="mt-0.5 space-y-0.5">
                        {dayEvents.map((ev) => (
                          <div key={ev.id} className="group/ev relative">
                            <div
                              className={`text-[10px] md:text-xs px-1 py-0.5 rounded truncate text-primary-foreground ${getCategoryColor(ev.category)}`}
                              title={ev.title}
                            >
                              {ev.title}
                            </div>
                            {isAdmin && (
                              <div className="absolute -right-1 top-0 hidden group-hover/ev:flex gap-0.5">
                                <button onClick={(e) => { e.stopPropagation(); setModal({ day, event: ev }) }} className="bg-background border border-border rounded p-0.5 shadow-sm">
                                  <Pencil className="h-2.5 w-2.5 text-muted-foreground" />
                                </button>
                                <button onClick={(e) => { e.stopPropagation(); handleDelete(ev.id) }} className="bg-background border border-border rounded p-0.5 shadow-sm">
                                  <Trash2 className="h-2.5 w-2.5 text-destructive" />
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          {CATEGORIES.map((c) => (
            <div key={c.value} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded ${c.color}`} />
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <EventModal
          year={year} month={month} day={modal.day}
          event={modal.event}
          onClose={() => setModal(null)}
          onSaved={refresh}
        />
      )}
    </SubPageLayout>
  )
}
