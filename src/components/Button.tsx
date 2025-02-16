import * as React from 'react'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  variant?: 'primary' | 'secondary' | 'text' | 'icon' | 'option'
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = '', variant = 'primary', fullWidth = false, ...props },
    ref
  ) => {
    const baseStyles =
      'transition-all duration-300 font-medium text-sm focus:outline-none focus:ring-offset-2 disabled:opacity-50'

    const variants = {
      primary:
        'bg-app-main hover:bg-app-main/90 text-app-white focus:ring-2 focus:ring-app-main rounded-md px-4 py-2',
      secondary:
        'bg-black hover:bg-app-main/90 text-app-white focus:ring-2 focus:ring-app-main rounded-md px-4 py-2',
      text: 'bg-transparent hover:text-gray-700 text-app-main disabled:hover:text-white rounded-md px-4 py-2',
      icon: 'bg-white hover:bg-app-main text-app-secondary focus:ring-2 focus:ring-app-main rounded-full p-2 hover:translate-y-[-7px]',
      option:
        'bg-transparent hover:bg-app-main/90 hover:text-app-white text-black focus:ring-2 focus:ring-app-main rounded-md px-3 py-2',
    }

    return (
      <button
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
