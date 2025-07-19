import Link from 'next/link';
import Image from 'next/image';

export function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-gray-900">Kwame Asante</div>
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
              <Link href="/projects" className="text-gray-700 hover:text-gray-900 transition-colors">
                Projects
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </nav>
  )
}