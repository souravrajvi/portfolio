import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  avatarUrl: text("avatar_url"),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  email: text("email"),
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  role: text("role").notNull(),
  duration: text("duration").notNull(), // e.g., "Jan 2023 - Present"
  description: text("description").notNull(),
  order: integer("order").notNull().default(0),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  techStack: text("tech_stack").array().notNull(), // Array of strings
  link: text("link"),
  githubLink: text("github_link"),
  order: integer("order").notNull().default(0),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // e.g., "Languages", "Frameworks"
  items: text("items").array().notNull(),
  order: integer("order").notNull().default(0),
});

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  year: text("year").notNull(),
  order: integer("order").notNull().default(0),
});

export const musicRecs = pgTable("music_recs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  genre: text("genre"),
  note: text("note"),
  order: integer("order").notNull().default(0),
});

export const bookRecs = pgTable("book_recs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  genre: text("genre"),
  note: text("note"),
  order: integer("order").notNull().default(0),
});

export const writings = pgTable("writings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  link: text("link"),
  publishedAt: text("published_at"),
  order: integer("order").notNull().default(0),
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  issuer: text("issuer").notNull(),
  date: text("date").notNull(),
  description: text("description"),
  credentialUrl: text("credential_url"),
  type: text("type").notNull().default("certification"),
  order: integer("order").notNull().default(0),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  publishedAt: text("published_at"),
  tags: text("tags").array(),
  order: integer("order").notNull().default(0),
});

// === SCHEMAS ===

export const insertProfileSchema = createInsertSchema(profile).omit({ id: true });
export const insertExperienceSchema = createInsertSchema(experiences).omit({ id: true });
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertSkillSchema = createInsertSchema(skills).omit({ id: true });
export const insertEducationSchema = createInsertSchema(education).omit({ id: true });
export const insertMusicRecSchema = createInsertSchema(musicRecs).omit({ id: true });
export const insertBookRecSchema = createInsertSchema(bookRecs).omit({ id: true });
export const insertWritingSchema = createInsertSchema(writings).omit({ id: true });
export const insertAchievementSchema = createInsertSchema(achievements).omit({ id: true });
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true });

// === TYPES ===

export type Profile = typeof profile.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Education = typeof education.$inferSelect;
export type MusicRec = typeof musicRecs.$inferSelect;
export type BookRec = typeof bookRecs.$inferSelect;
export type Writing = typeof writings.$inferSelect;

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type InsertEducation = z.infer<typeof insertEducationSchema>;
export type InsertMusicRec = z.infer<typeof insertMusicRecSchema>;
export type InsertBookRec = z.infer<typeof insertBookRecSchema>;
export type InsertWriting = z.infer<typeof insertWritingSchema>;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type Achievement = typeof achievements.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
