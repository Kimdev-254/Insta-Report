import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client (for server components)
import { createServerClient } from '@supabase/ssr'
export const createServerSupabaseClient = () => {
  return createServerClient(supabaseUrl, supabaseAnonKey)
} 