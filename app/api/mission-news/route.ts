import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { isAuthenticated } from "@/lib/auth"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get("page") || "1")
  const limit = Number(searchParams.get("limit") || "10")
  const offset = (page - 1) * limit

  const items = await sql`
    SELECT * FROM mission_news ORDER BY date DESC LIMIT ${limit} OFFSET ${offset}
  `
  const countResult = await sql`SELECT COUNT(*) as total FROM mission_news`
  const total = Number(countResult[0].total)

  return NextResponse.json({ items, total, page, totalPages: Math.ceil(total / limit) })
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { title, date, content } = body

  const result = await sql`
    INSERT INTO mission_news (title, date, content)
    VALUES (${title}, ${date}, ${content})
    RETURNING *
  `
  return NextResponse.json(result[0], { status: 201 })
}
