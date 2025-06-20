"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useConnectionQuality } from "@/hooks/use-connection-quality"

interface Country {
  id: string
  name: string
  flagUrl: string
  position: { x: number; y: number }
  migrationMethods: string[]
}

interface MigrationMethod {
  id: string
  title: string
  description: string
  color: string
}

const migrationMethods: MigrationMethod[] = [
  {
    id: "skilled-worker",
    title: "مهاجرت کاری",
    description: "مهاجرت از طریق مهارت‌های حرفه‌ای و تخصصی",
    color: "#4CAF50",
  },
  {
    id: "investment",
    title: "مهاجرت سرمایه‌گذاری",
    description: "مهاجرت از طریق سرمایه‌گذاری در کسب و کار یا املاک",
    color: "#FFC107",
  },
  {
    id: "study",
    title: "مهاجرت تحصیلی",
    description: "مهاجرت از طریق پذیرش در مؤسسات آموزشی",
    color: "#2196F3",
  },
  {
    id: "family",
    title: "مهاجرت خانوادگی",
    description: "مهاجرت از طریق اسپانسرشیپ اعضای خانواده",
    color: "#9C27B0",
  },
  {
    id: "humanitarian",
    title: "مهاجرت بشردوستانه",
    description: "مهاجرت از طریق برنامه‌های پناهندگی و حمایت بشردوستانه",
    color: "#F44336",
  },
]

const countries: Country[] = [
  {
    id: "canada",
    name: "کانادا",
    flagUrl: "/flags/canada.png",
    position: { x: 18, y: 23 },
    migrationMethods: ["skilled-worker", "investment", "study", "family", "humanitarian"],
  },
  {
    id: "usa",
    name: "آمریکا",
    flagUrl: "/flags/usa.png",
    position: { x: 20, y: 30 },
    migrationMethods: ["skilled-worker", "investment", "study", "family", "humanitarian"],
  },
  {
    id: "uk",
    name: "انگلستان",
    flagUrl: "/flags/uk.png",
    position: { x: 47, y: 25 },
    migrationMethods: ["skilled-worker", "investment", "study", "family"],
  },
  {
    id: "germany",
    name: "آلمان",
    flagUrl: "/flags/germany.png",
    position: { x: 50, y: 27 },
    migrationMethods: ["skilled-worker", "study", "family", "humanitarian"],
  },
  {
    id: "australia",
    name: "استرالیا",
    flagUrl: "/flags/australia.png",
    position: { x: 80, y: 65 },
    migrationMethods: ["skilled-worker", "investment", "study", "family"],
  },
  {
    id: "france",
    name: "فرانسه",
    flagUrl: "/flags/france.png",
    position: { x: 48, y: 29 },
    migrationMethods: ["skilled-worker", "investment", "study", "family"],
  },
]

export function MigrationMethodsInteractiveMap() {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { isLowQuality } = useConnectionQuality()

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const filteredCountries = selectedMethod
    ? countries.filter((country) => country.migrationMethods.includes(selectedMethod))
    : countries

  const getMethodInfo = (methodId: string) => {
    return migrationMethods.find((method) => method.id === methodId)
  }

  return (
    <Card className="border shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">نقشه تعاملی روش‌های مهاجرتی</CardTitle>
        <CardDescription>
          روش مهاجرتی مورد نظر خود را انتخاب کنید تا کشورهای مرتبط را روی نقشه مشاهده کنید
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={selectedMethod === null ? "default" : "outline"}
              onClick={() => setSelectedMethod(null)}
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              همه روش‌ها
            </Button>
            {migrationMethods.map((method) => (
              <Button
                key={method.id}
                variant={selectedMethod === method.id ? "default" : "outline"}
                onClick={() => setSelectedMethod(method.id)}
                className="flex items-center gap-1"
                style={{
                  backgroundColor: selectedMethod === method.id ? method.color : "transparent",
                  color: selectedMethod === method.id ? "white" : "inherit",
                  borderColor: method.color,
                }}
              >
                {method.title}
              </Button>
            ))}
          </div>

          <div className="relative w-full h-[60vh] border rounded-lg overflow-hidden bg-slate-50">
            <Image
              src="/placeholder.svg?height=400&width=800&text=World+Map"
              alt="نقشه جهان"
              fill
              className="object-cover opacity-90"
              quality={isLowQuality ? 60 : 90}
              priority
            />

            <TooltipProvider>
              {filteredCountries.map((country) => (
                <Tooltip key={country.id}>
                  <TooltipTrigger asChild>
                    <button
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                        hoveredCountry === country.id ? "scale-125 z-10" : "scale-100 z-0"
                      }`}
                      style={{
                        left: `${country.position.x}%`,
                        top: `${country.position.y}%`,
                      }}
                      onMouseEnter={() => setHoveredCountry(country.id)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => (window.location.href = `/guide/countries/${country.id}`)}
                    >
                      <div className="relative">
                        <div
                          className="w-6 h-6 rounded-full overflow-hidden border-2 shadow-md"
                          style={{
                            borderColor:
                              selectedMethod && country.migrationMethods.includes(selectedMethod)
                                ? getMethodInfo(selectedMethod)?.color || "#333"
                                : "#333",
                          }}
                        >
                          <Image
                            src={country.flagUrl || "/placeholder.svg"}
                            alt={country.name}
                            width={24}
                            height={24}
                            className="object-cover"
                          />
                        </div>
                        {hoveredCountry === country.id && (
                          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full bg-white px-2 py-1 rounded shadow-md text-xs whitespace-nowrap z-20">
                            {country.name}
                          </div>
                        )}
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side={isMobile ? "bottom" : "right"}>
                    <div className="p-1">
                      <div className="font-bold mb-1">{country.name}</div>
                      <div className="text-xs mb-2">روش‌های مهاجرتی:</div>
                      <div className="flex flex-wrap gap-1">
                        {country.migrationMethods.map((methodId) => {
                          const method = getMethodInfo(methodId)
                          return (
                            method && (
                              <Badge
                                key={methodId}
                                style={{
                                  backgroundColor: method.color,
                                  color: "white",
                                }}
                              >
                                {method.title}
                              </Badge>
                            )
                          )
                        })}
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            <div className="text-sm text-gray-500 ml-2">راهنمای رنگ‌ها:</div>
            {migrationMethods.map((method) => (
              <div key={method.id} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: method.color }}></div>
                <span className="text-xs">{method.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/guide/countries">
            <Button variant="outline">مشاهده اطلاعات تفصیلی کشورها</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
