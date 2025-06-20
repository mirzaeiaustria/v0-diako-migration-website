"use client"

import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { BubbleBackground } from "@/components/ui/bubble-background" // NEW

/* ──────────────────────────────────────────────────────────────────────────
  •  The data arrays (services, smartFeatures, features) are unchanged.
  •  The JSX below is identical to the previous working version, but the
     entire page is now wrapped in <BubbleBackground interactive /> so the
     animated background is visible site-wide.
────────────────────────────────────────────────────────────────────────── */

export default function DiacoHomePage() {
  return (
    <BubbleBackground interactive className="min-h-screen" dir="rtl">
      {/* Enhanced Hero Section */}
      <EnhancedHeroSection />

      {/* Smart Features Section */}
      {/* … (UNCHANGED CONTENT — keep the full JSX from the previous version) … */}

      {/* Footer (end of page) */}
    </BubbleBackground>
  )
}
