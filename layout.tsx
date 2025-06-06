import type React from "react"
import type { Metadata } from "next"
import { Vazirmatn as FontVazirmatn } from "next/font/google"
import "./globals.css"
import PreHeaderBanner from "@/components/pre-header-banner" // Added
import Header from "@/components/header"
import Footer from "@/components/footer"

const fontVazirmatn = FontVazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-vazirmatn",
})

export const metadata: Metadata = {
  title: "هلدینگ مهاجرتی دیاکو | مشاوره مهاجرت به اروپا ",
  description:
    "بهترین مشاوره مهاجرتی با ۱۵ سال تجربه. خدمات مهاجرت تحصیلی، کاری، سرمایه‌گذاری و ویزای توریستی به کشورهای اروپا، آمریکا و کانادا.",
  keywords: "مهاجرت, ویزا, تحصیل در خارج, کار در خارج, سرمایه‌گذاری, آلمان, کانادا, اتریش",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={`${fontVazirmatn.variable} font-sans`}>
      <body>
        {/* <PreHeaderBanner />  Removed from here */}
        <Header />
        <PreHeaderBanner /> {/* Added here, below Header */}
        {children}
        <Footer />
      </body>
    </html>
  )
}
