import Link from "next/link"
import { Plus, Search, Filter, Edit, Trash2, Eye, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Mock data - in a real app, this would come from your database
const blogPosts = [
  {
    id: 1,
    title: "10 AI Tools Every Economics Student Should Know in 2024",
    slug: "10-ai-tools-economics-students-2024",
    category: "AI Tools",
    status: "published",
    views: 1234,
    comments: 15,
    date: "2024-01-15",
    lastModified: "2024-01-16",
  },
  {
    id: 2,
    title: "Understanding Causal Inference: A Beginner's Guide with Python",
    slug: "causal-inference-python-guide",
    category: "Data Science",
    status: "published",
    views: 892,
    comments: 8,
    date: "2024-01-10",
    lastModified: "2024-01-12",
  },
  {
    id: 3,
    title: "Student Discounts and Perks: Ultimate Guide for KNUST Students",
    slug: "student-discounts-knust-guide",
    category: "Student Perks",
    status: "draft",
    views: 0,
    comments: 0,
    date: "2024-01-08",
    lastModified: "2024-01-08",
  },
  {
    id: 4,
    title: "Ghana's Economic Growth: What the Data Really Shows",
    slug: "ghana-economic-growth-analysis",
    category: "Economics",
    status: "published",
    views: 567,
    comments: 12,
    date: "2023-12-28",
    lastModified: "2023-12-30",
  },
  {
    id: 5,
    title: "Building Your First Econometric Model in Python",
    slug: "first-econometric-model-python",
    category: "Data Science",
    status: "scheduled",
    views: 0,
    comments: 0,
    date: "2024-01-20",
    lastModified: "2024-01-14",
  },
]

const categories = ["All", "AI Tools", "Economics", "Data Science", "Student Perks", "Productivity"]
const statuses = ["All", "Published", "Draft", "Scheduled"]

export default function PostsManagement() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-blue-600 hover:text-blue-700">
                ← Back to Dashboard
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Blog Posts</h1>
            </div>
            <Button asChild>
              <Link href="/admin/posts/new">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search posts..." className="pl-10" />
                </div>
              </div>
              <div className="flex gap-4">
                <select 
                  aria-label="Filter by category"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>All Categories</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <select 
                  aria-label="Filter by status"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>All Statuses</option>
                  {statuses.slice(1).map((status) => (
                    <option key={status} value={status.toLowerCase()}>
                      {status}
                    </option>
                  ))}
                </select>

                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Posts ({blogPosts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          post.status === "published"
                            ? "bg-green-100 text-green-800"
                            : post.status === "draft"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {post.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.views} views
                      </span>
                      <span>{post.comments} comments</span>
                      <span>Modified: {new Date(post.lastModified).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/blog/${post.slug}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/posts/${post.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="outline" className="bg-blue-600 text-white">
              1
            </Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
