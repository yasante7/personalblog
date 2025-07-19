import Link from "next/link"
import { TrendingUp, Users, Eye, Clock, ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Mock analytics data
const analyticsData = {
  overview: {
    totalViews: 15420,
    uniqueVisitors: 8934,
    avgSessionDuration: "3:42",
    bounceRate: "42%",
    viewsChange: 12.5,
    visitorsChange: 8.3,
    durationChange: -5.2,
    bounceChange: -3.1,
  },
  topPosts: [
    {
      title: "10 AI Tools Every Economics Student Should Know",
      views: 3420,
      uniqueViews: 2890,
      avgTime: "8:32",
      url: "/blog/ai-tools-economics-students",
    },
    {
      title: "Understanding Causal Inference with Python",
      views: 2156,
      uniqueViews: 1834,
      avgTime: "12:15",
      url: "/blog/causal-inference-python",
    },
    {
      title: "Student Discounts Guide for KNUST",
      views: 1892,
      uniqueViews: 1654,
      avgTime: "5:43",
      url: "/blog/student-discounts-knust",
    },
    {
      title: "Ghana's Economic Growth Analysis",
      views: 1567,
      uniqueViews: 1234,
      avgTime: "9:21",
      url: "/blog/ghana-economic-growth",
    },
  ],
  trafficSources: [
    { source: "Organic Search", visitors: 4521, percentage: 50.6 },
    { source: "Direct", visitors: 2134, percentage: 23.9 },
    { source: "Social Media", visitors: 1456, percentage: 16.3 },
    { source: "Referral", visitors: 823, percentage: 9.2 },
  ],
  demographics: {
    countries: [
      { country: "Ghana", visitors: 3456, percentage: 38.7 },
      { country: "Nigeria", visitors: 2134, percentage: 23.9 },
      { country: "United States", visitors: 1234, percentage: 13.8 },
      { country: "United Kingdom", visitors: 892, percentage: 10.0 },
      { country: "Others", visitors: 1218, percentage: 13.6 },
    ],
    devices: [
      { device: "Mobile", visitors: 5234, percentage: 58.6 },
      { device: "Desktop", visitors: 2890, percentage: 32.4 },
      { device: "Tablet", visitors: 810, percentage: 9.0 },
    ],
  },
}

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-blue-600 hover:text-blue-700">
                ← Back to Dashboard
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
            </div>
            <div className="flex gap-3">
              <select 
                aria-label="Time period" 
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
              </select>
              <Button variant="outline">Export Report</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {analyticsData.overview.totalViews.toLocaleString()}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center mt-2">
                <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+{analyticsData.overview.viewsChange}% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unique Visitors</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {analyticsData.overview.uniqueVisitors.toLocaleString()}
                  </p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center mt-2">
                <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">
                  +{analyticsData.overview.visitorsChange}% from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Session Duration</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.avgSessionDuration}</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex items-center mt-2">
                <ArrowDown className="h-4 w-4 text-red-600 mr-1" />
                <span className="text-sm text-red-600">{analyticsData.overview.durationChange}% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Bounce Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{analyticsData.overview.bounceRate}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <div className="flex items-center mt-2">
                <ArrowDown className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">{analyticsData.overview.bounceChange}% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topPosts.map((post, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1 line-clamp-1">{post.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{post.views.toLocaleString()} views</span>
                        <span>{post.uniqueViews.toLocaleString()} unique</span>
                        <span>{post.avgTime} avg time</span>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={post.url}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                      <span className="font-medium text-gray-900">{source.source}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{source.visitors.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{source.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic Data */}
          <Card>
            <CardHeader>
              <CardTitle>Top Countries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.demographics.countries.map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{country.country}</span>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{country.visitors.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{country.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Device Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.demographics.devices.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{device.device}</span>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{device.visitors.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{device.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
