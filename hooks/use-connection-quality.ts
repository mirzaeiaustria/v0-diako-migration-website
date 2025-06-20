"use client"

import { useState, useEffect } from "react"

export function useConnectionQuality() {
  const [isLowQuality, setIsLowQuality] = useState(false)

  useEffect(() => {
    // Check connection quality
    if (typeof navigator !== "undefined" && "connection" in navigator) {
      const connection = (navigator as any).connection
      if (connection) {
        const checkConnection = () => {
          setIsLowQuality(connection.effectiveType === "slow-2g" || connection.effectiveType === "2g")
        }

        checkConnection()
        connection.addEventListener("change", checkConnection)

        return () => {
          connection.removeEventListener("change", checkConnection)
        }
      }
    }
  }, [])

  return { isLowQuality }
}
