import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Brain, TrendingUp, Users, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/app/components/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Making Economics & AI
                <span className="text-blue-600"> Accessible</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                MPhil Economics student at KNUST, passionate about bridging the gap between complex economic theories
                and practical AI applications for students and professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/blog">
                    Read My Blog <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/projects">View Projects</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center shadow-lg">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Kwame Asante - MPhil Economics Student"
                    width={300}
                    height={300}
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Areas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Areas of Expertise</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Combining economic theory with cutting-edge technology to solve real-world problems
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">AI & Productivity Tools</h3>
                <p className="text-gray-600 text-sm">
                  Leveraging AI to enhance productivity and streamline economic research
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Data Science & Econometrics</h3>
                <p className="text-gray-600 text-sm">
                  Advanced statistical analysis and econometric modeling using Python and R
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Economics Insights</h3>
                <p className="text-gray-600 text-sm">
                  Breaking down complex economic concepts into digestible insights
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Student Resources</h3>
                <p className="text-gray-600 text-sm">Curating valuable resources and perks for fellow students</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Bio */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About Me</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                I&apos;m currently pursuing my MPhil in Economics at Kwame Nkrumah University of Science and Technology
                (KNUST), where I focus on the intersection of economic theory and modern technology. My passion lies in
                making complex economic concepts accessible to students and professionals alike.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                With expertise in Python, data science, and various AI tools, I bridge the gap between traditional
                economic analysis and cutting-edge technological solutions. I believe in the power of data-driven
                insights to solve real-world economic challenges.
              </p>
              <Button asChild variant="outline">
                <Link href="/about">
                  Learn More About Me <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Kwame Asante</h3>
              <p className="text-gray-400 mb-4">
                MPhil Economics Student at KNUST, passionate about AI, data science, and making economics accessible.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-white transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/blog?category=ai-tools" className="hover:text-white transition-colors">
                    AI Tools
                  </Link>
                </li>
                <li>
                  <Link href="/blog?category=economics" className="hover:text-white transition-colors">
                    Economics
                  </Link>
                </li>
                <li>
                  <Link href="/blog?category=data-science" className="hover:text-white transition-colors">
                    Data Science
                  </Link>
                </li>
                <li>
                  <Link href="/blog?category=student-perks" className="hover:text-white transition-colors">
                    Student Perks
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Kwame Asante. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
