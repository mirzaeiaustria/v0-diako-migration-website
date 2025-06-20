"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Star, TrendingUp, Clock, DollarSign } from "lucide-react"

interface SmartRecommendation {
  id: string
  country: string
  method: string
  matchScore: number
  successRate: number
  timeframe: string
  cost: string
  pros: string[]
  cons: string[]
  requirements: string[]
  flag: string
}

const mockRecommendations: SmartRecommendation[] = [
  {
    id: "1",
    country: "کانادا",
    method: "اکسپرس اینتری",
    matchScore: 94,
    successRate: 85,
    timeframe: "8-12 ماه",
    cost: "$3,000-5,000",
    pros: ["مسیر سریع به اقامت دائم", "امکان همراهی خانواده", "بازار کار قوی", "کیفیت زندگی بالا"],
    cons: ["رقابت بالا", "نیاز به نمره زبان بالا", "هزینه زندگی بالا در شهرهای بزرگ"],
    requirements: ["مدرک کارشناسی", "آیلتس 7+", "سابقه کاری 3 سال", "ارزیابی مدارک"],
    flag: "🇨🇦",
  },
  {
    id: "2",
    country: "آلمان",
    method: "ویزای جستجوی کار",
    matchScore: 89,
    successRate: 78,
    timeframe: "6-10 ماه",
    cost: "$2,000-4,000",
    pros: ["اقتصاد قوی اروپا", "فرصت‌های شغلی متنوع", "دسترسی به اتحادیه اروپا", "آموزش رایگان"],
    cons: ["نیاز به یادگیری زبان آلمانی", "فرآیند بوروکراتیک", "آب و هوای سرد"],
    requirements: ["مدرک دانشگاهی", "زبان آلمانی B1", "تمکن مالی", "بیمه درمانی"],
    flag: "🇩🇪",
  },
  {
    id: "3",
    country: "استرالیا",
    method: "ویزای مهارتی",
    matchScore: 87,
    successRate: 82,
    timeframe: "10-14 ماه",
    cost: "$4,000-7,000",
    pros: ["آب و هوای عالی", "حقوق بالا", "کیفیت زندگی بالا", "جامعه چندفرهنگی"],
    cons: ["فاصله زیاد از ایران", "هزینه زندگی بالا", "سیستم امتیازبندی پیچیده"],
    requirements: ["ارزیابی مهارت", "آیلتس 6.5+", "سن زیر 45 سال", "تجربه کاری مرتبط"],
    flag: "🇦🇺",
  },
]

export function AISmartRecommendations() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsAnalyzing(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isAnalyzing) {
    return (
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-600 animate-pulse" />
            در حال تحلیل هوشمند پروفایل شما...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
              <span>تحلیل سن و تحصیلات</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <span>بررسی سابقه کاری</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
              <span>مطابقت با کشورهای مختلف</span>
            </div>
            <Progress value={75} className="mt-4" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-green-600" />
            توصیه‌های هوشمند AI برای شما
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {mockRecommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedRecommendation === rec.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => setSelectedRecommendation(rec.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{rec.flag}</span>
                    <div>
                      <h3 className="font-bold text-lg">{rec.country}</h3>
                      <p className="text-sm text-gray-600">{rec.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-500 text-white mb-1">{rec.matchScore}% تطابق</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {index + 1} در رتبه‌بندی
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span>موفقیت: {rec.successRate}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>{rec.timeframe}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-purple-500" />
                    <span>{rec.cost}</span>
                  </div>
                </div>

                {selectedRecommendation === rec.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t"
                  >
                    <Tabs defaultValue="pros" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="pros">مزایا</TabsTrigger>
                        <TabsTrigger value="cons">معایب</TabsTrigger>
                        <TabsTrigger value="requirements">شرایط</TabsTrigger>
                      </TabsList>
                      <TabsContent value="pros" className="mt-3">
                        <ul className="space-y-1">
                          {rec.pros.map((pro, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                      <TabsContent value="cons" className="mt-3">
                        <ul className="space-y-1">
                          {rec.cons.map((con, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                      <TabsContent value="requirements" className="mt-3">
                        <ul className="space-y-1">
                          {rec.requirements.map((req, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                    </Tabs>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
