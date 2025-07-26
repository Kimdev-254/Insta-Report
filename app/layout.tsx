import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClientLayout } from '@/components/client-layout'
import { Header } from '@/components/header'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Insta_Report - AI-Powered Academic Report Generator",
  description:
    "Generate professional academic reports in seconds with AI. Perfect for students' industrial attachment reports, research projects, and more.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen`} suppressHydrationWarning>
        <ClientLayout>
          <Header />
          <main className="flex-1">
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  )
}
