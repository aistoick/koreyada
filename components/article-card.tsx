"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Eye, ArrowRight } from "lucide-react"

interface ArticleCardProps {
  id: string | number
  title: string
  excerpt?: string
  image?: string | null
  date: string
  views?: number
  readTime?: string
}

export function ArticleCard({
  id,
  title,
  excerpt,
  image,
  date,
  views = 0,
  readTime,
}: ArticleCardProps) {
  return (
    // ✅ 1. Rasm uchun 'p-0' va joylashuv uchun 'flex-col' qo'shildi
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow p-0">
      {/* Image */}
      <div className="relative w-full h-48 md:h-56">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Content */}
      <CardContent className="flex flex-col flex-1 p-4 md:p-6">
        
        {/* ✅ 2. Sarlavha va qisqa matnni flex-1 konteyneriga joylashtirish */}
        <div className="flex flex-col flex-1 space-y-2 mb-4">
          <h3 className="text-base md:text-lg font-bold hover:text-[#5B8DEF] line-clamp-2">
            <Link href={`/articles/${id}`}>{title}</Link>
          </h3>

          {excerpt && (
            <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
              {excerpt}
            </p>
          )}
        </div>
        {/* End of flex-1 content container */}


        {/* ✅ 3. Tugma va O'qish vaqti - Endi bu alohida blok */}
        <div className="flex items-center justify-between pb-2">
          <Link href={`/articles/${id}`} passHref>
            <Button variant="link" className="text-[#5B8DEF] p-0 h-auto text-sm md:text-base">
              Read More <ArrowRight className="ml-1 h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </Link>
          {readTime && <span className="text-xs md:text-sm text-gray-500">{readTime}</span>}
        </div>

        {/* ✅ 4. Footer info - 'border-t' yana joyiga qaytdi va bu joylashuvni barqaror ushlaydi */}
        <div className="flex items-center gap-3 text-xs md:text-sm text-gray-500 pt-2 border-t">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3 md:h-4 md:w-4" />
            <span>{views} views</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}