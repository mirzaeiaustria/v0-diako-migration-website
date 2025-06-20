"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Youtube, Eye, Calendar, Users } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const videos = [
  {
    id: 1,
    title: "راهنمای کامل اکسپرس اینتری 2024",
    thumbnail: "/youtube/express-entry.png",
    views: "12K",
    date: "2 هفته پیش",
    duration: "15:30",
    category: "آموزشی",
  },
  {
    id: 2,
    title: "مقایسه روش‌های مختلف مهاجرت به کانادا",
    thumbnail: "/youtube/comparison.png",
    views: "8.5K",
    date: "1 ماه پیش",
    duration: "22:45",
    category: "مقایسه",
  },
  {
    id: 3,
    title: "مهاجرت به کانادا از ایران - راهنمای گام به گام",
    thumbnail: "/youtube/step-by-step.png",
    views: "15K",
    date: "3 ماه پیش",
    duration: "28:15",
    category: "راهنما",
  },
]

const channelStats = [
  { label: "مشترک", value: "25K+", icon: Users },
  { label: "ویدیو", value: "150+", icon: Play },
  { label: "بازدید", value: "500K+", icon: Eye },
]

export function YoutubeSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Channel Info */}
          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center space-x-2 space-x-reverse bg-red-100 rounded-full px-6 py-2 mb-6"
                >
                  <Youtube className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-800">کانال یوتیوب دیاکو</span>
                </motion.div>

                <h2 className="text-4xl font-bold text-gray-900 mb-4">آموزش‌های تصویری مهاجرت</h2>
                <p className="text-xl text-gray-600 mb-8">
                  با مشاهده ویدیوهای آموزشی ما، از آخرین اخبار و تغییرات قوانین مهاجرتی مطلع شوید
                </p>
              </div>

              {/* Channel Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {channelStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-4 bg-gray-50 rounded-xl"
                  >
                    <stat.icon className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {[
                  "آخرین اخبار و تغییرات قوانین مهاجرتی",
                  "نکات کاربردی درباره سیاست‌های مهاجرتی",
                  "مصاحبه با مهاجران موفق",
                  "آموزش‌ها و راهنمایی‌های تصویری",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-red-600 hover:bg-red-700">
                  <Youtube className="w-5 h-5 mr-2" />
                  عضویت در کانال
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Videos Grid */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg?height=200&width=350"}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center cursor-pointer"
                        >
                          <Play className="w-6 h-6 text-white ml-1" />
                        </motion.div>
                      </div>

                      {/* Duration Badge */}
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary">{video.category}</Badge>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{video.title}</h3>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{video.views} بازدید</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{video.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Button variant="outline" size="lg">
                  مشاهده همه ویدیوها
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
