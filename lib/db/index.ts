import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Allow build to succeed without DATABASE_URL
const connectionString = process.env.DATABASE_URL || "postgresql://placeholder"

// Only create real connection if DATABASE_URL exists
let client: postgres.Sql<{}> | null = null
let db: ReturnType<typeof drizzle> | null = null

if (process.env.DATABASE_URL) {
  client = postgres(connectionString, { prepare: false })
  db = drizzle(client, { schema })
}

// Export a safe database instance
export { db }
export * from "./schema"

// Helper function to check if database is available
export function isDatabaseAvailable(): boolean {
  return !!process.env.DATABASE_URL && !!db
}
