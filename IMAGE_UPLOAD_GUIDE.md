# Image Upload Hook Usage Guide

## Overview
The `useImageUpload` hook provides a complete solution for uploading images to Supabase Storage with validation, loading states, and error handling.

## Basic Usage

```tsx
import { useImageUpload } from '@/hooks/use-image-upload'

function MyComponent() {
  const { uploadImage, isUploading, error, url } = useImageUpload({
    folder: 'my-images',
    maxSizeMB: 5,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
  })

  const handleFileUpload = async (file: File) => {
    const uploadedUrl = await uploadImage(file)
    if (uploadedUrl) {
      console.log('Upload successful:', uploadedUrl)
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileUpload(file)
        }}
      />
      {isUploading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {url && <img src={url} alt="Uploaded" />}
    </div>
  )
}
```

## ImageUpload Component Usage

```tsx
import { ImageUpload } from '@/components/image-upload'

function MyForm() {
  const [imageUrl, setImageUrl] = useState<string>('')

  return (
    <ImageUpload
      value={imageUrl}
      onChange={setImageUrl}
      folder="posts"
      maxSizeMB={10}
      placeholder="Upload your post image"
    />
  )
}
```

## Hook Options

- `bucket`: Storage bucket name (default: 'images')
- `folder`: Folder within bucket (default: 'uploads')
- `maxSizeMB`: Maximum file size in MB (default: 5)
- `allowedTypes`: Array of allowed MIME types (default: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'])

## Return Values

- `uploadImage(file)`: Async function to upload a file
- `deleteImage(url)`: Async function to delete an image
- `resetState()`: Function to reset the upload state
- `isUploading`: Boolean indicating upload in progress
- `error`: Error message if upload fails
- `url`: URL of successfully uploaded image

## Storage Buckets

The system uses three main buckets:
- `images`: General images
- `posts`: Blog post images
- `resources`: Resource images

## File Validation

The hook automatically validates:
- File type (must be image)
- File size (configurable limit)
- Required fields

## Error Handling

Common errors:
- "File type not supported"
- "File size too large"
- "Failed to upload image"
- Network/connection errors

All errors are captured and returned in the `error` state.