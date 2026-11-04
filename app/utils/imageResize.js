/**
 * Utility to resize and compress images on the client side before upload.
 * Reduces large smartphone photos (e.g. 10-15MB each) to ~200-400KB without visible quality loss.
 */

export const resizeImage = (
  file,
  maxWidth = 1920,
  maxHeight = 1920,
  quality = 0.85,
) =>
  new Promise((resolve) => {
    if (
      !file ||
      typeof window === 'undefined' ||
      typeof document === 'undefined'
    ) {
      return resolve(file)
    }

    if (
      !file.type ||
      !file.type.startsWith('image/') ||
      file.type === 'image/svg+xml'
    ) {
      return resolve(file)
    }

    // In non-browser / mock test environments without FileReader or Image
    if (typeof FileReader === 'undefined' || typeof Image === 'undefined') {
      return resolve(file)
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        let { width, height } = img

        // If image is already smaller than max bounds and file size < 1MB, keep original
        if (
          width <= maxWidth &&
          height <= maxHeight &&
          file.size <= 1024 * 1024
        ) {
          return resolve(file)
        }

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height)
          height = maxHeight
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext && canvas.getContext('2d')
        if (!ctx) {
          return resolve(file)
        }

        ctx.drawImage(img, 0, 0, width, height)

        if (typeof canvas.toBlob !== 'function') {
          return resolve(file)
        }

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return resolve(file)
            }
            const cleanName = (file.name || 'photo.jpg').replace(
              /\.[^/.]+$/,
              '.jpg',
            )
            try {
              const resizedFile = new File([blob], cleanName, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              })
              resolve(resizedFile)
            } catch (err) {
              blob.name = cleanName
              resolve(blob)
            }
          },
          'image/jpeg',
          quality,
        )
      }
      img.onerror = () => resolve(file)
      img.src = e.target.result
    }
    reader.onerror = () => resolve(file)
    reader.readAsDataURL(file)
  })

export const resizeImages = async (
  files,
  maxWidth = 1920,
  maxHeight = 1920,
  quality = 0.85,
) => {
  if (!Array.isArray(files) || files.length === 0) return []
  return Promise.all(
    files.map((file) => resizeImage(file, maxWidth, maxHeight, quality)),
  )
}

export default resizeImages
