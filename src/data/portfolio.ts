// ============================================================
// Portfolio Data - Rohan Wani
// ============================================================

export const personalInfo = {
  firstName: "Rohan",
  lastName: "Wani",
  initials: "RW",

  tagline:
    "Java Full Stack Developer | AI Enthusiast | Building scalable software with Spring Boot & React",

  bio: [
    "I'm a Computer Science undergraduate at MIT Academy of Engineering (MITAOE), Pune, passionate about building scalable full-stack applications, AI-powered solutions, and solving challenging Data Structures & Algorithms problems. I enjoy transforming ideas into production-ready software using modern technologies and clean architecture.",

    "My expertise spans Java, Spring Boot, React, Next.js, REST APIs, Microservices, Machine Learning, and Generative AI. I've built enterprise-grade applications, reached the Adobe India Hackathon Finals, participated in multiple national hackathons, and continuously improve my problem-solving skills through competitive programming and real-world projects.",
  ],

  // Update these links if required
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
  resumeUrl: "/resume.pdf",
};

export const typewriterRoles = [
  "Java Full Stack Developer",
  "Backend Developer",
  "AI/ML Developer",
  "Problem Solver",
];

export interface StatEntry {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

export const stats: StatEntry[] = [
  { value: 500, suffix: "+", label: "DSA Problems" },
  { value: 20, suffix: "+", label: "Projects" },
  { value: 3, suffix: "+", label: "Hackathons" },
  { value: 3, suffix: "", label: "Internships" },
];

export interface ExperienceEntry {
  dateRange: string;
  title: string;
  company: string;
  companyDescription?: string;
  liveUrl?: string;
  liveBadgeText?: string;
  bullets: string[];
}

export const experiences: ExperienceEntry[] = [
  {
    dateRange: "Jul 2026 – Aug 2026",
    title: "Full Stack Developer Intern",
    company: "Shree RevaTech",
    companyDescription: "Software Development",
    bullets: [
      "Developed scalable full-stack web applications using Spring Boot and React.",
      "Designed secure REST APIs with JWT Authentication and Role-Based Access Control.",
      "Worked on backend APIs, frontend integration, and MySQL database optimization.",
      "Collaborated in Agile development using Git and GitHub.",
    ],
  },
  {
    dateRange: "2025",
    title: "Data Science Intern",
    company: "Campus Credentials",
    companyDescription: "Machine Learning & Data Analytics",
    bullets: [
      "Worked on machine learning workflows using Python.",
      "Performed data preprocessing, visualization, and predictive analysis.",
      "Built analytical dashboards and reports.",
    ],
  },
  {
    dateRange: "2025",
    title: "Networking Virtual Intern",
    company: "Cisco Networking Academy",
    companyDescription: "Networking & Security",
    bullets: [
      "Learned networking fundamentals, routing, switching, and security concepts.",
      "Configured network topologies and troubleshooting scenarios.",
      "Explored real-world networking infrastructure and best practices.",
    ],
  },
];

export interface SkillCategory {
  name: string;
  iconKey: string;
  tags: SkillTag[];
}

export interface SkillTag {
  label: string;
  iconKey?: string;
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    iconKey: "SiJava",
    tags: [
      { label: "Java", iconKey: "SiJava" },
      { label: "Python", iconKey: "SiPython" },
      { label: "C++" },
      { label: "JavaScript", iconKey: "SiJavascript" },
      { label: "SQL" },
    ],
  },
  {
    name: "Frontend",
    iconKey: "SiReact",
    tags: [
      { label: "React", iconKey: "SiReact" },
      { label: "Next.js", iconKey: "SiNextdotjs" },
      { label: "TypeScript", iconKey: "SiTypescript" },
      { label: "Tailwind CSS", iconKey: "SiTailwindcss" },
      { label: "Bootstrap", iconKey: "SiBootstrap" },
    ],
  },
  {
    name: "Backend",
    iconKey: "SiSpringboot",
    tags: [
      { label: "Spring Boot", iconKey: "SiSpringboot" },
      { label: "Spring Security" },
      { label: "Spring MVC" },
      { label: "Hibernate" },
      { label: "JPA" },
      { label: "REST APIs" },
      { label: "JWT Authentication" },
      { label: "Microservices" },
    ],
  },
  {
    name: "Databases",
    iconKey: "SiMysql",
    tags: [
      { label: "MySQL", iconKey: "SiMysql" },
      { label: "PostgreSQL", iconKey: "SiPostgresql" },
      { label: "MongoDB", iconKey: "SiMongodb" },
    ],
  },
  {
    name: "AI / Machine Learning",
    iconKey: "SiOpenai",
    tags: [
      { label: "Generative AI" },
      { label: "OpenAI API" },
      { label: "RAG" },
      { label: "Embeddings" },
      { label: "Vector Databases" },
      { label: "TensorFlow" },
      { label: "PyTorch" },
    ],
  },
  {
    name: "Tools & Technologies",
    iconKey: "SiGit",
    tags: [
      { label: "Git", iconKey: "SiGit" },
      { label: "GitHub", iconKey: "SiGithub" },
      { label: "Docker", iconKey: "SiDocker" },
      { label: "AWS", iconKey: "SiAmazonwebservices" },
      { label: "Postman", iconKey: "SiPostman" },
      { label: "Maven" },
      { label: "Vercel" },
    ],
  },
];

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    title: "SamaySetu",
    description:
      "AI-assisted timetable management platform for educational institutes with role-based access, intelligent scheduling, conflict detection, and automated timetable generation.",
    techStack: [
      "Spring Boot",
      "React",
      "TypeScript",
      "MySQL",
      "JWT",
      "Tailwind CSS",
    ],
  },
  {
    title: "Mini Core Banking System",
    description:
      "Enterprise banking application supporting customer onboarding, Video KYC, transactions, fixed deposits, Razorpay integration, JWT authentication, and role-based security.",
    techStack: [
      "Spring Boot",
      "React",
      "MySQL",
      "Spring Security",
      "JWT",
    ],
  },
  {
    title: "GastroLens AI",
    description:
      "Deep learning-powered gastrointestinal disease detection system using endoscopic images with explainable AI through Grad-CAM visualization.",
    techStack: [
      "Python",
      "TensorFlow",
      "OpenCV",
      "ResNet50",
      "Flask",
    ],
  },
  {
    title: "Nexora ERP",
    description:
      "Modern enterprise asset management platform featuring dashboards, asset tracking, maintenance, bookings, employee management, and role-based access control.",
    techStack: [
      "Spring Boot",
      "Next.js",
      "PostgreSQL",
      "JWT",
      "Tailwind CSS",
    ],
  },
  {
    title: "PrepAI",
    description:
      "AI-powered JEE preparation platform offering adaptive learning, personalized tests, analytics dashboards, and intelligent recommendations.",
    techStack: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "OpenAI",
    ],
  },
  {
    title: "DocuMitra",
    description:
      "Smart document verification and management platform developed for Smart India Hackathon with AI-assisted automation.",
    techStack: [
      "Spring Boot",
      "React",
      "MySQL",
      "AI",
    ],
  },
];

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  badgeIcon?: string;
}

export const certifications: Certification[] = [
  {
    name: "Java Full Stack Development",
    issuer: "Super30",
    date: "2025",
    badgeIcon: "SiJava",
  },
  {
    name: "Cisco Networking Academy",
    issuer: "Cisco",
    date: "2025",
    badgeIcon: "SiCisco",
  },
  {
    name: "AWS Cloud Foundations",
    issuer: "Amazon Web Services",
    date: "2025",
    badgeIcon: "SiAmazonwebservices",
  },
  {
    name: "Python Programming",
    issuer: "Campus Credentials",
    date: "2025",
    badgeIcon: "SiPython",
  },
];