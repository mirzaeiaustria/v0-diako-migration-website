-- Create immigration_methods table
CREATE TABLE IF NOT EXISTS immigration_methods (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  country TEXT NOT NULL,
  requirements TEXT NOT NULL,
  detailed_requirements TEXT,
  steps TEXT,
  documents TEXT,
  pros_and_cons TEXT,
  approximate_costs TEXT,
  keywords TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create consultation_requests table
CREATE TABLE IF NOT EXISTS consultation_requests (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  age INTEGER,
  education TEXT,
  work_experience TEXT,
  preferred_country TEXT,
  migration_method TEXT,
  budget TEXT,
  timeline TEXT,
  additional_info TEXT,
  is_handled BOOLEAN DEFAULT false,
  handled_by TEXT,
  handled_at TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  english_name TEXT NOT NULL,
  flag_url TEXT,
  description TEXT,
  continent TEXT NOT NULL,
  popularity_rank INTEGER DEFAULT 0,
  migration_methods JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create success_stories table
CREATE TABLE IF NOT EXISTS success_stories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER,
  method TEXT NOT NULL,
  country TEXT NOT NULL,
  year INTEGER NOT NULL,
  image_url TEXT,
  story TEXT NOT NULL,
  tags JSONB,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  tags JSONB,
  read_time TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  author_id TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_immigration_methods_category ON immigration_methods(category);
CREATE INDEX IF NOT EXISTS idx_immigration_methods_country ON immigration_methods(country);
CREATE INDEX IF NOT EXISTS idx_immigration_methods_active ON immigration_methods(is_active);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_handled ON consultation_requests(is_handled);
CREATE INDEX IF NOT EXISTS idx_countries_continent ON countries(continent);
CREATE INDEX IF NOT EXISTS idx_countries_popularity ON countries(popularity_rank);
CREATE INDEX IF NOT EXISTS idx_success_stories_published ON success_stories(is_published);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(is_published);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- Add full-text search indexes
CREATE INDEX IF NOT EXISTS idx_immigration_methods_search ON immigration_methods USING gin(to_tsvector('english', title || ' ' || short_description || ' ' || keywords));
CREATE INDEX IF NOT EXISTS idx_articles_search ON articles USING gin(to_tsvector('english', title || ' ' || excerpt || ' ' || content));
