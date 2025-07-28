import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from "@/components/header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Insta_Report - AI-Powered Academic Report Generator",
  description: "Generate professional academic reports in seconds with AI."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
