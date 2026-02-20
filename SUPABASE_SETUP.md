# Supabase Setup Guide for Sprinter Society

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Enter project name: `sprinter-society`
4. Choose region: `us-west-1` (closest to Seattle)
5. Set a strong database password
6. Click "Create new project" and wait for initialization

## Step 2: Enable Required Extensions

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **"New Query"** and paste:

```sql
CREATE EXTENSION IF NOT EXISTS "postgis" SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "vector" SCHEMA public;
```

3. Click **"Run"**

## Step 3: Create Database Schema

1. In **SQL Editor**, click **"New Query"**
2. Copy the entire contents of `supabase/migrations/001_init.sql`
3. Paste into the query editor
4. Click **"Run"**

## Step 4: Seed Sample Data

1. In **SQL Editor**, click **"New Query"**
2. Copy the entire contents of `supabase/seed.sql`
3. Paste into the query editor
4. Click **"Run"**

## Step 5: Get Your API Keys

1. Go to **Settings** → **API**
2. Copy your **Project URL** (looks like `https://xxxxx.supabase.co`)
3. Copy your **anon public key** (under "Project API keys")

## Step 6: Configure Environment Variables

1. In your project root, create `.env.local`:

```bash
cp .env.local.example .env.local
```

2. Edit `.env.local` and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 7: Enable Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** (for email/password auth)
3. Optionally enable **Google**, **GitHub**, etc.

## Step 8: Configure RLS (Row Level Security)

The RLS policies are already created in the migration. To verify:

1. Go to **Authentication** → **Policies**
2. You should see policies for `users`, `profiles`, `posts`, `events`, `gps_shares`

## Step 9: Set Up Realtime (for GPS tracking)

1. Go to **Database** → **Replication**
2. Enable replication for:
   - `gps_shares` table
   - `posts` table
   - `events` table

## Step 10: Install Dependencies & Run

```bash
npm install
npm run dev
```

Your app should now be running at `http://localhost:3000`

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
npm install
```

### "NEXT_PUBLIC_SUPABASE_URL is not set"
Make sure `.env.local` exists and has your Supabase credentials.

### "PostGIS extension not found"
Run the extension creation SQL in Step 2 again.

### "pgvector extension not found"
In Supabase dashboard, go to **SQL Editor** and run:
```sql
CREATE EXTENSION IF NOT EXISTS "vector" SCHEMA public;
```

## Next Steps

1. **Auth**: Implement Supabase Auth in `/app/auth/` routes
2. **Map**: Build interactive Leaflet map with realtime GPS tracking
3. **Posts/Feed**: Create post creation and feed display
4. **Events**: Implement event RSVP system
5. **AI**: Integrate Voyage-3 embeddings and RAG

## Cost Optimization

- Use `pg_cron` to clean old GPS shares: `DELETE FROM gps_shares WHERE timestamp < NOW() - INTERVAL '7 days'`
- Enable HNSW/GIST indexes for spatial queries (already done in migration)
- Use `vector_cosine_ops` for embedding similarity search
- Batch GPS updates (every 60s, not real-time)
- Implement incremental RLS policies for performance
