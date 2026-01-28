import { db, isDbAvailable } from "./db";
import {
  profile,
  experiences,
  projects,
  skills,
  education,
  musicRecs,
  bookRecs,
  movieRecs,
  writings,
  achievements,
  blogPosts,
  type Profile,
  type Experience,
  type Project,
  type Skill,
  type Education,
  type MusicRec,
  type BookRec,
  type MovieRec,
  type Writing,
  type Achievement,
  type BlogPost,
  type InsertProfile,
  type InsertExperience,
  type InsertProject,
  type InsertSkill,
  type InsertEducation,
  type InsertMusicRec,
  type InsertBookRec,
  type InsertMovieRec,
  type InsertWriting,
  type InsertAchievement,
  type InsertBlogPost
} from "@shared/schema";
import { asc, eq } from "drizzle-orm";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  
  getExperiences(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  getEducation(): Promise<Education[]>;
  createEducation(education: InsertEducation): Promise<Education>;
  
  getMusicRecs(): Promise<MusicRec[]>;
  createMusicRec(musicRec: InsertMusicRec): Promise<MusicRec>;
  
  getBookRecs(): Promise<BookRec[]>;
  createBookRec(bookRec: InsertBookRec): Promise<BookRec>;
  
  getMovieRecs(): Promise<MovieRec[]>;
  createMovieRec(movieRec: InsertMovieRec): Promise<MovieRec>;
  
  getWritings(): Promise<Writing[]>;
  createWriting(writing: InsertWriting): Promise<Writing>;
  
  getAchievements(): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
}

class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const result = await db.select().from(profile).limit(1);
    return result[0];
  }

  async createProfile(insertProfile: InsertProfile): Promise<Profile> {
    const [newProfile] = await db.insert(profile).values(insertProfile).returning();
    return newProfile;
  }

  async getExperiences(): Promise<Experience[]> {
    return await db.select().from(experiences).orderBy(asc(experiences.order));
  }

  async createExperience(insertExperience: InsertExperience): Promise<Experience> {
    const [newExperience] = await db.insert(experiences).values(insertExperience).returning();
    return newExperience;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(asc(projects.order));
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(insertProject).returning();
    return newProject;
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills).orderBy(asc(skills.order));
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [newSkill] = await db.insert(skills).values(insertSkill).returning();
    return newSkill;
  }

  async getEducation(): Promise<Education[]> {
    return await db.select().from(education).orderBy(asc(education.order));
  }

  async createEducation(insertEducation: InsertEducation): Promise<Education> {
    const [newEducation] = await db.insert(education).values(insertEducation).returning();
    return newEducation;
  }

  async getMusicRecs(): Promise<MusicRec[]> {
    return await db.select().from(musicRecs).orderBy(asc(musicRecs.order));
  }

  async createMusicRec(insertMusicRec: InsertMusicRec): Promise<MusicRec> {
    const [newMusicRec] = await db.insert(musicRecs).values(insertMusicRec).returning();
    return newMusicRec;
  }

  async getBookRecs(): Promise<BookRec[]> {
    return await db.select().from(bookRecs).orderBy(asc(bookRecs.order));
  }

  async createBookRec(insertBookRec: InsertBookRec): Promise<BookRec> {
    const [newBookRec] = await db.insert(bookRecs).values(insertBookRec).returning();
    return newBookRec;
  }

  async getWritings(): Promise<Writing[]> {
    return await db.select().from(writings).orderBy(asc(writings.order));
  }

  async createWriting(insertWriting: InsertWriting): Promise<Writing> {
    const [newWriting] = await db.insert(writings).values(insertWriting).returning();
    return newWriting;
  }

  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements).orderBy(asc(achievements.order));
  }

  async createAchievement(insertAchievement: InsertAchievement): Promise<Achievement> {
    const [newAchievement] = await db.insert(achievements).values(insertAchievement).returning();
    return newAchievement;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(asc(blogPosts.order));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    return result[0];
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const [newBlogPost] = await db.insert(blogPosts).values(insertBlogPost).returning();
    return newBlogPost;
  }
}

// Mock storage for when database is not available
class MockStorage implements IStorage {
  private mockProfile: Profile = {
    id: 1,
    name: "Sourav Rajvi",
    title: "Software Engineer",
    bio: "Backend engineer specializing in Node.js, AWS cloud infrastructure, and microservices architecture. Experienced in building scalable systems processing 10,000+ transactions daily with 99.9% uptime. Strong background in distributed systems, database optimization, and LLM integration.",
    avatarUrl: "",
    githubUrl: "https://github.com/Souravrajvi0",
    linkedinUrl: "https://www.linkedin.com/in/souravrajvi/",
    email: "souravrajvi@gmail.com",
  };

  private mockExperiences: Experience[] = [
    {
      id: 1,
      company: "AGSuite Technologies",
      role: "Software Engineer",
      duration: "Nov 2024 – Present",
      description: "• Architected AWS middleware integrating NetSuite with Zoho Books, processing 10,000+ PDFs daily using EC2 Auto Scaling, SQS, Lambda, S3, and RDS PostgreSQL, achieving 99.9% uptime and 75% faster processing.\n• Deployed infrastructure with CloudFormation and CloudWatch monitoring, implementing S3 lifecycle policies reducing storage costs by 60% while maintaining audit compliance.",
      order: 1,
    },
    {
      id: 2,
      company: "AGSuite Technologies",
      role: "Associate Software Engineer",
      duration: "May 2024 – Nov 2024",
      description: "• Integrated Large Language Model capabilities using OpenAI API with prompt engineering and response streaming to automate document analysis and data extraction for 1,000+ financial records daily, reducing manual data entry by 70%.\n• Built LLM middleware service with Node.js and Express.js implementing rate limiting, error handling, and retry logic for robust API integration.\n• Developed RESTful API endpoints using RESTlet and Suitelet scripts in NetSuite to process LLM responses and integrate with backend workflows.\n• Implemented token optimization strategies and response caching mechanisms, reducing API costs by 40% while maintaining processing accuracy.",
      order: 2,
    },
  ];

  private mockProjects: Project[] = [
    {
      id: 1,
      title: "TaskMaster - Distributed Task Scheduling System",
      description: "• Architected microservices task scheduler with Node.js, gRPC, and PostgreSQL, supporting horizontal scaling to 50+ workers processing 1,000+ concurrent tasks with sub-10ms latency.\n• Implemented round-robin load balancing and heartbeat failure detection, achieving zero data loss through automatic task reassignment.\n• Built RESTful API with real-time monitoring, optimizing PostgreSQL queries with SKIP LOCKED achieving <100ms latency.",
      techStack: ["Node.js", "gRPC", "PostgreSQL", "Microservices"],
      link: "",
      githubLink: "",
      imageUrl: "/images/projects/taskmaster.jpg",
      order: 1,
    },
    {
      id: 2,
      title: "LSM Database Engine",
      description: "• Engineered LSM Tree storage engine in TypeScript achieving 3,500 ops/sec write throughput and <1ms read latency, implementing database primitives used in Cassandra and RocksDB.\n• Optimized read performance by 90% through Bloom filter integration (92% hit rate) and sparse indexing, reducing disk I/O across 1,270+ lines of code.\n• Built Write-Ahead Log crash recovery and multi-level compaction strategy, reducing read amplification by 50% and disk usage by 30-40%.",
      techStack: ["TypeScript", "Node.js"],
      link: "",
      githubLink: "",
      imageUrl: "/images/projects/lsm-db.jpg",
      order: 2,
    },
    {
      id: 3,
      title: "IPO Tracker System",
      description: "• Developed real-time IPO tracking platform with Node.js processing live market data feeds, implementing WebSocket for sub-second updates to 500+ concurrent users.\n• Built RESTful API with Express.js integrating financial data providers, implementing Redis caching reducing response time by 65%.\n• Designed MongoDB pipeline processing 100K+ records with optimized indexing achieving <50ms query times.",
      techStack: ["Node.js", "Express.js", "MongoDB", "WebSocket", "Redis"],
      link: "",
      githubLink: "",
      imageUrl: "/images/projects/ipo-tracker.jpg",
      order: 3,
    },
  ];

  private mockSkills: Skill[] = [
    {
      id: 1,
      category: "Backend Technologies",
      items: ["Node.js", "Express.js", "NestJS", "RESTful APIs", "gRPC", "Microservices", "WebSocket"],
      order: 1,
    },
    {
      id: 2,
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Python", "C++", "Java"],
      order: 2,
    },
    {
      id: 3,
      category: "Cloud & Infrastructure",
      items: ["AWS (EC2, Lambda, S3, SQS, RDS, CloudWatch, Auto Scaling)", "CloudFormation", "Docker"],
      order: 3,
    },
    {
      id: 4,
      category: "Databases",
      items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "DynamoDB"],
      order: 4,
    },
    {
      id: 5,
      category: "Tools & DevOps",
      items: ["Git", "GitHub Actions", "Docker", "Jest", "CI/CD"],
      order: 5,
    },
  ];

  private mockEducation: Education[] = [
    {
      id: 1,
      institution: "Bangalore Institute of Technology",
      degree: "Bachelor of Engineering in Electronics and Communication Engineering",
      year: "2024",
      order: 1,
    },
  ];

  private mockBookRecs: BookRec[] = [
    {
      id: 1,
      title: "On the Road",
      author: "Jack Kerouac",
      genre: "Novel",
      note: "",
      imageUrl: "/images/books/on-the-road.jpg",
      order: 1,
    },
    {
      id: 2,
      title: "The Catcher in the Rye",
      author: "J. D. (Jerome David) Salinger",
      genre: "Novel",
      note: "",
      imageUrl: "/images/books/catcher-in-the-rye.jpg",
      order: 2,
    },
    {
      id: 3,
      title: "The Fountainhead",
      author: "Ayn Rand",
      genre: "Novel",
      note: "",
      imageUrl: "/images/books/the-fountainhead.jpg",
      order: 3,
    },
    {
      id: 4,
      title: "Nausea",
      author: "Jean-Paul Sartre",
      genre: "Novel",
      note: "",
      imageUrl: "/images/books/nausea.jpg",
      order: 4,
    },
    {
      id: 5,
      title: "Lust for Life",
      author: "Irving Stone",
      genre: "Novel",
      note: "",
      imageUrl: "/images/books/lust-for-life.jpg",
      order: 5,
    },
    {
      id: 6,
      title: "Outliers",
      author: "Malcolm Gladwell",
      genre: "Book",
      note: "",
      imageUrl: "/images/books/outliers.jpg",
      order: 6,
    },
  ];

  private mockMovieRecs: MovieRec[] = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      year: "1994",
      genre: "Drama",
      note: "",
      imageUrl: "/images/movies/shawshank.jpg",
      order: 1,
    },
    {
      id: 2,
      title: "Inception",
      director: "Christopher Nolan",
      year: "2010",
      genre: "Sci-Fi",
      note: "",
      imageUrl: "/images/movies/inception.jpg",
      order: 2,
    },
    {
      id: 3,
      title: "The Godfather",
      director: "Francis Ford Coppola",
      year: "1972",
      genre: "Crime",
      note: "",
      imageUrl: "/images/movies/godfather.jpg",
      order: 3,
    },
  ];

  private mockAchievements: Achievement[] = [
    {
      id: 1,
      title: "LeetCode Top 10%",
      issuer: "LeetCode",
      date: "2024",
      description: "Earned a LeetCode rating of 1905 by solving over 500 complex algorithmic challenges; positioned in the top 10%",
      credentialUrl: "",
      type: "achievement",
      order: 1,
    },
  ];

  async getProfile(): Promise<Profile | undefined> {
    return this.mockProfile;
  }

  async createProfile(p: InsertProfile): Promise<Profile> {
    return this.mockProfile as Profile;
  }

  async getExperiences(): Promise<Experience[]> {
    return this.mockExperiences;
  }

  async createExperience(e: InsertExperience): Promise<Experience> {
    return {} as Experience;
  }

  async getProjects(): Promise<Project[]> {
    return this.mockProjects;
  }

  async createProject(p: InsertProject): Promise<Project> {
    return {} as Project;
  }

  async getSkills(): Promise<Skill[]> {
    return this.mockSkills;
  }

  async createSkill(s: InsertSkill): Promise<Skill> {
    return {} as Skill;
  }

  async getEducation(): Promise<Education[]> {
    return this.mockEducation;
  }

  async createEducation(e: InsertEducation): Promise<Education> {
    return {} as Education;
  }

  async getMusicRecs(): Promise<MusicRec[]> {
    return [];
  }

  async createMusicRec(m: InsertMusicRec): Promise<MusicRec> {
    return {} as MusicRec;
  }

  async getBookRecs(): Promise<BookRec[]> {
    return this.mockBookRecs;
  }

  async createBookRec(b: InsertBookRec): Promise<BookRec> {
    return {} as BookRec;
  }

  async getMovieRecs(): Promise<MovieRec[]> {
    return this.mockMovieRecs;
  }

  async createMovieRec(m: InsertMovieRec): Promise<MovieRec> {
    return {} as MovieRec;
  }

  async getWritings(): Promise<Writing[]> {
    return [];
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const [newBlogPost] = await db.insert(blogPosts).values(insertBlogPost).returning();
    return newBlogPost;
  }
}

export const storage = new DatabaseStorage();
