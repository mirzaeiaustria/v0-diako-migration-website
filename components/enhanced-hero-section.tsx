"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Video, Map, Users, Award, Globe, Clock, ArrowRight, Sparkles, Shield } from "lucide-react"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { GradientText } from "@/components/ui/gradient-text"
import { InteractiveCard } from "@/components/ui/interactive-card"

const heroFeatures = [
  {
    icon: Brain,
    title: "هوش مصنوعی پیشرفته",
    description: "تحلیل هوشمند شرایط شما",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Sparkles,
    title: "ویزارد انتخاب روش",
    description: "پیشنهاد بهترین مسیر مهاجرت",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Map,
    title: "نقشه تعاملی",
    description: "بررسی کشورهای مهاجرپذیر",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "امنیت بالا",
    description: "حفاظت کامل اطلاعات شما",
    color: "from-orange-500 to-red-500",
  },
]

const statistics = [
  {
    icon: Users,
    value: 5000,
    suffix: "+",
    label: "متقاضی موفق سالانه",
    color: "text-blue-600",
  },
  {
    icon: Award,
    value: 95,
    suffix: "%",
    label: "نرخ موفقیت پرونده‌ها",
    color: "text-green-600",
  },
  {
    icon: Globe,
    value: 15,
    suffix: "+",
    label: "کشور تحت پوشش",
    color: "text-purple-600",
  },
  {
    icon: Clock,
    value: 10,
    suffix: "+",
    label: "سال سابقه فعالیت",
    color: "text-orange-600",
  },
]

const floatingWords = ["مهاجرت تحصیلی", "مهاجرت کاری", "آوسبیلدونگ", "سرمایه‌گذاری", "مشاوره تخصصی", "ویزای اروپا"]

export function EnhancedHeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % floatingWords.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <FloatingParticles count={30} />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-teal-600/5" />
      </div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
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
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
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
        {/* Header */}
        <motion.header
          className="py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-4 space-x-reverse"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">د</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">هلدینگ مهاجرتی دیاکو</h1>
                <p className="text-sm text-gray-600">سامانه هوشمند مهاجرت</p>
              </div>
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              {["خانه", "خدمات", "کشورها", "ویزارد مهاجرت", "تماس با ما"].map((item, index) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-blue-600 transition-colors relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="flex items-center space-x-4 space-x-reverse"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                ورود
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:scale-105 transition-transform"
              >
                مشاوره رایگان
              </Button>
            </motion.div>
          </div>
        </motion.header>

        {/* Main Hero Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-20 gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-right">
            <ScrollReveal direction="up" delay={0.2}>
              <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                <Sparkles className="w-4 h-4 ml-1" />
                جدید: سیستم هوش مصنوعی پیشرفته
              </Badge>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.4}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                سامانه هوشمند مهاجرت
                <br />
                <GradientText className="text-5xl md:text-7xl">دیاکو</GradientText>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.6}>
              <div className="mb-8 h-16 flex items-center justify-center lg:justify-start">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentWordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl text-gray-600 font-medium"
                  >
                    متخصص در {floatingWords[currentWordIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.8}>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                پلتفرم جامع و هوشمند مهاجرت با بیش از 10 سال سابقه و +35 کارشناس مجرب
                <br />
                ارائه اطلاعات دقیق، به‌روز و شخصی‌سازی شده برای مهاجرت به اروپا
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={1}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 text-lg px-8 py-4 shadow-lg">
                    <Brain className="w-5 h-5 ml-2" />
                    ارزیابی هوشمند رایگان
                    <ArrowRight className="w-5 h-5 mr-2" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2">
                    <Video className="w-5 h-5 ml-2" />
                    مشاوره آنلاین
                  </Button>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Statistics */}
            <ScrollReveal direction="up" delay={1.2}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {statistics.map((stat, index) => (
                  <InteractiveCard key={index} className="text-center">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                      <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                      <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                        <AnimatedCounter from={0} to={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </InteractiveCard>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Content - Features */}
          <div className="flex-1 max-w-lg">
            <ScrollReveal direction="left" delay={1.4}>
              <div className="grid grid-cols-1 gap-6">
                {heroFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
                  >
                    <InteractiveCard>
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}
                          >
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    </InteractiveCard>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="w-1 h-3 bg-gray-400 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
