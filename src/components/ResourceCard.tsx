
import React from 'react';
import { Link } from 'react-router-dom';
import GlassmorphicCard from './GlassmorphicCard';
import { FileText, Calendar, User } from 'lucide-react';

export interface ResourceData {
  id: string;
  title: string;
  description: string;
  type: string; 
  department: string;
  dateAdded: string;
  author: string;
}

interface ResourceCardProps {
  resource: ResourceData;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'dataset': return 'text-jd-blue';
      case 'document': return 'text-jd-orange';
      case 'template': return 'text-jd-green';
      default: return 'text-jd-gray';
    }
  };

  return (
    <Link to={`/resources/${resource.id}`}>
      <GlassmorphicCard interactive className="h-full">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg">{resource.title}</h3>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getTypeColor(resource.type)} bg-opacity-10 border border-opacity-20`}>
            {resource.type}
          </span>
        </div>
        <p className="text-jd-dark-gray mb-4 line-clamp-2">{resource.description}</p>
        <div className="flex flex-col space-y-2 text-sm text-jd-gray">
          <div className="flex items-center">
            <FileText size={14} className="mr-2" />
            <span>{resource.department}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={14} className="mr-2" />
            <span>Added: {resource.dateAdded}</span>
          </div>
          <div className="flex items-center">
            <User size={14} className="mr-2" />
            <span>{resource.author}</span>
          </div>
        </div>
      </GlassmorphicCard>
    </Link>
  );
};

export default ResourceCard;
