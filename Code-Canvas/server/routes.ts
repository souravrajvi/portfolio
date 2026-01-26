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
      title: "Node.js Developer",
      bio: "Backend developer specializing in Node.js, cloud platforms, and building scalable API solutions. Experienced in NetSuite development and Google Cloud Platform integrations.",
      avatarUrl: null,
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com",
      email: "souravrajvi@gmail.com"
    });

    await storage.createExperience({
      company: "AGSuite Technologies",
      role: "Node.js Developer",
      duration: "May 2025 - Present",
      description: "Developed and deployed RESTlet and Suitelet scripts in NetSuite using JavaScript to build custom API endpoints and UI workflows. Handled client-side validation and automation with Client Scripts.",
      order: 1
    });

    await storage.createExperience({
      company: "Coding Ninjas",
      role: "Teaching Assistant",
      duration: "Aug 2024 - Mar 2025",
      description: "Coordinated resolution of 419 intricate Data Structures problems, resulting in a 95% student satisfaction rate. Secured a top 1% ranking among 60+ Teaching Assistants.",
      order: 2
    });

    await storage.createExperience({
      company: "Prinston Smart Engineers",
      role: "Software Engineer Intern",
      duration: "Jan 2024 - July 2024",
      description: "Architected an advanced Node.js and Google Cloud Platform application for seamless user file management on Google Drive, boosting user productivity by 20%.",
      order: 3
    });

    await storage.createProject({
      title: "Netflix-GPT",
      description: "Netflix-inspired web app with OpenAI API integration for GPT-based search functionality. Implemented Redux-toolkit for state management and Firebase for authentication.",
      techStack: ["React", "Redux", "Firebase", "OpenAI API", "TMDB API"],
      link: null,
      githubLink: "https://github.com",
      order: 1
    });

    await storage.createProject({
      title: "Discord Uplift Bot",
      description: "Discord bot using Discord.js library and Node.js, amplifying user engagement by 40% through regular encouragement and quotes.",
      techStack: ["Node.js", "Discord.js"],
      link: null,
      githubLink: "https://github.com",
      order: 2
    });

    await storage.createProject({
      title: "Hotel Management System",
      description: "Hotel booking app with an advanced CMS, cutting booking errors by 30% and improving user experience. Empowered hotel managers to create, update, and delete listings.",
      techStack: ["React", "Node.js", "MongoDB"],
      link: null,
      githubLink: "https://github.com",
      order: 3
    });

    await storage.createSkill({
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "C++", "Java", "YAML"],
      order: 1
    });

    await storage.createSkill({
      category: "Web Development",
      items: ["Node.js", "React", "Express.js", "Next.js", "Django", "Vue.js"],
      order: 2
    });

    await storage.createSkill({
      category: "Cloud & Databases",
      items: ["AWS (S3, EC2)", "MongoDB", "SQL", "DynamoDB"],
      order: 3
    });

    await storage.createSkill({
      category: "Tools",
      items: ["Git", "Docker", "GitHub Actions", "Jest"],
      order: 4
    });

    await storage.createEducation({
      institution: "Bangalore Institute of Technology",
      degree: "B.E. in Electronics and Communication Engineering",
      year: "2024",
      order: 1
    });

    // Music Recommendations (placeholder - user can customize)
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

    // Book Recommendations (placeholder - user can customize)
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

    // Writings (placeholder - user can customize)
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
      title: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "2024",
      description: "Demonstrated proficiency in developing, deploying, and debugging cloud-based applications using AWS.",
      credentialUrl: null,
      type: "certification",
      order: 1
    });
    await storage.createAchievement({
      title: "MongoDB Certified Developer",
      issuer: "MongoDB",
      date: "2024",
      description: "Certified in MongoDB application development and data modeling best practices.",
      credentialUrl: null,
      type: "certification",
      order: 2
    });
    await storage.createAchievement({
      title: "Top 1% Teaching Assistant",
      issuer: "Coding Ninjas",
      date: "2024",
      description: "Ranked in the top 1% among 60+ Teaching Assistants with 95% student satisfaction rate.",
      credentialUrl: null,
      type: "award",
      order: 3
    });
    await storage.createAchievement({
      title: "HackerRank Problem Solving",
      issuer: "HackerRank",
      date: "2023",
      description: "5-star rating in Problem Solving and Data Structures.",
      credentialUrl: null,
      type: "badge",
      order: 4
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
