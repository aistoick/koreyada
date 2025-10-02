"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useLanguage()
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-8 bg-white">
        <div className="w-full max-w-md space-y-6 md:space-y-8">
          {/* Logo and Tagline */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-6 md:mb-8">
              <div className="relative w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#5B8DEF] rounded-full"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#5B8DEF] rounded-full"></div>
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#5B8DEF] rounded-full"></div>
                </div>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="text-[#5B8DEF]">Koreyada</span>
              <span className="text-gray-400">{t("tagline")}</span>
            </h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
            <div>
              <label htmlFor="login" className="block text-sm font-medium mb-2">
                {t("loginTitle")}
              </label>
              <Input
                id="login"
                type="text"
                placeholder={t("loginPlaceholder")}
                className="h-11 md:h-12 rounded-lg border-2 border-gray-200 focus:border-[#5B8DEF] focus-visible:ring-0"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                {t("password")}
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="**************"
                  className="h-11 md:h-12 rounded-lg border-2 border-gray-200 focus:border-[#5B8DEF] focus-visible:ring-0 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="cursor-pointer">
                  {t("rememberMe")}
                </label>
              </div>
              <Link href="/forgot-password" className="text-[#5B8DEF] hover:underline">
                {t("forgotPassword")}
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-11 md:h-12 bg-[#5B8DEF] hover:bg-[#4A7DD8] text-base md:text-lg font-medium rounded-lg"
            >
              {t("loginTitle")}
            </Button>

            <p className="text-center text-sm">
              {t("dontHaveAccount")}{" "}
              <Link href="/signup" className="text-[#5B8DEF] hover:underline font-medium">
                {t("signUp")}
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-b from-sky-200 to-sky-100 items-center justify-center p-8">
        <div className="relative w-full max-w-2xl aspect-[4/3]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/log-in-uoixVPbEimlTMUyLv2tl8f9a0ug6mU.png"
            alt="Seoul skyline illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  )
}
