import Image from "next/image"

interface CountryFlagDisplayProps {
  countryId: string
  countryName: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function CountryFlagDisplay({ countryId, countryName, size = "md", className = "" }: CountryFlagDisplayProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden border border-gray-200 ${className}`}>
      <Image
        src={`/flags/${countryId}.png`}
        alt={`پرچم ${countryName}`}
        width={size === "sm" ? 16 : size === "md" ? 24 : 32}
        height={size === "sm" ? 16 : size === "md" ? 24 : 32}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = `/placeholder.svg?height=${size === "sm" ? 16 : size === "md" ? 24 : 32}&width=${size === "sm" ? 16 : size === "md" ? 24 : 32}&query=flag of ${countryName}`
        }}
      />
    </div>
  )
}
