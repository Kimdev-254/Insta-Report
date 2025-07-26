"use client"

import * as React from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          {/* Add your navigation menu or logo here */}
          <nav className="flex items-center space-x-6">
            <a href="/" className="font-bold">
              Insta_Report
            </a>
          </nav>
          
          {/* Theme toggle positioned on the right */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
