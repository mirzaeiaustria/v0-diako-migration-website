import { db, isDatabaseAvailable } from "./index"

// Add this check at the beginning of each function
function ensureDatabase() {
  if (!isDatabaseAvailable() || !db) {
    throw new Error("Database not available")
  }
  return db
}

export const storage = {
  async getArticles(category?: string, limit = 10, offset = 0) {
    const database = ensureDatabase()
    // ... rest of the function
  },

  async getArticleBySlug(slug: string) {
    const database = ensureDatabase()
    // ... rest of the function
  },

  async createArticle(article: any) {
    const database = ensureDatabase()
    // ... rest of the function
  },

  async updateArticle(id: string, updates: any) {
    const database = ensureDatabase()
    // ... rest of the function
  },

  async deleteArticle(id: string) {
    const database = ensureDatabase()
    // ... rest of the function
  },

  async getMigrationMethods() {
    const database = ensureDatabase()
    // ... rest of the function
  },

  async getCountries() {
    const database = ensureDatabase()
    // ... rest of the function
  },

  async getSuccessStories() {
    const database = ensureDatabase()
    // ... rest of the function
  },

  async createConsultationRequest(request: any) {
    const database = ensureDatabase()
    // ... rest of the function
  },
}
