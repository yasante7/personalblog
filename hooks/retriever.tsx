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