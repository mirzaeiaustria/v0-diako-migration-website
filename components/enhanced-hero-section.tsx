"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Brain,
  Video,
  Map,
  Calculator,
  TrendingUp,
  Users,
  Award,
  Globe,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Target,
} from "lucide-react"
import { AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { GradientText } from "@/components/ui/gradient-text"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { AdvancedMigrationWizard } from "@/components/advanced-migration-wizard"

const heroFeatures = [
  {
    icon: Brain,
    title: "ارزیابی هوشمند",
    description: "تحلیل دقیق شرایط شما با هوش مصنوعی",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Calculator,
    title: "محاسبه‌گر هزینه",
    description: "برآورد دقیق هزینه‌های مهاجرت",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Map,
    title: "نقشه تعاملی",
    description: "کاوش کشورهای مهاجرپذیر",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: Target,
    title: "مشاوره شخصی",
    description: "راهنمایی تخصصی برای هر فرد",
    color: "from-orange-500 to-red-500",
  },
]

const statistics = [
  {
    label: "نرخ موفقیت",
    value: 95,
    suffix: "%",
    icon: CheckCircle,
    color: "text-green-600",
    description: "پرونده‌های موفق",
  },
  {
    label: "سال تجربه",
    value: 10,
    suffix: "+",
    icon: Award,
    color: "text-blue-600",
    description: "در صنعت مهاجرت",
  },
  {
    label: "کشور تحت پوشش",
    value: 15,
    suffix: "+",
    icon: Globe,
    color: "text-orange-600",
    description: "مقاصد مهاجرتی",
  },
  {
    label: "مشتری موفق",
    value: 5000,
    suffix: "+",
    icon: Users,
    color: "text-purple-600",
    description: "در سال گذشته",
  },
]

const quickActions = [
  {
    title: "ارزیابی رایگان",
    description: "شرایط خود را ارزیابی کنید",
    icon: Brain,
    action: "assessment",
    color: "bg-blue-600",
    hoverColor: "hover:bg-blue-700",
  },
  {
    title: "مشاوره آنلاین",
    description: "با کارشناس صحبت کنید",
    icon: Video,
    action: "consultation",
    color: "bg-green-600",
    hoverColor: "hover:bg-green-700",
  },
  {
    title: "محاسبه هزینه",
    description: "هزینه‌های مهاجرت را بدانید",
    icon: Calculator,
    action: "calculator",
    color: "bg-purple-600",
    hoverColor: "hover:bg-purple-700",
  },
]

export function EnhancedHeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false) // New state for calculator modal

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      text: "دیاکو بهترین تصمیم زندگی‌ام بود. الان در کانادا زندگی می‌کنم و خیلی راضی‌ام.",
      author: "علی رضایی",
      location: "تورنتو، کانادا",
      method: "Express Entry",
    },
    {
      text: "با کمک تیم دیاکو موفق به اخذ آوسبیلدونگ در آلمان شدم. فرآیند خیلی راحت بود.",
      author: "مریم احمدی",
      location: "برلین، آلمان",
      method: "آوسبیلدونگ",
    },
    {
      text: "سرمایه‌گذاری در پرتغال با راهنمایی دیاکو بسیار موفقیت‌آمیز بود.",
      author: "حسین کریمی",
      location: "لیسبون، پرتغال",
      method: "Golden Visa",
    },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <FloatingParticles count={60} />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-teal-600/5" />

        {/* Animated Background Shapes */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-right"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-blue-200"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">سامانه هوشمند مهاجرت</span>
              <Badge className="bg-blue-600 text-white text-xs">جدید</Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              مهاجرت هوشمند با
              <br />
              <GradientText className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600">دیاکو</GradientText>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              اولین پلتفرم مبتنی بر هوش مصنوعی برای مهاجرت به اروپا
              <br />
              <span className="text-blue-600 font-semibold">بیش از 95% نرخ موفقیت</span> در پرونده‌های مهاجرتی
            </motion.p>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start"
            >
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.action}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Button
                    size="lg"
                    className={`${action.color} ${action.hoverColor} text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                    asChild={
                      action.action === "consultation" ||
                      action.action === "assessment" ||
                      action.action === "calculator"
                    }
                  >
                    {action.action === "consultation" ? (
                      <a href="https://calendly.com/diaco-holding/15min" target="_blank" rel="noopener noreferrer">
                        {action.icon && <action.icon className="w-5 h-5 ml-2" />}
                        <div className="text-right">
                          <div className="font-semibold">{action.title}</div>
                          <div className="text-xs opacity-90">{action.description}</div>
                        </div>
                      </a>
                    ) : action.action === "assessment" ? (
                      <a href="https://diaco.formaloo.co/5bbjx" target="_blank" rel="noopener noreferrer">
                        {action.icon && <action.icon className="w-5 h-5 ml-2" />}
                        <div className="text-right">
                          <div className="font-semibold">{action.title}</div>
                          <div className="text-xs opacity-90">{action.description}</div>
                        </div>
                      </a>
                    ) : action.action === "calculator" ? (
                      <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
                        <DialogTrigger asChild>
                          <button className="flex items-center w-full h-full">
                            {action.icon && <action.icon className="w-5 h-5 ml-2" />}
                            <div className="text-right">
                              <div className="font-semibold">{action.title}</div>
                              <div className="text-xs opacity-90">{action.description}</div>
                            </div>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl p-6">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-gray-900 text-right">
                              محاسبه‌گر هزینه مهاجرت
                            </DialogTitle>
                            <DialogDescription className="text-right text-gray-600 mt-2">
                              به اطلاع مشاورین هلدینگ مهاجرتی دیاکو می‌رساند که متأسفانه بخش محاسبه‌گر هزینه مهاجرتی شما
                              در حال حاضر عملکرد درستی ندارد و فعال نیست. برای ارائه خدمات بهتر به کاربران، لازم است این
                              بخش به طور کامل فعال و بهینه شود.
                              <br />
                              <br />
                              بخش تخمین هزینه مهاجرتی باید شامل تمامی روش‌های مهاجرتی مرتبط با هر کشور باشد. پس از بررسی
                              هر کیس به صورت جداگانه، اطلاعات زیر باید به کاربران ارائه شود:
                              <ul className="list-disc list-inside mt-4 space-y-2">
                                <li>
                                  <span className="font-semibold">تخمین درصد موفقیت:</span> برآورد تقریبی شانس موفقیت
                                  شما در روش مهاجرتی انتخابی.
                                </li>
                                <li>
                                  <span className="font-semibold">محاسبه هزینه‌های مهاجرتی:</span> جزئیات کامل هزینه‌های
                                  مربوط به آن روش مهاجرتی، شامل هزینه‌های دولتی، وکیل، ترجمه و سایر موارد، که در قالب متن
                                  و چارت به شما نمایش داده خواهد شد.
                                </li>
                              </ul>
                              <br />
                              خواهشمند است در اسرع وقت نسبت به رفع مشکل و فعال‌سازی کامل این بخش اقدام فرمایید.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="flex flex-col sm:flex-row-reverse sm:justify-start gap-4 mt-6">
                            <Button asChild>
                              <a
                                href="https://calendly.com/diaco-holding/15min"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                رزرو وقت مشاوره
                              </a>
                            </Button>
                            <Button variant="outline" asChild>
                              <a href="tel:YOUR_PHONE_NUMBER">
                                {" "}
                                {/* Placeholder for phone number */}
                                مشاوره رایگان
                              </a>
                            </Button>
                            <DialogClose asChild>
                              <Button variant="secondary">بستن</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <>
                        {action.icon && <action.icon className="w-5 h-5 ml-2" />}
                        <div className="text-right">
                          <div className="font-semibold">{action.title}</div>
                          <div className="text-xs opacity-90">{action.description}</div>
                        </div>
                      </>
                    )}
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {statistics.map((stat, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} className="text-center">
                  <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-4">
                      {stat.icon && <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />}
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-sm font-medium text-gray-700 mb-1">{stat.label}</div>
                      <div className="text-xs text-gray-500">{stat.description}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="space-y-6"
          >
            {/* Featured Card - AI Assessment */}
            <motion.div whileHover={{ scale: 1.02, y: -5 }} transition={{ duration: 0.3 }}>
              <Card className="bg-gradient-to-br from-blue-600 to-teal-600 text-white border-0 shadow-2xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Brain className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">ارزیابی هوشمند رایگان</h3>
                      <p className="text-blue-100">در کمتر از 5 دقیقه</p>
                    </div>
                  </div>
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    در کمتر از 5 دقیقه، مشاورین هلدینگ مهاجرتی دیاکو بر اساس اطلاعات شما، بهترین مسیر مهاجرت را پیشنهاد
                    داده و احتمال موفقیت شما را محاسبه می‌کنند.
                  </p>
                  <Dialog open={isWizardOpen} onOpenChange={setIsWizardOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3">
                        شروع ارزیابی رایگان
                        <ArrowRight className="w-5 h-5 mr-2" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 overflow-hidden">
                      <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-2xl font-bold text-gray-900">ارزیابی هوشمند مهاجرت</DialogTitle>
                      </DialogHeader>
                      <div className="p-6 pt-0">
                        <AdvancedMigrationWizard />
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4">
              {heroFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Card className="bg-white/70 backdrop-blur-sm border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        {feature.icon && <feature.icon className="w-6 h-6 text-white" />}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Testimonial Carousel */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
              <Card className="bg-white/70 backdrop-blur-sm border-white/30 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-600">داستان موفقیت</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <blockquote className="text-gray-700 mb-4 italic">
                        {testimonials[currentTestimonial].text}
                      </blockquote>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].author}</div>
                          <div className="text-sm text-gray-500">{testimonials[currentTestimonial].location}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {testimonials[currentTestimonial].method}
                        </Badge>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Testimonial Indicators */}
                  <div className="flex justify-center gap-2 mt-4">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentTestimonial ? "bg-blue-600 w-6" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 mb-6">مورد اعتماد هزاران مهاجر موفق</p>
          <div className="flex items-center justify-center gap-8 opacity-60">
            {/* Trust badges/logos would go here */}
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm">مجوز رسمی</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-sm">ISO 27001</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span className="text-sm">پردازش سریع</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
