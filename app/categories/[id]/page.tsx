"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArticleCard } from "@/components/article-card"
import { ArrowLeft, MapPin, Phone, Globe, Star } from "lucide-react"

const API_URL = "https://koreyada-api.umiddev.uz"

export default function CategoryPage() {
  const { id } = useParams() as { id: string }
  const [categoryTitle, setCategoryTitle] = useState<string>("")
  const [businesses, setBusinesses] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [news, setNews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [page, setPage] = useState(1)
  const perPage = 4

  useEffect(() => {
    if (!id) return

    async function fetchAll() {
      setLoading(true)
      setError(null)

      try {
        const catRes = await fetch("/api/all_categories/")
        const catData = await catRes.json()
        const parsed = catData.map((item: any) => {
          const key = Object.keys(item)[0]
          const c = item[key]
          return { id: key, title: c.category_name_en }
        })
        const found = parsed.find((c) => c.id == id)
        setCategoryTitle(found?.title || "Category")

        const [bizRes, artRes, newsRes] = await Promise.all([
          fetch(`${API_URL}/category_businesses/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category_id: Number(id) }),
          }),
          fetch(`${API_URL}/category_articles/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category_id: Number(id) }),
          }),
          fetch(`${API_URL}/category_news/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category_id: Number(id) }),
          }),
        ])

        const [bizData, artData, newsData] = await Promise.all([
          bizRes.json(),
          artRes.json(),
          newsRes.json(),
        ])

        setBusinesses(Array.isArray(bizData) ? bizData : [])
        setArticles(Array.isArray(artData) ? artData : [])
        setNews(Array.isArray(newsData) ? newsData : [])
      } catch (err: any) {
        console.error("❌ Fetch error:", err)
        setError("Failed to load category data.")
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [id])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">Loading category data...</p>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        ⚠️ {error}
      </div>
    )

  const totalPages = Math.ceil(businesses.length / perPage)
  const paginatedBusinesses = businesses.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Link href="/categories">
          <Button variant="default" className="mb-6 bg-[#5B8DEF] hover:bg-[#4A7DD8]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-[#5B8DEF] mb-8">
          {categoryTitle}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Businesses */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold mb-4">Businesses</h2>
            {paginatedBusinesses.length > 0 ? (
              paginatedBusinesses.map((b) => (
                <Card
                  key={b.business_id}
                  className="overflow-hidden hover:shadow-lg transition-shadow p-0"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* ✅ Full-cover image */}
                    <div className="relative w-full md:w-64 aspect-[16/9] md:aspect-auto bg-gray-100 overflow-hidden">
                      <Image
                        src={b.business_logo || "/placeholder.svg"}
                        alt={b.business_name}
                        fill
                        className="absolute inset-0 object-cover object-center"
                        unoptimized
                      />
                    </div>

                    <CardContent className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold">{b.business_name}</h3>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-5 w-5 fill-current" />
                          <span className="font-bold">{b.rating || "4.5"}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {b.business_short_info_en}
                      </p>

                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        {b.business_location && (
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>{b.business_location}</span>
                          </div>
                        )}
                        {b.business_phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <span>{b.business_phone}</span>
                          </div>
                        )}
                        {b.site_link && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 flex-shrink-0" />
                            <span>{b.site_link}</span>
                          </div>
                        )}
                      </div>

                      <Link href={`/business/${b.business_id}`}>
                        <Button className="bg-[#5B8DEF] hover:bg-[#4A7DD8] w-full md:w-auto">
                          Read more
                        </Button>
                      </Link>
                    </CardContent>
                  </div>
                </Card>
              ))
            ) : (
              <p className="text-gray-500">No businesses found for this category.</p>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
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

          {/* Articles */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="space-y-6">
              {articles.length > 0 ? (
                articles.slice(0, 3).map((a) => (
                  <ArticleCard
                    key={a.id}
                    id={a.id}
                    title={a.title_en}
                    excerpt={a.content_en}
                    image={a.image_link}
                    date={a.created_at}
                    views={a.views}
                    readTime="5 min"
                  />
                ))
              ) : (
                <p className="text-gray-500">No articles found.</p>
              )}
            </div>

            {articles.length > 3 && (
              <div className="mt-6 text-center">
                <Link href={`/articles?category_id=${id}`}>
                  <Button variant="outline" className="bg-transparent">
                    View All Articles →
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ✅ News Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">📈 Latest News</h2>
          {news.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {news.slice(0, 4).map((n) => (
                  <Card key={n.id} className="overflow-hidden p-0 hover:shadow-md transition-shadow">
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={n.image_link || "/placeholder.svg"}
                        alt={n.title_en}
                        fill
                        className="absolute inset-0 object-cover object-center"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                        <p className="text-white font-bold text-sm line-clamp-2">
                          {n.title_en}
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <p className="text-xs text-gray-500">
                        {new Date(n.created_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {news.length > 4 && (
                <div className="mt-6 text-center">
                  <Link href={`/news?category_id=${id}`}>
                    <Button variant="outline" className="bg-transparent">
                      View All News →
                    </Button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-500">No news found.</p>
          )}
        </section>
      </div>
    </div>
  )
}
