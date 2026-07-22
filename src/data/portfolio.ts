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

  // Social & coding links
  email: "wanirohan21@gmail.com",
  github: "https://github.com/wani21",
  linkedin: "https://www.linkedin.com/in/rohan-wani-82b2062bb/",
  leetcode: "https://leetcode.com/u/ok_Rohan/",
  gfg: "https://www.geeksforgeeks.org/profile/wanirohan21",
  resumeUrl: "/resume.pdf",
};

export const typewriterRoles = [
  "scalable full-stack web apps",
  "enterprise backend microservices",
  "AI-powered smart applications",
  "high-performance REST APIs",
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
  longDescription: string;
  techStack: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
}

export const projects: Project[] = [
  {
    title: "SamaySetu",
    description:
      "AI-assisted timetable management platform for educational institutes with role-based access, intelligent scheduling, conflict detection, and automated timetable generation.",
    longDescription:
      "SamaySetu is a comprehensive AI-assisted timetable management platform built specifically for educational institutes. It solves the complex problem of academic scheduling by leveraging intelligent algorithms to detect conflicts, balance workloads, and auto-generate optimized timetables. The system features a multi-role architecture supporting admins, faculty, and students — each with a tailored dashboard and access controls. Faculty can mark availability, admins can manage subjects and rooms, and the AI engine handles the rest by producing conflict-free schedules in seconds instead of days.",
    features: [
      "Role-Based Access Control for Admin, Faculty, and Students",
      "AI-powered conflict detection and auto-scheduling engine",
      "Interactive drag-and-drop timetable editor",
      "Real-time notifications for schedule changes",
      "Export timetables to PDF and Excel formats",
      "Responsive dashboard with analytics and usage stats",
    ],
    techStack: [
      "Spring Boot",
      "React",
      "TypeScript",
      "MySQL",
      "JWT",
      "Tailwind CSS",
    ],
    category: "Full Stack",
    githubUrl: "https://github.com/wani21/samaysetu",
    liveUrl: "https://samaysetu.vercel.app",
  },
  {
    title: "Mini Core Banking System",
    description:
      "Enterprise banking application supporting customer onboarding, Video KYC, transactions, fixed deposits, Razorpay integration, JWT authentication, and role-based security.",
    longDescription:
      "Mini Core Banking System is a production-grade banking application that simulates the core operations of a modern bank. It handles customer onboarding with Video KYC verification, manages accounts, processes fund transfers, and supports fixed deposit creation with auto-maturity handling. The payment gateway integration via Razorpay enables seamless top-ups and withdrawals. Security is enforced at every layer using Spring Security with JWT tokens, ensuring that sensitive financial data is protected with industry-standard practices.",
    features: [
      "Customer onboarding with Video KYC verification flow",
      "Razorpay payment gateway integration for deposits & withdrawals",
      "Fixed deposit creation with auto-maturity tracking",
      "JWT-based authentication with Spring Security",
      "Fund transfers between accounts with transaction history",
      "Admin panel for customer and account management",
    ],
    techStack: [
      "Spring Boot",
      "React",
      "MySQL",
      "Spring Security",
      "JWT",
      "Razorpay",
    ],
    category: "Full Stack",
    githubUrl: "https://github.com/wani21/mini-core-banking",
    liveUrl: "https://banking-demo.vercel.app",
  },
  {
    title: "GastroLens AI",
    description:
      "Deep learning-powered gastrointestinal disease detection system using endoscopic images with explainable AI through Grad-CAM visualization.",
    longDescription:
      "GastroLens AI is a medical deep learning system designed to assist gastroenterologists in identifying gastrointestinal diseases from endoscopic images. The model, built on a fine-tuned ResNet50 architecture, achieves high diagnostic accuracy and pairs its predictions with Grad-CAM heatmaps — a powerful explainability technique that highlights the exact regions of the image that influenced the model's decision. The Flask API backend serves predictions in real time, while the frontend provides an intuitive upload-and-diagnose interface for clinical use.",
    features: [
      "ResNet50-based deep learning model for disease classification",
      "Grad-CAM explainability heatmaps for medical transparency",
      "Real-time endoscopic image analysis via Flask REST API",
      "Support for multiple GI disease categories",
      "Confidence scores and diagnostic reports",
      "HIPAA-conscious data handling patterns",
    ],
    techStack: [
      "Python",
      "TensorFlow",
      "OpenCV",
      "ResNet50",
      "Flask",
      "Grad-CAM",
    ],
    category: "AI / ML",
    githubUrl: "https://github.com/wani21/gastrolens-ai",
    liveUrl: "https://gastrolens.streamlit.app",
  },
  {
    title: "Nexora ERP",
    description:
      "Modern enterprise asset management platform featuring dashboards, asset tracking, maintenance, bookings, employee management, and role-based access control.",
    longDescription:
      "Nexora ERP is a full-featured enterprise resource planning platform tailored for asset-intensive organizations. It provides a centralized hub for tracking physical and digital assets, scheduling preventive maintenance, managing employee records, and booking shared resources. The real-time analytics dashboard gives management deep visibility into asset utilization and operational efficiency. Built with a microservices-ready Spring Boot backend and a sleek Next.js frontend, Nexora ERP is designed to scale with growing enterprises.",
    features: [
      "Centralized asset tracking with QR code integration",
      "Preventive maintenance scheduling and alert system",
      "Employee management and department-wise access control",
      "Resource booking system with calendar view",
      "Real-time analytics dashboard with charts and KPIs",
      "Role-based access for Admin, Manager, and Employee tiers",
    ],
    techStack: [
      "Spring Boot",
      "Next.js",
      "PostgreSQL",
      "JWT",
      "Tailwind CSS",
      "Chart.js",
    ],
    category: "Full Stack",
    githubUrl: "https://github.com/wani21/nexora-erp",
    liveUrl: "https://nexora-erp.vercel.app",
  },
  {
    title: "PrepAI",
    description:
      "AI-powered JEE preparation platform offering adaptive learning, personalized tests, analytics dashboards, and intelligent recommendations.",
    longDescription:
      "PrepAI is an intelligent JEE examination preparation platform that adapts to each student's unique learning curve. Using OpenAI's APIs, it generates personalized practice questions based on weak topic analysis, simulates full-length mock tests, and provides detailed post-test analytics. The platform tracks progress across subjects and chapters, recommends targeted study material, and gamifies the preparation journey to keep students motivated. The FastAPI backend ensures low-latency AI responses for a smooth learning experience.",
    features: [
      "Adaptive AI question generation using OpenAI API",
      "Personalized weak-topic analysis and recommendations",
      "Full-length JEE mock tests with timed simulation",
      "Detailed post-test analytics and performance trends",
      "Chapter-wise and subject-wise progress tracking",
      "Gamified learning with streaks and achievement badges",
    ],
    techStack: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "OpenAI",
      "Python",
      "Recharts",
    ],
    category: "AI / ML",
    githubUrl: "https://github.com/wani21/prepai",
    liveUrl: "https://prepai-jee.vercel.app",
  },
  {
    title: "DocuMitra",
    description:
      "Smart document verification and management platform developed for Smart India Hackathon with AI-assisted automation.",
    longDescription:
      "DocuMitra was built for the Smart India Hackathon to address the critical challenge of document fraud and manual verification bottlenecks in government services. The platform uses AI-powered OCR and document parsing to extract, validate, and cross-verify information from uploaded documents in seconds. It provides a secure document vault for citizens, an admin portal for officials to review flagged documents, and an audit trail of all verifications. DocuMitra aims to bring transparency and speed to India's document verification ecosystem.",
    features: [
      "AI-powered OCR for automated data extraction from documents",
      "Cross-verification against government databases",
      "Secure citizen document vault with encryption",
      "Admin portal with fraud flagging and review workflows",
      "Complete audit trail and verification history",
      "Multi-format support: Aadhaar, PAN, Marksheets, and more",
    ],
    techStack: [
      "Spring Boot",
      "React",
      "MySQL",
      "AI / OCR",
      "Spring Security",
      "JWT",
    ],
    category: "Hackathon",
    githubUrl: "https://github.com/wani21/documitra",
    liveUrl: "https://documitra.vercel.app",
  },
];

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  credentialUrl?: string;
  badgeIcon?: string;
  color: string; // tailwind-compatible gradient stops
}

export const certifications: Certification[] = [
  {
    name: "Java Full Stack Development",
    issuer: "Super30",
    date: "2025",
    description:
      "An intensive Java Full Stack Development program covering enterprise-grade backend development with Spring Boot, RESTful API design, Spring Security with JWT, and modern frontend development with React. The course emphasized building production-ready applications with real-world architecture patterns, database design with MySQL, and best practices in software engineering.",
    skills: [
      "Spring Boot",
      "Spring Security",
      "JWT Authentication",
      "REST APIs",
      "React",
      "MySQL",
      "Hibernate / JPA",
      "Maven",
    ],
    badgeIcon: "SiJava",
    color: "from-orange-500 to-red-500",
    credentialUrl: "https://www.super30.org/certificates/java-fullstack",
  },
  {
    name: "Cisco Networking Academy",
    issuer: "Cisco",
    date: "2025",
    description:
      "Completed Cisco's globally recognized Networking Academy program covering the fundamentals of computer networking, IP addressing, routing protocols, switching technologies, and network security. Gained hands-on experience configuring Cisco routers and switches using Packet Tracer simulations, and developed a solid understanding of LAN/WAN architectures and troubleshooting methodologies.",
    skills: [
      "IP Addressing & Subnetting",
      "Routing Protocols (OSPF, RIP)",
      "LAN / WAN Architecture",
      "Network Security Basics",
      "Cisco Packet Tracer",
      "Switching & VLANs",
      "Troubleshooting",
      "TCP / IP Stack",
    ],
    badgeIcon: "SiCisco",
    color: "from-blue-500 to-cyan-400",
    credentialUrl: "https://www.cisco.com/c/en/us/training-events/training-certifications.html",
  },
  {
    name: "AWS Cloud Foundations",
    issuer: "Amazon Web Services",
    date: "2025",
    description:
      "Completed the AWS Cloud Foundations certification, an introductory program that builds a broad understanding of cloud computing concepts, core AWS services, security, architecture, pricing, and support models. Covered key services including EC2, S3, RDS, VPC, IAM, and Lambda, providing a strong foundation for cloud-native application development and deployment on the AWS ecosystem.",
    skills: [
      "AWS EC2 & S3",
      "IAM & Security",
      "VPC & Networking",
      "AWS Lambda (Serverless)",
      "RDS & DynamoDB",
      "Cloud Architecture",
      "Pricing & Billing",
      "AWS CLI",
    ],
    badgeIcon: "SiAmazonwebservices",
    color: "from-amber-400 to-orange-500",
    credentialUrl: "https://aws.amazon.com/training/awsacademy/",
  },
  {
    name: "Python Programming",
    issuer: "Campus Credentials",
    date: "2025",
    description:
      "Completed a comprehensive Python programming certification covering Python fundamentals, object-oriented programming, data structures, file handling, and an introduction to data science libraries. The curriculum included hands-on projects using NumPy, Pandas, and Matplotlib for data manipulation and visualization, along with practical exposure to machine learning workflows using Scikit-learn.",
    skills: [
      "Python Fundamentals",
      "Object-Oriented Programming",
      "NumPy & Pandas",
      "Matplotlib & Seaborn",
      "File Handling & APIs",
      "Scikit-learn Basics",
      "Data Visualization",
      "Jupyter Notebooks",
    ],
    badgeIcon: "SiPython",
    color: "from-blue-400 to-yellow-400",
    credentialUrl: "https://campuscredentials.com/certificates/python",
  },
];