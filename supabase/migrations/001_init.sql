-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "postgis" SCHEMA public;
CREATE EXTENSION IF NOT EXISTS "vector" SCHEMA public;

-- Users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  van_type TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Profiles table with PostGIS location
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  location GEOMETRY(Point, 4326),
  location_visible BOOLEAN DEFAULT TRUE,
  last_gps_update TIMESTAMP WITH TIME ZONE,
  hosting_available BOOLEAN DEFAULT FALSE,
  hosting_capacity INTEGER,
  badges TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  image_url TEXT,
  location GEOMETRY(Point, 4326),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT CHECK (event_type IN ('oil_change', 'meetup', 'workshop', 'caravan', 'rally', 'expo')),
  location GEOMETRY(Point, 4326) NOT NULL,
  location_name TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  max_attendees INTEGER,
  attendees_count INTEGER DEFAULT 0,
  created_by UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- GPS Shares table (for realtime tracking)
CREATE TABLE IF NOT EXISTS public.gps_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  location GEOMETRY(Point, 4326) NOT NULL,
  location_name TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Embeddings table for RAG/search
CREATE TABLE IF NOT EXISTS public.embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1024),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create spatial indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_location ON public.profiles USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_posts_location ON public.posts USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_events_location ON public.events USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_gps_shares_location ON public.gps_shares USING GIST(location);
CREATE INDEX IF NOT EXISTS idx_gps_shares_user_id ON public.gps_shares(user_id);
CREATE INDEX IF NOT EXISTS idx_gps_shares_timestamp ON public.gps_shares(timestamp DESC);

-- Create embedding index
CREATE INDEX IF NOT EXISTS idx_embeddings_embedding ON public.embeddings USING ivfflat(embedding vector_cosine_ops);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gps_shares ENABLE ROW LEVEL SECURITY;

-- RLS Policies (permissive for now, tighten later)
CREATE POLICY "Users can read their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id OR verified = TRUE);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can read posts" ON public.posts
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create posts" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts" ON public.posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read events" ON public.events
  FOR SELECT USING (TRUE);

CREATE POLICY "Users can create events" ON public.events
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can read visible GPS shares" ON public.gps_shares
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.user_id = gps_shares.user_id
      AND profiles.location_visible = TRUE
    )
  );

CREATE POLICY "Users can create GPS shares" ON public.gps_shares
  FOR INSERT WITH CHECK (auth.uid() = user_id);
