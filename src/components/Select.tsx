import * as React from 'react'

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string
  label?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', label, children, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="block text-sm font-medium text-app-gray mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={`
            w-full px-3 py-2
            appearance-none
            bg-white
            border border-app-light-gray
            rounded-md
            text-black
            focus:outline-none focus:ring-1 focus:ring-app-main
            disabled:cursor-not-allowed disabled:opacity-50
            ${className}
          `}
            ref={ref}
            {...props}
          >
            {children}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-app-gray"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
