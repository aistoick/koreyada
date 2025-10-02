"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Palette, Type, Layout, Smartphone } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Welcome Section */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Welcome to <span className="text-[#5B8DEF]">Koreyada</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            Here's an overview of the design system used to build this platform
          </p>
        </div>

        {/* Design System Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Color Palette */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Palette className="h-5 w-5 md:h-6 md:w-6 text-[#5B8DEF]" />
                Color Palette
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-3">Primary Colors</p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-[#5B8DEF] shadow-md"></div>
                    <span className="text-xs font-mono">#5B8DEF</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-[#E91E63] shadow-md"></div>
                    <span className="text-xs font-mono">#E91E63</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-3">Accent Colors</p>
                <div className="flex flex-wrap gap-3">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-blue-100 shadow-sm"></div>
                    <span className="text-xs">Blue</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-amber-100 shadow-sm"></div>
                    <span className="text-xs">Amber</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-green-100 shadow-sm"></div>
                    <span className="text-xs">Green</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-orange-100 shadow-sm"></div>
                    <span className="text-xs">Orange</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg bg-purple-100 shadow-sm"></div>
                    <span className="text-xs">Purple</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Type className="h-5 w-5 md:h-6 md:w-6 text-[#5B8DEF]" />
                Typography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Font Family</p>
                <p className="font-sans text-base md:text-lg">Geist Sans (Primary)</p>
                <p className="font-mono text-sm md:text-base text-gray-600">Geist Mono (Code)</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Heading Styles</p>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Heading 1</h1>
                <h2 className="text-xl md:text-2xl font-bold mb-2">Heading 2</h2>
                <h3 className="text-lg md:text-xl font-bold">Heading 3</h3>
              </div>
            </CardContent>
          </Card>

          {/* Layout Components */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Layout className="h-5 w-5 md:h-6 md:w-6 text-[#5B8DEF]" />
                Layout System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Flexbox</Badge>
                <Badge variant="secondary">CSS Grid</Badge>
                <Badge variant="secondary">Responsive</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Built with Tailwind CSS v4 using a mobile-first approach with responsive breakpoints
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mobile:</span>
                  <span className="font-mono">{"< 768px"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tablet:</span>
                  <span className="font-mono">768px - 1024px</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Desktop:</span>
                  <span className="font-mono">{">= 1024px"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Optimization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Smartphone className="h-5 w-5 md:h-6 md:w-6 text-[#5B8DEF]" />
                Mobile Optimization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Touch-Friendly</Badge>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Responsive Images</Badge>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Mobile Menu</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Optimized for mobile users with larger touch targets, responsive grids, and a dedicated mobile
                navigation menu
              </p>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Minimum 44px touch targets</li>
                <li>• Optimized image sizes</li>
                <li>• Hamburger menu for navigation</li>
                <li>• Responsive typography</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="mt-6 md:mt-8">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Platform Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm md:text-base">Multi-Language Support</h4>
                <p className="text-xs md:text-sm text-gray-600">
                  English and Uzbek translations available throughout the platform
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm md:text-base">Category System</h4>
                <p className="text-xs md:text-sm text-gray-600">
                  Organized content across Visa, Law, Food, Money, Housing, and SIM Cards
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm md:text-base">News & Articles</h4>
                <p className="text-xs md:text-sm text-gray-600">
                  Latest updates and helpful guides for living in Korea
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
