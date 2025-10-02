"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone } from "lucide-react"

interface BusinessCardProps {
  id: string | number
  name: string
  description: string
  image?: string | null
  address?: string
  phone?: string
}

export function BusinessCard({
  id,
  name,
  description,
  image = "/test.jpg",
  address = "",
  phone = "",
}: BusinessCardProps) {
  // Remote rasm bo'lmasa yoki noto'g'ri bo'lsa fallback
  const displayImage =
    image && image.startsWith("http") ? image : "/test.jpg"

  return (
    // 'p-0' rasm va CardContent orasidagi bo'shliqni yo'qotadi
    <Card className="overflow-hidden hover:shadow-lg transition-shadow p-0 h-full flex flex-col">
      {/* Image Section (oddiy <img>) */}
      <div className="w-full h-56 overflow-hidden bg-gray-100">
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* ✅ TO'G'IRLASH: CardContent ga flex-col va flex-1 qo'shamiz */}
      <CardContent className="p-4 md:p-6 flex flex-col flex-1">
        
        {/* Kontent konteyneri - u avtomatik ravishda mavjud bo'shliqni egallaydi */}
        <div className="space-y-3 md:space-y-4 flex-1">
          <h3 className="text-base md:text-lg font-bold text-[#5B8DEF] line-clamp-1">
            {name}
          </h3>

          {/* Tavsifni cheklash muhim */}
          <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
            {description}
          </p>

          {/* Manzil va telefon raqami */}
          <div className="space-y-2 text-xs md:text-sm text-gray-600">
            {address ? (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{address}</span>
              </div>
            ) : null}
            {phone ? (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="line-clamp-1">{phone}</span>
              </div>
            ) : null}
          </div>
        </div>
        
        {/* Tugma - endi u har doim pastda joylashadi, 
            chunki yuqoridagi div flex-1 tufayli barcha bo'shliqni egallaydi. 
            mt-auto ni olib tashladim, chunki u endi kerak emas.
        */}
        <Button
          asChild
          className="w-full bg-[#5B8DEF] hover:bg-[#4A7DD8] text-sm md:text-base h-9 md:h-10 mt-4" 
        >
          <Link href={`/business/${id}`}>See All</Link>
        </Button>
      </CardContent>
    </Card>
  )
}