import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { isAuthenticated } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const year = searchParams.get("year")
  const month = searchParams.get("month")

  if (!year || !month) {
    return NextResponse.json({ error: "year and month required" }, { status: 400 })
  }

  const startDate = `${year}-${String(Number(month)).padStart(2, "0")}-01`
  const endDate = Number(month) === 12
    ? `${Number(year) + 1}-01-01`
    : `${year}-${String(Number(month) + 1).padStart(2, "0")}-01`

  const events = await sql`
    SELECT * FROM calendar_events
    WHERE date >= ${startDate}::date AND date < ${endDate}::date
    ORDER BY date ASC
  `
  return NextResponse.json(events)
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { title, date, category, description } = body

  const result = await sql`
    INSERT INTO calendar_events (title, date, category, description)
    VALUES (${title}, ${date}::date, ${category || "church"}, ${description || null})
    RETURNING *
  `
  return NextResponse.json(result[0], { status: 201 })
}
