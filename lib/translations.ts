export type Language = "en" | "uz"

export const translations = {
  en: {
    // Header
    home: "Home",
    categories: "Categories",
    news: "News",
    articles: "Articles",
    login: "Login",
    signUp: "Sign Up",

    // Home Page
    heroTitle: "What do you want to know?",
    searchPlaceholder: "Search...",
    viewAll: "View All",
    categoriesTitle: "Categories",
    koreaNews: "Korea News",
    latestArticles: "Latest Articles",
    featuredBusinesses: "Featured Businesses",

    // Categories
    visa: "Visa",
    visaDesc: "Visa applications, renewals, and immigration assistance",
    law: "Law",
    lawDesc: "Know your rights and legal support in Korea.",
    food: "Food",
    foodDesc: "Guides to Korean food and dining options.",
    money: "Money",
    moneyDesc: "Banking, transfers, and financial tips in Korea.",
    housing: "Housing",
    housingDesc: "Find homes, rentals, and housing guidance in Korea.",
    simCards: "SIM Cards",
    simCardsDesc: "Mobile plans and SIM services in Korea.",

    // Login/Signup
    loginTitle: "Login",
    signUpTitle: "Sign Up",
    tagline: ", simplified for you",
    password: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "already have an account?",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    country: "Country",
    enterPlaceholder: "enter...",
    emailPlaceholder: "your e-mail",
    loginPlaceholder: "your login",

    // Common
    readMore: "Read More",
    views: "views",
    minRead: "min",
  },
  uz: {
    // Header
    home: "Bosh sahifa",
    categories: "Kategoriyalar",
    news: "Yangiliklar",
    articles: "Maqolalar",
    login: "Kirish",
    signUp: "Ro'yxatdan o'tish",

    // Home Page
    heroTitle: "Nimani bilmoqchisiz?",
    searchPlaceholder: "Qidirish...",
    viewAll: "Barchasini ko'rish",
    categoriesTitle: "Kategoriyalar",
    koreaNews: "Koreya Yangiliklari",
    latestArticles: "So'nggi Maqolalar",
    featuredBusinesses: "Tanlangan Bizneslar",

    // Categories
    visa: "Viza",
    visaDesc: "Viza arizalari, yangilash va immigratsiya yordami",
    law: "Qonun",
    lawDesc: "Koreyada huquqlaringizni va yuridik yordamni bilib oling.",
    food: "Ovqat",
    foodDesc: "Koreya taomlari va ovqatlanish joylari bo'yicha qo'llanmalar.",
    money: "Pul",
    moneyDesc: "Koreyada bank xizmatlari, pul o'tkazmalari va moliyaviy maslahatlar.",
    housing: "Uy-joy",
    housingDesc: "Koreyada uy-joy topish, ijaraga olish va ko'rsatmalar.",
    simCards: "SIM kartalar",
    simCardsDesc: "Koreyada mobil rejalar va SIM xizmatlari.",

    // Login/Signup
    loginTitle: "Kirish",
    signUpTitle: "Ro'yxatdan o'tish",
    tagline: ", siz uchun soddalashtirilgan",
    password: "Parol",
    rememberMe: "Meni eslab qol",
    forgotPassword: "Parolni unutdingizmi?",
    dontHaveAccount: "Hisobingiz yo'qmi?",
    alreadyHaveAccount: "Hisobingiz bormi?",
    fullName: "To'liq ism",
    email: "Elektron pochta",
    phone: "Telefon",
    country: "Mamlakat",
    enterPlaceholder: "kiriting...",
    emailPlaceholder: "elektron pochtangiz",
    loginPlaceholder: "loginingiz",

    // Common
    readMore: "Ko'proq o'qish",
    views: "ko'rishlar",
    minRead: "daq",
  },
}

export function getTranslation(lang: Language, key: keyof typeof translations.en): string {
  return translations[lang][key] || translations.en[key]
}
