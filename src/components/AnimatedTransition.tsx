
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
  return (
    <div
      className={cn(`animate-${animation}`, className)}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
