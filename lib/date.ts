const TIMEZONE = "America/Denver"

/** Get current date string in Denver timezone as "YYYY-MM-DD" */
export function getTodayDenver(): string {
  const formatter = new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit" })
  return formatter.format(new Date())
}

/** Parse a date string like "2026-03-01" or a Date object without timezone shift */
export function parseLocalDate(dateStr: string | Date): { year: number; month: number; day: number } {
  if (dateStr instanceof Date) {
    return { year: dateStr.getUTCFullYear(), month: dateStr.getUTCMonth() + 1, day: dateStr.getUTCDate() }
  }
  const str = String(dateStr)
  const cleaned = str.split("T")[0]
  const [year, month, day] = cleaned.split("-").map(Number)
  return { year, month, day }
}

/** Format "2026-03-01" -> "2026.03.01" */
export function formatDateDot(dateStr: string | Date): string {
  const { year, month, day } = parseLocalDate(dateStr)
  return `${year}.${String(month).padStart(2, "0")}.${String(day).padStart(2, "0")}`
}

/** Format "2026-03-01" -> "2026년 3월 1일" */
export function formatDateKorean(dateStr: string | Date): string {
  const { year, month, day } = parseLocalDate(dateStr)
  return `${year}년 ${month}월 ${day}일`
}

/** Format "2026-03-01" -> "3월 1일" */
export function formatDateShortKorean(dateStr: string | Date): string {
  const { month, day } = parseLocalDate(dateStr)
  return `${month}월 ${day}일`
}

/** Check if date is within the last 7 days based on Denver time */
export function isNewDate(dateStr: string | Date): boolean {
  const { year, month, day } = parseLocalDate(dateStr)
  const itemDate = new Date(year, month - 1, day)
  const todayStr = getTodayDenver()
  const [ty, tm, td] = todayStr.split("-").map(Number)
  const today = new Date(ty, tm - 1, td)
  return (today.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24) < 7
}
