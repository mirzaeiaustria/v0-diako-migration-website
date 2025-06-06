import { type NextRequest, NextResponse } from "next/server"

// Mock data for immigration methods
const mockMethods = [
  {
    id: 1,
    title: "مهاجرت تحصیلی به آلمان",
    shortDescription: "تحصیل در دانشگاه‌های معتبر آلمان با امکان اقامت پس از فارغ‌التحصیلی",
    fullDescription: "آلمان یکی از محبوب‌ترین مقاصد تحصیلی در اروپا است که فرصت‌های عالی برای تحصیل و کار ارائه می‌دهد.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "education",
    country: "germany",
    requirements: "مدرک تحصیلی، مدرک زبان، تمکن مالی",
    detailedRequirements: "مدرک دیپلم یا کارشناسی، مدرک زبان آلمانی یا انگلیسی، اثبات تمکن مالی",
    steps: "درخواست پذیرش، اخذ ویزا، سفر به آلمان",
    documents: "مدارک تحصیلی، گذرنامه، مدرک زبان، اثبات تمکن مالی",
    prosAndCons: "مزایا: تحصیل رایگان، کیفیت بالای آموزش. معایب: نیاز به زبان آلمانی",
    approximateCosts: "5000 تا 15000 یورو سالانه",
    keywords: "آلمان، تحصیل، دانشگاه، اروپا",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "مهاجرت کاری به کانادا",
    shortDescription: "اقامت دائم در کانادا از طریق سیستم اکسپرس اینتری",
    fullDescription: "کانادا با سیستم اکسپرس اینتری فرصت‌های عالی برای مهاجرت کاری ارائه می‌دهد.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "work",
    country: "canada",
    requirements: "تجربه کاری، مدرک زبان، تحصیلات",
    detailedRequirements: "حداقل یک سال تجربه کاری، مدرک زبان انگلیسی یا فرانسوی، مدرک تحصیلی",
    steps: "ایجاد پروفایل، دریافت دعوت‌نامه، ارسال مدارک",
    documents: "مدارک تحصیلی، سوابق کاری، مدرک زبان، معاینات پزشکی",
    prosAndCons: "مزایا: اقامت دائم، کیفیت زندگی بالا. معایب: رقابت بالا",
    approximateCosts: "3000 تا 8000 دلار کانادا",
    keywords: "کانادا، کار، اکسپرس اینتری، اقامت دائم",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "سرمایه‌گذاری در ترکیه",
    shortDescription: "اخذ شهروندی ترکیه از طریق خرید ملک",
    fullDescription: "ترکیه امکان اخذ شهروندی از طریق سرمایه‌گذاری در املاک را فراهم کرده است.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "investment",
    country: "turkey",
    requirements: "سرمایه‌گذاری حداقل 400,000 دلار",
    detailedRequirements: "خرید ملک به ارزش حداقل 400,000 دلار آمریکا",
    steps: "انتخاب ملک، خرید، درخواست شهروندی",
    documents: "گذرنامه، سند ملک، مدارک مالی",
    prosAndCons: "مزایا: شهروندی سریع، پاسپورت قوی. معایب: سرمایه‌گذاری بالا",
    approximateCosts: "400,000 دلار آمریکا + هزینه‌های جانبی",
    keywords: "ترکیه، سرمایه‌گذاری، ملک، شهروندی",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const searchTerm = searchParams.get("searchTerm") || ""
  const category = searchParams.get("category") || "all"
  const country = searchParams.get("country") || "all"
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "12")

  let filteredMethods = mockMethods

  // Filter by search term
  if (searchTerm) {
    filteredMethods = filteredMethods.filter(
      (method) =>
        method.title.includes(searchTerm) ||
        method.shortDescription.includes(searchTerm) ||
        method.keywords.includes(searchTerm),
    )
  }

  // Filter by category
  if (category !== "all") {
    filteredMethods = filteredMethods.filter((method) => method.category === category)
  }

  // Filter by country
  if (country !== "all") {
    filteredMethods = filteredMethods.filter((method) => method.country === country)
  }

  // Pagination
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedMethods = filteredMethods.slice(startIndex, endIndex)

  return NextResponse.json({
    methods: paginatedMethods,
    totalMethods: filteredMethods.length,
    totalPages: Math.ceil(filteredMethods.length / limit),
    currentPage: page,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Here you would typically save to database
    const newMethod = {
      id: mockMethods.length + 1,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockMethods.push(newMethod)

    return NextResponse.json(newMethod, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
