"use client"

import { useState } from "react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: string
  publishedAt: string
  isPublished: boolean
  isFeatured: boolean
  views: number
  likes: number
}

const categories = [
  { id: "news", name: "اخبار و تغییرات", count: 45 },
  { id: "guides", name: "راهنمای مهاجرت", count: 38 },
  { id: "success-stories", name: "داستان‌های موفقیت", count: 28 },
  { id: "lifestyle", name: "سبک زندگی", count: 25 },
  { id: "expert-advice", name: "مشاوره تخصصی", count: 20 },
]

const mockPosts: BlogPost[] = [
  {
    id: "1",
    title: "آخرین تغییرات قوانین مهاجرت به کانادا در سال ۲۰۲۵",
    slug: "canada-immigration-changes-2025",
    excerpt: "بررسی کامل جدیدترین تغییرات در سیستم Express Entry",
    content: "محتوای کامل مقاله...",
    category: "news",
    tags: ["کانادا", "Express Entry", "قوانین جدید"],
    author: "دکتر احمد محمدی",
    publishedAt: "1403/10/15",
    isPublished: true,
    isFeatured: true,
    views: 1250,
    likes: 89,
  },
  // سایر مقالات...
]

export function BlogAdminPanel() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    author: "",
    isPublished: false,
    isFeatured: false,
  })

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.includes(searchTerm) || post.excerpt.includes(searchTerm)
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreatePost = () => {
    const post: BlogPost = {
      id: Date.now().toString(),
      slug: newPost.title.toLowerCase().replace(/\s+/g, "-"),
      ...newPost,
      tags: newPost.tags.split(",").map(tag => tag.trim()),
      publishedAt: new Date().toLocaleDateString("fa-IR"),
      views: 0,
      likes: 0,
    }
    
    setPosts([post, ...posts])
    setNewPost({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tags: "",
      author: "",
      isPublished: false,
      isFeatured: false,
    })
    setIsCreateDialogOpen(false)
  }

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  const handleTogglePublish = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, isPublished: !post.isPublished } : post
    ))
  }

  const handleToggleFeatured = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, isFeatured: !post.isFeatured } : post
    ))
  }

  const stats = {
    totalPosts: posts.length,
    publishedPosts: posts.filter(p => p.isPublished).length,
    draftPosts: posts.filter(p => !p.isPublished).length,
    featuredPosts: posts.filter(p => p.isFeatured).length,
    totalViews: posts.reduce((sum, p) => sum + p.views, 0),
    totalLikes: posts.reduce((sum, p) => sum + p.likes, 0),
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">مدیریت وبلاگ</h1>
            <p className="text-gray-600 mt-2">مدیریت مقالات و محتوای وبلاگ د\
