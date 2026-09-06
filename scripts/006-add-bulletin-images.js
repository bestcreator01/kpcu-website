const { neon } = require("@neondatabase/serverless")

async function main() {
  const sql = neon(process.env.DATABASE_URL)

  await sql`ALTER TABLE church_news ADD COLUMN IF NOT EXISTS bulletin_images JSONB DEFAULT '[]'::jsonb`

  console.log("[v0] Added bulletin_images column to church_news")

  const rows = await sql`SELECT id, title FROM church_news ORDER BY date DESC`
  console.log("[v0] Current church_news rows:", rows.length)
}

main().catch((e) => {
  console.error("[v0] Migration failed:", e)
  process.exit(1)
})
