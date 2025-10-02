import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface CategoryCardProps {
  icon?: LucideIcon
  iconSvg?: string
  title: string
  description: string
  href: string
  iconColor?: string
}

export function CategoryCard({ icon: Icon, iconSvg, title, description, href, iconColor = "bg-gray-100 text-gray-600" }: CategoryCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-gray-200">
        <CardContent className="flex flex-col items-center text-center p-4 md:p-6 space-y-3 md:space-y-4">
          <div className={`p-3 md:p-4 rounded-lg ${iconColor}`}>
            {iconSvg ? (
              <span
                className="h-6 w-6 md:h-8 md:w-8"
                dangerouslySetInnerHTML={{ __html: iconSvg }}
              />
            ) : (
              Icon && <Icon className="h-6 w-6 md:h-8 md:w-8" />
            )}
          </div>
          <h3 className="text-base md:text-xl font-bold">{title}</h3>
          <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
