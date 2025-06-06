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
  Calendar,
  Clock,
  Award,
  Target,
  Shield,
  Zap,
  BookOpen,
  MessageSquare,
  Video,
  Calculator,
  Map,
  BarChart3,
  Headphones,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MigrationMethodSelectorWizard } from "@/components/migration-method-selector-wizard"
import { InteractiveWorldMap } from "@/components/interactive-world-map"
import { MigrantExperiences } from "@/components/migrant-experiences"

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

  const services = [
    {
      id: "education",
      title: "مهاجرت تحصیلی",
      description: "پذیرش از بهترین دانشگاه‌های جهان و اخذ ویزای تحصیلی",
      icon: BookOpen,
      features: ["پذیرش تحصیلی", "بورسیه‌های تحصیلی", "ویزای تحصیلی", "مشاوره انتخاب رشته"],
      countries: ["آلمان", "کانادا", "استرالیا", "انگلستان"],
      color: "bg-blue-500",
    },
    {
      id: "work",
      title: "مهاجرت کاری",
      description: "اخذ ویزای کار و جاب آفر از کشورهای مختلف",
      icon: Target,
      features: ["ویزای کار", "جاب آفر تضمینی", "ارزیابی شرایط کاری", "کاریابی بین‌المللی"],
      countries: ["آلمان", "کانادا", "استرالیا", "اتریش"],
      color: "bg-green-500",
    },
    {
      id: "investment",
      title: "سرمایه‌گذاری و کارآفرینی",
      description: "اقامت از طریق سرمایه‌گذاری و ثبت شرکت",
      icon: TrendingUp,
      features: ["خرید ملک", "ثبت شرکت", "سرمایه‌گذاری", "تمکن مالی"],
      countries: ["ترکیه", "پرتغال", "یونان", "اسپانیا"],
      color: "bg-purple-500",
    },
    {
      id: "family",
      title: "مهاجرت خانوادگی",
      description: "ویزای پیوست به خانواده و الحاق اعضای خانواده",
      icon: Users,
      features: ["ویزای همراه", "ویزای والدین", "پیوستن به خانواده", "اسپانسرشیپ"],
      countries: ["کانادا", "آمریکا", "استرالیا", "انگلستان"],
      color: "bg-orange-500",
    },
    {
      id: "ausbildung",
      title: "آوسبیلدونگ آلمان",
      description: "دوره‌های آموزشی حرفه‌ای و کارورزی در آلمان",
      icon: Award,
      features: ["آموزش حرفه‌ای", "کارورزی", "جاب آفر تضمینی", "اقامت کاری"],
      countries: ["آلمان"],
      color: "bg-red-500",
    },
    {
      id: "language",
      title: "مرکز آموزش زبان",
      description: "دوره‌های آموزش زبان و آمادگی برای آزمون‌های بین‌المللی",
      icon: MessageSquare,
      features: ["آیلتس", "تافل", "PTE", "زبان آلمانی"],
      countries: ["آنلاین", "حضوری"],
      color: "bg-teal-500",
    },
  ]

  const statistics = [
    { label: "نرخ موفقیت پرونده‌های مهاجرتی", value: "95%", icon: CheckCircle, color: "text-green-600" },
    { label: "سال سابقه فعالیت", value: "+10", icon: Award, color: "text-blue-600" },
    { label: "کشورهای تحت پوشش", value: "+15", icon: Globe, color: "text-orange-600" },
    { label: "متقاضیان موفق ساالنه", value: "+5,000", icon: Users, color: "text-purple-600" },
  ]

  const features = [
    {
      title: "مشاوره رایگان",
      description: "مشاوره تخصصی رایگان با کارشناسان مجرب",
      icon: Headphones,
    },
    {
      title: "پیگیری آنلاین",
      description: "پیگیری وضعیت پرونده از طریق پنل کاربری",
      icon: BarChart3,
    },
    {
      title: "تیم متخصص",
      description: "بیش از 35 کارشناس و مشاور مجرب",
      icon: Users,
    },
    {
      title: "امنیت بالا",
      description: "حفاظت کامل از اطلاعات شخصی شما",
      icon: Shield,
    },
    {
      title: "پردازش سریع",
      description: "پردازش سریع و دقیق پرونده‌ها",
      icon: Zap,
    },
    {
      title: "پشتیبانی 24/7",
      description: "پشتیبانی مداوم در تمام مراحل",
      icon: Clock,
    },
  ]

  const successStories = [
    {
      name: "امیر حسینی",
      age: 32,
      method: "مهاجرت کاری",
      country: "ایران به کانادا",
      year: 2023,
      image: "/placeholder.svg?height=80&width=80",
      story:
        "من از طریق سیستم اکسپرس اینتری کانادا موفق به دریافت اقامت دائم شدم. تیم دیاکو در تمام مراحل همراه من بودند.",
      tags: ["اکسپرس اینتری", "اقامت دائم", "تورنتو"],
    },
    {
      name: "مریم رضایی",
      age: 28,
      method: "مهاجرت تحصیلی",
      country: "ایران به آلمان",
      year: 2023,
      image: "/placeholder.svg?height=80&width=80",
      story: "برای تحصیل در مقطع کارشناسی ارشد به آلمان رفتم. دیاکو کمک کرد تا بهترین دانشگاه را انتخاب کنم.",
      tags: ["تحصیل", "آلمان", "مهندسی"],
    },
    {
      name: "علی محمدی",
      age: 35,
      method: "سرمایه‌گذاری",
      country: "ایران به ترکیه",
      year: 2022,
      image: "/placeholder.svg?height=80&width=80",
      story: "از طریق خرید ملک در استانبول، شهروندی ترکیه را دریافت کردم. فرآیند بسیار ساده و سریع بود.",
      tags: ["سرمایه‌گذاری", "ملک", "شهروندی"],
    },
  ]

  const articles = [
    {
      title: "راهنمای کامل مهاجرت تحصیلی به آلمان 2024",
      excerpt: "همه چیز که باید درباره مهاجرت تحصیلی به آلمان بدانید",
      date: "1403/01/15",
      readTime: "10 دقیقه",
      category: "مهاجرت تحصیلی",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["آلمان", "تحصیل", "راهنما"],
    },
    {
      title: "آخرین تغییرات قوانین مهاجرتی کانادا",
      excerpt: "بررسی جدیدترین تغییرات در سیستم اکسپرس اینتری کانادا",
      date: "1403/01/10",
      readTime: "7 دقیقه",
      category: "اخبار مهاجرت",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["کانادا", "اکسپرس اینتری", "اخبار"],
    },
    {
      title: "مقایسه کشورهای اروپایی برای سرمایه‌گذاری",
      excerpt: "بهترین کشورهای اروپایی برای سرمایه‌گذاری و اخذ اقامت",
      date: "1403/01/05",
      readTime: "12 دقیقه",
      category: "سرمایه‌گذاری",
      image: "/placeholder.svg?height=200&width=300",
      tags: ["اروپا", "سرمایه‌گذاری", "مقایسه"],
    },
  ]

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
                <h1 className="text-xl font-bold text-gray-900">هلدینگ مهاجرتی دیاکو</h1>
                <p className="text-sm text-gray-600">اندیشه راه زندگی</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                خانه
              </Link>
              <Link href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">
                خدمات
              </Link>
              <Link href="#countries" className="text-gray-700 hover:text-blue-600 transition-colors">
                کشورها
              </Link>
              <Link href="#wizard" className="text-gray-700 hover:text-blue-600 transition-colors">
                ویزارد مهاجرت
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
                مشاوره رایگان
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
            className="text-center max-w-5xl mx-auto"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" variants={fadeInUp}>
              هلدینگ مهاجرتی
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600"> دیاکو</span>
            </motion.h1>

            <motion.p className="text-xl text-gray-600 mb-8 leading-relaxed" variants={fadeInUp}>
              پلتفرم جامع مهاجرتی با بیش از 10 سال سابقه و +35 کارشناس مجرب
              <br />
              مشاوره تخصصی برای مهاجرت تحصیلی، کاری، سرمایه‌گذاری و خانوادگی
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              variants={fadeInUp}
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 text-lg px-8 py-3">
                <Calculator className="w-5 h-5 ml-2" />
                ارزیابی رایگان مهاجرت
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Video className="w-5 h-5 ml-2" />
                مشاوره آنلاین
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                <Map className="w-5 h-5 ml-2" />
                نقشه تعاملی کشورها
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

      {/* Services Section */}
      <section className="py-20 bg-white" id="services">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">خدمات جامع مهاجرتی</h2>
            <p className="text-xl text-gray-600">ارائه کامل‌ترین خدمات مهاجرتی با تیم متخصص و مجرب</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center`}>
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>

                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-gray-600 mb-2">ویژگی‌ها:</div>
                        <div className="flex flex-wrap gap-1">
                          {service.features.map((feature, featureIndex) => (
                            <Badge key={featureIndex} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600 mb-2">کشورهای تحت پوشش:</div>
                        <div className="flex flex-wrap gap-1">
                          {service.countries.map((country, countryIndex) => (
                            <Badge key={countryIndex} variant="secondary" className="text-xs">
                              {country}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button variant="link" className="mt-4 p-0 h-auto text-blue-600 w-full justify-start">
                      اطلاعات بیشتر
                      <ArrowRight className="w-4 h-4 mr-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">چرا دیاکو؟</h2>
            <p className="text-xl text-gray-600">مزایای همکاری با هلدینگ مهاجرتی دیاکو</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Wizard Section */}
      <section className="py-20 bg-white" id="wizard">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ویزارد هوشمند انتخاب روش مهاجرت</h2>
            <p className="text-xl text-gray-600">
              با پاسخ به چند سوال ساده، بهترین روش مهاجرتی مناسب شرایط شما را پیدا کنید
            </p>
          </motion.div>

          <MigrationMethodSelectorWizard />
        </div>
      </section>

      {/* Interactive World Map Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50" id="countries">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">نقشه تعاملی کشورهای مهاجرپذیر</h2>
            <p className="text-xl text-gray-600">اطلاعات جامع درباره کشورهای مهاجرپذیر و روش‌های مختلف مهاجرت</p>
          </motion.div>

          <InteractiveWorldMap />
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
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

      {/* Migrant Experiences Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <MigrantExperiences />
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 bg-white" id="articles">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">مرکز دانش و مقالات تخصصی</h2>
            <p className="text-xl text-gray-600">آخرین مقالات و راهنماهای تخصصی در زمینه مهاجرت</p>
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
            <h2 className="text-4xl font-bold mb-4">هلدینگ مهاجرتی دیاکو</h2>
            <p className="text-xl text-teal-100 max-w-4xl mx-auto">
              شرکت مشاوره مهاجرتی بین‌المللی با فعالیت در ایران و اروپا
              <br />
              ارائه خدمات مهاجرت تحصیلی، کاری و سرمایه‌گذاری به متقاضیان ایرانی و خارجی
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            {[
              { phone: "021-9169-3955", icon: Phone },
              { phone: "021-8807-3287", icon: Phone },
              { phone: "021-8809-5702", icon: Phone },
              { phone: "09306229790", icon: Phone },
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
            className="text-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Globe className="w-5 h-5" />
                <span>DIACO.EU</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Globe className="w-5 h-5" />
                <span>DIACO.CONSULTING</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                <MessageSquare className="w-4 h-4 ml-2" />
                تلگرام
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                <Video className="w-4 h-4 ml-2" />
                اینستاگرام
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                <Globe className="w-4 h-4 ml-2" />
                لینکدین
              </Button>
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
                  <h3 className="text-lg font-bold">هلدینگ مهاجرتی دیاکو</h3>
                  <p className="text-sm text-gray-400">اندیشه راه زندگی</p>
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
                    آوسبیلدونگ آلمان
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">کشورها</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    آلمان
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    کانادا
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    استرالیا
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    ترکیه
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
                  <span>تهران، شهرک غرب</span>
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
