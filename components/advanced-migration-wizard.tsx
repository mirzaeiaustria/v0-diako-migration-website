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
  Phone,
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
  costDetails: string // Changed to string for detailed text
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
    spouseEducation: "", // New field

    // Education
    education: "",
    educationField: "", // New field
    gpa: "", // New field
    hasCredentialAssessment: false,

    // Experience
    workExperience: "",
    currentJob: "",
    managementExperience: "", // New field
    languageSkills: {
      english: "",
      french: "",
      german: "", // Added German
    },

    // Financial
    budget: "",
    annualIncome: "", // New field
    hasJobOffer: false,
    investmentCapacity: "",

    // Preferences
    preferredCountries: [],
    migrationGoal: "",
    timeline: "",
    familyReunification: false, // New field
    travelHistory: "", // New field
    medicalConditions: "", // New field
    specialSkills: "", // New field
    pnpInterest: false, // New field
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
    // This logic would be replaced by actual AI/rule-based system
    const primaryRecommendation: MigrationRecommendation = {
      method: "مهاجرت کاری",
      country: "کانادا",
      score: 75, // Example score based on user's request
      timeline: "12-18 ماه",
      costDetails: `
        هزینه‌های مهاجرت کاری به کانادا به شرح زیر تخمین زده می‌شود:
        - هزینه‌های دولتی (بررسی پرونده، ویزا): 1,500 - 2,500 دلار کانادا
        - هزینه‌های وکیل/مشاور مهاجرت: 3,000 - 7,000 دلار کانادا
        - هزینه‌های ترجمه مدارک: 500 - 1,000 دلار کانادا
        - آزمون‌های زبان (آیلتس/CELPIP): 200 - 300 دلار کانادا
        - معاینات پزشکی: 200 - 400 دلار کانادا
        - تمکن مالی اولیه (برای یک نفر): 13,757 دلار کانادا (ممکن است بر اساس تعداد اعضای خانواده افزایش یابد)
        - هزینه‌های اولیه زندگی (اجاره، حمل و نقل، غذا برای 1-3 ماه): 3,000 - 6,000 دلار کانادا
        
        **مجموع تخمینی: 21,657 - 30,957 دلار کانادا**
        
        این هزینه‌ها تقریبی بوده و بسته به شرایط فردی، نرخ ارز و تغییرات قوانین ممکن است متفاوت باشد.
      `,
      successRate: 78,
      requirements: ["مدرک زبان IELTS 7+", "ارزیابی مدارک", "تجربه کاری 3+ سال"],
      advantages: ["مسیر سریع به اقامت دائم", "امکان همراهی خانواده", "بازار کار قوی"],
      challenges: ["رقابت بالا", "نیاز به نمره زبان بالا", "فرآیند طولانی"],
    }

    setRecommendations([primaryRecommendation]) // Only set the primary recommendation
    setIsAnalyzing(false)
    nextStep()
  }

  const renderStepContent = () => {
    const currentQuestion = wizardSteps[currentStep].id
    switch (currentQuestion) {
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

            {formData.maritalStatus === "married" && (
              <div>
                <Label className="text-base font-medium">بالاترین مدرک تحصیلی همسر</Label>
                <Select
                  value={formData.spouseEducation}
                  onValueChange={(value) => updateFormData("spouseEducation", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="مدرک تحصیلی همسر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">ندارد</SelectItem>
                    <SelectItem value="diploma">دیپلم</SelectItem>
                    <SelectItem value="associate">کاردانی</SelectItem>
                    <SelectItem value="bachelor">کارشناسی</SelectItem>
                    <SelectItem value="master">کارشناسی ارشد</SelectItem>
                    <SelectItem value="phd">دکتری</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
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
              <Label htmlFor="educationField" className="text-base font-medium">
                رشته تحصیلی
              </Label>
              <Input
                id="educationField"
                value={formData.educationField}
                onChange={(e) => updateFormData("educationField", e.target.value)}
                placeholder="رشته تحصیلی خود را وارد کنید (مثلاً مهندسی نرم‌افزار)"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="gpa" className="text-base font-medium">
                معدل (از 4 یا 20)
              </Label>
              <Input
                id="gpa"
                value={formData.gpa}
                onChange={(e) => updateFormData("gpa", e.target.value)}
                placeholder="مثلاً 3.5 یا 17.5"
                className="mt-2"
                type="number"
                step="0.1"
              />
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="credential"
                checked={formData.hasCredentialAssessment}
                onCheckedChange={(checked) => updateFormData("hasCredentialAssessment", checked)}
              />
              <Label htmlFor="credential">ارزیابی مدارک تحصیلی (WES/ECA) دارم</Label>
            </div>
          </div>
        )

      case "experience":
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">سابقه کار تمام وقت (سال)</Label>
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
                عنوان شغل فعلی
              </Label>
              <Input
                id="currentJob"
                value={formData.currentJob}
                onChange={(e) => updateFormData("currentJob", e.target.value)}
                placeholder="مثلاً مهندس نرم‌افزار، پزشک، مدیر پروژه"
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-base font-medium">سابقه مدیریت (سال)</Label>
              <Select
                value={formData.managementExperience}
                onValueChange={(value) => updateFormData("managementExperience", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="سابقه مدیریت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">ندارم</SelectItem>
                  <SelectItem value="1-3">1-3 سال</SelectItem>
                  <SelectItem value="3-5">3-5 سال</SelectItem>
                  <SelectItem value="5+">بیش از 5 سال</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">مهارت‌های زبانی</Label>

              <div>
                <Label htmlFor="english" className="text-sm">
                  زبان انگلیسی (آیلتس/تافل)
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
                    <SelectItem value="none">ندارم</SelectItem>
                    <SelectItem value="beginner">مبتدی (A1-A2)</SelectItem>
                    <SelectItem value="intermediate">متوسط (B1-B2)</SelectItem>
                    <SelectItem value="advanced">پیشرفته (C1-C2)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="french" className="text-sm">
                  زبان فرانسه (TEF/TCF)
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
                    <SelectItem value="beginner">مبتدی (A1-A2)</SelectItem>
                    <SelectItem value="intermediate">متوسط (B1-B2)</SelectItem>
                    <SelectItem value="advanced">پیشرفته (C1-C2)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="german" className="text-sm">
                  زبان آلمانی (Goethe/TestDaF)
                </Label>
                <Select
                  value={formData.languageSkills.german}
                  onValueChange={(value) =>
                    updateFormData("languageSkills", { ...formData.languageSkills, german: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="سطح آلمانی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">ندارم</SelectItem>
                    <SelectItem value="beginner">مبتدی (A1-A2)</SelectItem>
                    <SelectItem value="intermediate">متوسط (B1-B2)</SelectItem>
                    <SelectItem value="advanced">پیشرفته (C1-C2)</SelectItem>
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
              <Label className="text-base font-medium">بودجه کلی مهاجرت (به دلار آمریکا)</Label>
              <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="بودجه خود را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-10k">کمتر از 10,000</SelectItem>
                  <SelectItem value="10k-25k">10,000 - 25,000</SelectItem>
                  <SelectItem value="25k-50k">25,000 - 50,000</SelectItem>
                  <SelectItem value="50k-100k">50,000 - 100,000</SelectItem>
                  <SelectItem value="100k-250k">100,000 - 250,000</SelectItem>
                  <SelectItem value="250k+">بیش از 250,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="annualIncome" className="text-base font-medium">
                درآمد سالیانه فعلی (به دلار آمریکا)
              </Label>
              <Input
                id="annualIncome"
                value={formData.annualIncome}
                onChange={(e) => updateFormData("annualIncome", e.target.value)}
                placeholder="مثلاً 30,000"
                className="mt-2"
                type="number"
              />
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="jobOffer"
                checked={formData.hasJobOffer}
                onCheckedChange={(checked) => updateFormData("hasJobOffer", checked)}
              />
              <Label htmlFor="jobOffer">جاب آفر معتبر از کشور مقصد دارم</Label>
            </div>

            <div>
              <Label className="text-base font-medium">ظرفیت سرمایه‌گذاری (به دلار آمریکا)</Label>
              <Select
                value={formData.investmentCapacity}
                onValueChange={(value) => updateFormData("investmentCapacity", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="ظرفیت سرمایه‌گذاری" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">قابلیت سرمایه‌گذاری ندارم</SelectItem>
                  <SelectItem value="100k-250k">100,000 - 250,000</SelectItem>
                  <SelectItem value="250k-500k">250,000 - 500,000</SelectItem>
                  <SelectItem value="500k-1M">500,000 - 1,000,000</SelectItem>
                  <SelectItem value="1M+">بیش از 1,000,000</SelectItem>
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
                {[
                  "کانادا",
                  "آلمان",
                  "استرالیا",
                  "آمریکا",
                  "انگلستان",
                  "فرانسه",
                  "پرتغال",
                  "اسپانیا",
                  "ایتالیا",
                  "هلند",
                  "ترکیه",
                  "یونان",
                  "قبرس",
                  "اتریش",
                ].map((country) => (
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
                  <RadioGroupItem value="startup" id="startup" />
                  <Label htmlFor="startup">راه‌اندازی کسب‌وکار/استارتاپ</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="family" id="family" />
                  <Label htmlFor="family">پیوستن به خانواده</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="lifestyle" id="lifestyle" />
                  <Label htmlFor="lifestyle">بهبود کیفیت زندگی/بازنشستگی</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="asylum" id="asylum" />
                  <Label htmlFor="asylum">پناهندگی</Label>
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
                  <SelectItem value="asap">هرچه سریع‌تر (کمتر از 6 ماه)</SelectItem>
                  <SelectItem value="6months-1year">6 ماه تا 1 سال آینده</SelectItem>
                  <SelectItem value="1year-2years">1 تا 2 سال آینده</SelectItem>
                  <SelectItem value="2years+">بیش از 2 سال آینده</SelectItem>
                  <SelectItem value="flexible">انعطاف‌پذیر</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="familyReunification"
                checked={formData.familyReunification}
                onCheckedChange={(checked) => updateFormData("familyReunification", checked)}
              />
              <Label htmlFor="familyReunification">قصد مهاجرت با خانواده را دارم</Label>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id="pnpInterest"
                checked={formData.pnpInterest}
                onCheckedChange={(checked) => updateFormData("pnpInterest", checked)}
              />
              <Label htmlFor="pnpInterest">تمایل به شرکت در برنامه‌های نامزدی استانی (PNP) دارم</Label>
            </div>

            <div>
              <Label htmlFor="travelHistory" className="text-base font-medium">
                سابقه سفر به کشورهای دیگر (اختیاری)
              </Label>
              <Input
                id="travelHistory"
                value={formData.travelHistory}
                onChange={(e) => updateFormData("travelHistory", e.target.value)}
                placeholder="کشورهایی که سفر کرده‌اید یا ویزای رد شده دارید"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="medicalConditions" className="text-base font-medium">
                شرایط خاص پزشکی (اختیاری)
              </Label>
              <Input
                id="medicalConditions"
                value={formData.medicalConditions}
                onChange={(e) => updateFormData("medicalConditions", e.target.value)}
                placeholder="اگر شرایط پزشکی خاصی دارید"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="specialSkills" className="text-base font-medium">
                مهارت‌های خاص یا دستاوردهای ویژه (اختیاری)
              </Label>
              <Input
                id="specialSkills"
                value={formData.specialSkills}
                onChange={(e) => updateFormData("specialSkills", e.target.value)}
                placeholder="مثلاً ورزشکار، هنرمند، اختراع ثبت شده"
                className="mt-2"
              />
            </div>
          </div>
        )

      case "results":
        const primaryRec = recommendations[0]
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
                  <p className="text-gray-600">
                    مشاورین هلدینگ مهاجرتی دیاکو بر اساس اطلاعات شما، بهترین مسیر مهاجرت را پیشنهاد داده و احتمال موفقیت
                    شما را محاسبه می‌کنند.
                  </p>
                </div>

                {primaryRec && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-teal-50">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl text-gray-900">
                              {primaryRec.method} - {primaryRec.country}
                            </CardTitle>
                            <div className="flex items-center gap-4 mt-2">
                              <Badge className="bg-green-100 text-green-800">تناسب: {primaryRec.score}/100</Badge>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                {primaryRec.timeline}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <TrendingUp className="w-4 h-4" />
                                {primaryRec.successRate}% موفقیت
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-blue-600">{primaryRec.score}</div>
                            <div className="text-sm text-gray-500">امتیاز</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              تخمین درصد موفقیت:
                            </h4>
                            <p className="text-gray-600">
                              بر اساس اطلاعات شما، احتمال موفقیت در روش{" "}
                              <span className="font-bold text-blue-600">{primaryRec.method}</span> به کشور{" "}
                              <span className="font-bold text-blue-600">{primaryRec.country}</span>{" "}
                              <span className="font-bold text-blue-600">{primaryRec.score}%</span> تخمین زده می‌شود.
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-purple-600" />
                              محاسبه هزینه‌های مهاجرتی:
                            </h4>
                            <div className="text-sm text-gray-600 whitespace-pre-line">{primaryRec.costDetails}</div>
                            <p className="text-xs text-gray-500 mt-2">
                              *نمایش هزینه‌ها در قالب چارت در به‌روزرسانی‌های آینده اضافه خواهد شد.
                            </p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                شرایط لازم
                              </h4>
                              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                                {primaryRec.requirements.map((req, i) => (
                                  <li key={i}>{req}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <Award className="w-4 h-4 text-blue-600" />
                                مزایا
                              </h4>
                              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                                {primaryRec.advantages.map((adv, i) => (
                                  <li key={i}>{adv}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="md:col-span-2">
                              <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-orange-600" />
                                چالش‌ها
                              </h4>
                              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                                {primaryRec.challenges.map((challenge, i) => (
                                  <li key={i}>{challenge}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                          <Button asChild className="flex-1">
                            <a
                              href="https://calendly.com/diaco-holding/15min"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Phone className="w-4 h-4 ml-2" />
                              مشاوره رایگان
                            </a>
                          </Button>
                          <Button asChild variant="outline" className="flex-1">
                            <a
                              href="https://calendly.com/diaco-holding/15min"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              رزرو وقت مشاوره
                            </a>
                          </Button>
                          <Button variant="outline" className="flex-1">
                            دانلود گزارش کامل
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">مرحله بعدی چیست؟</h4>
                  <p className="text-gray-600 mb-4">
                    برای شروع فرآیند مهاجرت، پیشنهاد می‌کنیم با کارشناسان ما مشاوره رایگان داشته باشید.
                  </p>
                  <div className="flex gap-3">
                    <Button asChild>
                      <a href="https://calendly.com/diaco-holding/15min" target="_blank" rel="noopener noreferrer">
                        رزرو مشاوره رایگان
                      </a>
                    </Button>
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
        return formData.age && formData.maritalStatus && formData.children
      case "education":
        return formData.education && formData.educationField && formData.gpa
      case "experience":
        return formData.workExperience && formData.currentJob && formData.languageSkills.english
      case "financial":
        return formData.budget && formData.annualIncome && formData.investmentCapacity
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
