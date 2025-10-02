"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Eye } from "lucide-react"

interface NewsDetail {
  id: number
  posts_title_en: string
  posts_content_en: string
  posts_image: string | null
  posts_created_at: string
  posts_views: number
}

export default function NewsDetailPage() {
  const { id } = useParams() // URL’dan id olish
  const [news, setNews] = useState<NewsDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    async function fetchNews() {
      try {
        const res = await fetch(
          `https://koreyada-api.umiddev.uz/news_details/?post_id=${id}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
          }
        )
        if (!res.ok) {
          throw new Error("Failed to fetch news detail")
        }
        const data = await res.json()
        setNews(data)
      } catch (err) {
        console.error("❌ Error fetching news detail:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">❌ News not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/news">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        {/* Image */}
        <div className="relative w-full h-72 rounded-lg overflow-hidden mb-6">
          <Image
            src={news.posts_image || "/placeholder.svg"}
            alt={news.posts_title_en}
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4">{news.posts_title_en}</h1>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(news.posts_created_at).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {news.posts_views} views
          </div>
        </div>

        {/* Content */}
        <div
          className="prose max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: news.posts_content_en }}
        />

        {/* Back to news list */}
        <div className="mt-10">
          <Link href="/news">
            <Button className="bg-[#5B8DEF] hover:bg-[#4A7DD8]">← Back to News</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
