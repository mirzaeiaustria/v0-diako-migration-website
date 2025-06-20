"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, Flag, MessageSquare, MapPin, Calendar, Share2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { CardDescription } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

// داده‌های تجربیات مهاجران
const experiences = [
  {
    id: 1,
    name: "علی محمدی",
    avatar: "/placeholder.svg?key=iaaak",
    country: "کانادا",
    method: "اکسپرس اینتری",
    date: "۱۴۰۱/۰۵/۱۲",
    title: "تجربه مهاجرت به کانادا از طریق اکسپرس اینتری",
    content:
      "من در سال ۱۴۰۱ از طریق سیستم اکسپرس اینتری به کانادا مهاجرت کردم. مراحل اخذ ویزا حدود ۸ ماه طول کشید. نکته مهم در این روش داشتن مدرک زبان قوی و سابقه کاری مرتبط است. هزینه کل پروسه برای من حدود ۱۵ هزار دلار بود که شامل هزینه‌های ارزیابی مدارک، آزمون زبان، معاینات پزشکی و هزینه‌های اداری می‌شد.",
    likes: 45,
    comments: 12,
    tags: ["اکسپرس اینتری", "کانادا", "مهاجرت کاری"],
    verified: true,
  },
  {
    id: 2,
    name: "مریم حسینی",
    avatar: "/placeholder.svg?key=i4fqc",
    country: "آلمان",
    method: "ویزای تحصیلی",
    date: "۱۴۰۲/۰۲/۱۸",
    title: "تجربه تحصیل و زندگی در آلمان",
    content:
      "من برای تحصیل در مقطع کارشناسی ارشد رشته مهندسی کامپیوتر به آلمان مهاجرت کردم. مهمترین چالش من یادگیری زبان آلمانی بود. با وجود اینکه بسیاری از دوره‌ها به زبان انگلیسی ارائه می‌شوند، اما برای زندگی روزمره نیاز به یادگیری زبان آلمانی دارید. هزینه زندگی در شهرهای بزرگ مثل مونیخ و برلین بالاست، اما در شهرهای کوچکتر می‌توانید با هزینه کمتری زندگی کنید.",
    likes: 32,
    comments: 8,
    tags: ["آلمان", "تحصیل در خارج", "ویزای تحصیلی"],
    verified: true,
  },
  {
    id: 3,
    name: "رضا کریمی",
    avatar: "/placeholder.svg?key=14e7o",
    country: "استرالیا",
    method: "ویزای مهارتی",
    date: "۱۴۰۱/۱۱/۰۵",
    title: "مهاجرت به استرالیا با ویزای مهارتی",
    content:
      "من با ویزای مهارتی (subclass 189) به استرالیا مهاجرت کردم. این پروسه حدود ۱۴ ماه طول کشید. برای این نوع ویزا، باید در سیستم امتیازبندی استرالیا حداقل ۶۵ امتیاز کسب کنید. فاکتورهای مهم شامل سن، مدرک زبان، سابقه کاری و مدرک تحصیلی است. هزینه زندگی در استرالیا بالاست، اما حقوق‌ها هم متناسب با آن بالاست. آب و هوای عالی و کیفیت زندگی بالا از مزایای زندگی در استرالیاست.",
    likes: 28,
    comments: 15,
    tags: ["استرالیا", "ویزای مهارتی", "مهاجرت کاری"],
    verified: true,
  },
  {
    id: 4,
    name: "سارا احمدی",
    avatar: "/placeholder.svg?key=v99np",
    country: "پرتغال",
    method: "Golden Visa",
    date: "۱۴۰۲/۰۴/۲۰",
    title: "تجربه اخذ Golden Visa پرتغال",
    content:
      "من از طریق برنامه Golden Visa به پرتغال مهاجرت کردم. این برنامه نیاز به سرمایه‌گذاری حداقل ۵۰۰ هزار یورو در املاک دارد. مزیت اصلی این روش این است که نیازی به اقامت دائم در پرتغال ندارید و فقط باید هر سال ۷ روز در پرتغال باشید. بعد از ۵ سال می‌توانید درخواست پاسپورت پرتغال را بدهید که به شما امکان زندگی و کار در تمام کشورهای اتحادیه اروپا را می‌دهد.",
    likes: 19,
    comments: 7,
    tags: ["پرتغال", "Golden Visa", "سرمایه‌گذاری"],
    verified: false,
  },
  {
    id: 5,
    name: "امیر نوری",
    avatar: "/placeholder.svg?key=zorxa",
    country: "فرانسه",
    method: "ویزای کارآفرینی",
    date: "۱۴۰۲/۰۱/۱۵",
    title: "راه‌اندازی استارتاپ در فرانسه",
    content:
      "من با ویزای French Tech Visa به فرانسه مهاجرت کردم. این ویزا برای کارآفرینان و متخصصان فناوری طراحی شده است. برای اخذ این ویزا، باید یک طرح کسب و کار قوی داشته باشید و آن را به یکی از شتاب‌دهنده‌های مورد تأیید دولت فرانسه ارائه دهید. زندگی در پاریس گران است، اما فرصت‌های شغلی و شبکه‌سازی فوق‌العاده‌ای دارد. چالش اصلی من یادگیری زبان فرانسه بود، اما با کلاس‌های فشرده توانستم در مدت کوتاهی به سطح قابل قبولی برسم.",
    likes: 22,
    comments: 9,
    tags: ["فرانسه", "کارآفرینی", "استارتاپ"],
    verified: true,
  },
]

// کامپوننت نمایش تجربیات مهاجران
export function MigrantExperiences() {
  const [activeTab, setActiveTab] = useState("all")
  const [showAddExperienceDialog, setShowAddExperienceDialog] = useState(false)

  // فیلتر تجربیات بر اساس تب فعال
  const filteredExperiences =
    activeTab === "all" ? experiences : experiences.filter((exp) => exp.country.toLowerCase() === activeTab)

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">تجربیات مهاجران</h2>
        <Button onClick={() => setShowAddExperienceDialog(true)}>اشتراک‌گذاری تجربه شما</Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
          <TabsTrigger value="all">همه</TabsTrigger>
          <TabsTrigger value="کانادا">کانادا</TabsTrigger>
          <TabsTrigger value="آلمان">آلمان</TabsTrigger>
          <TabsTrigger value="استرالیا">استرالیا</TabsTrigger>
          <TabsTrigger value="پرتغال">پرتغال</TabsTrigger>
          <TabsTrigger value="فرانسه">فرانسه</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {filteredExperiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </TabsContent>
      </Tabs>

      <AddExperienceDialog open={showAddExperienceDialog} onOpenChange={setShowAddExperienceDialog} />
    </div>
  )
}

// کامپوننت کارت تجربه
function ExperienceCard({ experience }: { experience: any }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 ml-3">
              <AvatarImage src={experience.avatar || "/placeholder.svg"} alt={experience.name} />
              <AvatarFallback>{experience.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <CardTitle className="text-lg">{experience.name}</CardTitle>
                {experience.verified && (
                  <Badge variant="outline" className="mr-2 bg-green-50 text-green-700 border-green-200">
                    تأیید شده
                  </Badge>
                )}
              </div>
              <CardDescription className="flex items-center text-sm">
                <MapPin className="h-3 w-3 ml-1" />
                {experience.country}
                <span className="mx-2">•</span>
                <Calendar className="h-3 w-3 ml-1" />
                {experience.date}
              </CardDescription>
            </div>
          </div>
          <Badge>{experience.method}</Badge>
        </div>
        <h3 className="text-xl font-semibold mt-2">{experience.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-7">{experience.content}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {experience.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {`#${tag}`}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-4 space-x-reverse">
          <Button variant="ghost" size="sm" className="flex items-center">
            <ThumbsUp className="ml-1 h-4 w-4" />
            <span>{experience.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center">
            <MessageSquare className="ml-1 h-4 w-4" />
            <span>{experience.comments}</span>
          </Button>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button variant="ghost" size="sm">
            <Share2 className="ml-1 h-4 w-4" />
            اشتراک‌گذاری
          </Button>
          <Button variant="ghost" size="sm">
            <Flag className="ml-1 h-4 w-4" />
            گزارش
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

// کامپوننت دیالوگ افزودن تجربه جدید
function AddExperienceDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>اشتراک‌گذاری تجربه مهاجرت</DialogTitle>
          <DialogDescription>
            تجربه مهاجرت خود را با دیگران به اشتراک بگذارید تا به متقاضیان مهاجرت کمک کنید.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">کشور مقصد</Label>
              <Select>
                <SelectTrigger id="country">
                  <SelectValue placeholder="انتخاب کشور" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="کانادا">کانادا</SelectItem>
                  <SelectItem value="آلمان">آلمان</SelectItem>
                  <SelectItem value="استرالیا">استرالیا</SelectItem>
                  <SelectItem value="پرتغال">پرتغال</SelectItem>
                  <SelectItem value="فرانسه">فرانسه</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="method">روش مهاجرت</Label>
              <Input id="method" placeholder="روش مهاجرت" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">عنوان تجربه</Label>
            <Input id="title" placeholder="عنوان تجربه" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">توضیحات</Label>
            <Textarea id="content" placeholder="توضیحات" className="min-h-[100px]" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">اشتراک‌گذاری</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
