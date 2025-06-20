"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Search, Users, BarChart3, Shield, Clock, Award, Headphones } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const reasons = [
  {
    icon: Star,
    title: "تجربه و تخصص",
    description: "بیش از ۱۰ سال تجربه در زمینه مهاجرت و همکاری با متخصصان برجسته",
    color: "bg-blue-500",
    stats: "+10 سال",
  },
  {
    icon: Search,
    title: "راهکارهای شخصی‌سازی شده",
    description: "ارائه راهکارهای متناسب با شرایط و نیازهای خاص هر متقاضی",
    color: "bg-green-500",
    stats: "100% شخصی",
  },
  {
    icon: Users,
    title: "پشتیبانی مداوم",
    description: "همراهی و پشتیبانی در تمام مراحل مهاجرت، از ابتدا تا اسکان",
    color: "bg-purple-500",
    stats: "24/7",
  },
  {
    icon: BarChart3,
    title: "نرخ موفقیت بالا",
    description: "بیش از ۹۵٪ نرخ موفقیت در پرونده‌های مهاجرتی و رضایت مشتریان",
    color: "bg-orange-500",
    stats: "95%+",
  },
  {
    icon: Shield,
    title: "امنیت و اعتماد",
    description: "حفظ کامل حریم خصوصی و امنیت اطلاعات شخصی مشتریان",
    color: "bg-red-500",
    stats: "100% امن",
  },
  {
    icon: Clock,
    title: "پردازش سریع",
    description: "پردازش سریع و دقیق پرونده‌ها با استفاده از سیستم‌های مدرن",
    color: "bg-teal-500",
    stats: "سریع",
  },
  {
    icon: Award,
    title: "کیفیت برتر",
    description: "ارائه خدمات با بالاترین کیفیت و استانداردهای بین‌المللی",
    color: "bg-indigo-500",
    stats: "A+",
  },
  {
    icon: Headphones,
    title: "مشاوره رایگان",
    description: "مشاوره تخصصی رایگان با کارشناسان مجرب در اولین جلسه",
    color: "bg-pink-500",
    stats: "رایگان",
  },
]

export function WhyChooseDiako() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 space-x-reverse bg-blue-100 rounded-full px-6 py-2 mb-6"
            >
              <Award className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">مزیت‌های انتخاب دیاکو</span>
            </motion.div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">چرا دیاکو را انتخاب کنیم؟</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              با بیش از یک دهه تجربه و هزاران پرونده موفق، دیاکو بهترین انتخاب برای مهاجرت شماست
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <ScrollReveal key={index} direction="up" delay={index * 0.1}>
              <motion.div whileHover={{ y: -10, scale: 1.02 }} transition={{ duration: 0.3 }} className="group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-6 text-center relative">
                    {/* Background Gradient */}
                    <div className={`absolute top-0 left-0 w-full h-1 ${reason.color}`} />

                    {/* Icon */}
                    <div
                      className={`w-16 h-16 ${reason.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <reason.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Stats Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="text-xs">
                        {reason.stats}
                      </Badge>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{reason.description}</p>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Stats */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="mt-16 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "1000+", label: "پرونده موفق" },
                { number: "95%", label: "نرخ موفقیت" },
                { number: "15+", label: "کشور مقصد" },
                { number: "24/7", label: "پشتیبانی" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
