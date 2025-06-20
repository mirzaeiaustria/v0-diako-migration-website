import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/db/storage"
import { insertImmigrationMethodSchema } from "@/lib/db/schema"
import { z } from "zod"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const searchTerm = searchParams.get("searchTerm") || ""
    const category = searchParams.get("category") || "all"
    const country = searchParams.get("country") || "all"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")

    const offset = (page - 1) * limit

    const { methods, total } = await storage.searchMethods(
      searchTerm,
      category !== "all" ? category : undefined,
      country !== "all" ? country : undefined,
      limit,
      offset,
    )

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      methods,
      totalMethods: total,
      totalPages,
      currentPage: page,
    })
  } catch (error) {
    console.error("Error fetching methods:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = insertImmigrationMethodSchema.parse(body)

    const newMethod = await storage.createMethod(validatedData)

    return NextResponse.json(newMethod, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request data", details: error.errors }, { status: 400 })
    }

    console.error("Error creating method:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
