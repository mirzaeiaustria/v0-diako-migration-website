"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown, ChevronUp, MapPin } from "lucide-react"

interface Country {
  id: string
  name: string
  flagUrl?: string
  popularityRank: number
}

interface MigrationMethodCountriesProps {
  methodTitle: string
  countries: Country[]
  maxInitialDisplay?: number
  className?: string
}

export function MigrationMethodCountries({
  methodTitle,
  countries,
  maxInitialDisplay = 5,
  className = "",
}: MigrationMethodCountriesProps) {
  const [expanded, setExpanded] = useState(false)

  // مرتب‌سازی کشورها بر اساس رتبه محبوبیت
  const sortedCountries = [...countries].sort((a, b) => a.popularityRank - b.popularityRank)

  // تعیین کشورهای قابل نمایش بر اساس وضعیت گسترش
  const displayedCountries = expanded ? sortedCountries : sortedCountries.slice(0, maxInitialDisplay)

  // آیا دکمه "نمایش بیشتر" نمایش داده شود؟
  const showMoreButton = sortedCountries.length > maxInitialDisplay

  return (
    <Card className={`border-primary/20 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          کشورهای محبوب برای {methodTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {displayedCountries.map((country, index) => (
            <Link key={country.id} href={`/guide/countries/${country.id}`} className="block">
              <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors">
                <div className="flex-shrink-0">
                  <img
                    src={country.flagUrl || `/placeholder.svg?height=24&width=24&query=flag of ${country.name}`}
                    alt={`پرچم ${country.name}`}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{country.name}</div>
                  <div className="text-xs text-muted-foreground">رتبه محبوبیت: {country.popularityRank}</div>
                </div>
                <div className="ml-auto text-lg font-bold text-primary">#{index + 1}</div>
              </div>
            </Link>
          ))}
        </div>

        {showMoreButton && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground hover:text-primary"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <span className="flex items-center gap-1">
                <ChevronUp className="w-4 h-4" />
                نمایش کمتر
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <ChevronDown className="w-4 h-4" />
                نمایش {sortedCountries.length - maxInitialDisplay} کشور دیگر
              </span>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
