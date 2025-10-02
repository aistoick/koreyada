"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SearchBar } from "@/components/search-bar"
import { CategoryCard } from "@/components/category-card"
import { Button } from "@/components/ui/button"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const perPage = 6

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/all_categories/")
        const data = await res.json()

        const parsed = data.map((item: any) => {
          const id = Object.keys(item)[0]
          const c = item[id]
          return {
            id,
            title: c.category_name_en,
            description: c.category_short_info_en,
            iconSvg: c.category_icon,
          }
        })
        setCategories(parsed)
      } catch (err) {
        console.error("❌ Categories fetch error:", err)
      }
    }
    fetchCategories()
  }, [])

  const totalPages = Math.ceil(categories.length / perPage)
  const paginatedCategories = categories.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-4">
        <div className="container max-w-5xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">All Categories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            All necessary information for living in Korea organized by categories
          </p>
          <SearchBar placeholder="Search..." />
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#5B8DEF] mb-12">
            Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {paginatedCategories.map((c) => (
              <CategoryCard
                key={c.id}
                iconSvg={c.iconSvg}
                title={c.title}
                description={c.description}
                href={`/categories/${c.id}`}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? "default" : "outline"}
                  onClick={() => setPage(i + 1)}
                  className="w-10 h-10"
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
