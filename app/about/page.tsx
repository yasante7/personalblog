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
                    Currently pursuing Master of Philosophy in Economics with a focus on applied microeconomics, and development
                    economics.
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
                    Research Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-700 dark:text-gray-400">

                  {/* Monetary Policy Research */}
                  <div className="space-y-1">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                      Department of Economics – KNUST
                    </h4>
                    <p className="font-semibold">Topic: Monetary Policy and Macroeconomic Performance in Ghana</p>
                    <p className=" text-gray-600 dark:text-gray-400">Kumasi, Ghana • 2023</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Objective: Examine the effectiveness of monetary policy in stabilizing price levels and promoting economic growth in Ghana</li>
                      <li>Method: Autoregressive Distributed Lag (ARDL) model</li>
                      <li>Result: Positive relationship between monetary policy and inflation in both short and long run; mixed effects on real GDP</li>
                      <li>Supervisor: Prof. Grace Nkansah Asante</li>
                    </ul>
                  </div>

                  {/* Research Assistantship – Renewable Energy */}
                  <div className="space-y-1">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                      Research Assistantship – Department of Economics, KNUST
                    </h4>
                    <p className="font-semibold">Topic: Impact of Renewable Energy on Carbon Emissions</p>
                    <p className="text-gray-600 dark:text-gray-400">Kumasi, Ghana • Jan. 2024 - March 2024</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Objective: Analyze the role of renewable energy consumption in reducing carbon emissions</li>
                      <li>Method: ARDL regression-based approach</li>
                      <li>Lead Researcher: Dr. Elliot Boateng</li>
                      <li>Role: Assisted with data collection and literature review</li>
                    </ul>
                  </div>

                  {/* Enumerator – Food & Climate Change */}
                  <div className="space-y-1">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                      Enumerator – Department of Economics, KNUST
                    </h4>
                    <p className="font-semibold">Topic: Food Consumption and Adaptation to Climate Change: The Case of Ghana</p>
                    <p className="text-gray-600 dark:text-gray-400">Kumasi, Ghana • October 2024</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Objective: Understand the effects of climate change on food production and farmers’ adaptation strategies</li>
                      <li>Lead Researchers: Dr. Prince Boakye Frimpong, Dr. Frank Adusah‑Poku, Dr. John Bosco Dramani</li>
                      <li>Role: Enumerator</li>
                    </ul>
                  </div>

                  {/* Enumerator & Team Lead – Solar Market */}
                  <div className="space-y-1">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                      Enumerator & Team Lead – Brew-Hammond Energy Centre, KNUST
                    </h4>
                    <p className="font-semibold">Topic: Market Development and Capacity Building for the Supply of Solar Products in Ghana</p>
                    <p className="text-gray-600 dark:text-gray-400">Kumasi, Ghana • November 2024</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Objective: Identify key drivers of market development and capacity building for solar product supply chains</li>
                      <li>Lead Researchers: Dr. Prince Boakye Frimpong, Dr. Frank Adusah‑Poku, Dr. John Bosco Dramani</li>
                      <li>Role: Enumerator and Team Leader</li>
                    </ul>
                  </div>
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
                      <div className="w-2 h-2 bg-blue-100 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Applied Microeconomics</span>
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
                  <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Teaching Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Python for Data Science */}
                  <div className="space-y-1">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                      Lead Organizer, May 2023<br />
                      <span className="text-blue-600 font-semibold">Python for Data Science —  Virtual</span>
                    </h4>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 pl-2">
                      <li>Collaborated with 4 Data Scientists from Ghana and Cameroon</li>
                      <li>Trained ~180 participants on data science applications for real-world problems</li>
                      <li>Led the session on <span className="font-semibold text-gray-800 dark:text-gray-200">NumPy for Data Scientists</span></li>
                    </ul>
                  </div>

                  {/* Teaching Assistantship */}
                  <div className="space-y-1">
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                      Teaching Assistantship <span className="text-gray-300">—Nov. 2023 - Sept. 2024</span>
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      <span className="text-blue-600 font-semibold">Department of Economics, KNUST</span>
                    </p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 pl-2">
                      <li>ECON 457 – International Economics I</li>
                      <li>ECON 458 – International Economics II</li>
                      <li>ECON 251 – Principles of Economics I</li>
                      <li>ECON 252 – Principles of Economics II</li>
                    </ul>
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
                    <h4 className="font-medium text-sm">Economic Analysis of Forestry Resource Allocation in Ghana: Trends, Optimal Utilization, and Sustainable Management Strategies</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Term Paper, Resource Economics</p>
                  </div>
                  {/* <div>
                    <h4 className="font-medium text-sm">AI Tools for Students</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Curating productivity resources</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">Economics Blog</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Making economics accessible</p>
                  </div> */}
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
