import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

export async function uploadFile(file: File, folder: string, onProgress?: (progress: number) => void): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to upload file')
    }

    const data = await response.json()
    return data.url
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
}

export async function uploadMultipleFiles(
  files: File[],
  folder: string,
  onProgress?: (progress: number) => void
): Promise<string[]> {
  const urls: string[] = []
  const total = files.length

  for (let i = 0; i < files.length; i++) {
    const url = await uploadFile(files[i], folder)
    urls.push(url)
    
    if (onProgress) {
      onProgress((i + 1) / total * 100)
    }
  }

  return urls
}
