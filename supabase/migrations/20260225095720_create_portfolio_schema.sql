/*
  # Portfolio Website Database Schema

  ## Overview
  This migration creates the complete database schema for a professional portfolio website
  with blog functionality, project showcase, and contact form submissions.

  ## New Tables

  ### 1. blog_posts
  Stores all blog posts with full content and metadata
  - `id` (uuid, primary key) - Unique identifier for each post
  - `title` (text) - Blog post title
  - `slug` (text, unique) - URL-friendly version of title
  - `content` (text) - Full blog post content (markdown/HTML)
  - `excerpt` (text) - Short summary for listings
  - `category` (text) - Post category (e.g., "Tech", "Tutorial", "Career")
  - `image_url` (text) - Featured image URL
  - `published` (boolean) - Publication status
  - `published_at` (timestamptz) - Publication date/time
  - `views` (integer) - View count
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. projects
  Stores portfolio projects with details and links
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Project name
  - `description` (text) - Project description
  - `image_url` (text) - Project screenshot/preview
  - `demo_url` (text) - Live demo link
  - `github_url` (text) - GitHub repository link
  - `technologies` (text[]) - Array of technologies used
  - `featured` (boolean) - Whether to feature on home page
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp

  ### 3. contact_submissions
  Stores contact form submissions from visitors
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Sender's name
  - `email` (text) - Sender's email
  - `message` (text) - Message content
  - `read` (boolean) - Whether message has been read
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - RLS enabled on all tables
  - Public read access for blog_posts and projects (published only)
  - Authenticated write access for content management
  - Public insert access for contact_submissions
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  category text NOT NULL DEFAULT 'General',
  image_url text,
  published boolean DEFAULT false,
  published_at timestamptz DEFAULT now(),
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text,
  demo_url text,
  github_url text,
  technologies text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Blog posts policies (public can read published posts)
CREATE POLICY "Public can view published blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Projects policies (public can read)
CREATE POLICY "Public can view projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage projects"
  ON projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Contact submissions policies (public can insert, authenticated can read)
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured, order_index);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, category, published, published_at) VALUES
('Welcome to My Portfolio', 'welcome-to-my-portfolio', 
'# Welcome to My Portfolio

This is the beginning of my journey as a professional software engineer. I''m excited to share my thoughts, experiences, and learnings with you through this blog.

## What to Expect

I''ll be writing about:
- Software development best practices
- Tech tutorials and guides
- My journey in the tech industry
- Project case studies
- Career advice for aspiring developers

Stay tuned for more content!', 
'Welcome to my portfolio blog! Here I share my journey as a software engineer, tutorials, and insights about modern web development.',
'Career', true, now() - interval '2 days'),

('Building Modern Web Applications with React', 'building-modern-web-apps-react',
'# Building Modern Web Applications with React

React has revolutionized the way we build web applications. In this post, I''ll share my insights on building scalable and maintainable React applications.

## Key Principles

1. **Component-Based Architecture**: Break down your UI into reusable components
2. **State Management**: Use hooks and context effectively
3. **Performance Optimization**: Leverage React''s optimization features
4. **Type Safety**: Implement TypeScript for better code quality

## Best Practices

- Keep components small and focused
- Use custom hooks for reusable logic
- Implement proper error boundaries
- Write meaningful tests

Building great applications takes time and practice, but following these principles will set you on the right path.',
'Learn the essential principles and best practices for building modern, scalable web applications with React.',
'Tech', true, now() - interval '1 day'),

('5 Tips for Writing Clean Code', 'clean-code-tips',
'# 5 Tips for Writing Clean Code

Clean code is not just about making your code work—it''s about making it readable, maintainable, and elegant.

## 1. Use Meaningful Names
Choose descriptive names for variables, functions, and classes that reveal intent.

## 2. Keep Functions Small
A function should do one thing and do it well. If it''s too long, break it down.

## 3. Write Comments When Necessary
Comment why, not what. Your code should be self-explanatory.

## 4. Follow the DRY Principle
Don''t Repeat Yourself. Extract common logic into reusable functions.

## 5. Test Your Code
Write tests to ensure your code works as expected and to prevent regressions.

Remember: Code is read more often than it is written. Make it count!',
'Five essential tips to improve your code quality and write cleaner, more maintainable code.',
'Tutorial', true, now());

-- Insert sample projects
INSERT INTO projects (title, description, image_url, demo_url, github_url, technologies, featured, order_index) VALUES
('E-Commerce Platform', 'A full-stack e-commerce platform with payment integration, inventory management, and admin dashboard.', 
'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
'#', '#', 
ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'], true, 1),

('Task Management App', 'Modern task management application with real-time collaboration, drag-and-drop interface, and team features.',
'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
'#', '#',
ARRAY['React', 'TypeScript', 'Supabase', 'Tailwind CSS'], true, 2),

('Weather Dashboard', 'Beautiful weather dashboard with forecasts, charts, and location-based weather data.',
'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
'#', '#',
ARRAY['React', 'OpenWeather API', 'Chart.js', 'CSS3'], false, 3),

('Portfolio Website', 'Personal portfolio website with blog functionality and modern design.',
'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
'#', '#',
ARRAY['React', 'TypeScript', 'Supabase', 'Tailwind CSS'], true, 4);