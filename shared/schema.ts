import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const profile = sqliteTable("profile", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  avatarUrl: text("avatar_url"),
  githubUrl: text("github_url"),
  linkedinUrl: text("linkedin_url"),
  email: text("email"),
});

export const experiences = sqliteTable("experiences", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  company: text("company").notNull(),
  role: text("role").notNull(),
  duration: text("duration").notNull(), // e.g., "Jan 2023 - Present"
  description: text("description").notNull(),
  order: integer("order").notNull().default(0),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  techStack: text("tech_stack", { mode: "json" }).$type<string[]>().notNull(),
  link: text("link"),
  githubLink: text("github_link"),
  imageUrl: text("image_url"),
  order: integer("order").notNull().default(0),
});

export const skills = sqliteTable("skills", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  category: text("category").notNull(), // e.g., "Languages", "Frameworks"
  items: text("items", { mode: "json" }).$type<string[]>().notNull(),
  order: integer("order").notNull().default(0),
});

export const education = sqliteTable("education", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  institution: text("institution").notNull(),
  degree: text("degree").notNull(),
  year: text("year").notNull(),
  order: integer("order").notNull().default(0),
});

export const musicRecs = sqliteTable("music_recs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  genre: text("genre"),
  note: text("note"),
  order: integer("order").notNull().default(0),
});

export const bookRecs = sqliteTable("book_recs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  author: text("author").notNull(),
  genre: text("genre"),
  note: text("note"),
  imageUrl: text("image_url"),
  order: integer("order").notNull().default(0),
});

export const movieRecs = sqliteTable("movie_recs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  director: text("director"),
  year: text("year"),
  genre: text("genre"),
  note: text("note"),
  imageUrl: text("image_url"),
  order: integer("order").notNull().default(0),
});

export const writings = sqliteTable("writings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  link: text("link"),
  publishedAt: text("published_at"),
  order: integer("order").notNull().default(0),
});

export const achievements = sqliteTable("achievements", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  issuer: text("issuer").notNull(),
  date: text("date").notNull(),
  description: text("description"),
  credentialUrl: text("credential_url"),
  type: text("type").notNull().default("certification"),
  order: integer("order").notNull().default(0),
});

export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  publishedAt: text("published_at"),
  tags: text("tags", { mode: "json" }).$type<string[]>(),
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
export const insertMovieRecSchema = createInsertSchema(movieRecs).omit({ id: true });
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
export type MovieRec = typeof movieRecs.$inferSelect;
export type Writing = typeof writings.$inferSelect;

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type InsertEducation = z.infer<typeof insertEducationSchema>;
export type InsertMusicRec = z.infer<typeof insertMusicRecSchema>;
export type InsertBookRec = z.infer<typeof insertBookRecSchema>;
export type InsertMovieRec = z.infer<typeof insertMovieRecSchema>;
export type InsertWriting = z.infer<typeof insertWritingSchema>;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type Achievement = typeof achievements.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
