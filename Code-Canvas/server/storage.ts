import { db } from "./db";
import {
  profile,
  experiences,
  projects,
  skills,
  education,
  musicRecs,
  bookRecs,
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
  
  getWritings(): Promise<Writing[]>;
  createWriting(writing: InsertWriting): Promise<Writing>;
  
  getAchievements(): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
}

export class DatabaseStorage implements IStorage {
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

export const storage = new DatabaseStorage();
