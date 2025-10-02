import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  placeholder?: string
}

export function SearchBar({ placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Input
        type="text"
        placeholder={placeholder}
        className="h-12 pr-24 rounded-full border-2 border-gray-200 focus:border-[#5B8DEF] focus-visible:ring-0"
      />
      <Button className="absolute right-1 top-1 h-10 px-6 rounded-full bg-[#5B8DEF] hover:bg-[#4A7DD8]">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  )
}
