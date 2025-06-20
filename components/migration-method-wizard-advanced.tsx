"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { countries, type CountryMigrationMethod } from "@/lib/countries-migration-methods"
import { Check, ChevronLeft, ChevronRight, Download, Share2, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface WizardStep {
  id: string
  title: string
  description: string
}

interface UserProfile {
  age: number
  education: string
  workExperience: number
  language: string
  languageScore: number
  hasFamily: boolean
  budget: number
  preferredCountries: string[]
  preferredMethods: string[]
  timeframe: string
}

interface MethodScore {
  countryId: string
  methodId: string
  score: number
  matchPercentage: number
}

const steps: WizardStep[] = [
  {
    id: "personal",
    title: "اطلاعات شخصی",
    description: "اطلاعات پایه‌ای خود را وارد کنید",
  },
  {
    id: "education",
    title: "تحصیلات و مهارت‌ها",
    description: "اطلاعات تحصیلی و مهارت‌های خود را وارد کنید",
  },
  {
    id: "preferences",
    title: "ترجیحات مهاجرتی",
    description: "ترجیحات خود برای مهاجرت را مشخص کنید",
  },
  {
    id: "results",
    title: "نتایج",
    description: "بهترین روش‌های مهاجرتی برای شما",
  },
]

export function MigrationMethodWizardAdvanced() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    age: 30,
    education: "bachelors",
    workExperience: 5,
    language: "english",
    languageScore: 7,
    hasFamily: false,
    budget: 20000,
    preferredCountries: [],
    preferredMethods: [],
    timeframe: "1-2",
  })
  const [results, setResults] = useState<MethodScore[]>([])
  const [selectedMethods, setSelectedMethods] = useState<string[]>([])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      if (currentStep === 2) {
        calculateResults()
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    setUserProfile({ ...userProfile, [field]: value })
  }

  const calculateResults = () => {
    const methodScores: MethodScore[] = []

    countries.forEach((country) => {
      country.migrationMethods.forEach((method) => {
        let score = 0
        let matchFactors = 0

        // Age factor
        if (
          (method.title.includes("تحصیلی") && userProfile.age < 35) ||
          (method.title.includes("کار") && userProfile.age < 45) ||
          (method.title.includes("سرمایه") && userProfile.age < 60)
        ) {
          score += 20
          matchFactors++
        }

        // Education factor
        if (
          (method.title.includes("تحصیلی") && userProfile.education !== "highschool") ||
          (method.title.includes("کار") && userProfile.education !== "highschool") ||
          method.title.includes("سرمایه")
        ) {
          score += 15
          matchFactors++
        }

        // Work experience
        if (
          (method.title.includes("کار") && userProfile.workExperience >= 3) ||
          (method.title.includes("سرمایه") && userProfile.workExperience >= 2)
        ) {
          score += 15
          matchFactors++
        }

        // Language
        if (userProfile.languageScore >= 7) {
          score += 20
          matchFactors++
        } else if (userProfile.languageScore >= 5) {
          score += 10
          matchFactors++
        }

        // Budget
        if (
          (method.title.includes("سرمایه") && userProfile.budget >= 100000) ||
          (method.title.includes("تحصیلی") && userProfile.budget >= 30000) ||
          (method.title.includes("کار") && userProfile.budget >= 15000)
        ) {
          score += 20
          matchFactors++
        }

        // Country preference
        if (userProfile.preferredCountries.includes(country.id)) {
          score += 15
          matchFactors++
        }

        // Method preference
        if (
          (userProfile.preferredMethods.includes("study") && method.title.includes("تحصیلی")) ||
          (userProfile.preferredMethods.includes("work") && method.title.includes("کار")) ||
          (userProfile.preferredMethods.includes("investment") && method.title.includes("سرمایه")) ||
          (userProfile.preferredMethods.includes("startup") && method.title.includes("استارتاپ")) ||
          (userProfile.preferredMethods.includes("self") && method.title.includes("خوداشتغالی"))
        ) {
          score += 15
          matchFactors++
        }

        const matchPercentage = Math.min(Math.round((score / (matchFactors * 20)) * 100), 100)

        methodScores.push({
          countryId: country.id,
          methodId: method.id,
          score,
          matchPercentage,
        })
      })
    })

    methodScores.sort((a, b) => b.score - a.score)
    setResults(methodScores.slice(0, 10))
  }

  const toggleMethodSelection = (countryId: string, methodId: string) => {
    const key = `${countryId}-${methodId}`
    if (selectedMethods.includes(key)) {
      setSelectedMethods(selectedMethods.filter((m) => m !== key))
    } else if (selectedMethods.length < 3) {
      setSelectedMethods([...selectedMethods, key])
    }
  }

  const getMethodById = (countryId: string, methodId: string): CountryMigrationMethod | undefined => {
    const country = countries.find((c) => c.id === countryId)
    return country?.migrationMethods.find((m) => m.id === methodId)
  }

  const getCountryById = (countryId: string) => {
    return countries.find((c) => c.id === countryId)
  }

  return (
    <div className="w-full" dir="rtl">
      <Card>
        <CardHeader>
          <CardTitle>ویزارد پیشرفته انتخاب روش مهاجرتی</CardTitle>
          <CardDescription>با پاسخ به چند سوال ساده، بهترین روش مهاجرتی مناسب شرایط شما را پیدا کنید</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Progress value={(currentStep + 1) * 25} className="h-2" />
            <div className="flex justify-between mt-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    "text-xs flex flex-col items-center",
                    index <= currentStep ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center mb-1",
                      index < currentStep
                        ? "bg-primary text-primary-foreground"
                        : index === currentStep
                          ? "border-2 border-primary text-primary"
                          : "border border-muted-foreground text-muted-foreground",
                    )}
                  >
                    {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className="hidden md:block">{step.title}</span>
                </div>
              ))}
            </div>
          </div>

          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="age">سن</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="age"
                    min={18}
                    max={65}
                    step={1}
                    value={[userProfile.age]}
                    onValueChange={(value) => handleInputChange("age", value[0])}
                    className="flex-1"
                  />
                  <span className="w-12 text-center">{userProfile.age}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hasFamily">وضعیت تأهل</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Switch
                      id="hasFamily"
                      checked={userProfile.hasFamily}
                      onCheckedChange={(checked) => handleInputChange("hasFamily", checked)}
                    />
                    <Label htmlFor="hasFamily" className="cursor-pointer">
                      {userProfile.hasFamily ? "متأهل" : "مجرد"}
                    </Label>
                  </div>
                </div>

                <div>
                  <Label htmlFor="budget">بودجه تقریبی (دلار)</Label>
                  <Select
                    value={userProfile.budget.toString()}
                    onValueChange={(value) => handleInputChange("budget", Number.parseInt(value))}
                  >
                    <SelectTrigger id="budget">
                      <SelectValue placeholder="انتخاب بودجه" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10000">کمتر از 10,000 دلار</SelectItem>
                      <SelectItem value="20000">10,000 تا 30,000 دلار</SelectItem>
                      <SelectItem value="50000">30,000 تا 70,000 دلار</SelectItem>
                      <SelectItem value="100000">70,000 تا 150,000 دلار</SelectItem>
                      <SelectItem value="200000">بیش از 150,000 دلار</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="education">سطح تحصیلات</Label>
                <Select value={userProfile.education} onValueChange={(value) => handleInputChange("education", value)}>
                  <SelectTrigger id="education">
                    <SelectValue placeholder="انتخاب سطح تحصیلات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="highschool">دیپلم</SelectItem>
                    <SelectItem value="associate">فوق دیپلم</SelectItem>
                    <SelectItem value="bachelors">کارشناسی</SelectItem>
                    <SelectItem value="masters">کارشناسی ارشد</SelectItem>
                    <SelectItem value="phd">دکترا</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="workExperience">سابقه کاری (سال)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="workExperience"
                    min={0}
                    max={20}
                    step={1}
                    value={[userProfile.workExperience]}
                    onValueChange={(value) => handleInputChange("workExperience", value[0])}
                    className="flex-1"
                  />
                  <span className="w-12 text-center">{userProfile.workExperience}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">زبان خارجی اصلی</Label>
                  <Select value={userProfile.language} onValueChange={(value) => handleInputChange("language", value)}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="انتخاب زبان" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">انگلیسی</SelectItem>
                      <SelectItem value="french">فرانسوی</SelectItem>
                      <SelectItem value="german">آلمانی</SelectItem>
                      <SelectItem value="other">سایر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="languageScore">سطح زبان (معادل آیلتس)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="languageScore"
                      min={1}
                      max={9}
                      step={0.5}
                      value={[userProfile.languageScore]}
                      onValueChange={(value) => handleInputChange("languageScore", value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{userProfile.languageScore}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label>کشورهای مورد علاقه</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {countries.map((country) => (
                    <Badge
                      key={country.id}
                      variant={userProfile.preferredCountries.includes(country.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        const newPreferredCountries = userProfile.preferredCountries.includes(country.id)
                          ? userProfile.preferredCountries.filter((id) => id !== country.id)
                          : [...userProfile.preferredCountries, country.id]
                        handleInputChange("preferredCountries", newPreferredCountries)
                      }}
                    >
                      {country.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="timeframe">بازه زمانی مورد نظر برای مهاجرت</Label>
                <Select value={userProfile.timeframe} onValueChange={(value) => handleInputChange("timeframe", value)}>
                  <SelectTrigger id="timeframe">
                    <SelectValue placeholder="انتخاب بازه زمانی" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">کمتر از یک سال</SelectItem>
                    <SelectItem value="1-2">1 تا 2 سال</SelectItem>
                    <SelectItem value="2-3">2 تا 3 سال</SelectItem>
                    <SelectItem value="3+">بیش از 3 سال</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">بهترین روش‌های مهاجرتی برای شما</h3>
                <div className="space-y-4">
                  {results.slice(0, 5).map((result, index) => {
                    const country = getCountryById(result.countryId)
                    const method = getMethodById(result.countryId, result.methodId)
                    if (!country || !method) return null

                    return (
                      <div
                        key={`${result.countryId}-${result.methodId}`}
                        className="border rounded-lg p-4 flex items-start gap-4 cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => toggleMethodSelection(result.countryId, result.methodId)}
                      >
                        {index < 3 && (
                          <div
                            className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                              index === 0
                                ? "bg-yellow-500 text-white"
                                : index === 1
                                  ? "bg-gray-400 text-white"
                                  : "bg-amber-700 text-white",
                            )}
                          >
                            <Trophy className="w-4 h-4" />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">
                                {method.title} - {country.name}
                              </h4>
                            </div>
                            <Badge
                              variant={result.matchPercentage > 80 ? "default" : "outline"}
                              className={cn(
                                result.matchPercentage > 80
                                  ? "bg-green-500"
                                  : result.matchPercentage > 60
                                    ? "bg-yellow-500"
                                    : "bg-gray-500",
                                "text-white",
                              )}
                            >
                              {result.matchPercentage}% تطابق
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              زمان: {method.processDuration}
                            </span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              هزینه: {method.averageCost}
                            </span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                              نرخ موفقیت: {method.successRate}
                            </span>
                          </div>
                        </div>
                        <div className="shrink-0">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full border",
                              selectedMethods.includes(`${result.countryId}-${result.methodId}`)
                                ? "bg-primary border-primary"
                                : "border-gray-300",
                            )}
                          >
                            {selectedMethods.includes(`${result.countryId}-${result.methodId}`) && (
                              <Check className="w-4 h-4 text-white m-auto" />
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  دانلود نتایج
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  اشتراک‌گذاری
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
            <ChevronRight className="w-4 h-4 ml-2" />
            مرحله قبل
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>
              مرحله بعد
              <ChevronLeft className="w-4 h-4 mr-2" />
            </Button>
          ) : (
            <Button onClick={() => (window.location.href = "/booking")}>
              درخواست مشاوره
              <ChevronLeft className="w-4 h-4 mr-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
