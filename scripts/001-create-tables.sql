-- Calendar events
CREATE TABLE IF NOT EXISTS calendar_events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'church',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sermons
CREATE TABLE IF NOT EXISTS sermons (
  id SERIAL PRIMARY KEY,
  series VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  scripture VARCHAR(255),
  pastor VARCHAR(100),
  youtube_url VARCHAR(500),
  is_new BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Mission news
CREATE TABLE IF NOT EXISTS mission_news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Church news (weekly announcements)
CREATE TABLE IF NOT EXISTS church_news (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  title VARCHAR(255) NOT NULL,
  welcome TEXT,
  announcements JSONB NOT NULL DEFAULT '[]',
  bible_book VARCHAR(20),
  bible_readings JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Albums
CREATE TABLE IF NOT EXISTS albums (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  photos JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW()
);
