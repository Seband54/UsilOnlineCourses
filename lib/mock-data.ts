export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  students: number;
  image: string;
  instructor: Instructor;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  learningPoints: string[];
  syllabus: {
    title: string;
    lessons: string[];
  }[];
}

export interface StudentEnrollment {
  courseId: string;
  enrolledDate: string;
  progress: number;
  status: 'In Progress' | 'Completed';
}

export const categories: Category[] = [
  { id: '1', name: 'Computer Science', icon: '💻' },
  { id: '2', name: 'Business', icon: '📊' },
  { id: '3', name: 'Design', icon: '🎨' },
  { id: '4', name: 'Marketing', icon: '📈' },
  { id: '5', name: 'Development', icon: '⚙️' },
  { id: '6', name: 'Data Science', icon: '📊' },
];

export const instructors: Instructor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'Machine Learning Expert',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    bio: 'PhD in Computer Science from MIT. 10+ years of experience in machine learning and AI.',
  },
  {
    id: '2',
    name: 'Prof. Michael Rodriguez',
    title: 'Business Strategy Professor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    bio: 'MBA from Stanford. Led multiple successful ventures in the tech industry.',
  },
  {
    id: '3',
    name: 'Jessica Liu',
    title: 'UX Design Specialist',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    bio: 'Senior Design Lead at top tech companies. Passionate about user-centered design.',
  },
  {
    id: '4',
    name: 'James Morrison',
    title: 'Web Development Expert',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    bio: 'Full-stack developer with 15+ years experience. Built scalable web applications.',
  },
  {
    id: '5',
    name: 'Dr. Priya Patel',
    title: 'Data Science Leader',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    bio: 'PhD in Statistics. Published researcher in data science and analytics.',
  },
];

export const courses: Course[] = [
  {
    id: '1',
    slug: 'machine-learning-fundamentals',
    title: 'Machine Learning Fundamentals',
    description: 'Master the basics of ML with hands-on projects',
    fullDescription:
      'Learn the fundamentals of machine learning from industry experts. This comprehensive course covers supervised and unsupervised learning, neural networks, and practical implementations using Python and TensorFlow.',
    category: 'Computer Science',
    price: 199,
    rating: 4.8,
    reviews: 3245,
    students: 15430,
    image: 'https://images.unsplash.com/photo-1677442d019cecf8d7ee12aae30619648?w=500&h=300&fit=crop',
    instructor: instructors[0],
    duration: '8 weeks',
    level: 'Intermediate',
    learningPoints: [
      'Understand ML algorithms and their applications',
      'Build predictive models with scikit-learn',
      'Work with neural networks using TensorFlow',
      'Deploy ML models to production',
      'Optimize model performance and hyperparameters',
    ],
    syllabus: [
      {
        title: 'Introduction to Machine Learning',
        lessons: ['What is ML?', 'Types of Learning', 'Real-world Applications'],
      },
      {
        title: 'Supervised Learning',
        lessons: ['Linear Regression', 'Logistic Regression', 'Decision Trees'],
      },
      {
        title: 'Unsupervised Learning',
        lessons: ['K-Means Clustering', 'Hierarchical Clustering', 'Dimensionality Reduction'],
      },
      {
        title: 'Neural Networks',
        lessons: ['Perceptrons', 'Deep Learning', 'Convolutional Neural Networks'],
      },
      {
        title: 'Model Deployment',
        lessons: ['API Development', 'Cloud Deployment', 'Monitoring & Maintenance'],
      },
    ],
  },
  {
    id: '2',
    slug: 'digital-marketing-strategy',
    title: 'Digital Marketing Strategy',
    description: 'Create successful marketing campaigns in the digital era',
    fullDescription:
      'Learn to develop and execute effective digital marketing strategies. This course covers SEO, SEM, social media marketing, content strategy, analytics, and ROI optimization.',
    category: 'Marketing',
    price: 149,
    rating: 4.7,
    reviews: 2156,
    students: 11230,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab8c51b6f?w=500&h=300&fit=crop',
    instructor: instructors[1],
    duration: '6 weeks',
    level: 'Beginner',
    learningPoints: [
      'Master SEO and search marketing',
      'Create effective social media strategies',
      'Develop content that converts',
      'Analyze marketing metrics and ROI',
      'Run profitable paid advertising campaigns',
    ],
    syllabus: [
      {
        title: 'Digital Marketing Basics',
        lessons: ['Marketing Fundamentals', 'Digital Ecosystem', 'Customer Journey'],
      },
      {
        title: 'Search Marketing',
        lessons: ['SEO Fundamentals', 'Keyword Research', 'Technical SEO', 'Link Building'],
      },
      {
        title: 'Social Media Marketing',
        lessons: ['Platform Strategies', 'Content Creation', 'Community Management'],
      },
      {
        title: 'Analytics & Optimization',
        lessons: ['Google Analytics', 'Conversion Optimization', 'A/B Testing'],
      },
    ],
  },
  {
    id: '3',
    slug: 'ux-design-principles',
    title: 'UX Design Principles',
    description: 'Design beautiful and usable digital products',
    fullDescription:
      'Comprehensive guide to creating exceptional user experiences. Learn design thinking, user research, wireframing, prototyping, and usability testing.',
    category: 'Design',
    price: 169,
    rating: 4.9,
    reviews: 2789,
    students: 13456,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
    instructor: instructors[2],
    duration: '7 weeks',
    level: 'Beginner',
    learningPoints: [
      'Master design thinking methodology',
      'Conduct effective user research',
      'Create wireframes and prototypes',
      'Apply UX principles to real projects',
      'Test and validate designs with users',
    ],
    syllabus: [
      {
        title: 'Design Fundamentals',
        lessons: ['Design Thinking', 'User Research', 'Personas & User Stories'],
      },
      {
        title: 'Wireframing & Prototyping',
        lessons: ['Wireframe Creation', 'Interactive Prototypes', 'Usability Testing'],
      },
      {
        title: 'Visual Design',
        lessons: ['Color Theory', 'Typography', 'Consistency & Systems'],
      },
      {
        title: 'Portfolio & Tools',
        lessons: ['Figma Mastery', 'Building Your Portfolio', 'Case Studies'],
      },
    ],
  },
  {
    id: '4',
    slug: 'web-development-bootcamp',
    title: 'Web Development Bootcamp',
    description: 'Become a full-stack web developer in 12 weeks',
    fullDescription:
      'Intensive bootcamp covering everything you need to become a web developer. Learn HTML, CSS, JavaScript, React, Node.js, and databases.',
    category: 'Development',
    price: 299,
    rating: 4.6,
    reviews: 4123,
    students: 18900,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop',
    instructor: instructors[3],
    duration: '12 weeks',
    level: 'Beginner',
    learningPoints: [
      'Master HTML, CSS, and JavaScript',
      'Build responsive websites',
      'Learn React and modern frontend',
      'Backend development with Node.js',
      'Database design and SQL',
      'Deploy applications to production',
    ],
    syllabus: [
      {
        title: 'Frontend Fundamentals',
        lessons: ['HTML & CSS', 'JavaScript Basics', 'DOM Manipulation'],
      },
      {
        title: 'Modern Frontend',
        lessons: ['React Fundamentals', 'State Management', 'Hooks & Context'],
      },
      {
        title: 'Backend Development',
        lessons: ['Node.js & Express', 'RESTful APIs', 'Authentication'],
      },
      {
        title: 'Databases',
        lessons: ['SQL Basics', 'Database Design', 'ORMs & Migrations'],
      },
      {
        title: 'Deployment',
        lessons: ['Version Control', 'Cloud Deployment', 'DevOps Basics'],
      },
    ],
  },
  {
    id: '5',
    slug: 'advanced-data-science',
    title: 'Advanced Data Science',
    description: 'Deep dive into data science and analytics',
    fullDescription:
      'Advanced data science course covering statistical analysis, predictive modeling, big data technologies, and practical real-world applications.',
    category: 'Data Science',
    price: 249,
    rating: 4.8,
    reviews: 1876,
    students: 8540,
    image: 'https://images.unsplash.com/photo-1518511254916-b7ce47b68bb4?w=500&h=300&fit=crop',
    instructor: instructors[4],
    duration: '10 weeks',
    level: 'Advanced',
    learningPoints: [
      'Statistical analysis and hypothesis testing',
      'Advanced ML algorithms',
      'Big data technologies (Spark, Hadoop)',
      'Time series forecasting',
      'Data visualization and storytelling',
    ],
    syllabus: [
      {
        title: 'Statistical Foundations',
        lessons: ['Probability & Statistics', 'Hypothesis Testing', 'Distributions'],
      },
      {
        title: 'Advanced Modeling',
        lessons: ['Ensemble Methods', 'Gradient Boosting', 'Deep Learning'],
      },
      {
        title: 'Big Data',
        lessons: ['Apache Spark', 'Distributed Computing', 'Data Engineering'],
      },
      {
        title: 'Specialized Topics',
        lessons: ['NLP & Text Analysis', 'Computer Vision', 'Recommender Systems'],
      },
    ],
  },
  {
    id: '6',
    slug: 'business-strategy-fundamentals',
    title: 'Business Strategy Fundamentals',
    description: 'Learn strategic thinking for business leaders',
    fullDescription:
      'Comprehensive business strategy course covering competitive analysis, strategic planning, market positioning, and execution frameworks.',
    category: 'Business',
    price: 189,
    rating: 4.7,
    reviews: 1654,
    students: 7890,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    instructor: instructors[1],
    duration: '8 weeks',
    level: 'Intermediate',
    learningPoints: [
      'Strategic analysis frameworks',
      'Competitive positioning',
      'Business model innovation',
      'Organizational strategy',
      'Performance management',
    ],
    syllabus: [
      {
        title: 'Strategic Foundations',
        lessons: ['Strategy Basics', 'Vision & Mission', 'Competitive Advantage'],
      },
      {
        title: 'Analysis & Planning',
        lessons: ['Market Analysis', 'SWOT Analysis', 'Strategic Planning'],
      },
      {
        title: 'Execution',
        lessons: ['Implementation', 'Change Management', 'Performance Metrics'],
      },
    ],
  },
];

export const enrollments: StudentEnrollment[] = [
  {
    courseId: '1',
    enrolledDate: '2024-01-15',
    progress: 65,
    status: 'In Progress',
  },
  {
    courseId: '2',
    enrolledDate: '2023-12-01',
    progress: 100,
    status: 'Completed',
  },
  {
    courseId: '3',
    enrolledDate: '2024-02-20',
    progress: 35,
    status: 'In Progress',
  },
  {
    courseId: '4',
    enrolledDate: '2024-03-10',
    progress: 15,
    status: 'In Progress',
  },
];

export const studentProfile = {
  id: 'student-001',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  joinDate: '2023-08-15',
  bio: 'Passionate learner interested in tech and business',
};

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getEnrollmentsByCourseId(courseId: string): StudentEnrollment | undefined {
  return enrollments.find((e) => e.courseId === courseId);
}

export function getRelatedCourses(courseId: string, limit: number = 3): Course[] {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return [];

  return courses
    .filter((c) => c.id !== courseId && c.category === course.category)
    .slice(0, limit);
}
