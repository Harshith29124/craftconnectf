import React from 'react';
import { cn } from '../../utils/cn';

const Card = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'bg-white border border-neutral-200 rounded-xl shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('p-6 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  );
});
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        'text-xl font-semibold leading-none tracking-tight text-neutral-950',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
});
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-neutral-600 mt-2', className)}
      {...props}
    >
      {children}
    </p>
  );
});
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
});
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  );
});
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};