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

// Storage bucket configuration
export const STORAGE_BUCKETS = {
  IMAGES: 'images',
  POSTS: 'posts',
  RESOURCES: 'resources'
} as const

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

export type Resource = {
  id: string
  title: string
  slug: string
  description: string
  category: string
  topics: string[] | null
  status: 'draft' | 'published' | 'scheduled'
  is_featured: boolean | null
  is_free: boolean | null
  views: number
  downloads: number
  download_url: string | null
  website_url: string | null
  preview_url: string | null
  apply_url: string | null
  registration_url: string | null
  image_url: string | null
  author_id: string | null
  created_at: string
  updated_at: string
  published_at: string | null
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

// Resource management functions
export const createResource = async (resourceData: Omit<Resource, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('resources')
      .insert([{
        ...resourceData,
        updated_at: new Date().toISOString()
      }])
      .select()

    if (error) {
      console.error('Error creating resource:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (err) {
    console.error('Create resource error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export const updateResource = async (id: string, resourceData: Partial<Resource>) => {
  try {
    const { data, error } = await supabase
      .from('resources')
      .update({
        ...resourceData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating resource:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (err) {
    console.error('Update resource error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export const deleteResource = async (id: string) => {
  try {
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting resource:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Delete resource error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export const getResource = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching resource:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Get resource error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export const getResources = async (filters?: { 
  status?: string
  category?: string
  is_featured?: boolean
  limit?: number
  offset?: number
}) => {
  try {
    let query = supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }

    if (filters?.category) {
      query = query.eq('category', filters.category)
    }

    if (filters?.is_featured !== undefined) {
      query = query.eq('is_featured', filters.is_featured)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching resources:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Get resources error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export const incrementResourceViews = async (id: string) => {
  try {
    // First get the current views
    const { data: resource, error: fetchError } = await supabase
      .from('resources')
      .select('views')
      .eq('id', id)
      .single()
      
    if (fetchError) {
      console.error('Error fetching resource:', fetchError)
      return { success: false, error: fetchError.message }
    }
    
    // Then update with incremented value
    const { data, error } = await supabase
      .from('resources')
      .update({ views: (resource.views || 0) + 1 })
      .eq('id', id)
      .select('views')
    
    if (error) {
      console.error('Error incrementing views:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (err) {
    console.error('Increment views error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}
export const incrementResourceDownloads = async (id: string) => {
  try {
    // First get the current downloads
    const { data: resource, error: fetchError } = await supabase
      .from('resources')
      .select('downloads')
      .eq('id', id)
      .single()
      
    if (fetchError) {
      console.error('Error fetching resource:', fetchError)
      return { success: false, error: fetchError.message }
    }
    
    // Then update with incremented value
    const { data, error } = await supabase
      .from('resources')
      .update({ downloads: (resource.downloads || 0) + 1 })
      .eq('id', id)
      .select('downloads')

    if (error) {
      console.error('Error incrementing downloads:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data: data[0] }
  } catch (err) {
    console.error('Increment downloads error:', err)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

// Dashboard statistics functions
export const getDashboardStats = async () => {
  try {
    // Get counts for all main entities
    const [
      { count: postsCount, error: postsError },
      { count: resourcesCount, error: resourcesError },
      { count: subscribersCount, error: subscribersError }
    ] = await Promise.all([
      supabase.from('posts').select('*', { count: 'exact', head: true }),
      supabase.from('resources').select('*', { count: 'exact', head: true }),
      supabase.from('subscribers').select('*', { count: 'exact', head: true })
    ]);

    // Calculate total views across all posts and resources
    const { data: postViews } = await supabase
      .from('posts')
      .select('views');
    
    const { data: resourceViews } = await supabase
      .from('resources')
      .select('views');

    const totalPostViews = postViews?.reduce((sum, post) => sum + (post.views || 0), 0) || 0;
    const totalResourceViews = resourceViews?.reduce((sum, resource) => sum + (resource.views || 0), 0) || 0;
    const monthlyViews = totalPostViews + totalResourceViews;

    // Get recent activity (posts from last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const { count: recentPostsCount } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString());

    const { count: recentResourcesCount } = await supabase
      .from('resources')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (postsError || resourcesError || subscribersError) {
      console.error('Error fetching dashboard stats:', { postsError, resourcesError, subscribersError });
      return { 
        success: false, 
        error: postsError?.message || resourcesError?.message || subscribersError?.message 
      };
    }

    return {
      success: true,
      data: {
        totalPosts: postsCount || 0,
        totalResources: resourcesCount || 0,
        monthlyViews,
        subscribers: subscribersCount || 0,
        recentPostsCount: recentPostsCount || 0,
        recentResourcesCount: recentResourcesCount || 0,
        comments: 0, // Would need a comments table
        contactMessages: 0, // Would need a contact messages table
      }
    };
  } catch (err) {
    console.error('Get dashboard stats error:', err);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
