"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Globe,
  Users,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Play,
  Search,
  Star,
  Calendar,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import data from provided sources
import { countries } from "@/lib/countries-migration-methods"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
}

export default function DiacoHomePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedMethod, setSelectedMethod] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const immigrationMethods = [
    {
      id: "apprenticeship",
      title: "مهاجرت کاری از طریق کارورزی",
      description: "دریافت جاب آفر تضمینی و اقامت کاری پس از کارورزی",
      category: "work",
      pros: [
        "یکی از بهترین روش های مهاجرتی",
        "آسان و کم هزینه",
        "شانس ویزای بالا",
        "حداقل مدرک دیپلم",
        "بدون نیاز به مدرک زبان",
      ],
      cons: ["تا سقف سنی 42 سال", "دریافت حقوق نسبتا کم در دوران کارورزی"],
    },
    {
      id: "study",
      title: "مهاجرت از طریق تحصیل",
      description: "پرطرفدارترین روش مهاجرتی",
      category: "education",
      pros: [
        "شانس ویزای عالی",
        "سریع، آسان و کم هزینه",
        "دریافت اقامت کاری پس از تحصیل",
        "امکان دریافت بورسیه و فاند",
        "امکان کار دانشجویی در دوران تحصیل",
      ],
      cons: ["عدم امکان دریافت اقامت دائم هنگام تحصیل", "رقابت بالا در برخی از کشورها"],
    },
    {
      id: "work",
      title: "مهاجرت از طریق کار",
      description: "درآمد ارزی بالا و شانس ویزای بالا",
      category: "work",
      pros: [
        "درآمد ارزی بالا",
        "امکان اخذ اقامت دائم و پاسپورت",
        "دریافت بیمه کاری، بازنشستگی و سلامت",
        "حداکثر سن 45 سال",
        "امکان الحاق همزمان خانواده",
      ],
      cons: ["نیازمند تخصص و سابقه شغلی", "داشتن رزومه خوب کاری", "محدودیت برای برخی از رشته ها"],
    },
    {
      id: "investment",
      title: "خرید ملک، ثبت شرکت، استارت آپ و تمکن مالی",
      description: "سریع ترین روش دریافت اقامت و پاسپورت",
      category: "investment",
      pros: [
        "بدون محدودیت سنی",
        "بدون نیاز به مدرک زبان",
        "بدون نیاز به مدارک تحصیلی",
        "امکان الحاق خانواده به صورت همزمان",
        "شانس موفقیت بالا",
      ],
      cons: ["هزینه های بالاتر نسبت به سایر روش ها"],
    },
  ]

  const successStories = [
    {
      name: "امیر حسینی",
      age: 45,
      method: "سرمایه‌گذاری",
      country: "ایران به ترکیه",
      year: 2020,
      image: "/placeholder.svg?height=80&width=80",
      story: "من از طریق خرید ملک به ارزش 400,000 دلار در استانبول، اقامت ترکیه را دریافت کردم...",
      tags: ["انتقال ملک مناسب", "اقامت تضمینی"],
    },
    {
      name: "مریم رضایی",
      age: 28,
      method: "تحصیل",
      country: "ایران به استرالیا",
      year: 2019,
      image: "/placeholder.svg?height=80&width=80",
      story: "من برای تحصیل در مقطع کارشناسی ارشد رشته مدیریت پارکینگ به استرالیا مهاجرت کردم...",
      tags: ["تعیین هزینه‌های تحصیل", "پذیرش از دانشگاه"],
    },
    {
      name: "علی محمدی",
      age: 32,
      method: "مهاجرت کاری",
      country: "ایران به کانادا",
      year: 2021,
      image: "/placeholder.svg?height=80&width=80",
      story: "من با مدرک کارشناسی ارشد مهندس کامپیوتر و 5 سال سابقه کار در زمینه توسعه نرم‌افزار...",
      tags: ["ارزیابی مدارک تحصیلی", "جهیزیه مدارک سوابق کاری"],
    },
  ]

  const statistics = [
    { label: "نرخ موفقیت پرونده‌های مهاجرتی", value: "85%", icon: CheckCircle, color: "text-green-600" },
    { label: "پذیرش‌های مهاجرتی مختلف", value: "+30", icon: TrendingUp, color: "text-blue-600" },
    { label: "کشورهای مهاجرتی مصوب", value: "+10", icon: Globe, color: "text-orange-600" },
    { label: "متقاضیان مهاجرت ساالنه", value: "+10,000", icon: Users, color: "text-purple-600" },
  ]

  const migrationTrends = [
    { country: "کانادا", percentage: 30, trend: "up" },
    { country: "آلمان", percentage: 25, trend: "up" },
    { country: "استرالیا", percentage: 15, trend: "stable" },
    { country: "ترکیه", percentage: 10, trend: "up" },
    { country: "سایر کشورها", percentage: 20, trend: "stable" },
  ]

  const articles = [
    {
      title: "مهاجرت تحصیلی به آلمان، کدام کشور محبوب‌تر است؟",
      excerpt: "بررسی مزایا و معایب مهاجرت تحصیلی به آلمان در مقایسه با سایر کشورهای اروپایی",
      date: "1402/09/15",
      readTime: "5 دقیقه",
      category: "مهاجرت تحصیلی",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["آلمان", "تحصیل", "اروپا"],
    },
    {
      title: "در آینده نزدیک به Medical Visa آلمان امیدوار باشید",
      excerpt: "آخرین تغییرات در قوانین ویزای پزشکی آلمان و فرصت‌های جدید برای متقاضیان",
      date: "1402/09/10",
      readTime: "7 دقیقه",
      category: "اخبار مهاجرت",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["ویزای پزشکی", "آلمان", "اخبار"],
    },
    {
      title: "Residence Permit و اجازه اقامت Type D) آلمان",
      excerpt: "راهنمای کامل دریافت اجازه اقامت آلمان و مراحل تبدیل ویزا به اقامت",
      date: "1402/09/05",
      readTime: "10 دقیقه",
      category: "اقامت",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["اقامت", "آلمان", "راهنما"],
    },
  ]

  const filteredCountries = countries.filter((country) => {
    if (selectedCountry !== "all" && country.id !== selectedCountry) return false
    if (searchTerm && !country.name.includes(searchTerm)) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">د</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">دیاکو</h1>
                <p className="text-sm text-gray-600">سامانه هوشمند مهاجرت</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                خانه
              </Link>
              <Link href="#countries" className="text-gray-700 hover:text-blue-600 transition-colors">
                کشورها
              </Link>
              <Link href="#methods" className="text-gray-700 hover:text-blue-600 transition-colors">
                روش‌های مهاجرتی
              </Link>
              <Link href="#articles" className="text-gray-700 hover:text-blue-600 transition-colors">
                مقالات
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                تماس با ما
              </Link>
            </nav>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="outline" size="sm">
                ورود
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-teal-600">
                ثبت نام
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-teal-600/10"></div>
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" variants={fadeInUp}>
              هلدینگ مهاجرتی
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600"> دیاکو</span>
            </motion.h1>

            <motion.p className="text-xl text-gray-600 mb-8 leading-relaxed" variants={fadeInUp}>
              یک شرکت مشاوره مهاجرتی بین المللی است که در ایران و اروپا فعالیت می کند. این دیاکو در زمینه مهاجرت تحصیلی،
              کاری، سرمایه گذاری به متقاضیان ایرانی و خارجی فعالیت دارد.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              variants={fadeInUp}
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 text-lg px-8 py-3">
                <Play className="w-5 h-5 ml-2" />
                شروع ویزارد انتخاب روش مهاجرتی
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                مشاوره رایگان
                <ArrowRight className="w-5 h-5 mr-2" />
              </Button>
            </motion.div>

            {/* Statistics */}
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6" variants={staggerContainer}>
              {statistics.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Immigration Wizard Section */}
      <section className="py-20 bg-white" id="methods">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ویزارد انتخاب روش مهاجرتی</h2>
            <p className="text-xl text-gray-600">
              با پاسخ به چند سوال ساده، بهترین روش مهاجرتی مناسب شرایط شما را پیدا کنید
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <div
                    key={step}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step <= currentStep
                        ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
              <Progress value={(currentStep / 6) * 100} className="h-2" />
            </div>

            {/* Step 1: Immigration Method Selection */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-50 rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">کدام روش مهاجرت را ترجیح می دهید؟</h3>

                <Accordion type="single" collapsible className="space-y-4 mb-8">
                  {immigrationMethods.map((method) => (
                    <AccordionItem key={method.id} value={method.id} className="border rounded-lg">
                      <AccordionTrigger className="px-6 py-4 text-right hover:no-underline">
                        <span className="font-semibold">{method.title}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-600 mb-4">{method.description}</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-green-700 mb-2">مزایا:</h4>
                            <ul className="space-y-1">
                              {method.pros.map((pro, index) => (
                                <li key={index} className="flex items-start text-sm">
                                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 ml-2 flex-shrink-0" />
                                  {pro}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-red-700 mb-2">معایب:</h4>
                            <ul className="space-y-1">
                              {method.cons.map((con, index) => (
                                <li key={index} className="flex items-start text-sm">
                                  <span className="w-4 h-4 text-red-600 mt-0.5 ml-2 flex-shrink-0">×</span>
                                  {con}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <Select value={selectedMethod} onValueChange={setSelectedMethod}>
                  <SelectTrigger className="w-full mb-6">
                    <SelectValue placeholder="روش مهاجرت خود را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {immigrationMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex justify-between">
                  <Button variant="outline" disabled>
                    قبلی
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!selectedMethod}
                    className="bg-gradient-to-r from-blue-600 to-teal-600"
                  >
                    بعدی
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Placeholder for other steps */}
            {currentStep > 1 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-4">مرحله {currentStep} از 6</h3>
                <p className="text-gray-600 mb-8">این بخش در حال توسعه است و به زودی اضافه خواهد شد.</p>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                    قبلی
                  </Button>
                  <Button
                    onClick={() => (currentStep < 6 ? setCurrentStep(currentStep + 1) : null)}
                    className="bg-gradient-to-r from-blue-600 to-teal-600"
                  >
                    {currentStep === 6 ? "نمایش نتیجه" : "بعدی"}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Countries and Methods Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50" id="countries">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">کشورها و روش‌های مهاجرتی</h2>
            <p className="text-xl text-gray-600">
              اطلاعات جامع درباره کشورهای مهاجرپذیر و روش‌های مختلف مهاجرت به هر کشور
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="جستجو در کشورها..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="انتخاب قاره" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">همه قاره‌ها</SelectItem>
                  <SelectItem value="europe">اروپا</SelectItem>
                  <SelectItem value="americas">آمریکا</SelectItem>
                  <SelectItem value="oceania">اقیانوسیه</SelectItem>
                  <SelectItem value="asia">آسیا</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Countries Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.slice(0, 12).map((country, index) => (
              <motion.div
                key={country.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <Image
                            src={country.flagUrl || "/placeholder.svg"}
                            alt={`پرچم ${country.name}`}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{country.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs">
                            رتبه {country.popularityRank}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600 mr-1">
                          {(5 - (country.popularityRank - 1) * 0.5).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{country.description}</p>

                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">روش‌های مهاجرتی:</div>
                        <div className="flex flex-wrap gap-1">
                          {country.migrationMethods.slice(0, 3).map((method, methodIndex) => (
                            <Badge key={methodIndex} variant="outline" className="text-xs">
                              {method.title.length > 15 ? method.title.substring(0, 15) + "..." : method.title}
                            </Badge>
                          ))}
                          {country.migrationMethods.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{country.migrationMethods.length - 3} روش دیگر
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <Button variant="link" className="mt-4 p-0 h-auto text-blue-600 w-full justify-start">
                      مطالعه جزئیات و روش‌های مهاجرتی
                      <ArrowRight className="w-4 h-4 mr-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              مشاهده همه کشورها ({countries.length} کشور)
            </Button>
          </div>
        </div>
      </section>

      {/* Migration Statistics and Trends */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">آمار و ارقام مهاجرتی</h2>
            <p className="text-xl text-gray-600">آمار و اطلاعات مهاجرتی کشورهای مختلف و روش‌های مهاجرت</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Migration Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">محبوب‌ترین کشورهای مقصد مهاجرتی</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {migrationTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <span className="text-sm font-medium">{trend.country}</span>
                        <div className="flex items-center">
                          {trend.trend === "up" ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full"
                            style={{ width: `${trend.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{trend.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Migration News */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">روندهای مهاجرتی در سال 2023</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium text-green-800">مهاجران تحصیلی</div>
                      <div className="text-sm text-green-600">افزایش 15% نسبت به سال قبل</div>
                    </div>
                    <div className="text-2xl font-bold text-green-700">1</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium text-blue-800">مهاجران کاری</div>
                      <div className="text-sm text-blue-600">افزایش 8% نسبت به سال قبل</div>
                    </div>
                    <div className="text-2xl font-bold text-blue-700">2</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <div className="font-medium text-orange-800">مهاجران سرمایه‌گذار</div>
                      <div className="text-sm text-orange-600">افزایش 25% نسبت به سال قبل</div>
                    </div>
                    <div className="text-2xl font-bold text-orange-700">3</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <div className="font-medium text-purple-800">ویزای استعداد</div>
                      <div className="text-sm text-purple-600">افزایش 30% نسبت به سال قبل</div>
                    </div>
                    <div className="text-2xl font-bold text-purple-700">4</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">داستان‌های موفقیت</h2>
            <p className="text-xl text-gray-600">تجربیات واقعی مشتریان ما در مسیر مهاجرت موفق</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-lg">{story.name}</CardTitle>
                    <div className="text-sm text-gray-600">
                      {story.age} ساله • {story.method}
                    </div>
                    <Badge variant="secondary" className="mt-2">
                      {story.country} • {story.year}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{story.story}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {story.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button variant="link" className="mt-4 p-0 h-auto text-blue-600">
                      ادامه داستان...
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              مشاهده همه داستان‌های موفقیت
            </Button>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 bg-gray-50" id="articles">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">مقالات تخصصی مهاجرت</h2>
            <p className="text-xl text-gray-600">آخرین مقالات و راهنماهای تخصصی در زمینه مهاجرت و روش‌های مختلف آن</p>
          </motion.div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto mb-8">
              <TabsTrigger value="all">همه مقالات</TabsTrigger>
              <TabsTrigger value="education">تحصیلی</TabsTrigger>
              <TabsTrigger value="work">کاری</TabsTrigger>
              <TabsTrigger value="investment">سرمایه‌گذاری</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                      <div className="aspect-video relative overflow-hidden rounded-t-lg">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardHeader>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Calendar className="w-4 h-4" />
                            <span>{article.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Clock className="w-4 h-4" />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="w-fit mb-2">
                          {article.category}
                        </Badge>
                        <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{article.excerpt}</p>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {article.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button variant="link" className="p-0 h-auto text-blue-600">
                          مطالعه بیشتر
                          <ArrowRight className="w-4 h-4 mr-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Other tab contents would be similar with filtered articles */}
            <TabsContent value="education">
              <div className="text-center py-10">
                <p className="text-gray-600">مقالات مهاجرت تحصیلی در حال بارگذاری...</p>
              </div>
            </TabsContent>

            <TabsContent value="work">
              <div className="text-center py-10">
                <p className="text-gray-600">مقالات مهاجرت کاری در حال بارگذاری...</p>
              </div>
            </TabsContent>

            <TabsContent value="investment">
              <div className="text-center py-10">
                <p className="text-gray-600">مقالات مهاجرت سرمایه‌گذاری در حال بارگذاری...</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              مشاهده همه مقالات
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-blue-700 text-white" id="contact">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">هلدینگ مهاجرتی دیاکو (اندیشه راه زندگی)</h2>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              یک شرکت مشاوره مهاجرتی بین المللی است که در ایران و اروپا فعالیت می کند. این دیاکو در زمینه مهاجرت تحصیلی،
              کاری، سرمایه گذاری به متقاضیان ایرانی و خارجی فعالیت دارد. دفتر مرکزی دیاکو در تهران واقع شده است و دارای
              شعبه هایی در قبرس، اسپانیا می باشد.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { phone: "09306229790", icon: Phone },
              { phone: "021-8807-3287", icon: Phone },
              { phone: "021-8809-5702", icon: Phone },
              { phone: "021-9169-3955", icon: Phone },
            ].map((contact, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
              >
                <contact.icon className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                <div className="text-lg font-semibold">{contact.phone}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mt-12"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Globe className="w-5 h-5" />
                <span>DIACO.EU</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Globe className="w-5 h-5" />
                <span>DIACO.CONSULTING</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">د</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">دیاکو</h3>
                  <p className="text-sm text-gray-400">سامانه هوشمند مهاجرت</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">مشاوره تخصصی مهاجرت به کشورهای مختلف با بیش از 10 سال تجربه</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">خدمات</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    مهاجرت تحصیلی
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    مهاجرت کاری
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    مهاجرت سرمایه‌گذاری
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    مشاوره رایگان
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">کشورها</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    کانادا
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    آلمان
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    استرالیا
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    انگلستان
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">تماس با ما</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Phone className="w-4 h-4" />
                  <span>021-8807-3287</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Mail className="w-4 h-4" />
                  <span>info@diaco.eu</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <MapPin className="w-4 h-4" />
                  <span>تهران، ایران</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 1403 هلدینگ مهاجرتی دیاکو. تمامی حقوق محفوظ است.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
