'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">U</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg text-foreground">USIL</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/courses"
              className="text-foreground hover:text-primary transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/courses">Explore Courses</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link
              href="/courses"
              className="block text-foreground hover:text-primary transition-colors py-2"
            >
              Courses
            </Link>
            <Link
              href="/"
              className="block text-foreground hover:text-primary transition-colors py-2"
            >
              About
            </Link>
            <Link
              href="/"
              className="block text-foreground hover:text-primary transition-colors py-2"
            >
              Contact
            </Link>
            <div className="pt-3 space-y-2">
              <Button variant="ghost" asChild className="w-full justify-start">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
