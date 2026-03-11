import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function migrate() {
  console.log('Creating calendar_events table...');
  await sql`
    CREATE TABLE IF NOT EXISTS calendar_events (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      date DATE NOT NULL,
      category TEXT NOT NULL DEFAULT 'church',
      description TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  console.log('Creating sermons table...');
  await sql`
    CREATE TABLE IF NOT EXISTS sermons (
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL,
      title TEXT NOT NULL,
      scripture TEXT,
      pastor TEXT NOT NULL DEFAULT '손유진 목사',
      series TEXT,
      youtube_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  console.log('Creating mission_news table...');
  await sql`
    CREATE TABLE IF NOT EXISTS mission_news (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      date DATE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  console.log('Creating church_news table...');
  await sql`
    CREATE TABLE IF NOT EXISTS church_news (
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL,
      title TEXT NOT NULL,
      announcements JSONB NOT NULL DEFAULT '[]',
      bible_reading TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  console.log('Creating albums table...');
  await sql`
    CREATE TABLE IF NOT EXISTS albums (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      date DATE NOT NULL,
      photos JSONB NOT NULL DEFAULT '[]',
      thumbnail_url TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  console.log('All tables created successfully!');
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
