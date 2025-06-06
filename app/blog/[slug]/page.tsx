"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  User,
  Clock,
  Share2,
  Bookmark,
  ThumbsUp,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

interface BlogPost {
  id: string
  title: string
  content: string
  imageUrl: string
  category: string
  tags: string[]
  author: string
  authorBio: string
  authorImage: string
  publishedAt: string
  readTime: string
  likes: number
  comments: number
  isLiked: boolean
  isBookmarked: boolean
}

interface Comment {
  id: string
  author: string
  content: string
  publishedAt: string
  likes: number
  replies?: Comment[]
}

const blogPost: BlogPost = {
  id: "1",
  title: "آخرین تغییرات قوانین مهاجرت به کانادا در سال ۲۰۲۵",
  content: `
    <p>سیستم مهاجرت کانادا در سال ۲۰۲۵ تغییرات مهمی را تجربه کرده است که بر متقاضیان ایرانی تأثیر قابل توجهی خواهد داشت. در این مقاله، به بررسی کامل این تغییرات و تأثیرات آن‌ها می‌پردازیم.</p>

    <h2>تغییرات در سیستم Express Entry</h2>
    <p>یکی از مهم‌ترین تغییرات در سیستم Express Entry کانادا، معرفی دسته‌بندی‌های جدید بر اساس تخصص و زبان فرانسه است. این تغییرات شامل موارد زیر می‌شود:</p>

    <ul>
      <li>افزایش امتیاز برای متقاضیان دارای مدرک زبان فرانسه</li>
      <li>ایجاد دسته‌بندی‌های ویژه برای مشاغل مورد نیاز</li>
      <li>تغییر در سیستم امتیازدهی سن و تحصیلات</li>
      <li>اولویت‌دهی به متقاضیان دارای تجربه کاری کانادا</li>
    </ul>

    <h2>تأثیر بر متقاضیان ایرانی</h2>
    <p>این تغییرات تأثیرات مختلفی بر متقاضیان ایرانی خواهد داشت. از یک طرف، فرصت‌های جدیدی برای متخصصان در حوزه‌های خاص ایجاد شده است، اما از طرف دیگر، رقابت در برخی دسته‌بندی‌ها شدیدتر شده است.</p>

    <h3>نکات مهم برای متقاضیان:</h3>
    <ol>
      <li>بررسی دقیق شرایط جدید قبل از ارسال درخواست</li>
      <li>تقویت مهارت‌های زبانی، به ویژه فرانسه</li>
      <li>کسب تجربه کاری در مشاغل مورد نیاز</li>
      <li>مشاوره با متخصصان مهاجرت</li>
    </ol>

    <h2>راهکارهای موفقیت</h2>
    <p>برای موفقیت در شرایط جدید، متقاضیان باید استراتژی خود را بازنگری کنند. مهم‌ترین راهکارها عبارتند از:</p>

    <blockquote>
      "آمادگی کامل و شناخت دقیق قوانین جدید، کلید موفقیت در مهاجرت به کانادا است."
    </blockquote>

    <p>در ادامه، به بررسی جزئیات بیشتر این تغییرات و ارائه راهنمای عملی برای متقاضیان خواهیم پرداخت...</p>
  `,
  imageUrl: "/placeholder.svg?height=400&width=800",
  category: "news",
  tags: ["کانادا", "Express Entry", "قوانین جدید", "مهاجرت ۲۰۲۵"],
  author: "دکتر احمد محمدی",
  authorBio: "متخصص مهاجرت با بیش از 15 سال تجربه در زمینه مهاجرت به کانادا و استرالیا",
  authorImage: "/placeholder.svg?height=80&width=80",
  publishedAt: "1403/10/15",
  readTime: "8 دقیقه",
  likes: 124,
  comments: 18,
  isLiked: false,
  isBookmarked: false,
}

const comments: Comment[] = [
  {
    id: "1",
    author: "علی رضایی",
    content: "مطلب بسیار مفیدی بود. آیا این تغییرات بر متقاضیان فعلی که در صف انتظار هستند تأثیر می‌گذارد؟",
    publishedAt: "1403/10/16",
    likes: 5,
  },
  {
    id: "2",
    author: "مریم احمدی",
    content: "ممنون از اطلاعات کاملی که ارائه دادید. لطفاً در مورد تأثیر این تغییرات بر برنامه PNP نیز توضیح دهید.",
    publishedAt: "1403/10/16",
    likes: 3,
    replies: [
      {
        id: "2-1",
        author: "دکتر احمد محمدی",
        content: "سلام مریم جان، در مورد PNP مقاله جداگانه‌ای در حال تهیه است که به زودی منتشر خواهد شد.",
        publishedAt: "1403/10/16",
        likes: 2,
      },
    ],
  },
]

const relatedPosts = [
  {
    id: "2",
    title: "راهنمای کامل برنامه PNP کانادا",
    imageUrl: "/placeholder.svg?height=200&width=300",
    publishedAt: "1403/10/10",
    readTime: "12 دقیقه",
  },
  {
    id: "3",
    title: "نکات مهم برای آزمون زبان IELTS",
    imageUrl: "/placeholder.svg?height=200&width=300",
    publishedAt: "1403/10/08",
    readTime: "6 دقیقه",
  },
  {
    id: "4",
    title: "مقایسه استان‌های کانادا برای مهاجرت",
    imageUrl: "/placeholder.svg?height=200&width=300",
    publishedAt: "1403/10/05",
    readTime: "15 دقیقه",
  },
]

export default function BlogPostPage() {
  const [isLiked, setIsLiked] = useState(blogPost.isLiked)
  const [isBookmarked, setIsBookmarked] = useState(blogPost.isBookmarked)
  const [likes, setLikes] = useState(blogPost.likes)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [commentAuthor, setCommentAuthor] = useState("")

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = blogPost.title

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, "_blank")
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank")
        break
      case "copy":
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
    setShowShareMenu(false)
  }

  const handleCommentSubmit = () => {
    if (newComment.trim() && commentAuthor.trim()) {
      // Add comment logic here
      setNewComment("")
      setCommentAuthor("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/blog" className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">د</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">وبلاگ دیاکو</h1>
                <p className="text-sm text-gray-600">بازگشت به وبلاگ</p>
              </div>
            </Link>

            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="outline" size="sm">
                ورود
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-teal-600">
                مشاوره رایگان
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Article Header */}
              <div className="relative h-64 md:h-80">
                <Image
                  src={blogPost.imageUrl || "/placeholder.svg"}
                  alt={blogPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 right-6 left-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blogPost.tags.map((tag, index) => (
                      <Badge key={index} className="bg-white/20 text-white border-white/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">{blogPost.title}</h1>
                </div>
              </div>

              {/* Article Meta */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{blogPost.publishedAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{blogPost.readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{blogPost.author}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLike}
                        className={`${isLiked ? "text-red-600 border-red-600" : ""}`}
                      >
                        <ThumbsUp className={`w-4 h-4 ml-1 ${isLiked ? "fill-current" : ""}`} />
                        {likes}
                      </Button>
                    </motion.div>

                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleBookmark}
                        className={`${isBookmarked ? "text-blue-600 border-blue-600" : ""}`}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                      </Button>
                    </motion.div>

                    <div className="relative">
                      <Button variant="outline" size="sm" onClick={() => setShowShareMenu(!showShareMenu)}>
                        <Share2 className="w-4 h-4" />
                      </Button>

                      {showShareMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border p-2 z-10"
                        >
                          <div className="flex flex-col gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleShare("facebook")}
                              className="justify-start"
                            >
                              <Facebook className="w-4 h-4 ml-2" />
                              فیسبوک
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleShare("twitter")}
                              className="justify-start"
                            >
                              <Twitter className="w-4 h-4 ml-2" />
                              توییتر
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleShare("linkedin")}
                              className="justify-start"
                            >
                              <Linkedin className="w-4 h-4 ml-2" />
                              لینکدین
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleShare("copy")}
                              className="justify-start"
                            >
                              {copied ? <Check className="w-4 h-4 ml-2" /> : <Copy className="w-4 h-4 ml-2" />}
                              {copied ? "کپی شد!" : "کپی لینک"}
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-lg"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
              </div>

              {/* Author Bio */}
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={blogPost.authorImage || "/placeholder.svg"}
                      alt={blogPost.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{blogPost.author}</h3>
                    <p className="text-gray-600 text-sm">{blogPost.authorBio}</p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="p-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  نظرات ({comments.length})
                </h3>

                {/* Add Comment Form */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-4">نظر خود را بنویسید</h4>
                  <div className="space-y-4">
                    <Input
                      placeholder="نام شما"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                    />
                    <Textarea
                      placeholder="نظر شما..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={4}
                    />
                    <Button onClick={handleCommentSubmit} disabled={!newComment.trim() || !commentAuthor.trim()}>
                      ارسال نظر
                    </Button>
                  </div>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">{comment.author.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-semibold text-gray-900">{comment.author}</h5>
                            <span className="text-sm text-gray-500">{comment.publishedAt}</span>
                          </div>
                          <p className="text-gray-700 mb-2">{comment.content}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                              <ThumbsUp className="w-4 h-4" />
                              {comment.likes}
                            </button>
                            <button className="text-gray-500 hover:text-blue-600">پاسخ</button>
                          </div>

                          {/* Replies */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="mt-4 mr-6 space-y-4">
                              {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex items-start gap-3">
                                  <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-semibold text-xs">{reply.author.charAt(0)}</span>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h6 className="font-semibold text-gray-900 text-sm">{reply.author}</h6>
                                      <span className="text-xs text-gray-500">{reply.publishedAt}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm">{reply.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Related Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">مطالب مرتبط</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                      <motion.div
                        className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        whileHover={{ x: 5 }}
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={post.imageUrl || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2">{post.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{post.publishedAt}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="bg-gradient-to-br from-blue-600 to-teal-600 text-white">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">عضویت در خبرنامه</h3>
                  <p className="text-blue-100 text-sm mb-4">آخرین مطالب را در ایمیل خود دریافت کنید</p>
                  <div className="space-y-3">
                    <Input
                      placeholder="ایمیل شما"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                    />
                    <Button className="w-full bg-white text-blue-600 hover:bg-white/90">عضویت</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">برچسب‌های محبوب</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "کانادا",
                      "آلمان",
                      "استرالیا",
                      "ویزای کاری",
                      "Express Entry",
                      "آوسبیلدونگ",
                      "مهاجرت تحصیلی",
                      "PNP",
                    ].map((tag) => (
                      <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-blue-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
