import React from 'react';
import { cn } from '../../utils/cn';

const Input = React.forwardRef(({ 
  className, 
  type = 'text',
  error = false,
  disabled = false,
  size = 'md',
  ...props 
}, ref) => {
  const baseClasses = [
    'w-full border border-neutral-300 bg-white px-3 text-neutral-950',
    'placeholder:text-neutral-500',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500',
    'transition-colors duration-200',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-neutral-50'
  ];

  const sizes = {
    sm: 'py-1.5 text-sm h-8 rounded-lg',
    md: 'py-2 text-base h-10 rounded-lg',
    lg: 'py-3 text-lg h-12 rounded-xl'
  };

  const errorClasses = error ? [
    'border-error-500 focus:ring-error-500/50 focus:border-error-500'
  ] : [];

  return (
    <input
      type={type}
      className={cn(
        baseClasses,
        sizes[size],
        errorClasses,
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

const Label = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        'block text-sm font-medium text-neutral-950 mb-2',
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
});
Label.displayName = 'Label';

const FormGroup = ({ children, className, ...props }) => {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {children}
    </div>
  );
};

const ErrorMessage = ({ children, className, ...props }) => {
  if (!children) return null;
  
  return (
    <p 
      className={cn('text-sm text-error-600 mt-1', className)} 
      {...props}
    >
      {children}
    </p>
  );
};

const HelperText = ({ children, className, ...props }) => {
  if (!children) return null;
  
  return (
    <p 
      className={cn('text-sm text-neutral-600 mt-1', className)} 
      {...props}
    >
      {children}
    </p>
  );
};

export {
  Input,
  Label,
  FormGroup,
  ErrorMessage,
  HelperText,
};