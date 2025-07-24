"use client"

import { AlertCircle, CheckCircle } from 'lucide-react'
import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'white',
          color: 'black',
        },
        success: {
          icon: <CheckCircle className="h-4 w-4 text-green-500" />,
          style: {
            border: '1px solid #22C55E',
          },
        },
        error: {
          icon: <AlertCircle className="h-4 w-4 text-red-500" />,
          style: {
            border: '1px solid #EF4444',
          },
        },
      }}
    />
  )
}
