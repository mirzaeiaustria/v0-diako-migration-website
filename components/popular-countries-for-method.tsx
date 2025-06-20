import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Country {
  id: string
  name: string
  flagUrl: string
}

interface PopularCountriesForMethodProps {
  countries: Country[]
  className?: string
  maxDisplay?: number
}

export function PopularCountriesForMethod({
  countries,
  className = "",
  maxDisplay = 6,
}: PopularCountriesForMethodProps) {
  const displayedCountries = countries.slice(0, maxDisplay)
  const remainingCount = countries.length - maxDisplay

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="text-sm text-gray-500">کشورهای محبوب:</div>
      <div className="flex flex-wrap gap-2">
        {displayedCountries.map((country) => (
          <TooltipProvider key={country.id}>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="w-4 h-3 rounded-sm overflow-hidden">
                    <Image
                      src={country.flagUrl || "/placeholder.svg"}
                      alt={`پرچم ${country.name}`}
                      width={16}
                      height={12}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs">{country.name}</span>
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>مشاهده اطلاعات {country.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        {remainingCount > 0 && (
          <Badge variant="outline" className="bg-gray-50 text-xs">
            +{remainingCount} کشور دیگر
          </Badge>
        )}
      </div>
    </div>
  )
}
