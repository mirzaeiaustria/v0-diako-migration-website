"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Brain,
  Calculator,
  FileText,
  MessageSquare,
  Users,
  Clock,
  TrendingUp,
  Sparkles,
  Bot,
  CheckCircle,
  Globe,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ParallaxSection } from "@/components/ui/parallax-section"

// Import the tool components (these would be the actual components from the attachments)
// For now, we'll create placeholder modals
const CostCalculator = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
      <h3 className="text-lg font-bold mb-4">محاسبه‌گر هزینه مهاجرت</h3>
      <p className="text-gray-600 mb-4">این ابزار به زودی راه‌اندازی خواهد شد...</p>
      <Button onClick={onClose}>بستن</Button>
    </div>
  </div>
)

const DocumentChecker = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
      <h3 className="text-lg font-bold mb-4">بررسی مدارک</h3>
      <p className="text-gray-600 mb-4">این ابزار به زودی راه‌اندازی خواهد شد...</p>
      <Button onClick={onClose}>بستن</Button>
    </div>
  </div>
)

const AIChat = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
      <h3 className="text-lg font-bold mb-4">دستیار هوشمند</h3>
      <p className="text-gray-600 mb-4">این ابزار به زودی راه‌اندازی خواهد شد...</p>
      <Button onClick={onClose}>بستن</Button>
    </div>
  </div>
)

const CommunityForum = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
      <h3 className="text-lg font-bold mb-4">انجمن مهاجران</h3>
      <p className="text-gray-600 mb-4">این ابزار به زودی راه‌اندازی خواهد شد...</p>
      <Button onClick={onClose}>بستن</Button>
    </div>
  </div>
)

const TimelinePlanner = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
      <h3 className="text-lg font-bold mb-4">برنامه‌ریز زمانی</h3>
      <p className="text-gray-600 mb-4">این ابزار به زودی راه‌اندازی خواهد شد...</p>
      <Button onClick={onClose}>بستن</Button>
    </div>
  </div>
)

const aiTools = [
  {
    id: "ai-recommendations",
    title: "توصیه‌های هوشمند AI",
    description: "دریافت توصیه‌های شخصی‌سازی شده بر اساس پروفایل و ترجیحات شما",
    icon: Brain,
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    features: ["تحلیل پروفایل", "مقایسه کشورها", "درصد تطابق", "پیش‌بینی موفقیت"],
    badge: "جدید",
    component: null,
  },
  {
    id: "cost-calculator",
    title: "محاسبه‌گر هزینه",
    description: "محاسبه دقیق هزینه‌های مهاجرت و زندگی در کشور مقصد",
    icon: Calculator,
    color: "bg-gradient-to-br from-green-500 to-emerald-500",
    features: ["هزینه ویزا", "هزینه زندگی", "محاسبه خانوادگی", "مقایسه کشورها"],
    badge: "محبوب",
    component: CostCalculator,
  },
  {
    id: "document-checker",
    title: "بررسی مدارک",
    description: "چک‌لیست کامل مدارک مورد نیاز برای هر کشور و نوع ویزا",
    icon: FileText,
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
    features: ["چک‌لیست مدارک", "پیگیری وضعیت", "یادآوری مهلت‌ها", "راهنمای تکمیل"],
    badge: "ضروری",
    component: DocumentChecker,
  },
  {
    id: "ai-chat",
    title: "دستیار هوشمند",
    description: "پاسخ فوری به سؤالات مهاجرتی با استفاده از هوش مصنوعی",
    icon: Bot,
    color: "bg-gradient-to-br from-indigo-500 to-purple-500",
    features: ["پاسخ آنی", "مشاوره 24/7", "پشتیبانی چندزبانه", "تاریخچه گفتگو"],
    badge: "هوشمند",
    component: AIChat,
  },
  {
    id: "community-forum",
    title: "انجمن مهاجران",
    description: "اشتراک تجربیات و ارتباط با سایر متقاضیان مهاجرت",
    icon: Users,
    color: "bg-gradient-to-br from-orange-500 to-red-500",
    features: ["تجربیات واقعی", "سؤال و جواب", "گروه‌های تخصصی", "رویدادهای آنلاین"],
    badge: "اجتماعی",
    component: CommunityForum,
  },
  {
    id: "timeline-planner",
    title: "برنامه‌ریز زمانی",
    description: "برنامه‌ریزی مرحله‌ای فرآیند مهاجرت با تایم‌لاین دقیق",
    icon: Clock,
    color: "bg-gradient-to-br from-teal-500 to-green-500",
    features: ["تایم‌لاین شخصی", "یادآوری مراحل", "پیگیری پیشرفت", "تنظیم اولویت‌ها"],
    badge: "سازمان‌دهی",
    component: TimelinePlanner,
  },
]

const stats = [
  { number: "50,000+", label: "کاربر فعال", icon: Users },
  { number: "95%", label: "دقت پیش‌بینی", icon: TrendingUp },
  { number: "24/7", label: "پشتیبانی آنلاین", icon: MessageSquare },
  { number: "15+", label: "کشور پشتیبانی شده", icon: Globe },
]

export function AdvancedAIToolsSection() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const openTool = (toolId: string) => {
    setActiveModal(toolId)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const renderModal = () => {
    const tool = aiTools.find((t) => t.id === activeModal)
    if (!tool || !tool.component) return null

    const Component = tool.component
    return <Component onClose={closeModal} />
  }

  return (
    <>
      <ParallaxSection className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/images/ai-tools-bg.jpg')] bg-cover bg-center opacity-10"></div>
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 space-x-reverse bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
              >
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-medium">ابزارهای هوشمند نسل جدید</span>
              </motion.div>

              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                سامانه هوشمند مهاجرت
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                با استفاده از آخرین فناوری‌های هوش مصنوعی، مسیر مهاجرت خود را هوشمندانه برنامه‌ریزی کنید
              </p>
            </div>
          </ScrollReveal>

          {/* Stats Section */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <stat.icon className="w-8 h-8 text-purple-300 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* AI Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiTools.map((tool, index) => (
              <ScrollReveal key={tool.id} direction="up" delay={index * 0.1}>
                <motion.div whileHover={{ y: -10, scale: 1.02 }} transition={{ duration: 0.3 }} className="group">
                  <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`w-14 h-14 ${tool.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          <tool.icon className="w-7 h-7 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                          {tool.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-white group-hover:text-purple-200 transition-colors">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-6 leading-relaxed">{tool.description}</p>

                      <div className="space-y-3 mb-6">
                        {tool.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center space-x-2 space-x-reverse"
                          >
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-sm text-gray-300">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={() => openTool(tool.id)}
                          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg"
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          شروع استفاده
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Call to Action */}
          <ScrollReveal direction="up" delay={0.4}>
            <div className="text-center mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
              >
                <h3 className="text-2xl font-bold text-white mb-4">آماده شروع مسیر هوشمند مهاجرت هستید؟</h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  با استفاده از ابزارهای پیشرفته ما، احتمال موفقیت در مهاجرت خود را تا 85% افزایش دهید
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-3 rounded-xl shadow-lg"
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    شروع ارزیابی رایگان
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </ParallaxSection>

      {/* Render Active Modal */}
      {renderModal()}
    </>
  )
}
