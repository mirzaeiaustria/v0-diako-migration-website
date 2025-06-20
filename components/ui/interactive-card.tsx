"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  hoverScale?: number
  tapScale?: number
}

export function InteractiveCard({
  children,
  className = "",
  hoverScale = 1.02,
  tapScale = 0.98,
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      whileHover={{
        scale: hoverScale,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: tapScale,
        transition: { duration: 0.1 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? 5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
