"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SearchBar } from "@/components/search-bar"
import { NewsCard } from "@/components/news-card"
import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const perPage = 6

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/all_news/")
        const data = await res.json()
        const parsed = data.map((item: any) => {
          const id = Object.keys(item)[0]
          const n = item[id]
          return {
            id,
            title: n.news_title_en,
            image: n.news_image,
            date: n.news_created_at,
          }
        })
        setNews(parsed)
      } catch (err) {
        console.error("❌ News fetch error:", err)
      }
    }
    fetchNews()
  }, [])

  const totalPages = Math.ceil(news.length / perPage)
  const paginatedNews = news.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 px-4">
        <div className="container max-w-5xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">Stay Informed with Latest News</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get the latest updates on services, policies, and opportunities that matter to the Uzbek community in Korea.
          </p>
          <SearchBar placeholder="Search..." />
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              Latest News
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paginatedNews.map((n) => (
              <NewsCard
                key={n.id}
                id={n.id}
                title={n.title}
                image={n.image}
                date={n.date}
              />
            ))}
          </div>

          {/* Pagination */}
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
