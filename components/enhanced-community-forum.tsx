"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MessageSquare,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Search,
  Filter,
  Plus,
  Star,
  Eye,
  ThumbsUp,
  Award,
  Globe,
  BookOpen,
  HelpCircle,
  Lightbulb,
  CheckCircle,
} from "lucide-react"

interface ForumPost {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
    reputation: number
    country: string
    status: "verified" | "expert" | "member"
  }
  category: string
  tags: string[]
  likes: number
  replies: number
  views: number
  createdAt: Date
  isLiked: boolean
  isPinned: boolean
  isSolved: boolean
}

interface ForumCategory {
  id: string
  name: string
  description: string
  icon: any
  postCount: number
  color: string
}

const forumCategories: ForumCategory[] = [
  {
    id: "general",
    name: "بحث عمومی",
    description: "سوالات و بحث‌های عمومی درباره مهاجرت",
    icon: MessageSquare,
    postCount: 1250,
    color: "bg-blue-500",
  },
  {
    id: "experiences",
    name: "تجربیات شخصی",
    description: "تجربیات واقعی مهاجران",
    icon: BookOpen,
    postCount: 890,
    color: "bg-green-500",
  },
  {
    id: "questions",
    name: "سوال و جواب",
    description: "سوالات تخصصی و پاسخ‌های کارشناسی",
    icon: HelpCircle,
    postCount: 2100,
    color: "bg-orange-500",
  },
  {
    id: "tips",
    name: "نکات و راهنمایی",
    description: "نکات کاربردی و راهنمایی‌های مفید",
    icon: Lightbulb,
    postCount: 650,
    color: "bg-purple-500",
  },
  {
    id: "countries",
    name: "کشورها",
    description: "بحث درباره کشورهای مختلف",
    icon: Globe,
    postCount: 1800,
    color: "bg-teal-500",
  },
  {
    id: "success",
    name: "داستان‌های موفقیت",
    description: "داستان‌های موفقیت و الهام‌بخش",
    icon: Award,
    postCount: 420,
    color: "bg-yellow-500",
  },
]

const samplePosts: ForumPost[] = [
  {
    id: "1",
    title: "تجربه من از اکسپرس اینتری کانادا - راهنمای کامل",
    content: "سلام دوستان، می‌خواهم تجربه کامل خودم از فرآیند اکسپرس اینتری کانادا را با شما به اشتراک بگذارم...",
    author: {
      name: "علی رضایی",
      avatar: "/users/ali-rezaei.jpg",
      reputation: 1250,
      country: "کانادا",
      status: "verified",
    },
    category: "experiences",
    tags: ["کانادا", "اکسپرس اینتری", "تجربه شخصی"],
    likes: 45,
    replies: 23,
    views: 890,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isLiked: false,
    isPinned: true,
    isSolved: false,
  },
  {
    id: "2",
    title: "سوال درباره مدارک مورد نیاز برای آوسبیلدونگ آلمان",
    content: "سلام، می‌خواستم بدانم برای آوسبیلدونگ در آلمان چه مداركی لازم است؟",
    author: {
      name: "مریم احمدی",
      avatar: "/users/maryam-ahmadi.jpg",
      reputation: 320,
      country: "ایران",
      status: "member",
    },
    category: "questions",
    tags: ["آلمان", "آوسبیلدونگ", "مدارک"],
    likes: 12,
    replies: 8,
    views: 156,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    isLiked: true,
    isPinned: false,
    isSolved: true,
  },
  {
    id: "3",
    title: "نکات مهم برای مصاحبه ویزای تحصیلی",
    content: "بر اساس تجربه‌ام، این نکات برای مصاحبه ویزای تحصیلی بسیار مهم هستند...",
    author: {
      name: "دکتر حسین کریمی",
      avatar: "/users/hossein-karimi.jpg",
      reputation: 2100,
      country: "آلمان",
      status: "expert",
    },
    category: "tips",
    tags: ["مصاحبه", "ویزای تحصیلی", "نکات"],
    likes: 78,
    replies: 15,
    views: 445,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    isLiked: false,
    isPinned: false,
    isSolved: false,
  },
]

export function EnhancedCommunityForum() {
  const [posts, setPosts] = useState<ForumPost[]>(samplePosts)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const [isNewPostOpen, setIsNewPostOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  })

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return b.createdAt.getTime() - a.createdAt.getTime()
      case "popular":
        return b.likes - a.likes
      case "replies":
        return b.replies - a.replies
      case "views":
        return b.views - a.views
      default:
        return 0
    }
  })

  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post,
      ),
    )
  }

  const handleNewPost = () => {
    if (!newPost.title || !newPost.content || !newPost.category) return

    const post: ForumPost = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      author: {
        name: "شما",
        avatar: "/placeholder-user.jpg",
        reputation: 0,
        country: "ایران",
        status: "member",
      },
      category: newPost.category,
      tags: newPost.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      likes: 0,
      replies: 0,
      views: 0,
      createdAt: new Date(),
      isLiked: false,
      isPinned: false,
      isSolved: false,
    }

    setPosts((prev) => [post, ...prev])
    setNewPost({ title: "", content: "", category: "", tags: "" })
    setIsNewPostOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-blue-100 text-blue-800">تأیید شده</Badge>
      case "expert":
        return <Badge className="bg-purple-100 text-purple-800">کارشناس</Badge>
      case "member":
        return <Badge variant="outline">عضو</Badge>
      default:
        return null
    }
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = forumCategories.find((cat) => cat.id === categoryId)
    return category?.icon || MessageSquare
  }

  const getCategoryColor = (categoryId: string) => {
    const category = forumCategories.find((cat) => cat.id === categoryId)
    return category?.color || "bg-gray-500"
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "کمتر از یک ساعت پیش"
    if (diffInHours < 24) return `${diffInHours} ساعت پیش`

    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} روز پیش`

    const diffInWeeks = Math.floor(diffInDays / 7)
    return `${diffInWeeks} هفته پیش`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center"
          >
            <Users className="w-6 h-6 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            انجمن مهاجران دیاکو
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          به بزرگترین انجمن آنلاین مهاجران فارسی‌زبان بپیوندید و تجربیات خود را به اشتراک بگذارید
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "اعضای فعال", value: "12,500+", icon: Users, color: "text-blue-600" },
          { label: "پست‌ها", value: "8,200+", icon: MessageSquare, color: "text-green-600" },
          { label: "پاسخ‌ها", value: "25,000+", icon: MessageCircle, color: "text-orange-600" },
          { label: "کارشناسان", value: "150+", icon: Award, color: "text-purple-600" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            دسته‌بندی‌ها
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedCategory === "all" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => setSelectedCategory("all")}
            >
              <div className="text-center">
                <MessageSquare className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="font-medium text-sm">همه</div>
                <div className="text-xs text-gray-500">{posts.length}</div>
              </div>
            </motion.div>

            {forumCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedCategory === category.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-center">
                  <div
                    className={`w-8 h-8 ${category.color} rounded-full flex items-center justify-center mx-auto mb-2`}
                  >
                    <category.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="font-medium text-sm">{category.name}</div>
                  <div className="text-xs text-gray-500">{category.postCount}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="جستجو در انجمن..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="مرتب‌سازی" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">جدیدترین</SelectItem>
                <SelectItem value="popular">محبوب‌ترین</SelectItem>
                <SelectItem value="replies">بیشترین پاسخ</SelectItem>
                <SelectItem value="views">بیشترین بازدید</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => setIsNewPostOpen(true)}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              پست جدید
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        <AnimatePresence>
          {sortedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Author Avatar */}
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={post.author.avatar || "/placeholder-user.jpg"} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>

                    {/* Post Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {post.isPinned && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Star className="w-3 h-3 mr-1" />
                              سنجاق شده
                            </Badge>
                          )}
                          {post.isSolved && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              حل شده
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{formatTimeAgo(post.createdAt)}</div>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>

                      {/* Author Info */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-medium text-sm">{post.author.name}</span>
                        {getStatusBadge(post.author.status)}
                        <span className="text-xs text-gray-500">• {post.author.reputation} امتیاز</span>
                        <span className="text-xs text-gray-500">• {post.author.country}</span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Post Stats and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.replies}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className={`w-4 h-4 ${post.isLiked ? "text-red-500 fill-red-500" : ""}`} />
                            <span>{post.likes}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={post.isLiked ? "text-red-500" : ""}
                          >
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            پسندیدن
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            پاسخ
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4 mr-1" />
                            اشتراک
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Category Icon */}
                    <div
                      className={`w-10 h-10 ${getCategoryColor(post.category)} rounded-full flex items-center justify-center`}
                    >
                      {(() => {
                        const CategoryIcon = getCategoryIcon(post.category)
                        return <CategoryIcon className="w-5 h-5 text-white" />
                      })()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {isNewPostOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsNewPostOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">پست جدید</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان</label>
                  <Input
                    value={newPost.title}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="عنوان پست خود را وارد کنید"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">دسته‌بندی</label>
                  <Select
                    value={newPost.category}
                    onValueChange={(value) => setNewPost((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="انتخاب دسته‌بندی" />
                    </SelectTrigger>
                    <SelectContent>
                      {forumCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">محتوا</label>
                  <Textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="محتوای پست خود را بنویسید..."
                    rows={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">برچسب‌ها (با کاما جدا کنید)</label>
                  <Input
                    value={newPost.tags}
                    onChange={(e) => setNewPost((prev) => ({ ...prev, tags: e.target.value }))}
                    placeholder="مثال: کانادا, اکسپرس اینتری, تجربه"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleNewPost}
                    disabled={!newPost.title || !newPost.content || !newPost.category}
                    className="flex-1"
                  >
                    انتشار پست
                  </Button>
                  <Button variant="outline" onClick={() => setIsNewPostOpen(false)} className="flex-1">
                    انصراف
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
