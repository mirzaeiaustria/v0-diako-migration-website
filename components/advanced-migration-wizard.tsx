"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight,
  ChevronLeft,
  User,
  GraduationCap,
  Briefcase,
  DollarSign,
  Heart,
  Globe,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Clock,
  Award,
  Calculator,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface WizardStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
}

interface MigrationRecommendation {
  method: string
  country: string
  score: number
  timeline: string
  cost: string
  successRate: number
  requirements: string[]
  advantages: string[]
  challenges: string[]
}

const wizardSteps: WizardStep[] = [
  {
    id: "personal",
    title: "اطلاعات شخصی",
    description: "سن، وضعیت تأهل و اطلاعات پایه",
    icon: User,
  },
  {
    id: "education",
    title: "تحصیلات",
    description: "مدرک تحصیلی و رشته تحصیلی",
    icon: GraduationCap,
  },
  {
    id: "experience",
    title: "تجربه کاری",
    description: "سابقه کار و مهارت‌های حرفه‌ای",
    icon: Briefcase,
  },
  {
    id: "financial",
    title: "وضعیت مالی",
    description: "بودجه و توانایی مالی",
    icon: DollarSign,
  },
  {
    id: "preferences",
    title: "ترجیحات",
    description: "کشور مقصد و اولویت‌ها",
    icon: Heart,
  },
  {
    id: "results",
    title: "نتایج",
    description: "پیشنهادات شخصی‌سازی‌شده",
    icon: Globe,
  },
]

export function AdvancedMigrationWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Personal Info
    age: "",
    maritalStatus: "",
    children: "",
    spouseEducation: "",

    // Education
    education: "",
    field: "",
    hasCredentialAssessment: false,

    // Experience
    workExperience: "",
    currentJob: "",
    languageSkills: {
      english: "",
      french: "",
      german: "",
    },

    // Financial
    budget: "",
    hasJobOffer: false,
    investmentCapacity: "",

    // Preferences
    preferredCountries: [],
    migrationGoal: "",
    timeline: "",
    familyReunification: false,
  })

  const [recommendations, setRecommendations] = useState<MigrationRecommendation[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const nextStep = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const analyzeProfile = async () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock recommendations based on form data
    const mockRecommendations: MigrationRecommendation[] = [
      {
        method: "مهاجرت کاری",
        country: "کانادا",
        score: 85,
        timeline: "12-18 ماه",
        cost: "$8,000 - $15,000",
        successRate: 78,
        requirements: ["مدرک زبان IELTS 7+", "ارزیابی مدارک", "تجربه کاری 3+ سال"],
        advantages: ["مسیر سریع به اقامت دائم", "امکان همراهی خانواده", "بازار کار قوی"],
        challenges: ["رقابت بالا", "نیاز به نمره زبان بالا", "فرآیند طولانی"],
      },
      {
        method: "آوسبیلدونگ",
        country: "آلمان",
        score: 92,
        timeline: "6-9 ماه",
        cost: "$3,000 - $6,000",
        successRate: 95,
        requirements: ["زبان آلمانی A2", "سن زیر 35 سال", "مدرک دیپلم"],
        advantages: ["جاب آفر تضمینی", "حقوق حین آموزش", "مسیر آسان به اقامت"],
        challenges: ["یادگیری زبان آلمانی", "کار فیزیکی", "فرهنگ متفاوت"],
      },
      {
        method: "مهاجرت سرمایه‌گذاری",
        country: "پرتغال",
        score: 70,
        timeline: "6-12 ماه",
        cost: "$350,000+",
        successRate: 90,
        requirements: ["سرمایه‌گذاری €350,000", "عدم سوء پیشینه", "بیمه درمانی"],
        advantages: ["پردازش سریع", "دسترسی به اتحادیه اروپا", "کیفیت زندگی بالا"],
        challenges: ["سرمایه بالا", "مالیات", "زبان پرتغالی"],
      },
    ]

    setRecommendations(mockRecommendations)
    setIsAnalyzing(false)
    nextStep()
  }

  const renderStepContent = () => {
    switch (wizardSteps[currentStep].id) {
      case "personal":
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="age" className="text-base font-medium">
                سن شما
              </Label>
              <Select value={formData.age} onValueChange={(value) => updateFormData("age", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="سن خود را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="18-25">18-25 سال</SelectItem>
                  <SelectItem value="26-30">26-30 سال</SelectItem>
                  <SelectItem value="31-35">31-35 سال</SelectItem>
                  <SelectItem value="36-40">36-40 سال</SelectItem>
                  <SelectItem value="41-45">41-45 سال</SelectItem>
                  <SelectItem value="45+">بالای 45 سال</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-medium">وضعیت تأهل</Label>
              <RadioGroup
                value={formData.maritalStatus}
                onValueChange={(value) => updateFormData("maritalStatus", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="single" id="single" />
                  <Label htmlFor="single">مجرد</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="married" id="married" />
                  <Label htmlFor="married">متأهل</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="divorced" id="divorced" />
                  <Label htmlFor="divorced">مطلقه</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium">تعداد فرزندان</Label>
              <Select value={formData.children} onValueChange={(value) => updateFormData("children", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="تعداد فرزندان" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">بدون فرزند</SelectItem>
                  <SelectItem value="1">1 فرزند</SelectItem>
                  <SelectItem value="2">2 فرزند</SelectItem>
                  <SelectItem value="3+">3 فرزند یا بیشتر</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "education":
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">بالاترین مدرک تحصیلی</Label>
              <RadioGroup
                value={formData.education}
                onValueChange={(value) => updateFormData("education", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="diploma" id="diploma" />
                  <Label htmlFor="diploma">دیپلم</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="associate" id="associate" />
                  <Label htmlFor="associate">کاردانی</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="bachelor" id="bachelor" />
                  <Label htmlFor="bachelor">کارشناسی</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="master" id="master" />
                  <Label htmlFor="master">کارشناسی ارشد</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="phd" id="phd" />
                  <Label htmlFor="phd">دکتری</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="field" className="text-base font-medium">
                رشته تحصیلی
              </Label>
              <Select value={formData.field} onValueChange={(value) => updateFormData("field", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="رشته تحصیلی خود را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">مهندسی</SelectItem>
                  <SelectItem value="medicine">پزشکی</SelectItem>
                  <SelectItem value="it">فناوری اطلاعات</SelectItem>
                  <SelectItem value="business">مدیریت و کسب‌وکار</SelectItem>
                  <SelectItem value="arts">هنر و ادبیات</SelectItem>
                  <SelectItem value="science">علوم پایه</SelectItem>
                  <SelectItem value="other">سایر</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="credential"
                checked={formData.hasCredentialAssessment}
                onCheckedChange={(checked) => updateFormData("hasCredentialAssessment", checked)}
              />
              <Label htmlFor="credential">ارزیابی مدارک تحصیلی دارم</Label>
            </div>
          </div>
        )

      case "experience":
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">سابقه کار</Label>
              <Select
                value={formData.workExperience}
                onValueChange={(value) => updateFormData("workExperience", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="سابقه کاری خود را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">کمتر از 1 سال</SelectItem>
                  <SelectItem value="1-3">1-3 سال</SelectItem>
                  <SelectItem value="3-5">3-5 سال</SelectItem>
                  <SelectItem value="5-10">5-10 سال</SelectItem>
                  <SelectItem value="10+">بیش از 10 سال</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="currentJob" className="text-base font-medium">
                شغل فعلی
              </Label>
              <Input
                id="currentJob"
                value={formData.currentJob}
                onChange={(e) => updateFormData("currentJob", e.target.value)}
                placeholder="عنوان شغل فعلی خود را وارد کنید"
                className="mt-2"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">مهارت‌های زبانی</Label>

              <div>
                <Label htmlFor="english" className="text-sm">
                  زبان انگلیسی
                </Label>
                <Select
                  value={formData.languageSkills.english}
                  onValueChange={(value) =>
                    updateFormData("languageSkills", { ...formData.languageSkills, english: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="سطح انگلیسی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">مبتدی</SelectItem>
                    <SelectItem value="intermediate">متوسط</SelectItem>
                    <SelectItem value="advanced">پیشرفته</SelectItem>
                    <SelectItem value="native">زبان مادری</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="french" className="text-sm">
                  زبان فرانسه
                </Label>
                <Select
                  value={formData.languageSkills.french}
                  onValueChange={(value) =>
                    updateFormData("languageSkills", { ...formData.languageSkills, french: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="سطح فرانسه" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">ندارم</SelectItem>
                    <SelectItem value="beginner">مبتدی</SelectItem>
                    <SelectItem value="intermediate">متوسط</SelectItem>
                    <SelectItem value="advanced">پیشرفته</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case "financial":
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">بودجه مهاجرت</Label>
              <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="بودجه خود را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-10k">کمتر از 10,000 دلار</SelectItem>
                  <SelectItem value="10k-25k">10,000 - 25,000 دلار</SelectItem>
                  <SelectItem value="25k-50k">25,000 - 50,000 دلار</SelectItem>
                  <SelectItem value="50k-100k">50,000 - 100,000 دلار</SelectItem>
                  <SelectItem value="100k-250k">100,000 - 250,000 دلار</SelectItem>
                  <SelectItem value="250k+">بیش از 250,000 دلار</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="jobOffer"
                checked={formData.hasJobOffer}
                onCheckedChange={(checked) => updateFormData("hasJobOffer", checked)}
              />
              <Label htmlFor="jobOffer">جاب آفر از کشور مقصد دارم</Label>
            </div>

            <div>
              <Label className="text-base font-medium">ظرفیت سرمایه‌گذاری</Label>
              <Select
                value={formData.investmentCapacity}
                onValueChange={(value) => updateFormData("investmentCapacity", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="ظرفیت سرمایه‌گذاری" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">قابلیت سرمایه‌گذاری ندارم</SelectItem>
                  <SelectItem value="100k-250k">100,000 - 250,000 دلار</SelectItem>
                  <SelectItem value="250k-500k">250,000 - 500,000 دلار</SelectItem>
                  <SelectItem value="500k+">بیش از 500,000 دلار</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "preferences":
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">کشورهای مورد علاقه (چند انتخاب امکان‌پذیر)</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {["کانادا", "آلمان", "استرالیا", "آمریکا", "انگلستان", "فرانسه", "پرتغال", "اسپانیا"].map((country) => (
                  <div key={country} className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id={country}
                      checked={formData.preferredCountries.includes(country)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData("preferredCountries", [...formData.preferredCountries, country])
                        } else {
                          updateFormData(
                            "preferredCountries",
                            formData.preferredCountries.filter((c) => c !== country),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={country}>{country}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium">هدف اصلی مهاجرت</Label>
              <RadioGroup
                value={formData.migrationGoal}
                onValueChange={(value) => updateFormData("migrationGoal", value)}
                className="mt-2"
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="work" id="work" />
                  <Label htmlFor="work">کار و اشتغال</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="study" id="study" />
                  <Label htmlFor="study">تحصیل</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="investment" id="investment" />
                  <Label htmlFor="investment">سرمایه‌گذاری</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="family" id="family" />
                  <Label htmlFor="family">پیوستن به خانواده</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="lifestyle" id="lifestyle" />
                  <Label htmlFor="lifestyle">بهبود کیفیت زندگی</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium">بازه زمانی مورد نظر</Label>
              <Select value={formData.timeline} onValueChange={(value) => updateFormData("timeline", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="زمان‌بندی مهاجرت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">هرچه سریع‌تر</SelectItem>
                  <SelectItem value="6months">6 ماه آینده</SelectItem>
                  <SelectItem value="1year">1 سال آینده</SelectItem>
                  <SelectItem value="2years">2 سال آینده</SelectItem>
                  <SelectItem value="flexible">انعطاف‌پذیر</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case "results":
        return (
          <div className="space-y-6">
            {isAnalyzing ? (
              <div className="text-center py-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">در حال تحلیل پروفایل شما...</h3>
                <p className="text-gray-600">لطفاً صبر کنید، هوش مصنوعی ما بهترین گزینه‌ها را برای شما پیدا می‌کند</p>
              </div>
            ) : (
              <div>
                <div className="text-center mb-8">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">تحلیل کامل شد!</h3>
                  <p className="text-gray-600">بر اساس اطلاعات شما، بهترین گزینه‌های مهاجرت را پیدا کردیم</p>
                </div>

                <div className="space-y-6">
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-teal-50">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-xl text-gray-900">
                                {rec.method} - {rec.country}
                              </CardTitle>
                              <div className="flex items-center gap-4 mt-2">
                                <Badge className="bg-green-100 text-green-800">امتیاز: {rec.score}/100</Badge>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <Clock className="w-4 h-4" />
                                  {rec.timeline}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <DollarSign className="w-4 h-4" />
                                  {rec.cost}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <TrendingUp className="w-4 h-4" />
                                  {rec.successRate}% موفقیت
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-blue-600">{rec.score}</div>
                              <div className="text-sm text-gray-500">امتیاز</div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-3 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                شرایط لازم
                              </h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {rec.requirements.map((req, i) => (
                                  <li key={i}>• {req}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <Award className="w-4 h-4 text-blue-600" />
                                مزایا
                              </h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {rec.advantages.map((adv, i) => (
                                  <li key={i}>• {adv}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-orange-600" />
                                چالش‌ها
                              </h4>
                              <ul className="text-sm text-gray-600 space-y-1">
                                {rec.challenges.map((challenge, i) => (
                                  <li key={i}>• {challenge}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-6 flex gap-3">
                            <Button className="flex-1">
                              <Calculator className="w-4 h-4 ml-2" />
                              محاسبه دقیق هزینه
                            </Button>
                            <Button variant="outline" className="flex-1">
                              اطلاعات بیشتر
                            </Button>
                            <Button variant="outline">مشاوره رایگان</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">مرحله بعدی چیست؟</h4>
                  <p className="text-gray-600 mb-4">
                    برای شروع فرآیند مهاجرت، پیشنهاد می‌کنیم با کارشناسان ما مشاوره رایگان داشته باشید.
                  </p>
                  <div className="flex gap-3">
                    <Button>رزرو مشاوره رایگان</Button>
                    <Button variant="outline">دانلود گزارش کامل</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const isStepComplete = () => {
    switch (wizardSteps[currentStep].id) {
      case "personal":
        return formData.age && formData.maritalStatus
      case "education":
        return formData.education && formData.field
      case "experience":
        return formData.workExperience && formData.languageSkills.english
      case "financial":
        return formData.budget
      case "preferences":
        return formData.preferredCountries.length > 0 && formData.migrationGoal && formData.timeline
      default:
        return true
    }
  }

  const progress = ((currentStep + 1) / wizardSteps.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">ویزارد هوشمند انتخاب روش مهاجرت</CardTitle>
              <p className="text-blue-100 mt-2">{wizardSteps[currentStep].description}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{currentStep + 1}</div>
              <div className="text-sm text-blue-100">از {wizardSteps.length}</div>
            </div>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="bg-blue-500/30" />
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {/* Step Navigation */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4 space-x-reverse">
              {wizardSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      index <= currentStep
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-400"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <step.icon className="w-5 h-5" />
                  </motion.div>
                  {index < wizardSteps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                        index < currentStep ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{wizardSteps[currentStep].title}</h2>
            <p className="text-gray-600">{wizardSteps[currentStep].description}</p>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[400px]"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4" />
              مرحله قبل
            </Button>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>
                مرحله {currentStep + 1} از {wizardSteps.length}
              </span>
            </div>

            {currentStep === wizardSteps.length - 2 ? (
              <Button
                onClick={analyzeProfile}
                disabled={!isStepComplete()}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600"
              >
                تحلیل پروفایل
                <TrendingUp className="w-4 h-4" />
              </Button>
            ) : currentStep === wizardSteps.length - 1 ? (
              <Button onClick={() => setCurrentStep(0)} className="flex items-center gap-2">
                شروع مجدد
                <ChevronLeft className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={nextStep} disabled={!isStepComplete()} className="flex items-center gap-2">
                مرحله بعد
                <ChevronLeft className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
