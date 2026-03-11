# KPCU (Korean Presbyterian Church of Utah) Website

A modern, full-stack church website built with Next.js 16, featuring a content management system for administrators to manage sermons, events, news, and photo albums.

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19.2** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - UI component library built on Radix UI primitives
- **Lucide React** - Icon library
- **SWR** - Data fetching and caching

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Neon PostgreSQL** - Serverless PostgreSQL database (`@neondatabase/serverless`)
- **Vercel Blob** - File storage for image uploads (`@vercel/blob`)
- **Jose** - JWT authentication library

### Other Libraries
- **date-fns** - Date manipulation
- **react-hook-form** + **zod** - Form handling and validation
- **recharts** - Charts and data visualization
- **sonner** - Toast notifications
- **next-themes** - Dark/light mode support

## Project Structure

```
app/
├── api/                          # API Routes
│   ├── auth/                     # Authentication endpoints
│   │   ├── login/route.ts        # POST: Login with credentials
│   │   ├── logout/route.ts       # POST: Clear auth cookie
│   │   └── check/route.ts        # GET: Check auth status
│   ├── calendar/                 # Calendar events CRUD
│   ├── sermons/                  # Sermons CRUD
│   ├── church-news/              # Church news CRUD
│   ├── mission-news/             # Mission news CRUD
│   ├── albums/                   # Photo albums CRUD
│   └── upload/route.ts           # Image upload to Vercel Blob
├── about/                        # About section pages
│   ├── calendar/                 # Church calendar
│   └── staff/                    # Staff information
├── admin/login/                  # Admin login page
├── community-board/              # Community features
│   └── album/                    # Photo albums
├── missions/                     # Missions section
│   └── news/                     # Mission news
├── news/                         # Church announcements
├── sermons/                      # Sermon archive
└── page.tsx                      # Homepage

components/
├── ui/                           # shadcn/ui components
├── header.tsx                    # Site header with navigation
├── footer.tsx                    # Site footer
├── home-*.tsx                    # Homepage section components
└── sub-page-layout.tsx           # Reusable page layout

lib/
├── auth.ts                       # JWT authentication helpers
├── db.ts                         # Neon database client
├── date.ts                       # Date formatting utilities (Denver timezone)
└── utils.ts                      # General utilities

hooks/
└── use-admin.ts                  # Admin authentication hook

scripts/
├── 001-create-tables.js          # Database migration
├── 002-seed-data.js              # Initial data seeding
└── ...                           # Other migration scripts
```

## Database Schema

The application uses **Neon PostgreSQL** with the following tables:

### `calendar_events`
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| title | VARCHAR(255) | Event title |
| date | DATE | Event date |
| category | VARCHAR(50) | Event type: 'church', 'department', 'season' |
| created_at | TIMESTAMP | Creation timestamp |

### `sermons`
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| series | VARCHAR(255) | Sermon series name |
| title | VARCHAR(255) | Sermon title |
| date | DATE | Sermon date |
| scripture | VARCHAR(255) | Bible reference |
| pastor | VARCHAR(100) | Pastor name |
| youtube_url | VARCHAR(500) | YouTube video URL |
| created_at | TIMESTAMP | Creation timestamp |

### `church_news`
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| title | VARCHAR(255) | News title |
| date | DATE | Publication date |
| announcements | JSONB | Array of announcements with sub-items |
| bible_reading | TEXT | Weekly Bible reading schedule |
| created_at | TIMESTAMP | Creation timestamp |

### `mission_news`
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| title | VARCHAR(255) | News title |
| date | DATE | Publication date |
| content | TEXT | News content |
| created_at | TIMESTAMP | Creation timestamp |

### `albums`
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| title | VARCHAR(255) | Album title |
| date | DATE | Album date |
| thumbnail_url | VARCHAR(500) | Thumbnail image URL |
| photos | JSONB | Array of photo objects {src, alt} |
| created_at | TIMESTAMP | Creation timestamp |

## API Endpoints

All mutation endpoints (POST, PUT, DELETE) require admin authentication.

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with credentials |
| POST | `/api/auth/logout` | Logout and clear cookie |
| GET | `/api/auth/check` | Check authentication status |

### Calendar Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/calendar?year=&month=` | Get events for a month |
| POST | `/api/calendar` | Create new event |
| PUT | `/api/calendar/[id]` | Update event |
| DELETE | `/api/calendar/[id]` | Delete event |

### Sermons
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/sermons` | Get all sermons |
| GET | `/api/sermons/[id]` | Get single sermon |
| POST | `/api/sermons` | Create new sermon |
| PUT | `/api/sermons/[id]` | Update sermon |
| DELETE | `/api/sermons/[id]` | Delete sermon |

### Church News
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/church-news` | Get all church news |
| GET | `/api/church-news/[id]` | Get single news item |
| POST | `/api/church-news` | Create new news |
| PUT | `/api/church-news/[id]` | Update news |
| DELETE | `/api/church-news/[id]` | Delete news |

### Mission News
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/mission-news` | Get all mission news |
| GET | `/api/mission-news/[id]` | Get single news item |
| POST | `/api/mission-news` | Create new news |
| PUT | `/api/mission-news/[id]` | Update news |
| DELETE | `/api/mission-news/[id]` | Delete news |

### Albums
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/albums` | Get all albums |
| GET | `/api/albums/[id]` | Get single album |
| POST | `/api/albums` | Create new album |
| PUT | `/api/albums/[id]` | Update album |
| DELETE | `/api/albums/[id]` | Delete album |

### File Upload
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/upload` | Upload image to Vercel Blob |

## Authentication

The app uses a simple single-user authentication system:

1. **Login**: Admin enters credentials at `/admin/login`
2. **JWT Token**: On successful login, a JWT token is created using `jose` library
3. **Cookie Storage**: Token is stored in an HTTP-only cookie (`admin_token`)
4. **Verification**: API routes verify the token using `isAuthenticated()` helper
5. **Client Check**: `useAdmin()` hook checks auth status via `/api/auth/check`

### Admin Credentials
- **ID**: `kpcu`
- **Password**: `kpcu2026#$!`

## Date Handling

The app uses **America/Denver timezone** for all date operations:

- `getTodayDenver()` - Get current date in Denver timezone
- `parseLocalDate()` - Parse date without timezone shift
- `formatDateDot()` - Format as "2026.03.01"
- `formatDateKorean()` - Format as "2026년 3월 1일"
- `isNewDate()` - Check if date is within last 7 days

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage token |
| `JWT_SECRET` | Secret key for JWT signing (optional, has fallback) |

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bestcreator01/kpcu-website.git
cd kpcu-website
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Add your DATABASE_URL and BLOB_READ_WRITE_TOKEN
```

4. Run database migrations:
```bash
node scripts/001-create-tables.js
node scripts/002-seed-data.js
```

5. Start the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Deployment

The app is designed to be deployed on **Vercel**:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Integrations Required
- **Neon** - Add via Vercel Integrations for PostgreSQL database
- **Vercel Blob** - Automatically available in Vercel projects

## Admin Features

When logged in as admin, the following features are available:

- **Calendar**: Add/edit/delete events by clicking the "일정 추가" button
- **Sermons**: Create/edit/delete sermons with YouTube video embedding
- **Church News**: Create announcements with numbered items and sub-details
- **Mission News**: Create/edit news articles
- **Albums**: Upload photos (max 10 per album) with drag-and-drop

## License

This project is private and intended for use by the Korean Presbyterian Church of Utah.
