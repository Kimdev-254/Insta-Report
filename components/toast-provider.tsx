"use client"

import { AlertCircle, CheckCircle } from 'lucide-react'
import { Toaster } from 'sonner'
import { cn } from '@/lib/utils'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast: 'bg-white text-black',
          success: 'border border-green-500',
          error: 'border border-red-500',
        },
        style: {
          background: 'white',
          color: 'black',
        }
      }}
      icons={{
        success: <CheckCircle className="h-4 w-4 text-green-500" />,
        error: <AlertCircle className="h-4 w-4 text-red-500" />
      }}
    />
  )
}
