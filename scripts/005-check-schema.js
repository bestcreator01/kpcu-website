import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

async function main() {
  try {
    // Check if tables exist
    const tables = await sql`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' ORDER BY table_name
    `
    console.log("Tables:", tables.map(t => t.table_name))

    // Check calendar_events schema
    const cols = await sql`
      SELECT column_name, data_type FROM information_schema.columns 
      WHERE table_name = 'calendar_events' ORDER BY ordinal_position
    `
    console.log("calendar_events columns:", cols)

    // Try the exact query that the API uses
    const events = await sql`
      SELECT * FROM calendar_events WHERE year = 2026 AND month = 3 ORDER BY day ASC, start_time ASC
    `
    console.log("Events count:", events.length)
    if (events.length > 0) {
      console.log("First event:", events[0])
    }
  } catch (err) {
    console.error("ERROR:", err.message)
  }
}

main()
