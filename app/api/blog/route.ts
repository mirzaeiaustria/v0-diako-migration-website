import { type NextRequest, NextResponse } from "next/server"

// Mock blog data - در پروژه واقعی از دیتابیس استفاده می‌شود
const blogPosts = [
  {
    id: "1",
    title: "آخرین تغییرات قوانین مهاجرت به کانادا در سال ۲۰۲۵",
    slug: "canada-immigration-changes-2025",
    excerpt: "بررسی کامل جدیدترین تغییرات در سیستم Express Entry و تأثیر آن بر متقاضیان ایرانی",
    content: "محتوای کامل مقاله...",
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "news",
    tags: ["کانادا", "Express Entry", "قوانین جدید"],
    author: "دکتر احمد محمدی",
    authorBio: "متخصص مهاجرت با بیش از 15 سال تجربه",
    authorImage: "/placeholder.svg?height=80&width=80",
    publishedAt: "1403/10/15",
    readTime: "8 دقیقه",
    isPublished: true,
    isFeatured: true,
    isPopular: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // سایر مقالات...
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let filteredPosts = blogPosts.filter((post) => post.isPublished)

    // Filter by category
    if (category && category !== "all") {
      filteredPosts = filteredPosts.filter((post) => post.category === category)
    }

    // Search functionality
    if (search) {
      const searchTerm = search.toLowerCase()
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
      )
    }

    // Pagination
    const total = filteredPosts.length
    const posts = filteredPosts.slice(offset, offset + limit)

    return NextResponse.json({
      posts,
      total,
      hasMore: offset + limit < total,
    })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["title", "content", "category", "author"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    // Create new blog post
    const newPost = {
      id: Date.now().toString(),
      slug: body.title.toLowerCase().replace(/\s+/g, "-"),
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublished: body.isPublished || false,
    }

    // In a real app, save to database
    blogPosts.push(newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
