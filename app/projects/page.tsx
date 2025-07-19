import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Github, Eye, Code, Database, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    id: 1,
    title: "Ghana Economic Dashboard",
    description:
      "Interactive dashboard visualizing key economic indicators for Ghana including GDP growth, inflation rates, and employment statistics using real-time data from Bank of Ghana.",
    tools: ["Python", "Streamlit", "Plotly", "Pandas", "Bank of Ghana API"],
    category: "Data Visualization",
    image: "/placeholder.svg?height=200&width=400",
    githubUrl: "#",
    liveUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Mobile Money Impact Analysis",
    description:
      "Econometric analysis of mobile money adoption on financial inclusion in rural Ghana. Uses difference-in-differences methodology with panel data from 2015-2023.",
    tools: ["Python", "Stata", "Pandas", "Statsmodels", "Matplotlib"],
    category: "Research",
    image: "/placeholder.svg?height=200&width=400",
    githubUrl: "#",
    notionUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "AI Study Assistant",
    description:
      "Chrome extension that helps students summarize academic papers, generate study notes, and create flashcards using OpenAI's GPT API. Built specifically for economics students.",
    tools: ["JavaScript", "Chrome Extension API", "OpenAI API", "HTML/CSS"],
    category: "AI Application",
    image: "/placeholder.svg?height=200&width=400",
    githubUrl: "#",
    chromeStoreUrl: "#",
    featured: false,
  },
  {
    id: 4,
    title: "Student Resource Hub",
    description:
      "Curated collection of free resources, tools, and discounts for university students. Features automated scraping of student deals and academic resources.",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Web Scraping"],
    category: "Web Application",
    image: "/placeholder.svg?height=200&width=400",
    githubUrl: "#",
    liveUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Econometrics Tutorial Series",
    description:
      "Comprehensive Jupyter notebooks teaching econometric concepts with practical Python implementations. Covers OLS, IV, DID, RDD, and panel data methods.",
    tools: ["Python", "Jupyter", "Statsmodels", "Scikit-learn", "Seaborn"],
    category: "Educational",
    image: "/placeholder.svg?height=200&width=400",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Productivity Tracker",
    description:
      "Personal productivity tracking app with time management features, goal setting, and analytics. Integrates with popular productivity tools and provides insights.",
    tools: ["React Native", "Firebase", "Chart.js", "AsyncStorage"],
    category: "Mobile App",
    image: "/placeholder.svg?height=200&width=400",
    githubUrl: "#",
    featured: false,
  },
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Data Visualization":
      return <Database className="h-4 w-4" />
    case "Research":
      return <Eye className="h-4 w-4" />
    case "AI Application":
      return <Brain className="h-4 w-4" />
    default:
      return <Code className="h-4 w-4" />
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Data Visualization":
      return "bg-blue-100 text-blue-800"
    case "Research":
      return "bg-green-100 text-green-800"
    case "AI Application":
      return "bg-purple-100 text-purple-800"
    case "Web Application":
      return "bg-orange-100 text-orange-800"
    case "Educational":
      return "bg-yellow-100 text-yellow-800"
    case "Mobile App":
      return "bg-pink-100 text-pink-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ProjectsPage() {
  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-xl text-gray-900">
              Kwame Asante
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-gray-900 transition-colors">
                Blog
              </Link>
              <Link href="/projects" className="text-gray-900 font-medium">
                Projects
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Projects & Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of my academic research, data science projects, and applications that bridge economics with
            modern technology. Each project demonstrates practical applications of economic theory and data analysis.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Projects</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative h-48">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">Featured</Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${getCategoryColor(project.category)} flex items-center gap-1`}>
                      {getCategoryIcon(project.category)}
                      {project.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="mb-4">
                    <h4 className="font-medium text-sm text-gray-900 mb-2">Tools Used:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.tools.map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={project.githubUrl}>
                          <Github className="h-4 w-4 mr-1" />
                          Code
                        </Link>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button size="sm" asChild>
                        <Link href={project.liveUrl}>
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                    {project.notionUrl && (
                      <Button size="sm" variant="outline" asChild>
                        <Link href={project.notionUrl}>
                          <Eye className="h-4 w-4 mr-1" />
                          Research
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

      {/* Other Projects */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Other Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-40">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
                <CardHeader className="pb-2">
                  <Badge className={`${getCategoryColor(project.category)} flex items-center gap-1 w-fit mb-2`}>
                    {getCategoryIcon(project.category)}
                    {project.category}
                  </Badge>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {project.tools.slice(0, 3).map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                      {project.tools.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.tools.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                        <Link href={project.githubUrl}>
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </Link>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={project.liveUrl}>
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View
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

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Collaboration?</h2>
          <p className="text-lg text-gray-300 mb-8">
            I'm always open to discussing new projects, research opportunities, or ways to make economics and technology
            more accessible to students and professionals.
          </p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
