"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, CheckCircle, AlertCircle, XCircle, Upload, Download } from "lucide-react"

interface Document {
  id: string
  name: string
  status: "complete" | "incomplete" | "missing" | "review"
  description: string
  requirements: string[]
  tips: string[]
}

const documentChecklist: Document[] = [
  {
    id: "passport",
    name: "گذرنامه",
    status: "complete",
    description: "گذرنامه معتبر با حداقل 6 ماه اعتبار",
    requirements: ["اعتبار حداقل 6 ماه", "صفحات خالی برای ویزا", "عکس واضح"],
    tips: ["گذرنامه را اسکن کنید", "کپی رنگی تهیه کنید"],
  },
  {
    id: "education",
    name: "مدارک تحصیلی",
    status: "review",
    description: "مدرک دانشگاهی و ریز نمرات",
    requirements: ["مدرک اصلی", "ریز نمرات", "ترجمه رسمی", "تأیید وزارت علوم"],
    tips: ["ترجمه توسط مترجم رسمی", "تأیید از دانشگاه مبدأ"],
  },
  {
    id: "language",
    name: "مدرک زبان",
    status: "incomplete",
    description: "گواهی آیلتس، تافل یا سایر آزمون‌های معتبر",
    requirements: ["نمره مطلوب", "اعتبار 2 ساله", "آزمون معتبر"],
    tips: ["آیلتس جنرال برای مهاجرت", "تمرین قبل از آزمون"],
  },
  {
    id: "work",
    name: "سوابق کاری",
    status: "missing",
    description: "گواهی کار و توصیه‌نامه‌ها",
    requirements: ["گواهی کار", "توصیه‌نامه", "فیش حقوقی", "شرح وظایف"],
    tips: ["گواهی از HR شرکت", "ترجمه رسمی مدارک"],
  },
]

export function DocumentReview() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File[]>>({})

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "review":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "incomplete":
        return <AlertCircle className="w-5 h-5 text-orange-500" />
      case "missing":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-100 text-green-800 border-green-200"
      case "review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "incomplete":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "missing":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "complete":
        return "تکمیل شده"
      case "review":
        return "در حال بررسی"
      case "incomplete":
        return "ناقص"
      case "missing":
        return "موجود نیست"
      default:
        return "نامشخص"
    }
  }

  const completionPercentage =
    (documentChecklist.filter((doc) => doc.status === "complete").length / documentChecklist.length) * 100

  const handleFileUpload = (docId: string, files: FileList | null) => {
    if (files) {
      setUploadedFiles((prev) => ({
        ...prev,
        [docId]: Array.from(files),
      }))
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            بررسی و چک‌لیست مدارک
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">پیشرفت تکمیل مدارک</span>
              <span className="text-sm text-gray-600">{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
          </div>

          <Tabs defaultValue="checklist" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="checklist">چک‌لیست</TabsTrigger>
              <TabsTrigger value="upload">آپلود مدارک</TabsTrigger>
              <TabsTrigger value="review">بررسی AI</TabsTrigger>
            </TabsList>

            <TabsContent value="checklist" className="space-y-4">
              {documentChecklist.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedDoc === doc.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => setSelectedDoc(selectedDoc === doc.id ? null : doc.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(doc.status)}
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-gray-600">{doc.description}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(doc.status)}>{getStatusText(doc.status)}</Badge>
                  </div>

                  {selectedDoc === doc.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t space-y-3"
                    >
                      <div>
                        <h4 className="font-medium text-sm mb-2">الزامات:</h4>
                        <ul className="space-y-1">
                          {doc.requirements.map((req, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-2">نکات مهم:</h4>
                        <ul className="space-y-1">
                          {doc.tips.map((tip, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              {documentChecklist.map((doc) => (
                <Card key={doc.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{doc.name}</h3>
                    {getStatusIcon(doc.status)}
                  </div>

                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">فایل‌های خود را اینجا بکشید یا کلیک کنید</p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(doc.id, e.target.files)}
                      className="hidden"
                      id={`upload-${doc.id}`}
                    />
                    <label htmlFor={`upload-${doc.id}`}>
                      <Button variant="outline" className="cursor-pointer">
                        انتخاب فایل
                      </Button>
                    </label>
                  </div>

                  {uploadedFiles[doc.id] && (
                    <div className="mt-3 space-y-2">
                      {uploadedFiles[doc.id].map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="review" className="space-y-4">
              <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <h3 className="font-medium">بررسی هوشمند مدارک</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  سیستم هوش مصنوعی ما مدارک شما را بررسی کرده و پیشنهادات زیر را ارائه می‌دهد:
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-white rounded border">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">گذرنامه شما معتبر است</p>
                      <p className="text-xs text-gray-600">اعتبار تا 2026 - مناسب برای درخواست ویزا</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded border">
                    <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">مدرک زبان نیاز به بروزرسانی دارد</p>
                      <p className="text-xs text-gray-600">آیلتس شما 18 ماه قدمت دارد - توصیه می‌شود مجدداً آزمون دهید</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white rounded border">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">گواهی کار ناقص است</p>
                      <p className="text-xs text-gray-600">شرح وظایف دقیق و مهر شرکت مورد نیاز است</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
