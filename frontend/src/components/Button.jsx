import { cn } from '../lib/utils.js'

export function Button({ className, children, variant = 'default', size = 'default', ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
          'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
          'bg-green-500 hover:bg-green-600 text-white': variant === 'success',
          'bg-primary/10 text-primary hover:bg-primary/20': variant === 'ghost',
        },
        {
          'h-10 py-2 px-4 text-sm': size === 'default',
          'h-9 px-3 rounded-md text-xs': size === 'sm',
          'h-11 rounded-md px-8 text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

