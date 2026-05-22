import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary/50 text-primary px-4 py-2 rounded-full w-fit">
              <span className="inline-block w-2 h-2 bg-accent rounded-full" />
              <span className="text-sm font-medium">New courses added weekly</span>
            </div>

            {/* Main Title */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
                Learn From the Best, <span className="text-primary">Anytime, Anywhere</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
                Join thousands of students learning cutting-edge skills from world-class instructors. Start your journey today with our comprehensive online courses.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="/courses" className="gap-2">
                  Explore Courses
                  <ArrowRight size={20} />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
              >
                <Play size={20} />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-foreground">50+</div>
                <p className="text-sm text-muted-foreground">Expert Instructors</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">150K+</div>
                <p className="text-sm text-muted-foreground">Active Students</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">300+</div>
                <p className="text-sm text-muted-foreground">Quality Courses</p>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative hidden lg:block">
            <div className="relative h-full min-h-[500px]">
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl" />

              {/* Featured Course Card */}
              <div className="absolute top-12 right-0 bg-card rounded-2xl shadow-xl border border-border p-6 w-80 hover:shadow-2xl transition-shadow">
                <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1677442d019cecf8d7ee12aae30619648?w=400&h=300&fit=crop"
                    alt="Featured Course"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  Machine Learning Fundamentals
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  by Dr. Sarah Chen
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-foreground">4.8</span>
                    <span className="text-xs text-muted-foreground">(3.2K reviews)</span>
                  </div>
                  <div className="text-sm font-bold text-primary">$199</div>
                </div>
              </div>

              {/* Student Progress Card */}
              <div className="absolute bottom-0 left-0 bg-card rounded-2xl shadow-xl border border-border p-6 w-72 hover:shadow-2xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop"
                    alt="Student"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">Alex Johnson</p>
                    <p className="text-xs text-muted-foreground">Learning from Dr. Sarah</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">Course Progress</p>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-full rounded-full" style={{ width: '65%' }} />
                  </div>
                  <p className="text-xs text-muted-foreground text-right">65% Complete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
