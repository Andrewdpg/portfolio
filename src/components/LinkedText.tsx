import * as React from 'react'

export type LinkedTextProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string
  underline?: boolean
}

const LinkedText = React.forwardRef<HTMLAnchorElement, LinkedTextProps>(
  ({ className = '', underline = true, ...props }, ref) => {
    return (
      <a
        className={`
          text-app-white hover:text-app-gray font-bold
          transition-colors duration-200
          ${underline ? 'hover:underline' : ''}
          ${className}
        `}
        ref={ref}
        {...props}
      />
    )
  }
)
LinkedText.displayName = 'LinkedText'

export { LinkedText }
