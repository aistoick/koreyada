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
  return (
    // 'p-0' ni qo'shish, agar Card komponenti standart bo'shliqqa ega bo'lsa, uni olib tashlaydi.
    // 'h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow' kodi joyida qoladi.
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow p-0">
      {/* Rasm konteyneri. Bu qism to'g'ri ko'rinadi. */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover object-center"
        />
      </div>

      {/* CardContent ning bo'shlig'ini o'zgartirish. 
          Endi 'CardContent' asosiy Card ning p-0 bo'lishi sababli ichki bo'shliqqa ega bo'lmaydi.
          Biz bo'shliqni 'CardContent' ichidagi div ga o'tkazamiz.
      */}
      <CardContent className="flex flex-col flex-1 p-0">
        <div className="p-4 md:p-6 flex flex-col flex-1">
          <h3 className="text-base md:text-lg font-bold text-[#5B8DEF] hover:underline line-clamp-2">
            <Link href={`/news/${id}`}>{title}</Link>
          </h3>

          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 pt-2 border-t mt-auto">
            <Calendar className="h-3 w-3 md:h-4 md:w-4" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}