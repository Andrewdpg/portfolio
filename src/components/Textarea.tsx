import * as React from 'react'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: boolean
  helperText?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        <textarea
          className={`
            min-h-[80px]
            w-full 
            px-3 
            py-2 
            text-base
            rounded-md 
            border 
            border-app-light-gray
            bg-white
            text-gray-900
            placeholder:text-gray-500
            focus:outline-none 
            focus:ring-1 
            focus:ring-app-main
            disabled:cursor-not-allowed 
            disabled:opacity-50
            resize-y
            ${error ? 'border-app-orange focus:ring-app-orange' : ''}
            ${className}
          `}
          ref={ref}
          {...props}
        />
        {helperText && (
          <p
            className={`text-sm ${error ? 'text-app-orange' : 'text-gray-500'}`}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
