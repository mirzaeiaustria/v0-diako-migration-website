"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, X } from "lucide-react"
import Link from "next/link"

interface Country {
  id: string
  name: string
  description: string
  flagUrl?: string
  migrationMethods: Array<{
    id: string
    title: string
    description: string
    processDuration: string
    averageCost: string
  }>
}

interface MobileCountryInfoProps {
  country: Country | null
  onClose: () => void
  isOpen: boolean
}

export function MobileCountryInfo({ country, onClose, isOpen }: MobileCountryInfoProps) {
  if (!country) return null

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-xl pt-6">
        <SheetHeader className="text-right">
          <div className="absolute top-3 left-3">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border">
              <img
                src={country.flagUrl || `/placeholder.svg?height=48&width=48`}
                alt={`پرچم ${country.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <SheetTitle className="text-xl">{country.name}</SheetTitle>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6 overflow-auto pb-8">
          <p className="text-muted-foreground">{country.description}</p>

          <div>
            <h3 className="text-lg font-medium mb-3">روش‌های مهاجرتی</h3>
            <div className="space-y-3">
              {country.migrationMethods.map((method) => (
                <div key={method.id} className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium flex items-center">
                    <ChevronRight className="h-4 w-4 text-primary ml-1" />
                    {method.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 mb-2">{method.description}</p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">
                      زمان: {method.processDuration}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      هزینه: {method.averageCost}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Link href={`/guide/countries/${country.id}`}>
              <Button className="w-full">مشاهده جزئیات کامل</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
