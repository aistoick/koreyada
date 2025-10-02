"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    console.log("[v0] LanguageProvider: Initializing language from localStorage")
    // Load language from localStorage
    const savedLang = localStorage.getItem("language") as Language
    console.log("[v0] LanguageProvider: Saved language from localStorage:", savedLang)

    if (savedLang && (savedLang === "en" || savedLang === "uz")) {
      console.log("[v0] LanguageProvider: Setting language to:", savedLang)
      setLanguageState(savedLang)
    } else {
      console.log("[v0] LanguageProvider: No valid saved language, using default 'en'")
    }

    setIsHydrated(true)
  }, [])

  const setLanguage = (lang: Language) => {
    console.log("[v0] LanguageProvider: Changing language to:", lang)
    setLanguageState(lang)
    localStorage.setItem("language", lang)
    console.log("[v0] LanguageProvider: Language saved to localStorage:", lang)
  }

  const t = (key: string): string => {
    const translation = translations[language]?.[key] || translations.en[key] || key
    return translation
  }

  if (!isHydrated) {
    return null
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
