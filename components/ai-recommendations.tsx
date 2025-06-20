"use client"

import { ArrowRight, Brain, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Recommendation {
  country: string
  matchPercentage: number
  processingTime: string
  costOfLiving: number
  jobMarket: string
  visaSuccess: number
  recommendationReason: string
}

interface AIRecommendationsProps {
  recommendations: Recommendation[]
  onViewDetails: (country: string) => void
}

export function AIRecommendations({ recommendations, onViewDetails }: AIRecommendationsProps) {
  const getCountryFlag = (country: string) => {
    const flags: Record<string, string> = {
      Canada: "🇨🇦",
      Germany: "🇩🇪",
      Australia: "🇦🇺",
      "United Kingdom": "🇬🇧",
      Netherlands: "🇳🇱",
    }
    return flags[country] || "🌍"
  }

  if (recommendations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-primary" />
            تولید توصیه‌های هوشمند
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-600">فرم ترجیحات بالا را تکمیل کنید تا توصیه‌های شخصی‌سازی شده دریافت کنید.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-primary" />
            توصیه‌های هوشمند AI
          </div>
          <Badge className="bg-green-500 text-white">
            <Check className="mr-1 h-3 w-3" />
            تولید شده
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={rec.country}
              className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="text-3xl">{getCountryFlag(rec.country)}</div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{rec.country}</h3>
                    <p className="text-sm text-neutral-600 mb-2">{rec.recommendationReason}</p>
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <Badge className="bg-blue-500 text-white text-xs">{rec.matchPercentage}% تطابق</Badge>
                      <span className="text-xs text-neutral-500">پردازش: {rec.processingTime}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => onViewDetails(rec.country)}>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-neutral-100">
                <div className="text-center">
                  <div className="text-lg font-semibold text-neutral-900">${rec.costOfLiving.toLocaleString()}</div>
                  <div className="text-xs text-neutral-500">هزینه ماهانه</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-neutral-900">{rec.jobMarket}</div>
                  <div className="text-xs text-neutral-500">بازار کار</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-neutral-900">{rec.visaSuccess}%</div>
                  <div className="text-xs text-neutral-500">موفقیت ویزا</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
