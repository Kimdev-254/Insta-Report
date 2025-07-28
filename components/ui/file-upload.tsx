"use client"

import { useState } from "react"
import { FileUp, AlertCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileUploadProps {
  id: string
  label: string
  description: string
  maxSize?: number // in MB
  accept?: string
  required?: boolean
  multiple?: boolean
  maxFiles?: number
  onUpload: (files: File[]) => Promise<void>
}

export function FileUpload({
  id,
  label,
  description,
  maxSize = 5, // default 5MB
  accept,
  required = false,
  multiple = false,
  maxFiles = 10,
  onUpload,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const validateFiles = (files: FileList): File[] => {
    const validFiles: File[] = []
    const errors: string[] = []

    // Check number of files
    if (multiple && files.length > maxFiles) {
      errors.push(`You can only upload up to ${maxFiles} files`)
      return []
    }

    Array.from(files).forEach(file => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        errors.push(`${file.name} is too large. Maximum size is ${maxSize}MB`)
        return
      }

      // Check file type
      if (accept && !file.type.match(accept)) {
        errors.push(`${file.name} is not a valid file type`)
        return
      }

      validFiles.push(file)
    })

    if (errors.length > 0) {
      setError(errors.join(". "))
      return []
    }

    return validFiles
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setError(null)
    const validFiles = validateFiles(files)
    if (validFiles.length === 0) return

    setUploading(true)
    setProgress(0)

    try {
      await onUpload(validFiles)
      setProgress(100)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload files")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="border-2 border-dashed rounded-lg p-6 hover:border-primary transition-colors">
        <input
          id={id}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          disabled={uploading}
        />
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center gap-2 cursor-pointer"
        >
          <FileUp className="h-8 w-8 text-muted-foreground" />
          <span className="text-sm font-medium">
            {uploading ? "Uploading..." : "Choose files"}
          </span>
        </label>
      </div>

      {uploading && (
        <Progress value={progress} className="h-2" />
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
