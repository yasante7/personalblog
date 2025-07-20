import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Environment check:')
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseKey ? `${supabaseKey.substring(0, 10)}...` : 'Not set')
console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('SUPABASE')))

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing environment variables!')
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
})

// Test connection function
export const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('Connection test failed:', error)
      return { success: false, error }
    }
    
    console.log('Connection test successful')
    return { success: true, data }
  } catch (err) {
    console.error('Connection test error:', err)
    return { success: false, error: err }
  }
}

export type Post = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  status: 'draft' | 'published' | 'scheduled'
  category: string | null
  tags: string[] | null
  author_id: string | null
  views: number
  is_featured: boolean | null
  created_at: string
  updated_at: string
  published_at: string | null
  cover_image: string | null
}
