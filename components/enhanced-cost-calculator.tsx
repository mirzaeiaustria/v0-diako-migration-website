"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calculator,
  PieChart,
  Download,
  Share2,
  Home,
  Utensils,
  Car,
  Heart,
  GraduationCap,
  DollarSign,
  Calendar,
  Target,
  Sparkles,
} from "lucide-react"
import { countries, type Country, type ImmigrationMethod } from "@/lib/comprehensive-immigration-data"

interface CostBreakdown {
  category: string
  amount: number
  description: string
  color: string
  icon: any
  percentage: number
}

interface CalculationResult {
  totalCost: number
  breakdown: CostBreakdown[]
  monthlyLiving: number
  oneTimeCosts: number
  country: Country
  method: ImmigrationMethod
  timeline: string
}

export function EnhancedCostCalculator() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<ImmigrationMethod | null>(null)
  const [familySize, setFamilySize] = useState([1])
  const [duration, setDuration] = useState([12])
  const [results, setResults] = useState<CalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [animationStep, setAnimationStep] = useState(0)

  const calculateCosts = async () => {
    if (!selectedCountry || !selectedMethod) return

    setIsCalculating(true)
    setAnimationStep(0)

    // Simulate calculation steps with animation
    for (let i = 0; i <= 100; i += 10) {
      setAnimationStep(i)
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    const familyMultiplier = familySize[0]
    const durationMonths = duration[0]

    // Calculate immigration costs
    const baseCost = Number.parseInt(selectedMethod.cost.split("-")[0].replace(",", ""))
    const immigrationCost = baseCost * (familyMultiplier > 1 ? 1 + (familyMultiplier - 1) * 0.5 : 1)

    // Calculate living costs
    const monthlyLiving =
      Object.values(selectedCountry.livingCost).reduce((sum, cost) => sum + cost, 0) * familyMultiplier
    const totalLivingCost = monthlyLiving * durationMonths

    const breakdown: CostBreakdown[] = [
      {
        category: "هزینه‌های مهاجرت",
        amount: immigrationCost,
        description: `${selectedMethod.name} برای ${familyMultiplier} نفر`,
        color: "bg-blue-500",
        icon: Target,
        percentage: 0,
      },
      {
        category: "مسکن",
        amount: selectedCountry.livingCost.housing * familyMultiplier * durationMonths,
        description: `اجاره مسکن برای ${durationMonths} ماه`,
        color: "bg-green-500",
        icon: Home,
        percentage: 0,
      },
      {
        category: "خوراک",
        amount: selectedCountry.livingCost.food * familyMultiplier * durationMonths,
        description: `هزینه غذا برای ${durationMonths} ماه`,
        color: "bg-orange-500",
        icon: Utensils,
        percentage: 0,
      },
      {
        category: "حمل‌ونقل",
        amount: selectedCountry.livingCost.transport * familyMultiplier * durationMonths,
        description: `حمل‌ونقل عمومی برای ${durationMonths} ماه`,
        color: "bg-purple-500",
        icon: Car,
        percentage: 0,
      },
      {
        category: "بهداشت و درمان",
        amount: selectedCountry.livingCost.healthcare * familyMultiplier * durationMonths,
        description: `بیمه و هزینه‌های پزشکی`,
        color: "bg-red-500",
        icon: Heart,
        percentage: 0,
      },
    ]

    if (selectedMethod.id === "education") {
      breakdown.push({
        category: "تحصیل",
        amount: selectedCountry.livingCost.education * familyMultiplier,
        description: "شهریه و هزینه‌های تحصیلی",
        color: "bg-indigo-500",
        icon: GraduationCap,
        percentage: 0,
      })
    }

    const totalCost = breakdown.reduce((sum, item) => sum + item.amount, 0)

    // Calculate percentages
    breakdown.forEach((item) => {
      item.percentage = Math.round((item.amount / totalCost) * 100)
    })

    const result: CalculationResult = {
      totalCost,
      breakdown,
      monthlyLiving,
      oneTimeCosts: immigrationCost,
      country: selectedCountry,
      method: selectedMethod,
      timeline: selectedMethod.duration,
    }

    setResults(result)
    setIsCalculating(false)
  }

  const resetCalculator = () => {
    setSelectedCountry(null)
    setSelectedMethod(null)
    setFamilySize([1])
    setDuration([12])
    setResults(null)
    setAnimationStep(0)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center"
          >
            <Calculator className="w-6 h-6 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            محاسبه‌گر هوشمند هزینه مهاجرت
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          با استفاده از داده‌های به‌روز و الگوریتم‌های پیشرفته، دقیق‌ترین برآورد هزینه‌های مهاجرت را دریافت کنید
        </p>
      </motion.div>

      {/* Input Form */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            اطلاعات محاسبه
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country Selection */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Label className="text-lg font-semibold mb-3 block">کشور مقصد</Label>
              <Select
                value={selectedCountry?.id || ""}
                onValueChange={(value) => {
                  const country = countries.find((c) => c.id === value)
                  setSelectedCountry(country || null)
                  setSelectedMethod(null)
                }}
              >
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="انتخاب کشور" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      <div className="flex items-center gap-3">
                        <img src={country.flagUrl || "/placeholder.svg"} alt={country.name} className="w-6 h-4" />
                        <span>{country.name}</span>
                        <Badge variant="outline" className="text-xs">
                          رتبه {country.popularityRank}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            {/* Method Selection */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Label className="text-lg font-semibold mb-3 block">روش مهاجرت</Label>
              <Select
                value={selectedMethod?.id || ""}
                onValueChange={(value) => {
                  const method = selectedCountry?.methods.find((m) => m.id === value)
                  setSelectedMethod(method || null)
                }}
                disabled={!selectedCountry}
              >
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder="انتخاب روش مهاجرت" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCountry?.methods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{method.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              method.difficulty === "easy"
                                ? "bg-green-100 text-green-800"
                                : method.difficulty === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }
                          >
                            {method.difficulty === "easy" ? "آسان" : method.difficulty === "medium" ? "متوسط" : "سخت"}
                          </Badge>
                          <Badge variant="outline">{method.successRate}%</Badge>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            {/* Family Size */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Label className="text-lg font-semibold mb-3 block">تعداد اعضای خانواده: {familySize[0]} نفر</Label>
              <Slider value={familySize} onValueChange={setFamilySize} max={6} min={1} step={1} className="w-full" />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1 نفر</span>
                <span>6 نفر</span>
              </div>
            </motion.div>

            {/* Duration */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Label className="text-lg font-semibold mb-3 block">مدت اقامت: {duration[0]} ماه</Label>
              <Slider value={duration} onValueChange={setDuration} max={60} min={6} step={6} className="w-full" />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>6 ماه</span>
                <span>5 سال</span>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Button
                onClick={calculateCosts}
                disabled={!selectedCountry || !selectedMethod || isCalculating}
                className="w-full h-12 text-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                {isCalculating ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Calculator className="w-5 h-5" />
                    </motion.div>
                    در حال محاسبه...
                  </div>
                ) : (
                  <>
                    <Calculator className="w-5 h-5 mr-2" />
                    محاسبه هزینه‌ها
                  </>
                )}
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={resetCalculator} variant="outline" className="h-12 px-6">
                شروع مجدد
              </Button>
            </motion.div>
          </div>

          {/* Calculation Progress */}
          <AnimatePresence>
            {isCalculating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                <div className="bg-white rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">در حال پردازش...</span>
                    <span className="text-sm text-gray-600">{animationStep}%</span>
                  </div>
                  <Progress value={animationStep} className="h-2" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Results */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="space-y-6"
          >
            {/* Summary Card */}
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PieChart className="w-6 h-6" />
                    نتایج محاسبه
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      دانلود PDF
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      اشتراک‌گذاری
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-xl">
                      <DollarSign className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-3xl font-bold">${results.totalCost.toLocaleString()}</div>
                      <div className="text-sm opacity-90">مجموع هزینه‌ها</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
                      <Calendar className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-3xl font-bold">${results.monthlyLiving.toLocaleString()}</div>
                      <div className="text-sm opacity-90">هزینه ماهانه</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl">
                      <Target className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-3xl font-bold">{results.method.successRate}%</div>
                      <div className="text-sm opacity-90">نرخ موفقیت</div>
                    </div>
                  </motion.div>
                </div>

                <Tabs defaultValue="breakdown" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="breakdown">جزئیات هزینه‌ها</TabsTrigger>
                    <TabsTrigger value="chart">نمودار</TabsTrigger>
                    <TabsTrigger value="comparison">مقایسه</TabsTrigger>
                  </TabsList>

                  <TabsContent value="breakdown" className="space-y-4 mt-6">
                    {results.breakdown.map((cost, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full ${cost.color} flex items-center justify-center`}>
                            <cost.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-lg">{cost.category}</div>
                            <div className="text-sm text-gray-600">{cost.description}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">${cost.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">{cost.percentage}% از کل</div>
                        </div>
                      </motion.div>
                    ))}
                  </TabsContent>

                  <TabsContent value="chart" className="mt-6">
                    <div className="bg-white rounded-lg p-6 border">
                      <h3 className="text-lg font-semibold mb-4">توزیع هزینه‌ها</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {results.breakdown.map((cost, index) => (
                          <motion.div
                            key={index}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: index * 0.1, type: "spring" }}
                            className="text-center"
                          >
                            <div
                              className={`w-20 h-20 rounded-full ${cost.color} flex items-center justify-center mx-auto mb-2`}
                            >
                              <cost.icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-sm font-medium">{cost.category}</div>
                            <div className="text-lg font-bold">{cost.percentage}%</div>
                            <div className="text-xs text-gray-500">${cost.amount.toLocaleString()}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="comparison" className="mt-6">
                    <div className="bg-white rounded-lg p-6 border">
                      <h3 className="text-lg font-semibold mb-4">مقایسه با سایر کشورها</h3>
                      <div className="space-y-4">
                        {countries.slice(0, 3).map((country, index) => (
                          <motion.div
                            key={country.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-center justify-between p-4 rounded-lg border ${
                              country.id === results.country.id ? "bg-blue-50 border-blue-200" : "bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <img src={country.flagUrl || "/placeholder.svg"} alt={country.name} className="w-8 h-6" />
                              <div>
                                <div className="font-medium">{country.name}</div>
                                <div className="text-sm text-gray-600">
                                  متوسط درآمد: ${country.averageSalary.toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">
                                $
                                {Object.values(country.livingCost)
                                  .reduce((a, b) => a + b, 0)
                                  .toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-500">هزینه ماهانه</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
