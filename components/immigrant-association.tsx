"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageSquare, Calendar, MapPin, Heart, Share2 } from "lucide-react"

interface ForumPost {
  id: string
  author: string
  avatar: string
  country: string
  title: string
  content: string
  likes: number
  replies: number
  timestamp: string
  tags: string[]
}

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  attendees: number
  type: "online" | "offline"
}

const forumPosts: ForumPost[] = [
  {
    id: "1",
    author: "علی محمدی",
    avatar: "/placeholder.svg?height=40&width=40",
    country: "کانادا",
    title: "تجربه اولین سال زندگی در تورنتو",
    content: "سلام دوستان! امروز یک سال از مهاجرتم به کانادا می‌گذره و می‌خواستم تجربیاتم رو باهاتون به اشتراک بذارم...",
    likes: 24,
    replies: 8,
    timestamp: "2 ساعت پیش",
    tags: ["کانادا", "تورنتو", "تجربه زندگی"],
  },
  {
    id: "2",
    author: "مریم احمدی",
    avatar: "/placeholder.svg?height=40&width=40",
    country: "آلمان",
    title: "راهنمای کامل یادگیری زبان آلمانی",
    content: "برای دوستانی که قصد مهاجرت به آلمان رو دارن، یادگیری زبان آلمانی خیلی مهمه. اینجا چند تا نکته مهم...",
    likes: 31,
    replies: 12,
    timestamp: "5 ساعت پیش",
    tags: ["آلمان", "زبان آلمانی", "آموزش"],
  },
  {
    id: "3",
    author: "رضا کریمی",
    avatar: "/placeholder.svg?height=40&width=40",
    country: "استرالیا",
    title: "فرصت‌های شغلی در سیدنی برای مهندسان",
    content:
      "سلام به همه! من مهندس نرم‌افزارم و 6 ماهه که در سیدنی کار می‌کنم. می‌خوام درباره بازار کار اینجا صحبت کنم...",
    likes: 18,
    replies: 6,
    timestamp: "1 روز پیش",
    tags: ["استرالیا", "سیدنی", "مهندسی", "کار"],
  },
]

const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "وبینار مهاجرت به کانادا",
    date: "1403/09/15",
    time: "20:00",
    location: "آنلاین",
    attendees: 156,
    type: "online",
  },
  {
    id: "2",
    title: "جلسه حضوری مهاجران آلمان",
    date: "1403/09/20",
    time: "18:00",
    location: "تهران - سعادت‌آباد",
    attendees: 45,
    type: "offline",
  },
  {
    id: "3",
    title: "کارگاه آمادگی مصاحبه ویزا",
    date: "1403/09/25",
    time: "19:00",
    location: "آنلاین",
    attendees: 89,
    type: "online",
  },
]

export function ImmigrantAssociation() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6 text-orange-600" />
            انجمن مهاجران دیاکو
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-orange-600">2,847</div>
              <div className="text-sm text-gray-600">اعضای فعال</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">1,234</div>
              <div className="text-sm text-gray-600">پست‌های مفید</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-gray-600">رویداد برگزار شده</div>
            </div>
          </div>

          <Tabs defaultValue="forum" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="forum">انجمن</TabsTrigger>
              <TabsTrigger value="events">رویدادها</TabsTrigger>
              <TabsTrigger value="groups">گروه‌ها</TabsTrigger>
            </TabsList>

            <TabsContent value="forum" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">آخرین پست‌ها</h3>
                <Button>پست جدید</Button>
              </div>

              {forumPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={post.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{post.author}</span>
                        <Badge variant="outline" className="text-xs">
                          {post.country}
                        </Badge>
                        <span className="text-xs text-gray-500">{post.timestamp}</span>
                      </div>

                      <h4 className="font-semibold mb-2">{post.title}</h4>
                      <p className="text-gray-700 text-sm mb-3">{post.content}</p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`p-1 h-auto ${likedPosts.has(post.id) ? "text-red-500" : ""}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className={`w-4 h-4 mr-1 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                          {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                        </Button>

                        <Button variant="ghost" size="sm" className="p-1 h-auto">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {post.replies}
                        </Button>

                        <Button variant="ghost" size="sm" className="p-1 h-auto">
                          <Share2 className="w-4 h-4 mr-1" />
                          اشتراک
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">رویدادهای آینده</h3>
                <Button>ایجاد رویداد</Button>
              </div>

              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{event.title}</h4>
                        <Badge className={event.type === "online" ? "bg-blue-500" : "bg-green-500"}>
                          {event.type === "online" ? "آنلاین" : "حضوری"}
                        </Badge>
                      </div>

                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {event.date} - {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          {event.attendees} شرکت‌کننده
                        </div>
                      </div>
                    </div>

                    <Button>شرکت در رویداد</Button>
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="groups" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">گروه‌های تخصصی</h3>
                <Button>ایجاد گروه</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "مهاجران کانادا", members: 1247, description: "گروه مهاجران ساکن کانادا" },
                  { name: "دانشجویان آلمان", members: 856, description: "دانشجویان ایرانی در آلمان" },
                  { name: "کارآفرینان استرالیا", members: 432, description: "کارآفرینان و سرمایه‌گذاران" },
                  { name: "خانواده‌های مهاجر", members: 678, description: "مهاجرت خانوادگی و تجربیات" },
                ].map((group, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border rounded-lg p-4"
                  >
                    <h4 className="font-semibold mb-1">{group.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{group.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{group.members} عضو</span>
                      <Button size="sm" variant="outline">
                        عضویت
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
