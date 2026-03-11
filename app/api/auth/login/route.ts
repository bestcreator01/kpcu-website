import { NextRequest, NextResponse } from "next/server"
import { verifyCredentials, createToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { id, password } = await request.json()

    if (!await verifyCredentials(id, password)) {
      return NextResponse.json({ error: "잘못된 아이디 또는 비밀번호입니다." }, { status: 401 })
    }

    const token = await createToken()

    const response = NextResponse.json({ success: true })
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return response
  } catch {
    return NextResponse.json({ error: "로그인에 실패했습니다." }, { status: 500 })
  }
}
