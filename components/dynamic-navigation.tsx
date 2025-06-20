"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Home,
  Users,
  Brain,
  FileText,
  MessageSquare,
  Star,
  ChevronDown,
  Globe,
  Phone,
  Mail,
} from "lucide-react"
import Link from "next/link"

const navigationItems = [
  {
    title: "خانه",
    href: "/",
    icon: Home,
    description: "صفحه اصلی سایت",
  },
  {
    title: "خدمات",
    icon: Users,
    description: "خدمات مهاجرتی",
    submenu: [
      { title: "مهاجرت تحصیلی", href: "/services/education", description: "پذیرش دانشگاهی و ویزای تحصیلی" },
      { title: "مهاجرت کاری", href: "/services/work", description: "ویزای کار و جاب آفر" },
      { title: "مهاجرت سرمایه‌گذاری", href: "/services/investment", description: "اقامت از طریق سرمایه‌گذاری" },
      { title: "مهاجرت خانوادگی", href: "/services/family", description: "پیوست به خانواده" },
      { title: "آوسبیلدونگ آلمان", href: "/services/ausbildung", description: "آموزش حرفه‌ای در آلمان" },
      { title: "آموزش زبان", href: "/services/language", description: "دوره‌های آموزش زبان" },
    ],
  },
  {
    title: "ابزارهای هوشمند",
    icon: Brain,
    description: "ابزارهای کمکی",
    submenu: [
      { title: "توصیه‌های هوشمند AI", href: "/tools/ai-recommendations", description: "پیشنهادات شخصی‌سازی شده" },
      { title: "محاسبه‌گر هزینه", href: "/tools/cost-calculator", description: "محاسبه هزینه‌های مهاجرت" },
      { title: "چک‌لیست مدارک", href: "/tools/document-checker", description: "بررسی مدارک مورد نیاز" },
      { title: "برنامه‌ریز زمانی", href: "/tools/timeline-planner", description: "برنامه‌ریزی مراحل مهاجرت" },
      { title: "دستیار هوشمند", href: "/tools/ai-assistant", description: "چت‌بات مهاجرتی" },
      { title: "مقایسه روش‌ها", href: "/tools/comparison", description: "مقایسه روش‌های مهاجرت" },
    ],
  },
  {
    title: "اطلاعات کشورها",
    icon: Globe,
    description: "راهنمای کشورها",
    submenu: [
      { title: "آلمان", href: "/countries/germany", description: "اطلاعات کامل مهاجرت به آلمان" },
      { title: "کانادا", href: "/countries/canada", description: "راهنمای مهاجرت به کانادا" },
      { title: "استرالیا", href: "/countries/australia", description: "مهاجرت به استرالیا" },
      { title: "اتریش", href: "/countries/austria", description: "زندگی و کار در اتریش" },
      { title: "هلند", href: "/countries/netherlands", description: "فرصت‌های مهاجرت به هلند" },
      { title: "سایر کشورها", href: "/countries", description: "مشاهده همه کشورها" },
    ],
  },
  {
    title: "جامعه",
    icon: MessageSquare,
    description: "انجمن و تجربیات",
    submenu: [
      { title: "تجربیات مهاجران", href: "/community/experiences", description: "داستان‌های واقعی مهاجرت" },
      { title: "انجمن مهاجران", href: "/community/forum", description: "بحث و تبادل نظر" },
      { title: "داستان‌های موفقیت", href: "/community/success-stories", description: "نمونه‌های موفق" },
    ],
  },
  {
    title: "منابع",
    icon: FileText,
    description: "اطلاعات و راهنما",
    submenu: [
      { title: "روش‌های مهاجرت", href: "/resources/methods", description: "انواع روش‌های مهاجرت" },
      { title: "سوالات متداول", href: "/faq", description: "پاسخ سوالات رایج" },
      { title: "وبلاگ", href: "/blog", description: "مقالات و اخبار مهاجرت" },
      { title: "آمار مهاجرت", href: "/resources/statistics", description: "آمار و ارقام مهاجرتی" },
    ],
  },
  {
    title: "درباره ما",
    icon: Star,
    description: "معرفی دیاکو",
    submenu: [
      { title: "چرا دیاکو؟", href: "/about/why-diako", description: "مزایای انتخاب دیاکو" },
      { title: "تیم ما", href: "/about/team", description: "کارشناسان مجرب" },
      { title: "تماس با ما", href: "/contact", description: "راه‌های ارتباطی" },
    ],
  },
]

export function DynamicNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    setActiveSubmenu(null)
  }

  const toggleSubmenu = (title: string) => {
    setActiveSubmenu(activeSubmenu === title ? null : title)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">د</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">دیاکو</h1>
                <p className="text-xs text-gray-600">سامانه هوشمند مهاجرت</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8 space-x-reverse">
              {navigationItems.map((item, index) => (
                <div key={index} className="relative group">
                  {item.submenu ? (
                    <div className="relative">
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-1 space-x-reverse text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                        <ChevronDown className="w-3 h-3" />
                      </Button>

                      {/* Dropdown Menu */}
                      <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-3">{item.title}</h3>
                          <div className="space-y-2">
                            {item.submenu.map((subitem, subindex) => (
                              <Link
                                key={subindex}
                                href={subitem.href}
                                className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <div className="font-medium text-gray-900">{subitem.title}</div>
                                <div className="text-sm text-gray-600">{subitem.description}</div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link href={item.href || "/"}>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-1 space-x-reverse text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Button>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Info & Mobile Menu Button */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="hidden md:flex items-center space-x-4 space-x-reverse text-sm">
                <a
                  href="tel:02188073287"
                  className="flex items-center space-x-1 space-x-reverse text-gray-600 hover:text-blue-600"
                >
                  <Phone className="w-4 h-4" />
                  <span>021-8807-3287</span>
                </a>
              </div>

              <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMenu}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" onClick={toggleMenu} />

            {/* Menu Panel */}
            <motion.div
              className="absolute top-16 left-0 right-0 bg-white shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <div className="p-4 space-y-2">
                {navigationItems.map((item, index) => (
                  <div key={index}>
                    {item.submenu ? (
                      <div>
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-right"
                          onClick={() => toggleSubmenu(item.title)}
                        >
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <item.icon className="w-5 h-5" />
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              activeSubmenu === item.title ? "rotate-180" : ""
                            }`}
                          />
                        </Button>

                        <AnimatePresence>
                          {activeSubmenu === item.title && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pr-8 space-y-1">
                                {item.submenu.map((subitem, subindex) => (
                                  <Link
                                    key={subindex}
                                    href={subitem.href}
                                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    onClick={toggleMenu}
                                  >
                                    <div className="font-medium text-gray-900">{subitem.title}</div>
                                    <div className="text-sm text-gray-600">{subitem.description}</div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link href={item.href || "/"} onClick={toggleMenu}>
                        <Button variant="ghost" className="w-full justify-start">
                          <item.icon className="w-5 h-5 ml-2" />
                          {item.title}
                        </Button>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Info in Mobile */}
              <div className="border-t p-4 bg-gray-50">
                <div className="space-y-3">
                  <a href="tel:02188073287" className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>021-8807-3287</span>
                  </a>
                  <a href="mailto:info@diaco.eu" className="flex items-center space-x-2 space-x-reverse text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>info@diaco.eu</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navigation */}
      <div className="h-16" />
    </>
  )
}
