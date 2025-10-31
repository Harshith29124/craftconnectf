import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import Button from './ui/Button';

const EmptyState = ({ 
  icon: Icon,
  title, 
  description,
  action,
  className,
  ...props 
}) => {
  return (
    <div 
      className={cn(
        'flex flex-col items-center justify-center py-16 px-4 text-center',
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="mb-6 h-24 w-24 text-neutral-300">
          <Icon />
        </div>
      )}
      
      {title && (
        <h3 className="text-xl font-semibold text-neutral-950 mb-3">
          {title}
        </h3>
      )}
      
      {description && (
        <p className="text-neutral-600 max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}
      
      {action && action}
    </div>
  );
};

// Common empty state configurations
const EmptyStates = {
  // Instagram integration placeholder
  Instagram: () => (
    <EmptyState
      icon={() => (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
        </svg>
      )}
      title="Instagram Integration"
      description="Connect your Instagram account to publish your enhanced product photos directly to your feed and stories."
      action={
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="primary" size="lg">
            Connect Instagram
          </Button>
          <Button variant="outline" size="lg">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      }
    />
  ),

  // Website/Portfolio placeholder
  Website: () => (
    <EmptyState
      icon={() => (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      )}
      title="Portfolio Website"
      description="Create a beautiful portfolio website to showcase your crafts and connect with customers online."
      action={
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="primary" size="lg">
            Build Website
          </Button>
          <Button variant="outline" size="lg">
            <Link to="/hub">View Examples</Link>
          </Button>
        </div>
      }
    />
  ),

  // Generic feature placeholder
  ComingSoon: ({ feature = 'This Feature' }) => (
    <EmptyState
      icon={() => (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      )}
      title={`${feature} Coming Soon`}
      description="We're working hard to bring you this feature. In the meantime, explore what's already available."
      action={
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="primary" size="lg">
            <Link to="/">Explore App</Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link to="/insights">View Insights</Link>
          </Button>
        </div>
      }
    />
  ),

  // No data states
  NoData: ({ title = 'No Data', description, actionText = 'Get Started', actionLink = '/' }) => (
    <EmptyState
      icon={() => (
        <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      )}
      title={title}
      description={description}
      action={
        <Button variant="primary" size="lg">
          <Link to={actionLink}>{actionText}</Link>
        </Button>
      }
    />
  )
};

export default EmptyState;
export { EmptyStates };