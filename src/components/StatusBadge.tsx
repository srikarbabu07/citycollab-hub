
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'planning' | 'in-progress' | 'on-hold' | 'completed' | 'delayed';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig = {
  'planning': {
    color: 'bg-jd.blue/10 text-jd-blue border border-jd-blue/20',
    label: 'Planning'
  },
  'in-progress': {
    color: 'bg-jd-green/10 text-jd-green border border-jd-green/20',
    label: 'In Progress'
  },
  'on-hold': {
    color: 'bg-jd-yellow/10 text-jd-orange border border-jd-yellow/20',
    label: 'On Hold'
  },
  'completed': {
    color: 'bg-jd-green/10 text-jd-green border border-jd-green/20',
    label: 'Completed'
  },
  'delayed': {
    color: 'bg-jd-red/10 text-jd-red border border-jd-red/20',
    label: 'Delayed'
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      'px-2.5 py-1 text-xs rounded-full font-medium',
      config.color,
      className
    )}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
