import Link from "next/link"
import { GraduationCap, Code, TrendingUp, Users, Award, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/app/components/navbar"

export default function AboutPage() {
  const skills = [
    "Python",
    "R",
    "Stata",
    "SPSS",
    "GitHub",

    "Typescript",
    "Javascript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "SQL",
    "Tableau",
    "Power BI",
    "Prompt Engineering",
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">About Me</h1>
          <p className="text-xl leading-relaxed">
            Passionate about bridging the gap between economic theory and practical technology applications
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Bio */}
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                    Academic Background
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">MPhil Economics</h3>
                    <p className="text-gray-600 dark:text-gray-300">Kwame Nkrumah University of Science and Technology (KNUST)</p>
                    <p className="text-sm text-gray-500">2025 - Present</p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                    Currently pursuing advanced studies in Economics with a focus on applied econometrics, development
                    economics, and the integration of AI tools in economic research. My thesis explores the impact of
                    digital financial services on economic development in Ghana.
                  </p>
                  <div>
                    <h3 className="font-semibold text-lg">BA Economics</h3>
                    <p className="text-gray-600 dark:text-gray-300">Kwame Nkrumah University of Science and Technology (KNUST)</p>
                    <p className="text-sm text-gray-500">2019 - 2023</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Research Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Applied Econometrics and Causal Inference</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Environmental Economics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>AI and Productivity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Data Science for Policy Analysis</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    My Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
                    I believe that economics and technology should be accessible to everyone, not just academics. My
                    mission is to bridge the gap between complex economic theories and practical applications that can
                    benefit students, professionals, and policymakers.
                  </p>
                  <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                    Through my blog, projects, and resources, I aim to democratize knowledge and empower others to
                    leverage data science and AI tools in their economic analysis and decision-making processes.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-600" />
                    Technical Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium">Dean's List</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">KNUST Economics Department</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Research Assistant</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Economic Policy Research Centre</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Python Certification</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Data Science Specialization</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    Current Projects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium text-sm">Digital Finance Impact Study</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Thesis research on mobile money adoption</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">AI Tools for Students</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Curating productivity resources</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Economics Blog</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Making economics accessible</p>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button asChild className="w-full">
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
