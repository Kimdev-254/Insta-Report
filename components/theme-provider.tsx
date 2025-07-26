"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"

export function ThemeProvider({ 
  children, 
  ...props 
}: {
  children: React.ReactNode
  [key: string]: any
}) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemeProvider>
  )
}
