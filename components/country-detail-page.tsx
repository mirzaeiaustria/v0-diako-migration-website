"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Users,
  GraduationCap,
  Landmark,
  DollarSign,
  Phone,
  Calendar,
  Clock,
  TrendingUp,
  Home,
  Briefcase,
  BookOpen,
  Heart,
  Shield,
  Globe,
  ChevronRight,
  Star,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ParallaxSection } from "@/components/ui/parallax-section"
import { InteractiveCard } from "@/components/ui/interactive-card"
import { GradientText } from "@/components/ui/gradient-text"
import { FloatingParticles } from "@/components/ui/floating-particles"
import type { Country } from "@/lib/countries-data"

interface CountryDetailPageProps {
  country: Country
}

export default function CountryDetailPage({ country }: CountryDetailPageProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const breadcrumbs = [
    { name: "صفحه اصلی", href: "/" },
    { name: "کشورها", href: "/countries" },
    { name: country.name, href: `/countries/${country.slug}` },
  ]

  const quickFacts = [
    { label: "پایتخت", value: country.capital, icon: Landmark },
    { label: "جمعیت", value: country.population, icon: Users },
    { label: "واحد پول", value: country.currency, icon: DollarSign },
    { label: "زبان رسمی", value: country.language, icon: GraduationCap },
  ]

  const migrationStats = [
    { label: "نرخ موفقیت ویزا", value: "85%", icon: TrendingUp, color: "text-green-600" },
    { label: "متوسط زمان پردازش", value: country.processingTime, icon: Clock, color: "text-blue-600" },
    { label: "هزینه متوسط", value: country.averageCost, icon: DollarSign, color: "text-purple-600" },
    { label: "رضایت مهاجران", value: "92%", icon: Star, color: "text-yellow-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white" dir="rtl">
      <FloatingParticles />

      {/* Hero Section */}
      <ParallaxSection className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={country.heroImage || "/placeholder.svg"}
            alt={country.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <GradientText className="text-5xl md:text-7xl font-bold mb-4">{country.name}</GradientText>
              <p className="text-xl md:text-2xl font-medium mb-8 opacity-90">{country.heroSubtitle}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Calendar className="ml-2 h-5 w-5" />
                  رزرو مشاوره رایگان
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                >
                  <Phone className="ml-2 h-5 w-5" />
                  تماس فوری
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ParallaxSection>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse text-sm">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="inline-flex items-center">
                {index > 0 && <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />}
                <Link
                  href={crumb.href}
                  className={`hover:text-primary transition-colors ${
                    index === breadcrumbs.length - 1 ? "font-semibold text-primary" : "text-gray-600"
                  }`}
                >
                  {crumb.name}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Migration Stats */}
            <ScrollReveal>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {migrationStats.map((stat, index) => (
                  <InteractiveCard key={index} className="text-center p-6">
                    <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </InteractiveCard>
                ))}
              </div>
            </ScrollReveal>

            {/* Content Tabs */}
            <ScrollReveal>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">راهنمای جامع مهاجرت به {country.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                      <TabsTrigger value="overview" className="text-xs md:text-sm">
                        <Globe className="h-4 w-4 ml-1" />
                        کلی
                      </TabsTrigger>
                      <TabsTrigger value="living" className="text-xs md:text-sm">
                        <Home className="h-4 w-4 ml-1" />
                        زندگی
                      </TabsTrigger>
                      <TabsTrigger value="costs" className="text-xs md:text-sm">
                        <DollarSign className="h-4 w-4 ml-1" />
                        هزینه‌ها
                      </TabsTrigger>
                      <TabsTrigger value="education" className="text-xs md:text-sm">
                        <BookOpen className="h-4 w-4 ml-1" />
                        آموزش
                      </TabsTrigger>
                      <TabsTrigger value="work" className="text-xs md:text-sm">
                        <Briefcase className="h-4 w-4 ml-1" />
                        کار
                      </TabsTrigger>
                      <TabsTrigger value="migration" className="text-xs md:text-sm">
                        <Shield className="h-4 w-4 ml-1" />
                        مهاجرت
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <Info className="ml-2 h-5 w-5 text-blue-600" />
                          معرفی کلی
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{country.overview}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-green-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                            <CheckCircle className="ml-2 h-5 w-5" />
                            مزایای کلیدی
                          </h4>
                          <ul className="space-y-2 text-sm text-green-700">
                            {country.advantages?.map((advantage, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="ml-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                                {advantage}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-amber-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-amber-800 mb-3 flex items-center">
                            <AlertCircle className="ml-2 h-5 w-5" />
                            نکات مهم
                          </h4>
                          <ul className="space-y-2 text-sm text-amber-700">
                            {country.considerations?.map((consideration, index) => (
                              <li key={index} className="flex items-start">
                                <AlertCircle className="ml-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                                {consideration}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="living" className="mt-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <Home className="ml-2 h-5 w-5 text-blue-600" />
                          شرایط زندگی
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-6">{country.livingConditions}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-blue-50 p-4 rounded-lg text-center">
                            <Heart className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                            <div className="font-semibold text-blue-800">کیفیت زندگی</div>
                            <div className="text-sm text-blue-600 mt-1">بالا</div>
                          </div>
                          <div className="bg-green-50 p-4 rounded-lg text-center">
                            <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                            <div className="font-semibold text-green-800">امنیت</div>
                            <div className="text-sm text-green-600 mt-1">عالی</div>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg text-center">
                            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                            <div className="font-semibold text-purple-800">جامعه</div>
                            <div className="text-sm text-purple-600 mt-1">چندفرهنگی</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="costs" className="mt-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <DollarSign className="ml-2 h-5 w-5 text-green-600" />
                          هزینه‌های زندگی
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-6">{country.costs}</p>

                        {country.costBreakdown && (
                          <div className="bg-gray-50 p-6 rounded-lg">
                            <h4 className="font-semibold mb-4">تفکیک هزینه‌ها (ماهانه)</h4>
                            <div className="space-y-3">
                              {Object.entries(country.costBreakdown).map(([category, amount]) => (
                                <div key={category} className="flex justify-between items-center">
                                  <span className="text-gray-700">{category}</span>
                                  <span className="font-semibold text-green-600">{amount}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="education" className="mt-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <BookOpen className="ml-2 h-5 w-5 text-blue-600" />
                          سیستم آموزشی
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{country.educationSystem}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="work" className="mt-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center">
                          <Briefcase className="ml-2 h-5 w-5 text-purple-600" />
                          بازار کار
                        </h3>
                        <p className="text-gray-700 leading-relaxed">{country.jobMarket}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="migration" className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <Shield className="ml-2 h-5 w-5 text-red-600" />
                            روش‌های مهاجرتی
                          </h3>
                          <div className="grid gap-4">
                            {country.migrationMethods.map((method, index) => (
                              <div
                                key={index}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">{method}</span>
                                  <Badge variant="outline">فعال</Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="text-xl font-semibold mb-4">قوانین اقامت و تابعیت</h3>
                          <p className="text-gray-700 leading-relaxed">{country.residencyLaws}</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Facts */}
            <ScrollReveal>
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <CardTitle className="flex items-center text-blue-700">
                    <MapPin className="ml-2 h-5 w-5" />
                    اطلاعات سریع
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {quickFacts.map((fact, index) => (
                      <div key={index} className="flex items-center">
                        <fact.icon className="h-5 w-5 text-blue-500 ml-3 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-gray-700">{fact.label}: </span>
                          <span className="text-gray-600">{fact.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Consultation CTA */}
            <ScrollReveal>
              <Card className="shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-yellow-700">نیاز به مشاوره دارید؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    برای دریافت مشاوره تخصصی مهاجرت به {country.name} با مشاورین هلدینگ مهاجرتی دیاکو تماس بگیرید.
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                      <Calendar className="ml-2 h-4 w-4" />
                      درخواست مشاوره
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Phone className="ml-2 h-4 w-4" />
                      ۰۲۱-۸۸۰۷-۳۲۸۷
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* Related Countries */}
            <ScrollReveal>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>کشورهای مرتبط</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {country.relatedCountries?.map((relatedCountry, index) => (
                      <Link
                        key={index}
                        href={`/countries/${relatedCountry.slug}`}
                        className="block p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{relatedCountry.name}</span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  )
}
