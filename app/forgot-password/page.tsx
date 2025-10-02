"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
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

      {/* Right Side - Reset Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Icon and Heading */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="relative w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-[#5B8DEF] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#5B8DEF] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#5B8DEF] rounded-full"></div>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-[#5B8DEF]">Forgot your password?</h1>
            <p className="text-gray-600">a code will be sent your email to help reset password</p>
          </div>

          {/* Reset Form */}
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Adress
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="h-12 rounded-lg border-2 border-gray-200 focus:border-[#5B8DEF] focus-visible:ring-0"
              />
            </div>

            <Button className="w-full h-12 bg-[#5B8DEF] hover:bg-[#4A7DD8] text-lg font-medium rounded-lg">
              reset password
            </Button>

            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
