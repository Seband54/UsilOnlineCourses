'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  Star,
  Users,
  Clock,
  BookOpen,
  CheckCircle,
  ArrowLeft,
  Share2,
  Heart,
} from 'lucide-react';
import { getCourseBySlug, getRelatedCourses } from '@/lib/mock-data';

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = getCourseBySlug(slug);
  const relatedCourses = course ? getRelatedCourses(course.id, 3) : [];

  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'reviews'>(
    'overview'
  );
  const [isFavorite, setIsFavorite] = useState(false);

  if (!course) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Course not found</h1>
          <Button asChild>
            <Link href="/courses">Back to Courses</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-primary text-primary-foreground py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 mb-6 opacity-90 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft size={20} />
            Back to Courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Content */}
            <div className="lg:col-span-2">
              <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {course.category}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">
                {course.title}
              </h1>
              <p className="text-lg opacity-90 mb-6">{course.description}</p>

              {/* Instructor Info */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{course.instructor.name}</p>
                  <p className="text-sm opacity-80">{course.instructor.title}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Star size={20} className="fill-accent text-accent" />
                  <div>
                    <p className="font-semibold">{course.rating}</p>
                    <p className="text-sm opacity-80">({course.reviews}K reviews)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <div>
                    <p className="font-semibold">{(course.students / 1000).toFixed(1)}K</p>
                    <p className="text-sm opacity-80">Students</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <div>
                    <p className="font-semibold">{course.duration}</p>
                    <p className="text-sm opacity-80">Course duration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enroll Card */}
            <div className="bg-card border border-border rounded-xl p-6 h-fit">
              <div className="relative h-48 overflow-hidden rounded-lg mb-6 bg-muted">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-3xl font-bold text-primary mb-4">${course.price}</div>

              <Button className="w-full bg-primary hover:bg-primary/90 mb-3" size="lg">
                Enroll Now
              </Button>

              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                <Heart
                  size={20}
                  className={isFavorite ? 'fill-accent text-accent' : ''}
                />
                {isFavorite ? 'Added to Wishlist' : 'Add to Wishlist'}
              </button>

              <div className="mt-6 space-y-3 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen size={18} />
                  <span>{course.syllabus.length} Modules</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={18} />
                  <span>Self-paced learning</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle size={18} />
                  <span>Certificate of completion</span>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4 gap-2">
                <Share2 size={18} />
                Share Course
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-border">
              {(['overview', 'syllabus', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-semibold border-b-2 transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    About This Course
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {course.fullDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    What You Will Learn
                  </h3>
                  <ul className="space-y-3">
                    {course.learningPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Course Level
                  </h3>
                  <p className="text-muted-foreground">
                    This is a{' '}
                    <span className="font-semibold text-foreground">{course.level}</span>{' '}
                    level course suitable for learners with{' '}
                    {course.level === 'Beginner'
                      ? 'no prior experience'
                      : course.level === 'Intermediate'
                      ? 'some foundational knowledge'
                      : 'advanced knowledge'}{' '}
                    in this field.
                  </p>
                </div>
              </div>
            )}

            {/* Syllabus Tab */}
            {activeTab === 'syllabus' && (
              <div className="space-y-4">
                {course.syllabus.map((module, idx) => (
                  <div
                    key={idx}
                    className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="bg-secondary p-4 cursor-pointer hover:bg-secondary/80 transition-colors">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        <BookOpen size={18} className="text-primary" />
                        Module {idx + 1}: {module.title}
                      </h3>
                    </div>
                    <div className="p-4 space-y-2">
                      {module.lessons.map((lesson, lidx) => (
                        <div key={lidx} className="flex items-center gap-3 text-muted-foreground">
                          <CheckCircle size={16} className="text-primary" />
                          <span>{lesson}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="text-center py-12">
                  <Star size={48} className="mx-auto mb-4 text-accent fill-accent" />
                  <h3 className="text-3xl font-bold text-foreground mb-2">
                    {course.rating} out of 5
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Based on {course.reviews}K reviews
                  </p>
                  <div className="w-full bg-muted rounded-full h-2 max-w-md mx-auto">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: `${(course.rating / 5) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-4 pt-6 border-t border-border">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4">
                      <img
                        src={`https://images.unsplash.com/photo-150${i}?w=40&h=40&fit=crop`}
                        alt="Reviewer"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-foreground">
                            Student {i}
                          </p>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, j) => (
                              <Star
                                key={j}
                                size={14}
                                className={`${
                                  j < 5 - (i % 2)
                                    ? 'text-accent fill-accent'
                                    : 'text-border'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Great course! Highly recommended for anyone wanting to learn {course.category.toLowerCase()}.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Instructor Card */}
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Your Instructor</h3>
              <div className="text-center">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                />
                <h4 className="font-semibold text-foreground">{course.instructor.name}</h4>
                <p className="text-sm text-primary mb-3">{course.instructor.title}</p>
                <p className="text-sm text-muted-foreground">{course.instructor.bio}</p>
              </div>
            </div>

            {/* Related Courses */}
            {relatedCourses.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Related Courses
                </h3>
                <div className="space-y-3">
                  {relatedCourses.map((relCourse) => (
                    <Link
                      key={relCourse.id}
                      href={`/course/${relCourse.slug}`}
                      className="block p-3 border border-border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <p className="font-semibold text-foreground text-sm line-clamp-2 hover:text-primary transition-colors">
                        {relCourse.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        ${relCourse.price}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs">
                        <Star size={12} className="text-accent fill-accent" />
                        <span className="text-muted-foreground">
                          {relCourse.rating} ({relCourse.reviews}K)
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
