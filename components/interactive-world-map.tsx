"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { countries, type Country } from "@/lib/countries-migration-methods"
import Link from "next/link"

export function InteractiveWorldMap() {
  const [activeCountry, setActiveCountry] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, country: null as Country | null })
  const mapRef = useRef<HTMLDivElement>(null)

  const handleCountryClick = (countryId: string) => {
    setActiveCountry(countryId)
  }

  const handleCountryHover = (e: React.MouseEvent, country: Country | null) => {
    if (!mapRef.current || !country) return

    const rect = mapRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setTooltip({
      visible: true,
      x,
      y,
      country,
    })
  }

  const handleCountryLeave = () => {
    setTooltip({ ...tooltip, visible: false })
  }

  const selectedCountry = countries.find((c) => c.id === activeCountry) || null

  return (
    <div className="w-full" dir="rtl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">نقشه تعاملی کشورها</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[500px] rounded-lg p-4 relative overflow-hidden bg-gray-50" ref={mapRef}>
            <div className="relative w-full h-full">
              <img src="/placeholder.svg?key=qcxiq" alt="نقشه جهان" className="w-full h-full object-contain" />

              {/* These would be SVG paths for countries in a real implementation */}
              <div className="absolute inset-0">
                {countries.map((country) => (
                  <div
                    key={country.id}
                    className={`absolute map-country ${activeCountry === country.id ? "ring-2 ring-primary" : ""}`}
                    style={{
                      // These would be actual coordinates in a real implementation
                      left: `${Math.random() * 80 + 10}%`,
                      top: `${Math.random() * 80 + 10}%`,
                      width: "30px",
                      height: "30px",
                    }}
                    onClick={() => handleCountryClick(country.id)}
                    onMouseMove={(e) => handleCountryHover(e, country)}
                    onMouseLeave={handleCountryLeave}
                  >
                    <img
                      src={country.flagUrl || `/placeholder.svg?height=30&width=30&query=flag of ${country.name}`}
                      alt={`پرچم ${country.name}`}
                      className="w-full h-full rounded-full object-cover border"
                    />
                  </div>
                ))}
              </div>

              {/* Tooltip */}
              {tooltip.visible && tooltip.country && (
                <div
                  className="absolute bg-white p-3 rounded-lg shadow-lg z-10 w-48"
                  style={{
                    left: `${tooltip.x + 10}px`,
                    top: `${tooltip.y + 10}px`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={
                        tooltip.country.flagUrl ||
                        `/placeholder.svg?height=20&width=20&query=flag of ${tooltip.country.name || "/placeholder.svg"}`
                      }
                      alt={`پرچم ${tooltip.country.name}`}
                      className="w-5 h-5 rounded-full object-cover border"
                    />
                    <span className="font-bold">{tooltip.country.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {tooltip.country.description.substring(0, 80)}...
                  </p>
                  <div className="text-xs">روش‌های مهاجرتی: {tooltip.country.migrationMethods.length}</div>
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-4">
            برای مشاهده جزئیات هر کشور، روی آن کلیک کنید یا نشانگر ماوس را روی آن نگه دارید
          </p>
        </CardContent>
      </Card>

      {selectedCountry && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border">
                <img
                  src={
                    selectedCountry.flagUrl ||
                    `/placeholder.svg?height=48&width=48&query=flag of ${selectedCountry.name || "/placeholder.svg"}`
                  }
                  alt={`پرچم ${selectedCountry.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle>{selectedCountry.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{selectedCountry.description}</p>

            <h4 className="font-medium mb-2">روش‌های مهاجرتی:</h4>
            <ul className="space-y-2">
              {selectedCountry.migrationMethods.map((method) => (
                <li key={method.id} className="p-3 bg-muted rounded-lg">
                  <h5 className="font-medium">{method.title}</h5>
                  <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded">زمان: {method.processDuration}</span>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded">هزینه: {method.averageCost}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Link href={`/guide/countries/${selectedCountry.id}`} className="w-full">
              <Button className="w-full">مشاهده جزئیات کامل</Button>
            </Link>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
