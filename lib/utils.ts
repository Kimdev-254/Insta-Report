import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function estimatePageCount(text: string): number {
  // Roughly 350 words per page (academic standard)
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 350))
}
