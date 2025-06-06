"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MigrationMethodStats } from "./migration-method-stats"
import { PopularCountriesForMethod } from "./popular-countries-for-method"
import { ChevronLeft, TrendingUp, Clock, Download } from "lucide-react"

interface MigrationMethod {
  id: string
  title: string
  description: string
  imageSrc: string
  link: string
  successRate: number
  processingTime: string
  complexity: number
  averageCost: string
  popularCountries: Array<{
    id: string
    name: string
    flagUrl: string
  }>
  benefits: string[]
  requirements: string[]
  trend: "rising" | "stable" | "declining"
}

const migrationMethods: MigrationMethod[] = [
  {
    id: "skilled-worker",
    title: "مهاجرت کاری",
    description: "مهاجرت از طریق مهارت‌های حرفه‌ای و تخصصی برای متخصصان و نیروهای ماهر",
    imageSrc: "/placeholder.svg?height=200&width=300",
    link: "/guide/countries",
    successRate: 78,
    processingTime: "6 تا 12 ماه",
    complexity: 2,
    averageCost: "2,000 تا 5,000 دلار",
    popularCountries: [
      { id: "canada", name: "کانادا", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "australia", name: "استرالیا", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "germany", name: "آلمان", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "uk", name: "انگلستان", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "new-zealand", name: "نیوزیلند", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "sweden", name: "سوئد", flagUrl: "/placeholder.svg?height=32&width=32" },
    ],
    benefits: ["مسیر مستقیم به اقامت دائم", "امکان همراهی خانواده", "دسترسی به بازار کار", "خدمات اجتماعی و درمانی"],
    requirements: ["مدرک تحصیلی مرتبط", "تجربه کاری", "مدرک زبان", "ارزیابی مدارک حرفه‌ای"],
    trend: "rising",
  },
  {
    id: "investment",
    title: "مهاجرت سرمایه‌گذاری",
    description: "مهاجرت از طریق سرمایه‌گذاری در کسب و کار، املاک یا اوراق قرضه دولتی",
    imageSrc: "/placeholder.svg?height=200&width=300",
    link: "/guide/countries",
    successRate: 92,
    processingTime: "3 تا 8 ماه",
    complexity: 3,
    averageCost: "10,000 تا 50,000 دلار + سرمایه‌گذاری",
    popularCountries: [
      { id: "usa", name: "آمریکا", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "canada", name: "کانادا", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "turkey", name: "ترکیه", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "spain", name: "اسپانیا", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "portugal", name: "پرتغال", flagUrl: "/placeholder.svg?height=32&width=32" },
    ],
    benefits: ["پردازش سریع‌تر", "نیاز کمتر به شرایط زبانی", "امکان همراهی خانواده", "مسیر به شهروندی"],
    requirements: ["سرمایه قابل توجه", "منشأ قانونی سرمایه", "طرح کسب و کار (در برخی موارد)", "تمکن مالی"],
    trend: "stable",
  },
  {
    id: "study",
    title: "مهاجرت تحصیلی",
    description: "مهاجرت از طریق پذیرش در دانشگاه‌ها و مؤسسات آموزشی معتبر",
    imageSrc: "/placeholder.svg?height=200&width=300",
    link: "/guide/countries",
    successRate: 85,
    processingTime: "2 تا 4 ماه",
    complexity: 1,
    averageCost: "1,000 تا 3,000 دلار + شهریه",
    popularCountries: [
      { id: "usa", name: "آمریکا", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "uk", name: "انگلستان", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "canada", name: "کانادا", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "australia", name: "استرالیا", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "germany", name: "آلمان", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "france", name: "فرانسه", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "italy", name: "ایتالیا", flagUrl: "/placeholder.svg?height=32&width=32" },
    ],
    benefits: ["ورود آسان‌تر به کشور", "امکان کار حین تحصیل", "فرصت‌های پس از فارغ‌التحصیلی", "مسیر به اقامت دائم"],
    requirements: ["پذیرش از مؤسسه آموزشی", "مدرک زبان", "تمکن مالی", "بیمه درمانی"],
    trend: "rising",
  },
  {
    id: "family",
    title: "مهاجرت خانوادگی",
    description: "مهاجرت از طریق اسپانسرشیپ اعضای خانواده که شهروند یا مقیم دائم هستند",
    imageSrc: "/placeholder.svg?height=200&width=300",
    link: "/guide/countries",
    successRate: 88,
    processingTime: "12 تا 24 ماه",
    complexity: 2,
    averageCost: "1,500 تا 4,000 دلار",
    popularCountries: [
      { id: "usa", name: "آمریکا", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "canada", name: "کانادا", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "australia", name: "استرالیا", flagUrl: "/placeholder.svg?height=32&width=32" },
      { id: "uk", name: "انگلستان", flagUrl: "/placeholder.svg?height=32&width=32" },
    ],
    benefits: ["نرخ موفقیت بالا", "عدم نیاز به مهارت خاص", "حمایت خانوادگی در کشور مقصد", "دسترسی به خدمات اجتماعی"],
    requirements: ["رابطه خانوادگی نزدیک", "اسپانسر با وضعیت قانونی", "اثبات توانایی مالی اسپانسر", "عدم سوء پیشینه"],
    trend: "stable",
  },
  {
    id: "ausbildung",
    title: "آوسبیلدونگ آلمان",
    description: "دوره‌های آموزشی حرفه‌ای و کارورزی در آلمان با جاب آفر تضمینی",
    imageSrc: "/placeholder.svg?height=200&width=300",
    link: "/guide/countries",
    successRate: 95,
    processingTime: "2 تا 4 ماه",
    complexity: 1,
    averageCost: "500 تا 1,500 دلار",
    popularCountries: [{ id: "germany", name: "آلمان", flagUrl: "/placeholder.svg?height=32&width=32" }],
    benefits: ["جاب آفر تضمینی", "حقوق حین آموزش", "مسیر سریع به اقامت", "عدم نیاز به مدرک زبان قوی"],
    requirements: ["حداقل مدرک دیپلم", "سن زیر 42 سال", "علاقه به یادگیری حرفه", "آمادگی برای کار عملی"],
    trend: "rising",
  },
]

// Function to download migration methods as a zip file
const downloadMigrationMethodsAsZip = () => {
  try {
    // Create a text representation of the migration methods
    const migrationMethodsText = migrationMethods
      .map((method) => {
        return `
روش مهاجرتی: ${method.title}
توضیحات: ${method.description}
نرخ موفقیت: ${method.successRate}%
زمان پردازش: ${method.processingTime}
پیچیدگی: ${method.complexity}/4
هزینه متوسط: ${method.averageCost}

کشورهای محبوب:
${method.popularCountries.map((country) => `- ${country.name}`).join("\n")}

مزایا:
${method.benefits.map((benefit) => `- ${benefit}`).join("\n")}

شرایط:
${method.requirements.map((req) => `- ${req}`).join("\n")}

روند: ${method.trend === "rising" ? "صعودی" : method.trend === "stable" ? "ثابت" : "نزولی"}
-----------------------------------
      `
      })
      .join("\n")

    // Create a Blob with the text content
    const blob = new Blob([migrationMethodsText], { type: "text/plain;charset=utf-8" })

    // Create a download link
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "روش‌های-مهاجرتی-دیاکو.txt"

    // Append to the document, click it, and remove it
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error("خطا در دانلود فایل:", error)
    alert("متأسفانه در دانلود فایل مشکلی پیش آمد. لطفاً دوباره تلاش کنید.")
  }
}

export function MigrationMethodsSection() {
  // Get trend icon and color
  const getTrendInfo = (trend: string) => {
    switch (trend) {
      case "rising":
        return { icon: <TrendingUp className="h-4 w-4" />, color: "bg-green-100 text-green-800" }
      case "stable":
        return { icon: <Clock className="h-4 w-4" />, color: "bg-blue-100 text-blue-800" }
      case "declining":
        return { icon: <TrendingUp className="h-4 w-4 rotate-180" />, color: "bg-amber-100 text-amber-800" }
      default:
        return { icon: <Clock className="h-4 w-4" />, color: "bg-gray-100 text-gray-800" }
    }
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">روش‌های مهاجرتی</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            با انواع روش‌های مهاجرتی آشنا شوید و مسیر مناسب خود را برای مهاجرت پیدا کنید
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mx-auto flex justify-center">
            <TabsTrigger value="all">همه روش‌ها</TabsTrigger>
            <TabsTrigger value="rising">روند صعودی</TabsTrigger>
            <TabsTrigger value="stable">روند ثابت</TabsTrigger>
            <TabsTrigger value="high-success">موفقیت بالا</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {migrationMethods.map((method) => (
                <MethodCard key={method.id} method={method} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rising" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {migrationMethods
                .filter((method) => method.trend === "rising")
                .map((method) => (
                  <MethodCard key={method.id} method={method} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="stable" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {migrationMethods
                .filter((method) => method.trend === "stable")
                .map((method) => (
                  <MethodCard key={method.id} method={method} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="high-success" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {migrationMethods
                .filter((method) => method.successRate >= 85)
                .map((method) => (
                  <MethodCard key={method.id} method={method} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-10 text-center flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/guide/countries">
            <Button size="lg" className="rounded-full px-8">
              مشاهده همه روش‌های مهاجرتی
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 flex items-center gap-2"
            onClick={downloadMigrationMethodsAsZip}
          >
            <Download className="h-4 w-4" />
            دانلود اطلاعات روش‌های مهاجرتی
          </Button>
        </div>
      </div>
    </section>
  )
}

// Separate component for method card to improve readability
function MethodCard({ method }: { method: MigrationMethod }) {
  const trendInfo = getTrendInfo(method.trend)

  return (
    <Card className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={method.imageSrc || "/placeholder.svg"}
            alt={method.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className={`${trendInfo.color} flex items-center gap-1`}>
            {trendInfo.icon}
            {method.trend === "rising" ? "روند صعودی" : method.trend === "stable" ? "روند ثابت" : "روند نزولی"}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{method.title}</CardTitle>
        <CardDescription className="line-clamp-2">{method.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <MigrationMethodStats
          successRate={method.successRate}
          processingTime={method.processingTime}
          complexity={method.complexity}
          averageCost={method.averageCost}
        />

        <PopularCountriesForMethod countries={method.popularCountries} className="mt-4" />

        <div className="mt-4">
          <div className="text-sm text-gray-500 mb-2">شرایط اصلی:</div>
          <div className="flex flex-wrap gap-1">
            {method.requirements.slice(0, 3).map((req, index) => (
              <Badge key={index} variant="outline" className="bg-gray-50">
                {req}
              </Badge>
            ))}
            {method.requirements.length > 3 && (
              <Badge variant="outline" className="bg-gray-50">
                +{method.requirements.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={method.link} className="w-full">
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            مشاهده جزئیات
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

function getTrendInfo(trend: string) {
  switch (trend) {
    case "rising":
      return { icon: <TrendingUp className="h-4 w-4" />, color: "bg-green-100 text-green-800" }
    case "stable":
      return { icon: <Clock className="h-4 w-4" />, color: "bg-blue-100 text-blue-800" }
    case "declining":
      return { icon: <TrendingUp className="h-4 w-4 rotate-180" />, color: "bg-amber-100 text-amber-800" }
    default:
      return { icon: <Clock className="h-4 w-4" />, color: "bg-gray-100 text-gray-800" }
  }
}
