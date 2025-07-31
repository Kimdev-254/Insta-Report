"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Header() {
  const router = useRouter()
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">Insta_Report</span>
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
