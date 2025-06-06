import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Here you would typically save to database
    const consultationRequest = {
      id: Date.now(),
      ...body,
      isHandled: false,
      createdAt: new Date().toISOString(),
    }

    // Mock successful creation
    return NextResponse.json(consultationRequest, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
