"use client"

import { useState, useEffect } from "react"
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
  Target,
  TrendingUp,
  Zap,
  MapPin,
  Users,
  BookOpen,
  Briefcase,
  Home,
  Plane,
  Star,
  ArrowRight,
  PlayCircle,
  PauseCircle,
  RotateCcw,
} from "lucide-react"
import { countries, type Country, type ImmigrationMethod } from "@/lib/comprehensive-immigration-data"

interface TimelineStep {
  id: string
  title: string
  description: string
  duration: string
  status: "completed" | "current" | "upcoming" | "blocked"
  priority: "high" | "medium" | "low"
  category: string
  requirements: string[]
  tips: string[]
  estimatedCost?: number
  deadline?: string
  dependencies?: string[]
  icon: any
}

interface TimelinePlan {
  id: string
  country: Country
  method: ImmigrationMethod
  totalDuration: string
  steps: TimelineStep[]
  currentStep: number
  completionRate: number
  estimatedCompletion: string
}

const generateTimelinePlan = (country: Country, method: ImmigrationMethod): TimelinePlan => {
  const baseSteps: TimelineStep[] = [
    {
      id: "research",
      title: "تحقیق و بررسی",
      description: "بررسی شرایط و الزامات مهاجرت",
      duration: "2-4 هفته",
      status: "completed",
      priority: "high",
      category: "preparation",
      requirements: ["تحقیق در مورد کشور", "بررسی قوانین مهاجرت", "مشاوره اولیه"],
      tips: ["از منابع رسمی استفاده کنید", "با مهاجران قبلی صحبت کنید"],
      estimatedCost: 500,
      icon: BookOpen,
    },
    {
      id: "documents",
      title: "تهیه مدارک",
      description: "جمع‌آوری و تهیه مدارک مورد نیاز",
      duration: "4-8 هفته",
      status: "current",
      priority: "high",
      category: "documentation",
      requirements: ["مدارک هویتی", "مدارک تحصیلی", "مدارک زبان", "گواهی‌های کاری"],
      tips: ["ترجمه رسمی مدارک", "تأیید از مراجع ذی‌صلاح"],
      estimatedCost: 2000,
      deadline: "1403/09/15",
      icon: Target,
    },
    {
      id: "application",
      title: "ثبت درخواست",
      description: "تکمیل و ارسال فرم‌های درخواست",
      duration: "2-3 هفته",
      status: "upcoming",
      priority: "high",
      category: "application",
      requirements: ["فرم‌های تکمیل شده", "پرداخت هزینه‌ها", "ارسال مدارک"],
      tips: ["دقت در تکمیل فرم‌ها", "نگهداری کپی از همه مدارک"],
      estimatedCost: 1500,
      dependencies: ["documents"],
      icon: Briefcase,
    },
    {
      id: "interview",
      title: "مصاحبه",
      description: "شرکت در مصاحبه (در صورت نیاز)",
      duration: "1-2 هفته",
      status: "upcoming",
      priority: "medium",
      category: "interview",
      requirements: ["آماده‌سازی برای مصاحبه", "تمرین سوالات متداول"],
      tips: ["تمرین زبان", "آشنایی با فرهنگ کشور مقصد"],
      estimatedCost: 300,
      dependencies: ["application"],
      icon: Users,
    },
    {
      id: "approval",
      title: "دریافت تأیید",
      description: "انتظار برای تأیید درخواست",
      duration: "8-16 هفته",
      status: "upcoming",
      priority: "low",
      category: "waiting",
      requirements: ["صبر و انتظار", "پیگیری وضعیت"],
      tips: ["صبور باشید", "مدارک را به‌روز نگه دارید"],
      estimatedCost: 0,
      dependencies: ["interview"],
      icon: Clock,
    },
    {
      id: "preparation",
      title: "آماده‌سازی سفر",
      description: "تنظیمات نهایی برای مهاجرت",
      duration: "4-6 هفته",
      status: "upcoming",
      priority: "high",
      category: "travel",
      requirements: ["رزرو بلیط", "بیمه سفر", "تنظیمات بانکی"],
      tips: ["چک‌لیست سفر تهیه کنید", "اطلاعات تماس مهم را یادداشت کنید"],
      estimatedCost: 3000,
      dependencies: ["approval"],
      icon: Plane,
    },
    {
      id: "arrival",
      title: "ورود و اسکان",
      description: "ورود به کشور مقصد و تنظیمات اولیه",
      duration: "2-4 هفته",
      status: "upcoming",
      priority: "high",
      category: "settlement",
      requirements: ["پیدا کردن مسکن", "ثبت‌نام در ادارات", "افتتاح حساب بانکی"],
      tips: ["از قبل مسکن موقت رزرو کنید", "مدارک مهم را همراه داشته باشید"],
      estimatedCost: 5000,
      dependencies: ["preparation"],
      icon: Home,
    },
  ]

  // Customize steps based on method
  if (method.id === "education") {
    baseSteps.splice(2, 0, {
      id: "university",
      title: "پذیرش دانشگاه",
      description: "درخواست و دریافت پذیرش از دانشگاه",
      duration: "8-12 هفته",
      status: "upcoming",
      priority: "high",
      category: "education",
      requirements: ["انتخاب دانشگاه", "ارسال درخواست", "دریافت LOA"],
      tips: ["به چندین دانشگاه درخواست دهید", "شرایط پذیرش را بررسی کنید"],
      estimatedCost: 1000,
      dependencies: ["documents"],
      icon: BookOpen,
    })
  }

  return {
    id: `${country.id}-${method.id}`,
    country,
    method,
    totalDuration: method.duration,
    steps: baseSteps,
    currentStep: 1,
    completionRate: 15,
    estimatedCompletion: "1404/02/15",
  }
}

export function EnhancedTimelinePlanner() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [selectedMethod, setSelectedMethod] = useState<ImmigrationMethod | null>(null)
  const [timelinePlan, setTimelinePlan] = useState<TimelinePlan | null>(null)
  const [selectedStep, setSelectedStep] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  // Generate timeline when country and method are selected
  useEffect(() => {
    if (selectedCountry && selectedMethod) {
      const plan = generateTimelinePlan(selectedCountry, selectedMethod)
      setTimelinePlan(plan)
    }
  }, [selectedCountry, selectedMethod])

  // Simulate timeline progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && timelinePlan) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1
          if (newTime >= 100) {
            setIsPlaying(false)
            return 100
          }
          return newTime
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, timelinePlan])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "current":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "upcoming":
        return <AlertCircle className="w-5 h-5 text-gray-400" />
      case "blocked":
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
      case "blocked":
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "preparation":
        return BookOpen
      case "documentation":
        return Target
      case "application":
        return Briefcase
      case "interview":
        return Users
      case "waiting":
        return Clock
      case "travel":
        return Plane
      case "settlement":
        return Home
      case "education":
        return BookOpen
      default:
        return Target
    }
  }

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
          مسیر مهاجرت خود را گام به گام برنامه‌ریزی کرده و پیشرفت خود را دنبال کنید
        </p>
      </motion.div>

      {/* Selection Form */}
      <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            انتخاب مسیر مهاجرت
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <label className="text-lg font-semibold mb-3 block">کشور مقصد</label>
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

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label className="text-lg font-semibold mb-3 block">روش مهاجرت</label>
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
                        <Badge variant="outline">{method.duration}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Plan */}
      <AnimatePresence>
        {timelinePlan && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="space-y-6"
          >
            {/* Plan Overview */}
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    نمای کلی برنامه
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <PauseCircle className="w-4 h-4 mr-2" /> : <PlayCircle className="w-4 h-4 mr-2" />}
                      {isPlaying ? "توقف" : "شروع"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCurrentTime(0)
                        setIsPlaying(false)
                      }}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      ریست
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-xl text-center"
                  >
                    <Calendar className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{timelinePlan.totalDuration}</div>
                    <div className="text-sm opacity-90">مدت کل</div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-xl text-center"
                  >
                    <Target className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{timelinePlan.steps.length}</div>
                    <div className="text-sm opacity-90">مراحل کل</div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl text-center"
                  >
                    <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{timelinePlan.completionRate}%</div>
                    <div className="text-sm opacity-90">پیشرفت</div>
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl text-center"
                  >
                    <Star className="w-8 h-8 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{timelinePlan.estimatedCompletion}</div>
                    <div className="text-sm opacity-90">تاریخ تکمیل</div>
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>پیشرفت کلی</span>
                    <span>{Math.max(timelinePlan.completionRate, currentTime)}%</span>
                  </div>
                  <Progress value={Math.max(timelinePlan.completionRate, currentTime)} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Timeline Steps */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Steps List */}
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-6 h-6" />
                      مراحل اجرا
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {timelinePlan.steps.map((step, index) => {
                      const StepIcon = getCategoryIcon(step.category)
                      return (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedStep === step.id
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 hover:border-purple-300 hover:shadow-md"
                          }`}
                          onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                  <span className="text-sm font-bold text-purple-600">{index + 1}</span>
                                </div>
                                {getStatusIcon(step.status)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold">{step.title}</h3>
                                  <Star className={`w-4 h-4 ${getPriorityColor(step.priority)}`} />
                                </div>
                                <p className="text-sm text-gray-600">{step.description}</p>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className="text-xs text-gray-500">⏱️ {step.duration}</span>
                                  {step.estimatedCost && (
                                    <span className="text-xs text-gray-500">💰 ${step.estimatedCost}</span>
                                  )}
                                  {step.deadline && <span className="text-xs text-red-600">📅 {step.deadline}</span>}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <StepIcon className="w-5 h-5 text-gray-400" />
                              <Badge className={getStatusColor(step.status)}>
                                {step.status === "completed"
                                  ? "تکمیل"
                                  : step.status === "current"
                                    ? "جاری"
                                    : step.status === "upcoming"
                                      ? "آینده"
                                      : "مسدود"}
                              </Badge>
                            </div>
                          </div>

                          <AnimatePresence>
                            {selectedStep === step.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t space-y-4"
                              >
                                <Tabs defaultValue="requirements" className="w-full">
                                  <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="requirements">الزامات</TabsTrigger>
                                    <TabsTrigger value="tips">نکات</TabsTrigger>
                                    <TabsTrigger value="progress">پیشرفت</TabsTrigger>
                                  </TabsList>

                                  <TabsContent value="requirements" className="space-y-3">
                                    <h4 className="font-medium text-sm mb-2">الزامات این مرحله:</h4>
                                    <ul className="space-y-2">
                                      {step.requirements.map((req, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                          {req}
                                        </li>
                                      ))}
                                    </ul>
                                    {step.dependencies && (
                                      <div className="mt-3">
                                        <h4 className="font-medium text-sm mb-2">وابستگی‌ها:</h4>
                                        <div className="flex gap-2">
                                          {step.dependencies.map((dep, i) => (
                                            <Badge key={i} variant="outline" className="text-xs">
                                              {timelinePlan.steps.find((s) => s.id === dep)?.title}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </TabsContent>

                                  <TabsContent value="tips" className="space-y-3">
                                    <h4 className="font-medium text-sm mb-2">نکات مهم:</h4>
                                    <ul className="space-y-2">
                                      {step.tips.map((tip, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                          {tip}
                                        </li>
                                      ))}
                                    </ul>
                                  </TabsContent>

                                  <TabsContent value="progress" className="space-y-3">
                                    <div className="bg-white p-4 rounded-lg border">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium">پیشرفت این مرحله</span>
                                        <span className="text-sm text-gray-600">
                                          {step.status === "completed"
                                            ? "100%"
                                            : step.status === "current"
                                              ? "50%"
                                              : "0%"}
                                        </span>
                                      </div>
                                      <Progress
                                        value={step.status === "completed" ? 100 : step.status === "current" ? 50 : 0}
                                        className="h-2"
                                      />
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Current Step */}
                <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-700">مرحله فعلی</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {timelinePlan.steps.find((s) => s.status === "current") && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">
                            {timelinePlan.steps.find((s) => s.status === "current")?.title}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {timelinePlan.steps.find((s) => s.status === "current")?.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">مدت زمان:</span>
                          <span className="text-xs font-medium">
                            {timelinePlan.steps.find((s) => s.status === "current")?.duration}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">آمار سریع</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        label: "تکمیل شده",
                        count: timelinePlan.steps.filter((s) => s.status === "completed").length,
                        color: "text-green-600",
                        icon: CheckCircle,
                      },
                      {
                        label: "در حال انجام",
                        count: timelinePlan.steps.filter((s) => s.status === "current").length,
                        color: "text-blue-600",
                        icon: Clock,
                      },
                      {
                        label: "آینده",
                        count: timelinePlan.steps.filter((s) => s.status === "upcoming").length,
                        color: "text-gray-600",
                        icon: AlertCircle,
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <stat.icon className={`w-5 h-5 ${stat.color}`} />
                          <span className="text-sm">{stat.label}</span>
                        </div>
                        <Badge variant="outline">{stat.count}</Badge>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>

                {/* Next Steps */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">مراحل بعدی</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {timelinePlan.steps
                      .filter((s) => s.status === "upcoming")
                      .slice(0, 3)
                      .map((step, index) => (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                        >
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{step.title}</div>
                            <div className="text-xs text-gray-500">{step.duration}</div>
                          </div>
                        </motion.div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
