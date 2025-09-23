"use client"

import Link from "next/link"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  FileText, 
  Globe, 
  GraduationCap, 
  Users, 
  School,
  BookOpen,
  ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data - in a real app this would come from your database
const resources = [
  {
    id: 1,
    title: "Complete Microeconomics Lecture Notes",
    category: "Lecture Materials",
    status: "published",
    featured: true,
    free: true,
    views: 1234,
    downloads: 89,
    dateCreated: "2024-01-15",
    lastModified: "2024-01-16"
  },
  {
    id: 2,
    title: "MIT OpenCourseWare Economics",
    category: "Free Online Courses",
    status: "published",
    featured: true,
    free: true,
    views: 2456,
    downloads: 0,
    dateCreated: "2024-01-10",
    lastModified: "2024-01-12"
  },
  {
    id: 3,
    title: "Python for Economists Bootcamp",
    category: "Data Science Programs",
    status: "published",
    featured: false,
    free: true,
    views: 567,
    downloads: 45,
    dateCreated: "2024-01-08",
    lastModified: "2024-01-08"
  },
  {
    id: 4,
    title: "Economics Graduate School Mentorship",
    category: "Mentorship Programs",
    status: "draft",
    featured: false,
    free: true,
    views: 0,
    downloads: 0,
    dateCreated: "2024-01-05",
    lastModified: "2024-01-05"
  }
]

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
      return "bg-blue-100 text-blue-800"
    case "Free Online Courses":
      return "bg-green-100 text-green-800"
    case "Data Science Programs":
      return "bg-purple-100 text-purple-800"
    case "Mentorship Programs":
      return "bg-orange-100 text-orange-800"
    case "School Applications":
      return "bg-pink-100 text-pink-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ResourcesManagement() {
  const router = useRouter();
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("admin");
      if (!isLoggedIn) router.push("/admin/login");
    }
  }, []);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      // In a real app, you would call your API to delete the resource
      console.log("Deleting resource:", id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <header className="shadow-sm border-b bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-blue-600 hover:text-blue-800">
                ← Back to Dashboard
              </Link>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Economics Resources</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button asChild>
                <Link href="/admin/resources/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Resource
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/projects">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Live Page
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Resources</p>
                  <p className="text-2xl font-bold">{resources.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold">{resources.filter(r => r.status === 'published').length}</p>
                </div>
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Featured</p>
                  <p className="text-2xl font-bold">{resources.filter(r => r.featured).length}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold">{resources.reduce((acc, r) => acc + r.views, 0).toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resources List */}
        <Card>
          <CardHeader>
            <CardTitle>All Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resources.map((resource) => (
                <div key={resource.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{resource.title}</h3>
                        <div className="flex gap-2">
                          <Badge className={`${getCategoryColor(resource.category)} flex items-center gap-1`}>
                            {getCategoryIcon(resource.category)}
                            {resource.category}
                          </Badge>
                          <Badge variant={resource.status === 'published' ? 'default' : 'secondary'}>
                            {resource.status}
                          </Badge>
                          {resource.featured && (
                            <Badge className="bg-blue-600 text-white">Featured</Badge>
                          )}
                          {resource.free && (
                            <Badge className="bg-green-600 text-white">Free</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div>
                          <span className="font-medium">Views:</span> {resource.views.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Downloads:</span> {resource.downloads}
                        </div>
                        <div>
                          <span className="font-medium">Created:</span> {new Date(resource.dateCreated).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Modified:</span> {new Date(resource.lastModified).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/resources/${resource.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/projects#resource-${resource.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDelete(resource.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}