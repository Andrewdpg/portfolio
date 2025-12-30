import * as React from 'react'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  variant?: 'primary' | 'secondary' | 'text' | 'icon' | 'option' | 'tab'
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = '', variant = 'primary', fullWidth = false, ...props },
    ref
  ) => {
    const baseStyles =
      'transition-all duration-300 font-bold text-xs uppercase tracking-widest focus:outline-none disabled:opacity-50 active:scale-95'

    const variants = {
      primary:
        'bg-black text-white hover:bg-black/80 rounded-full px-8 py-3.5 shadow-xl shadow-black/10',
      secondary:
        'bg-white text-black border-2 border-black hover:bg-black hover:text-white rounded-full px-8 py-3.5',
      text: 'bg-transparent text-black/60 hover:text-black hover:bg-black/5 rounded-xl px-4 py-2',
      icon: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black rounded-2xl p-3',
      option:
        'bg-black/5 text-black hover:bg-black hover:text-white rounded-xl px-4 py-2',
      tab: 'bg-transparent border border-black/10 text-black/40 hover:text-black hover:border-black rounded-full px-6 py-2',
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
