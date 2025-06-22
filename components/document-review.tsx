"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Map, ListChecks, Info, Upload, UserCheck } from "lucide-react"

// --- Interfaces for Data Structure ---

interface DocumentItem {
  name: string // Name of the document
  description?: string // Optional description or example
}

interface ImmigrationMethodDetails {
  name: string // Name of the immigration method (e.g., "مهاجرت تحصیلی")
  documents: DocumentItem[] // List of documents required for this method
}

interface CountryDetails {
  name: string // Name of the country (e.g., "آلمان")
  methods: ImmigrationMethodDetails[] // List of immigration methods available for this country
}

interface Region {
  name: string // Name of the region (e.g., "اروپا")
  countries: CountryDetails[] // List of countries within this region
}

// --- Comprehensive Immigration Data ---

// General documents applicable to most immigration paths
const generalImmigrationDocuments: DocumentItem[] = [
  { name: "گذرنامه معتبر", description: "(با حداقل 6 ماه اعتبار)" },
  { name: "عکس پرسنلی", description: "(طبق استانداردهای کشور مقصد)" },
  { name: "شناسنامه (ترجمه و تأییدشده)" },
  { name: "سند ازدواج/طلاق (در صورت وجود، ترجمه و تأییدشده)" },
  { name: "مدارک مالی (صورت‌حساب بانکی، نامه حمایت مالی)" },
  { name: "بیمه درمانی (معتبر در کشور مقصد)" },
  { name: "گواهی عدم سوءپیشینه" },
  { name: "فرم‌های درخواست (مخصوص نوع ویزا)" },
  { name: "مدرک اقامت (قرارداد اجاره، سند ملک یا نامه میزبان)" },
  { name: "مدرک زبان (مانند آیلتس، تافل، گوته، دلف، بسته به کشور)" },
  { name: "رسید پرداخت هزینه‌های ویزا/درخواست" },
]

// Specific immigration methods and their documents, categorized by region and country
const comprehensiveImmigrationData: Region[] = [
  {
    region: "اروپا",
    countries: [
      {
        name: "آلمان",
        methods: [
          {
            name: "مهاجرت تحصیلی",
            documents: [
              { name: "نامه پذیرش از مؤسسه آموزشی معتبر" },
              { name: "ریزنمرات و مدارک تحصیلی (ترجمه و تأییدشده)" },
              { name: "رسید پرداخت شهریه یا مدرک بورسیه" },
              { name: "مدارک مالی (مانند حساب مسدود: 11,904 یورو در سال)", description: "11,904 یورو در سال" },
              { name: "طرح تحصیلی یا انگیزه‌نامه" },
              { name: "رزومه (برای تحصیلات تکمیلی)" },
              { name: "مدرک زبان (مانند آلمانی B1)" },
            ],
          },
          {
            name: "ویزای جستجوی کار",
            documents: [
              { name: "مدرک دانشگاهی یا معادل (مورد تأیید کشور مقصد)" },
              { name: "رزومه با جزئیات تجربه حرفه‌ای" },
              { name: "مدارک مالی (مانند 1,027 یورو در ماه)", description: "1,027 یورو در ماه" },
              { name: "بیمه درمانی" },
              { name: "انگیزه‌نامه" },
              { name: "مدرک زبان (مانند آلمانی B1)" },
            ],
          },
          {
            name: "آوسبیلدونگ (آموزش حرفه‌ای)",
            documents: [
              { name: "پذیرش از برنامه آوسبیلدونگ" },
              { name: "مدرک زبان آلمانی (سطح B1 یا B2)" },
              { name: "مدارک تحصیلی (ترجمه و تأییدشده)" },
              { name: "رزومه" },
              { name: "انگیزه‌نامه" },
              { name: "تمکن مالی (برای پوشش هزینه‌های زندگی)" },
            ],
          },
        ],
      },
      {
        name: "اتریش",
        methods: [
          {
            name: "ویزای جستجوی کار",
            documents: [
              { name: "مدرک دانشگاهی یا معادل (مورد تأیید کشور مقصد)" },
              { name: "رزومه با جزئیات تجربه حرفه‌ای" },
              { name: "مدارک مالی" },
              { name: "بیمه درمانی" },
              { name: "انگیزه‌نامه" },
              { name: "مدرک زبان (مانند آلمانی B1)" },
            ],
          },
        ],
      },
      {
        name: "ایتالیا",
        methods: [
          { name: "اقامت تمکن مالی", documents: [{ name: "مدرک درآمد غیرفعال" }, { name: "صورت‌حساب بانکی" }] },
          { name: "ثبت شرکت و خوداشتغالی", documents: [{ name: "طرح تجاری" }, { name: "مدرک ثبت شرکت" }] },
        ],
      },
      {
        name: "اسپانیا",
        methods: [
          {
            name: "ویزای طلایی (سرمایه‌گذاری ملکی)",
            documents: [
              { name: "قرارداد خرید ملک (مانند 500,000 یورو)", description: "500,000 یورو" },
              { name: "مدرک تأمین مالی سرمایه‌گذاری" },
              { name: "صورت‌حساب بانکی" },
              { name: "بیمه درمانی" },
              { name: "گواهی عدم سوءپیشینه" },
              { name: "سند مالکیت یا قرارداد تأییدشده" },
            ],
          },
          {
            name: "ویزای دانش‌آموزی",
            documents: [
              { name: "نامه پذیرش از مدرسه معتبر" },
              { name: "رضایت‌نامه سرپرست (برای افراد زیر سن قانونی)" },
              { name: "رسید پرداخت شهریه" },
              { name: "مدارک مالی (مانند 20,000 یورو در سال)", description: "20,000 یورو در سال" },
              { name: "بیمه درمانی" },
              { name: "سوابق تحصیلی (ترجمه و تأییدشده)" },
            ],
          },
        ],
      },
      {
        name: "فرانسه",
        methods: [
          { name: "مهاجرت تحصیلی", documents: [{ name: "نامه پذیرش" }, { name: "مدرک زبان" }] },
          { name: "ویزای جستجوی کار", documents: [{ name: "رزومه" }, { name: "مدارک مالی" }] },
        ],
      },
      {
        name: "پرتغال",
        methods: [
          {
            name: "اقامت تمکن مالی",
            documents: [
              { name: "مدرک درآمد غیرفعال (مانند 635 یورو در ماه)", description: "635 یورو در ماه" },
              { name: "صورت‌حساب بانکی نشان‌دهنده پس‌انداز (مانند 9,000 یورو)", description: "9,000 یورو" },
              { name: "بیمه درمانی" },
              { name: "مدرک اقامت" },
              { name: "اظهارنامه عدم قصد اشتغال" },
            ],
          },
          { name: "ویزای طلایی (سرمایه‌گذاری ملکی)", documents: [{ name: "قرارداد خرید ملک" }] },
        ],
      },
      {
        name: "سوئد",
        methods: [
          { name: "مهاجرت تحصیلی", documents: [{ name: "نامه پذیرش" }, { name: "مدارک مالی" }] },
          { name: "ویزای جستجوی کار", documents: [{ name: "رزومه" }, { name: "مدارک مالی" }] },
        ],
      },
      {
        name: "سوئیس",
        methods: [
          { name: "اقامت تمکن مالی", documents: [{ name: "مدرک درآمد" }, { name: "صورت‌حساب بانکی" }] },
          { name: "ثبت شرکت", documents: [{ name: "طرح تجاری" }] },
        ],
      },
      {
        name: "قبرس",
        methods: [{ name: "ویزای طلایی (سرمایه‌گذاری ملکی)", documents: [{ name: "قرارداد خرید ملک" }] }],
      },
      {
        name: "دانمارک",
        methods: [
          { name: "مهاجرت تحصیلی", documents: [{ name: "نامه پذیرش" }] },
          { name: "ویزای جستجوی کار", documents: [{ name: "رزومه" }] },
        ],
      },
      {
        name: "نروژ",
        methods: [
          { name: "مهاجرت تحصیلی", documents: [{ name: "نامه پذیرش" }] },
          { name: "مهاجرت کاری - پیشنهاد شغلی", documents: [{ name: "پیشنهاد شغلی" }] },
        ],
      },
      {
        name: "بلژیک",
        methods: [
          { name: "مهاجرت تحصیلی", documents: [{ name: "نامه پذیرش" }] },
          { name: "مهاجرت کاری - پیشنهاد شغلی", documents: [{ name: "پیشنهاد شغلی" }] },
        ],
      },
      {
        name: "کرواسی",
        methods: [{ name: "اقامت تمکن مالی", documents: [{ name: "مدرک درآمد" }] }],
      },
      {
        name: "مجارستان",
        methods: [{ name: "ویزای طلایی (سرمایه‌گذاری)", documents: [{ name: "مدرک سرمایه‌گذاری" }] }],
      },
      {
        name: "هلند",
        methods: [{ name: "ویزای استارتاپ", documents: [{ name: "طرح تجاری نوآورانه" }] }],
      },
      {
        name: "انگلستان",
        methods: [
          {
            name: "مهاجرت تحصیلی",
            documents: [
              { name: "نامه پذیرش از مؤسسه آموزشی معتبر" },
              { name: "ریزنمرات و مدارک تحصیلی (ترجمه و تأییدشده)" },
              { name: "رسید پرداخت شهریه یا مدرک بورسیه" },
              { name: "مدارک مالی" },
              { name: "طرح تحصیلی یا انگیزه‌نامه" },
              { name: "رزومه (برای تحصیلات تکمیلی)" },
              { name: "مدرک زبان (مانند آیلتس 6.5)" },
            ],
          },
          {
            name: "ویزای دانش‌آموزی",
            documents: [
              { name: "نامه پذیرش از مدرسه معتبر" },
              { name: "رضایت‌نامه سرپرست (برای افراد زیر سن قانونی)" },
              { name: "رسید پرداخت شهریه" },
              { name: "مدارک مالی (مانند 20,000 یورو در سال)", description: "20,000 یورو در سال" },
              { name: "بیمه درمانی" },
              { name: "سوابق تحصیلی (ترجمه و تأییدشده)" },
            ],
          },
          {
            name: "مهاجرت اشخاص خاص",
            documents: [
              { name: "مدارک استعداد برجسته (مانند جوایز، مقالات، اختراعات)" },
              { name: "نامه‌های تأیید از مراجع/سازمان‌های مربوطه" },
              { name: "رزومه" },
              { name: "مدارک مالی" },
              { name: "بیمه درمانی" },
              { name: "الزامات خاص (مانند استعداد جهانی)" },
            ],
          },
        ],
      },
      {
        name: "فنلاند",
        methods: [
          { name: "مهاجرت تحصیلی", documents: [{ name: "نامه پذیرش" }] },
          { name: "مهاجرت کاری - پیشنهاد شغلی", documents: [{ name: "پیشنهاد شغلی" }] },
        ],
      },
      {
        name: "یونان",
        methods: [
          {
            name: "اقامت تمکن مالی",
            documents: [
              { name: "مدرک درآمد غیرفعال (مانند 2,400 یورو در ماه)", description: "2,400 یورو در ماه" },
              { name: "صورت‌حساب بانکی نشان‌دهنده پس‌انداز (مانند 30,000 یورو)", description: "30,000 یورو" },
              { name: "بیمه درمانی" },
              { name: "مدرک اقامت" },
              { name: "اظهارنامه عدم قصد اشتغال" },
            ],
          },
          {
            name: "ویزای طلایی (سرمایه‌گذاری ملکی)",
            documents: [
              { name: "قرارداد خرید ملک (مانند 250,000 یورو)", description: "250,000 یورو" },
              { name: "مدرک تأمین مالی سرمایه‌گذاری" },
              { name: "صورت‌حساب بانکی" },
              { name: "بیمه درمانی" },
              { name: "گواهی عدم سوءپیشینه" },
              { name: "سند مالکیت یا قرارداد تأییدشده" },
            ],
          },
        ],
      },
    ],
  },
  {
    region: "آمریکای شمالی",
    countries: [
      {
        name: "ایالات متحده",
        methods: [
          {
            name: "مهاجرت اشخاص خاص",
            documents: [
              { name: "مدارک استعداد برجسته (مانند جوایز، مقالات، اختراعات)" },
              { name: "نامه‌های تأیید از مراجع/سازمان‌های مربوطه" },
              { name: "رزومه" },
              { name: "مدارک مالی" },
              { name: "بیمه درمانی" },
              { name: "الزامات خاص (مانند ویزای O1)" },
            ],
          },
        ],
      },
      {
        name: "کانادا",
        methods: [
          {
            name: "مهاجرت تحصیلی",
            documents: [
              { name: "نامه پذیرش از مؤسسه آموزشی معتبر" },
              { name: "ریزنمرات و مدارک تحصیلی (ترجمه و تأییدشده)" },
              { name: "رسید پرداخت شهریه یا مدرک بورسیه" },
              { name: "مدارک مالی" },
              { name: "طرح تحصیلی یا انگیزه‌نامه" },
              { name: "رزومه (برای تحصیلات تکمیلی)" },
              { name: "مدرک زبان (مانند آیلتس 6.5)" },
            ],
          },
        ],
      },
    ],
  },
  {
    region: "خاورمیانه",
    countries: [
      { name: "امارات متحده عربی", methods: [] },
      { name: "عمان", methods: [] },
      { name: "ترکیه", methods: [] },
    ],
  },
  {
    region: "سایر",
    countries: [
      { name: "دومینیکا", methods: [] },
      { name: "استرالیا", methods: [] },
    ],
  },
]

// Additional immigration methods not tied to specific countries in the prompt's examples, but general
const otherImmigrationMethods: ImmigrationMethodDetails[] = [
  {
    name: "ثبت شرکت و خوداشتغالی",
    documents: [
      { name: "طرح تجاری (با جزئیات تأثیر اقتصادی)" },
      { name: "مدرک ثبت شرکت یا وضعیت خوداشتغالی" },
      { name: "صورت‌حساب مالی یا مدرک سرمایه‌گذاری" },
      { name: "مدارک حرفه‌ای (مانند مدرک تحصیلی، گواهینامه‌ها)" },
      { name: "مدرک زبان (در صورت نیاز)" },
      { name: "بیمه درمانی" },
    ],
  },
  {
    name: "ویزای استارتاپ",
    documents: [
      { name: "طرح تجاری نوآورانه" },
      { name: "مدرک تأمین مالی (مانند سرمایه‌گذاری خطرپذیر، پس‌انداز شخصی)" },
      { name: "رزومه نشان‌دهنده تجربه کارآفرینی" },
      { name: "نامه‌های حمایت از شتاب‌دهنده‌ها/انکوباتورها" },
      { name: "بیمه درمانی" },
      { name: "مدرک زبان (در صورت نیاز)" },
    ],
  },
  {
    name: "ویزای دانش‌آموزی",
    documents: [
      { name: "نامه پذیرش از مدرسه معتبر" },
      { name: "رضایت‌نامه سرپرست (برای افراد زیر سن قانونی)" },
      { name: "رسید پرداخت شهریه" },
      { name: "مدارک مالی" },
      { name: "بیمه درمانی" },
      { name: "سوابق تحصیلی (ترجمه و تأییدشده)" },
    ],
  },
  {
    name: "مهاجرت اشخاص خاص",
    documents: [
      { name: "مدارک استعداد برجسته (مانند جوایز، مقالات، اختراعات)" },
      { name: "نامه‌های تأیید از مراجع/سازمان‌های مربوطه" },
      { name: "رزومه" },
      { name: "مدارک مالی" },
      { name: "بیمه درمانی" },
      { name: "الزامات خاص" },
    ],
  },
  {
    name: "مهاجرت از طریق پناهندگی",
    documents: [
      { name: "شواهد آزار و اذیت (مانند تهدیدات، مدام قانونی)" },
      { name: "بیانیه شخصی با جزئیات دلایل پناهندگی" },
      { name: "مدارک هویتی (در صورت وجود)" },
      { name: "عکس" },
      { name: "ثبت‌نام در مراجع پناهندگی پس از ورود" },
      {
        name: "توجه",
        description: "به دلیل خطرات قانونی و اخلاقی توصیه نمی‌شود؛ با UNHCR یا کارشناسان حقوقی مشورت کنید",
      },
    ],
  },
  {
    name: "مهاجرت از طریق تولد",
    documents: [
      { name: "شناسنامه نشان‌دهنده تولد در کشور یا والدین شهروند" },
      { name: "مدارک هویتی والدین" },
      { name: "گواهی شهروندی (در صورت وجود)" },
      {
        name: "توجه",
        description: "قوانین شهروندی از طریق تولد در بسیاری از کشورها متفاوت است؛ به قوانین کشور مربوطه مراجعه کنید",
      },
    ],
  },
  {
    name: "مهاجرت از طریق سرمایه‌گذاری",
    documents: [{ name: "مدرک سرمایه‌گذاری" }, { name: "مدارک مالی" }],
  },
  {
    name: "مهاجرت از طریق ازدواج",
    documents: [{ name: "سند ازدواج" }, { name: "مدارک شناسایی همسر" }],
  },
  {
    name: "مهاجرت کاری - نیروی متخصص",
    documents: [
      { name: "پیشنهاد شغلی" },
      { name: "مدرک تحصیلی" },
      { name: "رزومه" },
      { name: "سابقه کار" },
      { name: "مدرک زبان" },
    ],
  },
  {
    name: "مهاجرت کاری - پیشنهاد شغلی",
    documents: [{ name: "پیشنهاد شغلی رسمی" }, { name: "قرارداد کار" }, { name: "مدارک مرتبط با کارفرما" }],
  },
  {
    name: "مهاجرت کاری - کارآموزی",
    documents: [{ name: "پذیرش از برنامه کارآموزی" }, { name: "مدارک تحصیلی" }, { name: "مدرک زبان" }],
  },
  {
    name: "کارآفرینی",
    documents: [{ name: "طرح کسب و کار جامع" }, { name: "اثبات تمکن مالی" }, { name: "تجربه کارآفرینی" }],
  },
  {
    name: "خرید فرانچایز",
    documents: [{ name: "قرارداد فرانچایز" }, { name: "اثبات تمکن مالی" }, { name: "طرح کسب و کار" }],
  },
  {
    name: "خرید بیزینس",
    documents: [
      { name: "قرارداد خرید بیزینس" },
      { name: "اثبات تمکن مالی" },
      { name: "طرح کسب و کار" },
      { name: "گزارش‌های مالی بیزینس" },
    ],
  },
]

// Main component for the immigration document checklist
export function ImmigrationDocumentChecklist() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>("اروپا") // Default to Europe
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null) // No country selected initially
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null) // No method selected initially

  // Get the currently selected region's data
  const currentRegion = comprehensiveImmigrationData.find((r) => r.region === selectedRegion)

  // Get the currently selected country's data
  const currentCountry = currentRegion?.countries.find((c) => c.name === selectedCountry)

  // Get the currently selected method's documents
  const currentMethodDocuments = currentCountry?.methods.find((m) => m.name === selectedMethod)?.documents || []

  // Function to reset country and method when region changes
  const handleRegionChange = (regionName: string) => {
    setSelectedRegion(regionName)
    setSelectedCountry(null)
    setSelectedMethod(null)
  }

  // Function to reset method when country changes
  const handleCountryChange = (countryName: string) => {
    setSelectedCountry(countryName)
    setSelectedMethod(null)
  }

  return (
    <div className="space-y-6 p-4" dir="rtl"> {/* Set direction to RTL for Persian text */}
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListChecks className="w-6 h-6 text-blue-600" />
            چک‌لیست جامع مدارک مهاجرتی {/* Comprehensive Immigration Document Checklist */}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-6">
            این برنامه یک نمای کلی ساختاریافته از مدارک مورد نیاز برای هر کشور و مسیر مهاجرتی فراهم می‌کند تا
            متقاضیان بتوانند مدارک لازم را به‌طور سیستماتیک پیگیری کنند. برای اطلاعات دقیق، متقاضیان باید به
            وب‌سایت‌های رسمی دولتی یا متخصصان مهاجرت مراجعه کنند.
            {/* This app provides a structured overview of required documents for each country and immigration path to help applicants systematically track necessary documents. For precise information, applicants should refer to official government websites or immigration specialists. */}
          </p>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 md:grid-cols-5">
              <TabsTrigger value="overview">نمای کلی</TabsTrigger> {/* Overview */}
              <TabsTrigger value="country-specific">کشورهای خاص و مسیرها</TabsTrigger> {/* Specific Countries & Paths */}
              <TabsTrigger value="considerations">ملاحظات</TabsTrigger> {/* Considerations */}
              <TabsTrigger value="upload">آپلود مدارک</TabsTrigger> {/* Upload Documents */}
              <TabsTrigger value="consultant-review">بررسی مشاورین</TabsTrigger> {/* Consultants' Review */}
            </TabsList>

            {/* --- Overview Tab Content --- */}
            <TabsContent value="overview" className="mt-4">
              <h3 className="font-semibold text-lg mb-4 text-blue-700">مدارک عمومی مهاجرت</h3> {/* General Immigration Documents */}
              <div className="space-y-3">
                {generalImmigrationDocuments.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
                  >
                    <FileText className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm text-gray-800">{doc.name}</p>
                      {doc.description && <p className="text-xs text-gray-600">{doc.description}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* --- Country Specific & Methods Tab Content --- */}
            <TabsContent value="country-specific" className="mt-4 space-y-6">
              {/* Region Selection */}
              <Tabs defaultValue={selectedRegion || comprehensiveImmigrationData[0].region} onValueChange={handleRegionChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                  {comprehensiveImmigrationData.map((region) => (
                    <TabsTrigger key={region.region} value={region.region}>
                      {region.region}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Country and Method Selection within selected Region */}
                {comprehensiveImmigrationData.map((region) => (
                  <TabsContent key={region.region} value={region.region} className="mt-4 space-y-4">
                    {/* Country Select */}
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <label htmlFor="country-select" className="text-sm font-medium flex-shrink-0">
                        انتخاب کشور: {/* Select Country: */}
                      </label>
                      <Select value={selectedCountry || ""} onValueChange={handleCountryChange}>
                        <SelectTrigger className="w-full md:w-[200px]">
                          <SelectValue placeholder="کشور را انتخاب کنید" /> {/* Select a country */}
                        </SelectTrigger>
                        <SelectContent>
                          {region.countries.map((country) => (
                            <SelectItem key={country.name} value={country.name}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* Immigration Method Select (only if a country is selected and has methods) */}
                      {selectedCountry && currentCountry && currentCountry.methods.length > 0 && (
                        <>
                          <label htmlFor="method-select" className="text-sm font-medium flex-shrink-0 md:ml-4">
                            انتخاب روش مهاجرت: {/* Select Immigration Method: */}
                          </label>
                          <Select value={selectedMethod || ""} onValueChange={setSelectedMethod}>
                            <SelectTrigger className="w-full md:w-[250px]">
                              <SelectValue placeholder="روش مهاجرت را انتخاب کنید" /> {/* Select an immigration method */}
                            </SelectTrigger>
                            <SelectContent>
                              {currentCountry.methods.map((method) => (
                                <SelectItem key={method.name} value={method.name}>
                                  {method.name}
                                </SelectItem>
                              ))}
                              {/* Include general methods if they apply universally or not explicitly tied to a specific country */}
                                {otherImmigrationMethods.map((method) => (
                                    <SelectItem key={method.name} value={method.name}>
                                        {method.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </>
                      )}
                    </div>

                    {/* Display Documents for selected Country and Method */}
                    {selectedCountry && selectedMethod && currentMethodDocuments.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-semibold text-md mb-3 text-purple-700">
                          مدارک مورد نیاز برای {selectedMethod} در {selectedCountry}
                          {/* Required Documents for {selectedMethod} in {selectedCountry} */}
                        </h4>
                        <div className="space-y-3">
                          {currentMethodDocuments.map((doc, docIndex) => (
                            <motion.div
                              key={docIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: docIndex * 0.03 }}
                              className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                            >
                              <ListChecks className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                              <div>
                                <p className="font-medium text-sm text-gray-800">{doc.name}</p>
                                {doc.description && (
                                  <p className="text-xs text-gray-600">({doc.description})</p>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                     {selectedCountry && selectedMethod && currentMethodDocuments.length === 0 && (
                        <p className="text-center text-gray-600 mt-8">
                            هیچ مدرک خاصی برای این روش در این کشور یافت نشد. به مدارک عمومی مراجعه کنید.
                            {/* No specific documents found for this method in this country. Refer to general documents. */}
                        </p>
                    )}
                    {!selectedCountry && (
                      <p className="text-center text-gray-600 mt-8">
                        کشور مورد نظر خود را برای مشاهده مسیرهای مهاجرتی و مدارک مربوطه انتخاب کنید.
                        {/* Select your desired country to view immigration paths and related documents. */}
                      </p>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>

            {/* --- Considerations Tab Content --- */}
            <TabsContent value="considerations" className="mt-4">
              <h3 className="font-semibold text-lg mb-4 text-blue-700">ملاحظات مهم</h3> {/* Important Considerations */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <Info className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">ترجمه مدارک:</h4> {/* Document Translation: */}
                    <p className="text-xs text-gray-600">
                      اکثر کشورها مدارک را به زبان رسمی یا زبان انگلیسی می‌پذیرند. ترجمه‌ها باید توسط مترجم رسمی
                      انجام‌شده و تأیید شوند.
                      {/* Most countries accept documents in the official language or English. Translations must be done by an official translator and certified. */}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <Info className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">تأیید مدارک:</h4> {/* Document Certification: */}
                    <p className="text-xs text-gray-600">
                      برخی کشورها نیاز به تأیید کنسولی یا اپوستیل دارند.
                      {/* Some countries require consular legalization or apostille. */}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <Info className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">مهلت‌های زمانی:</h4> {/* Deadlines: */}
                    <p className="text-xs text-gray-600">
                      زمان بررسی درخواست‌ها بسته به کشور و سفارت متفاوت است.
                      {/* Application processing times vary by country and embassy. */}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                  <Info className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm">منابع رسمی:</h4> {/* Official Sources: */}
                    <p className="text-xs text-gray-600">
                      برای اطلاعات دقیق، به وب‌سایت‌های سفارتخانه‌ها، مراجع مهاجرتی یا مشاوران متخصص مراجعه کنید.
                      {/* For precise information, refer to embassy websites, immigration authorities, or expert consultants. */}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* --- Upload Documents Tab (Simplified) --- */}
            <TabsContent value="upload" className="mt-4">
              <Card className="p-6 text-center border-dashed border-2 border-gray-300 bg-gray-50">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-lg mb-2">آپلود مدارک شما</h3> {/* Upload Your Documents */}
                <p className="text-sm text-gray-600 mb-4">
                  فایل‌های خود را به صورت PDF یا تصویر (JPG, JPEG, PNG) اینجا بارگذاری کنید.
                  {/* Upload your files here as PDF or image (JPG, JPEG, PNG). */}
                </p>
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  <input id="file-upload" type="file" multiple className="hidden" />
                  انتخاب فایل‌ها {/* Select Files */}
                </label>
              </Card>
            </TabsContent>

            {/* --- Consultant Review Tab --- */}
            <TabsContent value="consultant-review" className="mt-4">
              <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50">
                <div className="flex items-center gap-3 mb-3">
                  <UserCheck className="w-6 h-6 text-green-500" />
                  <h3 className="font-medium">بررسی مشاورین هلدینگ مهاجرتی دیاکو</h3> {/* Review by Diako Immigration Holding Consultants */}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  مشاورین هلدینگ مهاجرتی دیاکو مدارک شما را با دقت بررسی کرده و بازخورد و پیشنهادات لازم را ارائه
                  خواهند داد تا مسیر مهاجرتی شما هموارتر شود.
                  {/* Diako Immigration Holding Consultants will carefully review your documents and provide the necessary feedback and suggestions to smooth your immigration process. */}
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-white rounded border">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">مدارک ارسالی شما در حال بررسی اولیه هستند.</p> {/* Your submitted documents are under initial review. */}
                      <p className="text-xs text-gray-600">پاسخ اولیه طی 2-3 روز کاری ارسال خواهد شد.</p> {/* Initial response will be sent within 2-3 business days. */}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
