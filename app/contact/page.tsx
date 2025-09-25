"use client"

import Link from "next/link"
import { useState } from "react"
import { Mail, Linkedin, Github, MapPin, Phone, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Navbar } from "@/app/components/navbar"

interface FormData {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "Thank you for your message. I'll get back to you soon.",
        })
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        toast({
          title: "Error sending message",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Network error. Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Navigation */}
      < Navbar />

      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            I'd love to hear from you! Whether you have questions about my research, want to collaborate on a project,
            or just want to connect, feel free to reach out.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-blue-600" />
                  Send Me a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Your first name" 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Your last name" 
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?" 
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me more about your inquiry..." 
                      rows={6} 
                      required 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">yasante.official@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600">Kumasi, Ghana</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">+233 54 359 2218</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Connect With Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link
                      href="https://www.linkedin.com/in/yasante7/"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-500 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">LinkedIn</p>
                        <p className="text-sm text-gray-600">Connect professionally</p>
                      </div>
                    </Link>
                    <Link
                      href="https://github.com/yasante7/"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-500 transition-colors"
                    >
                      <Github className="h-5 w-5 text-gray-900" />
                      <div>
                        <p className="font-medium">GitHub</p>
                        <p className="text-sm text-gray-600">View my code and projects</p>
                      </div>
                    </Link>
                    <Link
                      href="mailto:yasante.official@gmail.com"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-500 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-gray-600">Direct email contact</p>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
{/* 
              <Card>
                <CardHeader>
                  <CardTitle>Office Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday</span>
                      <span className="font-medium">10:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">Response time: Usually within 24 hours</p>
                </CardContent>
              </Card> */}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Are you available for research collaboration?</h3>
                <p className="text-gray-600">
                  Yes! I'm always interested in collaborating on research projects related to economics, data science,
                  and AI applications. Feel free to reach out with your ideas.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Do you offer tutoring or consulting services?</h3>
                <p className="text-gray-600">
                  I occasionally provide tutoring for economics and data science topics, especially for fellow students.
                  Contact me to discuss your specific needs and availability.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Can you speak at events or workshops?</h3>
                <p className="text-gray-600">
                  I'm open to speaking opportunities, especially those focused on making economics and technology more
                  accessible to students. Please provide details about your event.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
