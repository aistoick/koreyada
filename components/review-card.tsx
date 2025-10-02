import { Star } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface ReviewCardProps {
  name: string
  rating: number
  comment: string
  date: string
}

export function ReviewCard({ name, rating, comment, date }: ReviewCardProps) {
  return (
    <div className="flex gap-4 p-6 border rounded-lg">
      <Avatar className="h-12 w-12">
        <AvatarFallback className="bg-gray-200">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{name}</h4>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          ))}
        </div>
        <p className="text-sm text-gray-600">{comment}</p>
      </div>
    </div>
  )
}
