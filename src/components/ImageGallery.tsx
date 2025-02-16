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
    <img
      src={images[currentImageIndex]}
      alt="Gallery Image"
      className={`rounded-lg transition-all duration-300 ${fade ? 'opacity-10' : 'opacity-100'} ${className}`}
    />
  )
}
