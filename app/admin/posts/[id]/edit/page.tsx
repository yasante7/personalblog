"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "@/components/image-upload"
import { toast } from "sonner"
import { supabase, STORAGE_BUCKETS } from "@/lib/supabase"
import { usePostBySlug } from "@/hooks/retriever"
import dynamic from "next/dynamic"

// Dynamically import MDEditor to avoid SSR issues
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
)

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string

  // State for form data
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")
  const [status, setStatus] = useState<"draft" | "published" | "scheduled">("draft")
  const [isFeatured, setIsFeatured] = useState(false)
  const [coverImage, setCoverImage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: post, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", postId)
          .single()

        if (error) {
          toast.error("Failed to fetch post")
          router.push("/admin/posts")
          return
        }

        // Populate form with existing data
        setTitle(post.title || "")
        setSlug(post.slug || "")
        setContent(post.content || "")
        setExcerpt(post.excerpt || "")
        setCategory(post.category || "")
        setTags(post.tags ? post.tags.join(", ") : "")
        setStatus(post.status || "draft")
        setIsFeatured(post.is_featured || false)
        setCoverImage(post.cover_image || "")
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching post:", error)
        toast.error("Failed to fetch post")
        router.push("/admin/posts")
      }
    }

    if (postId) {
      fetchPost()
    }
  }, [postId, router])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-")
      .trim()
  }

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle))
    }
  }

  const handleSave = async (newStatus?: "draft" | "published" | "scheduled") => {
    setIsSaving(true)
    
    try {
      // Validate required fields
      if (!title.trim()) {
        toast.error("Title is required")
        setIsSaving(false)
        return
      }

      if (!content.trim()) {
        toast.error("Content is required")
        setIsSaving(false)
        return
      }

      // Process tags
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      const postData = {
        title: title.trim(),
        slug: slug.trim() || generateSlug(title),
        content: content.trim(),
        excerpt: excerpt.trim() || null,
        category: category.trim() || null,
        tags: tagsArray.length > 0 ? tagsArray : null,
        status: newStatus || status,
        is_featured: isFeatured,
        cover_image: coverImage.trim() || null,
        updated_at: new Date().toISOString(),
        ...(newStatus === "published" && { published_at: new Date().toISOString() })
      }

      const { error } = await supabase
        .from("posts")
        .update(postData)
        .eq("id", postId)

      if (error) {
        console.error("Error updating post:", error)
        toast.error("Failed to update post")
        setIsSaving(false)
        return
      }

      toast.success(
        newStatus === "published" 
          ? "Post updated and published!" 
          : "Post updated successfully!"
      )
      
      // Update local status if it was changed
      if (newStatus) {
        setStatus(newStatus)
      }
      
      // Redirect to admin dashboard after publishing
      if (newStatus === "published") {
        setTimeout(() => {
          router.push("/admin")
        }, 1000) // Small delay to show the success message
      }
      
      setIsSaving(false)
    } catch (error) {
      console.error("Error updating post:", error)
      toast.error("Failed to update post")
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-8"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/posts" className="text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2 inline" />
                Back to Posts
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Edit Post</h1>
              <Badge
                variant="secondary"
                className={`text-xs ${
                  status === "published"
                    ? "bg-green-100 text-green-800"
                    : status === "draft"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                }`}
              >
                {status}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href={`/blog/${slug}`} target="_blank">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Link>
              </Button>
              <Button
                onClick={() => handleSave("draft")}
                disabled={isSaving}
                variant="outline"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
              <Button
                onClick={() => handleSave("published")}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSaving ? "Publishing..." : "Update & Publish"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter post title..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-url-slug"
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-1">
                  URL: /blog/{slug}
                </p>
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Input
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of the post..."
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AI Tools">AI Tools</SelectItem>
                      <SelectItem value="Economics">Economics</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="Student Perks">Student Perks</SelectItem>
                      <SelectItem value="Productivity">Productivity</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={(value: "draft" | "published" | "scheduled") => setStatus(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2 mt-6">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="h-4 w-4 text-blue-600 rounded"
                    aria-describedby="featured-description"
                    title="Mark post as featured"
                  />
                  <Label htmlFor="featured">Featured Post</Label>
                  <span id="featured-description" className="sr-only">
                    Mark this post as featured to highlight it on the blog
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="ai, economics, research (comma separated)"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Cover Image</Label>
                <ImageUpload
                  value={coverImage}
                  onChange={(url) => setCoverImage(url || "")}
                  folder="posts"
                  placeholder="Upload a cover image for your post"
                />
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Content *</CardTitle>
            </CardHeader>
            <CardContent>
              <div data-color-mode="light">
                <MDEditor
                  value={content}
                  onChange={(val) => setContent(val || "")}
                  preview="edit"
                  hideToolbar={false}
                  height={500}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Actions */}
          <div className="flex justify-end gap-4 pb-8">
            <Button
              onClick={() => handleSave("draft")}
              disabled={isSaving}
              variant="outline"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Draft"}
            </Button>
            <Button
              onClick={() => handleSave("published")}
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSaving ? "Publishing..." : "Update & Publish"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
