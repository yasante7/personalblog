import Link from "next/link"
import Image from "next/image"
import { ExternalLink, BookOpen, GraduationCap, Users, FileText, Globe, Award, School } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "../components/navbar"

const resources = [
  {
    id: 1,
    title: "Complete Microeconomics Lecture Notes",
    description:
      "Comprehensive lecture materials covering consumer theory, producer theory, market structures, and welfare economics. Includes real-world examples and problem sets with solutions.",
    topics: ["Consumer Theory", "Producer Theory", "Market Structures", "Game Theory", "Welfare Economics"],
    category: "Lecture Materials",
    image: "/placeholder.svg?height=200&width=400",
    downloadUrl: "#",
    previewUrl: "#",
    featured: true,
    free: true,
  },
  {
    id: 2,
    title: "MIT OpenCourseWare Economics",
    description:
      "Access to MIT's complete economics curriculum including video lectures, assignments, and exams. Covers undergraduate and graduate level courses in economics.",
    topics: ["Principles of Economics", "Intermediate Micro/Macro", "Econometrics", "Development Economics"],
    category: "Free Online Courses",
    image: "/placeholder.svg?height=200&width=400",
    websiteUrl: "https://ocw.mit.edu/courses/economics/",
    featured: true,
    free: true,
  },
  {
    id: 3,
    title: "Python for Economists Bootcamp",
    description:
      "Learn data analysis, econometrics, and visualization using Python. Perfect for economics students wanting to develop quantitative skills for research and industry.",
    topics: ["Python Basics", "Pandas", "Data Visualization", "Econometric Analysis", "Machine Learning"],
    category: "Data Science Programs",
    image: "/placeholder.svg?height=200&width=400",
    websiteUrl: "#",
    price: "Free",
    featured: false,
    free: true,
  },
  {
    id: 4,
    title: "Economics Graduate School Mentorship",
    description:
      "Connect with current graduate students and recent PhD graduates for guidance on applications, research, and career paths in economics.",
    topics: ["Application Tips", "Research Guidance", "Career Advice", "Networking", "Interview Prep"],
    category: "Mentorship Programs",
    image: "/placeholder.svg?height=200&width=400",
    applyUrl: "#",
    featured: false,
    free: true,
  },
  {
    id: 5,
    title: "Top Economics PhD Programs Guide",
    description:
      "Comprehensive guide to applying to top economics PhD programs including application requirements, deadlines, funding information, and admission statistics.",
    topics: ["Application Requirements", "Program Rankings", "Funding Information", "Deadlines", "Admission Stats"],
    category: "School Applications",
    image: "/placeholder.svg?height=200&width=400",
    downloadUrl: "#",
    featured: false,
    free: true,
  },
  {
    id: 6,
    title: "Coursera Economics Specializations",
    description:
      "Curated list of the best economics courses and specializations on Coursera, including financial aid options for students who qualify.",
    topics: ["Behavioral Economics", "Financial Markets", "Economic Policy", "International Trade"],
    category: "Free Online Courses",
    image: "/placeholder.svg?height=200&width=400",
    websiteUrl: "https://coursera.org",
    featured: false,
    free: true,
  },
  {
    id: 7,
    title: "Macroeconomics Study Materials",
    description:
      "Complete study package for macroeconomics including lecture slides, summary notes, practice exams, and economic data analysis exercises.",
    topics: ["IS-LM Model", "AD-AS Framework", "Growth Theory", "Monetary Policy", "Fiscal Policy"],
    category: "Lecture Materials",
    image: "/placeholder.svg?height=200&width=400",
    downloadUrl: "#",
    featured: false,
    free: true,
  },
  {
    id: 8,
    title: "R for Econometrics Workshop",
    description:
      "Learn econometric analysis using R programming. Covers linear regression, time series analysis, panel data methods, and reproducible research practices.",
    topics: ["R Programming", "Linear Regression", "Time Series", "Panel Data", "Reproducible Research"],
    category: "Data Science Programs",
    image: "/placeholder.svg?height=200&width=400",
    registrationUrl: "#",
    featured: false,
    free: true,
  },
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
  const featuredResources = resources.filter((resource) => resource.featured)
  const otherResources = resources.filter((resource) => !resource.featured)

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
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Resources</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative h-48">
                  <Image src={resource.image || "/placeholder.svg"} alt={resource.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-blue-600 text-white">Featured</Badge>
                    {resource.free && <Badge className="bg-green-600 text-white">Free</Badge>}
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
                      {resource.topics.map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {resource.downloadUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={resource.downloadUrl}>
                          <FileText className="h-4 w-4 mr-1" />
                          Download
                        </Link>
                      </Button>
                    )}
                    {resource.websiteUrl && (
                      <Button size="sm" asChild>
                        <Link href={resource.websiteUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Visit Site
                        </Link>
                      </Button>
                    )}
                    {resource.previewUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={resource.previewUrl}>
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
        </div>
      </section>

      {/* Other Resources */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Additional Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-40">
                  <Image src={resource.image || "/placeholder.svg"} alt={resource.title} fill className="object-cover" />
                  {resource.free && (
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
                      {resource.topics.slice(0, 3).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {resource.topics.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{resource.topics.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {resource.downloadUrl && (
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <Link href={resource.downloadUrl}>
                          <FileText className="h-3 w-3 mr-1" />
                          Get
                        </Link>
                      </Button>
                    )}
                    {resource.websiteUrl && (
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={resource.websiteUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Visit
                        </Link>
                      </Button>
                    )}
                    {resource.applyUrl && (
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={resource.applyUrl}>
                          <Award className="h-3 w-3 mr-1" />
                          Apply
                        </Link>
                      </Button>
                    )}
                    {resource.registrationUrl && (
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={resource.registrationUrl}>
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
        </div>
      </section>

      {/* Resource Categories Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Explore by Category</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
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
            
            <Card className="text-center hover:shadow-lg transition-shadow">
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
            
            <Card className="text-center hover:shadow-lg transition-shadow">
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
            
            <Card className="text-center hover:shadow-lg transition-shadow">
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
            
            <Card className="text-center hover:shadow-lg transition-shadow">
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
            
            <Card className="text-center hover:shadow-lg transition-shadow">
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
