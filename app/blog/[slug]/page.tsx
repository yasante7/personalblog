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
import { Newsletter } from "@/components/newsletter"

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
    <div className="min-h-screen bg-gray-50 dark:bg-black overflow-x-hidden">
      {/* Navigation */}
      < Navbar />
      {/* Back to Blog */}
      <div className="border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <Button variant="ghost" asChild className="text-gray-600 dark:text-gray-400 hover:text-gray-900 text-sm sm:text-base">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="truncate">Back to Blog</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <article className="bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Category Badge */}
          {post.category && (
            <div className="mb-4">
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                {post.category}
              </Badge>
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight break-words">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">Yaw Asante</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">
                {publishedDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="truncate">{post.views || 0} views</span>
            </div>
          </div>

          {/* Featured Image */}
          {post.cover_image && (
            <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] mb-8 rounded-lg overflow-hidden">
              <Image 
                src={post.cover_image} 
                alt={post.title} 
                fill 
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1024px"
                priority
                onError={(e) => {
                  const img = e.target as HTMLImageElement
                  img.src = "/placeholder.svg?height=400&width=800&text=Blog+Post+Image"
                }}
              />
            </div>
          )}

          {/* Share Buttons */}
          <div className="mb-8 pb-8 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-400 flex-shrink-0">Share this article:</span>
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 bg-transparent flex-shrink-0"
                  onClick={() => handleShare('linkedin')}
                >
                  <Linkedin className="h-4 w-4 mr-1" />
                  <span className="hidden xs:inline">LinkedIn</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-blue-400 hover:bg-blue-50 dark:text-blue-400 bg-transparent flex-shrink-0"
                  onClick={() => handleShare('twitter')}
                >
                  <Twitter className="h-4 w-4 mr-1" />
                  <span className="hidden xs:inline">Twitter</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-blue-800 hover:bg-blue-50 dark:text-blue-400 bg-transparent flex-shrink-0"
                  onClick={() => handleShare('facebook')}
                >
                  <Facebook className="h-4 w-4 mr-1" />
                  <span className="hidden xs:inline">Facebook</span>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-gray-600 hover:bg-gray-50 bg-transparent flex-shrink-0"
                  onClick={handleCopyLink}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  <span className="hidden xs:inline">{copied ? 'Copied!' : 'Copy'}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Article Content */}
      <div className="bg-white dark:bg-black py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="prose prose-sm sm:prose-lg prose-gray max-w-none">
            <div className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 leading-relaxed font-light">{post.excerpt}</div>
            
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
                img: ({ src, alt, ...props }) => (
                  <div className="relative w-full max-w-full h-48 sm:h-64 md:h-80 lg:h-96 my-4 sm:my-6 rounded-lg overflow-hidden">
                    <Image
                      src={typeof src === 'string' ? src : "/placeholder.svg"}
                      alt={alt || "Blog image"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 768px"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement
                        img.src = "/placeholder.svg?height=400&width=600&text=Image"
                      }}
                    />
                  </div>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs sm:text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Author Bio */}
      <section className="bg-gray-50 dark:bg-black py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <Image
                    src="/self.jpg?height=120&width=120&text=Author"
                    alt="Yaw Asante"
                    width={100}
                    height={100}
                    className="rounded-full sm:w-[120px] sm:h-[120px]"
                  />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">About Yaw Asante</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    I'm Yaw Asante, an MPhil Economics student at KNUST with a strong interest in data science, policy research, and sustainable development. I hold a Bachelor's degree in Economics and Geography and have worked on projects related to monetary policy, renewable energy, and climate change adaptation in Ghana. I enjoy applying tools like Python, STATA, and R to real-world problems and have experience in teaching, research, and community development.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Button size="sm" variant="outline" asChild className="w-full sm:w-auto">
                      <Link href="/about">View Profile</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild className="w-full sm:w-auto">
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
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {relatedPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-40 sm:h-44 md:h-48">
                  <Image 
                    src={post.cover_image || "/placeholder.svg"} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-300 hover:scale-105" 
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="text-xs mb-2">
                    {post.category}
                  </Badge>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-400 mb-2 line-clamp-2 text-sm sm:text-base">{post.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3">{new Date(post.created_at).toLocaleDateString()}</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700 text-sm" asChild>
                    <Link href={`/blog/${post.slug}`}>Read More →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-blue-50 dark:bg-black">
        <Newsletter />
      </section>
    </div>
  )
}
