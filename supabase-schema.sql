-- Supabase schema for the personal blog
-- Run these commands in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  category TEXT,
  tags TEXT[],
  author_id UUID,
  views INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create resources table
CREATE TABLE IF NOT EXISTS resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  topics TEXT[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  is_featured BOOLEAN DEFAULT FALSE,
  is_free BOOLEAN DEFAULT TRUE,
  views INTEGER DEFAULT 0,
  downloads INTEGER DEFAULT 0,
  download_url TEXT,
  website_url TEXT,
  preview_url TEXT,
  apply_url TEXT,
  registration_url TEXT,
  image_url TEXT,
  author_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_messages table (for future use)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table (for future use)
CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_is_featured ON posts(is_featured);

CREATE INDEX IF NOT EXISTS idx_resources_status ON resources(status);
CREATE INDEX IF NOT EXISTS idx_resources_created_at ON resources(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_is_featured ON resources(is_featured);
CREATE INDEX IF NOT EXISTS idx_resources_slug ON resources(slug);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_is_active ON subscribers(is_active);

-- Insert some sample data for testing

-- Sample posts
INSERT INTO posts (title, slug, content, excerpt, status, category, views, is_featured, published_at) VALUES
('Getting Started with Economics at KNUST', 'getting-started-economics-knust', 'This is a comprehensive guide for new economics students at KNUST...', 'A guide for new economics students', 'published', 'Academic', 150, true, NOW()),
('10 Essential Economics Tools for Students', '10-essential-economics-tools', 'Here are the top 10 tools every economics student should know...', 'Essential tools and resources', 'published', 'Tools', 89, false, NOW()),
('Understanding Econometrics: A Beginner''s Guide', 'understanding-econometrics-beginners', 'Econometrics can seem daunting, but with the right approach...', 'Learn econometrics basics', 'draft', 'Academic', 0, false, NULL)
ON CONFLICT (slug) DO NOTHING;

-- Sample resources
INSERT INTO resources (title, slug, description, category, topics, status, is_featured, is_free, views, downloads, website_url, image_url, published_at) VALUES
('MIT OpenCourseWare Economics', 'mit-opencourseware-economics', 'Free economics courses from MIT including micro, macro, and econometrics', 'Free Online Courses', ARRAY['Microeconomics', 'Macroeconomics', 'Econometrics'], 'published', true, true, 45, 12, 'https://ocw.mit.edu/courses/economics/', 'https://ocw.mit.edu/favicon.ico', NOW()),
('Khan Academy Macroeconomics', 'khan-academy-macroeconomics', 'Comprehensive macroeconomics course covering GDP, inflation, unemployment and more', 'Free Online Courses', ARRAY['Macroeconomics', 'GDP', 'Inflation'], 'published', true, true, 67, 23, 'https://www.khanacademy.org/economics-finance-domain/macroeconomics', 'https://cdn.kastatic.org/images/khan-logo-dark-background-2.png', NOW()),
('Principles of Economics Lecture Notes', 'principles-economics-lecture-notes', 'Comprehensive lecture notes covering fundamental economic principles', 'Lecture Materials', ARRAY['Principles', 'Supply and Demand', 'Market Structure'], 'published', false, true, 34, 15, NULL, NULL, NOW()),
('Google Data Analytics Certificate', 'google-data-analytics-certificate', 'Professional certificate program in data analytics with economics applications', 'Data Science Programs', ARRAY['Data Analytics', 'Statistics', 'Economics'], 'published', true, false, 89, 5, 'https://www.coursera.org/professional-certificates/google-data-analytics', 'https://d3c33hcgiwev3.cloudfront.net/imageAssetProxy.v1/ffzKrX0_QCC0ZwN8QY5VHw_704b8db0a9a045c29b4e3395b83b8ff1_Google-Logo.png', NOW())
ON CONFLICT (slug) DO NOTHING;

-- Row Level Security (RLS) - Enable RLS on all tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to published posts" ON posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access to published resources" ON resources
  FOR SELECT USING (status = 'published');

-- Create policies for public insert on subscribers (for newsletter signup)
CREATE POLICY "Allow public insert on subscribers" ON subscribers
  FOR INSERT WITH CHECK (true);

-- Create policies for public insert on contact messages
CREATE POLICY "Allow public insert on contact_messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Create policies for admin access (you'll need to implement authentication)
-- For now, we'll allow all operations for testing
CREATE POLICY "Allow all operations on posts for authenticated users" ON posts
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on resources for authenticated users" ON resources
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on subscribers for authenticated users" ON subscribers
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on contact_messages for authenticated users" ON contact_messages
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on comments for authenticated users" ON comments
  FOR ALL USING (true);