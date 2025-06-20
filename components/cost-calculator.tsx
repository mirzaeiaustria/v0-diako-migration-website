"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, PieChart, Download, Share2 } from "lucide-react"

interface CostBreakdown {
  category: string
  amount: number
  description: string
  color: string
}

export function CostCalculator() {
  const [country, setCountry] = useState("")
  const [method, setMethod] = useState("")
  const [familySize, setFamilySize] = useState("1")
  const [results, setResults] = useState<CostBreakdown[] | null>(null)
  const [totalCost, setTotalCost] = useState(0)

  const calculateCosts = () => {
    const baseCosts: Record<string, Record<string, CostBreakdown[]>> = {
      canada: {
        "express-entry": [
          { category: "هزینه‌های اداری", amount: 1500, description: "فرم‌ها و پردازش", color: "bg-blue-500" },
          { category: "آزمون زبان", amount: 300, description: "آیلتس یا تافل", color: "bg-green-500" },
          { category: "ارزیابی مدارک", amount: 400, description: "WES یا سایر مراجع", color: "bg-purple-500" },
          { category: "معاینات پزشکی", amount: 450, description: "برای متقاضی اصلی", color: "bg-orange-500" },
          { category: "مشاوره حقوقی", amount: 2000, description: "خدمات مشاوره", color: "bg-red-500" },
        ],
      },
      germany: {
        "job-seeker": [
          { category: "ویزای جستجوی کار", amount: 75, description: "هزینه ویزا", color: "bg-blue-500" },
          { category: "آزمون زبان", amount: 200, description: "گواهی زبان آلمانی", color: "bg-green-500" },
          { category: "ترجمه مدارک", amount: 300, description: "ترجمه رسمی", color: "bg-purple-500" },
          { category: "بیمه درمانی", amount: 100, description: "بیمه موقت", color: "bg-orange-500" },
          { category: "مشاوره", amount: 1500, description: "خدمات مشاوره", color: "bg-red-500" },
        ],
      },
    }

    if (country && method && baseCosts[country]?.[method]) {
      let costs = [...baseCosts[country][method]]
      const familyMultiplier = Number.parseInt(familySize)

      // اضافه کردن هزینه برای اعضای خانواده
      if (familyMultiplier > 1) {
        costs = costs.map((cost) => ({
          ...cost,
          amount: cost.category === "معاینات پزشکی" ? cost.amount * familyMultiplier : cost.amount,
        }))

        if (familyMultiplier > 1) {
          costs.push({
            category: "هزینه اعضای خانواده",
            amount: (familyMultiplier - 1) * 500,
            description: `هزینه ${familyMultiplier - 1} عضو اضافی`,
            color: "bg-pink-500",
          })
        }
      }

      setResults(costs)
      setTotalCost(costs.reduce((sum, cost) => sum + cost.amount, 0))
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-6 h-6 text-green-600" />
            محاسبه‌گر هوشمند هزینه مهاجرت
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Label htmlFor="country">کشور مقصد</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب کشور" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="canada">کانادا</SelectItem>
                  <SelectItem value="germany">آلمان</SelectItem>
                  <SelectItem value="australia">استرالیا</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="method">روش مهاجرت</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب روش" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="express-entry">اکسپرس اینتری</SelectItem>
                  <SelectItem value="job-seeker">ویزای جستجوی کار</SelectItem>
                  <SelectItem value="investment">سرمایه‌گذاری</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="family">تعداد اعضای خانواده</Label>
              <Select value={familySize} onValueChange={setFamilySize}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">فقط خودم</SelectItem>
                  <SelectItem value="2">2 نفر</SelectItem>
                  <SelectItem value="3">3 نفر</SelectItem>
                  <SelectItem value="4">4 نفر</SelectItem>
                  <SelectItem value="5">5+ نفر</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={calculateCosts}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500"
            disabled={!country || !method}
          >
            محاسبه هزینه‌ها
          </Button>
        </CardContent>
      </Card>

      {results && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <PieChart className="w-6 h-6 text-blue-600" />
                  نتایج محاسبه
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    دانلود PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    اشتراک‌گذاری
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="breakdown" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="breakdown">جزئیات هزینه‌ها</TabsTrigger>
                  <TabsTrigger value="chart">نمودار</TabsTrigger>
                </TabsList>

                <TabsContent value="breakdown" className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold">${totalCost.toLocaleString()}</div>
                      <div className="text-sm opacity-90">مجموع هزینه‌های تخمینی</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {results.map((cost, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${cost.color}`}></div>
                          <div>
                            <div className="font-medium">{cost.category}</div>
                            <div className="text-sm text-gray-600">{cost.description}</div>
                          </div>
                        </div>
                        <div className="text-lg font-bold">${cost.amount.toLocaleString()}</div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="chart" className="space-y-4">
                  <div className="h-64 flex items-end space-x-2 space-x-reverse">
                    {results.map((cost, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className={`w-full ${cost.color} rounded-t transition-all duration-500`}
                          style={{
                            height: `${(cost.amount / Math.max(...results.map((r) => r.amount))) * 200}px`,
                          }}
                        ></div>
                        <div className="text-xs mt-2 text-center">{cost.category}</div>
                        <div className="text-xs font-bold">${cost.amount}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
