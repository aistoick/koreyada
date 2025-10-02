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

const categoryMap: Record<string, number> = {
  visa: 1,
  law: 2,
  food: 3,
  money: 4,
  housing: 5,
  "sim-cards": 6,
}

export default function CategoryPage() {
  const { slug } = useParams() as { slug: string }
  const [businesses, setBusinesses] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [news, setNews] = useState<any[]>([])

  useEffect(() => {
    if (!slug) return
    const categoryId = categoryMap[slug]

    if (!categoryId) {
      console.error("❌ Category not found for slug:", slug)
      return
    }

    async function fetchData() {
      try {
        // Businesses
        const bizRes = await fetch("https://koreyada-api.umiddev.uz/category_businesses/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category_id: categoryId }),
        })
        setBusinesses(await bizRes.json())

        // Articles
        const artRes = await fetch("https://koreyada-api.umiddev.uz/category_articles/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category_id: categoryId }),
        })
        setArticles(await artRes.json())

        // News
        const newsRes = await fetch("https://koreyada-api.umiddev.uz/category_news/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category_id: categoryId }),
        })
        setNews(await newsRes.json())
      } catch (err) {
        console.error("❌ Fetch error:", err)
      }
    }

    fetchData()
  }, [slug])

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/categories">
          <Button variant="default" className="mb-6 bg-[#5B8DEF] hover:bg-[#4A7DD8]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Businesses */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold mb-2 capitalize">{slug}</h1>
            <p className="text-gray-600 mb-8">All businesses and services in {slug} category</p>

            <div className="space-y-6">
              {businesses.map((b) => (
                <Card key={b.business_id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-64 h-48">
                      <Image
                        src={b.business_image || "/placeholder.svg"}
                        alt={b.business_name_en}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold">{b.business_name_en}</h3>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-5 w-5 fill-current" />
                          <span className="font-bold">{b.business_rating || "4.5"}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{b.business_description_en}</p>
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        {b.business_address && (
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>{b.business_address}</span>
                          </div>
                        )}
                        {b.business_phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <span>{b.business_phone}</span>
                          </div>
                        )}
                        {b.business_website && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 flex-shrink-0" />
                            <span>{b.business_website}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-[#5B8DEF] hover:bg-[#4A7DD8]">Read more</Button>
                        {b.business_website && (
                          <Button variant="outline" className="flex-1 bg-transparent">
                            Visit website
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column - Related Articles */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="space-y-6">
              {articles.map((a) => (
                <ArticleCard
                  key={a.articles_id}
                  id={a.articles_id}
                  title={a.articles_title_en}
                  excerpt={a.articles_content_en}
                  image={a.articles_image}
                  date={a.articles_created_at}
                  views={a.articles_views}
                  readTime="5 min"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Latest News Section */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">📈 Latest News</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.map((n) => (
              <Card key={n.news_id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={n.news_image || "/placeholder.svg"}
                    alt={n.news_title_en}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <p className="text-white font-bold text-sm line-clamp-2">{n.news_title_en}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-500">
                    {new Date(n.news_created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
