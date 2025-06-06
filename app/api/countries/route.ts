import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/db/storage"

export async function GET(request: NextRequest) {
  try {
    const countries = await storage.getCountries()

    return NextResponse.json({ countries })
  } catch (error) {
    console.error("Error fetching countries:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
