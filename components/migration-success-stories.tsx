"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, MapPin, Calendar, Award, Quote } from "lucide-react"

interface SuccessStory {
  id: number
  name: string
  age: number
  avatar: string
  country: string
  method: string
  year: number
  title: string
  story: string
  achievements: string[]
  tags: string[]
  verified: boolean
  timeline: string
  currentStatus: string
  advice: string
}

const successStories: SuccessStory[] = [
  {
    id: 1,
    name: "علی محمدی",
    age: 32,
    avatar: "/placeholder.svg?height=80&width=80",
    country: "آلمان",
    method: "مهاجرت کاری",
    year: 2023,
    title: "از مهندس نرم‌افزار در تهران تا تیم لید در برلین",
    story:
      "من در سال ۱۴۰۱ تصمیم گرفتم برای بهبود شرایط زندگی و کاری‌ام به آلمان مهاجرت کنم. با کمک تیم دیاکو، توانستم در عرض ۸ ماه ویزای کاری دریافت کنم و اکنون در یکی از بزرگترین شرکت‌های فناوری آلمان به عنوان تیم لید کار می‌کنم.",
    achievements: [
      "دریافت ویزای کاری آلمان در ۸ ماه",
      "ارتقا به سمت تیم لید در ۱ سال",
      "افزایش ۳ برابری حقوق",
      "یادگیری زبان آلمانی تا سطح B2",
    ],
    tags: ["مهندسی نرم‌افزار", "برلین", "تیم لید", "فناوری"],
    verified: true,
    timeline: "۸ ماه",
    currentStatus: "تیم لید در شرکت SAP",
    advice:
      "مهمترین نکته یادگیری زبان آلمانی است. حتی اگر شغل شما نیاز به آلمانی نداشته باشد، برای زندگی روزمره ضروری است.",
  },
  {
    id: 2,
    name: "مریم حسینی",
    age: 28,
    avatar: "/placeholder.svg?height=80&width=80",
    country: "هلند",
    method: "مهاجرت تحصیلی",
    year: 2022,
    title: "از دانشجوی پزشکی تا محقق در دانشگاه آمستردام",
    story:
      "پس از اتمام دوره پزشکی عمومی در ایران، تصمیم گرفتم برای ادامه تحصیل در رشته نورولوژی به هلند بروم. اکنون در دانشگاه آمستردام مشغول تحقیق در زمینه بیماری‌های نورودژنراتیو هستم.",
    achievements: [
      "پذیرش در دانشگاه آمستردام",
      "دریافت بورسیه تحصیلی کامل",
      "انتشار ۳ مقاله علمی",
      "عضویت در تیم تحقیقاتی بین‌المللی",
    ],
    tags: ["پزشکی", "نورولوژی", "تحقیق", "آمستردام"],
    verified: true,
    timeline: "۶ ماه",
    currentStatus: "محقق دکترا در دانشگاه آمستردام",
    advice:
      "برای مهاجرت تحصیلی، حتماً از قبل با اساتید دانشگاه مقصد ارتباط برقرار کنید و پروژه‌های تحقیقاتی آن‌ها را مطالعه کنید.",
  },
  {
    id: 3,
    name: "رضا کریمی",
    age: 45,
    avatar: "/placeholder.svg?height=80&width=80",
    country: "کانادا",
    method: "سرمایه‌گذاری",
    year: 2021,
    title: "راه‌اندازی کسب‌وکار موفق در تورنتو",
    story:
      "با ۲۰ سال تجربه در صنعت ساختمان، تصمیم گرفتم از طریق برنامه سرمایه‌گذاری کانادا مهاجرت کنم. اکنون یک شرکت ساختمانی موفق در تورنتو دارم که بیش از ۵۰ نفر را استخدام کرده است.",
    achievements: [
      "دریافت اقامت دائم کانادا",
      "راه‌اندازی شرکت ساختمانی",
      "استخدام ۵۰+ کارمند",
      "درآمد سالانه ۲ میلیون دلار کانادا",
    ],
    tags: ["کارآفرینی", "ساختمان", "تورنتو", "سرمایه‌گذاری"],
    verified: true,
    timeline: "۱۲ ماه",
    currentStatus: "مدیرعامل شرکت ساختمانی",
    advice: "برای مهاجرت سرمایه‌گذاری، حتماً طرح کسب‌وکار دقیق و قابل اجرا داشته باشید و بازار هدف را به خوبی بشناسید.",
  },
  {
    id: 4,
    name: "سارا احمدی",
    age: 35,
    avatar: "/placeholder.svg?height=80&width=80",
    country: "سوئد",
    method: "خانوادگی",
    year: 2023,
    title: "الحاق موفق به همسر و شروع زندگی جدید در استکهلم",
    story:
      "پس از ازدواج با یک شهروند سوئدی، فرآیند الحاق خانوادگی را شروع کردم. با راهنمایی‌های دقیق تیم دیاکو، توانستم در کمترین زمان ممکن ویزای خانوادگی دریافت کنم.",
    achievements: [
      "دریافت ویزای خانوادگی سوئد",
      "یادگیری زبان سوئدی",
      "یافتن شغل در حوزه مارکتینگ",
      "شروع دوره‌های آموزشی آنلاین",
    ],
    tags: ["الحاق خانواده", "استکهلم", "مارکتینگ", "آموزش"],
    verified: true,
    timeline: "۴ ماه",
    currentStatus: "متخصص مارکتینگ دیجیتال",
    advice:
      "برای الحاق خانوادگی، صبر و دقت در تهیه مدارک بسیار مهم است. همچنین یادگیری زبان کشور مقصد کار شما را بسیار آسان‌تر می‌کند.",
  },
  {
    id: 5,
    name: "امیر نوری",
    age: 29,
    avatar: "/placeholder.svg?height=80&width=80",
    country: "آلمان",
    method: "آوسبیلدونگ",
    year: 2022,
    title: "از فارغ‌التحصیل بیکار تا متخصص IT در مونیخ",
    story:
      "پس از فارغ‌التحصیلی از رشته کامپیوتر و عدم یافتن شغل مناسب در ایران، تصمیم گرفتم از طریق برنامه آوسبیلدونگ آلمان وارد بازار کار شوم. اکنون در یکی از شرکت‌های معتبر IT در مونیخ کار می‌کنم.",
    achievements: [
      "تکمیل موفق دوره آوسبیلدونگ",
      "دریافت گواهینامه حرفه‌ای آلمان",
      "استخدام در شرکت BMW",
      "اخذ اقامت بلندمدت آلمان",
    ],
    tags: ["آوسبیلدونگ", "IT", "مونیخ", "BMW"],
    verified: true,
    timeline: "۳ ماه",
    currentStatus: "متخصص IT در شرکت BMW",
    advice:
      "آوسبیلدونگ فرصت عالی برای جوانان است. نه تنها مهارت عملی یاد می‌گیرید بلکه حین آموزش هم حقوق دریافت می‌کنید.",
  },
  {
    id: 6,
    name: "لیلا موسوی",
    age: 31,
    avatar: "/placeholder.svg?height=80&width=80",
    country: "اتریش",
    method: "مهاجرت کاری",
    year: 2023,
    title: "از معلم زبان انگلیسی تا مدیر آموزش در وین",
    story:
      "با ۸ سال تجربه تدریس زبان انگلیسی، تصمیم گرفتم برای بهبود شرایط حرفه‌ای‌ام به اتریش مهاجرت کنم. اکنون مدیر بخش آموزش زبان در یکی از موسسات معتبر وین هستم.",
    achievements: [
      "دریافت ویزای کاری اتریش",
      "ارتقا به سمت مدیر آموزش",
      "طراحی برنامه‌های آموزشی جدید",
      "یادگیری زبان آلمانی تا سطح C1",
    ],
    tags: ["آموزش", "زبان انگلیسی", "وین", "مدیریت"],
    verified: true,
    timeline: "۷ ماه",
    currentStatus: "مدیر آموزش در موسسه Berlitz",
    advice:
      "اگر در حوزه آموزش فعالیت می‌کنید، اتریش فرصت‌های عالی برای رشد حرفه‌ای ارائه می‌دهد. مهم این است که مدارک بین‌المللی داشته باشید.",
  },
]

export function MigrationSuccessStories() {
  const [currentStory, setCurrentStory] = useState(0)
  const [selectedMethod, setSelectedMethod] = useState("all")

  const filteredStories =
    selectedMethod === "all" ? successStories : successStories.filter((story) => story.method === selectedMethod)

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % filteredStories.length)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + filteredStories.length) % filteredStories.length)
  }

  const methods = ["all", "مهاجرت کاری", "مهاجرت تحصیلی", "سرمایه‌گذاری", "خانوادگی", "آوسبیلدونگ"]

  return (
    <div className="w-full space-y-6">
      <Tabs value={selectedMethod} onValueChange={setSelectedMethod} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="all">همه</TabsTrigger>
          <TabsTrigger value="مهاجرت کاری">کاری</TabsTrigger>
          <TabsTrigger value="مهاجرت تحصیلی">تحصیلی</TabsTrigger>
          <TabsTrigger value="سرمایه‌گذاری">سرمایه‌گذاری</TabsTrigger>
          <TabsTrigger value="خانوادگی">خانوادگی</TabsTrigger>
          <TabsTrigger value="آوسبیلدونگ">آوسبیلدونگ</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedMethod} className="space-y-6">
          {/* Featured Story */}
          <Card className="overflow-hidden">
            <div className="relative">
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <Award className="w-3 h-3 ml-1" />
                  تأیید شده
                </Badge>
              </div>

              <div className="absolute top-4 left-4 z-10 flex space-x-2 space-x-reverse">
                <Button variant="outline" size="sm" onClick={prevStory} className="bg-white/80 backdrop-blur-sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={nextStory} className="bg-white/80 backdrop-blur-sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-8 text-white">
                <div className="flex items-start space-x-6 space-x-reverse">
                  <Avatar className="w-20 h-20 border-4 border-white">
                    <AvatarImage src={filteredStories[currentStory]?.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {filteredStories[currentStory]?.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{filteredStories[currentStory]?.title}</h3>

                    <div className="flex items-center space-x-4 space-x-reverse text-blue-100 mb-4">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <span className="font-medium">{filteredStories[currentStory]?.name}</span>
                        <span>•</span>
                        <span>{filteredStories[currentStory]?.age} ساله</span>
                      </div>

                      <div className="flex items-center space-x-1 space-x-reverse">
                        <MapPin className="w-4 h-4" />
                        <span>{filteredStories[currentStory]?.country}</span>
                      </div>

                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Calendar className="w-4 h-4" />
                        <span>{filteredStories[currentStory]?.year}</span>
                      </div>
                    </div>

                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {filteredStories[currentStory]?.method}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start space-x-2 space-x-reverse mb-4">
                    <Quote className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{filteredStories[currentStory]?.story}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">دستاوردها:</h4>
                      <ul className="space-y-1">
                        {filteredStories[currentStory]?.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-center space-x-2 space-x-reverse text-sm">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">برچسب‌ها:</h4>
                      <div className="flex flex-wrap gap-2">
                        {filteredStories[currentStory]?.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">اطلاعات کلیدی</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">مدت زمان فرآیند:</span>
                        <span className="font-medium">{filteredStories[currentStory]?.timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">وضعیت فعلی:</span>
                        <span className="font-medium text-sm">{filteredStories[currentStory]?.currentStatus}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">توصیه به سایرین</h4>
                    <p className="text-blue-800 text-sm leading-relaxed">{filteredStories[currentStory]?.advice}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Story Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story, index) => (
              <Card
                key={story.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  index === currentStory ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setCurrentStory(index)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={story.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{story.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{story.name}</CardTitle>
                        {story.verified && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            تأیید شده
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="flex items-center space-x-2 space-x-reverse">
                        <span>{story.country}</span>
                        <span>•</span>
                        <span>{story.year}</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <Badge className="mb-3">{story.method}</Badge>
                  <h4 className="font-medium text-sm mb-2 line-clamp-2">{story.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-3">{story.story}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 space-x-reverse">
            {filteredStories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentStory ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
