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
                <CardContent className="space-y-6 text-gray-700 dark:text-gray-400">
                  <div className="space-y-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">MPhil Economics</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Jan. 2025 - Present</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-600 dark:text-gray-300 font-semibold">Kwame Nkrumah University of Science and Technology (KNUST)</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Kumasi - Ghana</p>
                    </div>
                  </div>
                    {/* <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                      Currently pursuing Master of Philosophy in Economics with a focus on applied microeconomics, and development
                      economics.
                    </p> */}
                  <div className="space-y-1">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">BA Economics</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Sept. 2019 - Nov. 2023</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p className="text-gray-600 dark:text-gray-300 font-semibold">Kwame Nkrumah University of Science and Technology (KNUST)</p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Kumasi - Ghana</p>
                    </div>
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

                  {/* Research Assistantship – Renewable Energy */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm mb-2">
                      <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                        Research Assistant – Department of Economics, KNUST
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">Jan. 2024 - March 2024</p>
                    </div>
                    <p className="font-semibold">Topic: Impact of Renewable Energy on Carbon Emissions</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Objective: Analyze the role of renewable energy consumption in reducing carbon emissions</li>
                      <li>Method: ARDL regression-based approach</li>
                      <li>Lead Researcher: Dr. Elliot Boateng</li>
                      <li>Role: Assisted with data collection and literature review</li>
                    </ul>
                  </div>

                  {/* Enumerator – Food & Climate Change */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm mb-2">
                      <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                        Research Assistant – Department of Economics, KNUST
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">October 2024</p>
                    </div>
                    <p className="font-semibold">Topic: Food Consumption and Adaptation to Climate Change: The Case of Ghana</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Objective: Examine the effects of climate change on food production and how farmers adapt</li>
                      <li>Lead Researchers: Prof. John Bosco Dramani, Dr. Prince Boakye Frimpong, Dr. Frank Adusah‑Poku</li>
                      <li>Role: Data Enumerator and Data Cleaning</li>
                      {/* Create an Italicized text for a special function performed*/}
                      {/* <li className="italic text-sm text-gray-500">
                        Collapsed climate data in .netcd file to a dataframe to allow processing with Stata
                      </li> */}
                    </ul>
                  </div>

                  {/* Enumerator & Team Lead – Solar Market */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm mb-2">
                      <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                        Enumerator & Team Lead – Brew-Hammond Energy Centre, KNUST
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">November 2024</p>
                    </div>
                    <p className="font-semibold">Topic: Market Development and Capacity Building for the Supply of Solar Products in Ghana.</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Objective: Identify key drivers of market development and capacity building for solar product supply chain in Ghana.</li>
                      <li>Lead Researchers: Prof. John Bosco Dramani, Dr. Prince Boakye Frimpong, Dr. Frank Adusah‑Poku</li>
                      <li>Role: Enumerator and Team Leader</li>
                    </ul>
                  </div>

                  {/* Monetary Policy Research */}
                  <div className="space-y-1">
                    {/* Put location and date at the margins apart */}
                    <div className="flex justify-between text-sm mb-2">
                      <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                        Dissertation - Department of Economics, KNUST
                      </h4>
                      <p className=" text-gray-500 ">September, 2023</p>
                    </div>
                    <p className="font-semibold">Topic: Monetary Policy and Macroeconomic Performance in Ghana</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Objective: Examine the effectiveness of monetary policy in stabilizing price levels and promoting economic growth in Ghana</li>
                      <li>Method: Autoregressive Distributed Lag (ARDL) model</li>
                      <li>Result: Positive relationship between monetary policy and inflation in both short and long run; mixed effects on real GDP</li>
                      <li>Supervisor: Prof. Grace Nkansah Asante</li>
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
                    <div className="flex justify-between text-sm mb-2">
                      <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                        Lead Organizer - Virtual
                      </h4>
                      <p className=" text-gray-500 ">May, 2023</p>
                    </div>
                    <p className="text-blue-600 font-semibold">Python for Data Science Workshop</p>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 pl-2">
                      <li>Collaborated with 4 Data Scientists from Ghana and Cameroon</li>
                      <li>Trained about 180 participants on data science applications for real-world problems</li>
                      <li>Led the session on <span className="italic">NumPy for Data Science</span></li>
                    </ul>
                  </div>

                  {/* Teaching Assistantship */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm mb-2">
                      <h4 className="text-lg font-medium text-gray-800 dark:text-white">
                        Teaching Assistant
                      </h4>
                      <p className=" text-gray-500 ">Nov. 2023 - Sept. 2024</p>
                    </div>
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
                    <h4 className="font-medium text-sm">Optimal Allocation and Sustainable Management of Ghana’s Forest Resources: A Dynamic Optimization Approach</h4>
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
