import React from 'react';
import { cn } from '../../utils/cn';

const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  children, 
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props 
}, ref) => {
  const baseClasses = [
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    fullWidth && 'w-full'
  ];

  const variants = {
    primary: [
      'bg-primary-500 text-white border border-transparent',
      'hover:bg-primary-600 active:bg-primary-700',
      'focus:ring-primary-500/50',
      'shadow-sm hover:shadow-md'
    ],
    secondary: [
      'bg-neutral-100 text-neutral-950 border border-neutral-200',
      'hover:bg-neutral-200 active:bg-neutral-300',
      'focus:ring-neutral-500/50'
    ],
    outline: [
      'bg-transparent text-neutral-950 border border-neutral-300',
      'hover:bg-neutral-50 active:bg-neutral-100',
      'focus:ring-neutral-500/50'
    ],
    ghost: [
      'bg-transparent text-neutral-700 border border-transparent',
      'hover:bg-neutral-100 active:bg-neutral-200',
      'focus:ring-neutral-500/50'
    ],
    danger: [
      'bg-error-500 text-white border border-transparent',
      'hover:bg-error-600 active:bg-error-700',
      'focus:ring-error-500/50',
      'shadow-sm hover:shadow-md'
    ]
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm h-8 rounded-lg',
    md: 'px-4 py-2 text-base h-10 rounded-lg',
    lg: 'px-6 py-3 text-lg h-12 rounded-xl',
    xl: 'px-8 py-4 text-xl h-14 rounded-xl'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  };

  const buttonClasses = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    className
  );

  const LoadingSpinner = () => (
    <svg 
      className={`animate-spin ${iconSizes[size]}`}
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const IconComponent = ({ icon, position }) => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { 
        className: cn(iconSizes[size], icon.props.className) 
      });
    }
    return icon;
  };

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <IconComponent icon={icon} position="left" />
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <IconComponent icon={icon} position="right" />
          )}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;