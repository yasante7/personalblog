import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from './dark-mode';

export function Navbar() {
  return (
    <nav className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="font-bold text-xl text-gray-900 dark:text-white">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Logo" width={50} height={50} />
                        Yaw Asante
                    </Link>
                </div>
                <div className="hidden md:flex space-x-8 items-center">
                    <Link href="/" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                    Home
                    </Link>
                    <Link href="/about" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                    About
                    </Link>
                    <Link href="/blog" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                    Blog
                    </Link>
                    <Link href="/projects" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                    Projects
                    </Link>
                    <Link href="/contact" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                    Contact
                    </Link>
                    <ModeToggle />
                </div>
            </div>
        </div>
    </nav>
  )
}