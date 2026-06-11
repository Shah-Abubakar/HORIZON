-- ============================================================
-- HORIZON — Supabase Database Setup
-- Run this SQL in your Supabase Dashboard > SQL Editor
-- ============================================================

-- ============================================================
-- 1. USERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
    id BIGSERIAL PRIMARY KEY,
    auth_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    display_name TEXT DEFAULT '',
    bio TEXT DEFAULT '',
    skills TEXT[] DEFAULT '{}',
    looking_for TEXT DEFAULT '',
    startup_stage TEXT DEFAULT '',
    college TEXT DEFAULT '',
    city TEXT DEFAULT '',
    projects JSONB DEFAULT '[]'::jsonb,
    onboarded BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can read all profiles (public)
CREATE POLICY "Users can view all profiles" ON public.users
    FOR SELECT USING (true);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = auth_id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = auth_id);

-- ============================================================
-- 2. STARTUPS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.startups (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT DEFAULT '',
    stage TEXT DEFAULT 'Just an idea',
    location TEXT DEFAULT 'Remote',
    needed_skills TEXT[] DEFAULT '{}',
    compensation TEXT DEFAULT 'Equity',
    required_commitment TEXT DEFAULT 'Part-time',
    founder_name TEXT DEFAULT '',
    founder_email TEXT DEFAULT '',
    founder_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    team_size INTEGER DEFAULT 1,
    team JSONB DEFAULT '[]'::jsonb,
    logo TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on startups table
ALTER TABLE public.startups ENABLE ROW LEVEL SECURITY;

-- Anyone can view startups (public)
CREATE POLICY "Anyone can view startups" ON public.startups
    FOR SELECT USING (true);

-- Authenticated users can create startups
CREATE POLICY "Authenticated users can create startups" ON public.startups
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Founders can update their own startups
CREATE POLICY "Founders can update own startups" ON public.startups
    FOR UPDATE USING (auth.uid() = founder_id);

-- Founders can delete their own startups
CREATE POLICY "Founders can delete own startups" ON public.startups
    FOR DELETE USING (auth.uid() = founder_id);

-- ============================================================
-- 3. ENABLE REALTIME for startups table
-- ============================================================
-- Go to Supabase Dashboard > Database > Replication
-- Under "Supabase Realtime" enable the "startups" table
-- Or run:
-- PUBLICATION supabase_realtime ADD TABLE public.startups;

-- ============================================================
-- 4. OPTIONAL: Create an updated_at trigger
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to users
DROP TRIGGER IF EXISTS set_updated_at ON public.users;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Apply trigger to startups
DROP TRIGGER IF EXISTS set_updated_at ON public.startups;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.startups
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================
-- SETUP COMPLETE!
-- ============================================================
-- After running this SQL:
-- 1. Go to Supabase Dashboard > Authentication > Providers > Enable Google
-- 2. Go to Supabase Dashboard > Database > Replication > Enable "startups" table for Realtime
-- 3. Make sure your SUPABASE_ANON_KEY in supabase-auth.js is the FULL key (not truncated)
-- 4. Deploy and test!
