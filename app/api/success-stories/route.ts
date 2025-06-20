import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/db/storage"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const successStories = await storage.getSuccessStories(limit)

    return NextResponse.json({ successStories })
  } catch (error) {
    console.error("Error fetching success stories:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
