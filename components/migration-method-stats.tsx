import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"

interface MigrationMethodStatsProps {
  successRate: number
  processingTime: string
  complexity: number
  averageCost: string
  className?: string
}

export function MigrationMethodStats({
  successRate,
  processingTime,
  complexity,
  averageCost,
  className = "",
}: MigrationMethodStatsProps) {
  // Convert complexity to a descriptive text
  const getComplexityText = (level: number) => {
    switch (level) {
      case 1:
        return "ساده"
      case 2:
        return "متوسط"
      case 3:
        return "پیچیده"
      case 4:
        return "بسیار پیچیده"
      default:
        return "نامشخص"
    }
  }

  // Get color based on success rate
  const getSuccessRateColor = (rate: number) => {
    if (rate >= 85) return "text-green-600"
    if (rate >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className={`grid grid-cols-2 gap-3 mt-4 ${className}`}>
      <div className="flex flex-col">
        <div className="text-sm text-gray-500 flex items-center gap-1">
          نرخ موفقیت
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-3.5 w-3.5 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">درصد تقریبی پذیرش درخواست‌ها در این روش مهاجرتی</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className={`font-bold text-lg ${getSuccessRateColor(successRate)}`}>{successRate}%</div>
      </div>

      <div className="flex flex-col">
        <div className="text-sm text-gray-500 flex items-center gap-1">
          زمان پردازش
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <InfoIcon className="h-3.5 w-3.5 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">میانگین زمان رسیدگی به درخواست</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="font-medium">{processingTime}</div>
      </div>

      <div className="flex flex-col">
        \
