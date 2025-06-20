import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/db/storage"
import { isDatabaseAvailable } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Check if database is available
    if (!isDatabaseAvailable()) {
      return NextResponse.json({
        articles: [],
        message: "Database not configured",
      })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category") || "all"
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    const articles = await storage.getArticles(category !== "all" ? category : undefined, limit, offset)

    return NextResponse.json({ articles })
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json(
      {
        articles: [],
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
