import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Profile
  app.get(api.profile.get.path, async (req, res) => {
    const profile = await storage.getProfile();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  });

  // Experiences
  app.get(api.experiences.list.path, async (req, res) => {
    const experiences = await storage.getExperiences();
    res.json(experiences);
  });

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  // Skills
  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Education
  app.get(api.education.list.path, async (req, res) => {
    const education = await storage.getEducation();
    res.json(education);
  });

  // Music Recommendations
  app.get(api.musicRecs.list.path, async (req, res) => {
    const music = await storage.getMusicRecs();
    res.json(music);
  });

  // Book Recommendations
  app.get(api.bookRecs.list.path, async (req, res) => {
    const books = await storage.getBookRecs();
    res.json(books);
  });

  // Movie Recommendations
  app.get(api.movieRecs.list.path, async (req, res) => {
    const movies = await storage.getMovieRecs();
    res.json(movies);
  });

  // Writings
  app.get(api.writings.list.path, async (req, res) => {
    const writings = await storage.getWritings();
    res.json(writings);
  });

  // Achievements
  app.get(api.achievements.list.path, async (req, res) => {
    const achievements = await storage.getAchievements();
    res.json(achievements);
  });

  // Blog Posts
  app.get(api.blogPosts.list.path, async (req, res) => {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  });

  app.get("/api/blog/:slug", async (req, res) => {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log("Contact form submission:", { name, email, subject, message });
    res.json({ success: true, message: "Message received" });
  });

  // Seed data if empty
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const profile = await storage.getProfile();
  const existingMusic = await storage.getMusicRecs();
  const existingBooks = await storage.getBookRecs();
  const existingWritings = await storage.getWritings();
  
  if (!profile) {
    console.log("Seeding database...");
    
    await storage.createProfile({
      name: "Sourav Rajvi",
      title: "Software Engineer",
      bio: "Backend engineer specializing in Node.js, AWS cloud infrastructure, and microservices architecture. Experienced in building scalable systems processing 10,000+ transactions daily with 99.9% uptime. Strong background in distributed systems, database optimization, and LLM integration.",
      avatarUrl: null,
      githubUrl: "https://github.com/Souravrajvi0",
      linkedinUrl: "https://www.linkedin.com/in/souravrajvi/",
      email: "souravrajvi@gmail.com"
    });

    await storage.createExperience({
      company: "AGSuite Technologies",
      role: "Software Engineer",
      duration: "Nov 2024 - Present",
      description: "• Architected AWS middleware integrating NetSuite with Zoho Books, processing 10,000+ PDFs daily using EC2 Auto Scaling, SQS, Lambda, S3, and RDS PostgreSQL, achieving 99.9% uptime and 75% faster processing.\n• Deployed infrastructure with CloudFormation and CloudWatch monitoring, implementing S3 lifecycle policies reducing storage costs by 60% while maintaining audit compliance.",
      order: 1
    });

    await storage.createExperience({
      company: "AGSuite Technologies",
      role: "Associate Software Engineer",
      duration: "May 2024 - Nov 2024",
      description: "• Integrated Large Language Model capabilities using OpenAI API with prompt engineering and response streaming to automate document analysis and data extraction for 1,000+ financial records daily, reducing manual data entry by 70%.\n• Built LLM middleware service with Node.js and Express.js implementing rate limiting, error handling, and retry logic for robust API integration.\n• Developed RESTful API endpoints using RESTlet and Suitelet scripts in NetSuite to process LLM responses and integrate with backend workflows.\n• Implemented token optimization strategies and response caching mechanisms, reducing API costs by 40% while maintaining processing accuracy.",
      order: 2
    });

    await storage.createProject({
      title: "TaskMaster - Distributed Task Scheduling System",
      description: "• Architected microservices task scheduler with Node.js, gRPC, and PostgreSQL, supporting horizontal scaling to 50+ workers processing 1,000+ concurrent tasks with sub-10ms latency.\n• Implemented round-robin load balancing and heartbeat failure detection, achieving zero data loss through automatic task reassignment.\n• Built RESTful API with real-time monitoring, optimizing PostgreSQL queries with SKIP LOCKED achieving <100ms latency.",
      techStack: ["Node.js", "gRPC", "PostgreSQL", "Microservices"],
      link: null,
      githubLink: "https://github.com/Souravrajvi0",
      order: 1
    });

    await storage.createProject({
      title: "LSM Database Engine",
      description: "• Engineered LSM Tree storage engine in TypeScript achieving 3,500 ops/sec write throughput and <1ms read latency, implementing database primitives used in Cassandra and RocksDB.\n• Optimized read performance by 90% through Bloom filter integration (92% hit rate) and sparse indexing, reducing disk I/O across 1,270+ lines of code.\n• Built Write-Ahead Log crash recovery and multi-level compaction strategy, reducing read amplification by 50% and disk usage by 30-40%.",
      techStack: ["TypeScript", "Node.js"],
      link: null,
      githubLink: "https://github.com/Souravrajvi0",
      order: 2
    });

    await storage.createProject({
      title: "IPO Tracker System",
      description: "• Developed real-time IPO tracking platform with Node.js processing live market data feeds, implementing WebSocket for sub-second updates to 500+ concurrent users.\n• Built RESTful API with Express.js integrating financial data providers, implementing Redis caching reducing response time by 65%.\n• Designed MongoDB pipeline processing 100K+ records with optimized indexing achieving <50ms query times.",
      techStack: ["Node.js", "Express.js", "MongoDB", "WebSocket", "Redis"],
      link: null,
      githubLink: "https://github.com/Souravrajvi0",
      order: 3
    });

    await storage.createSkill({
      category: "Backend Technologies",
      items: ["Node.js", "Express.js", "NestJS", "RESTful APIs", "gRPC", "Microservices", "WebSocket"],
      order: 1
    });

    await storage.createSkill({
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "C++", "Java"],
      order: 2
    });

    await storage.createSkill({
      category: "Cloud & Infrastructure",
      items: ["AWS (EC2, Lambda, S3, SQS, RDS, CloudWatch, Auto Scaling)", "CloudFormation", "Docker"],
      order: 3
    });

    await storage.createSkill({
      category: "Databases",
      items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "DynamoDB"],
      order: 4
    });

    await storage.createSkill({
      category: "Tools & DevOps",
      items: ["Git", "GitHub Actions", "Docker", "Jest", "CI/CD"],
      order: 5
    });

    await storage.createEducation({
      institution: "Bangalore Institute of Technology",
      degree: "Bachelor of Engineering in Electronics and Communication Engineering",
      year: "2024",
      order: 1
    });
    
    console.log("Database seeded successfully.");
  }

  // Seed new tables if empty (for existing databases)
  if (existingMusic.length === 0) {
    console.log("Seeding music recommendations...");
    await storage.createMusicRec({
      title: "Bohemian Rhapsody",
      artist: "Queen",
      genre: "Rock",
      note: "A masterpiece of musical storytelling",
      order: 1
    });
    await storage.createMusicRec({
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      genre: "Rock",
      note: "Timeless guitar work",
      order: 2
    });
    await storage.createMusicRec({
      title: "Blinding Lights",
      artist: "The Weeknd",
      genre: "Synth-pop",
      note: "Perfect coding soundtrack",
      order: 3
    });
  }

  if (existingBooks.length === 0) {
    console.log("Seeding book recommendations...");
    await storage.createBookRec({
      title: "Clean Code",
      author: "Robert C. Martin",
      genre: "Programming",
      note: "Essential reading for every developer",
      order: 1
    });
    await storage.createBookRec({
      title: "The Pragmatic Programmer",
      author: "David Thomas & Andrew Hunt",
      genre: "Programming",
      note: "Career-changing perspectives on software craft",
      order: 2
    });
    await storage.createBookRec({
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self-improvement",
      note: "Small changes, remarkable results",
      order: 3
    });
  }

  if (existingWritings.length === 0) {
    console.log("Seeding writings...");
    await storage.createWriting({
      title: "Building Scalable APIs with Node.js",
      description: "A comprehensive guide to designing and implementing RESTful APIs that can handle millions of requests.",
      link: null,
      publishedAt: "2024",
      order: 1
    });
    await storage.createWriting({
      title: "My Journey into Backend Development",
      description: "Reflections on transitioning from electronics engineering to software development.",
      link: null,
      publishedAt: "2024",
      order: 2
    });
  }

  const existingAchievements = await storage.getAchievements();
  if (existingAchievements.length === 0) {
    console.log("Seeding achievements...");
    await storage.createAchievement({
      title: "LeetCode Top 10%",
      issuer: "LeetCode",
      date: "2024",
      description: "Earned a LeetCode rating of 1905 by solving over 500 complex algorithmic challenges; positioned in the top 10%.",
      credentialUrl: null,
      type: "achievement",
      order: 1
    });
  }

  const existingBlogPosts = await storage.getBlogPosts();
  if (existingBlogPosts.length === 0) {
    console.log("Seeding blog posts...");
    await storage.createBlogPost({
      title: "Getting Started with Node.js in 2024",
      slug: "getting-started-with-nodejs-2024",
      content: "Node.js continues to be one of the most popular runtime environments for building server-side applications. In this post, I'll share my experience and tips for getting started.\n\nFirst, make sure you have the latest LTS version installed. Then, familiarize yourself with npm and the vast ecosystem of packages available.\n\nKey concepts to master:\n- Asynchronous programming with Promises and async/await\n- Event-driven architecture\n- Building RESTful APIs with Express.js\n- Database integration with MongoDB or PostgreSQL\n\nThe Node.js community is incredibly active and supportive. Don't hesitate to ask questions and share your projects!",
      excerpt: "A comprehensive guide for developers looking to start their Node.js journey in 2024.",
      publishedAt: "January 2024",
      tags: ["Node.js", "JavaScript", "Backend"],
      order: 1
    });
    await storage.createBlogPost({
      title: "Why TypeScript Changed My Development Workflow",
      slug: "why-typescript-changed-my-workflow",
      content: "As a JavaScript developer, I was initially skeptical about TypeScript. Why add complexity when JavaScript works just fine?\n\nBut after using TypeScript for six months, I can confidently say it has transformed how I write code.\n\nBenefits I've experienced:\n- Catch bugs at compile time, not runtime\n- Better IDE support with autocomplete and refactoring\n- Self-documenting code through type annotations\n- Easier collaboration with team members\n\nIf you're on the fence about TypeScript, I encourage you to give it a try on your next project. The learning curve is worth it!",
      excerpt: "My journey from JavaScript to TypeScript and why I'm never going back.",
      publishedAt: "December 2023",
      tags: ["TypeScript", "JavaScript", "Development"],
      order: 2
    });
  }
}
