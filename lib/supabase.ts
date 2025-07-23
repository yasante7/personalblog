import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

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

export type Subscriber = {
  id: string
  email: string
  created_at: string
  is_active: boolean
}

// Newsletter subscription function
export const subscribeToNewsletter = async (email: string) => {
  try {
    console.log('Attempting to subscribe email:', email)
    
    // Check if email already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('subscribers')
      .select('id, email, is_active')
      .eq('email', email)
      .single()

    console.log('Check existing subscriber result:', { existingSubscriber, checkError })

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is expected for new subscribers
      console.error('Error checking existing subscriber:', checkError)
      return { success: false, error: `Failed to check existing subscription: ${checkError.message}` }
    }

    if (existingSubscriber) {
      if (existingSubscriber.is_active) {
        return { success: false, error: 'Email is already subscribed' }
      } else {
        // Reactivate existing subscriber
        const { data, error } = await supabase
          .from('subscribers')
          .update({ is_active: true })
          .eq('email', email)
          .select()

        if (error) {
          console.error('Error reactivating subscriber:', error)
          return { success: false, error: `Failed to reactivate subscription: ${error.message}` }
        }

        return { success: true, data: data[0], message: 'Successfully reactivated subscription!' }
      }
    }

    // Add new subscriber
    console.log('Adding new subscriber with email:', email)
    const { data, error } = await supabase
      .from('subscribers')
      .insert([
        {
          email: email,
          is_active: true
        }
      ])
      .select()

    console.log('Insert result:', { data, error })

    if (error) {
      console.error('Error adding subscriber:', error)
      return { success: false, error: `Failed to subscribe: ${error.message}` }
    }

    console.log('Successfully added subscriber:', data)
    return { success: true, data: data[0], message: 'Successfully subscribed!' }
  } catch (err) {
    console.error('Subscription error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}
