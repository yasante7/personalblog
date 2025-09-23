"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ModeToggle } from './dark-mode';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <div className="font-bold text-xl text-gray-900 dark:text-white">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Logo" width={50} height={50} className='rounded-full filter invert dark:invert-0 transition-all duration-300' />
                        Yaw Asante
                    </Link>
                </div>
                
                {/* Desktop Navigation */}
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
                    <Link href="/resources" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                        Econ Resources
                    </Link>
                    <Link href="/contact" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                        Contact
                    </Link>
                    <ModeToggle />
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center space-x-2">
                    <ModeToggle />
                    <button
                        onClick={toggleMenu}
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700">
                        <Link 
                            href="/" 
                            className="block px-3 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/about" 
                            className="block px-3 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                        <Link 
                            href="/blog" 
                            className="block px-3 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link 
                            href="/resources" 
                            className="block px-3 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Econ Resources
                        </Link>
                        <Link 
                            href="/contact" 
                            className="block px-3 py-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </div>
    </nav>
  )
}