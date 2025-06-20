import { notFound } from "next/navigation"
import type { Metadata } from "next"
import CountryDetailPage from "@/components/country-detail-page"
import { getCountryBySlug, getAllCountrySlugs } from "@/lib/countries-data"

interface CountryPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllCountrySlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const country = getCountryBySlug(params.slug)

  if (!country) {
    return {
      title: "کشور یافت نشد - دیاکو",
    }
  }

  return {
    title: `مهاجرت به ${country.name} - مشاورین هلدینگ مهاجرتی دیاکو`,
    description: `راهنمای کامل مهاجرت به ${country.name}: شرایط زندگی، هزینه‌ها، روش‌های مهاجرتی و اطلاعات کاربردی`,
    keywords: `مهاجرت ${country.name}, ویزا ${country.name}, زندگی در ${country.name}, هزینه زندگی ${country.name}`,
    openGraph: {
      title: `مهاجرت به ${country.name} - دیاکو`,
      description: country.heroSubtitle,
      images: [country.heroImage],
    },
  }
}

export default function CountryPage({ params }: CountryPageProps) {
  const country = getCountryBySlug(params.slug)

  if (!country) {
    notFound()
  }

  return <CountryDetailPage country={country} />
}
