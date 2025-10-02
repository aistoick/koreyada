"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SearchBar } from "@/components/search-bar"
import { ArticleCard } from "@/components/article-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/all_articles/")
        const data = await res.json()
        const parsed = data.map((item: any) => {
          const id = Object.keys(item)[0]
          const a = item[id]
          return {
            id,
            title: a.articles_title_en,
            excerpt: a.articles_content_en?.slice(0, 120) + "...", // 🔥 qisqartirish
            image: a.articles_image,
            date: a.articles_created_at,
            views: a.articles_views,
          }
        })
        setArticles(parsed)
      } catch (err) {
        console.error("❌ Articles fetch error:", err)
      }
    }
    fetchArticles()
  }, [])

  const totalPages = Math.ceil(articles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentArticles = articles.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-4">
        <div className="container max-w-5xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Articles & Guides</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore practical tips, guides, and insights for living in Korea.
          </p>
          <SearchBar placeholder="Search articles..." />
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 items-stretch">
            {currentArticles.map((a) => (
              <ArticleCard
                key={a.id}
                id={a.id}
                title={a.title}
                excerpt={a.excerpt}
                image={a.image}
                date={a.date}
                views={a.views}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>

              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
                <ChevronLeft className="h-4 w-4 ml-1 rotate-180" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
