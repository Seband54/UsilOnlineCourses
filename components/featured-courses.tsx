import Link from 'next/link';
import { Star, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { courses } from '@/lib/mock-data';

export function FeaturedCourses() {
  const featured = courses.slice(0, 3);

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            Featured Courses
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Start learning from industry experts today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.slug}`}
              className="group h-full"
            >
              <div className="bg-card rounded-lg overflow-hidden border border-border h-full flex flex-col hover:shadow-lg transition-shadow">
                {/* Course Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    {course.level}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-primary">
                      {course.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {course.description}
                  </p>

                  {/* Instructor */}
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-xs font-medium text-foreground">
                        {course.instructor.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {course.instructor.title}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={14} className="text-accent fill-accent" />
                        <span className="text-xs font-semibold text-foreground">
                          {course.rating}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{course.reviews}K</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users size={14} className="text-accent" />
                        <span className="text-xs font-semibold text-foreground">
                          {(course.students / 1000).toFixed(1)}K
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Clock size={14} className="text-accent" />
                        <span className="text-xs font-semibold text-foreground">
                          {course.duration}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
                    <div>
                      <p className="text-2xl font-bold text-primary">
                        ${course.price}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90"
          >
            <Link href="/courses">Browse All Courses</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
