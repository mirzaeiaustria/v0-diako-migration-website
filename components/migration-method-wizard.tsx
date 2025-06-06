"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ArrowLeft, Check, X, HelpCircle, Brain, Sparkles } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"

interface Question {
  id: string
  text: string
  type: "single" | "multiple" | "slider"
  options?: Array<{
    id: string
    text: string
    tooltip?: string
  }>
  min?: number
  max?: number
  step?: number
  tooltipText?: string
}

interface MigrationMethod {
  id: string
  title: string
  description: string
  score: number
  requirements: string[]
  suitableFor: string[]
  notSuitableFor: string[]
  recommendedCountries: string[]
  estimatedTime: string
  estimatedCost: string
  successRate: number
}

// سوالات ویزارد
const questions: Question[] = [
  {
    id: "age",
    text: "سن شما چقدر است؟",
    type: "slider",
    min: 18,
    max: 65,
    step: 1,
    tooltipText: "سن یکی از فاکتورهای مهم در بسیاری از روش‌های مهاجرتی است. معمولاً سنین 25-45 سال امتیاز بیشتری دارند.",
  },
  {
    id: "education",
    text: "بالاترین مدرک تحصیلی شما چیست؟",
    type: "single",
    options: [
      { id: "diploma", text: "دیپلم" },
      { id: "associate", text: "فوق دیپلم" },
      { id: "bachelor", text: "کارشناسی" },
      { id: "master", text: "کارشناسی ارشد" },
      { id: "phd", text: "دکترا" },
    ],
  },
  {
    id: "work_experience",
    text: "چند سال سابقه کاری مرتبط با تحصیلات خود دارید؟",
    type: "slider",
    min: 0,
    max: 20,
    step: 1,
    tooltipText: "سابقه کاری مرتبط با تحصیلات در روش‌های مهاجرت کاری اهمیت زیادی دارد.",
  },
  {
    id: "language",
    text: "سطح زبان خارجی شما چگونه است؟",
    type: "single",
    options: [
      { id: "beginner", text: "مبتدی" },
      { id: "intermediate", text: "متوسط" },
      { id: "advanced", text: "پیشرفته" },
      { id: "fluent", text: "روان" },
    ],
    tooltipText: "منظور از زبان خارجی، زبان انگلیسی یا زبان رسمی کشور مقصد است.",
  },
  {
    id: "capital",
    text: "میزان سرمایه در دسترس شما برای مهاجرت چقدر است؟",
    type: "single",
    options: [
      { id: "low", text: "کمتر از 50 هزار دلار" },
      { id: "medium", text: "بین 50 تا 200 هزار دلار" },
      { id: "high", text: "بین 200 تا 500 هزار دلار" },
      { id: "very_high", text: "بیش از 500 هزار دلار" },
    ],
  },
  {
    id: "priorities",
    text: "اولویت‌های شما برای مهاجرت چیست؟",
    type: "multiple",
    options: [
      { id: "speed", text: "سرعت فرآیند" },
      { id: "cost", text: "هزینه کم" },
      { id: "success_rate", text: "نرخ موفقیت بالا" },
      { id: "permanent_residence", text: "اقامت دائم سریع" },
      { id: "quality_of_life", text: "کیفیت زندگی" },
      { id: "job_opportunities", text: "فرصت‌های شغلی" },
      { id: "education", text: "کیفیت آموزش" },
      { id: "healthcare", text: "سیستم درمانی" },
    ],
  },
  {
    id: "family",
    text: "آیا قصد دارید با خانواده مهاجرت کنید؟",
    type: "single",
    options: [
      { id: "yes", text: "بله" },
      { id: "no", text: "خیر" },
    ],
  },
  {
    id: "timeframe",
    text: "در چه بازه زمانی قصد مهاجرت دارید؟",
    type: "single",
    options: [
      { id: "immediate", text: "کمتر از 1 سال" },
      { id: "short", text: "1 تا 2 سال" },
      { id: "medium", text: "2 تا 3 سال" },
      { id: "long", text: "بیش از 3 سال" },
    ],
  },
]

// روش‌های مهاجرتی
const migrationMethods: MigrationMethod[] = [
  {
    id: "skilled-worker",
    title: "مهاجرت کاری",
    description: "مهاجرت از طریق مهارت‌های حرفه‌ای و تخصصی برای متخصصان و نیروهای ماهر",
    score: 0,
    requirements: ["مدرک تحصیلی (حداقل کارشناسی)", "سابقه کاری مرتبط", "مدرک زبان", "سن زیر 45 سال (ترجیحاً)"],
    suitableFor: ["افراد با تحصیلات دانشگاهی", "متخصصان با سابقه کاری", "افراد با مهارت زبان متوسط به بالا"],
    notSuitableFor: ["افراد با سن بالا", "افراد بدون سابقه کاری", "افراد با مهارت زبان پایین"],
    recommendedCountries: ["کانادا", "استرالیا", "نیوزیلند", "آلمان", "انگلستان"],
    estimatedTime: "6-12 ماه",
    estimatedCost: "2,000-5,000 دلار",
    successRate: 78,
  },
  {
    id: "investment",
    title: "مهاجرت سرمایه‌گذاری",
    description: "مهاجرت از طریق سرمایه‌گذاری در کسب و کار، املاک یا اوراق قرضه دولتی",
    score: 0,
    requirements: [
      "سرمایه قابل توجه (معمولاً بیش از 200 هزار دلار)",
      "منشأ قانونی سرمایه",
      "طرح کسب و کار (در برخی موارد)",
    ],
    suitableFor: [
      "افراد با سرمایه کافی",
      "کارآفرینان و صاحبان کسب و کار",
      "افراد با سن بالاتر",
      "افراد با مهارت زبان کمتر",
    ],
    notSuitableFor: ["افراد با سرمایه محدود", "افراد ریسک‌گریز"],
    recommendedCountries: ["ترکیه", "پرتغال", "یونان", "اسپانیا", "قبرس", "کانادا", "آمریکا"],
    estimatedTime: "3-8 ماه",
    estimatedCost: "10,000-50,000 دلار + سرمایه‌گذاری",
    successRate: 92,
  },
  {
    id: "study",
    title: "مهاجرت تحصیلی",
    description: "مهاجرت از طریق پذیرش در دانشگاه‌ها و مؤسسات آموزشی معتبر",
    score: 0,
    requirements: ["مدرک تحصیلی قبلی", "مدرک زبان", "تمکن مالی برای شهریه و هزینه زندگی"],
    suitableFor: ["افراد جوان", "علاقه‌مندان به ادامه تحصیل", "افراد با مهارت زبان متوسط به بالا"],
    notSuitableFor: ["افراد با سن بالا", "افراد بدون علاقه به تحصیل", "افراد با محدودیت مالی شدید"],
    recommendedCountries: ["آلمان", "کانادا", "استرالیا", "انگلستان", "فرانسه", "ایتالیا", "هلند"],
    estimatedTime: "2-4 ماه",
    estimatedCost: "1,000-3,000 دلار + شهریه",
    successRate: 85,
  },
  {
    id: "family",
    title: "مهاجرت خانوادگی",
    description: "مهاجرت از طریق اسپانسرشیپ اعضای خانواده که شهروند یا مقیم دائم هستند",
    score: 0,
    requirements: ["رابطه خانوادگی نزدیک با شهروند یا مقیم دائم", "اثبات رابطه خانوادگی", "تمکن مالی اسپانسر"],
    suitableFor: ["همسر، فرزندان یا والدین شهروندان یا مقیمان دائم", "افراد با مهارت زبان کمتر", "افراد با سن بالاتر"],
    notSuitableFor: ["افراد بدون رابطه خانوادگی با شهروندان یا مقیمان دائم"],
    recommendedCountries: ["کانادا", "آمریکا", "استرالیا", "انگلستان", "آلمان"],
    estimatedTime: "12-24 ماه",
    estimatedCost: "1,500-4,000 دلار",
    successRate: 88,
  },
  {
    id: "ausbildung",
    title: "آوسبیلدونگ آلمان",
    description: "دوره‌های آموزشی حرفه‌ای و کارورزی در آلمان",
    score: 0,
    requirements: ["حداقل مدرک دیپلم", "سن زیر 42 سال", "علاقه به یادگیری حرفه", "آمادگی برای کار عملی"],
    suitableFor: ["افراد جوان", "علاقه‌مندان به مشاغل فنی", "افراد بدون نیاز به مدرک زبان قوی"],
    notSuitableFor: ["افراد با سن بالای 42 سال", "افراد بدون علاقه به کار عملی"],
    recommendedCountries: ["آلمان"],
    estimatedTime: "2-4 ماه",
    estimatedCost: "500-1,500 دلار",
    successRate: 95,
  },
]

export function MigrationMethodWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [results, setResults] = useState<MigrationMethod[]>([])
  const [showResults, setShowResults] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // پیشروی به سوال بعدی
  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      analyzeAndShowResults()
    }
  }

  // بازگشت به سوال قبلی
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // ذخیره پاسخ‌ها
  const handleAnswer = (value: any) => {
    setAnswers({
      ...answers,
      [questions[currentStep].id]: value,
    })
  }

  // تحلیل و نمایش نتایج
  const analyzeAndShowResults = () => {
    setIsAnalyzing(true)

    // شبیه‌سازی تحلیل هوشمند
    setTimeout(() => {
      calculateResults()
      setShowResults(true)
      setIsAnalyzing(false)
    }, 2000)
  }

  // محاسبه نتایج
  const calculateResults = () => {
    // کپی از روش‌های مهاجرتی با امتیاز صفر
    const scoredMethods = [...migrationMethods].map((method) => ({ ...method, score: 0 }))

    // محاسبه امتیاز برای هر روش بر اساس پاسخ‌ها
    // سن
    const age = answers.age || 30
    if (age >= 25 && age <= 45) {
      scoredMethods.find((m) => m.id === "skilled-worker")!.score += 20
      scoredMethods.find((m) => m.id === "study")!.score += age <= 35 ? 20 : 10
      scoredMethods.find((m) => m.id === "ausbildung")!.score += age <= 35 ? 25 : 15
    } else if (age > 45) {
      scoredMethods.find((m) => m.id === "investment")!.score += 20
      scoredMethods.find((m) => m.id === "family")!.score += 15
    }

    // تحصیلات
    const education = answers.education || "bachelor"
    if (education === "master" || education === "phd") {
      scoredMethods.find((m) => m.id === "skilled-worker")!.score += 20
      scoredMethods.find((m) => m.id === "study")!.score += 15
    } else if (education === "bachelor") {
      scoredMethods.find((m) => m.id === "skilled-worker")!.score += 15
      scoredMethods.find((m) => m.id === "study")!.score += 20
    } else if (education === "diploma") {
      scoredMethods.find((m) => m.id === "ausbildung")!.score += 25
    }

    // سابقه کاری
    const workExperience = answers.work_experience || 0
    if (workExperience >= 3) {
      scoredMethods.find((m) => m.id === "skilled-worker")!.score += Math.min(workExperience * 3, 30)
    } else if (workExperience < 2) {
      scoredMethods.find((m) => m.id === "ausbildung")!.score += 15
      scoredMethods.find((m) => m.id === "study")!.score += 10
    }

    // زبان
    const language = answers.language || "intermediate"
    if (language === "advanced" || language === "fluent") {
      scoredMethods.find((m) => m.id === "skilled-worker")!.score += 20
      scoredMethods.find((m) => m.id === "study")!.score += 20
    } else if (language === "intermediate") {
      scoredMethods.find((m) => m.id === "skilled-worker")!.score += 10
      scoredMethods.find((m) => m.id === "study")!.score += 15
    } else {
      scoredMethods.find((m) => m.id === "investment")!.score += 15
      scoredMethods.find((m) => m.id === "family")!.score += 10
      scoredMethods.find((m) => m.id === "ausbildung")!.score += 20
    }

    // سرمایه
    const capital = answers.capital || "low"
    if (capital === "very_high" || capital === "high") {
      scoredMethods.find((m) => m.id === "investment")!.score += 30
    } else if (capital === "medium") {
      scoredMethods.find((m) => m.id === "investment")!.score += 20
      scoredMethods.find((m) => m.id === "study")!.score += 15
    } else {
      scoredMethods.find((m) => m.id === "ausbildung")!.score += 20
    }

    // اولویت‌ها
    const priorities = answers.priorities || []
    if (priorities.includes("speed")) {
      scoredMethods.find((m) => m.id === "investment")!.score += 15
    }
    if (priorities.includes("cost")) {
      scoredMethods.find((m) => m.id === "study")!.score += 10
      scoredMethods.find((m) => m.id === "ausbildung")!.score += 20
    }
    if (priorities.includes("success_rate")) {
      scoredMethods.find((m) => m.id === "family")!.score += 15
      scoredMethods.find((m) => m.id === "skilled-worker")!.score += 10
      scoredMethods.find((m) => m.id === "ausbildung")!.score += 15
    }
    if (priorities.includes("permanent_residence")) {
      scoredMethods.find((m) => m.id === "skilled-worker")!.score += 15
      scoredMethods.find((m) => m.id === "investment")!.score += 15
    }
    if (priorities.includes("education")) {
      scoredMethods.find((m) => m.id === "study")!.score += 20
    }
    if (priorities.includes("job_opportunities")) {
      scoredMethods.find((m) => m.id === "skilled-worker")!.score += 15
      scoredMethods.find((m) => m.id === "ausbildung")!.score += 15
    }

    // خانواده
    const family = answers.family || "no"
    if (family === "yes") {
      scoredMethods.find((m) => m.id === "skilled-worker")!.score += 10
      scoredMethods.find((m) => m.id === "investment")!.score += 15
      scoredMethods.find((m) => m.id === "family")!.score += 20
    }

    // بازه زمانی
    const timeframe = answers.timeframe || "short"
    if (timeframe === "immediate" || timeframe === "short") {
      scoredMethods.find((m) => m.id === "investment")!.score += 15
      scoredMethods.find((m) => m.id === "study")!.score += 10
      scoredMethods.find((m) => m.id === "ausbildung")!.score += 10
    } else {
      scoredMethods.find((m) => m.id === "skilled-worker")!.score += 15
    }

    // مرتب‌سازی روش‌ها بر اساس امتیاز
    scoredMethods.sort((a, b) => b.score - a.score)
    setResults(scoredMethods)
  }

  // رندر سوال فعلی
  const renderQuestion = () => {
    const question = questions[currentStep]

    switch (question.type) {
      case "single":
        return (
          <RadioGroup
            value={answers[question.id] || ""}
            onValueChange={(value) => handleAnswer(value)}
            className="flex flex-col space-y-3"
          >
            {question.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 space-x-reverse">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="cursor-pointer">
                  {option.text}
                </Label>
                {option.tooltip && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{option.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            ))}
          </RadioGroup>
        )

      case "multiple":
        return (
          <div className="flex flex-col space-y-3">
            {question.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id={option.id}
                  checked={(answers[question.id] || []).includes(option.id)}
                  onCheckedChange={(checked) => {
                    const currentValues = answers[question.id] || []
                    if (checked) {
                      handleAnswer([...currentValues, option.id])
                    } else {
                      handleAnswer(currentValues.filter((v: string) => v !== option.id))
                    }
                  }}
                />
                <Label htmlFor={option.id} className="cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </div>
        )

      case "slider":
        return (
          <div className="space-y-6">
            <div className="flex justify-between">
              <span>{question.min}</span>
              <span>{question.max}</span>
            </div>
            <Slider
              value={[answers[question.id] || question.min || 0]}
              min={question.min}
              max={question.max}
              step={question.step}
              onValueChange={(value) => handleAnswer(value[0])}
            />
            <div className="text-center font-bold text-xl">{answers[question.id] || question.min || 0}</div>
          </div>
        )

      default:
        return null
    }
  }

  // رندر صفحه تحلیل
  const renderAnalyzing = () => {
    return (
      <div className="text-center space-y-6 py-12">
        <div className="flex justify-center">
          <div className="relative">
            <Brain className="w-16 h-16 text-blue-600 animate-pulse" />
            <Sparkles className="w-8 h-8 text-yellow-500 absolute -top-2 -right-2 animate-bounce" />
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">در حال تحلیل هوشمند...</h3>
          <p className="text-gray-600">سیستم هوش مصنوعی در حال بررسی پاسخ‌های شما و تطبیق با بهترین روش‌های مهاجرت است</p>
        </div>
        <div className="space-y-2">
          <Progress value={66} className="h-2" />
          <p className="text-sm text-gray-500">تحلیل پروفایل شما...</p>
        </div>
      </div>
    )
  }

  // رندر نتایج
  const renderResults = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">نتایج تحلیل هوشمند شما</h3>
          <p className="text-gray-500">بر اساس پاسخ‌های شما، روش‌های زیر برای مهاجرت شما مناسب‌تر هستند</p>
        </div>

        <div className="space-y-4">
          {results.map((method, index) => (
            <Card
              key={method.id}
              className={`border ${index === 0 ? "border-green-300 shadow-md bg-green-50/30" : ""}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    {index === 0 && <Badge className="bg-green-100 text-green-800">بهترین انتخاب</Badge>}
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Badge
                      variant="outline"
                      className={`${
                        method.score > 70
                          ? "bg-green-100 text-green-800"
                          : method.score > 50
                            ? "bg-blue-100 text-blue-800"
                            : method.score > 30
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      تناسب: {Math.min(Math.round(method.score), 100)}%
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      موفقیت: {method.successRate}%
                    </Badge>
                  </div>
                </div>
                <CardDescription>{method.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">شرایط اصلی:</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {method.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">زمان تقریبی:</span>
                        <div className="font-medium">{method.estimatedTime}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">هزینه تقریبی:</span>
                        <div className="font-medium">{method.estimatedCost}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1 flex items-center">
                          <Check className="h-4 w-4 text-green-500 ml-1" />
                          مناسب برای:
                        </h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {method.suitableFor.slice(0, 2).map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1 flex items-center">
                          <X className="h-4 w-4 text-red-500 ml-1" />
                          مناسب نیست برای:
                        </h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {method.notSuitableFor.slice(0, 2).map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">کشورهای پیشنهادی:</h4>
                  <div className="flex flex-wrap gap-1">
                    {method.recommendedCountries.slice(0, 5).map((country, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {country}
                      </Badge>
                    ))}
                    {method.recommendedCountries.length > 5 && (
                      <Badge variant="secondary" className="text-xs">
                        +{method.recommendedCountries.length - 5}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/guide/countries?method=${method.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    مشاهده جزئیات بیشتر
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8 space-x-4 space-x-reverse">
          <Button
            onClick={() => {
              setShowResults(false)
              setCurrentStep(0)
              setAnswers({})
            }}
            variant="outline"
          >
            شروع مجدد
          </Button>
          <Button>درخواست مشاوره تخصصی</Button>
        </div>
      </div>
    )
  }

  return (
    <Card className="border shadow-md max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center space-x-2 space-x-reverse">
          <Brain className="w-6 h-6 text-blue-600" />
          <span>ویزارد هوشمند انتخاب روش مهاجرتی</span>
        </CardTitle>
        <CardDescription>
          با پاسخ به سوالات زیر، سیستم هوش مصنوعی ما مناسب‌ترین روش مهاجرتی را برای شما پیشنهاد می‌دهد
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isAnalyzing ? (
          renderAnalyzing()
        ) : !showResults ? (
          <div className="space-y-6">
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>
                  سوال {currentStep + 1} از {questions.length}
                </span>
                <span>{Math.round(((currentStep + 1) / questions.length) * 100)}% تکمیل شده</span>
              </div>
              <Progress value={((currentStep + 1) / questions.length) * 100} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <h3 className="text-lg font-medium">{questions[currentStep].text}</h3>
                {questions[currentStep].tooltipText && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400 mr-2" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{questions[currentStep].tooltipText}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>

              <div className="py-4">{renderQuestion()}</div>
            </div>
          </div>
        ) : (
          renderResults()
        )}
      </CardContent>
      {!showResults && !isAnalyzing && (
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 0} className="flex items-center">
            <ArrowRight className="ml-2 h-4 w-4" />
            قبلی
          </Button>
          <Button
            onClick={nextStep}
            disabled={
              !answers[questions[currentStep].id] ||
              (questions[currentStep].type === "multiple" && (answers[questions[currentStep].id] || []).length === 0)
            }
            className="flex items-center"
          >
            {currentStep === questions.length - 1 ? "تحلیل هوشمند" : "بعدی"}
            {currentStep !== questions.length - 1 && <ArrowLeft className="mr-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
