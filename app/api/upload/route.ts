import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const maxDuration = 300 // Set max duration to 5 minutes
export const dynamic = 'force-dynamic'

type ValidFileTypes = {
  'image/jpeg': string[];
  'image/png': string[];
  'application/pdf': string[];
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': string[];
}

// Helper function to validate file type and extension
function isValidFileType(file: File) {
  const validTypes: ValidFileTypes = {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
  }

  // Add debug logging
  console.log('Validating file:', {
    name: file.name,
    type: file.type,
    size: file.size
  })

  // Check mime type
  const fileType = file.type
  console.log('File type:', fileType)
  console.log('Valid types:', Object.keys(validTypes))

  if (!Object.keys(validTypes).includes(fileType)) {
    console.log('Invalid mime type:', fileType)
    return false
  }

  // Check file extension
  const fileName = file.name.toLowerCase()
  const fileExt = '.' + fileName.split('.').pop()
  console.log('File extension:', fileExt)
  
  const isValid = validTypes[fileType as keyof ValidFileTypes].includes(fileExt)
  console.log('Is valid file:', isValid)
  
  return isValid
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    // Add request logging
    console.log('Received file:', {
      name: file?.name,
      type: file?.type,
      size: file?.size
    })

    const supabase = createRouteHandlerClient({ cookies })
    const folder = formData.get('folder') as string

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!isValidFileType(file)) {
      return NextResponse.json(
        { 
          error: 'Invalid file type. Allowed types: JPG, PNG, PDF, DOCX',
          providedType: file.type,
          fileName: file.name
        },
        { status: 400 }
      )
    }

    // Generate unique filename with sanitization
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}-${sanitizedName}`

    // Upload to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from('insta-report-files')
      .upload(`${folder}/${fileName}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Storage error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload file', details: uploadError.message },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('insta-report-files')
      .getPublicUrl(`${folder}/${fileName}`)

    return NextResponse.json({
      url: publicUrl,
      path: data.path,
      fileName: fileName
    })

  } catch (error: unknown) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
