"use client"

import Link from "next/link"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, getDashboardStats } from "@/lib/supabase";

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
  RefreshCw,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DashboardStats {
  totalPosts: number
  totalResources: number
  monthlyViews: number
  subscribers: number
  comments: number
  contactMessages: number
  recentPostsCount?: number
  recentResourcesCount?: number
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
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalResources: 0,
    monthlyViews: 0,
    subscribers: 0,
    comments: 0,
    contactMessages: 0,
  });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin");
      router.push("/admin/login");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("admin");
      if (!isLoggedIn) {
        router.push("/admin/login");
        return;
      }
    }

    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard statistics
      const statsResult = await getDashboardStats();
      
      // Fetch recent posts
      const { data: recentPostsData, error: recentPostsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      if (statsResult.success && statsResult.data) {
        setDashboardStats({
          totalPosts: statsResult.data.totalPosts,
          totalResources: statsResult.data.totalResources,
          monthlyViews: statsResult.data.monthlyViews,
          subscribers: statsResult.data.subscribers,
          comments: statsResult.data.comments,
          contactMessages: statsResult.data.contactMessages,
          recentPostsCount: statsResult.data.recentPostsCount,
          recentResourcesCount: statsResult.data.recentResourcesCount,
        });
      } else {
        console.error('Error fetching dashboard stats:', statsResult.error);
        // Set fallback values if stats fetch fails
        setDashboardStats(prev => prev);
      }

      if (!recentPostsError && recentPostsData) {
        setRecentPosts(recentPostsData);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Admin Header */}
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-300">Admin Panel</h1>
              <span className="text-sm text-gray-500 dark:text-gray-300">Yaw Asante's Website</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/">View Site</Link>
              </Button>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
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
                    href="/admin/resources"
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <FolderOpen className="h-4 w-4" />
                    Econ Resources
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Dashboard Overview</h2>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={fetchDashboardData}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Total Posts</p>
                        <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                          {isLoading ? (
                            <span className="inline-block animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-16 rounded"></span>
                          ) : (
                            dashboardStats.totalPosts
                          )}
                        </p>
                      </div>
                      <FileText className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {isLoading ? (
                        <span className="inline-block animate-pulse bg-gray-300 dark:bg-gray-600 h-3 w-20 rounded"></span>
                      ) : (
                        `+${dashboardStats.recentPostsCount || 0} this month`
                      )}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Econ Resources</p>
                        <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                          {isLoading ? (
                            <span className="inline-block animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-16 rounded"></span>
                          ) : (
                            dashboardStats.totalResources
                          )}
                        </p>
                      </div>
                      <FolderOpen className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {isLoading ? (
                        <span className="inline-block animate-pulse bg-gray-300 dark:bg-gray-600 h-3 w-20 rounded"></span>
                      ) : (
                        `+${dashboardStats.recentResourcesCount || 0} this month`
                      )}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Monthly Views</p>
                        <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                          {isLoading ? (
                            <span className="inline-block animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-20 rounded"></span>
                          ) : (
                            dashboardStats.monthlyViews.toLocaleString()
                          )}
                        </p>
                      </div>
                      <Eye className="h-8 w-8 text-purple-600" />
                    </div>
                    <p className="text-xs text-green-600 mt-2">
                      {isLoading ? (
                        <span className="inline-block animate-pulse bg-gray-300 dark:bg-gray-600 h-3 w-24 rounded"></span>
                      ) : (
                        "All-time views"
                      )}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Subscribers</p>
                        <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                          {isLoading ? (
                            <span className="inline-block animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-16 rounded"></span>
                          ) : (
                            dashboardStats.subscribers
                          )}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-orange-600" />
                    </div>
                    <p className="text-xs text-green-600 mt-2">
                      {isLoading ? (
                        <span className="inline-block animate-pulse bg-gray-300 dark:bg-gray-600 h-3 w-20 rounded"></span>
                      ) : (
                        "Newsletter subscribers"
                      )}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Comments</p>
                        <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                          {isLoading ? (
                            <span className="inline-block animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-16 rounded"></span>
                          ) : (
                            dashboardStats.comments
                          )}
                        </p>
                      </div>
                      <MessageSquare className="h-8 w-8 text-pink-600" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {isLoading ? (
                        <span className="inline-block animate-pulse bg-gray-300 dark:bg-gray-600 h-3 w-20 rounded"></span>
                      ) : (
                        "Coming soon"
                      )}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Messages</p>
                        <p className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                          {isLoading ? (
                            <span className="inline-block animate-pulse bg-gray-300 dark:bg-gray-600 h-8 w-16 rounded"></span>
                          ) : (
                            dashboardStats.contactMessages
                          )}
                        </p>
                      </div>
                      <Mail className="h-8 w-8 text-red-600" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {isLoading ? (
                        <span className="inline-block animate-pulse bg-gray-300 dark:bg-gray-600 h-3 w-20 rounded"></span>
                      ) : (
                        "Coming soon"
                      )}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/admin/posts/new">New Blog Post</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin/resources/new">Add Resource</Link>
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
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <p className="text-gray-500">Loading posts...</p>
                    </div>
                  ) : recentPosts.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No posts found</p>
                      <Button asChild className="mt-2">
                        <Link href="/admin/posts/new">Create your first post</Link>
                      </Button>
                    </div>
                  ) : (
                    recentPosts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-300 mb-1">{post.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(post.created_at).toLocaleDateString()}
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
                            <Link href={`/blog/${post.slug}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
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
                          <p className="font-medium text-gray-300">{comment.author}</p>
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
                      <p className="text-gray-600 text-sm mb-3">{comment.comment}</p>
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
