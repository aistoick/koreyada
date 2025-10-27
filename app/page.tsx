"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SearchBar } from "@/components/search-bar"
import { CategoryCard } from "@/components/category-card"
import { NewsCard } from "@/components/news-card"
import { ArticleCard } from "@/components/article-card"
import { BusinessCard } from "@/components/business-card"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [categories, setCategories] = useState<any[]>([])
  const [news, setNews] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [businesses, setBusinesses] = useState<any[]>([])

  // ✅ fetch categories
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/main_categories/")
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
    })()
  }, [])

  // ✅ fetch news
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/latest_news/")
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
    })()
  }, [])

  // ✅ fetch articles
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/latest_articles/")
        const data = await res.json()
        const parsed = data.map((item: any) => {
          const id = Object.keys(item)[0]
          const a = item[id]
          return {
            id,
            title: a.articles_title_en,
            excerpt: a.articles_title_uz ?? "",
            image: a.articles_image ?? "/placeholder.svg",
            date: a.articles_created_at,
          }
        })
        setArticles(parsed)
      } catch (err) {
        console.error("❌ Articles fetch error:", err)
      }
    })()
  }, [])

  // ✅ fetch businesses
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch("/api/featured_businesses/")
        const data = await res.json()
        const parsed = data.map((item: any) => {
          const id = Object.keys(item)[0]
          const b = item[id]
          return {
            id,
            name: b.business_name,
            description: b.business_short_info_en,
            image: b.business_logo ?? "/placeholder.svg",
            address: b.business_location,
            phone: b.business_phone,
          }
        })
        setBusinesses(parsed)
      } catch (err) {
        console.error("❌ Businesses fetch error:", err)
      }
    })()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-16 px-4">
        <div className="container max-w-5xl mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Your Gateway to Life in Korea
          </h1>
          <SearchBar placeholder="Search for anything..." />
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#5B8DEF]">Categories</h2>
            <Link href="/categories">
              <Button variant="outline" className="border-gray-300 bg-transparent text-sm md:text-base">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-6">
            {categories.map((c) => (
              <CategoryCard
                key={c.id}
                iconSvg={c.iconSvg}
                title={c.title}
                description={c.description}
                href={`/categories/${c.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-[#5B8DEF]">Korea</span> News
            </h2>
            <Link href="/news">
              <Button variant="outline" className="border-gray-300 bg-transparent text-sm md:text-base">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {news.map((n) => (
              <NewsCard key={n.id} id={n.id} title={n.title} image={n.image} date={n.date} />
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-[#5B8DEF]">Latest</span> Articles
            </h2>
            <Link href="/articles">
              <Button variant="outline" className="border-gray-300 bg-transparent text-sm md:text-base">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {articles.map((a) => (
              <ArticleCard
                key={a.id}
                id={a.id}
                title={a.title}
                excerpt={a.excerpt}
                image={a.image}
                date={a.date}
                views={0}
                readTime="5 min"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Businesses */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              <span className="text-[#5B8DEF]">Featured</span> Businesses
            </h2>
            <Link href="/business">
              <Button variant="outline" className="border-gray-300 bg-transparent text-sm md:text-base">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {businesses.map((b) => (
              <BusinessCard
                key={b.id}
                id={b.id}
                name={b.name}
                description={b.description}
                image={b.image}
                address={b.address}
                phone={b.phone}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
