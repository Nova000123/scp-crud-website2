import { createClient } from '@supabase/supabase-js'

// Supabase client setup
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// export Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)