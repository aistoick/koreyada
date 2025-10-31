"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"

interface NewsCardProps {
  id: string | number
  title: string
  image?: string | null
  date: string
}

export function NewsCard({ id, title, image, date }: NewsCardProps) {
  const displayImage =
    image && (image.startsWith("http") || image.startsWith("/"))
      ? image
      : "/placeholder.svg"

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow p-0">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={displayImage}
          alt={title || "News image"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </div>

      <CardContent className="flex flex-col flex-1 p-0">
        <div className="p-4 md:p-6 flex flex-col flex-1">
          <Link href={`/news/${id}`}>
            <h3 className="text-base md:text-lg font-bold text-[#5B8DEF] hover:underline line-clamp-2">
              {title}
            </h3>
          </Link>

          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 pt-2 border-t mt-auto">
            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
            <span>
              {new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
