"use client"

import Link from "next/link"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createResource, STORAGE_BUCKETS } from "@/lib/supabase";
import { generateSlug } from "@/lib/utils";
import { ImageUpload } from "@/components/image-upload";
import { 
  Save, 
  ArrowLeft, 
  FileText, 
  Globe, 
  GraduationCap, 
  Users, 
  School,
  BookOpen,
  Plus,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const categories = [
  "Lecture Materials",
  "Free Online Courses", 
  "Data Science Programs",
  "Mentorship Programs",
  "School Applications"
]

interface FormData {
  title: string
  description: string
  category: string
  topics: string[]
  featured: boolean
  free: boolean
  downloadUrl: string
  websiteUrl: string
  previewUrl: string
  applyUrl: string
  registrationUrl: string
  imageUrl: string
}

export default function NewResource() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    topics: [],
    featured: false,
    free: true,
    downloadUrl: '',
    websiteUrl: '',
    previewUrl: '',
    applyUrl: '',
    registrationUrl: '',
    imageUrl: ''
  })
  const [newTopic, setNewTopic] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("admin");
      if (!isLoggedIn) router.push("/admin/login");
    }
  }, []);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addTopic = () => {
    if (newTopic.trim() && !formData.topics.includes(newTopic.trim())) {
      setFormData(prev => ({
        ...prev,
        topics: [...prev.topics, newTopic.trim()]
      }))
      setNewTopic('')
    }
  }

  const removeTopic = (topicToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter(topic => topic !== topicToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Generate slug from title
      const slug = generateSlug(formData.title)
      
      // Prepare resource data
      const resourceData = {
        title: formData.title,
        slug: slug,
        description: formData.description,
        category: formData.category,
        topics: formData.topics.length > 0 ? formData.topics : null,
        status: 'published' as const,
        is_featured: formData.featured,
        is_free: formData.free,
        views: 0,
        downloads: 0,
        download_url: formData.downloadUrl || null,
        website_url: formData.websiteUrl || null,
        preview_url: formData.previewUrl || null,
        apply_url: formData.applyUrl || null,
        registration_url: formData.registrationUrl || null,
        image_url: formData.imageUrl || null,
        author_id: null, // You might want to set this based on the logged-in user
        published_at: new Date().toISOString()
      }

      const result = await createResource(resourceData)
      
      if (result.success) {
        router.push('/admin/resources')
      } else {
        alert('Error creating resource: ' + result.error)
      }
    } catch (error) {
      console.error('Error creating resource:', error)
      alert('Error creating resource')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Lecture Materials":
        return <FileText className="h-4 w-4" />
      case "Free Online Courses":
        return <Globe className="h-4 w-4" />
      case "Data Science Programs":
        return <GraduationCap className="h-4 w-4" />
      case "Mentorship Programs":
        return <Users className="h-4 w-4" />
      case "School Applications":
        return <School className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <header className="shadow-sm border-b bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/resources" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Resources
              </Link>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Add New Resource</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Resource Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Complete Microeconomics Lecture Notes"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detailed description of the resource and what students will learn..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(category)}
                          {category}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Resource Image</Label>
                <ImageUpload
                  value={formData.imageUrl}
                  onChange={(url) => handleInputChange('imageUrl', url || '')}
                  folder="resources"
                  placeholder="Upload an image for this resource"
                />
              </div>
            </CardContent>
          </Card>

          {/* Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Topics Covered</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Add a topic (e.g., Consumer Theory)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTopic())}
                />
                <Button type="button" onClick={addTopic} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.topics.map((topic) => (
                  <Badge key={topic} variant="outline" className="flex items-center gap-1">
                    {topic}
                    <button
                      type="button"
                      onClick={() => removeTopic(topic)}
                      className="ml-1 hover:text-red-600"
                      title={`Remove ${topic}`}
                      aria-label={`Remove ${topic}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Links and URLs */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="downloadUrl">Download URL</Label>
                <Input
                  id="downloadUrl"
                  value={formData.downloadUrl}
                  onChange={(e) => handleInputChange('downloadUrl', e.target.value)}
                  placeholder="Direct link to download the resource"
                />
              </div>

              <div>
                <Label htmlFor="websiteUrl">Website URL</Label>
                <Input
                  id="websiteUrl"
                  value={formData.websiteUrl}
                  onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                  placeholder="Link to external website or course page"
                />
              </div>

              <div>
                <Label htmlFor="previewUrl">Preview URL</Label>
                <Input
                  id="previewUrl"
                  value={formData.previewUrl}
                  onChange={(e) => handleInputChange('previewUrl', e.target.value)}
                  placeholder="Link to preview the resource"
                />
              </div>

              <div>
                <Label htmlFor="applyUrl">Application URL</Label>
                <Input
                  id="applyUrl"
                  value={formData.applyUrl}
                  onChange={(e) => handleInputChange('applyUrl', e.target.value)}
                  placeholder="Link to apply for mentorship programs, etc."
                />
              </div>

              <div>
                <Label htmlFor="registrationUrl">Registration URL</Label>
                <Input
                  id="registrationUrl"
                  value={formData.registrationUrl}
                  onChange={(e) => handleInputChange('registrationUrl', e.target.value)}
                  placeholder="Link to register for courses or programs"
                />
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="featured">Featured Resource</Label>
                  <p className="text-sm text-gray-600">Display this resource prominently on the page</p>
                </div>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="free">Free Resource</Label>
                  <p className="text-sm text-gray-600">Mark this resource as free for students</p>
                </div>
                <Switch
                  id="free"
                  checked={formData.free}
                  onCheckedChange={(checked) => handleInputChange('free', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/resources">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Creating...' : 'Create Resource'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}