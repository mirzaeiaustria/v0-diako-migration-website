import { pgTable, serial, text, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

// Immigration Methods Table
export const immigrationMethods = pgTable("immigration_methods", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(), // education, work, investment, family, skill, etc.
  country: text("country").notNull(), // germany, canada, turkey, etc.
  requirements: text("requirements").notNull(),
  detailedRequirements: text("detailed_requirements"),
  steps: text("steps"),
  documents: text("documents"),
  prosAndCons: text("pros_and_cons"),
  approximateCosts: text("approximate_costs"),
  keywords: text("keywords"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Consultation Requests Table
export const consultationRequests = pgTable("consultation_requests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  age: integer("age"),
  education: text("education"),
  workExperience: text("work_experience"),
  preferredCountry: text("preferred_country"),
  migrationMethod: text("migration_method"),
  budget: text("budget"),
  timeline: text("timeline"),
  additionalInfo: text("additional_info"),
  isHandled: boolean("is_handled").default(false),
  handledBy: text("handled_by"),
  handledAt: timestamp("handled_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})

// Countries Table
export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  englishName: text("english_name").notNull(),
  flagUrl: text("flag_url"),
  description: text("description"),
  continent: text("continent").notNull(), // europe, americas, asia, oceania, africa
  popularityRank: integer("popularity_rank").default(0),
  migrationMethods: jsonb("migration_methods"), // JSON array of migration methods
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Success Stories Table
export const successStories = pgTable("success_stories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age"),
  method: text("method").notNull(),
  country: text("country").notNull(),
  year: integer("year").notNull(),
  imageUrl: text("image_url"),
  story: text("story").notNull(),
  tags: jsonb("tags"), // JSON array of tags
  isPublished: boolean("is_published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Articles Table
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  tags: jsonb("tags"), // JSON array of tags
  readTime: text("read_time"),
  isPublished: boolean("is_published").default(false),
  publishedAt: timestamp("published_at"),
  authorId: text("author_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// Zod Schemas for validation
export const insertImmigrationMethodSchema = createInsertSchema(immigrationMethods)
export const selectImmigrationMethodSchema = createSelectSchema(immigrationMethods)

export const insertConsultationRequestSchema = createInsertSchema(consultationRequests)
export const selectConsultationRequestSchema = createSelectSchema(consultationRequests)

export const insertCountrySchema = createInsertSchema(countries)
export const selectCountrySchema = createSelectSchema(countries)

export const insertSuccessStorySchema = createInsertSchema(successStories)
export const selectSuccessStorySchema = createSelectSchema(successStories)

export const insertArticleSchema = createInsertSchema(articles)
export const selectArticleSchema = createSelectSchema(articles)

// Types
export type ImmigrationMethod = typeof immigrationMethods.$inferSelect
export type InsertImmigrationMethod = typeof immigrationMethods.$inferInsert

export type ConsultationRequest = typeof consultationRequests.$inferSelect
export type InsertConsultationRequest = typeof consultationRequests.$inferInsert

export type Country = typeof countries.$inferSelect
export type InsertCountry = typeof countries.$inferInsert

export type SuccessStory = typeof successStories.$inferSelect
export type InsertSuccessStory = typeof successStories.$inferInsert

export type Article = typeof articles.$inferSelect
export type InsertArticle = typeof articles.$inferInsert
