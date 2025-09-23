import Link from 'next/link';
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Yaw Asante</h3>
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
          <div className='grid grid-cols-2 gap-8'>
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
                  <Link href="/resources" className="hover:text-white transition-colors">
                    Econ Resources
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
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Yaw Asante. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}