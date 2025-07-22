import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BookOpen, Brain, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/app/components/navbar"
import { Footer } from "@/app/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Making Economics & AI
                <span className="text-blue-600"> Accessible</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
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
                    src="/self.jpg?height=300&width=300"
                    alt="Yaw Asante - MPhil Economics Student"
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black border-t-2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Areas of Expertise</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Combining economic theory with cutting-edge technology to solve real-world problems
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Brain className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 dark:text-white">AI & Productivity Tools</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Leveraging AI to enhance productivity and streamline economic research
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 dark:text-white">Data Science & Econometrics</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Advanced statistical analysis and econometric modeling using Python and R
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 dark:text-white">Economics Insights</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Breaking down complex economic concepts into digestible insights
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-orange-600 dark:text-orange-400 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 dark:text-white">Student Resources</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Curating valuable resources and perks for fellow students</p>
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About Me</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                I&apos;m currently pursuing my MPhil in Economics at Yaw Nkrumah University of Science and Technology
                (KNUST), where I focus on the intersection of economic theory and modern technology. My passion lies in
                making complex economic concepts accessible to students and professionals alike.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
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
      < Footer />
    </div>
  )
}
