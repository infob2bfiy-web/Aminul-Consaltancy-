import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// Helper to safely serialize arrays or objects for Supabase JSONB columns
export const safeJson = (val: any) => {
  if (!val) return [];
  if (typeof val === 'string') {
    try {
      return JSON.parse(val);
    } catch {
      return [val];
    }
  }
  return val;
};

// SQL code to create required tables in Supabase SQL Editor
export const SUPABASE_SQL_SCHEMA = `-- Copy and paste this into your Supabase SQL Editor to create all required tables:

-- 1. Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id TEXT PRIMARY KEY,
  "companyName" TEXT,
  "companyNameEn" TEXT,
  tagline TEXT,
  "taglineEn" TEXT,
  "whatsappNumber" TEXT,
  "messengerLink" TEXT,
  "contactPhone" TEXT,
  "contactEmail" TEXT,
  "officeAddress" TEXT,
  "officeAddressEn" TEXT,
  "workingHours" TEXT,
  "workingHoursEn" TEXT,
  "primaryColor" TEXT,
  "secondaryColor" TEXT,
  "googleMapsEmbedUrl" TEXT,
  "facebookPixel" TEXT,
  "googleAnalyticsId" TEXT,
  "seoTitle" TEXT,
  "seoDescription" TEXT,
  "logoUrl" TEXT,
  "faviconUrl" TEXT,
  "adminUsername" TEXT,
  "adminPassword" TEXT
);

-- 2. Create services table
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT,
  "titleEn" TEXT,
  description TEXT,
  "descriptionEn" TEXT,
  benefits JSONB,
  "benefitsEn" JSONB,
  "iconName" TEXT,
  "imageUrl" TEXT
);

-- 3. Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT,
  "titleEn" TEXT,
  category TEXT,
  "categoryEn" TEXT,
  description TEXT,
  "descriptionEn" TEXT,
  images JSONB,
  area TEXT,
  budget TEXT,
  "completionDate" TEXT,
  "clientName" TEXT,
  location TEXT,
  "locationEn" TEXT,
  "beforeImageUrl" TEXT,
  "afterImageUrl" TEXT
);

-- 4. Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  "imageUrl" TEXT,
  title TEXT,
  "titleEn" TEXT,
  category TEXT
);

-- 5. Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  name TEXT,
  "nameEn" TEXT,
  designation TEXT,
  "designationEn" TEXT,
  review TEXT,
  "reviewEn" TEXT,
  rating NUMERIC,
  "photoUrl" TEXT
);

-- 6. Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  title TEXT,
  "titleEn" TEXT,
  category TEXT,
  "categoryEn" TEXT,
  content TEXT,
  "contentEn" TEXT,
  "imageUrl" TEXT,
  author TEXT,
  "authorEn" TEXT,
  date TEXT,
  tags JSONB
);

-- 7. Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id TEXT PRIMARY KEY,
  question TEXT,
  "questionEn" TEXT,
  answer TEXT,
  "answerEn" TEXT
);

-- 8. Create team table
CREATE TABLE IF NOT EXISTS team (
  id TEXT PRIMARY KEY,
  name TEXT,
  "nameEn" TEXT,
  designation TEXT,
  "designationEn" TEXT,
  "photoUrl" TEXT,
  "socialFacebook" TEXT,
  "socialLinkedin" TEXT
);

-- 9. Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  name TEXT,
  phone TEXT,
  email TEXT,
  subject TEXT,
  message TEXT,
  status TEXT DEFAULT 'unread',
  "createdAt" TEXT
);

-- Enable RLS and insert open access or simple rules if desired,
-- or disable RLS for direct client operations.
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE blogs DISABLE ROW LEVEL SECURITY;
ALTER TABLE faqs DISABLE ROW LEVEL SECURITY;
ALTER TABLE team DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
`;
