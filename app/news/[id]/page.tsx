"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Eye, Tag } from "lucide-react"

interface NewsDetail {
  news_id: number
  news_title_en: string
  news_content_en: string
  news_header_image_link: string | null
  news_date: string
  news_views: number
  news_tags?: string[]
}

export default function NewsDetailPage() {
  const { id } = useParams() as { id: string }
  const [news, setNews] = useState<NewsDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    async function fetchNews() {
      try {
        setLoading(true)
        setError(null)

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
          throw new Error(`Failed to fetch news detail: ${res.status}`)
        }

        const data = await res.json()
        setNews(data)
      } catch (err) {
        console.error("❌ Error fetching news detail:", err)
        setError("Failed to load news details.")
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    )

  if (error || !news)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        ❌ {error || "News not found"}
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* 🔹 Back Button */}
        <Link href="/news">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        {/* 🔹 Header Image */}
        <div className="relative w-full h-72 rounded-lg overflow-hidden mb-6 bg-gray-100">
          <Image
            src={
              news.news_header_image_link && news.news_header_image_link !== ""
                ? news.news_header_image_link
                : "/placeholder.svg"
            }
            alt={news.news_title_en}
            fill
            className="object-cover object-center"
            unoptimized
          />
        </div>

        {/* 🔹 Title */}
        <h1 className="text-3xl font-bold mb-4 text-[#1A1A1A]">{news.news_title_en}</h1>

        {/* 🔹 Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(news.news_date).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {news.news_views} views
          </div>
        </div>

        {/* 🔹 Tags */}
        {news.news_tags && news.news_tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {news.news_tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full"
              >
                <Tag className="h-4 w-4" /> {tag}
              </span>
            ))}
          </div>
        )}

        {/* 🔹 Content */}
        <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {news.news_content_en}
        </div>
      </div>
    </div>
  )
}
