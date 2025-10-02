"use client"

import { useState } from "react"
import { Star, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ReviewForm() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  return (
    <div className="space-y-4 p-6 border rounded-lg bg-white">
      <h3 className="text-lg font-bold text-[#5B8DEF]">Leave a Review</h3>
      <div>
        <label className="text-sm font-medium mb-2 block">Rating</label>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHoveredRating(i + 1)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 transition-colors ${
                  i < (hoveredRating || rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <Textarea placeholder="Write your review about this business..." className="min-h-32 resize-none" />
      </div>
      <Button className="bg-[#5B8DEF] hover:bg-[#4A7DD8] gap-2">
        <Send className="h-4 w-4" />
        Submit Review
      </Button>
    </div>
  )
}
