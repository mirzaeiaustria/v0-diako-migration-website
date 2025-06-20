"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Upload,
  Download,
  Search,
  Eye,
  Clock,
  Star,
  Zap,
  Shield,
  Brain,
  Camera,
  Scan,
  FileCheck,
  AlertTriangle,
} from "lucide-react"

interface Document {
  id: string
  name: string
  status: "complete" | "incomplete" | "missing" | "review" | "expired"
  description: string
  requirements: string[]
  tips: string[]
  priority: "high" | "medium" | "low"
  deadline?: string
  aiScore?: number
  uploadedFiles?: File[]
  lastUpdated?: string
}

interface DocumentCategory {
  id: string
  name: string
  icon: any
  documents: Document[]
  completionRate: number
}

const documentCategories: DocumentCategory[] = [
  {
    id: "identity",
    name: "مدارک هویتی",
    icon: Shield,
    completionRate: 0,
    documents: [
      {
        id: "passport",
        name: "گذرنامه",
        status: "complete",
        description: "گذرنامه معتبر با حداقل 6 ماه اعتبار",
        requirements: ["اعتبار حداقل 6 ماه", "صفحات خالی برای ویزا", "عکس واضح"],
        tips: ["گذرنامه را اسکن کنید", "کپی رنگی تهیه کنید"],
        priority: "high",
        deadline: "1403/09/15",
        aiScore: 95,
        lastUpdated: "1403/08/10",
      },
      {
        id: "national-id",
        name: "کارت ملی",
        status: "complete",
        description: "کارت ملی معتبر و ترجمه رسمی آن",
        requirements: ["کارت اصلی", "ترجمه رسمی", "تأیید وزارت خارجه"],
        tips: ["ترجمه توسط مترجم رسمی", "مهر وزارت خارجه ضروری"],
        priority: "high",
        aiScore: 88,
      },
      {
        id: "birth-certificate",
        name: "شناسنامه",
        status: "review",
        description: "شناسنامه و ترجمه رسمی",
        requirements: ["شناسنامه اصلی", "ترجمه رسمی", "تأیید"],
        tips: ["کپی واضح تهیه کنید", "ترجمه دقیق مهم است"],
        priority: "medium",
        aiScore: 72,
      },
    ],
  },
  {
    id: "education",
    name: "مدارک تحصیلی",
    icon: FileText,
    completionRate: 0,
    documents: [
      {
        id: "diploma",
        name: "مدرک تحصیلی",
        status: "incomplete",
        description: "مدرک دانشگاهی و ریز نمرات",
        requirements: ["مدرک اصلی", "ریز نمرات", "ترجمه رسمی", "تأیید وزارت علوم"],
        tips: ["ترجمه توسط مترجم رسمی", "تأیید از دانشگاه مبدأ"],
        priority: "high",
        deadline: "1403/09/30",
        aiScore: 45,
      },
      {
        id: "transcripts",
        name: "ریز نمرات",
        status: "missing",
        description: "ریز نمرات کامل دوره تحصیلی",
        requirements: ["ریز نمرات رسمی", "مهر دانشگاه", "ترجمه"],
        tips: ["از دانشگاه درخواست کنید", "ترجمه دقیق مهم است"],
        priority: "high",
        aiScore: 0,
      },
    ],
  },
  {
    id: "language",
    name: "مدارک زبان",
    icon: Brain,
    completionRate: 0,
    documents: [
      {
        id: "ielts",
        name: "مدرک زبان انگلیسی",
        status: "expired",
        description: "گواهی آیلتس، تافل یا سایر آزمون‌های معتبر",
        requirements: ["نمره مطلوب", "اعتبار 2 ساله", "آزمون معتبر"],
        tips: ["آیلتس جنرال برای مهاجرت", "تمرین قبل از آزمون"],
        priority: "high",
        deadline: "1403/10/15",
        aiScore: 30,
      },
    ],
  },
  {
    id: "work",
    name: "سوابق کاری",
    icon: FileCheck,
    completionRate: 0,
    documents: [
      {
        id: "work-certificate",
        name: "گواهی کار",
        status: "missing",
        description: "گواهی کار و توصیه‌نامه‌ها",
        requirements: ["گواهی کار", "توصیه‌نامه", "فیش حقوقی", "شرح وظایف"],
        tips: ["گواهی از HR شرکت", "ترجمه رسمی مدارک"],
        priority: "medium",
        aiScore: 0,
      },
    ],
  },
]

export function EnhancedDocumentChecker() {
  const [categories, setCategories] = useState<DocumentCategory[]>(documentCategories)
  const [selectedCategory, setSelectedCategory] = useState<string>("identity")
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [aiAnalysis, setAiAnalysis] = useState<Record<string, any>>({})

  // Calculate completion rates
  useEffect(() => {
    const updatedCategories = categories.map((category) => {
      const totalDocs = category.documents.length
      const completedDocs = category.documents.filter((doc) => doc.status === "complete").length
      return {
        ...category,
        completionRate: Math.round((completedDocs / totalDocs) * 100),
      }
    })
    setCategories(updatedCategories)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "review":
        return <Eye className="w-5 h-5 text-blue-500" />
      case "incomplete":
        return <AlertCircle className="w-5 h-5 text-orange-500" />
      case "expired":
        return <Clock className="w-5 h-5 text-red-500" />
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
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "incomplete":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "expired":
        return "bg-red-100 text-red-800 border-red-200"
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
      case "expired":
        return "منقضی شده"
      case "missing":
        return "موجود نیست"
      default:
        return "نامشخص"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const handleFileUpload = async (docId: string, files: FileList | null) => {
    if (!files) return

    setUploadProgress((prev) => ({ ...prev, [docId]: 0 }))

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress((prev) => ({ ...prev, [docId]: i }))
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    // Simulate AI analysis
    setTimeout(() => {
      setAiAnalysis((prev) => ({
        ...prev,
        [docId]: {
          quality: Math.floor(Math.random() * 30) + 70,
          completeness: Math.floor(Math.random() * 20) + 80,
          suggestions: [
            "کیفیت تصویر مناسب است",
            "تمام اطلاعات قابل خواندن هستند",
            "توصیه می‌شود نسخه اصلی نیز ارائه شود",
          ],
        },
      }))
    }, 1500)
  }

  const filteredDocuments =
    categories
      .find((cat) => cat.id === selectedCategory)
      ?.documents.filter((doc) => {
        const matchesSearch =
          doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = filterStatus === "all" || doc.status === filterStatus
        return matchesSearch && matchesFilter
      }) || []

  const overallProgress = Math.round(categories.reduce((sum, cat) => sum + cat.completionRate, 0) / categories.length)

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
          >
            <FileText className="w-6 h-6 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            چک‌لیست هوشمند مدارک
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          با استفاده از هوش مصنوعی، مدارک خود را بررسی کرده و از تکمیل بودن آن‌ها اطمینان حاصل کنید
        </p>
      </motion.div>

      {/* Overall Progress */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold">پیشرفت کلی</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
          </div>
          <Progress value={overallProgress} className="h-3 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-100 border-blue-300"
                    : "bg-white border-gray-200 hover:border-blue-200"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <category.icon className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-sm">{category.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <Progress value={category.completionRate} className="h-2 flex-1 mr-2" />
                  <span className="text-xs font-bold">{category.completionRate}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Document List */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {categories.find((cat) => cat.id === selectedCategory)?.icon &&
                    (<categories.find(cat => cat.id === selectedCategory)!.icon className="w-6 h-6" />)}
                  {categories.find((cat) => cat.id === selectedCategory)?.name}
                </CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="جستجو..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-40"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="all\">همه</option>\<option value="complete">تکمیل شده</option>
                    <option value="incomplete">ناقص</option>
                    <option value="missing">موجود نیست</option>
                    <option value="expired">منقضی شده</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence>
                {filteredDocuments.map((doc, index) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedDoc === doc.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                    }`}
                    onClick={() => setSelectedDoc(selectedDoc === doc.id ? null : doc.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(doc.status)}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{doc.name}</h3>
                            <Star className={`w-4 h-4 ${getPriorityColor(doc.priority)}`} />
                          </div>
                          <p className="text-sm text-gray-600">{doc.description}</p>
                          {doc.deadline && <p className="text-xs text-red-600 mt-1">مهلت: {doc.deadline}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.aiScore !== undefined && (
                          <Badge variant="outline" className="text-xs">
                            AI: {doc.aiScore}%
                          </Badge>
                        )}
                        <Badge className={getStatusColor(doc.status)}>{getStatusText(doc.status)}</Badge>
                      </div>
                    </div>

                    <AnimatePresence>
                      {selectedDoc === doc.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t space-y-4"
                        >
                          <Tabs defaultValue="requirements" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="requirements">الزامات</TabsTrigger>
                              <TabsTrigger value="upload">آپلود</TabsTrigger>
                              <TabsTrigger value="analysis">تحلیل AI</TabsTrigger>
                            </TabsList>

                            <TabsContent value="requirements" className="space-y-3">
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
                            </TabsContent>

                            <TabsContent value="upload" className="space-y-4">
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
                                    <Camera className="w-4 h-4 mr-2" />
                                    انتخاب فایل
                                  </Button>
                                </label>
                              </div>

                              {uploadProgress[doc.id] !== undefined && uploadProgress[doc.id] < 100 && (
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm">
                                    <span>در حال آپلود...</span>
                                    <span>{uploadProgress[doc.id]}%</span>
                                  </div>
                                  <Progress value={uploadProgress[doc.id]} className="h-2" />
                                </div>
                              )}
                            </TabsContent>

                            <TabsContent value="analysis" className="space-y-4">
                              {aiAnalysis[doc.id] ? (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-green-50 p-3 rounded-lg">
                                      <div className="text-sm text-gray-600">کیفیت</div>
                                      <div className="text-2xl font-bold text-green-600">
                                        {aiAnalysis[doc.id].quality}%
                                      </div>
                                    </div>
                                    <div className="bg-blue-50 p-3 rounded-lg">
                                      <div className="text-sm text-gray-600">تکمیل</div>
                                      <div className="text-2xl font-bold text-blue-600">
                                        {aiAnalysis[doc.id].completeness}%
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-sm mb-2">پیشنهادات AI:</h4>
                                    <ul className="space-y-1">
                                      {aiAnalysis[doc.id].suggestions.map((suggestion: string, i: number) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                          <Brain className="w-4 h-4 text-purple-500" />
                                          {suggestion}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-8 text-gray-500">
                                  <Scan className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                  <p>ابتدا فایل آپلود کنید تا تحلیل AI انجام شود</p>
                                </div>
                              )}
                            </TabsContent>
                          </Tabs>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">آمار سریع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "تکمیل شده", count: 3, color: "text-green-600", icon: CheckCircle },
                { label: "در حال بررسی", count: 1, color: "text-blue-600", icon: Eye },
                { label: "ناقص", count: 2, color: "text-orange-600", icon: AlertCircle },
                { label: "موجود نیست", count: 2, color: "text-red-600", icon: XCircle },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {stat.icon.className(`w-5 h-5 ${stat.color}`)}
                    <span className="text-sm">{stat.label}</span>
                  </div>
                  <Badge variant="outline">{stat.count}</Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* AI Assistant */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Brain className="w-5 h-5" />
                دستیار هوشمند
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">توجه!</p>
                    <p className="text-gray-600">مدارک زبان شما منقضی شده است. برای تمدید اقدام کنید.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-purple-200">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium">پیشنهاد</p>
                    <p className="text-gray-600">مدارک هویتی شما کامل است. می‌توانید به مرحله بعد بروید.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">اقدامات سریع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                دانلود چک‌لیست PDF
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                راهنمای تکمیل مدارک
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Brain className="w-4 h-4 mr-2" />
                مشاوره هوشمند
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
