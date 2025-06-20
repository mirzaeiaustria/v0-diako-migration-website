import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/db/storage"
import { insertConsultationRequestSchema } from "@/lib/db/schema"
import { z } from "zod"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = insertConsultationRequestSchema.parse(body)

    const consultationRequest = await storage.createConsultationRequest(validatedData)

    return NextResponse.json(consultationRequest, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request data", details: error.errors }, { status: 400 })
    }

    console.error("Error creating consultation request:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const consultationRequests = await storage.getConsultationRequests()

    return NextResponse.json({ consultationRequests })
  } catch (error) {
    console.error("Error fetching consultation requests:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
