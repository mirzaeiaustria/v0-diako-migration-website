"use client"

import { EnhancedTimelinePlanner } from "@/components/enhanced-timeline-planner"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TimelinePlannerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-20" dir="rtl">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 space-x-reverse bg-purple-100 rounded-full px-6 py-2 mb-6"
            >
              <Calendar className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">برنامه‌ریز زمانی مهاجرت</span>
            </motion.div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">برنامه‌ریزی مرحله‌ای فرآیند مهاجرت</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              با استفاده از هوش مصنوعی، برنامه زمان‌بندی شخصی‌سازی شده برای مهاجرت خود دریافت کنید
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline Planner Component */}
        <ScrollReveal direction="up" delay={0.2}>
          <EnhancedTimelinePlanner />
        </ScrollReveal>

        {/* Back to Home */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="text-center mt-12">
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                بازگشت به صفحه اصلی
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
