"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/"
    return pathname.startsWith(path)
  }

  const handleLanguageChange = (lang: "en" | "uz") => {
    console.log("[v0] SiteHeader: Language change requested:", lang)
    setLanguage(lang)
    console.log("[v0] SiteHeader: Language changed to:", lang)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between md:grid md:grid-cols-3 md:gap-4">
          {/* Logo - Left */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-[#E91E63] hover:opacity-90 transition-opacity">
              Koreyada
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center justify-center gap-8">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#5B8DEF]",
                isActive("/") && pathname === "/" ? "text-[#5B8DEF]" : "text-gray-700",
              )}
            >
              {t("home")}
            </Link>
            <Link
              href="/categories"
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#5B8DEF]",
                isActive("/categories") ? "text-[#5B8DEF]" : "text-gray-700",
              )}
            >
              {t("categories")}
            </Link>
            <Link
              href="/news"
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#5B8DEF]",
                isActive("/news") ? "text-[#5B8DEF]" : "text-gray-700",
              )}
            >
              {t("news")}
            </Link>
            <Link
              href="/articles"
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#5B8DEF]",
                isActive("/articles") ? "text-[#5B8DEF]" : "text-gray-700",
              )}
            >
              {t("articles")}
            </Link>
          </nav>

          {/* Actions - Right */}
          <div className="flex items-center justify-end gap-3">
            {/* Language Switcher */}
           

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#5B8DEF] border-[#5B8DEF] hover:bg-[#5B8DEF] hover:text-white transition-colors bg-transparent"
                >
                  {t("login")}
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-[#5B8DEF] hover:bg-[#4A7DD8] transition-colors">
                  {t("signUp")}
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container px-4 py-4 flex flex-col gap-3">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium py-2 px-3 rounded-md transition-colors",
                isActive("/") && pathname === "/" ? "text-[#5B8DEF] bg-blue-50" : "text-gray-700 hover:bg-gray-50",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("home")}
            </Link>
            <Link
              href="/categories"
              className={cn(
                "text-sm font-medium py-2 px-3 rounded-md transition-colors",
                isActive("/categories") ? "text-[#5B8DEF] bg-blue-50" : "text-gray-700 hover:bg-gray-50",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("categories")}
            </Link>
            <Link
              href="/news"
              className={cn(
                "text-sm font-medium py-2 px-3 rounded-md transition-colors",
                isActive("/news") ? "text-[#5B8DEF] bg-blue-50" : "text-gray-700 hover:bg-gray-50",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("news")}
            </Link>
            <Link
              href="/articles"
              className={cn(
                "text-sm font-medium py-2 px-3 rounded-md transition-colors",
                isActive("/articles") ? "text-[#5B8DEF] bg-blue-50" : "text-gray-700 hover:bg-gray-50",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("articles")}
            </Link>
            <div className="flex flex-col gap-2 pt-3 mt-3 border-t">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full text-[#5B8DEF] border-[#5B8DEF] hover:bg-[#5B8DEF] hover:text-white bg-transparent"
                >
                  {t("login")}
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#5B8DEF] hover:bg-[#4A7DD8]">{t("signUp")}</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
