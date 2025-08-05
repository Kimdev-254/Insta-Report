"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export function Header() {
  const router = useRouter()
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-[#1CBF73] rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">Insta_Report</span>
          </Link>
          <nav className="flex gap-6">
            <Link href="/generate" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Generate
            </Link>
            <Link href="/reports" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Reports
            </Link>
          </nav>
        </div>
        <div className="flex items-center">
          <Button 
            onClick={() => router.push("/generate")}
            className="transition-all duration-200 hover:scale-[1.02]"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
