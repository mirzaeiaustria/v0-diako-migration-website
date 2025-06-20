"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, TrendingDown, Users, Globe, Award, Clock } from "lucide-react"

// Sample data for migration statistics
const migrationMethodsData = [
  { method: "مهاجرت کاری", count: 2450, percentage: 35, trend: "up" },
  { method: "مهاجرت تحصیلی", count: 1890, percentage: 27, trend: "up" },
  { method: "سرمایه‌گذاری", count: 980, percentage: 14, trend: "stable" },
  { method: "خانوادگی", count: 875, percentage: 12.5, trend: "down" },
  { method: "آوسبیلدونگ", count: 560, percentage: 8, trend: "up" },
  { method: "سایر", count: 245, percentage: 3.5, trend: "stable" },
]

const countriesData = [
  { country: "آلمان", count: 1850, percentage: 26.4, color: "#8884d8" },
  { country: "کانادا", count: 1420, percentage: 20.3, color: "#82ca9d" },
  { country: "استرالیا", count: 980, percentage: 14, color: "#ffc658" },
  { country: "هلند", count: 750, percentage: 10.7, color: "#ff7300" },
  { country: "سوئد", count: 650, percentage: 9.3, color: "#00ff88" },
  { country: "اتریش", count: 520, percentage: 7.4, color: "#ff0088" },
  { country: "سایر", count: 830, percentage: 11.9, color: "#8dd1e1" },
]

const monthlyTrendsData = [
  { month: "فروردین", applications: 420, approvals: 380 },
  { month: "اردیبهشت", applications: 480, approvals: 420 },
  { month: "خرداد", applications: 520, approvals: 465 },
  { month: "تیر", applications: 580, approvals: 510 },
  { month: "مرداد", applications: 650, approvals: 580 },
  { month: "شهریور", applications: 720, approvals: 640 },
  { month: "مهر", applications: 680, approvals: 615 },
  { month: "آبان", applications: 750, approvals: 670 },
  { month: "آذر", applications: 820, approvals: 735 },
  { month: "دی", applications: 780, approvals: 700 },
  { month: "بهمن", applications: 850, approvals: 765 },
  { month: "اسفند", applications: 920, approvals: 825 },
]

const ageGroupsData = [
  { ageGroup: "18-25", count: 1250, percentage: 17.9 },
  { ageGroup: "26-30", count: 2100, percentage: 30 },
  { ageGroup: "31-35", count: 1890, percentage: 27 },
  { ageGroup: "36-40", count: 1050, percentage: 15 },
  { ageGroup: "41-45", count: 490, percentage: 7 },
  { ageGroup: "46+", count: 220, percentage: 3.1 },
]

const successRatesData = [
  { method: "آوسبیلدونگ", rate: 95, applications: 560, approvals: 532 },
  { method: "سرمایه‌گذاری", rate: 92, applications: 980, approvals: 901 },
  { method: "خانوادگی", rate: 88, applications: 875, approvals: 770 },
  { method: "تحصیلی", rate: 85, applications: 1890, approvals: 1607 },
  { method: "کاری", rate: 78, applications: 2450, approvals: 1911 },
]

export function MigrationStatistics() {
  const [activeTab, setActiveTab] = useState("overview")

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600"
      case "down":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="w-full space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نمای کلی</TabsTrigger>
          <TabsTrigger value="methods">روش‌های مهاجرت</TabsTrigger>
          <TabsTrigger value="countries">کشورها</TabsTrigger>
          <TabsTrigger value="trends">روندها</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">کل درخواست‌ها</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7,000</div>
                <p className="text-xs text-muted-foreground">+12% نسبت به ماه گذشته</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">نرخ موفقیت</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85.2%</div>
                <p className="text-xs text-muted-foreground">+2.1% نسبت به ماه گذشته</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">کشورهای فعال</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">کشورهای اروپایی</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">میانگین زمان</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.5</div>
                <p className="text-xs text-muted-foreground">ماه تا دریافت ویزا</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>توزیع سنی متقاضیان</CardTitle>
                <CardDescription>بر اساس گروه‌های سنی</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ageGroupsData.map((group) => (
                    <div key={group.ageGroup} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{group.ageGroup} سال</span>
                        <span>{group.percentage}%</span>
                      </div>
                      <Progress value={group.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>نرخ موفقیت روش‌ها</CardTitle>
                <CardDescription>درصد پذیرش برای هر روش مهاجرت</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {successRatesData.map((item) => (
                    <div key={item.method} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.method}</span>
                        <span className="font-medium">{item.rate}%</span>
                      </div>
                      <Progress value={item.rate} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        {item.approvals} از {item.applications} درخواست
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="methods" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>روش‌های مهاجرت محبوب</CardTitle>
                <CardDescription>توزیع درخواست‌ها بر اساس نوع مهاجرت</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={migrationMethodsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="method" angle={-45} textAnchor="end" height={80} fontSize={12} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>جزئیات روش‌های مهاجرت</CardTitle>
                <CardDescription>آمار تفصیلی و روند تغییرات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {migrationMethodsData.map((method) => (
                    <div key={method.method} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div>
                          <div className="font-medium">{method.method}</div>
                          <div className="text-sm text-muted-foreground">{method.count.toLocaleString()} درخواست</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Badge variant="outline" className={getTrendColor(method.trend)}>
                          {method.percentage}%
                        </Badge>
                        {getTrendIcon(method.trend)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="countries" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>کشورهای مقصد محبوب</CardTitle>
                <CardDescription>توزیع درخواست‌ها بر اساس کشور</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={countriesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {countriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>رتبه‌بندی کشورها</CardTitle>
                <CardDescription>بر اساس تعداد درخواست‌ها</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {countriesData.map((country, index) => (
                    <div key={country.country} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{country.country}</div>
                          <div className="text-sm text-muted-foreground">{country.count.toLocaleString()} درخواست</div>
                        </div>
                      </div>
                      <Badge variant="outline">{country.percentage}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>روند ماهانه درخواست‌ها</CardTitle>
              <CardDescription>مقایسه درخواست‌ها و تأییدیه‌ها در طول سال</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="درخواست‌ها"
                  />
                  <Area
                    type="monotone"
                    dataKey="approvals"
                    stackId="2"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    name="تأییدیه‌ها"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">رشد ماهانه</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">+12.5%</div>
                <p className="text-sm text-muted-foreground">نسبت به ماه گذشته</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">پیش‌بینی ماه آینده</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">950</div>
                <p className="text-sm text-muted-foreground">درخواست پیش‌بینی شده</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">بهترین ماه</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">اسفند</div>
                <p className="text-sm text-muted-foreground">920 درخواست</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
