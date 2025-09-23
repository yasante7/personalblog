import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useImageUpload } from '@/hooks/use-image-upload'

interface ImageUploadProps {
  value?: string
  onChange: (url: string | null) => void
  folder?: string
  maxSizeMB?: number
  className?: string
  placeholder?: string
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  folder = 'uploads',
  maxSizeMB = 5,
  className = '',
  placeholder = 'Upload an image'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(value || null)
  
  const { uploadImage, deleteImage, isUploading, error } = useImageUpload({
    folder,
    maxSizeMB
  })

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Create preview
    const preview = URL.createObjectURL(file)
    setPreviewUrl(preview)

    // Upload file
    const uploadedUrl = await uploadImage(file)
    if (uploadedUrl) {
      onChange(uploadedUrl)
      // Clean up preview URL since we have the real URL
      URL.revokeObjectURL(preview)
      setPreviewUrl(uploadedUrl)
    } else {
      // Remove preview if upload failed
      URL.revokeObjectURL(preview)
      setPreviewUrl(value || null)
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveImage = async () => {
    if (value) {
      const success = await deleteImage(value)
      if (success) {
        onChange(null)
        setPreviewUrl(null)
      }
    } else {
      onChange(null)
      setPreviewUrl(null)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="space-y-4">
        {/* Preview Area */}
        <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          {previewUrl ? (
            <div className="relative aspect-video w-full">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Remove button */}
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemoveImage}
                disabled={isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
              {/* Loading overlay */}
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-white animate-spin" />
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-video w-full flex flex-col items-center justify-center p-8 text-gray-500 dark:text-gray-400">
              <ImageIcon className="h-12 w-12 mb-4" />
              <p className="text-sm text-center mb-4">{placeholder}</p>
              <Button
                type="button"
                variant="outline"
                onClick={handleUploadClick}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Image
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Upload Button (when image exists) */}
        {previewUrl && (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleUploadClick}
              disabled={isUploading}
              className="flex-1"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Change Image
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleRemoveImage}
              disabled={isUploading}
            >
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
            {error}
          </div>
        )}

        {/* File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          aria-label="Upload image file"
        />

        {/* Helper Text */}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Supported formats: JPEG, PNG, WebP, GIF. Maximum size: {maxSizeMB}MB
        </p>
      </div>
    </div>
  )
}