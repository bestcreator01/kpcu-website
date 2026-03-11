import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { isAuthenticated } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const { title, date, category, description } = body

  const result = await sql`
    UPDATE calendar_events
    SET title = ${title}, date = ${date}::date, category = ${category || "church"}, description = ${description || null}
    WHERE id = ${Number(id)}
    RETURNING *
  `
  return NextResponse.json(result[0])
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  await sql`DELETE FROM calendar_events WHERE id = ${Number(id)}`
  return NextResponse.json({ success: true })
}
