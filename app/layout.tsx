import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ReactQueryProvider } from "@/components/react-query-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "هلدینگ مهاجرتی دیاکو | سامانه هوشمند مهاجرت به اروپا",
  description:
    "سامانه آنلاین هوشمند و پیشرفته بررسی شرایط مهاجرت به اروپا. مشاوره تخصصی مهاجرت تحصیلی، کاری، سرمایه‌گذاری و خانوادگی با بیش از 10 سال تجربه",
  keywords:
    "مهاجرت به اروپا, مهاجرت تحصیلی, مهاجرت کاری, آوسبیلدونگ آلمان, مهاجرت سرمایه‌گذاری, ویزای اروپا, مشاوره مهاجرت, دیاکو",
  authors: [{ name: "هلدینگ مهاجرتی دیاکو" }],
  creator: "هلدینگ مهاجرتی دیاکو",
  publisher: "هلدینگ مهاجرتی دیاکو",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://diaco.eu",
    siteName: "هلدینگ مهاجرتی دیاکو",
    title: "هلدینگ مهاجرتی دیاکو | سامانه هوشمند مهاجرت به اروپا",
    description: "سامانه آنلاین هوشمند و پیشرفته بررسی شرایط مهاجرت به اروپا",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "هلدینگ مهاجرتی دیاکو",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "هلدینگ مهاجرتی دیاکو | سامانه هوشمند مهاجرت به اروپا",
    description: "سامانه آنلاین هوشمند و پیشرفته بررسی شرایط مهاجرت به اروپا",
    images: ["/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://diaco.eu",
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "هلدینگ مهاجرتی دیاکو",
              url: "https://diaco.eu",
              logo: "https://diaco.eu/images/logo.png",
              description: "سامانه آنلاین هوشمند و پیشرفته بررسی شرایط مهاجرت به اروپا",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IR",
                addressLocality: "تهران",
                addressRegion: "تهران",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+98-21-8807-3287",
                contactType: "customer service",
              },
              sameAs: ["https://instagram.com/diaco.eu", "https://linkedin.com/company/diaco", "https://t.me/diaco_eu"],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
