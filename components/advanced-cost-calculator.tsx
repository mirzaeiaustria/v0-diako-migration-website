"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calculator, Download, Share2 } from "lucide-react"

interface CountryCostData {
  country: string
  visaFee: number
  initialSettlement: number
  monthlyRent: number
  monthlyFood: number
  monthlyTransportation: number
  miscMonthly: number
  currency: string
}

const costData: CountryCostData[] = [
  {
    country: "آلمان",
    visaFee: 200,
    initialSettlement: 1800,
    monthlyRent: 850,
    monthlyFood: 350,
    monthlyTransportation: 90,
    miscMonthly: 250,
    currency: "EUR",
  },
  {
    country: "اتریش",
    visaFee: 250,
    initialSettlement: 2000,
    monthlyRent: 900,
    monthlyFood: 380,
    monthlyTransportation: 95,
    miscMonthly: 280,
    currency: "EUR",
  },
  {
    country: "آمریکا",
    visaFee: 1500,
    initialSettlement: 4000,
    monthlyRent: 2000,
    monthlyFood: 600,
    monthlyTransportation: 150,
    miscMonthly: 500,
    currency: "USD",
  },
  {
    country: "کانادا",
    visaFee: 1500,
    initialSettlement: 3500,
    monthlyRent: 1900,
    monthlyFood: 450,
    monthlyTransportation: 110,
    miscMonthly: 350,
    currency: "CAD",
  },
  {
    country: "استرالیا",
    visaFee: 4000,
    initialSettlement: 4000,
    monthlyRent: 2200,
    monthlyFood: 550,
    monthlyTransportation: 130,
    miscMonthly: 450,
    currency: "AUD",
  },
  {
    country: "فرانسه",
    visaFee: 220,
    initialSettlement: 2000,
    monthlyRent: 950,
    monthlyFood: 380,
    monthlyTransportation: 90,
    miscMonthly: 270,
    currency: "EUR",
  },
  {
    country: "پرتغال",
    visaFee: 200,
    initialSettlement: 1200,
    monthlyRent: 650,
    monthlyFood: 280,
    monthlyTransportation: 70,
    miscMonthly: 180,
    currency: "EUR",
  },
  {
    country: "اسپانیا",
    visaFee: 200,
    initialSettlement: 1500,
    monthlyRent: 750,
    monthlyFood: 320,
    monthlyTransportation: 75,
    miscMonthly: 220,
    currency: "EUR",
  },
  {
    country: "انگلیس",
    visaFee: 1000,
    initialSettlement: 3000,
    monthlyRent: 1500,
    monthlyFood: 400,
    monthlyTransportation: 120,
    miscMonthly: 300,
    currency: "GBP",
  },
  {
    country: "ترکیه",
    visaFee: 100,
    initialSettlement: 800,
    monthlyRent: 450,
    monthlyFood: 200,
    monthlyTransportation: 50,
    miscMonthly: 150,
    currency: "TRY",
  },
]

export function AdvancedCostCalculator() {
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [stayDuration, setStayDuration] = useState<number>(12)
  const [numApplicants, setNumApplicants] = useState<number>(1)
  const [calculatedCost, setCalculatedCost] = useState<{ total: number; breakdown: any; currency: string } | null>(null)

  useEffect(() => {
    if (selectedCountry) {
      calculateCosts()
    } else {
      setCalculatedCost(null)
    }
  }, [selectedCountry, stayDuration, numApplicants])

  const calculateCosts = () => {
    const countryData = costData.find((data) => data.country === selectedCountry)
    if (!countryData) {
      setCalculatedCost(null)
      return
    }

    const totalVisaFee = countryData.visaFee * numApplicants
    const totalInitialSettlement = countryData.initialSettlement * numApplicants
    const totalMonthlyLivingCost =
      (countryData.monthlyRent +
        countryData.monthlyFood +
        countryData.monthlyTransportation +
        countryData.miscMonthly) *
      numApplicants

    const totalCost = totalVisaFee + totalInitialSettlement + totalMonthlyLivingCost * stayDuration

    setCalculatedCost({
      total: totalCost,
      breakdown: {
        visaFee: totalVisaFee,
        initialSettlement: totalInitialSettlement,
        monthlyLivingCost: totalMonthlyLivingCost,
        totalLivingCost: totalMonthlyLivingCost * stayDuration,
      },
      currency: countryData.currency,
    })
  }

  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat("fa-IR", { style: "currency", currency: currency }).format(value)
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
            <Calculator className="h-8 w-8" />
            محاسبه‌گر پیشرفته هزینه‌های مهاجرت
          </h2>
          <p className="text-gray-600 dark:text-gray-300">هزینه‌های دقیق مهاجرت خود را برای کشور مورد نظر محاسبه کنید</p>
        </div>

        <motion.div
          className="max-w-4xl mx-auto bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <Label
                htmlFor="country-select"
                className="block text-gray-700 dark:text-gray-200 text-lg font-medium mb-2"
              >
                کشور مقصد:
              </Label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="کشور را انتخاب کنید..." />
                </SelectTrigger>
                <SelectContent>
                  {costData.map((data) => (
                    <SelectItem key={data.country} value={data.country}>
                      {data.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="duration" className="block text-gray-700 dark:text-gray-200 text-lg font-medium mb-2">
                مدت زمان اقامت (ماه):
              </Label>
              <Input
                type="number"
                id="duration"
                value={stayDuration}
                onChange={(e) => setStayDuration(Number.parseInt(e.target.value) || 1)}
                min="1"
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="applicants" className="block text-gray-700 dark:text-gray-200 text-lg font-medium mb-2">
                تعداد متقاضیان:
              </Label>
              <Input
                type="number"
                id="applicants"
                value={numApplicants}
                onChange={(e) => setNumApplicants(Number.parseInt(e.target.value) || 1)}
                min="1"
                className="w-full"
              />
            </div>
          </div>

          {calculatedCost && (
            <motion.div
              className="mt-8 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6 shadow-md"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-4 text-center">
                برآورد هزینه‌های مهاجرت
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="font-semibold">هزینه ویزا و دولتی:</span>
                    <Badge variant="outline" className="text-lg">
                      {formatCurrency(calculatedCost.breakdown.visaFee, calculatedCost.currency)}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="font-semibold">هزینه‌های اولیه:</span>
                    <Badge variant="outline" className="text-lg">
                      {formatCurrency(calculatedCost.breakdown.initialSettlement, calculatedCost.currency)}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="font-semibold">هزینه زندگی ماهانه:</span>
                    <Badge variant="outline" className="text-lg">
                      {formatCurrency(calculatedCost.breakdown.monthlyLivingCost, calculatedCost.currency)}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <span className="font-semibold">کل هزینه زندگی ({stayDuration} ماه):</span>
                    <Badge variant="outline" className="text-lg">
                      {formatCurrency(calculatedCost.breakdown.totalLivingCost, calculatedCost.currency)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="border-t border-blue-300 dark:border-blue-600 pt-6 text-center">
                <p className="text-3xl font-extrabold text-blue-800 dark:text-blue-200 mb-4">مجموع کل هزینه‌ها:</p>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-300 mb-4">
                  {formatCurrency(calculatedCost.total, calculatedCost.currency)}
                </div>

                <div className="flex justify-center gap-4 mt-6">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    دانلود گزارش
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    اشتراک‌گذاری
                  </Button>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  * این ارقام تقریبی هستند و ممکن است بسته به سبک زندگی، شهر مقصد و نوسانات نرخ ارز تغییر کنند.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
