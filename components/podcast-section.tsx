"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Headphones, Download, Star } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

const podcastEpisodes = [
  {
    id: 1,
    title: "راهنمای کامل اکسپرس اینتری کانادا 2024",
    description: "بررسی کامل شرایط و مراحل اکسپرس اینتری",
    duration: "45:30",
    date: "1403/09/15",
    plays: "12.5K",
    rating: 4.8,
  },
  {
    id: 2,
    title: "مهاجرت تحصیلی به آلمان - نکات کلیدی",
    description: "آشنایی با دانشگاه‌ها و شرایط پذیرش",
    duration: "38:20",
    date: "1403/09/10",
    plays: "8.2K",
    rating: 4.9,
  },
  {
    id: 3,
    title: "سرمایه‌گذاری در پرتغال - ویزای طلایی",
    description: "راهنمای کامل اخذ ویزای طلایی پرتغال",
    duration: "52:15",
    date: "1403/09/05",
    plays: "15.3K",
    rating: 4.7,
  },
]

export function PodcastSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23f59e0b' fillOpacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 space-x-reverse bg-amber-200/50 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
            >
              <Headphones className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-medium text-amber-800">پادکست مهاجرتی دیاکو</span>
            </motion.div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">گوش دهید، یاد بگیرید، موفق شوید</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              کارشناسان مهاجرت دیاکو و مهمانان ویژه به سوالات متداول مهاجرتی پاسخ می‌دهند و آخرین اخبار و تغییرات قوانین
              مهاجرتی را بررسی می‌کنند
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {podcastEpisodes.map((episode, index) => (
            <ScrollReveal key={episode.id} direction="up" delay={index * 0.1}>
              <motion.div whileHover={{ y: -10, scale: 1.02 }} transition={{ duration: 0.3 }}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium">{episode.rating}</span>
                      </div>
                      <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                        {episode.duration}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{episode.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{episode.description}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{episode.date}</span>
                      <span>{episode.plays} پخش</span>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                        <Play className="w-4 h-4 mr-2" />
                        پخش قسمت
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Podcast Platforms */}
        <ScrollReveal direction="up" delay={0.3}>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">پادکست دیاکو را در پلتفرم‌های مختلف دنبال کنید</h3>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { name: "Spotify", logo: "/podcast/spotify.png", url: "https://open.spotify.com" },
                { name: "Apple Podcasts", logo: "/podcast/apple-podcasts.png", url: "https://podcasts.apple.com" },
                { name: "Google Podcasts", logo: "/podcast/google-podcasts.png", url: "https://podcasts.google.com" },
                { name: "Castbox", logo: "/podcast/castbox.png", url: "https://castbox.fm" },
              ].map((platform) => (
                <motion.div key={platform.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link href={platform.url} target="_blank" rel="noopener noreferrer">
                    <div className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                      <img
                        src={platform.logo || "/placeholder.svg?height=48&width=48"}
                        alt={platform.name}
                        className="h-12 w-auto mx-auto"
                      />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="bg-white hover:bg-gray-50">
                <Download className="w-5 h-5 mr-2" />
                مشاهده همه قسمت‌ها
              </Button>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
