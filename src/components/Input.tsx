import * as React from 'react'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string
  error?: boolean
  helperText?: string
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, helperText, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-app-gray">
            {label}
          </label>
        )}
        <input
          className={`
            w-full px-3 py-2 
            border border-app-light-gray 
            rounded-md
            placeholder:text-app-gray
            focus:outline-none focus:ring-1 focus:ring-app-main
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? 'border-app-orange focus:ring-app-orange' : ''}
            ${className}
          `}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p
            className={`mt-1 text-sm ${error ? 'text-app-orange' : 'text-app-gray'}`}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
