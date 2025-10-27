"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Calendar, Eye, Tag } from "lucide-react"

interface ArticleDetail {
  article_id: number
  article_title_en: string
  article_content_en: string
  article_header_image_link: string | null
  article_date: string
  article_views: number
  article_tags?: string[]
}

export default function ArticleDetailPage() {
  const { id } = useParams() as { id: string }
  const [article, setArticle] = useState<ArticleDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    async function fetchArticle() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(
          `https://koreyada-api.umiddev.uz/article_details/?post_id=${id}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
          }
        )

        if (!res.ok) {
          throw new Error(`Failed to fetch article detail: ${res.status}`)
        }

        const data = await res.json()
        setArticle(data)
      } catch (err) {
        console.error("❌ Error fetching article:", err)
        setError("Failed to load article details.")
      } finally {
        setLoading(false)
      }
    }

    fetchArticle()
  }, [id])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </div>
    )

  if (error || !article)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        ❌ {error || "Article not found"}
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* 🔹 Back Button */}
        <Link href="/articles">
          <Button variant="outline" className="mb-6">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        {/* 🔹 Header Image */}
        <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden mb-6 bg-gray-100">
          <Image
            src={
              article.article_header_image_link && article.article_header_image_link !== ""
                ? article.article_header_image_link
                : "/placeholder.svg"
            }
            alt={article.article_title_en}
            fill
            className="object-cover object-center"
            unoptimized
          />
        </div>

        {/* 🔹 Title */}
        <h1 className="text-3xl font-bold mb-4 text-[#1A1A1A]">
          {article.article_title_en}
        </h1>

        {/* 🔹 Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(article.article_date).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {article.article_views} views
          </div>
        </div>

        {/* 🔹 Tags */}
        {article.article_tags && article.article_tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {article.article_tags.map((tag) => (
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
          {article.article_content_en}
        </div>
      </div>
    </div>
  )
}
