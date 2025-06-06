"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, User, Clock, ArrowRight, Tag, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { GradientText } from "@/components/ui/gradient-text"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  imageUrl: string
  category: string
  tags: string[]
  author: string
  publishedAt: string
  readTime: string
  isPopular?: boolean
  isFeatured?: boolean
}

const blogCategories = [
  { id: "all", name: "همه مطالب", count: 156 },
  { id: "news", name: "اخبار و تغییرات", count: 45 },
  { id: "guides", name: "راهنمای مهاجرت", count: 38 },
  { id: "success-stories", name: "داستان‌های موفقیت", count: 28 },
  { id: "lifestyle", name: "سبک زندگی", count: 25 },
  { id: "expert-advice", name: "مشاوره تخصصی", count: 20 },
]

const featuredPosts: BlogPost[] = [
  {
    id: "1",
    title: "آخرین تغییرات قوانین مهاجرت به کانادا در سال ۲۰۲۵",
    excerpt: "بررسی کامل جدیدترین تغییرات در سیستم Express Entry و تأثیر آن بر متقاضیان ایرانی",
    content: "",
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "news",
    tags: ["کانادا", "Express Entry", "قوانین جدید"],
    author: "دکتر احمد محمدی",
    publishedAt: "1403/10/15",
    readTime: "8 دقیقه",
    isFeatured: true,
    isPopular: true,
  },
  {
    id: "2",
    title: "داستان موفقیت: از تهران تا برلین با آوسبیلدونگ",
    excerpt: "تجربه واقعی علی رضایی که با کمک دیاکو موفق به اخذ آوسبیلدونگ در آلمان شد",
    content: "",
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "success-stories",
    tags: ["آلمان", "آوسبیلدونگ", "موفقیت"],
    author: "مریم احمدی",
    publishedAt: "1403/10/12",
    readTime: "6 دقیقه",
    isFeatured: true,
  },
  {
    id: "3",
    title: "راهنمای کامل نوشتن رزومه برای کاریابی در استرالیا",
    excerpt: "نکات کلیدی و اشتباهات رایج در نوشتن رزومه برای بازار کار استرالیا",
    content: "",
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "guides",
    tags: ["استرالیا", "رزومه", "کاریابی"],
    author: "سارا کریمی",
    publishedAt: "1403/10/10",
    readTime: "12 دقیقه",
    isFeatured: true,
  },
]

const recentPosts: BlogPost[] = [
  {
    id: "4",
    title: "۵ اشتباه رایج در مصاحبه ویزای تحصیلی آمریکا",
    excerpt: "راهکارهای عملی برای موفقیت در مصاحبه سفارت آمریکا",
    content: "",
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "guides",
    tags: ["آمریکا", "ویزای تحصیلی", "مصاحبه"],
    author: "دکتر رضا نوری",
    publishedAt: "1403/10/08",
    readTime: "7 دقیقه",
    isPopular: true,
  },
  {
    id: "5",
    title: "مقایسه هزینه‌های زندگی در شهرهای بزرگ کانادا",
    excerpt: "تحلیل دقیق هزینه‌های زندگی در ونکوور، تورنتو و مونترال",
    content: "",
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "lifestyle",
    tags: ["کانادا", "هزینه زندگی", "مقایسه"],
    author: "امیر حسینی",
    publishedAt: "1403/10/05",
    readTime: "10 دقیقه",
  },
  {
    id: "6",
    title: "تغییرات جدید در سیستم نقاط استرالیا",
    excerpt: "بررسی آخرین تغییرات در سیستم امتیازدهی مهاجرت ماهر استرالیا",
    content: "",
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "news",
    tags: ["استرالیا", "سیستم نقاط", "مهاجرت ماهر"],
    author: "فاطمه زارعی",
    publishedAt: "1403/10/03",
    readTime: "9 دقیقه",
  },
  {
    id: "7",
    title: "راهنمای کامل اخذ ویزای سرمایه‌گذاری پرتغال",
    excerpt: "مراحل، شرایط و مدارک مورد نیاز برای Golden Visa پرتغال",
    content: "",
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "guides",
    tags: ["پرتغال", "سرمایه‌گذاری", "Golden Visa"],
    author: "محمد رضا امینی",
    publishedAt: "1403/09/28",
    readTime: "15 دقیقه",
  },
  {
    id: "8",
    title: "تجربه زندگی در آلمان: نگاهی از نزدیک",
    excerpt: "گفتگو با خانواده محمدی که ۳ سال است در آلمان زندگی می‌کنند",
    content: "",
    imageUrl: "/placeholder.svg?height=300&width=400",
    category: "lifestyle",
    tags: ["آلمان", "تجربه زندگی", "مصاحبه"],
    author: "لیلا صادقی",
    publishedAt: "1403/09/25",
    readTime: "11 دقیقه",
  },
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(recentPosts)

  useEffect(() => {
    let filtered = recentPosts

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.includes(searchTerm) ||
          post.excerpt.includes(searchTerm) ||
          post.tags.some((tag) => tag.includes(searchTerm)),
      )
    }

    setFilteredPosts(filtered)
  }, [selectedCategory, searchTerm])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link href="/" className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">د</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">هلدینگ مهاجرتی دیاکو</h1>
                  <p className="text-sm text-gray-600">وبلاگ تخصصی مهاجرت</p>
                </div>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                خانه
              </Link>
              <Link href="/blog" className="text-blue-600 font-medium">
                وبلاگ
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                درباره ما
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                تماس با ما
              </Link>
            </nav>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="outline" size="sm">
                ورود
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-teal-600">
                مشاوره رایگان
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600/10 to-teal-600/10">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                وبلاگ تخصصی
                <GradientText className="mr-3">مهاجرت دیاکو</GradientText>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                آخرین اخبار، راهنماها و تجربیات واقعی مهاجرت به کشورهای مختلف
              </p>

              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="جستجو در مطالب..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="دسته‌بندی" />
                  </SelectTrigger>
                  <SelectContent>
                    {blogCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">مطالب ویژه</h2>
              <p className="text-gray-600">مهم‌ترین و جدیدترین مطالب وبلاگ دیاکو</p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Featured Post */}
            <ScrollReveal direction="up" className="lg:col-span-2">
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                <Card className="overflow-hidden border-0 shadow-lg">
                  <div className="relative h-64 lg:h-80">
                    <Image
                      src={featuredPosts[0].imageUrl || "/placeholder.svg"}
                      alt={featuredPosts[0].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-red-500 text-white">ویژه</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPosts[0].publishedAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPosts[0].readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{featuredPosts[0].author}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">{featuredPosts[0].title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{featuredPosts[0].excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {featuredPosts[0].tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link href={`/blog/${featuredPosts[0].id}`}>
                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          ادامه مطلب
                          <ArrowRight className="w-4 h-4 mr-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>

            {/* Side Featured Posts */}
            <div className="space-y-6">
              {featuredPosts.slice(1).map((post, index) => (
                <ScrollReveal key={post.id} direction="up" delay={index * 0.1}>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
                    <Card className="overflow-hidden border-0 shadow-md">
                      <div className="flex">
                        <div className="relative w-24 h-24 flex-shrink-0">
                          <Image
                            src={post.imageUrl || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4 flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm">{post.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <span>{post.publishedAt}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                          <Link href={`/blog/${post.id}`}>
                            <Button variant="link" className="p-0 h-auto text-blue-600 text-xs">
                              ادامه مطلب
                              <ArrowRight className="w-3 h-3 mr-1" />
                            </Button>
                          </Link>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">دسته‌بندی مطالب</h2>
              <p className="text-gray-600">مطالب را بر اساس موضوع مورد نظر خود مرور کنید</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogCategories.slice(1).map((category, index) => (
              <ScrollReveal key={category.id} direction="up" delay={index * 0.1}>
                <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <Card
                    className="cursor-pointer border-0 shadow-md hover:shadow-lg transition-all duration-300"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Tag className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                      <p className="text-gray-600 mb-4">{category.count} مطلب</p>
                      <Button variant="outline" size="sm">
                        مشاهده مطالب
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">جدیدترین مطالب</h2>
                <p className="text-gray-600">آخرین مطالب منتشر شده در وبلاگ دیاکو</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <TrendingUp className="w-4 h-4" />
                <span>{filteredPosts.length} مطلب یافت شد</span>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <ScrollReveal key={post.id} direction="up" delay={index * 0.1}>
                <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                  <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative h-48">
                      <Image src={post.imageUrl || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      {post.isPopular && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-orange-500 text-white">محبوب</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{post.publishedAt}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 flex-grow">{post.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 2).map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <Link href={`/blog/${post.id}`}>
                            <Button variant="link" className="p-0 h-auto text-blue-600">
                              ادامه مطلب
                              <ArrowRight className="w-4 h-4 mr-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Load More */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="px-8">
                مشاهده مطالب بیشتر
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">عضویت در خبرنامه</h2>
              <p className="text-blue-100 mb-8">آخرین اخبار و مطالب مهاجرتی را مستقیماً در ایمیل خود دریافت کنید</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  placeholder="آدرس ایمیل شما"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
                <Button className="bg-white text-blue-600 hover:bg-white/90">عضویت</Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <ScrollReveal direction="up">
              <div>
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">د</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">هلدینگ مهاجرتی دیاکو</h3>
                    <p className="text-sm text-gray-400">وبلاگ تخصصی مهاجرت</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">مرجع اطلاعات مهاجرت با بیش از 10 سال تجربه</p>
              </div>
            </ScrollReveal>

            {[
              {
                title: "دسته‌بندی‌ها",
                links: ["اخبار و تغییرات", "راهنمای مهاجرت", "داستان‌های موفقیت", "سبک زندگی"],
              },
              {
                title: "کشورها",
                links: ["کانادا", "آلمان", "استرالیا", "آمریکا"],
              },
              {
                title: "تماس با ما",
                links: ["021-8807-3287", "info@diaco.eu", "تهران، شهرک غرب"],
              },
            ].map((section, index) => (
              <ScrollReveal key={section.title} direction="up" delay={index * 0.1}>
                <div>
                  <h4 className="font-semibold mb-4">{section.title}</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {section.links.map((link, linkIndex) => (
                      <motion.li key={linkIndex} whileHover={{ x: 5, color: "#ffffff" }} transition={{ duration: 0.2 }}>
                        <Link href="#" className="hover:text-white transition-colors">
                          {link}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 1403 هلدینگ مهاجرتی دیاکو. تمامی حقوق محفوظ است.</p>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </div>
  )
}
