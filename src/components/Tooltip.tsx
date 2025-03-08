import React from 'react'

type TooltipProps = {
  onClick?: () => void
  tooltip: React.ReactNode
  children: React.ReactNode
  color?: string
  title: string
}

const Tooltip: React.FC<TooltipProps> = ({
  onClick,
  title,
  tooltip,
  children,
  color,
}) => {
  return (
    <div className="relative group w-fit h-fit justify-center items-center">
      <a
        onClick={onClick}
        className="relative flex items-center justify-center w-fit h-fit py-2 px-3 rounded-lg bg-white text-gray-700 transition-all duration-300 ease-in-out hover:shadow-lg group cursor-pointer overflow-hidden group-hover:text-white"
      >
        <span
          className="absolute inset-0 transform translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0"
          style={{ backgroundColor: color }}
        ></span>
        <span className="relative flex items-center">
          {children}
          {title && (
            <p className="text-sm max-w-full transition-all duration-300 overflow-hidden ml-2 group-hover:text-white">
              {title}
            </p>
          )}
        </span>
      </a>
      <div
        className="absolute opacity-0 bottom-0 group-hover:bottom-16 transform text-white text-sm py-1 px-2 rounded pointer-events-none transition-all duration-300 ease-in-out group-hover:opacity-100 flex flex-col items-center gap-2"
        style={{ backgroundColor: color }}
      >
        {tooltip && <p className="text-xs text-white text-center">{tooltip}</p>}
      </div>
    </div>
  )
}

export default Tooltip
