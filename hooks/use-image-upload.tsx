import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface UseImageUploadOptions {
  bucket?: string
  folder?: string
  maxSizeMB?: number
  allowedTypes?: string[]
}

interface UploadResult {
  url: string | null
  error: string | null
  isUploading: boolean
}

export const useImageUpload = (options: UseImageUploadOptions = {}) => {
  const {
    bucket = 'images',
    folder = 'uploads',
    maxSizeMB = 5,
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  } = options

  const [uploadState, setUploadState] = useState<UploadResult>({
    url: null,
    error: null,
    isUploading: false
  })

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return `File type not supported. Please use: ${allowedTypes.join(', ')}`
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSizeMB) {
      return `File size too large. Maximum size: ${maxSizeMB}MB`
    }

    return null
  }

  const generateFileName = (file: File): string => {
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split('.').pop()
    return `${folder}/${timestamp}_${randomId}.${extension}`
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploadState({ url: null, error: null, isUploading: true })

      // Validate file
      const validationError = validateFile(file)
      if (validationError) {
        setUploadState({ url: null, error: validationError, isUploading: false })
        return null
      }

      // Generate unique filename
      const fileName = generateFileName(file)

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Upload error:', error)
        setUploadState({ 
          url: null, 
          error: error.message || 'Failed to upload image', 
          isUploading: false 
        })
        return null
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)

      setUploadState({ 
        url: publicUrl, 
        error: null, 
        isUploading: false 
      })

      return publicUrl
    } catch (err) {
      console.error('Upload error:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image'
      setUploadState({ 
        url: null, 
        error: errorMessage, 
        isUploading: false 
      })
      return null
    }
  }

  const deleteImage = async (url: string): Promise<boolean> => {
    try {
      // Extract file path from URL
      const urlParts = url.split('/')
      const fileName = urlParts[urlParts.length - 1]
      const filePath = `${folder}/${fileName}`

      const { error } = await supabase.storage
        .from(bucket)
        .remove([filePath])

      if (error) {
        console.error('Delete error:', error)
        return false
      }

      return true
    } catch (err) {
      console.error('Delete error:', err)
      return false
    }
  }

  const resetState = () => {
    setUploadState({ url: null, error: null, isUploading: false })
  }

  return {
    uploadImage,
    deleteImage,
    resetState,
    ...uploadState
  }
}