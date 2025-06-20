"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MessageSquare,
  Users,
  TrendingUp,
  Star,
  Search,
  Filter,
  Plus,
  Crown,
  Zap,
  Globe,
  BookOpen,
  HelpCircle,
  Lightbulb,
} from "lucide-react"

interface ForumPost {
  id: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
    badge: string
    reputation: number
    country: string
  }
  category: string
  tags: string[]
  likes: number
  replies: number
  views: number
  createdAt: string
  isHot: boolean
  isPinned: boolean
  hasAnswer: boolean
  difficulty: "beginner" | "intermediate" | "advanced"
}

interface ForumCategory {
  id: string
  name: string
  description: string
  icon: any
  color: string
  postCount: number
  activeUsers: number
}

const forumCategories: ForumCategory[] = [
  {
    id: "general",
    name: "بحث عمومی",
    description: "سوالات و بحث‌های عمومی درباره مهاجرت",
    icon: MessageSquare,
    color: "bg-blue-500",
    postCount: 1247,
    activeUsers: 89,
  },
  {
    id: "countries",
    name: "کشورها",
    description: "اطلاعات و تجربیات مربوط به کشورهای مختلف",
    icon: Globe,
    color: "bg-green-500",
    postCount: 892,
    activeUsers: 156,
  },
  {
    id: "documents",
    name: "مدارک و قوانین",
    description: "راهنمایی درباره مدارک و قوانین مهاجرت",
    icon: BookOpen,
    color: "bg-purple-500",
    postCount: 634,
    activeUsers: 78,
  },
  {
    id: "experiences",
    name: "تجربیات شخصی",
    description: "داستان‌ها و تجربیات واقعی مهاجران",
    icon: Star,
    color: "bg-orange-500",
    postCount: 445,
    activeUsers: 92,
  },
  {
    id: "help",
    name: "کمک و راهنمایی",
    description: "درخواست کمک و ارائه راهنمایی",
    icon: HelpCircle,
    color: "bg-red-500",
    postCount: 789,
    activeUsers: 134,
  },
  {
    id: "tips",
    name: "نکات و ترفندها",
    description: "نکات مفید و ترفندهای کاربردی",
    icon: Lightbulb,
    color: "bg-yellow-500",
    postCount: 356,
    activeUsers: 67,
  },
]

const samplePosts: ForumPost[] = [
  {
    id: "1",
    title: "تجربه من از مهاجرت تحصیلی به آلمان - راهنمای کامل",
    content: "سلام دوستان، می‌خواهم تجربه کامل مهاجرت تحصیلی خودم به آلمان را با شما به اشتراک بگذارم...",
    author: {
      name: "علی محمدی",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "کارشناس مهاجرت",
      reputation: 2847,
      country: "آلمان",
    },
    category: "experiences",
    tags: ["آلمان", "تحصیل", "دانشگاه", "ویزا"],
    likes: 156,
    replies: 23,
    views: 1247,
    createdAt: "2 ساعت پیش",
    isHot: true,
    isPinned: true,
    hasAnswer: true,
    difficulty: "intermediate",
  },
  {
    id: "2",
    title: "سوال درباره مدارک مورد نیاز برای ویزای کار کانادا",
    content: "دوستان عزیز، کسی اطلاعاتی درباره مدارک دقیق مورد نیاز برای ویزای کار کانادا دارد؟",
    author: {
      name: "مریم احمدی",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "عضو جدید",
      reputation: 45,
      country: "ایران",
    },
    category: "help",
    tags: ["کانادا", "ویزای کار", "مدارک"],
    likes: 12,
    replies: 8,
    views: 234,
    createdAt: "5 ساعت پیش",
    isHot: false,
    isPinned: false,
    hasAnswer: false,
    difficulty: "beginner",
  },
  {
    id: "3",
    title: "مقایسه زندگی در اسپانیا و پرتغال برای مهاجران",
    content: "بعد از 3 سال زندگی در اسپانیا و 2 سال در پرتغال، می‌خواهم تجربیاتم را با شما به اشتراک بگذارم...",
    author: {
      name: "رضا کریمی",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "مهاجر باتجربه",
      reputation: 1523,
      country: "اسپانیا",
    },
    category: "countries",
    tags: ["اسپانیا", "پرتغال", "مقایسه", "زندگی"],
    likes: 89,
    replies: 15,
    views: 567,
    createdAt: "1 روز پیش",
    isHot: true,
    isPinned: false,
    hasAnswer: true,
    difficulty: "advanced",
  },
  {
    id: "4",
    title: "نکات مهم برای آماده‌سازی مصاحبه ویزا",
    content: "چند نکته کلیدی که در مصاحبه ویزا باید رعایت کنید تا شانس قبولی‌تان بالا برود...",
    author: {
      name: "سارا موسوی",
      avatar: "/placeholder.svg?height=40&width=40",
      badge: "مشاور مهاجرت",
      reputation: 3456,
      country: "کانادا",
    },
    category: "tips",
    tags: ["مصاحبه", "ویزا", "نکات", "آمادگی"],
    likes: 234,
    replies: 31,
    views: 1890,
    createdAt: "3 روز پیش",
    isHot: true,
    isPinned: false,
    hasAnswer: true,
    difficulty: "intermediate",
  },
]

export function EnhancedCommunityForum() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('latest')
  const [posts, setPosts] = useState<ForumPost[]>(samplePosts)
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState(342)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 10) - 5)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes
      case 'replies':
        return b.replies - a.replies
      case 'views':
        return b.views - a.views
      default:
        return 0 // Latest is default order
    }
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'مبتدی'
      case 'intermediate': return 'متوسط'
      case 'advanced': return 'پیشرفته'
      default: return 'نامشخص'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
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
          به بزرگترین انجمن آنلاین مهاجران فارسی‌زبان خوش آمدید. تجربیات خود را به اشتراک بگذارید و از دیگران یاد بگیرید
        </p>
      </motion.div>

      {/* Stats Bar */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-green-600" />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-2xl font-bold text-green-600">{onlineUsers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">کاربر آنلاین</div>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <MessageSquare className="w-5 h-5 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {forumCategories.reduce((sum, cat) => sum + cat.postCount, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">پست کل</div>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <TrendingUp className="w-5 h-5 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">15,847</div>
              <div className="text-sm text-gray-600">عضو فعال</div>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <Star className="w-5 h-5 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">98%</div>
              <div className="text-sm text-gray-600">رضایت کاربران</div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                دسته‌بندی‌ها
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedCategory === 'all' 
                    ? 'bg-blue-100 border-blue-300 border' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCategory('all')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="font-medium">همه دسته‌ها</span>
                  </div>
                  <Badge variant="outline">
                    {forumCategories.reduce((sum, cat) => sum + cat.postCount, 0)}
                  </Badge>
                </div>
              </motion.div>

              {forumCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedCategory === category.id 
                      ? 'bg-blue-100 border-blue-300 border' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 ${category.color} rounded-full`}></div>
                      <span className="font-medium text-sm">{category.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {category.postCount}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{category.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Users className="w-3 h-3" />
                    <span>{category.activeUsers} فعال</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Posts List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-6 h-6" />
                  آخرین پست‌ها
                </CardTitle>
                <Button
                  onClick={() => setShowNewPostForm(true)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  پست جدید
                </Button>
              </div>
              
              {/* Search and Filter */}
              <div className="flex gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="جستجو در پست‌ها..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">جدیدترین</SelectItem>
                    <SelectItem value="popular">محبوب‌ترین</SelectItem>
                    <SelectItem value="replies">بیشترین پاسخ</SelectItem>
                    <SelectItem value="views">بیشترین بازدید</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence>
                {sortedPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedPost === post.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {post.isPinned && <Crown className="w-4 h-4 text-yellow-500" />}
                              {post.isHot && <Zap className="w-4 h-4 text-red-500" />}
                              <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors">
                                {post.title}
                              </h3>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-blue-600">{post.author.name}</span>
                              <Badge variant="outline" className="text-xs">
                                {post.author.badge}
                              </Badge>
                              <Badge className={getDifficultyColor(post.difficulty)}>
                                {getDifficultyText(post.difficulty)}
                              </Badge>
                              {post.hasAnswer && (
                                <Badge className="bg-green-100 text-green-800">
                                  پاس\
