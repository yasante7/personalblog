"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ExternalLink, BookOpen, GraduationCap, Users, FileText, Globe, Award, School } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "../components/navbar"
import { getResources, incrementResourceViews, incrementResourceDownloads, type Resource } from "@/lib/supabase"



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

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Lecture Materials":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "Free Online Courses":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "Data Science Programs":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    case "Mentorship Programs":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    case "School Applications":
      return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
  }
}

export default function EconResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  useEffect(() => {
    fetchResources()
  }, [])
  
  const fetchResources = async (category?: string) => {
    try {
      setIsLoading(true)
      const filters: { status: 'published'; category?: string } = { status: 'published' }
      if (category) {
        filters.category = category
      }
      const result = await getResources(filters)
      if (result.success && result.data) {
        setResources(result.data)
      }
    } catch (error) {
      console.error('Error fetching resources:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResourceClick = async (resourceId: string, actionType: 'view' | 'download') => {
    try {
      if (actionType === 'view') {
        await incrementResourceViews(resourceId)
      } else if (actionType === 'download') {
        await incrementResourceDownloads(resourceId)
      }
    } catch (error) {
      console.error('Error tracking resource interaction:', error)
    }
  }

  const handleCategoryFilter = (category: string) => {
    if (selectedCategory === category) {
      // If already selected, clear filter
      setSelectedCategory(null)
      fetchResources()
    } else {
      // Set new category filter
      setSelectedCategory(category)
      fetchResources(category)
      // Scroll to resources section
      setTimeout(() => {
        const resourcesSection = document.querySelector('[data-section="featured-resources"]')
        if (resourcesSection) {
          resourcesSection.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  const clearCategoryFilter = () => {
    setSelectedCategory(null)
    fetchResources()
  }

  const featuredResources = resources.filter((resource) => resource.is_featured)
  const otherResources = resources.filter((resource) => !resource.is_featured)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Navigation */}
      <Navbar />

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Economics Resources Hub</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A curated collection of free resources, lecture materials, online courses, and opportunities to help economics 
            students excel in their studies and prepare for graduate school and careers.
          </p>
          {selectedCategory && (
            <div className="mt-6 flex justify-center">
              <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full flex items-center gap-2">
                <span>Filtered by: <strong>{selectedCategory}</strong></span>
                <button 
                  onClick={clearCategoryFilter}
                  className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-12 px-4 sm:px-6 lg:px-8" data-section="featured-resources">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {selectedCategory ? `Featured ${selectedCategory}` : 'Featured Resources'}
          </h2>
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading resources...</p>
            </div>
          ) : featuredResources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {selectedCategory 
                  ? `No featured resources available for ${selectedCategory} yet.`
                  : 'No featured resources available yet.'
                }
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative h-48">
                  <Image src={resource.image_url || "/placeholder.svg"} alt={resource.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-blue-600 text-white">Featured</Badge>
                    {resource.is_free && <Badge className="bg-green-600 text-white">Free</Badge>}
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${getCategoryColor(resource.category)} flex items-center gap-1`}>
                      {getCategoryIcon(resource.category)}
                      {resource.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{resource.description}</p>
                  <div className="mb-4">
                    <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">Topics Covered:</h4>
                    <div className="flex flex-wrap gap-1">
                      {resource.topics?.map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      )) || <p className="text-sm text-gray-500">No topics listed</p>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {resource.download_url && (
                      <Button size="sm" variant="outline" asChild>
                        <Link 
                          href={resource.download_url} 
                          onClick={() => handleResourceClick(resource.id, 'download')}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Download
                        </Link>
                      </Button>
                    )}
                    {resource.website_url && (
                      <Button size="sm" asChild>
                        <Link 
                          href={resource.website_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => handleResourceClick(resource.id, 'view')}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Visit Site
                        </Link>
                      </Button>
                    )}
                    {resource.preview_url && (
                      <Button size="sm" variant="outline" asChild>
                        <Link 
                          href={resource.preview_url}
                          onClick={() => handleResourceClick(resource.id, 'view')}
                        >
                          <BookOpen className="h-4 w-4 mr-1" />
                          Preview
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Other Resources */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {selectedCategory ? `Additional ${selectedCategory}` : 'Additional Resources'}
          </h2>
          {otherResources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {selectedCategory 
                  ? `No additional resources available for ${selectedCategory} yet.`
                  : 'No additional resources available yet.'
                }
              </p>
              {selectedCategory && (
                <Button 
                  variant="outline" 
                  onClick={clearCategoryFilter}
                  className="mt-4"
                >
                  View All Resources
                </Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-40">
                  <Image src={resource.image_url || "/placeholder.svg"} alt={resource.title} fill className="object-cover" />
                  {resource.is_free && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-600 text-white text-xs">Free</Badge>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <Badge className={`${getCategoryColor(resource.category)} flex items-center gap-1 w-fit mb-2`}>
                    {getCategoryIcon(resource.category)}
                    {resource.category}
                  </Badge>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{resource.description}</p>
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {resource.topics?.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {resource.topics && resource.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{resource.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {resource.download_url && (
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <Link 
                          href={resource.download_url}
                          onClick={() => handleResourceClick(resource.id, 'download')}
                        >
                          <FileText className="h-3 w-3 mr-1" />
                          Get
                        </Link>
                      </Button>
                    )}
                    {resource.website_url && (
                      <Button size="sm" className="flex-1" asChild>
                        <Link 
                          href={resource.website_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => handleResourceClick(resource.id, 'view')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Link>
                      </Button>
                    )}
                    {resource.apply_url && (
                      <Button size="sm" className="flex-1" asChild>
                        <Link 
                          href={resource.apply_url}
                          onClick={() => handleResourceClick(resource.id, 'view')}
                        >
                          <Award className="h-3 w-3 mr-1" />
                          Apply
                        </Link>
                      </Button>
                    )}
                    {resource.registration_url && (
                      <Button size="sm" className="flex-1" asChild>
                        <Link 
                          href={resource.registration_url}
                          onClick={() => handleResourceClick(resource.id, 'view')}
                        >
                          <GraduationCap className="h-3 w-3 mr-1" />
                          Register
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Resource Categories Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 dark:text-white">Explore by Category</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12">Click on any category to filter resources</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card 
              className={`text-center hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedCategory === 'Lecture Materials' 
                  ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                  : 'hover:bg-white dark:hover:bg-gray-800'
              }`}
              onClick={() => handleCategoryFilter('Lecture Materials')}
            >
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <CardTitle>Lecture Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Comprehensive lecture notes, study guides, and practice materials for core economics courses.
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`text-center hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedCategory === 'Free Online Courses' 
                  ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' 
                  : 'hover:bg-white dark:hover:bg-gray-800'
              }`}
              onClick={() => handleCategoryFilter('Free Online Courses')}
            >
              <CardHeader>
                <Globe className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <CardTitle>Free Online Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  High-quality economics courses from top universities available online for free.
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`text-center hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedCategory === 'Data Science Programs' 
                  ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20' 
                  : 'hover:bg-white dark:hover:bg-gray-800'
              }`}
              onClick={() => handleCategoryFilter('Data Science Programs')}
            >
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                <CardTitle>Data Science Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Learn Python, R, and econometric analysis to boost your quantitative skills.
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`text-center hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedCategory === 'Mentorship Programs' 
                  ? 'ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                  : 'hover:bg-white dark:hover:bg-gray-800'
              }`}
              onClick={() => handleCategoryFilter('Mentorship Programs')}
            >
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mx-auto mb-2" />
                <CardTitle>Mentorship Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Connect with graduate students and professionals for guidance and career advice.
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`text-center hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedCategory === 'School Applications' 
                  ? 'ring-2 ring-pink-500 bg-pink-50 dark:bg-pink-900/20' 
                  : 'hover:bg-white dark:hover:bg-gray-800'
              }`}
              onClick={() => handleCategoryFilter('School Applications')}
            >
              <CardHeader>
                <School className="h-12 w-12 text-pink-600 mx-auto mb-2" />
                <CardTitle>School Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Comprehensive guides for applying to graduate programs in economics.
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className={`text-center hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedCategory === 'Study Resources' 
                  ? 'ring-2 ring-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'hover:bg-white dark:hover:bg-gray-800'
              }`}
              onClick={() => handleCategoryFilter('Study Resources')}
            >
              <CardHeader>
                <BookOpen className="h-12 w-12 text-indigo-600 mx-auto mb-2" />
                <CardTitle>Study Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Additional study materials, research tools, and academic resources.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Have a Resource to Share?</h2>
          <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
            Know of a great resource that should be included? I'm always looking to expand this collection 
            to help more economics students succeed in their studies.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">Suggest a Resource</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
