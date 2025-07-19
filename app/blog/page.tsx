import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, Tag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/app/components/navbar"

const blogPosts = [
  {
    id: 1,
    title: "10 AI Tools Every Economics Student Should Know in 2024",
    excerpt:
      "Discover the most powerful AI tools that can revolutionize your economic research, data analysis, and academic writing. From ChatGPT to specialized econometric software.",
    category: "AI Tools",
    date: "2024-01-15",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 2,
    title: "Understanding Causal Inference: A Beginner's Guide with Python",
    excerpt:
      "Learn the fundamentals of causal inference and how to implement difference-in-differences, instrumental variables, and regression discontinuity designs using Python.",
    category: "Data Science",
    date: "2024-01-10",
    readTime: "12 min read",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 3,
    title: "Student Discounts and Perks: Ultimate Guide for KNUST Students",
    excerpt:
      "Comprehensive list of student discounts, free software licenses, and exclusive perks available to university students in Ghana and internationally.",
    category: "Student Perks",
    date: "2024-01-05",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 4,
    title: "Ghana's Economic Growth: What the Data Really Shows",
    excerpt:
      "An in-depth analysis of Ghana's economic indicators over the past decade, using data visualization to uncover trends and insights.",
    category: "Economics",
    date: "2023-12-28",
    readTime: "10 min read",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 5,
    title: "Building Your First Econometric Model in Python",
    excerpt:
      "Step-by-step tutorial on creating, testing, and interpreting econometric models using Python's statsmodels and scikit-learn libraries.",
    category: "Data Science",
    date: "2023-12-20",
    readTime: "15 min read",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 6,
    title: "Productivity Hacks for Graduate Students",
    excerpt:
      "Time management strategies, study techniques, and digital tools that have helped me stay productive during my MPhil program.",
    category: "Productivity",
    date: "2023-12-15",
    readTime: "7 min read",
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
]

const categories = ["All", "AI Tools", "Economics", "Data Science", "Student Perks", "Productivity"]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />
      
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Insights on AI tools, economics, data science, and student resources to help you succeed in your academic
            and professional journey.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Posts</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-48">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">Featured</Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag className="h-4 w-4" />
                      {post.category}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Posts */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Posts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-40">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">{post.title}</h3>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                    Read More <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-lg text-gray-600 mb-8">
            Get the latest insights on AI tools, economics, and student resources delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
