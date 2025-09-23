"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Save, Eye, ArrowLeft, Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ImageUpload } from "@/components/image-upload"
import { supabase, testConnection, STORAGE_BUCKETS } from "@/lib/supabase"
import { toast } from "sonner" // Install: npm install sonner
import dynamic from "next/dynamic"

// Dynamically import the MD editor to avoid SSR issues
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
)

const categories = ["AI Tools", "Economics", "Data Science", "Student Perks", "Productivity"]

export default function NewPost() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [status, setStatus] = useState<"draft" | "published" | "scheduled">("draft")
  const [featuredImage, setFeaturedImage] = useState("")
  const [publishDate, setPublishDate] = useState("")
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slug) {
      setSlug(generateSlug(value))
    }
  }

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const validateForm = () => {
    if (!title.trim()) {
      toast.error("Title is required")
      return false
    }
    if (!slug.trim()) {
      toast.error("Slug is required")
      return false
    }
    if (!content.trim()) {
      toast.error("Content is required")
      return false
    }
    return true
  }

  const handleSave = async (saveStatus: "draft" | "published" | "scheduled") => {
    if (!validateForm()) return

    setIsLoading(true)

    try {
      console.log('Starting save process...')
      
      // Test connection first
      const connectionTest = await testConnection()
      if (!connectionTest.success) {
        console.error('Connection test failed:', connectionTest.error)
        toast.error("Database connection failed. Check your Supabase configuration.")
        setIsLoading(false)
        return
      }

      console.log('Connection test passed')

      // Check if slug already exists
      console.log('Checking for existing slug:', slug)
      const { data: existingPost, error: slugError } = await supabase
        .from('posts')
        .select('id')
        .eq('slug', slug)
        .maybeSingle()

      if (slugError) {
        console.error('Slug check error:', slugError)
        toast.error("Error checking slug: " + (slugError.message || 'Unknown error'))
        setIsLoading(false)
        return
      }

      if (existingPost) {
        toast.error("A post with this slug already exists")
        setIsLoading(false)
        return
      }

      console.log('Slug is unique, proceeding with save...')

      const postData = {
        title: title.trim(),
        slug: slug.trim(),
        content: content.trim(),
        excerpt: excerpt.trim() || null,
        status: saveStatus,
        category: category || null,
        tags: tags.length > 0 ? tags : null,
        cover_image: featuredImage || null,
        published_at: saveStatus === 'published' ? new Date().toISOString() : 
                     saveStatus === 'scheduled' && publishDate ? new Date(publishDate).toISOString() : null,
        author_id: null,
        is_featured: false,
        views: 0
      }

      console.log('Attempting to insert:', postData)

      const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select()
        .single()

      if (error) {
        console.error('Insert error:', error)
        toast.error("Failed to save post: " + (error.message || 'Unknown error'))
        setIsLoading(false)
        return
      }

      console.log('Post saved successfully:', data)
      toast.success(`Post ${saveStatus === 'published' ? 'published' : 'saved'} successfully!`)
      
      router.push('/admin/posts')

    } catch (error) {
      console.error('Unexpected error:', error)
      toast.error("An unexpected error occurred: " + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/admin/posts">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Posts
                </Link>
              </Button>
              <h1 className="text-xl font-bold text-gray-900">New Blog Post</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => handleSave("draft")}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Draft
              </Button>
              <Button variant="outline" disabled={!content}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button 
                onClick={() => handleSave("published")}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Slug */}
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
                    className="text-lg"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input 
                    id="slug" 
                    value={slug} 
                    onChange={(e) => setSlug(e.target.value)} 
                    placeholder="post-url-slug"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">URL: yoursite.com/blog/{slug || "post-url-slug"}</p>
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief description of the post..."
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">{excerpt.length}/160 characters</p>
                </div>
              </CardContent>
            </Card>

            {/* Content Editor */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Content *</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        const sampleContent = `# Your Blog Post Title

## Introduction
Write your introduction here...

## Main Content

### Subheading
- Bullet point 1
- Bullet point 2
- Bullet point 3

### Code Example
\`\`\`javascript
console.log("Hello, World!");
\`\`\`

### Important Note
> This is a blockquote for important information.

## Conclusion
Wrap up your thoughts here...

---

**Tags:** #economics #ai #technology`
                        setContent(sampleContent)
                        toast.success("Sample content added!")
                      }}
                    >
                      Add Sample
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="w-full" data-color-mode="light">
                  <MDEditor
                    value={content}
                    onChange={(val) => setContent(val || "")}
                    preview="edit"
                    hideToolbar={false}
                    visibleDragbar={false}
                    textareaProps={{
                      placeholder: `# Your Blog Post Title

## Introduction
Start writing your blog post here...

Use **bold text**, *italic text*, and [links](https://example.com).

### Features available:
- Headers (# ## ###)
- Lists and bullet points  
- Code blocks and inline code
- Blockquotes
- Images and links
- Tables
- And much more!

Start typing to see the live preview!`,
                      style: {
                        fontSize: 14,
                        lineHeight: 1.5,
                        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        resize: 'none'
                      }
                    }}
                    height={600}
                    data-color-mode="light"
                  />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-xs text-gray-500">
                    Full Markdown support with live preview. {content.length} characters
                  </p>
                  <div className="flex gap-2 text-xs text-gray-500">
                    <span>💡 Tip: Use Ctrl+B for bold, Ctrl+I for italic</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Publish Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as "draft" | "published" | "scheduled")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Post status"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Post category"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                {status === "scheduled" && (
                  <div>
                    <Label htmlFor="publishDate">Publish Date</Label>
                    <Input 
                      id="publishDate" 
                      type="datetime-local" 
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={featuredImage}
                  onChange={(url) => setFeaturedImage(url || "")}
                  folder="posts"
                  placeholder="Upload a featured image for your post"
                />
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag..."
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                    />
                    <Button onClick={addTag} size="sm">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button 
                          onClick={() => removeTag(tag)} 
                          className="ml-1 hover:text-red-600"
                          aria-label={`Remove tag ${tag}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input 
                    id="metaTitle" 
                    placeholder="SEO title..." 
                    maxLength={60}
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea 
                    id="metaDescription" 
                    placeholder="SEO description..." 
                    rows={3} 
                    maxLength={160}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
