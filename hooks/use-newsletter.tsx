"use client"

import { useState } from 'react'
import { subscribeToNewsletter } from '@/lib/supabase'

export const useNewsletter = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const subscribe = async (email: string) => {
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address')
      setIsError(true)
      return
    }

    setIsLoading(true)
    setMessage('')
    setIsError(false)

    try {
      const result = await subscribeToNewsletter(email)
      
      if (result.success) {
        setMessage(result.message || 'Successfully subscribed!')
        setIsError(false)
        return true
      } else {
        setMessage(result.error || 'Failed to subscribe')
        setIsError(true)
        return false
      }
    } catch (error) {
      setMessage('An unexpected error occurred')
      setIsError(true)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessage = () => {
    setMessage('')
    setIsError(false)
  }

  return {
    subscribe,
    isLoading,
    message,
    isError,
    clearMessage
  }
}
