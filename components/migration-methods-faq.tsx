"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  methods: string[]
}

const faqs: FAQ[] = [
  {
    id: "faq-1",
    question: "آیا برای مهاجرت کاری حتماً باید پیشنهاد شغلی داشته باشم؟",
    answer:
      "در اکثر کشورها، داشتن پیشنهاد شغلی برای مهاجرت کاری ضروری است. اما برخی کشورها مانند کانادا و استرالیا سیستم‌های امتیازبندی دارند که بدون پیشنهاد شغلی نیز می‌توانید واجد شرایط باشید، هرچند داشتن پیشنهاد شغلی امتیاز شما را افزایش می‌دهد.",
    category: "مهاجرت کاری",
    methods: ["skilled-worker"],
  },
  {
    id: "faq-2",
    question: "حداقل سرمایه لازم برای مهاجرت از طریق سرمایه‌گذاری چقدر است؟",
    answer:
      "حداقل سرمایه لازم بسته به کشور متفاوت است. برای مثال، در ترکیه با خرید ملک به ارزش 400,000 دلار، در کانادا با سرمایه‌گذاری حدود 1.2 میلیون دلار کانادا، و در آمریکا با سرمایه‌گذاری 800,000 تا 1,050,000 دلار می‌توانید اقدام کنید.",
    category: "مهاجرت سرمایه‌گذاری",
    methods: ["investment"],
  },
  {
    id: "faq-3",
    question: "آیا با ویزای دانشجویی می‌توان به اقامت دائم رسید؟",
    answer:
      "بله، در بسیاری از کشورها مسیرهایی برای تبدیل ویزای دانشجویی به اقامت دائم وجود دارد. پس از فارغ‌التحصیلی، معمولاً فرصتی برای جستجوی کار خواهید داشت و با یافتن شغل مناسب، می‌توانید برای ویزای کاری و سپس اقامت دائم اقدام کنید.",
    category: "مهاجرت تحصیلی",
    methods: ["study"],
  },
]

export function MigrationMethodsFAQ() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // فیلتر سوالات بر اساس جستجو و دسته‌بندی
  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      searchTerm === "" ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = activeCategory === "all" || faq.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // استخراج دسته‌بندی‌های منحصر به فرد
  const uniqueCategories = ["all", ...new Set(faqs.map((faq) => faq.category))]

  return (
    <Card className="border shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">سوالات متداول روش‌های مهاجرتی</CardTitle>
        <CardDescription>پاسخ سوالات رایج درباره روش‌های مختلف مهاجرت</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="relative mb-6">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="جستجو در سوالات متداول..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
          </div>

          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
            <TabsList className="flex flex-wrap justify-start mb-4 gap-2">
              <TabsTrigger value="all">همه سوالات</TabsTrigger>
              {uniqueCategories
                .filter((cat) => cat !== "all")
                .map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
            </TabsList>
          </Tabs>

          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-right">{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <div className="text-right mb-2">{faq.answer}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8 text-gray-500">
              نتیجه‌ای یافت نشد. لطفاً عبارت جستجوی دیگری را امتحان کنید.
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" onClick={() => (window.location.href = "#contact")}>
            پرسش سوال جدید
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
