"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Briefcase, TrendingUp, Users, Target, Globe, Star, CheckCircle, ArrowRight, Building } from "lucide-react"
import Link from "next/link"

const workCountries = [
  {
    name: "کانادا",
    flag: "🇨🇦",
    averageSalary: "CAD 65,000",
    jobMarket: "عالی",
    language: "انگلیسی/فرانسوی",
    mainProgram: "اکسپرس اینتری",
    advantages: ["مسیر سریع به اقامت دائم", "بازار کار قوی", "کیفیت زندگی بالا"],
    requirements: ["مدرک دانشگاهی", "آیلتس 7+", "سابقه کاری 3 سال"],
    successRate: 85,
    processingTime: "6-12 ماه",
  },
  {
    name: "آلمان",
    flag: "🇩🇪",
    averageSalary: "€55,000",
    jobMarket: "بسیار خوب",
    language: "آلمانی/انگلیسی",
    mainProgram: "ویزای جستجوی کار",
    advantages: ["اقتصاد قوی اروپا", "فرصت‌های شغلی متنوع", "دسترسی به اتحادیه اروپا"],
    requirements: ["مدرک دانشگاهی", "زبان آلمانی B1", "تمکن مالی"],
    successRate: 78,
    processingTime: "3-8 ماه",
  },
  {
    name: "استرالیا",
    flag: "🇦🇺",
    averageSalary: "AUD 75,000",
    jobMarket: "عالی",
    language: "انگلیسی",
    mainProgram: "ویزای مهارتی",
    advantages: ["حقوق بالا", "آب و هوای عالی", "جامعه چندفرهنگی"],
    requirements: ["ارزیابی مهارت", "آیلتس 6.5+", "سن زیر 45 سال"],
    successRate: 82,
    processingTime: "8-14 ماه",
  },
]

const inDemandJobs = [
  { title: "مهندس نرم‌افزار", demand: "بسیار بالا", salary: "$80,000-120,000" },
  { title: "پرستار", demand: "بالا", salary: "$50,000-70,000" },
  { title: "مهندس عمران", demand: "بالا", salary: "$60,000-90,000" },
  { title: "حسابدار", demand: "متوسط", salary: "$45,000-65,000" },
  { title: "معلم", demand: "بالا", salary: "$40,000-60,000" },
  { title: "پزشک", demand: "بسیار بالا", salary: "$150,000-300,000" },
]

export default function WorkImmigrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100" dir="rtl">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl font-bold mb-6">مهاجرت کاری</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              فرصتی طلایی برای کار در بهترین شرکت‌های جهان و دستیابی به اقامت دائم
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                ارزیابی رایگان
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600"
              >
                مشاهده فرصت‌ها
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
              { number: "25,000+", label: "مهاجر کاری موفق", icon: Users },
              { number: "78%", label: "نرخ موفقیت", icon: TrendingUp },
              { number: "500+", label: "شرکت همکار", icon: Building },
              { number: "15+", label: "کشور مقصد", icon: Globe },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-green-600" />
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
            <h2 className="text-4xl font-bold mb-4">بهترین کشورها برای مهاجرت کاری</h2>
            <p className="text-xl text-gray-600">انتخاب مقصدی که با اهداف شغلی شما همخوانی دارد</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {workCountries.map((country, index) => (
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
                          <div className="text-gray-600">متوسط حقوق:</div>
                          <div className="font-medium">{country.averageSalary}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">بازار کار:</div>
                          <div className="font-medium">{country.jobMarket}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">زمان پردازش:</div>
                          <div className="font-medium">{country.processingTime}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">زبان:</div>
                          <div className="font-medium">{country.language}</div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-sm font-medium text-blue-800 mb-1">برنامه اصلی:</div>
                        <div className="text-sm text-blue-700">{country.mainProgram}</div>
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
                        جزئیات بیشتر
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

      {/* In-Demand Jobs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">مشاغل پرتقاضا</h2>
            <p className="text-xl text-gray-600">شغل‌هایی که بیشترین فرصت مهاجرت را دارند</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inDemandJobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Target className="w-8 h-8 text-green-600" />
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">تقاضا:</span>
                        <Badge
                          className={
                            job.demand === "بسیار بالا"
                              ? "bg-red-500"
                              : job.demand === "بالا"
                                ? "bg-orange-500"
                                : "bg-yellow-500"
                          }
                        >
                          {job.demand}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">حقوق:</span>
                        <span className="font-medium">{job.salary}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
            <h2 className="text-4xl font-bold mb-6">آماده شروع مسیر شغلی جدید هستید؟</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              با تیم متخصص ما ارزیابی رایگان انجام دهید و بهترین فرصت‌های شغلی را کشف کنید
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                ارزیابی رایگان
              </Button>
              <Link href="/">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600"
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
