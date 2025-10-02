"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { ReviewCard } from "@/components/review-card"
import { ReviewForm } from "@/components/review-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, Calendar, Eye, Star, MessageSquare } from "lucide-react"

interface Article {
  id: number
  title: string
  content: string
  image?: string | null
  created_at: string
  views: number
  category?: string
  author?: string
  rating?: number
}

export default function ArticleDetailPage() {
  const { id } = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    async function fetchArticle() {
      try {
        const res = await fetch(`https://koreyada-api.umiddev.uz/article_details/?post_id=${id}`, {
          method: "POST",
          headers: { "accept": "application/json" },
        })
        if (!res.ok) {
          console.error("❌ Fetch error:", res.status)
          setLoading(false)
          return
        }
        const data = await res.json()
        setArticle({
          id: data.id,
          title: data.articles_title_en,
          content: data.articles_content_en,
          image: data.articles_image,
          created_at: data.articles_created_at,
          views: data.articles_views,
          category: data.category_name,
          author: data.author || "Admin",
          rating: 4.9, // agar API’dan kelsa, shu yerda almashtirasan
        })
      } catch (err) {
        console.error("❌ Error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchArticle()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>❌ Article not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/articles">
          <Button variant="default" className="mb-6 bg-[#5B8DEF] hover:bg-[#4A7DD8]">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex items-center gap-2 mb-4">
            {article.category && <Badge className="bg-[#5B8DEF]">{article.category}</Badge>}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{article.views}</span>
              </div>
            </div>
            {article.rating && (
              <div className="ml-auto flex items-center gap-1 text-yellow-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-bold">{article.rating}</span>
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-sm text-gray-600 mb-6">Author: {article.author}</p>

          {/* Article Image */}
          {article.image && (
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-gray-100 mb-8">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div
            className="prose max-w-none space-y-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Customer Reviews
          </h2>

          <ReviewForm />

          <div className="mt-8 space-y-4">
            <ReviewCard
              name="Asilbek Karimov"
              rating={5}
              comment="Excellent article! Very useful."
              date="2025-09-25"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
