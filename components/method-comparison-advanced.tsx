"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Download, Share2, BarChart3 } from "lucide-react"

interface Method {
  id: string
  name: string
  countries: string[]
  requirements: string[]
  processingTime: string
  costRange: string
  benefits: string[]
  type: string
}

const allMethods: Method[] = [
  {
    id: "study_de",
    name: "مهاجرت تحصیلی به آلمان",
    countries: ["آلمان"],
    requirements: ["پذیرش از دانشگاه", "تمکن مالی", "مدرک زبان"],
    processingTime: "3-6 ماه",
    costRange: "€500-€1,000",
    benefits: ["تحصیل رایگان/کم‌هزینه", "اجازه کار دانشجویی", "فرصت کاری پس از تحصیل"],
    type: "تحصیلی",
  },
  {
    id: "skilled_worker_de",
    name: "مهاجرت کاری به آلمان",
    countries: ["آلمان"],
    requirements: ["پیشنهاد شغلی", "مدرک تحصیلی معادل", "مدرک زبان"],
    processingTime: "3-6 ماه",
    costRange: "€500-€1,000",
    benefits: ["اقتصاد قوی", "امنیت شغلی", "پیوستن خانواده"],
    type: "کاری",
  },
  {
    id: "invest_ca",
    name: "مهاجرت سرمایه‌گذاری به کانادا",
    countries: ["کانادا"],
    requirements: ["سرمایه قابل توجه", "طرح کسب و کار", "منشأ قانونی سرمایه"],
    processingTime: "12-24 ماه",
    costRange: "CAD 100,000+",
    benefits: ["اقامت دائم", "دسترسی به بازار آمریکای شمالی", "کیفیت زندگی بالا"],
    type: "سرمایه‌گذاری",
  },
  {
    id: "study_ca",
    name: "مهاجرت تحصیلی به کانادا",
    countries: ["کانادا"],
    requirements: ["پذیرش دانشگاه", "تمکن مالی", "مدرک زبان"],
    processingTime: "2-5 ماه",
    costRange: "CAD 500-1,000",
    benefits: ["سیستم آموزشی عالی", "اجازه کار حین تحصیل", "مسیرهای اقامتی"],
    type: "تحصیلی",
  },
  {
    id: "golden_visa_pt",
    name: "ویزای طلایی پرتغال",
    countries: ["پرتغال"],
    requirements: ["سرمایه‌گذاری در ملک یا صندوق"],
    processingTime: "6-12 ماه",
    costRange: "€280,000+",
    benefits: ["اقامت در شنگن", "مسیر تابعیت", "منافع مالی"],
    type: "ویزای طلایی",
  },
]

export function MethodComparisonAdvanced() {
  const [selectedMethods, setSelectedMethods] = useState<string[]>([])

  const handleSelectChange = (methodId: string) => {
    setSelectedMethods((prev) => {
      if (prev.includes(methodId)) {
        return prev.filter((id) => id !== methodId)
      } else if (prev.length < 3) {
        return [...prev, methodId]
      }
      return prev
    })
  }

  const methodsToCompare = allMethods.filter((method) => selectedMethods.includes(method.id))

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
            <BarChart3 className="h-8 w-8" />
            مقایسه پیشرفته روش‌های مهاجرت
          </h2>
          <p className="text-gray-600 dark:text-gray-300">تا 3 روش مهاجرتی را انتخاب کرده و مقایسه کنید</p>
        </div>

        <motion.div
          className="max-w-4xl mx-auto bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-200 text-lg font-medium mb-4">
              روش‌های مهاجرتی برای مقایسه را انتخاب کنید:
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allMethods.map((method) => (
                <Card
                  key={method.id}
                  className={`cursor-pointer transition-all ${
                    selectedMethods.includes(method.id) ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md"
                  }`}
                  onClick={() => handleSelectChange(method.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm">{method.name}</h3>
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          selectedMethods.includes(method.id) ? "bg-primary border-primary" : "border-gray-300"
                        }`}
                      >
                        {selectedMethods.includes(method.id) && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs mb-2">
                      {method.type}
                    </Badge>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{method.countries.join(", ")}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedMethods.length > 0 && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {selectedMethods.length} روش انتخاب شده (حداکثر 3)
                </p>
                <Button variant="outline" size="sm" onClick={() => setSelectedMethods([])}>
                  پاک کردن همه
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        {methodsToCompare.length > 0 && (
          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>جدول مقایسه</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 ml-2" />
                      دانلود
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 ml-2" />
                      اشتراک
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <table className="min-w-full bg-white dark:bg-gray-700 shadow-xl rounded-lg">
                  <thead>
                    <tr className="bg-blue-600 dark:bg-blue-800 text-white text-lg">
                      <th className="py-4 px-6 text-right">معیار</th>
                      {methodsToCompare.map((method) => (
                        <th
                          key={method.id}
                          className="py-4 px-6 text-center border-l border-blue-700 dark:border-blue-900"
                        >
                          {method.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <td className="py-4 px-6 font-semibold text-gray-800 dark:text-gray-200">کشورها</td>
                      {methodsToCompare.map((method) => (
                        <td key={method.id} className="py-4 px-6 text-gray-700 dark:text-gray-300 text-center">
                          {method.countries.join(", ")}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-750">
                      <td className="py-4 px-6 font-semibold text-gray-800 dark:text-gray-200">شرایط اصلی</td>
                      {methodsToCompare.map((method) => (
                        <td key={method.id} className="py-4 px-6 text-gray-700 dark:text-gray-300 text-center">
                          <ul className="list-disc list-inside text-left mx-auto max-w-xs">
                            {method.requirements.map((req, i) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-600">
                      <td className="py-4 px-6 font-semibold text-gray-800 dark:text-gray-200">مدت زمان پردازش</td>
                      {methodsToCompare.map((method) => (
                        <td key={method.id} className="py-4 px-6 text-gray-700 dark:text-gray-300 text-center">
                          {method.processingTime}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-750">
                      <td className="py-4 px-6 font-semibold text-gray-800 dark:text-gray-200">محدوده هزینه</td>
                      {methodsToCompare.map((method) => (
                        <td key={method.id} className="py-4 px-6 text-gray-700 dark:text-gray-300 text-center">
                          {method.costRange}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-semibold text-gray-800 dark:text-gray-200">مزایا</td>
                      {methodsToCompare.map((method) => (
                        <td key={method.id} className="py-4 px-6 text-gray-700 dark:text-gray-300 text-center">
                          <ul className="list-disc list-inside text-left mx-auto max-w-xs">
                            {method.benefits.map((benefit, i) => (
                              <li key={i}>{benefit}</li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {methodsToCompare.length === 0 && (
          <div className="text-center py-10 space-y-4">
            <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
            <div>
              <p className="text-lg font-medium">برای مقایسه، حداقل یک روش مهاجرتی را انتخاب کنید</p>
              <p className="text-muted-foreground">
                از کارت‌های بالا استفاده کنید تا روش‌های مورد نظر خود را انتخاب کنید
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
