"use client"

import Link from "next/link"
import Image from "next/image"
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
  image,
  address,
  phone,
}: BusinessCardProps) {
  const displayImage =
    image && (image.startsWith("http") || image.startsWith("/"))
      ? image
      : "/placeholder.svg"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow p-0 h-full flex flex-col">
      <div className="relative w-full h-56 bg-gray-100">
        <Image
          src={displayImage}
          alt={name || "Business image"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center"
        />
      </div>

      <CardContent className="p-4 md:p-6 flex flex-col flex-1">
        <div className="space-y-3 md:space-y-4 flex-1">
          <Link href={`/business/${id}`}>
            <h3 className="text-base md:text-lg font-bold text-[#5B8DEF] hover:underline transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>

          <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
            {description}
          </p>

          <div className="space-y-2 text-xs md:text-sm text-gray-600">
            {address && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{address}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="line-clamp-1">{phone}</span>
              </div>
            )}
          </div>
        </div>

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
