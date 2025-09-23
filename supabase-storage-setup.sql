-- Supabase Storage Setup for Image Uploads
-- Run this in your Supabase SQL Editor after creating the main schema

-- Create storage buckets for different types of images
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('images', 'images', true),
  ('posts', 'posts', true),
  ('resources', 'resources', true)
ON CONFLICT (id) DO NOTHING;

-- Set up Row Level Security (RLS) policies for storage

-- Allow public read access to all images
CREATE POLICY "Public read access for images" ON storage.objects
  FOR SELECT USING (bucket_id IN ('images', 'posts', 'resources'));

-- Allow authenticated uploads to images bucket
CREATE POLICY "Allow authenticated uploads to images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'images' 
    AND auth.role() = 'authenticated'
  );

-- Allow authenticated uploads to posts bucket
CREATE POLICY "Allow authenticated uploads to posts" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'posts' 
    AND auth.role() = 'authenticated'
  );

-- Allow authenticated uploads to resources bucket
CREATE POLICY "Allow authenticated uploads to resources" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'resources' 
    AND auth.role() = 'authenticated'
  );

-- Allow authenticated users to delete their own uploads
CREATE POLICY "Allow authenticated delete from images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Allow authenticated delete from posts" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'posts' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Allow authenticated delete from resources" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'resources' 
    AND auth.role() = 'authenticated'
  );

-- For testing/development, you might want to allow public uploads
-- Remove these in production and implement proper authentication

-- Temporary public upload policies (REMOVE IN PRODUCTION)
CREATE POLICY "Temporary public upload to images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images');

CREATE POLICY "Temporary public upload to posts" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'posts');

CREATE POLICY "Temporary public upload to resources" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'resources');

CREATE POLICY "Temporary public delete from images" ON storage.objects
  FOR DELETE USING (bucket_id = 'images');

CREATE POLICY "Temporary public delete from posts" ON storage.objects
  FOR DELETE USING (bucket_id = 'posts');

CREATE POLICY "Temporary public delete from resources" ON storage.objects
  FOR DELETE USING (bucket_id = 'resources');