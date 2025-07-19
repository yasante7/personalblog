"use client"

import Link from "next/link"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  BarChart3,
  FileText,
  FolderOpen,
  Users,
  Mail,
  Settings,
  TrendingUp,
  Eye,
  MessageSquare,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock data - in a real app, this would come from your database
const dashboardStats = {
  totalPosts: 12,
  totalProjects: 6,
  monthlyViews: 2847,
  subscribers: 523,
  comments: 89,
  contactMessages: 15,
}

const recentPosts = [
  {
    id: 1,
    title: "10 AI Tools Every Economics Student Should Know in 2024",
    status: "published",
    views: 1234,
    date: "2024-01-15",
    category: "AI Tools",
  },
  {
    id: 2,
    title: "Understanding Causal Inference with Python",
    status: "published",
    views: 892,
    date: "2024-01-10",
    category: "Data Science",
  },
  {
    id: 3,
    title: "Student Discounts Guide for KNUST",
    status: "draft",
    views: 0,
    date: "2024-01-08",
    category: "Student Perks",
  },
]

const recentComments = [
  {
    id: 1,
    author: "Sarah K.",
    post: "AI Tools for Economics",
    comment: "This was incredibly helpful! Thanks for sharing...",
    date: "2024-01-16",
    status: "approved",
  },
  {
    id: 2,
    author: "Michael A.",
    post: "Causal Inference Guide",
    comment: "Could you elaborate on the IV method?",
    date: "2024-01-15",
    status: "pending",
  },
]

export default function AdminDashboard() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("admin");
      if (!isLoggedIn) router.push("/admin/login");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
              <span className="text-sm text-gray-500">Kwame Asante's Website</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/">View Site</Link>
              </Button>
              <Button variant="outline">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 border-r-2 border-blue-600"
                  >
                    <BarChart3 className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/posts"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    Blog Posts
                  </Link>
                  <Link
                    href="/admin/projects"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FolderOpen className="h-4 w-4" />
                    Projects
                  </Link>
                  <Link
                    href="/admin/subscribers"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Users className="h-4 w-4" />
                    Subscribers
                  </Link>
                  <Link
                    href="/admin/messages"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Messages
                  </Link>
                  <Link
                    href="/admin/analytics"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <TrendingUp className="h-4 w-4" />
                    Analytics
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Stats Overview */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Posts</p>
                        <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalPosts}</p>
                      </div>
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">+2 this month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Projects</p>
                        <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalProjects}</p>
                      </div>
                      <FolderOpen className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">+1 this month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Monthly Views</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {dashboardStats.monthlyViews.toLocaleString()}
                        </p>
                      </div>
                      <Eye className="h-8 w-8 text-purple-600" />
                    </div>
                    <p className="text-xs text-green-600 mt-2">+12% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Subscribers</p>
                        <p className="text-3xl font-bold text-gray-900">{dashboardStats.subscribers}</p>
                      </div>
                      <Users className="h-8 w-8 text-orange-600" />
                    </div>
                    <p className="text-xs text-green-600 mt-2">+23 this week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Comments</p>
                        <p className="text-3xl font-bold text-gray-900">{dashboardStats.comments}</p>
                      </div>
                      <MessageSquare className="h-8 w-8 text-pink-600" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">5 pending approval</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Messages</p>
                        <p className="text-3xl font-bold text-gray-900">{dashboardStats.contactMessages}</p>
                      </div>
                      <Mail className="h-8 w-8 text-red-600" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">3 unread</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/admin/posts/new">New Blog Post</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin/projects/new">Add Project</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin/analytics">View Analytics</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin/messages">Check Messages</Link>
                </Button>
              </div>
            </div>

            {/* Recent Posts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Posts</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/posts">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{post.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views} views
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              post.status === "published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {post.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/admin/posts/${post.id}/edit`}>Edit</Link>
                        </Button>
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/blog/${post.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Comments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Comments</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/comments">Manage All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentComments.map((comment) => (
                    <div key={comment.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{comment.author}</p>
                          <p className="text-sm text-gray-500">on "{comment.post}"</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              comment.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {comment.status}
                          </span>
                          <span className="text-xs text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-3">{comment.comment}</p>
                      {comment.status === "pending" && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
