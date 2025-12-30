import React, { useEffect, useState } from 'react'

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

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={images[currentImageIndex]}
        alt="Gallery Image"
        className={`w-full h-full object-cover transition-opacity duration-500 ${fade ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  )
}
