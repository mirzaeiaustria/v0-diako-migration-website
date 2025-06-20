import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Clock, DollarSign, ChevronRight } from "lucide-react"
import { getAllCountries } from "@/lib/countries-data"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { GradientText } from "@/components/ui/gradient-text"

export const metadata = {
  title: "کشورهای مقصد مهاجرت - دیاکو",
  description: "راهنمای کامل کشورهای مقصد مهاجرت با جزئیات کامل شرایط زندگی، هزینه‌ها و روش‌های مهاجرتی",
}

export default function CountriesPage() {
  const countries = getAllCountries()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white" dir="rtl">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <ScrollReveal>
            <GradientText className="text-4xl md:text-6xl font-bold mb-6">کشورهای مقصد مهاجرت</GradientText>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              راهنمای جامع کشورهای مختلف برای مهاجرت با اطلاعات کامل و به‌روز
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country, index) => (
            <ScrollReveal key={country.slug} delay={index * 100}>
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={country.heroImage || "/placeholder.svg"}
                    alt={country.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{country.name}</h3>
                    <p className="text-white/90 text-sm line-clamp-2">{country.heroSubtitle}</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 ml-1" />
                        {country.capital}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 ml-1" />
                        {country.population}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-blue-600">
                        <Clock className="h-4 w-4 ml-1" />
                        {country.processingTime}
                      </div>
                      <div className="flex items-center text-green-600">
                        <DollarSign className="h-4 w-4 ml-1" />
                        {country.averageCost}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {country.migrationMethods.slice(0, 2).map((method, methodIndex) => (
                        <Badge key={methodIndex} variant="secondary" className="text-xs">
                          {method.split(" ")[0]}
                        </Badge>
                      ))}
                      {country.migrationMethods.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{country.migrationMethods.length - 2}
                        </Badge>
                      )}
                    </div>

                    <Link href={`/countries/${country.slug}`}>
                      <Button className="w-full group">
                        مشاهده جزئیات
                        <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}
