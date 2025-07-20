"use client"

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Post } from '@/lib/supabase'

interface UsePostsReturn {
  posts: Post[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function usePosts(): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log('Fetching posts from Supabase...')

      // Test basic connection first
      const { data: connectionTest, error: connectionError } = await supabase
        .from('posts')
        .select('count', { count: 'exact', head: true })

      if (connectionError) {
        console.error('Connection error:', connectionError)
        setError(`Connection failed: ${connectionError.message || 'Unknown connection error'}`)
        return
      }

      console.log('Connection successful, fetching posts...')

      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) {
        console.error('Fetch error details:', {
          message: fetchError.message,
          details: fetchError.details,
          hint: fetchError.hint,
          code: fetchError.code
        })
        setError(fetchError.message || 'Failed to fetch posts')
      } else {
        console.log('Posts fetched successfully:', data?.length || 0, 'posts')
        setPosts(data || [])
      }
    } catch (err) {
      console.error('Unexpected error details:', {
        error: err,
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      })
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts
  }
}

// Hook for fetching a single post by slug
interface UsePostBySlugReturn {
  post: Post | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function usePostBySlug(slug: string): UsePostBySlugReturn {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPost = async () => {
    if (!slug) {
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)

      console.log('Fetching post by slug:', slug)

      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published') // Only fetch published posts
        .single()

      if (fetchError) {
        console.error('Fetch error details:', {
          message: fetchError.message,
          details: fetchError.details,
          hint: fetchError.hint,
          code: fetchError.code
        })
        
        if (fetchError.code === 'PGRST116') {
          setError('Post not found')
        } else {
          setError(fetchError.message || 'Failed to fetch post')
        }
      } else {
        console.log('Post fetched successfully:', data?.title)
        setPost(data)
        
        // Increment view count
        if (data?.id) {
          await supabase
            .from('posts')
            .update({ views: (data.views || 0) + 1 })
            .eq('id', data.id)
        }
      }
    } catch (err) {
      console.error('Unexpected error details:', {
        error: err,
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      })
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [slug])

  return {
    post,
    loading,
    error,
    refetch: fetchPost
  }
}

// Hook for fetching related posts
export function useRelatedPosts(currentPostId: string, category: string | null, limit: number = 3): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchRelatedPosts = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .neq('id', currentPostId)
        .order('created_at', { ascending: false })
        .limit(limit)

      // If category exists, prioritize posts from the same category
      if (category) {
        query = query.eq('category', category)
      }

      const { data, error: fetchError } = await query

      if (fetchError) {
        console.error('Related posts fetch error:', fetchError)
        setError(fetchError.message || 'Failed to fetch related posts')
      } else {
        setPosts(data || [])
      }
    } catch (err) {
      console.error('Unexpected error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (currentPostId) {
      fetchRelatedPosts()
    }
  }, [currentPostId, category])

  return {
    posts,
    loading,
    error,
    refetch: fetchRelatedPosts
  }
}