import { type NextRequest, NextResponse } from "next/server"
import { storage } from "@/lib/db/storage"
import { insertImmigrationMethodSchema } from "@/lib/db/schema"
import { z } from "zod"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 })
    }

    const method = await storage.getMethodById(id)

    if (!method) {
      return NextResponse.json({ error: "Method not found" }, { status: 404 })
    }

    return NextResponse.json(method)
  } catch (error) {
    console.error("Error fetching method:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 })
    }

    const body = await request.json()
    const validatedData = insertImmigrationMethodSchema.partial().parse(body)

    const updatedMethod = await storage.updateMethod(id, validatedData)

    if (!updatedMethod) {
      return NextResponse.json({ error: "Method not found" }, { status: 404 })
    }

    return NextResponse.json(updatedMethod)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request data", details: error.errors }, { status: 400 })
    }

    console.error("Error updating method:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 })
    }

    const success = await storage.deleteMethod(id)

    if (!success) {
      return NextResponse.json({ error: "Method not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Method deleted successfully" })
  } catch (error) {
    console.error("Error deleting method:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
