'use client'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ThemeProvider } from '@/components/theme-provider'
import { ToastProvider } from '@/components/toast-provider'
import { Header } from '@/components/header'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <ToastProvider />
        <Header />
        {children}
      </ErrorBoundary>
    </ThemeProvider>
  )
}
