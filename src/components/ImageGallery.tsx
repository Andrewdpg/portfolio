import React, { useEffect, useState, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type ImageGalleryProps = {
  className?: string
  images: string[]
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  className,
  images,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [fade, setFade] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (index === currentImageIndex) return
      setFade(true)
      setTimeout(() => {
        setCurrentImageIndex(index)
        setFade(false)
      }, 300)
    },
    [currentImageIndex]
  )

  const goNext = useCallback(() => {
    goTo((currentImageIndex + 1) % images.length)
  }, [currentImageIndex, images.length, goTo])

  const goPrev = useCallback(() => {
    goTo((currentImageIndex - 1 + images.length) % images.length)
  }, [currentImageIndex, images.length, goTo])

  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setFade(true)
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
        setFade(false)
      }, 500)
    }, 10000)

    return () => clearInterval(interval)
  }, [images.length])

  if (images.length === 0) return null

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="relative overflow-hidden rounded-2xl bg-black/5">
        <img
          src={images[currentImageIndex]}
          alt="Gallery Image"
          loading="lazy"
          width={800}
          height={600}
          className={`w-full h-full object-cover transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? 'border-app-main opacity-100 ring-1 ring-app-main/30'
                  : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
