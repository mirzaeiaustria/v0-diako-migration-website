import type React from "react"
interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: string
}

export function GradientText({ children, className = "", gradient = "from-blue-600 to-teal-600" }: GradientTextProps) {
  return <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>{children}</span>
}
