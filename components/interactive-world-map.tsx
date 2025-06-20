"use client"

import type React from "react"
import { useState, useRef, useMemo } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { countries, type Country } from "@/lib/countries-migration-methods"
import Link from "next/link"
import { motion } from "framer-motion"
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps"
import {
  Search,
  MapPin,
  Users,
  DollarSign,
  Home,
  Plane,
  Landmark,
  Banknote,
  Calendar,
  Languages,
  Cloud,
  Info,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export function InteractiveWorldMap() {
  const [activeCountry, setActiveCountry] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, country: null as Country | null })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterContinent, setFilterContinent] = useState("all")
  const [filterMethod, setFilterMethod] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const mapRef = useRef<HTMLDivElement>(null)

  const handleCountryClick = (geo: any) => {
    const countryId = geo.properties.ISO_A3
    setActiveCountry(countryId === activeCountry ? null : countryId)
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

  const selectedCountry = useMemo(() => countries.find((c) => c.id === activeCountry) || null, [activeCountry])

  const filteredCountries = useMemo(() => {
    let filtered = countries.filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()))

    if (filterContinent !== "all") {
      filtered = filtered.filter((country) => country.continent === filterContinent)
    }

    if (filterMethod !== "all") {
      filtered = filtered.filter((country) => country.migrationMethods.some((method) => method.id === filterMethod))
    }

    return filtered
  }, [searchTerm, filterContinent, filterMethod])

  const allContinents = useMemo(() => {
    const continents = new Set(countries.map((c) => c.continent))
    return ["همه", ...Array.from(continents)]
  }, [])

  const allMigrationMethods = useMemo(() => {
    const methods = new Set<string>()
    countries.forEach((country) => {
      country.migrationMethods.forEach((method) => methods.add(method.id))
    })
    return ["همه", ...Array.from(methods)]
  }, [])

  const getMethodTitle = (methodId: string) => {
    for (const country of countries) {
      const method = country.migrationMethods.find((m) => m.id === methodId)
      if (method) return method.title
    }
    return methodId // Fallback
  }

  return (
    <div className="w-full" dir="rtl">
      <Card className="mb-8 shadow-lg rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6">
          <CardTitle className="text-3xl font-extrabold text-center">نقشه تعاملی کشورهای مهاجرپذیر</CardTitle>
          <p className="text-blue-100 text-center mt-2">
            به دنبال مقصدی جدید برای شروع فصلی نو در زندگی‌تان هستید؟ نقشه تعاملی کشورهای مهاجرپذیر مشاورین هلدینگ
            مهاجرتی دیاکو اینجاست تا راهنمای شما باشد!
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="جستجوی سریع کشور..."
                className="w-full pr-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="md:w-auto w-full flex items-center gap-2 text-gray-700 border-gray-300 hover:bg-gray-100"
              onClick={() => setShowFilters(!showFilters)}
            >
              فیلترها
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div>
                <Label htmlFor="continent-filter" className="mb-2 block text-gray-700">
                  فیلتر بر اساس قاره:
                </Label>
                <Select value={filterContinent} onValueChange={setFilterContinent}>
                  <SelectTrigger id="continent-filter" className="w-full">
                    <SelectValue placeholder="انتخاب قاره" />
                  </SelectTrigger>
                  <SelectContent>
                    {allContinents.map((continent) => (
                      <SelectItem key={continent} value={continent === "همه" ? "all" : continent}>
                        {continent}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="method-filter" className="mb-2 block text-gray-700">
                  فیلتر بر اساس روش مهاجرت:
                </Label>
                <Select value={filterMethod} onValueChange={setFilterMethod}>
                  <SelectTrigger id="method-filter" className="w-full">
                    <SelectValue placeholder="انتخاب روش" />
                  </SelectTrigger>
                  <SelectContent>
                    {allMigrationMethods.map((methodId) => (
                      <SelectItem key={methodId} value={methodId === "همه" ? "all" : methodId}>
                        {getMethodTitle(methodId)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 text-sm text-gray-500 mt-2">
                <Info className="inline-block w-4 h-4 ml-1" />
                <span>قابلیت‌های فیلتر پیشرفته (مانند زبان، آب و هوا، امکانات اجتماعی) در آینده اضافه خواهد شد.</span>
              </div>
            </motion.div>
          )}

          <div
            className="w-full h-[500px] rounded-lg p-4 relative overflow-hidden bg-gray-100 border border-gray-200"
            ref={mapRef}
          >
            <ComposableMap projectionConfig={{ scale: 150 }} className="w-full h-full">
              <ZoomableGroup center={[0, 0]} zoom={1}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const countryData = countries.find((c) => c.id === geo.properties.ISO_A3)
                      const isFiltered = filteredCountries.some((c) => c.id === geo.properties.ISO_A3)
                      const isActive = activeCountry === geo.properties.ISO_A3

                      return (
                        <motion.g
                          key={geo.rsmKey}
                          initial={{ opacity: 0.8 }}
                          animate={{
                            opacity: isFiltered ? 1 : 0.3,
                            fill: isActive ? "#3B82F6" : isFiltered ? "#60A5FA" : "#E5E7EB",
                            stroke: isActive ? "#1D4ED8" : "#FFFFFF",
                            strokeWidth: isActive ? 2 : 0.5,
                          }}
                          whileHover={{
                            scale: 1.02,
                            fill: isActive ? "#3B82F6" : "#2563EB",
                            opacity: 1,
                            cursor: "pointer",
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <Geography
                            geography={geo}
                            onClick={() => handleCountryClick(geo)}
                            onMouseEnter={(e) => handleCountryHover(e, countryData || null)}
                            onMouseLeave={handleCountryLeave}
                          />
                        </motion.g>
                      )
                    })
                  }
                </Geographies>
                {/* You can add markers for specific cities or points of interest if needed */}
              </ZoomableGroup>
            </ComposableMap>

            {/* Tooltip */}
            {tooltip.visible && tooltip.country && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bg-white p-4 rounded-lg shadow-xl z-10 w-64 border border-gray-200"
                style={{
                  left: `${tooltip.x + 10}px`,
                  top: `${tooltip.y + 10}px`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={
                      tooltip.country.flagUrl ||
                      `/placeholder.svg?height=30&width=30&query=flag of ${tooltip.country.name || "/placeholder.svg"}`
                    }
                    alt={`پرچم ${tooltip.country.name}`}
                    className="w-8 h-8 rounded-full object-cover border border-gray-200 shadow-sm"
                  />
                  <span className="font-bold text-lg text-gray-900">{tooltip.country.name}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {tooltip.country.description.substring(0, 100)}...
                </p>
                <div className="text-xs space-y-1">
                  <div className="flex items-center gap-1 text-gray-700">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span>پایتخت: {tooltip.country.capital}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-700">
                    <Users className="w-4 h-4 text-green-500" />
                    <span>جمعیت: {tooltip.country.population}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-700">
                    <DollarSign className="w-4 h-4 text-purple-500" />
                    <span>واحد پول: {tooltip.country.currency}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-700">
                    <Languages className="w-4 h-4 text-orange-500" />
                    <span>زبان: {tooltip.country.language}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-700">
                    <Plane className="w-4 h-4 text-red-500" />
                    <span>روش‌های مهاجرتی: {tooltip.country.migrationMethods.length}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <p className="text-sm text-muted-foreground text-center mt-4">
            برای مشاهده جزئیات هر کشور، روی آن کلیک کنید یا نشانگر ماوس را روی آن نگه دارید.
          </p>
        </CardContent>
      </Card>

      {selectedCountry && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-lg rounded-xl overflow-hidden border-2 border-blue-500">
            <CardHeader className="bg-blue-50 p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400 shadow-md">
                  <img
                    src={
                      selectedCountry.flagUrl ||
                      `/placeholder.svg?height=64&width=64&query=flag of ${selectedCountry.name || "/placeholder.svg"}`
                    }
                    alt={`پرچم ${selectedCountry.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-3xl font-bold text-blue-800">{selectedCountry.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-6 text-gray-700 leading-relaxed">{selectedCountry.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <Landmark className="w-5 h-5 text-blue-600" />
                  <span>
                    پایتخت: <span className="font-medium">{selectedCountry.capital}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-5 h-5 text-green-600" />
                  <span>
                    جمعیت: <span className="font-medium">{selectedCountry.population}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                  <span>
                    واحد پول: <span className="font-medium">{selectedCountry.currency}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Languages className="w-5 h-5 text-orange-600" />
                  <span>
                    زبان اصلی: <span className="font-medium">{selectedCountry.language}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Cloud className="w-5 h-5 text-sky-600" />
                  <span>
                    آب و هوا: <span className="font-medium">{selectedCountry.climate}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Home className="w-5 h-5 text-red-600" />
                  <span>
                    امکانات اجتماعی: <span className="font-medium">{selectedCountry.socialAmenities.join(", ")}</span>
                  </span>
                </div>
              </div>

              <h4 className="font-bold text-xl text-gray-900 mb-4 border-b pb-2">روش‌های مهاجرتی:</h4>
              <ScrollArea className="h-[300px] pr-4">
                <ul className="space-y-4">
                  {selectedCountry.migrationMethods.map((method) => (
                    <li key={method.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200 shadow-sm">
                      <h5 className="font-bold text-lg text-blue-800 mb-2">{method.title}</h5>
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">{method.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-3">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span>زمان پردازش: {method.processDuration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Banknote className="w-4 h-4 text-green-500" />
                          <span>هزینه تقریبی: {method.averageCost}</span>
                        </div>
                      </div>

                      {method.visaTypes && method.visaTypes.length > 0 && (
                        <div className="mb-2">
                          <span className="font-medium text-gray-800 text-sm">انواع ویزا: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {method.visaTypes.map((type, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {method.jobOpportunities && method.jobOpportunities.length > 0 && (
                        <div className="mb-2">
                          <span className="font-medium text-gray-800 text-sm">فرصت‌های شغلی: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {method.jobOpportunities.map((job, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs bg-green-100 text-green-700">
                                {job}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {method.educationSystem && (
                        <div className="mb-2">
                          <span className="font-medium text-gray-800 text-sm">سیستم آموزشی: </span>
                          <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                            {method.educationSystem}
                          </Badge>
                        </div>
                      )}
                      {method.costOfLiving && (
                        <div className="mb-2">
                          <span className="font-medium text-gray-800 text-sm">هزینه زندگی: </span>
                          <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                            {method.costOfLiving}
                          </Badge>
                        </div>
                      )}
                      {method.startupSupport && (
                        <div className="mb-2">
                          <span className="font-medium text-gray-800 text-sm">حمایت از استارت‌آپ: </span>
                          <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                            {method.startupSupport}
                          </Badge>
                        </div>
                      )}
                      {method.selfEmploymentOptions && (
                        <div className="mb-2">
                          <span className="font-medium text-gray-800 text-sm">گزینه‌های خوداشتغالی: </span>
                          <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">
                            {method.selfEmploymentOptions}
                          </Badge>
                        </div>
                      )}
                      {method.jobSearchVisa && (
                        <div className="mb-2">
                          <span className="font-medium text-gray-800 text-sm">ویزای جستجوی کار: </span>
                          <Badge variant="secondary" className="text-xs bg-cyan-100 text-cyan-700">
                            {method.jobSearchVisa}
                          </Badge>
                        </div>
                      )}
                      {method.marriageVisa && (
                        <div className="mb-2">
                          <span className="font-medium text-gray-800 text-sm">ویزای ازدواج: </span>
                          <Badge variant="secondary" className="text-xs bg-pink-100 text-pink-700">
                            {method.marriageVisa}
                          </Badge>
                        </div>
                      )}
                      {method.birthrightCitizenship && (
                        <div className="mb-2">
                          <span className="font-medium text-gray-800 text-sm">شهروندی از طریق تولد: </span>
                          <Badge variant="secondary" className="text-xs bg-lime-100 text-lime-700">
                            {method.birthrightCitizenship}
                          </Badge>
                        </div>
                      )}
                      {method.asylumProcess && (
                        <div className="mb-2">
                          <span className="font-medium text-gray-800 text-sm">فرآیند پناهندگی: </span>
                          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                            {method.asylumProcess}
                          </Badge>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
            <CardFooter className="p-6 bg-blue-50 border-t border-blue-200">
              <Link href={`/guide/countries/${selectedCountry.id}`} className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-lg shadow-md transition-all duration-300">
                  مشاهده جزئیات کامل
                  <ArrowRight className="w-5 h-5 mr-2" />
                </Button>
              </Link>
              <div className="mt-4 w-full text-center text-sm text-gray-600">
                <Info className="inline-block w-4 h-4 ml-1" />
                <span>قابلیت مقایسه کشورها در آینده اضافه خواهد شد.</span>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
