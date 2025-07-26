import { createClient } from '@supabase/supabase-js';

// Create a Supabase client with the service role key for admin operations
const supabaseAdmin = createClient("https://thmlsgdqymyhihrvbyhp.supabase.co");

export { supabaseAdmin };