"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  MapPin,
  Star,
  Zap,
  Target,
  TrendingUp,
  Download,
  Share2,
} from "lucide-react"
import { countries, type Country, type ImmigrationMethod } from "@/lib/comprehensive-immigration-data"

interface TimelineStep {
  id: string
  title: string
  description: string
  duration: string
  status: "completed" | "current" | "upcoming" | "delayed"
  category: "preparation" | "application" | "processing" | "decision" | "travel"
  requirements: string[]
  tips: string[]
  estimatedCost?: string
  priority: "high" | "medium" | "low"
}

interface TimelinePlan {
  country: Country
  method: ImmigrationMethod
  totalDuration: string
  steps: TimelineStep[]
  milestones: { date: string; title: string; description: string }[]
  estimatedCosts: { category: string; amount: string }[]
}

export function EnhancedTimelinePlanner() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<ImmigrationMethod | null>(null)
  const [timelinePlan, setTimelinePlan] = useState<TimelinePlan | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  const generateTimeline = async () => {
    if (!selectedCountry || !selectedMethod) return

    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate timeline generation with progress
    for (let i = 0; i <= 100; i += 10) {
      setGenerationProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 150))
    }

    // Generate timeline steps based on selected method
    const steps: TimelineStep[] = generateStepsForMethod(selectedMethod, selectedCountry)

    const plan: TimelinePlan = {
      country: selectedCountry,
      method: selectedMethod,
      totalDuration: selectedMethod.duration,
      steps,
      milestones: generateMilestones(steps),
      estimatedCosts: generateCosts(selectedMethod, selectedCountry),
    }

    setTimelinePlan(plan)
    setCurrentStep(0)
    setIsGenerating(false)
  }

  const generateStepsForMethod = (method: ImmigrationMethod, country: Country): TimelineStep[] => {
    const baseSteps: TimelineStep[] = [
      {
        id: "consultation",
        title: "مشاوره اولیه",
        description: "جلسه مشاوره با کارشناسان دیاکو",
        duration: "1-2 روز",
        status: "completed",
        category: "preparation",
        requirements: ["تکمیل فرم ارزیابی", "آماده‌سازی مدارک اولیه"],
        tips: ["سوالات خود را از قبل آماده کنید", "مدارک موجود را همراه داشته باشید"],
        priority: "high",
      },
      {
        id: "document-preparation",
        title: "آماده‌سازی مدارک",
        description: "جمع‌آوری و تهیه مدارک مورد نیاز",
        duration: "2-4 هفته",
        status: "current",
        category: "preparation",
        requirements: method.requirements,
        tips: ["ترجمه رسمی مدارک", "تأیید از مراجع ذی‌صلاح"],
        estimatedCost: "500-2000 دلار",
        priority: "high",
      },
      {
        id: "application-submission",
        title: "ارسال درخواست",
        description: "تکمیل و ارسال فرم‌های درخواست",
        duration: "1-2 هفته",
        status: "upcoming",
        category: "application",
        requirements: ["فرم‌های تکمیل شده", "پرداخت هزینه‌ها", "ارسال مدارک"],
        tips: ["بررسی دقیق اطلاعات قبل از ارسال", "نگهداری کپی از همه مدارک"],
        priority: "high",
      },
      {
        id: "processing",
        title: "بررسی درخواست",
        description: "بررسی درخواست توسط مراجع مربوطه",
        duration: "3-8 ماه",
        status: "upcoming",
        category: "processing",
        requirements: ["انتظار برای بررسی", "پاسخ به درخواست‌های اضافی"],
        tips: ["صبر و انتظار", "پیگیری منظم وضعیت"],
        priority: "medium",
      },
    ]

    // Add method-specific steps
    if (method.id === "education") {
      baseSteps.splice(2, 0, {
        id: "university-application",
        title: "درخواست پذیرش دانشگاه",
        description: "ارسال درخواست به دانشگاه‌های مورد نظر",
        duration: "2-6 ماه",
        status: "upcoming",
        category: "application",
        requirements: ["انتخاب دانشگاه", "ارسال مدارک تحصیلی", "نامه انگیزه"],
        tips: ["درخواست به چندین دانشگاه", "بررسی شرایط پذیرش"],
        priority: "high",
      })
    }

    if (method.id === "work" || method.id === "skilledWorker") {
      baseSteps.splice(2, 0, {
        id: "job-search",
        title: "جستجوی کار",
        description: "یافتن کارفرما و اخذ پیشنهاد کار",
        duration: "2-8 ماه",
        status: "upcoming",
        category: "application",
        requirements: ["رزومه به‌روز", "جستجوی فعال", "مصاحبه‌های کاری"],
        tips: ["استفاده از سایت‌های کاریابی", "شبکه‌سازی حرفه‌ای"],
        priority: "high",
      })
    }

    // Add final steps
    baseSteps.push(
      {
        id: "decision",
        title: "تصمیم‌گیری",
        description: "دریافت نتیجه درخواست",
        duration: "1-4 هفته",
        status: "upcoming",
        category: "decision",
        requirements: ["بررسی نتیجه", "اقدامات بعدی"],
        tips: ["آماده‌باش برای مراحل بعدی", "مشاوره در صورت رد"],
        priority: "high",
      },
      {
        id: "travel-preparation",
        title: "آماده‌سازی سفر",
        description: "تنظیمات نهایی برای مهاجرت",
        duration: "2-8 هفته",
        status: "upcoming",
        category: "travel",
        requirements: ["رزرو بلیط", "بیمه سفر", "تنظیمات بانکی"],
        tips: ["چک‌لیست سفر", "اطلاع به بانک"],
        priority: "medium",
      },
    )

    return baseSteps
  }

  const generateMilestones = (steps: TimelineStep[]) => {
    return [
      { date: "هفته 1", title: "شروع فرآیند", description: "مشاوره اولیه و برنامه‌ریزی" },
      { date: "ماه 2", title: "تکمیل مدارک", description: "آماده‌سازی کامل مدارک" },
      { date: "ماه 4", title: "ارسال درخواست", description: "ثبت رسمی درخواست" },
      { date: "ماه 8", title: "دریافت نتیجه", description: "تصمیم نهایی مراجع" },
      { date: "ماه 10", title: "مهاجرت", description: "سفر به کشور مقصد" },
    ]
  }

  const generateCosts = (method: ImmigrationMethod, country: Country) => {
    const baseCost = Number.parseInt(method.cost.split("-")[0].replace(",", ""))
    return [
      { category: "هزینه‌های دولتی", amount: `${Math.round(baseCost * 0.3).toLocaleString()} دلار` },
      { category: "مشاوره و خدمات", amount: `${Math.round(baseCost * 0.2).toLocaleString()} دلار` },
      { category: "ترجمه و تأیید مدارک", amount: `${Math.round(baseCost * 0.1).toLocaleString()} دلار` },
      { category: "سایر هزینه‌ها", amount: `${Math.round(baseCost * 0.4).toLocaleString()} دلار` },
    ]
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "current":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "upcoming":
        return <AlertCircle className="w-5 h-5 text-gray-400" />
      case "delayed":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "current":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "upcoming":
        return "bg-gray-100 text-gray-600 border-gray-200"
      case "delayed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-600 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const overallProgress = timelinePlan
    ? Math.round(
        (timelinePlan.steps.filter((step) => step.status === "completed").length / timelinePlan.steps.length) * 100,
      )
    : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
          >
            <Calendar className="w-6 h-6 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            برنامه‌ریز هوشمند زمان‌بندی
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          با استفاده از هوش مصنوعی، برنامه زمان‌بندی شخصی‌سازی شده برای مهاجرت خود دریافت کنید
        </p>
      </motion.div>

      {/* Input Form */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-6 h-6" />
            تنظیمات برنامه‌ریزی
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country Selection */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <label className="text-lg font-semibold mb-3 block">کشور مقصد</label>
              <Select
                value={selectedCountry?.id || ""}
                onValueChange={(value) => {
                  const country = countries.find((c) => c.id === value)
                  setSelectedCountry(country || null)
                  setSelectedMethod(null)
                  setTimelinePlan(null)
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
              <label className="text-lg font-semibold mb-3 block">روش مهاجرت</label>
              <Select
                value={selectedMethod?.id || ""}
                onValueChange={(value) => {
                  const method = selectedCountry?.methods.find((m) => m.id === value)
                  setSelectedMethod(method || null)
                  setTimelinePlan(null)
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
          </div>

          {/* Generate Button */}
          <div className="flex gap-4 mt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
              <Button
                onClick={generateTimeline}
                disabled={!selectedCountry || !selectedMethod || isGenerating}
                className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Zap className="w-5 h-5" />
                    </motion.div>
                    در حال تولید برنامه...
                  </div>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 mr-2" />
                    تولید برنامه زمان‌بندی
                  </>
                )}
              </Button>
            </motion.div>

            {timelinePlan && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="h-12 px-6">
                  <Download className="w-4 h-4 mr-2" />
                  دانلود PDF
                </Button>
              </motion.div>
            )}
          </div>

          {/* Generation Progress */}
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6"
              >
                <div className="bg-white rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">در حال تولید برنامه شخصی‌سازی شده...</span>
                    <span className="text-sm text-gray-600">{generationProgress}%</span>
                  </div>
                  <Progress value={generationProgress} className="h-2" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Timeline Results */}
      <AnimatePresence>
        {timelinePlan && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="space-y-6"
          >
            {/* Overview Card */}
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    خلاصه برنامه زمان‌بندی
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      اشتراک‌گذاری
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl">
                      <MapPin className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-lg font-bold">{timelinePlan.country.name}</div>
                      <div className="text-xs opacity-90">کشور مقصد</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4 rounded-xl">
                      <FileText className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-lg font-bold">{timelinePlan.method.name}</div>
                      <div className="text-xs opacity-90">روش مهاجرت</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl">
                      <Clock className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-lg font-bold">{timelinePlan.totalDuration}</div>
                      <div className="text-xs opacity-90">مدت زمان کل</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl">
                      <Star className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-lg font-bold">{overallProgress}%</div>
                      <div className="text-xs opacity-90">پیشرفت کلی</div>
                    </div>
                  </motion.div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">پیشرفت کلی</span>
                    <span className="text-sm text-gray-600">{overallProgress}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-3" />
                </div>

                <Tabs defaultValue="timeline" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="timeline">مراحل</TabsTrigger>
                    <TabsTrigger value="milestones">نقاط عطف</TabsTrigger>
                    <TabsTrigger value="costs">هزینه‌ها</TabsTrigger>
                    <TabsTrigger value="calendar">تقویم</TabsTrigger>
                  </TabsList>

                  <TabsContent value="timeline" className="space-y-4 mt-6">
                    {timelinePlan.steps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          currentStep === index
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300 hover:shadow-md"
                        }`}
                        onClick={() => setCurrentStep(index)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(step.status)}
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{step.title}</h3>
                                <Star className={`w-4 h-4 ${getPriorityColor(step.priority)}`} />
                              </div>
                              <p className="text-sm text-gray-600">{step.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{step.duration}</span>
                                {step.estimatedCost && (
                                  <>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-gray-500">{step.estimatedCost}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(step.status)}>
                              {step.status === "completed"
                                ? "تکمیل شده"
                                : step.status === "current"
                                  ? "در حال انجام"
                                  : step.status === "upcoming"
                                    ? "آینده"
                                    : "تأخیر"}
                            </Badge>
                          </div>
                        </div>

                        <AnimatePresence>
                          {currentStep === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t space-y-4"
                            >
                              <Tabs defaultValue="requirements" className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                  <TabsTrigger value="requirements">الزامات</TabsTrigger>
                                  <TabsTrigger value="tips">نکات</TabsTrigger>
                                </TabsList>

                                <TabsContent value="requirements" className="space-y-2">
                                  <h4 className="font-medium text-sm mb-2">الزامات این مرحله:</h4>
                                  <ul className="space-y-1">
                                    {step.requirements.map((req, i) => (
                                      <li key={i} className="flex items-center gap-2 text-sm">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        {req}
                                      </li>
                                    ))}
                                  </ul>
                                </TabsContent>

                                <TabsContent value="tips" className="space-y-2">
                                  <h4 className="font-medium text-sm mb-2">نکات مهم:</h4>
                                  <ul className="space-y-1">
                                    {step.tips.map((tip, i) => (
                                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        {tip}
                                      </li>
                                    ))}
                                  </ul>
                                </TabsContent>
                              </Tabs>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </TabsContent>

                  <TabsContent value="milestones" className="mt-6">
                    <div className="space-y-4">
                      {timelinePlan.milestones.map((milestone, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-white rounded-lg border"
                        >
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{milestone.title}</div>
                            <div className="text-sm text-gray-600">{milestone.description}</div>
                          </div>
                          <div className="text-sm font-medium text-purple-600">{milestone.date}</div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="costs" className="mt-6">
                    <div className="space-y-4">
                      {timelinePlan.estimatedCosts.map((cost, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-white rounded-lg border"
                        >
                          <div className="font-medium">{cost.category}</div>
                          <div className="text-lg font-bold text-purple-600">{cost.amount}</div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="calendar" className="mt-6">
                    <div className="bg-white rounded-lg p-6 border">
                      <h3 className="text-lg font-semibold mb-4">تقویم مراحل</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {timelinePlan.steps.map((step, index) => (
                          <motion.div
                            key={step.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-3 border rounded-lg"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {getStatusIcon(step.status)}
                              <span className="font-medium text-sm">{step.title}</span>
                            </div>
                            <div className="text-xs text-gray-600">{step.duration}</div>
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
