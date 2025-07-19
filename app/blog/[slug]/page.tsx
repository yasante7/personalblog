import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User, ArrowLeft, Linkedin, Twitter, Facebook, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/app/components/navbar"

// This would typically come from a CMS or database
const blogPost = {
  id: 1,
  title: "10 AI Tools Every Economics Student Should Know in 2024",
  slug: "10-ai-tools-economics-students-2024",
  excerpt:
    "Discover the most powerful AI tools that can revolutionize your economic research, data analysis, and academic writing.",
  content: `
# Introduction

As an MPhil Economics student at KNUST, I've discovered that integrating AI tools into my research workflow has been a game-changer. These tools don't just save time—they enhance the quality of analysis and open up new possibilities for economic research.

In this comprehensive guide, I'll share the 10 most impactful AI tools that every economics student should have in their toolkit in 2024.

## 1. ChatGPT & GPT-4 for Research Assistance

**What it does:** Advanced language model for research assistance, writing, and analysis
**Best for:** Literature reviews, hypothesis generation, and explaining complex concepts

ChatGPT has revolutionized how I approach research. Here's how I use it:

- **Literature Review Assistance**: I feed it abstracts and ask for summaries and connections between papers
- **Hypothesis Generation**: When stuck on research questions, I describe my data and ask for potential hypotheses
- **Writing Enhancement**: It helps refine academic writing and ensures clarity

**Pro Tip**: Always fact-check AI-generated content, especially for academic work. Use it as a starting point, not the final answer.

## 2. Claude for Deep Analysis

**What it does:** Advanced AI assistant with strong analytical capabilities
**Best for:** Complex data interpretation and econometric analysis explanation

Claude excels at breaking down complex econometric concepts and helping interpret results from statistical software.

## 3. Perplexity AI for Academic Research

**What it does:** AI-powered search engine with source citations
**Best for:** Finding recent research papers and getting cited summaries

Unlike ChatGPT, Perplexity provides sources for its answers, making it invaluable for academic research where citations are crucial.

## 4. Notion AI for Note-Taking and Organization

**What it does:** AI-powered workspace for notes, databases, and project management
**Best for:** Organizing research, creating study guides, and project management

I use Notion AI to:
- Summarize lecture notes
- Create study guides from my research
- Organize literature reviews with AI-generated tags and summaries

## 5. Grammarly for Academic Writing

**What it does:** AI-powered writing assistant
**Best for:** Improving academic writing quality and clarity

Essential for thesis writing and paper submissions. The academic writing suggestions are particularly helpful for economics papers.

## 6. Wolfram Alpha for Mathematical Computations

**What it does:** Computational knowledge engine
**Best for:** Complex mathematical calculations and statistical analysis

Perfect for econometric calculations and verifying mathematical work in economic models.

## 7. Tableau with AI Features for Data Visualization

**What it does:** Data visualization with AI-powered insights
**Best for:** Creating compelling visualizations for economic data

The AI features help identify patterns in data that might not be immediately obvious.

## 8. Python with AI Libraries (scikit-learn, TensorFlow)

**What it does:** Programming language with powerful AI/ML libraries
**Best for:** Advanced econometric analysis and machine learning applications

Essential for modern econometric analysis. I use it for:
- Causal inference analysis
- Time series forecasting
- Machine learning applications in economics

## 9. Zotero with AI Plugins

**What it does:** Reference management with AI-powered organization
**Best for:** Managing academic references and citations

The AI plugins help automatically categorize papers and suggest related research.

## 10. Obsidian with AI Plugins

**What it does:** Knowledge management system with AI enhancements
**Best for:** Building a connected knowledge base of economic concepts

Perfect for creating a personal wiki of economic theories and connecting different concepts.

## Getting Started: A Practical Approach

Here's my recommended approach for integrating these tools:

### Week 1-2: Foundation Tools
Start with ChatGPT, Grammarly, and Notion AI. These will immediately improve your daily workflow.

### Week 3-4: Research Enhancement
Add Perplexity AI and Zotero to enhance your research capabilities.

### Month 2: Advanced Analysis
Incorporate Python and Wolfram Alpha for more sophisticated analysis.

### Month 3: Specialization
Add Tableau and Obsidian based on your specific research needs.

## Cost Considerations

Many of these tools offer student discounts:

- **Free Tiers**: ChatGPT (limited), Perplexity AI, Notion (personal use)
- **Student Discounts**: Grammarly Premium, Tableau, many Python libraries are free
- **University Access**: Check if your institution provides access to premium versions

## Ethical Considerations

When using AI tools for academic work:

1. **Always disclose AI usage** when required by your institution
2. **Verify all facts and citations** independently
3. **Use AI as a tool, not a replacement** for critical thinking
4. **Respect academic integrity policies** at your institution

## Conclusion

These AI tools have transformed my approach to economics research and study. They've made me more efficient, helped me discover new insights, and improved the quality of my academic work.

The key is to start small, master a few tools, and gradually expand your toolkit based on your specific needs and research focus.

Remember: AI tools are powerful assistants, but they don't replace the critical thinking and domain expertise that make great economists.

---

*What AI tools have you found most helpful in your studies? Share your experiences in the comments below or reach out to me on LinkedIn.*
  `,
  author: "Yaw Asante",
  category: "AI Tools",
  date: "2024-01-15",
  readTime: "12 min read",
  image: "/placeholder.svg?height=400&width=800&text=AI+Tools+for+Economics",
  tags: ["AI Tools", "Productivity", "Research", "Economics", "Student Tips"],
}

const relatedPosts = [
  {
    id: 2,
    title: "Understanding Causal Inference: A Beginner's Guide with Python",
    slug: "causal-inference-python-guide",
    category: "Data Science",
    readTime: "15 min read",
    image: "/placeholder.svg?height=200&width=300&text=Causal+Inference",
  },
  {
    id: 3,
    title: "Student Discounts and Perks: Ultimate Guide for KNUST Students",
    slug: "student-discounts-knust-guide",
    category: "Student Perks",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=300&text=Student+Discounts",
  },
  {
    id: 4,
    title: "Building Your First Econometric Model in Python",
    slug: "first-econometric-model-python",
    category: "Data Science",
    readTime: "18 min read",
    image: "/placeholder.svg?height=200&width=300&text=Econometric+Model",
  },
]

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      < Navbar />
      {/* Back to Blog */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900">
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Badge */}
          <div className="mb-4">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{blogPost.category}</Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">{blogPost.title}</h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{blogPost.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(blogPost.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{blogPost.readTime}</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image src={blogPost.image || "/placeholder.svg"} alt={blogPost.title} fill className="object-cover" />
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b">
            <span className="text-sm font-medium text-gray-700">Share this article:</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-blue-600 hover:bg-blue-50 bg-transparent">
                <Linkedin className="h-4 w-4 mr-1" />
                LinkedIn
              </Button>
              <Button size="sm" variant="outline" className="text-blue-400 hover:bg-blue-50 bg-transparent">
                <Twitter className="h-4 w-4 mr-1" />
                Twitter
              </Button>
              <Button size="sm" variant="outline" className="text-blue-800 hover:bg-blue-50 bg-transparent">
                <Facebook className="h-4 w-4 mr-1" />
                Facebook
              </Button>
              <Button size="sm" variant="outline" className="text-gray-600 hover:bg-gray-50 bg-transparent">
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Article Content */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="prose prose-lg prose-gray max-w-none">
            <div className="text-xl text-gray-600 mb-8 leading-relaxed font-light">{blogPost.excerpt}</div>

            {/* Content would be rendered from markdown in a real app */}
            <div className="space-y-8 text-gray-800 leading-relaxed">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="mb-4">
                  As an MPhil Economics student at KNUST, I've discovered that integrating AI tools into my research
                  workflow has been a game-changer. These tools don't just save time—they enhance the quality of
                  analysis and open up new possibilities for economic research.
                </p>
                <p className="mb-6">
                  In this comprehensive guide, I'll share the 10 most impactful AI tools that every economics student
                  should have in their toolkit in 2024.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. ChatGPT & GPT-4 for Research Assistance</h2>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="font-semibold text-blue-900 mb-2">What it does:</p>
                  <p className="text-blue-800 mb-2">
                    Advanced language model for research assistance, writing, and analysis
                  </p>
                  <p className="font-semibold text-blue-900 mb-2">Best for:</p>
                  <p className="text-blue-800">
                    Literature reviews, hypothesis generation, and explaining complex concepts
                  </p>
                </div>
                <p className="mb-4">ChatGPT has revolutionized how I approach research. Here's how I use it:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>
                    <strong>Literature Review Assistance:</strong> I feed it abstracts and ask for summaries and
                    connections between papers
                  </li>
                  <li>
                    <strong>Hypothesis Generation:</strong> When stuck on research questions, I describe my data and ask
                    for potential hypotheses
                  </li>
                  <li>
                    <strong>Writing Enhancement:</strong> It helps refine academic writing and ensures clarity
                  </li>
                </ul>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <p className="font-semibold text-yellow-800 mb-2">Pro Tip:</p>
                  <p className="text-yellow-700">
                    Always fact-check AI-generated content, especially for academic work. Use it as a starting point,
                    not the final answer.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Claude for Deep Analysis</h2>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <p className="font-semibold text-green-900 mb-2">What it does:</p>
                  <p className="text-green-800 mb-2">Advanced AI assistant with strong analytical capabilities</p>
                  <p className="font-semibold text-green-900 mb-2">Best for:</p>
                  <p className="text-green-800">Complex data interpretation and econometric analysis explanation</p>
                </div>
                <p className="mb-6">
                  Claude excels at breaking down complex econometric concepts and helping interpret results from
                  statistical software.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started: A Practical Approach</h2>
                <p className="mb-4">Here's my recommended approach for integrating these tools:</p>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Week 1-2: Foundation Tools</h3>
                    <p className="text-gray-700">
                      Start with ChatGPT, Grammarly, and Notion AI. These will immediately improve your daily workflow.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Week 3-4: Research Enhancement</h3>
                    <p className="text-gray-700">Add Perplexity AI and Zotero to enhance your research capabilities.</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Month 2: Advanced Analysis</h3>
                    <p className="text-gray-700">
                      Incorporate Python and Wolfram Alpha for more sophisticated analysis.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Ethical Considerations</h2>
                <p className="mb-4">When using AI tools for academic work:</p>
                <ol className="list-decimal pl-6 space-y-2 mb-6">
                  <li>
                    <strong>Always disclose AI usage</strong> when required by your institution
                  </li>
                  <li>
                    <strong>Verify all facts and citations</strong> independently
                  </li>
                  <li>
                    <strong>Use AI as a tool, not a replacement</strong> for critical thinking
                  </li>
                  <li>
                    <strong>Respect academic integrity policies</strong> at your institution
                  </li>
                </ol>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
                <p className="mb-4">
                  These AI tools have transformed my approach to economics research and study. They've made me more
                  efficient, helped me discover new insights, and improved the quality of my academic work.
                </p>
                <p className="mb-4">
                  The key is to start small, master a few tools, and gradually expand your toolkit based on your
                  specific needs and research focus.
                </p>
                <p className="font-semibold text-gray-900">
                  Remember: AI tools are powerful assistants, but they don't replace the critical thinking and domain
                  expertise that make great economists.
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-semibold text-gray-900 mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Author Bio */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src="/placeholder.svg?height=120&width=120&text=Author"
                    alt="Yaw Asante"
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">About Yaw Asante</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    MPhil Economics student at KNUST with a passion for making economics and AI accessible to everyone.
                    Specializes in applied econometrics, data science, and productivity tools for academic research.
                  </p>
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/about">View Profile</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/contact">Get In Touch</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-40">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="text-xs mb-2">
                    {post.category}
                  </Badge>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{post.readTime}</p>
                  <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700" asChild>
                    <Link href={`/blog/${post.slug}`}>Read More →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Never Miss an Update</h2>
          <p className="text-lg text-gray-600 mb-8">
            Get the latest insights on AI tools, economics, and student resources delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 px-8">Subscribe</Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">Join 500+ students already subscribed. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  )
}
