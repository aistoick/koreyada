import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getSafeImageSrc(image?: string | null): string {
  if (!image || typeof image !== "string") return "/placeholder.svg"
  if (image.startsWith("http://") || image.startsWith("https://")) return image
  if (image.startsWith("/")) return image
  return "/placeholder.svg"
}