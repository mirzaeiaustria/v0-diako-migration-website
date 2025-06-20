"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, CheckCircle, AlertCircle, Plus, Download } from "lucide-react"

interface TimelineStep {
  id: string
  title: string
  description: string
  duration: string
  status: "completed" | "current" | "upcoming"
  deadline: string
  tasks: string[]
}

const migrationTimeline: TimelineStep[] = [
  {
    id: "1",
    title: "ارزیابی اولیه و برنامه‌ریزی",
    description: "تعیین روش مهاجرت و برنامه‌ریزی کلی",
    duration: "2-4 هفته",
    status: "completed",
    deadline: "1403/07/15",
    tasks: ["مشاوره اولیه", "انتخاب کشور", "تعیین روش مهاجرت", "برنامه‌ریزی زمانی"],
  },
  {
    id: "2",
    title: "آماده‌سازی مدارک",
    description: "جمع‌آوری و تهیه مدارک مورد نیاز",
    duration: "4-8 هفته",
    status: "current",
    deadline: "1403/09/15",
    tasks: ["ترجمه مدارک", "تأیید مدارک", "عکس‌برداری", "تکمیل فرم‌ها"],
  },
  {
    id: "3",
    title: "آزمون زبان",
    description: "شرکت در آزمون زبان و کسب نمره مطلوب",
    duration: "2-6 هفته",
    status: "upcoming",
    deadline: "1403/10/30",
    tasks: ["ثبت‌نام آزمون", "آمادگی و تمرین", "شرکت در آزمون", "دریافت نتیجه"],
  },
  {
    id: "4",
    title: "ارزیابی مدارک تحصیلی",
    description: "ارسال مدارک برای ارزیابی",
    duration: "6-12 هفته",
    status: "upcoming",
    deadline: "1403/12/15",
    tasks: ["انتخاب مرجع ارزیابی", "ارسال مدارک", "پیگیری", "دریافت گزارش"],
  },
  {
    id: "5",
    title: "ثبت درخواست",
    description: "ثبت رسمی درخواست مهاجرت",
    duration: "1-2 هفته",
    status: "upcoming",
    deadline: "1404/01/15",
    tasks: ["تکمیل فرم آنلاین", "پرداخت هزینه", "ارسال مدارک", "دریافت تأیید"],
  },
  {
    id: "6",
    title: "بررسی و تصمیم‌گیری",
    description: "بررسی درخواست توسط مقامات",
    duration: "6-18 ماه",
    status: "upcoming",
    deadline: "1404/07/15",
    tasks: ["انتظار بررسی", "پاسخ به درخواست‌های اضافی", "مصاحبه (در صورت نیاز)", "دریافت تصمیم"],
  },
]

export function TimePlanner() {
  const [selectedStep, setSelectedStep] = useState<string | null>(null)
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "current":
        return "bg-blue-500"
      case "upcoming":
        return "bg-gray-300"
      default:
        return "bg-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "current":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "upcoming":
        return <AlertCircle className="w-5 h-5 text-gray-400" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const overallProgress =
    (migrationTimeline.filter((step) => step.status === "completed").length / migrationTimeline.length) * 100

  return (
    <div className="space-y-6">
      <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-600" />
            برنامه‌ریز زمانی مهاجرت
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">پیشرفت کلی</span>
              <span className="text-sm text-gray-600">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>

          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="timeline">تایم‌لاین</TabsTrigger>
              <TabsTrigger value="calendar">تقویم</TabsTrigger>
              <TabsTrigger value="reminders">یادآوری‌ها</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">مراحل مهاجرت</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    دانلود برنامه
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    افزودن مرحله
                  </Button>
                </div>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                {migrationTimeline.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative mb-8 cursor-pointer ${
                      selectedStep === step.id ? "bg-blue-50 rounded-lg p-4" : "p-4"
                    }`}
                    onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                  >
                    {/* Timeline Dot */}
                    <div
                      className={`absolute right-4 w-4 h-4 rounded-full border-4 border-white ${getStatusColor(step.status)}`}
                    ></div>

                    <div className="mr-12">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(step.status)}
                          <h4 className="font-semibold">{step.title}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {step.duration}
                          </Badge>
                          <span className="text-xs text-gray-500">تا {step.deadline}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-3">{step.description}</p>

                      {selectedStep === step.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-2"
                        >
                          <h5 className="font-medium text-sm">وظایف:</h5>
                          <div className="space-y-1">
                            {step.tasks.map((task, taskIndex) => (
                              <div key={taskIndex} className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  className="rounded"
                                  checked={completedTasks.has(`${step.id}-${taskIndex}`)}
                                  onChange={(e) => {
                                    const taskId = `${step.id}-${taskIndex}`
                                    setCompletedTasks((prev) => {
                                      const newSet = new Set(prev)
                                      if (e.target.checked) {
                                        newSet.add(taskId)
                                      } else {
                                        newSet.delete(taskId)
                                      }
                                      return newSet
                                    })
                                  }}
                                />
                                <span
                                  className={`text-sm ${
                                    completedTasks.has(`${step.id}-${taskIndex}`) ? "line-through text-gray-500" : ""
                                  }`}
                                >
                                  {task}
                                </span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-4">تقویم مهلت‌ها</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {migrationTimeline.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border rounded-lg p-3 ${
                        step.status === "current" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(step.status)}
                        <span className="font-medium text-sm">{step.title}</span>
                      </div>
                      <div className="text-xs text-gray-600">مهلت: {step.deadline}</div>
                      <div className="text-xs text-gray-500 mt-1">مدت: {step.duration}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reminders" className="space-y-4">
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-4">یادآوری‌های فعال</h3>
                <div className="space-y-3">
                  {[
                    { title: "ثبت‌نام آزمون آیلتس", date: "1403/08/20", priority: "بالا" },
                    { title: "ارسال مدارک برای ترجمه", date: "1403/08/25", priority: "متوسط" },
                    { title: "پیگیری ارزیابی مدارک", date: "1403/09/01", priority: "بالا" },
                    { title: "تمدید گذرنامه", date: "1403/09/10", priority: "پایین" },
                  ].map((reminder, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <div>
                          <div className="font-medium text-sm">{reminder.title}</div>
                          <div className="text-xs text-gray-500">{reminder.date}</div>
                        </div>
                      </div>
                      <Badge
                        className={
                          reminder.priority === "بالا"
                            ? "bg-red-100 text-red-800"
                            : reminder.priority === "متوسط"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {reminder.priority}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
