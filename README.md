# Sprinter Society v2

A next-generation van life community platform built with **Next.js 15 App Router**, **Supabase** (PostGIS + pgvector), **Leaflet** realtime GPS, and **AI-powered** features.

## Features

### Phase 1: Core (Live Now)
- ✅ **Auth**: Supabase OAuth + email/password
- ✅ **Profiles**: User profiles with van details and badges
- ✅ **Interactive Map**: Leaflet with realtime GPS tracking (60s updates)
- ✅ **Location Sharing**: PostGIS spatial queries for "find near me"

### Phase 2: Social (In Progress)
- 🔄 **Posts/Feed**: Create, like, comment on posts
- 🔄 **Events**: Oil Change Saturdays, meetups, workshops, caravans
- 🔄 **RSVP System**: Attend events and see attendees

### Phase 3: Hosting
- 📋 **Hosting Network**: List your property, calendar, requests, reviews
- 📋 **Trust System**: Verified badges and ratings

### Phase 4: Content
- 📺 **YouTube Integration**: Searchable library of van life videos
- 📺 **Brands/Ads**: Partner brands showcase products

### Phase 5: AI
- 🤖 **Voyage-3 Embeddings**: Fine-tuned on 500+ Sprinter data
- 🤖 **RAG Search**: HyDE + multi-query + parent-doc + ColBERTv2 reranker
- 🤖 **Spot Recommender**: AI-powered campspot recommendations
- 🤖 **For You Feed**: Personalized content discovery
- 🤖 **Sprinter AI Chat**: Tips, routes, events assistant

### Phase 6: Ops
- 💰 **Costs Dashboard**: Track Supabase, API, and compute costs
- 💰 **OpenClaw Optimization**: Model switching for cost efficiency

## Tech Stack

- **Frontend**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL + PostGIS + pgvector)
- **Auth**: Supabase Auth (OAuth + email)
- **Maps**: Leaflet + React-Leaflet with realtime GPS (watchPosition 60s)
- **State**: Zustand + TanStack Query
- **AI**: Voyage-3 embeddings, OpenAI text-embedding-3-large, ColBERTv2
- **Design**: @ShawsTint Seattle branding (black/white van accents)

## Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (free tier OK)

### 1. Clone & Install
```bash
git clone <repo>
cd sprinter-society-v2
npm install
```

### 2. Set Up Supabase
Follow [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for complete instructions.

TL;DR:
1. Create project at supabase.com
2. Enable PostGIS + pgvector extensions
3. Run migrations from `supabase/migrations/001_init.sql`
4. Seed data from `supabase/seed.sql`
5. Get API keys and add to `.env.local`

### 3. Run Dev Server
```bash
npm run dev
```
# Vanciety — Sprinter Van Community

## Tech
- Next.js (App Router)
- Supabase (Auth + Postgres)
- (Optional) pgvector for embeddings

## Quick Start

### 1) Install dependencies
```bash
pnpm install
Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_YOUTUBE_API_KEY=your-youtube-key
NEXT_PUBLIC_AI_MODEL=ds  # ds|flash|sonnet|opus
```

## Project Structure

```
sprinter-society-v2/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── map/               # Interactive map
│   ├── posts/             # Posts/feed
│   ├── events/            # Events
│   ├── hosting/           # Hosting network
│   ├── auth/              # Auth pages
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Map.tsx
│   ├── PostCard.tsx
│   └── ...
├── lib/
│   ├── supabase.ts       # Supabase client
│   ├── store.ts          # Zustand stores
│   └── utils.ts
├── supabase/
│   ├── migrations/       # Database migrations
│   └── seed.sql          # Sample data
├── public/               # Static assets
└── package.json
```

## Key Features Explained

### Realtime GPS Tracking
- Browser `watchPosition()` updates every 60s
- Stores in `gps_shares` table with PostGIS Point
- Visible to other users if `location_visible = true`
- Spatial index for fast "find near me" queries

### Interactive Map
- Leaflet map showing member pins
- Click pin to see profile + message button
- "Find Near Me" button to discover nearby members
- Event markers with details
- Campspot markers from database

### AI-Powered Features
- **Embeddings**: Voyage-3 fine-tuned on van life data
- **Search**: Hybrid (text-embedding-3-large + BM25 + ColBERTv2)
- **RAG**: HyDE + multi-query + parent-doc + metadata filters
- **Spot Recommender**: "Where should I go next?" AI suggestions
- **For You Feed**: Personalized posts based on interests
- **Sprinter AI Chat**: Ask about tips, routes, events

### Cost Optimization
- OpenClaw model switching: `ds` (cheap) → `flash` (fast) → `sonnet` (normal) → `opus` (complex)
- Incremental Supabase: only pay for what you use
- Heavy TanStack Query caching
- Lazy RAG/AI (not on every request)
- Batch GPS updates (60s, not realtime)
- pg_cron cleanup jobs
- HNSW/GIST spatial indexes

## API Endpoints

### Auth
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out

### Map/GPS
- `GET /api/map/nearby?lat=47.6&lng=-122.3&radius=25` - Find nearby members
- `POST /api/gps/share` - Update GPS location
- `GET /api/gps/history?user_id=xxx` - Get location history

### Posts
- `GET /api/posts` - Get feed
- `POST /api/posts` - Create post
- `POST /api/posts/:id/like` - Like post
- `POST /api/posts/:id/comment` - Comment on post

### Events
- `GET /api/events` - List events
- `POST /api/events` - Create event
- `POST /api/events/:id/rsvp` - RSVP to event

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t sprinter-society .
docker run -p 3000:3000 sprinter-society
```

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## License

MIT

## Support

- **Docs**: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **Issues**: GitHub Issues
- **Email**: support@sprintersociety.com

---

**Built for van lifers, by van lifers. 🚐**
