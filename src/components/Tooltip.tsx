import React from 'react'

type TooltipProps = {
  onClick?: () => void
  tooltip: React.ReactNode
  children: React.ReactNode
  title: string
}

const Tooltip: React.FC<TooltipProps> = ({
  onClick,
  title,
  tooltip,
  children,
}) => {
  return (
    <div className="relative group w-fit h-fit justify-center items-center">
      <div
        onClick={onClick}
        className="relative flex items-center justify-center w-fit h-fit py-3 px-5 rounded-2xl bg-app-main/5 hover:bg-app-main text-app-secondary/60 hover:text-white transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-app-main/20 group cursor-pointer border border-app-main/5 hover:border-app-main active:scale-95"
      >
        <span className="relative flex items-center gap-3">
          <div className="text-2xl transition-transform duration-300 group-hover:scale-110">
            {children}
          </div>
          {title && (
            <p className="text-sm font-black transition-all duration-300 tracking-tight uppercase">
              {title}
            </p>
          )}
        </span>
      </div>

      {/* Refined Tooltip Bubble */}
      <div className="absolute opacity-0 -top-2 left-1/2 -translate-x-1/2 -translate-y-full px-4 py-2 bg-app-secondary text-white text-[10px] uppercase tracking-widest font-bold rounded-xl pointer-events-none transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:-top-4 shadow-2xl z-50 whitespace-nowrap">
        {tooltip}
        {/* Tail */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-app-secondary" />
      </div>
    </div>
  )
}

export default Tooltip
