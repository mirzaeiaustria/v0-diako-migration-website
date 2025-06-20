export interface ImmigrationMethod {
  id: string
  name: string
  description: string
  duration: string
  cost: string
  requirements: string[]
  successRate: number
  difficulty: "easy" | "medium" | "hard"
}

export interface Country {
  id: string
  name: string
  englishName: string
  continent: string
  flagUrl: string
  description: string
  popularityRank: number
  methods: ImmigrationMethod[]
  livingCost: {
    housing: number
    food: number
    transport: number
    healthcare: number
    education: number
  }
  averageSalary: number
  language: string[]
  climate: string
  currency: string
}

export const immigrationMethods: Record<string, ImmigrationMethod> = {
  education: {
    id: "education",
    name: "مهاجرت تحصیلی",
    description: "تحصیل در دانشگاه‌های معتبر و اخذ ویزای تحصیلی",
    duration: "6-12 ماه",
    cost: "5,000-25,000",
    requirements: ["مدرک تحصیلی", "مدرک زبان", "تمکن مالی", "پذیرش دانشگاه"],
    successRate: 85,
    difficulty: "medium",
  },
  work: {
    id: "work",
    name: "مهاجرت کاری",
    description: "اخذ ویزای کار و جاب آفر",
    duration: "8-18 ماه",
    cost: "3,000-15,000",
    requirements: ["تجربه کاری", "مدرک زبان", "مهارت تخصصی", "جاب آفر"],
    successRate: 75,
    difficulty: "hard",
  },
  investment: {
    id: "investment",
    name: "مهاجرت سرمایه‌گذاری",
    description: "سرمایه‌گذاری در املاک یا کسب‌وکار",
    duration: "3-8 ماه",
    cost: "250,000-500,000",
    requirements: ["سرمایه کافی", "منابع مالی قانونی", "طرح کسب‌وکار"],
    successRate: 90,
    difficulty: "easy",
  },
  goldenVisa: {
    id: "goldenVisa",
    name: "گلدن ویزا",
    description: "خرید ملک برای اخذ اقامت",
    duration: "2-6 ماه",
    cost: "280,000-500,000",
    requirements: ["خرید ملک", "بیمه درمانی", "عدم سوء پیشینه"],
    successRate: 95,
    difficulty: "easy",
  },
  startup: {
    id: "startup",
    name: "ویزای استارت‌آپ",
    description: "راه‌اندازی کسب‌وکار نوآورانه",
    duration: "6-12 ماه",
    cost: "10,000-50,000",
    requirements: ["ایده نوآورانه", "طرح کسب‌وکار", "حمایت سرمایه‌گذار"],
    successRate: 70,
    difficulty: "hard",
  },
  family: {
    id: "family",
    name: "مهاجرت خانوادگی",
    description: "پیوستن به اعضای خانواده",
    duration: "12-24 ماه",
    cost: "2,000-8,000",
    requirements: ["رابطه خانوادگی", "اسپانسر", "مدارک هویتی"],
    successRate: 80,
    difficulty: "medium",
  },
  asylum: {
    id: "asylum",
    name: "پناهندگی",
    description: "درخواست پناهندگی",
    duration: "12-36 ماه",
    cost: "1,000-5,000",
    requirements: ["دلایل پناهندگی", "مدارک مثبته", "مشاوره حقوقی"],
    successRate: 60,
    difficulty: "hard",
  },
  ausbildung: {
    id: "ausbildung",
    name: "آوسبیلدونگ",
    description: "آموزش حرفه‌ای در آلمان",
    duration: "4-8 ماه",
    cost: "2,000-5,000",
    requirements: ["زبان آلمانی B1", "مدرک دیپلم", "انگیزه‌نامه"],
    successRate: 88,
    difficulty: "medium",
  },
}

export const countries: Country[] = [
  {
    id: "germany",
    name: "آلمان",
    englishName: "Germany",
    continent: "اروپا",
    flagUrl: "https://flagcdn.com/de.svg",
    description: "بزرگترین اقتصاد اروپا با فرصت‌های شغلی عالی",
    popularityRank: 1,
    methods: [
      immigrationMethods.education,
      immigrationMethods.work,
      immigrationMethods.investment,
      immigrationMethods.family,
      immigrationMethods.ausbildung,
    ],
    livingCost: {
      housing: 800,
      food: 300,
      transport: 100,
      healthcare: 200,
      education: 0,
    },
    averageSalary: 3500,
    language: ["آلمانی"],
    climate: "معتدل",
    currency: "یورو",
  },
  {
    id: "canada",
    name: "کانادا",
    englishName: "Canada",
    continent: "آمریکای شمالی",
    flagUrl: "https://flagcdn.com/ca.svg",
    description: "کشور مهاجرپذیر با سیستم مهاجرتی شفاف",
    popularityRank: 2,
    methods: [
      immigrationMethods.education,
      immigrationMethods.work,
      immigrationMethods.investment,
      immigrationMethods.family,
      immigrationMethods.startup,
    ],
    livingCost: {
      housing: 1200,
      food: 400,
      transport: 150,
      healthcare: 0,
      education: 15000,
    },
    averageSalary: 4000,
    language: ["انگلیسی", "فرانسوی"],
    climate: "سرد",
    currency: "دلار کانادا",
  },
  {
    id: "portugal",
    name: "پرتغال",
    englishName: "Portugal",
    continent: "اروپا",
    flagUrl: "https://flagcdn.com/pt.svg",
    description: "آب و هوای عالی و گلدن ویزای جذاب",
    popularityRank: 3,
    methods: [
      immigrationMethods.goldenVisa,
      immigrationMethods.education,
      immigrationMethods.work,
      immigrationMethods.investment,
    ],
    livingCost: {
      housing: 600,
      food: 250,
      transport: 80,
      healthcare: 150,
      education: 5000,
    },
    averageSalary: 1200,
    language: ["پرتغالی"],
    climate: "مدیترانه‌ای",
    currency: "یورو",
  },
  {
    id: "spain",
    name: "اسپانیا",
    englishName: "Spain",
    continent: "اروپا",
    flagUrl: "https://flagcdn.com/es.svg",
    description: "فرهنگ غنی و آب و هوای آفتابی",
    popularityRank: 4,
    methods: [
      immigrationMethods.goldenVisa,
      immigrationMethods.education,
      immigrationMethods.work,
      immigrationMethods.investment,
    ],
    livingCost: {
      housing: 700,
      food: 300,
      transport: 90,
      healthcare: 180,
      education: 8000,
    },
    averageSalary: 1800,
    language: ["اسپانیایی"],
    climate: "مدیترانه‌ای",
    currency: "یورو",
  },
  {
    id: "turkey",
    name: "ترکیه",
    englishName: "Turkey",
    continent: "آسیا/اروپا",
    flagUrl: "https://flagcdn.com/tr.svg",
    description: "موقعیت استراتژیک و شهروندی سریع",
    popularityRank: 5,
    methods: [immigrationMethods.investment, immigrationMethods.education, immigrationMethods.work],
    livingCost: {
      housing: 400,
      food: 200,
      transport: 50,
      healthcare: 100,
      education: 3000,
    },
    averageSalary: 800,
    language: ["ترکی"],
    climate: "متنوع",
    currency: "لیر ترکیه",
  },
  {
    id: "austria",
    name: "اتریش",
    englishName: "Austria",
    continent: "اروپا",
    flagUrl: "https://flagcdn.com/at.svg",
    description: "کیفیت زندگی بالا و مناظر زیبا",
    popularityRank: 6,
    methods: [immigrationMethods.education, immigrationMethods.work, immigrationMethods.investment],
    livingCost: {
      housing: 750,
      food: 320,
      transport: 110,
      healthcare: 220,
      education: 1500,
    },
    averageSalary: 3200,
    language: ["آلمانی"],
    climate: "قاره‌ای",
    currency: "یورو",
  },
  {
    id: "italy",
    name: "ایتالیا",
    englishName: "Italy",
    continent: "اروپا",
    flagUrl: "https://flagcdn.com/it.svg",
    description: "تاریخ غنی و فرهنگ بی‌نظیر",
    popularityRank: 7,
    methods: [
      immigrationMethods.education,
      immigrationMethods.work,
      immigrationMethods.investment,
      immigrationMethods.family,
    ],
    livingCost: {
      housing: 650,
      food: 280,
      transport: 85,
      healthcare: 160,
      education: 4000,
    },
    averageSalary: 2200,
    language: ["ایتالیایی"],
    climate: "مدیترانه‌ای",
    currency: "یورو",
  },
  {
    id: "france",
    name: "فرانسه",
    englishName: "France",
    continent: "اروپا",
    flagUrl: "https://flagcdn.com/fr.svg",
    description: "مرکز فرهنگ و هنر اروپا",
    popularityRank: 8,
    methods: [
      immigrationMethods.education,
      immigrationMethods.work,
      immigrationMethods.investment,
      immigrationMethods.startup,
    ],
    livingCost: {
      housing: 900,
      food: 350,
      transport: 120,
      healthcare: 200,
      education: 10000,
    },
    averageSalary: 2800,
    language: ["فرانسوی"],
    climate: "معتدل",
    currency: "یورو",
  },
]
