"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  MapPin,
  Phone,
  Mail,
  Star,
  MessageSquare,
} from "lucide-react"

const API_URL = "https://koreyada-api.umiddev.uz"

export default function BusinessDetailPage() {
  const { id } = useParams() as { id?: string }

  const [business, setBusiness] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      console.warn("⚠️ No business ID found in URL params.")
      return
    }

    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        console.log("📡 Fetching business details for ID:", id)

        // ✅ Business details
        const businessUrl = `${API_URL}/business_details/?business_id=${id}`
        const businessRes = await fetch(businessUrl, { method: "POST" })

        // ✅ Comments
        const commentUrl = `${API_URL}/business_comments/?business_id=${id}`
        const commentRes = await fetch(commentUrl, { method: "POST" })

        console.log("🟢 API responses:", {
          businessStatus: businessRes.status,
          commentsStatus: commentRes.status,
        })

        // ✅ Handle Business response
        if (!businessRes.ok) throw new Error(`Business fetch failed (${businessRes.status})`)
        const businessData = await businessRes.json()
        setBusiness(businessData)

        // ✅ Handle Comments response (404 bo‘lsa => bo‘sh array)
        if (commentRes.status === 404) {
          console.log("ℹ️ No comments found (404).")
          setComments([])
        } else if (commentRes.ok) {
          const commentsData = await commentRes.json()
          setComments(Array.isArray(commentsData) ? commentsData : [])
        } else {
          console.warn("⚠️ Unexpected comments response:", commentRes.status)
          setComments([])
        }
      } catch (err: any) {
        console.error("❌ Fetch error:", err)
        setError("⚠️ Failed to load business details.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 animate-pulse">
        Loading business details...
      </div>
    )

  if (error || !business)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || "Business not found."}
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container max-w-5xl mx-auto px-4 py-10">
        {/* Back Button */}
        <Link href="/categories">
          <Button variant="default" className="mb-6 bg-[#5B8DEF] hover:bg-[#4A7DD8]">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>

        {/* Business Info */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Logo */}
            <div className="relative w-full md:w-64 aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={business.business_logo || "/placeholder.svg"}
                alt={business.business_name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Text Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl font-bold">{business.business_name}</h2>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="h-6 w-6 fill-current" />
                  <span className="text-xl font-bold">{business.rating || 4.5}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {business.business_short_info_en}
              </p>

              <div className="space-y-3 text-gray-700">
                {business.business_location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <span>{business.business_location}</span>
                  </div>
                )}
                {business.business_phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <span>{business.business_phone}</span>
                  </div>
                )}
                {business.business_email && (
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <span>{business.business_email}</span>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                {business.business_phone && (
                  <a href={`tel:${business.business_phone}`}>
                    <Button className="bg-[#5B8DEF] hover:bg-[#4A7DD8] w-full">
                      Call Now
                    </Button>
                  </a>
                )}
                {business.business_email && (
                  <a href={`mailto:${business.business_email}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Send Email
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {business.business_full_info_en || "No detailed description available."}
          </p>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Customer Reviews
          </h2>

          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            <div className="space-y-6">
              {comments.map((c) => (
                <div
                  key={c.comment_id}
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{c.user_name}</h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < c.rating ? "fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{c.comment}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(c.comment_date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
