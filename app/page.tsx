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
  Brain,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InteractiveWorldMap } from "@/components/interactive-world-map"
import { MigrantExperiences } from "@/components/migrant-experiences"
import { MigrationMethodsSection } from "@/components/migration-methods-section"
import { MigrationStatistics } from "@/components/migration-statistics"
import { MigrationSuccessStories } from "@/components/migration-success-stories"
import { MigrationMethodWizard } from "@/components/migration-method-wizard"

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
      successRate: "85%",
      avgTime: "4-8 ماه",
    },
    {
      id: "work",
      title: "مهاجرت کاری",
      description: "اخذ ویزای کار و جاب آفر از کشورهای مختلف",
      icon: Target,
      features: ["ویزای کار", "جاب آفر تضمینی", "ارزیابی شرایط کاری", "کاریابی بین‌المللی"],
      countries: ["آلمان", "کانادا", "استرالیا", "اتریش"],
      color: "bg-green-500",
      successRate: "78%",
      avgTime: "6-12 ماه",
    },
    {
      id: "investment",
      title: "سرمایه‌گذاری و کارآفرینی",
      description: "اقامت از طریق سرمایه‌گذاری و ثبت شرکت",
      icon: TrendingUp,
      features: ["خرید ملک", "ثبت شرکت", "سرمایه‌گذاری", "تمکن مالی"],
      countries: ["ترکیه", "پرتغال", "یونان", "اسپانیا"],
      color: "bg-purple-500",
      successRate: "92%",
      avgTime: "3-6 ماه",
    },
    {
      id: "family",
      title: "مهاجرت خانوادگی",
      description: "ویزای پیوست به خانواده و الحاق اعضای خانواده",
      icon: Users,
      features: ["ویزای همراه", "ویزای والدین", "پیوستن به خانواده", "اسپانسرشیپ"],
      countries: ["کانادا", "آمریکا", "استرالیا", "انگلستان"],
      color: "bg-orange-500",
      successRate: "88%",
      avgTime: "8-18 ماه",
    },
    {
      id: "ausbildung",
      title: "آوسبیلدونگ آلمان",
      description: "دوره‌های آموزشی حرفه‌ای و کارورزی در آلمان",
      icon: Award,
      features: ["آموزش حرفه‌ای", "کارورزی", "جاب آفر تضمینی", "اقامت کاری"],
      countries: ["آلمان"],
      color: "bg-red-500",
      successRate: "95%",
      avgTime: "2-4 ماه",
    },
    {
      id: "language",
      title: "مرکز آموزش زبان",
      description: "دوره‌های آموزش زبان و آمادگی برای آزمون‌های بین‌المللی",
      icon: MessageSquare,
      features: ["آیلتس", "تافل", "PTE", "زبان آلمانی"],
      countries: ["آنلاین", "حضوری"],
      color: "bg-teal-500",
      successRate: "90%",
      avgTime: "3-6 ماه",
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
      title: "هوش مصنوعی پیشرفته",
      description: "سامانه هوشمند تحلیل شرایط و پیشنهاد بهترین مسیر مهاجرت",
      icon: Brain,
    },
    {
      title: "ویزارد انتخاب روش",
      description: "ابزار تعاملی برای انتخاب بهترین روش مهاجرت بر اساس شرایط شما",
      icon: Sparkles,
    },
    {
      title: "نقشه تعاملی کشورها",
      description: "بررسی کشورهای مهاجرپذیر با اطلاعات کامل و به‌روز",
      icon: Map,
    },
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

  const smartFeatures = [
    {
      title: "ارزیابی هوشمند شرایط",
      description: "تحلیل دقیق پروفایل شما و پیشنهاد بهترین مسیرهای مهاجرت",
      icon: Brain,
      color: "bg-blue-500",
    },
    {
      title: "مقایسه پیشرفته روش‌ها",
      description: "مقایسه جامع روش‌های مختلف مهاجرت بر اساس معیارهای متنوع",
      icon: BarChart3,
      color: "bg-green-500",
    },
    {
      title: "محاسبه‌گر هزینه",
      description: "برآورد دقیق هزینه‌های مهاجرت و زندگی در کشور مقصد",
      icon: Calculator,
      color: "bg-purple-500",
    },
    {
      title: "تقویم مهاجرتی شخصی",
      description: "برنامه‌ریزی زمانی دقیق برای تمام مراحل مهاجرت",
      icon: Calendar,
      color: "bg-orange-500",
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
                <p className="text-sm text-gray-600">سامانه هوشمند مهاجرت</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                خانه
              </Link>
              <Link href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">
                خدمات
              </Link>
              <Link href="#smart-features" className="text-gray-700 hover:text-blue-600 transition-colors">
                ویژگی‌های هوشمند
              </Link>
              <Link href="#countries" className="text-gray-700 hover:text-blue-600 transition-colors">
                کشورها
              </Link>
              <Link href="#wizard" className="text-gray-700 hover:text-blue-600 transition-colors">
                ویزارد مهاجرت
              </Link>
              <Link href="#statistics" className="text-gray-700 hover:text-blue-600 transition-colors">
                آمار و ارقام
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
              سامانه هوشمند مهاجرت
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600"> دیاکو</span>
            </motion.h1>

            <motion.p className="text-xl text-gray-600 mb-8 leading-relaxed" variants={fadeInUp}>
              پلتفرم جامع و هوشمند مهاجرت با بیش از 10 سال سابقه و +35 کارشناس مجرب
              <br />
              ارائه اطلاعات دقیق، به‌روز و شخصی‌سازی شده برای مهاجرت به اروپا و سایر کشورها
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              variants={fadeInUp}
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 text-lg px-8 py-3">
                <Brain className="w-5 h-5 ml-2" />
                ارزیابی هوشمند رایگان
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

      {/* Smart Features Section */}
      <section className="py-20 bg-white" id="smart-features">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">ویژگی‌های هوشمند سامانه</h2>
            <p className="text-xl text-gray-600">
              با استفاده از آخرین فناوری‌های هوش مصنوعی، بهترین مسیر مهاجرت را برای شما پیدا می‌کنیم
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {smartFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50" id="services">
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
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-500 ml-1" />
                          <span>نرخ موفقیت: {service.successRate}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-blue-500 ml-1" />
                          <span>زمان: {service.avgTime}</span>
                        </div>
                      </div>

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

      {/* Migration Methods Section */}
      <MigrationMethodsSection />

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

          <MigrationMethodWizard />
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

      {/* Migration Statistics Section */}
      <section className="py-20 bg-white" id="statistics">
        <div className="container mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">آمار و ارقام مهاجرتی</h2>
            <p className="text-xl text-gray-600">آمار و اطلاعات جامع مهاجرتی کشورهای مختلف و روش‌های مهاجرت</p>
          </motion.div>

          <MigrationStatistics />
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

          <MigrationSuccessStories />
        </div>
      </section>

      {/* Migrant Experiences Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <MigrantExperiences />
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
                  <p className="text-sm text-gray-400">سامانه هوشمند مهاجرت</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                مشاوره تخصصی مهاجرت به کشورهای مختلف با بیش از 10 سال تجربه و استفاده از آخرین فناوری‌های هوش مصنوعی
              </p>
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
              <h4 className="font-semibold mb-4">ابزارهای هوشمند</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    ویزارد انتخاب روش
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    مقایسه روش‌ها
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    محاسبه‌گر هزینه
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    نقشه تعاملی
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
