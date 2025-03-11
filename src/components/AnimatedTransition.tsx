
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-up' | 'slide-down' | 'scale-in' | 'blur-in';
  delay?: string;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  className,
  animation = 'fade-in',
  delay = '0s',
}) => {
  const animationClasses = {
    'fade-in': 'animate-fade-in',
    'slide-up': 'animate-slide-up',
    'slide-down': 'animate-slide-down',
    'scale-in': 'animate-scale-in',
    'blur-in': 'animate-blur-in',
  };

  return (
    <div
      className={cn(animationClasses[animation], className)}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
