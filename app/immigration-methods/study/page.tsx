"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, Clock, TrendingUp, Users, Award, Globe, Star, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const studyCountries = [
  {
    name: "آلمان",
    flag: "🇩🇪",
    tuitionFee: "رایگان",
    livingCost: "€800-1200/ماه",
    duration: "3-4 سال",
    language: "آلمانی/انگلیسی",
    advantages: ["تحصیل رایگان", "کیفیت آموزش بالا", "فرصت کار پس از تحصیل"],
    requirements: ["مدرک دیپلم", "زبان آلمانی B2", "تمکن مالی"],
    successRate: 85,
  },
  {
    name: "کانادا",
    flag: "🇨🇦",
    tuitionFee: "CAD 15,000-35,000",
    livingCost: "CAD 1,200-1,800/ماه",
    duration: "2-4 سال",
    language: "انگلیسی/فرانسوی",
    advantages: ["مسیر به اقامت دائم", "کار حین تحصیل", "جامعه چندفرهنگی"],
    requirements: ["مدرک دیپلم", "آیلتس 6.5+", "تمکن مالی"],
    successRate: 78,
  },
  {
    name: "استرالیا",
    flag: "🇦🇺",
    tuitionFee: "AUD 20,000-45,000",
    livingCost: "AUD 1,500-2,500/ماه",
    duration: "3-4 سال",
    language: "انگلیسی",
    advantages: ["آب و هوای عالی", "کیفیت زندگی بالا", "فرصت‌های شغلی"],
    requirements: ["مدرک دیپلم", "آیلتس 6.0+", "تمکن مالی"],
    successRate: 82,
  },
]

const studySteps = [
  {
    step: 1,
    title: "انتخاب رشته و دانشگاه",
    description: "تحقیق و انتخاب بهترین گزینه‌ها",
    duration: "2-4 هفته",
  },
  {
    step: 2,
    title: "آماده‌سازی مدارک",
    description: "ترجمه و تأیید مدارک تحصیلی",
    duration: "4-6 هفته",
  },
  {
    step: 3,
    title: "آزمون زبان",
    description: "کسب نمره مطلوب در آزمون‌های زبان",
    duration: "2-8 هفته",
  },
  {
    step: 4,
    title: "درخواست پذیرش",
    description: "ارسال درخواست به دانشگاه‌ها",
    duration: "4-12 هفته",
  },
  {
    step: 5,
    title: "درخواست ویزا",
    description: "اقدام برای اخذ ویزای تحصیلی",
    duration: "4-8 هفته",
  },
]

export default function StudyImmigrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">مهاجرت تحصیلی</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              راهی مطمئن برای ورود به بهترین دانشگاه‌های جهان و دستیابی به اقامت دائم
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                مشاوره رایگان
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                دانلود راهنما
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "15,000+", label: "دانشجوی موفق", icon: Users },
              { number: "85%", label: "نرخ موفقیت", icon: TrendingUp },
              { number: "200+", label: "دانشگاه همکار", icon: Award },
              { number: "25+", label: "کشور مقصد", icon: Globe },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">محبوب‌ترین کشورها برای تحصیل</h2>
            <p className="text-xl text-gray-600">انتخاب بهترین مقصد برای آینده‌ای روشن</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {studyCountries.map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{country.flag}</span>
                      <div>
                        <CardTitle className="text-2xl">{country.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-600">نرخ موفقیت: {country.successRate}%</span>
                        </div>
                      </div>
                    </div>
                    <Progress value={country.successRate} className="h-2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">شهریه:</div>
                          <div className="font-medium">{country.tuitionFee}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">هزینه زندگی:</div>
                          <div className="font-medium">{country.livingCost}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">مدت تحصیل:</div>
                          <div className="font-medium">{country.duration}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">زبان:</div>
                          <div className="font-medium">{country.language}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600 mb-2">مزایا:</div>
                        <div className="space-y-1">
                          {country.advantages.map((advantage, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              {advantage}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600 mb-2">شرایط:</div>
                        <div className="flex flex-wrap gap-1">
                          {country.requirements.map((req, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full">
                        اطلاعات بیشتر
                        <ArrowRight className="w-4 h-4 mr-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">مراحل مهاجرت تحصیلی</h2>
            <p className="text-xl text-gray-600">گام به گام تا رسیدن به هدف</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {studySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-6 mb-8"
              >
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-2">{step.description}</p>
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <Clock className="w-4 h-4" />
                    مدت زمان: {step.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="text-4xl font-bold mb-6">آماده شروع مسیر تحصیل در خارج هستید؟</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              با مشاوران متخصص ما تماس بگیرید و اولین قدم را برای آینده‌ای بهتر بردارید
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                مشاوره رایگان
              </Button>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  بازگشت به صفحه اصلی
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
