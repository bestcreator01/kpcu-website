import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { isAuthenticated } from "@/lib/auth"

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await sql`SELECT * FROM albums WHERE id = ${Number(id)}`
  if (result.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(result[0])
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  const body = await request.json()
  const { title, date, photos } = body
  const result = await sql`
    UPDATE albums SET title = ${title}, date = ${date}, photos = ${JSON.stringify(photos)} WHERE id = ${Number(id)} RETURNING *
  `
  return NextResponse.json(result[0])
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { id } = await params
  await sql`DELETE FROM albums WHERE id = ${Number(id)}`
  return NextResponse.json({ success: true })
}
