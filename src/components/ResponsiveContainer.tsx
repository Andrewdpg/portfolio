import React, { useRef, useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

type ResponsiveContainerProps = {
  children: React.ReactNode
  className?: string
}

function debounce(func: (...args: unknown[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: unknown[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [indexHidden, setIndexHidden] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      const container = containerRef.current
      if (!container) return

      const maxWidth = container.getBoundingClientRect().width
      const items = Array.from(container.children) as HTMLDivElement[]

      let totalWidth = 0
      items.map((item, index) => {
        totalWidth += item.getBoundingClientRect().width
        if (totalWidth <= maxWidth - 24) {
          setIndexHidden(index)
        }
      })
    }

    const debouncedUpdateVisibility = debounce(updateVisibility, 100)

    const resizeObserver = new ResizeObserver(debouncedUpdateVisibility)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    window.addEventListener('resize', debouncedUpdateVisibility)
    updateVisibility()

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', debouncedUpdateVisibility)
    }
  }, [children])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !containerRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  return (
    <div className={`relative flex items-center ${className}`}>
      <div
        ref={containerRef}
        className="flex overflow-hidden gap-1 py-1 w-full"
      >
        {children}
      </div>
      {showDropdown && (
        <div ref={dropdownRef} className="absolute right-0 top-full z-10">
          <div
            className={`flex bg-app-white border border-gray-200 shadow-md ${className} gap-1`}
          >
            {React.Children.map(children, (child, index) => {
              if (index > indexHidden) {
                return child
              }
            })}
          </div>
        </div>
      )}
      {indexHidden < React.Children.count(children) - 1 && (
        <button onClick={() => setShowDropdown(!showDropdown)} className="ml-2">
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
