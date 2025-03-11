
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className,
  interactive = false,
}) => {
  return (
    <div
      className={cn(
        'rounded-xl p-6 glassmorphic',
        interactive && 'card-hover',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassmorphicCard;
