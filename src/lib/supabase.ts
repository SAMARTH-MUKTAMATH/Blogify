import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  read_time: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface VisitorStat {
  id: number;
  session_id: string;
  page_visited: string;
  referrer: string;
  user_agent: string;
  device_type: string;
  browser: string;
  country?: string;
  city?: string;
  ip_address?: string;
  time_spent: number;
  created_at: string;
}

// Define proper type for event data
export interface EventData {
  [key: string]: string | number | boolean | null | undefined;
  post_id?: number;
  title?: string;
  category?: string;
  has_image?: boolean;
  page_name?: string;
  user_agent?: string;
  referrer?: string;
  time_spent?: number;
}

export interface VisitorEvent {
  id: number;
  session_id: string;
  event_name: string;
  event_data: EventData;
  page_url: string;
  created_at: string;
}
