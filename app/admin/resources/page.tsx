"use client"

import Link from "next/link"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, getResources, deleteResource, type Resource } from "@/lib/supabase";
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
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("admin");
      if (!isLoggedIn) {
        router.push("/admin/login");
        return;
      }
    }

    fetchResources();
  }, [router]);

  const fetchResources = async () => {
    try {
      const result = await getResources();
      if (result.success && result.data) {
        setResources(result.data);
      } else {
        console.error('Error fetching resources:', result.error);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      try {
        const result = await deleteResource(id);
        if (result.success) {
          // Remove from local state
          setResources(resources.filter(resource => resource.id !== id));
        } else {
          alert('Error deleting resource: ' + result.error);
        }
      } catch (error) {
        console.error('Error deleting resource:', error);
        alert('Error deleting resource');
      }
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
                <Link href="/resources">
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
                  <p className="text-2xl font-bold">{resources.filter(r => r.is_featured).length}</p>
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
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-500">Loading resources...</p>
              </div>
            ) : resources.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No resources found</p>
                <Button asChild className="mt-2">
                  <Link href="/admin/resources/new">Create your first resource</Link>
                </Button>
              </div>
            ) : (
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
                          {resource.is_featured && (
                            <Badge className="bg-blue-600 text-white">Featured</Badge>
                          )}
                          {resource.is_free && (
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
                          <span className="font-medium">Created:</span> {new Date(resource.created_at).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Modified:</span> {new Date(resource.updated_at).toLocaleDateString()}
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
                        <Link href={`/resources#resource-${resource.id}`}>
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}