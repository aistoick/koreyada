"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-8 bg-white">
        <div className="w-full max-w-md space-y-6 md:space-y-8">
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-[#5B8DEF] mb-6 md:mb-8">Koreyada</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-[#5B8DEF] mb-6 md:mb-8">{t("signUpTitle")}</h2>
          </div>

          {/* Sign Up Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium mb-2">
                  {t("fullName")}
                </label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder={t("enterPlaceholder")}
                  className="h-11 md:h-12 rounded-lg border-2 border-gray-200 focus:border-[#5B8DEF] focus-visible:ring-0"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t("email")}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="h-11 md:h-12 rounded-lg border-2 border-gray-200 focus:border-[#5B8DEF] focus-visible:ring-0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  {t("phone")}
                </label>
                <div className="flex gap-2">
                  <Select defaultValue="+82">
                    <SelectTrigger className="w-20 md:w-24 h-11 md:h-12 rounded-lg border-2 border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+82">
                        <div className="flex items-center gap-2">
                          <span>🇰🇷</span>
                          <span>+82</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="+998">
                        <div className="flex items-center gap-2">
                          <span>🇺🇿</span>
                          <span>+998</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="x-xxxx-xxxx"
                    className="flex-1 h-11 md:h-12 rounded-lg border-2 border-gray-200 focus:border-[#5B8DEF] focus-visible:ring-0"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-2">
                  {t("country")}
                </label>
                <Select defaultValue="korea">
                  <SelectTrigger className="h-11 md:h-12 rounded-lg border-2 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="korea">Korea</SelectItem>
                    <SelectItem value="uzbekistan">Uzbekistan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="login" className="block text-sm font-medium mb-2">
                  {t("loginTitle")}
                </label>
                <Input
                  id="login"
                  type="text"
                  placeholder={t("enterPlaceholder")}
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
            </div>

            <Button className="w-full h-11 md:h-12 bg-[#5B8DEF] hover:bg-[#4A7DD8] text-base md:text-lg font-medium rounded-lg mt-6">
              {t("signUpTitle")}
            </Button>

            <p className="text-center text-sm">
              {t("alreadyHaveAccount")}{" "}
              <Link href="/login" className="text-[#5B8DEF] hover:underline font-medium">
                {t("loginTitle")}
              </Link>
            </p>
          </div>
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
