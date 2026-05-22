'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Star, Users, Clock, Search, X } from 'lucide-react';
import { courses, categories } from '@/lib/mock-data';

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'rating' | 'students' | 'price'>('rating');

  const filtered = useMemo(() => {
    let result = courses;

    // Filter by category
    if (selectedCategory) {
      result = result.filter((c) => c.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query) ||
          c.category.toLowerCase().includes(query)
      );
    }

    // Sort
    const sorted = [...result];
    if (sortBy === 'rating') {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'students') {
      sorted.sort((a, b) => b.students - a.students);
    } else if (sortBy === 'price') {
      sorted.sort((a, b) => a.price - b.price);
    }

    return sorted;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Explore Courses</h1>
          <p className="text-lg opacity-90">
            Choose from {courses.length} courses and start learning today
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <X size={18} className="text-muted-foreground" />
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Category
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === null
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === cat.name
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-secondary'
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="students">Most Popular</option>
                  <option value="price">Price: Low to High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Course Grid */}
          <div className="lg:col-span-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No courses found. Try adjusting your filters.
                </p>
                <Button onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    Showing {filtered.length} of {courses.length} courses
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filtered.map((course) => (
                    <Link
                      key={course.id}
                      href={`/course/${course.slug}`}
                      className="group"
                    >
                      <div className="bg-card rounded-lg overflow-hidden border border-border h-full flex flex-col hover:shadow-lg transition-shadow">
                        {/* Image */}
                        <div className="relative h-40 overflow-hidden bg-muted">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-semibold">
                            {course.level}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col">
                          <span className="text-xs font-semibold text-primary mb-2">
                            {course.category}
                          </span>

                          <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {course.title}
                          </h3>

                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                            {course.description}
                          </p>

                          {/* Instructor */}
                          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                            <img
                              src={course.instructor.avatar}
                              alt={course.instructor.name}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-foreground truncate">
                                {course.instructor.name}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {course.instructor.title}
                              </p>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                            <div>
                              <div className="flex items-center gap-1">
                                <Star size={12} className="text-accent fill-accent" />
                                <span className="font-semibold text-foreground">
                                  {course.rating}
                                </span>
                              </div>
                              <p className="text-muted-foreground">{course.reviews}K</p>
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <Users size={12} className="text-accent" />
                                <span className="font-semibold text-foreground">
                                  {(course.students / 1000).toFixed(1)}K
                                </span>
                              </div>
                              <p className="text-muted-foreground">Students</p>
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <Clock size={12} className="text-accent" />
                                <span className="font-semibold text-foreground">
                                  {course.duration}
                                </span>
                              </div>
                              <p className="text-muted-foreground">Duration</p>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
                            <span className="text-lg font-bold text-primary">
                              ${course.price}
                            </span>
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90"
                            >
                              Enroll
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
