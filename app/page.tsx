"use client"

import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { AdvancedMigrationWizard } from "@/components/advanced-migration-wizard"
import { InteractiveWorldMap } from "@/components/interactive-world-map"
import { MigrationStatistics } from "@/components/migration-statistics"
import { MigrationSuccessStories } from "@/components/migration-success-stories"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ParallaxSection } from "@/components/ui/parallax-section"
import { motion } from "framer-motion"
import { PodcastSection } from "@/components/podcast-section"
import { MobileAppSection } from "@/components/mobile-app-section"
import { YoutubeSection } from "@/components/youtube-section"
import { RealTimeChat } from "@/components/real-time-chat"
import {
  Phone,
  Globe,
  MessageSquare,
  Video,
  Users,
  TrendingUp,
  Target,
  Award,
  BookOpen,
  Shield,
  Zap,
  Clock,
  Headphones,
  Brain,
  Sparkles,
  BarChart3,
  Calculator,
  Map,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { InteractiveBanner } from "@/components/interactive-banner"
import { CostCalculator } from "@/components/cost-calculator"
import { ImmigrantAssociation } from "@/components/immigrant-association"
import { DynamicNavigation } from "@/components/dynamic-navigation"

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
    link: "/services/education",
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
    link: "/services/work",
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
    link: "/services/investment",
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
    link: "/services/family",
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
    link: "/services/ausbildung",
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
    link: "/services/language",
  },
]

const smartFeatures = [
  {
    title: "ارزیابی هوشمند شرایط",
    description: "تحلیل دقیق پروفایل شما و پیشنهاد بهترین مسیرهای مهاجرت",
    icon: Brain,
    color: "bg-blue-500",
    link: "/tools/ai-recommendations",
  },
  {
    title: "مقایسه پیشرفته روش‌ها",
    description: "مقایسه جامع روش‌های مختلف مهاجرت بر اساس معیارهای متنوع",
    icon: BarChart3,
    color: "bg-green-500",
    link: "/tools/comparison",
  },
  {
    title: "محاسبه‌گر هزینه",
    description: "برآورد دقیق هزینه‌های مهاجرت و زندگی در کشور مقصد",
    icon: Calculator,
    color: "bg-purple-500",
    link: "/tools/cost-calculator",
  },
  {
    title: "تقویم مهاجرتی شخصی",
    description: "برنامه‌ریزی زمانی دقیق برای تمام مراحل مهاجرت",
    icon: Clock,
    color: "bg-orange-500",
    link: "/tools/timeline-planner",
  },
]

const features = [
  {
    title: "هوش مصنوعی پیشرفته",
    description: "سامانه هوشمند تحلیل شرایط و پیشنهاد بهترین مسیر مهاجرت",
    icon: Brain,
    link: "/tools/ai-assistant",
  },
  {
    title: "ویزارد انتخاب روش",
    description: "ابزار تعاملی برای انتخاب بهترین روش مهاجرت بر اساس شرایط شما",
    icon: Sparkles,
    link: "#wizard",
  },
  {
    title: "نقشه تعاملی کشورها",
    description: "بررسی کشورهای مهاجرپذیر با اطلاعات کامل و به‌روز",
    icon: Map,
    link: "#countries",
  },
  {
    title: "مشاوره رایگان",
    description: "مشاوره تخصصی رایگان با کارشناسان مجرب",
    icon: Headphones,
    link: "#contact",
  },
  {
    title: "پیگیری آنلاین",
    description: "پیگیری وضعیت پرونده از طریق پنل کاربری",
    icon: BarChart3,
    link: "#statistics",
  },
  {
    title: "تیم متخصص",
    description: "بیش از 35 کارشناس و مشاور مجرب",
    icon: Users,
    link: "#contact",
  },
  {
    title: "امنیت بالا",
    description: "حفاظت کامل از اطلاعات شخصی شما",
    icon: Shield,
    link: "#newsletter",
  },
  {
    title: "پردازش سریع",
    description: "پردازش سریع و دقیق پرونده‌ها",
    icon: Zap,
    link: "#services",
  },
  {
    title: "پشتیبانی 24/7",
    description: "پشتیبانی مداوم در تمام مراحل",
    icon: Clock,
    link: "#contact",
  },
]

// تابع برای اسکرول نرم به بخش مورد نظر
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId.replace("#", ""))
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

export default function DiacoHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" dir="rtl">
      {/* Dynamic Navigation */}
      <DynamicNavigation />

      {/* Interactive Professional Banner */}
      <InteractiveBanner />

      {/* Enhanced Hero Section */}
      <EnhancedHeroSection />

      {/* Smart Features Section */}
      <section className="py-20 bg-white" id="smart-features">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">ویژگی‌های هوشمند سامانه</h2>
              <p className="text-xl text-gray-600">
                با استفاده از آخرین فناوری‌های هوش مصنوعی، بهترین مسیر مهاجرت را برای شما پیدا می‌کنیم
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {smartFeatures.map((feature, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                <motion.div
                  className="text-center cursor-pointer"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={feature.link}>
                    <div
                      className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </Link>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculator Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50" id="cost-calculator">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">محاسبه‌گر هزینه مهاجرت</h2>
              <p className="text-xl text-gray-600">محاسبه دقیق هزینه‌های مهاجرت و زندگی در کشور مقصد</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <CostCalculator />
          </ScrollReveal>
        </div>
      </section>

      {/* Immigrant Association Section */}
      <section className="py-20 bg-white" id="immigrant-association">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">انجمن مهاجران</h2>
              <p className="text-xl text-gray-600">اشتراک تجربیات و ارتباط با سایر متقاضیان مهاجرت</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <ImmigrantAssociation />
          </ScrollReveal>
        </div>
      </section>

      {/* Services Section */}
      <ParallaxSection className="py-20 bg-gradient-to-br from-blue-50 to-teal-50" id="services">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">خدمات جامع مهاجرتی</h2>
              <p className="text-xl text-gray-600">ارائه کامل‌ترین خدمات مهاجرتی با تیم متخصص و مجرب</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={service.id} direction="up" delay={index * 0.1}>
                <motion.div whileHover={{ y: -10, scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div
                          className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center shadow-lg`}
                        >
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
                            <Award className="w-4 h-4 text-green-500 ml-1" />
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

                      <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                        <Link href={service.link}>
                          <Button variant="link" className="mt-4 p-0 h-auto text-blue-600 w-full justify-start">
                            اطلاعات بیشتر
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <ArrowRight className="w-4 h-4 mr-1" />
                            </motion.div>
                          </Button>
                        </Link>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Migration Wizard Section */}
      <section className="py-20 bg-white" id="wizard">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">ویزارد هوشمند انتخاب روش مهاجرت</h2>
              <p className="text-xl text-gray-600">
                با پاسخ به چند سوال ساده، بهترین روش مهاجرتی مناسب شرایط شما را پیدا کنید
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <AdvancedMigrationWizard />
          </ScrollReveal>
        </div>
      </section>

      {/* Interactive World Map Section */}
      <ParallaxSection className="py-20 bg-gradient-to-br from-blue-50 to-teal-50" id="countries">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">نقشه تعاملی کشورهای مهاجرپذیر</h2>
              <p className="text-xl text-gray-600">اطلاعات جامع درباره کشورهای مهاجرپذیر و روش‌های مختلف مهاجرت</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <InteractiveWorldMap />
          </ScrollReveal>
        </div>
      </ParallaxSection>

      {/* Podcast Section */}
      <PodcastSection />

      {/* YouTube Section */}
      <YoutubeSection />

      {/* Mobile App Section */}
      <MobileAppSection />

      {/* Migration Statistics Section */}
      <section className="py-20 bg-white" id="statistics">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">آمار و ارقام مهاجرتی</h2>
              <p className="text-xl text-gray-600">آمار و اطلاعات جامع مهاجرتی کشورهای مختلف و روش‌های مهاجرت</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <MigrationStatistics />
          </ScrollReveal>
        </div>
      </section>

      {/* Success Stories */}
      <ParallaxSection className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">داستان‌های موفقیت</h2>
              <p className="text-xl text-gray-600">تجربیات واقعی مشتریان ما در مسیر مهاجرت موفق</p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <MigrationSuccessStories />
          </ScrollReveal>
        </div>
      </ParallaxSection>

      {/* Features Section */}
      <ParallaxSection className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">ابزارهای هوشمند دیاکو</h2>
              <p className="text-xl text-gray-600">مجموعه کاملی از ابزارهای پیشرفته برای تسهیل فرآیند مهاجرت</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                <motion.div
                  className="text-center cursor-pointer"
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    if (feature.link.startsWith("#")) {
                      scrollToSection(feature.link)
                    } else {
                      window.location.href = feature.link
                    }
                  }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Newsletter Section */}
      <section className="py-20 bg-white" id="newsletter">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up">
            <div className="bg-gradient-to-br from-blue-700 to-blue-800 text-white rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold mb-4">از آخرین اخبار جا نمانید!</h2>
                  <p className="text-blue-200 text-lg leading-relaxed">
                    با عضویت در خبرنامه دیاکو، جدیدترین تحلیل‌ها، اخبار و فرصت‌های مهاجرتی را در ایمیل خود دریافت کنید.
                  </p>
                  <div className="mt-6 flex items-center space-x-4 space-x-reverse">
                    <div className="flex items-center text-blue-200">
                      <MessageSquare className="w-5 h-5 ml-2" />
                      <span className="text-sm">هفتگی ارسال می‌شود</span>
                    </div>
                    <div className="flex items-center text-blue-200">
                      <Shield className="w-5 h-5 ml-2" />
                      <span className="text-sm">حریم خصوصی محفوظ</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <form className="flex flex-col sm:flex-row gap-4">
                    <motion.input
                      type="email"
                      placeholder="آدرس ایمیل شما"
                      className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300"
                      required
                      whileFocus={{ scale: 1.02 }}
                    />
                    <motion.button
                      type="submit"
                      className="bg-yellow-400 text-blue-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-all duration-300 shrink-0 shadow-lg"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      عضویت در خبرنامه
                    </motion.button>
                  </form>

                  <div className="mt-4 text-sm text-blue-200">
                    با عضویت، شما با{" "}
                    <Link href="#" className="underline hover:text-white transition-colors">
                      شرایط و قوانین
                    </Link>{" "}
                    ما موافقت می‌کنید.
                  </div>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="py-20 bg-gradient-to-br from-teal-600 to-blue-700 text-white relative overflow-hidden"
        id="contact"
      >
        {/* Background Animation */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">هلدینگ مهاجرتی دیاکو</h2>
              <p className="text-xl text-teal-100 max-w-4xl mx-auto">
                شرکت مشاوره مهاجرتی بین‌المللی با فعالیت در ایران و اروپا
                <br />
                ارائه خدمات مهاجرت تحصیلی، کاری و سرمایه‌گذاری به متقاضیان ایرانی و خارجی
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { phone: "021-9169-3955", icon: Phone },
              { phone: "021-8807-3287", icon: Phone },
              { phone: "021-8809-5702", icon: Phone },
              { phone: "09306229790", icon: Phone },
            ].map((contact, index) => (
              <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                <motion.a
                  href={`tel:${contact.phone}`}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 block"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <contact.icon className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                  <div className="text-lg font-semibold">{contact.phone}</div>
                </motion.a>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                <motion.div className="flex items-center space-x-2 space-x-reverse" whileHover={{ scale: 1.05 }}>
                  <Globe className="w-5 h-5" />
                  <span>DIACO.EU</span>
                </motion.div>
                <motion.div className="flex items-center space-x-2 space-x-reverse" whileHover={{ scale: 1.05 }}>
                  <Globe className="w-5 h-5" />
                  <span>DIACO.CONSULTING</span>
                </motion.div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { icon: MessageSquare, label: "تلگرام", link: "#contact" },
                  { icon: Video, label: "اینستاگرام", link: "#contact" },
                  { icon: Globe, label: "لینکدین", link: "#contact" },
                ].map((social, index) => (
                  <motion.div key={social.label} whileHover={{ scale: 1.1, y: -5 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-blue-600 transition-all duration-300"
                      onClick={() => scrollToSection(social.link)}
                    >
                      <social.icon className="w-4 h-4 ml-2" />
                      {social.label}
                    </Button>
                  </motion.div>
                ))}
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
                    <p className="text-sm text-gray-400">سامانه هوشمند مهاجرت</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  مشاوره تخصصی مهاجرت به کشورهای مختلف با بیش از 10 سال تجربه و استفاده از آخرین فناوری‌های هوش مصنوعی
                </p>
              </div>
            </ScrollReveal>

            {[
              {
                title: "خدمات",
                links: [
                  { name: "مهاجرت تحصیلی", link: "/services/education" },
                  { name: "مهاجرت کاری", link: "/services/work" },
                  { name: "مهاجرت سرمایه‌گذاری", link: "/services/investment" },
                  { name: "آوسبیلدونگ آلمان", link: "/services/ausbildung" },
                ],
              },
              {
                title: "ابزارهای هوشمند",
                links: [
                  { name: "ویزارد انتخاب روش", link: "#wizard" },
                  { name: "مقایسه روش‌ها", link: "/tools/comparison" },
                  { name: "محاسبه‌گر هزینه", link: "/tools/cost-calculator" },
                  { name: "نقشه تعاملی", link: "#countries" },
                ],
              },
              {
                title: "تماس با ما",
                links: [
                  { name: "021-8807-3287", link: "tel:02188073287" },
                  { name: "info@diaco.eu", link: "mailto:info@diaco.eu" },
                  { name: "تهران، شهرک غرب", link: "#contact" },
                  { name: "سوالات متداول", link: "/faq" },
                ],
              },
            ].map((section, index) => (
              <ScrollReveal key={section.title} direction="up" delay={index * 0.1}>
                <div>
                  <h4 className="font-semibold mb-4">{section.title}</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {section.links.map((link, linkIndex) => (
                      <motion.li key={linkIndex} whileHover={{ x: 5, color: "#ffffff" }} transition={{ duration: 0.2 }}>
                        <Link href={link.link} className="hover:text-white transition-colors">
                          {link.name}
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

      {/* Real-time Chat Component */}
      <RealTimeChat />
    </div>
  )
}
