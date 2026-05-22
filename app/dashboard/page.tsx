'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import {
  User,
  LogOut,
  Settings,
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Zap,
} from 'lucide-react';
import { courses, enrollments, studentProfile, getCourseBySlug } from '@/lib/mock-data';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'certificates'>(
    'overview'
  );

  const enrolledCourses = enrollments.map((enrollment) => {
    const course = courses.find((c) => c.id === enrollment.courseId);
    return { course, enrollment };
  });

  const completedCourses = enrolledCourses.filter(
    (e) => e.enrollment.status === 'Completed'
  );
  const inProgressCourses = enrolledCourses.filter(
    (e) => e.enrollment.status === 'In Progress'
  );

  const totalHours = enrolledCourses.reduce((sum, e) => {
    if (!e.course) return sum;
    const weeks = parseInt(e.course.duration);
    return sum + weeks * 10; // Rough estimate
  }, 0);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-primary text-primary-foreground py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Welcome back, {studentProfile.name}!
              </h1>
              <p className="opacity-90">Continue your learning journey</p>
            </div>
            <div className="hidden md:flex gap-3">
              <Button
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <Settings size={18} />
              </Button>
              <Button
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                <LogOut size={18} />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80 mb-2">Courses Enrolled</p>
              <p className="text-2xl font-bold">{enrolledCourses.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80 mb-2">Completed</p>
              <p className="text-2xl font-bold">{completedCourses.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80 mb-2">Learning Hours</p>
              <p className="text-2xl font-bold">{totalHours}+</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <p className="text-sm opacity-80 mb-2">Certificates</p>
              <p className="text-2xl font-bold">{completedCourses.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border overflow-x-auto">
          {(['overview', 'courses', 'certificates'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors capitalize whitespace-nowrap ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'overview' ? 'Overview' : tab === 'courses' ? 'My Courses' : 'Certificates'}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Continue Learning */}
              {inProgressCourses.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Continue Learning
                  </h2>
                  <div className="space-y-4">
                    {inProgressCourses.map(({ course, enrollment }) => {
                      if (!course) return null;
                      return (
                        <Link
                          key={course.id}
                          href={`/course/${course.slug}`}
                          className="block group"
                        >
                          <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="flex flex-col sm:flex-row">
                              {/* Image */}
                              <div className="sm:w-32 h-40 sm:h-32 overflow-hidden flex-shrink-0 bg-muted">
                                <img
                                  src={course.image}
                                  alt={course.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>

                              {/* Content */}
                              <div className="flex-1 p-4 flex flex-col justify-between">
                                <div>
                                  <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                    {course.title}
                                  </h3>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {course.instructor.name}
                                  </p>
                                </div>

                                <div className="space-y-2">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">Progress</span>
                                    <span className="font-semibold text-foreground">
                                      {enrollment.progress}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-muted rounded-full h-2">
                                    <div
                                      className="bg-primary h-full rounded-full transition-all"
                                      style={{ width: `${enrollment.progress}%` }}
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Action */}
                              <div className="sm:flex items-center pr-4 py-4 sm:py-0">
                                <Button
                                  size="sm"
                                  className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                                >
                                  Continue
                                  <ArrowRight size={16} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Learning Stats
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <Zap size={24} className="text-primary mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Streak</p>
                    <p className="text-2xl font-bold text-foreground">7 days</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <Clock size={24} className="text-primary mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">This Week</p>
                    <p className="text-2xl font-bold text-foreground">12 hrs</p>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <Star size={24} className="text-primary mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Avg Rating</p>
                    <p className="text-2xl font-bold text-foreground">4.7/5</p>
                  </div>
                </div>
              </div>

              {/* Recommended */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-foreground">
                    Recommended for You
                  </h2>
                  <Link
                    href="/courses"
                    className="text-primary hover:text-primary/80 transition-colors text-sm font-semibold"
                  >
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.slice(0, 2).map((course) => (
                    <Link
                      key={course.id}
                      href={`/course/${course.slug}`}
                      className="group"
                    >
                      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full">
                        <div className="h-40 overflow-hidden bg-muted">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-4">
                          <span className="text-xs font-semibold text-primary">
                            {course.category}
                          </span>
                          <h3 className="font-bold text-foreground mt-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {course.title}
                          </h3>
                          <div className="flex items-center gap-1 mt-2">
                            <Star size={14} className="text-accent fill-accent" />
                            <span className="text-xs font-semibold text-foreground">
                              {course.rating}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({course.reviews}K)
                            </span>
                          </div>
                          <p className="text-lg font-bold text-primary mt-3">
                            ${course.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-center mb-4">
                  <img
                    src={studentProfile.avatar}
                    alt={studentProfile.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-3"
                  />
                  <h3 className="font-bold text-foreground text-lg">
                    {studentProfile.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{studentProfile.email}</p>
                </div>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  {studentProfile.bio}
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#">Edit Profile</Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-lg p-6 space-y-3">
                <h3 className="font-bold text-foreground mb-4">Quick Stats</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Join Date</span>
                  <span className="text-foreground font-semibold">
                    {new Date(studentProfile.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Courses</span>
                  <span className="text-foreground font-semibold">
                    {enrolledCourses.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="text-foreground font-semibold">
                    {completedCourses.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Learning Hours</span>
                  <span className="text-foreground font-semibold">{totalHours}+</span>
                </div>
              </div>

              {/* Help */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Visit our help center or contact support
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {inProgressCourses.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">In Progress</h2>
                <div className="space-y-4">
                  {inProgressCourses.map(({ course, enrollment }) => {
                    if (!course) return null;
                    return (
                      <div
                        key={course.id}
                        className="bg-card border border-border rounded-lg p-6"
                      >
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                          <div className="flex-1">
                            <h3 className="font-bold text-foreground text-lg mb-1">
                              {course.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {course.instructor.name}
                            </p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-semibold text-foreground">
                                  {enrollment.progress}%
                                </span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2 max-w-xs">
                                <div
                                  className="bg-primary h-full rounded-full"
                                  style={{ width: `${enrollment.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          <Button
                            asChild
                            className="bg-primary hover:bg-primary/90 flex-shrink-0"
                          >
                            <Link href={`/course/${course.slug}`}>Continue</Link>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {completedCourses.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Completed</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedCourses.map(({ course, enrollment }) => {
                    if (!course) return null;
                    return (
                      <Link
                        key={course.id}
                        href={`/course/${course.slug}`}
                        className="group"
                      >
                        <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full">
                          <div className="relative h-40 overflow-hidden bg-muted">
                            <img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <div className="text-center text-white">
                                <CheckCircle size={32} className="mx-auto mb-2" />
                                <p className="text-sm font-semibold">Completed</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                              {course.title}
                            </h3>
                            <div className="flex items-center gap-1 mt-2">
                              <Award size={14} className="text-primary" />
                              <p className="text-xs text-primary font-semibold">
                                Certificate Available
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">My Certificates</h2>
            {completedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedCourses.map(({ course, enrollment }) => {
                  if (!course) return null;
                  return (
                    <div key={course.id} className="bg-gradient-to-br from-accent to-primary/20 border-2 border-accent rounded-lg p-8 text-center">
                      <Award size={48} className="mx-auto mb-4 text-accent-foreground" />
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Certificate of Completion
                      </h3>
                      <p className="text-lg font-semibold text-primary mb-2">
                        {course.title}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Completed on{' '}
                        {new Date(enrollment.enrolledDate).toLocaleDateString()}
                      </p>
                      <Button
                        variant="outline"
                        className="bg-white/20 border-accent text-accent hover:bg-white/30"
                      >
                        Download Certificate
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-4">
                  Complete courses to earn certificates
                </p>
                <Button asChild>
                  <Link href="/courses">Browse Courses</Link>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
