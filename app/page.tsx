"use client"

import BlogAdminPanel from "../components/blog-admin-panel"
import Image from "next/image"

export default function Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="w-full">
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
          <Image
            src="/images/banner123.jpg"
            alt="هلدینگ مهاجرتی دیاکو - با بیش از 20 سال تجربه موفق"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        <BlogAdminPanel />
      </section>
    </div>
  )
}
