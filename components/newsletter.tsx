"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { useNewsletter } from "@/hooks/use-newsletter"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface NewsletterProps {
  className?: string
}

export function Newsletter({ className }: NewsletterProps) {
  const [email, setEmail] = useState('')
  const { subscribe, isLoading, message, isError, clearMessage } = useNewsletter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const success = await subscribe(email)
    if (success) {
      setEmail('') // Clear email on success
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (message) {
      clearMessage() // Clear message when user starts typing
    }
  }

  return (
    <Card className={`max-w-4xl mx-auto text-center p-8 ${className}`}>
      <CardHeader>
        <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-4">Stay Updated</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Get the latest insights on AI tools, economics, and student resources delivered to your inbox.
        </p>
      </CardHeader>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            required
          />
          <Button 
            type="submit" 
            disabled={isLoading || !email}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              'Subscribe'
            )}
          </Button>
        </div>
        
        {message && (
          <div className={`mt-4 p-3 rounded-lg flex items-center justify-center gap-2 ${
            isError 
              ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800' 
              : 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
          }`}>
            {isError ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">{message}</span>
          </div>
        )}
      </form>
    </Card>
  )
}
