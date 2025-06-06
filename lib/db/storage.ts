import { db } from "./index"
import { type SQL, eq, desc, and, sql, like, or } from "drizzle-orm"
import {
  immigrationMethods,
  type InsertImmigrationMethod,
  type ImmigrationMethod,
  consultationRequests,
  type InsertConsultationRequest,
  type ConsultationRequest,
  countries,
  type InsertCountry,
  type Country,
  successStories,
  type InsertSuccessStory,
  type SuccessStory,
  articles,
  type InsertArticle,
  type Article,
} from "./schema"

export const storage = {
  // Immigration Methods operations
  async getMethods(whereClause?: SQL, limit = 12, offset = 0): Promise<ImmigrationMethod[]> {
    return db
      .select()
      .from(immigrationMethods)
      .where(whereClause)
      .orderBy(desc(immigrationMethods.createdAt))
      .limit(limit)
      .offset(offset)
  },

  async countMethods(whereClause?: SQL): Promise<number> {
    const result = await db.select({ count: sql<number>`count(*)` }).from(immigrationMethods).where(whereClause)
    return result[0]?.count || 0
  },

  async getMethodById(id: number): Promise<ImmigrationMethod | undefined> {
    const results = await db.select().from(immigrationMethods).where(eq(immigrationMethods.id, id)).limit(1)
    return results[0]
  },

  async getAdminMethods(whereClause?: SQL): Promise<ImmigrationMethod[]> {
    return db.select().from(immigrationMethods).where(whereClause).orderBy(desc(immigrationMethods.updatedAt))
  },

  async createMethod(data: InsertImmigrationMethod): Promise<ImmigrationMethod> {
    const now = new Date()
    const result = await db
      .insert(immigrationMethods)
      .values({
        ...data,
        createdAt: now,
        updatedAt: now,
      })
      .returning()
    return result[0]
  },

  async updateMethod(id: number, data: Partial<InsertImmigrationMethod>): Promise<ImmigrationMethod | undefined> {
    const result = await db
      .update(immigrationMethods)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(immigrationMethods.id, id))
      .returning()
    return result[0]
  },

  async deleteMethod(id: number): Promise<boolean> {
    const result = await db
      .delete(immigrationMethods)
      .where(eq(immigrationMethods.id, id))
      .returning({ id: immigrationMethods.id })
    return result.length > 0
  },

  // Consultation Requests operations
  async createConsultationRequest(data: InsertConsultationRequest): Promise<ConsultationRequest> {
    const result = await db
      .insert(consultationRequests)
      .values({
        ...data,
        isHandled: false,
        createdAt: new Date(),
      })
      .returning()
    return result[0]
  },

  async getConsultationRequests(): Promise<ConsultationRequest[]> {
    return db.select().from(consultationRequests).orderBy(desc(consultationRequests.createdAt))
  },

  async updateConsultationRequestStatus(id: number, isHandled: boolean): Promise<ConsultationRequest | undefined> {
    const result = await db
      .update(consultationRequests)
      .set({
        isHandled,
        handledAt: isHandled ? new Date() : null,
      })
      .where(eq(consultationRequests.id, id))
      .returning()
    return result[0]
  },

  // Countries operations
  async getCountries(): Promise<Country[]> {
    return db.select().from(countries).where(eq(countries.isActive, true)).orderBy(countries.popularityRank)
  },

  async getCountryById(id: number): Promise<Country | undefined> {
    const results = await db.select().from(countries).where(eq(countries.id, id)).limit(1)
    return results[0]
  },

  async createCountry(data: InsertCountry): Promise<Country> {
    const result = await db
      .insert(countries)
      .values({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
    return result[0]
  },

  // Success Stories operations
  async getSuccessStories(limit = 10): Promise<SuccessStory[]> {
    return db
      .select()
      .from(successStories)
      .where(eq(successStories.isPublished, true))
      .orderBy(desc(successStories.createdAt))
      .limit(limit)
  },

  async createSuccessStory(data: InsertSuccessStory): Promise<SuccessStory> {
    const result = await db
      .insert(successStories)
      .values({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
    return result[0]
  },

  // Articles operations
  async getArticles(category?: string, limit = 10, offset = 0): Promise<Article[]> {
    let query = db.select().from(articles).where(eq(articles.isPublished, true))

    if (category && category !== "all") {
      query = query.where(and(eq(articles.isPublished, true), eq(articles.category, category)))
    }

    return query.orderBy(desc(articles.publishedAt)).limit(limit).offset(offset)
  },

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    const results = await db
      .select()
      .from(articles)
      .where(and(eq(articles.slug, slug), eq(articles.isPublished, true)))
      .limit(1)
    return results[0]
  },

  async createArticle(data: InsertArticle): Promise<Article> {
    const result = await db
      .insert(articles)
      .values({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
    return result[0]
  },

  // Search operations
  async searchMethods(
    searchTerm: string,
    category?: string,
    country?: string,
    limit = 12,
    offset = 0,
  ): Promise<{ methods: ImmigrationMethod[]; total: number }> {
    const conditions = [eq(immigrationMethods.isActive, true)]

    if (searchTerm) {
      conditions.push(
        or(
          like(immigrationMethods.title, `%${searchTerm}%`),
          like(immigrationMethods.shortDescription, `%${searchTerm}%`),
          like(immigrationMethods.keywords, `%${searchTerm}%`),
        )!,
      )
    }

    if (category && category !== "all") {
      conditions.push(eq(immigrationMethods.category, category))
    }

    if (country && country !== "all") {
      conditions.push(eq(immigrationMethods.country, country))
    }

    const whereClause = and(...conditions)

    const [methods, totalResult] = await Promise.all([
      db
        .select()
        .from(immigrationMethods)
        .where(whereClause)
        .orderBy(desc(immigrationMethods.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(immigrationMethods).where(whereClause),
    ])

    return {
      methods,
      total: totalResult[0]?.count || 0,
    }
  },
}
