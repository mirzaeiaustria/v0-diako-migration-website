"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Star, Shield, Zap, Wifi, Bell, QrCode, Download, Check } from "lucide-react"
import { ScrollReveal } from "@/components/ui/scroll-reveal"

export function MobileAppSection() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [linkSent, setLinkSent] = useState(false)

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault()
    if (phoneNumber.length >= 10) {
      setLinkSent(true)
    }
  }

  const features = [
    { icon: Zap, title: "سرعت بالا", description: "دسترسی سریع به تمام خدمات" },
    { icon: Wifi, title: "حالت آفلاین", description: "دسترسی به محتوا بدون اینترنت" },
    { icon: Bell, title: "اعلان‌های مهم", description: "اطلاع از آخرین اخبار مهاجرتی" },
    { icon: Shield, title: "امنیت بالا", description: "حفاظت از اطلاعات شخصی" },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <ScrollReveal direction="up">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 space-x-reverse bg-blue-100 rounded-full px-6 py-2 mb-6"
            >
              <Smartphone className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">اپلیکیشن موبایل دیاکو</span>
            </motion.div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">مهاجرت در جیب شما</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              با نصب اپلیکیشن موبایل دیاکو، به تمامی خدمات مهاجرتی ما در هر زمان و مکان دسترسی داشته باشید
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* App Features */}
          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 p-6 rounded-2xl">
                <div className="flex items-center space-x-2 space-x-reverse mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <Badge variant="outline">+10,000 نصب فعال</Badge>
                  <Badge variant="outline">نسخه 2.5.1</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <div className="bg-blue-100 p-2 rounded-full">
                        <feature.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{feature.title}</h3>
                        <p className="text-xs text-gray-600">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  {[
                    "مشاوره آنلاین با کارشناسان",
                    "دسترسی به تمام مقالات و راهنماها",
                    "پیگیری وضعیت درخواست‌ها",
                    "اطلاع از آخرین اخبار مهاجرتی",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Form */}
              {!linkSent ? (
                <Card>
                  <CardHeader>
                    <CardTitle>دریافت لینک دانلود</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSendLink} className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          type="tel"
                          placeholder="09123456789"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="flex-1"
                          required
                        />
                        <Button type="submit">ارسال لینک</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-6 text-center">
                    <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-green-800 mb-2">لینک دانلود ارسال شد</h3>
                    <p className="text-green-700 text-sm">لینک دانلود به شماره {phoneNumber} ارسال شد</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollReveal>

          {/* Phone Mockup */}
          <ScrollReveal direction="right">
            <div className="relative flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="border-[12px] border-black rounded-[40px] overflow-hidden shadow-2xl">
                  <img
                    src="/mobile-app-preview.png"
                    alt="اپلیکیشن موبایل دیاکو"
                    className="w-[280px] h-[560px] object-cover"
                  />
                </div>
                <div className="absolute top-0 left-1/2 w-32 h-6 bg-black rounded-b-xl transform -translate-x-1/2"></div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute top-10 right-10 bg-white rounded-full p-3 shadow-lg"
              >
                <Bell className="w-6 h-6 text-blue-600" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1.5 }}
                className="absolute bottom-20 left-10 bg-white rounded-full p-3 shadow-lg"
              >
                <Shield className="w-6 h-6 text-green-600" />
              </motion.div>
            </div>
          </ScrollReveal>
        </div>

        {/* Download Options */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Android */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  اندروید
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Google Play
                </Button>
                <Button variant="outline" className="w-full">
                  کافه بازار
                </Button>
                <Button variant="outline" className="w-full">
                  مایکت
                </Button>
              </CardContent>
            </Card>

            {/* iOS */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  iOS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  App Store
                </Button>
                <Button variant="outline" className="w-full">
                  سیب‌اپ
                </Button>
                <Button variant="outline" className="w-full">
                  TestFlight
                </Button>
              </CardContent>
            </Card>

            {/* QR Code */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <QrCode className="w-5 h-5" />
                  کد QR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-4 rounded-lg mb-4 mx-auto w-fit">
                  <img src="/qr-code-app.png" alt="QR Code" className="w-32 h-32" />
                </div>
                <p className="text-sm text-gray-600">کد QR را اسکن کنید</p>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
