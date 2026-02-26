import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabase: SupabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a dummy client that will gracefully fail
  supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
}

export { supabase };

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  image_url: string | null;
  published: boolean;
  published_at: string;
  views: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  technologies: string[];
  featured: boolean;
  order_index: number;
  created_at: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}
