"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User, ArrowLeft, Linkedin, Twitter, Facebook, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/app/components/navbar"
import { usePostBySlug, useRelatedPosts } from "@/hooks/retriever"
import { useParams } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [copied, setCopied] = useState(false)
  
  const { post, loading, error } = usePostBySlug(slug)
  const { posts: relatedPosts, loading: relatedLoading } = useRelatedPosts(
    post?.id || '', 
    post?.category || null, 
    3
  )

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(post?.title || '')
    
    let shareUrl = ''
    
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    notFound()
  }

  const readTime = Math.ceil((post.content?.length || 0) / 1000) + " min read"
  const publishedDate = post.published_at ? new Date(post.published_at) : new Date(post.created_at)
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Navigation */}
      < Navbar />
      {/* Back to Blog */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" asChild className="text-gray-600 dark:text-gray-400 hover:text-gray-900">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <article className="bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Badge */}
          {post.category && (
            <div className="mb-4">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                {post.category}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Yaw Asante</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {publishedDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{post.views || 0} views</span>
            </div>
          </div>

          {/* Featured Image */}
          {post.cover_image && (
            <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image 
                src={post.cover_image} 
                alt={post.title} 
                fill 
                className="object-cover"
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.src = "/placeholder.svg?height=400&width=800&text=Blog+Post+Image"
                }}
              />
            </div>
          )}

          {/* Share Buttons */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-400">Share this article:</span>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 bg-transparent"
                onClick={() => handleShare('linkedin')}
              >
                <Linkedin className="h-4 w-4 mr-1" />
                LinkedIn
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-blue-400 hover:bg-blue-50 dark:text-blue-400 bg-transparent"
                onClick={() => handleShare('twitter')}
              >
                <Twitter className="h-4 w-4 mr-1" />
                Twitter
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-blue-800 hover:bg-blue-50 dark:text-blue-400 bg-transparent"
                onClick={() => handleShare('facebook')}
              >
                <Facebook className="h-4 w-4 mr-1" />
                Facebook
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-gray-600 hover:bg-gray-50 bg-transparent"
                onClick={handleCopyLink}
              >
                <Copy className="h-4 w-4 mr-1" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Article Content */}
      <div className="bg-white dark:bg-black py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="prose prose-lg prose-gray max-w-none">
            <div className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-light">{post.excerpt}</div>
            
            {/* Render markdown content */}
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 mt-10">{children}</h1>
                ),

                h2: ({ children }) => (
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-400 mb-4 mt-8">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-400 mb-3 mt-6">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="mb-4 text-gray-800 dark:text-gray-400 leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 text-gray-900 dark:text-gray-300 mb-4 space-y-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 text-gray-900 dark:text-gray-300 mb-4 space-y-2">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-800 dark:text-gray-300">{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-400 pl-4 py-2 my-6 bg-gray-100 dark:bg-gray-800 text-white">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">
                    {children}
                  </pre>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-semibold text-gray-900 mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Author Bio */}
      <section className="bg-gray-50 dark:bg-black py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src="/self.jpg?height=120&width=120&text=Author"
                    alt="Yaw Asante"
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">About Yaw Asante</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    MPhil Economics student at KNUST with a passion for making economics and AI accessible to everyone.
                    Specializes in applied econometrics, data science, and productivity tools for academic research.
                  </p>
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/about">View Profile</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/contact">Get In Touch</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-40">
                  <Image src={post.cover_image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="text-xs mb-2">
                    {post.category}
                  </Badge>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-400 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{new Date(post.created_at).toLocaleDateString()}</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700" asChild>
                    <Link href={`/blog/${post.slug}`}>Read More →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <Card className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 dark:bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
          <p className="text-lg text-gray-600 mb-8">
            Get the latest insights on AI tools, economics, and student resources delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 px-8">Subscribe</Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">Join 500+ students already subscribed. Unsubscribe anytime.</p>
        </div>
      </Card>
    </div>
  )
}
