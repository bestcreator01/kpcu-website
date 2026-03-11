import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

const ADMIN_ID = "kpcu"
const ADMIN_PW = "kpcu2026#$!"
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "kpcu-church-admin-secret-key-2026"
)

export async function verifyCredentials(id: string, pw: string): Promise<boolean> {
  return id === ADMIN_ID && pw === ADMIN_PW
}

export async function createToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_token")?.value
  if (!token) return false
  return verifyToken(token)
}

export const isAuthenticated = isAdmin
