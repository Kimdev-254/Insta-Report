'use client'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ToastProvider } from '@/components/toast-provider'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ToastProvider />
      {children}
    </ErrorBoundary>
  )
}
