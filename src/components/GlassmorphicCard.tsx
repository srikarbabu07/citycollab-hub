
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  variant?: 'default' | 'subtle' | 'bordered' | 'elevated';
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className,
  interactive = false,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'bg-white bg-opacity-60 backdrop-blur-lg border border-white border-opacity-20 shadow-sm',
    subtle: 'bg-white bg-opacity-40 backdrop-blur-md border border-white border-opacity-10 shadow-sm',
    bordered: 'bg-white bg-opacity-50 backdrop-blur-lg border-2 border-white border-opacity-30 shadow-sm',
    elevated: 'bg-white bg-opacity-70 backdrop-blur-xl border border-white border-opacity-25 shadow-md',
  };

  return (
    <div
      className={cn(
        'rounded-xl p-6',
        variantClasses[variant],
        interactive && 'card-hover',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;
