
import React from 'react';
import { Link } from 'react-router-dom';
import GlassmorphicCard from './GlassmorphicCard';
import StatusBadge from './StatusBadge';
import { Clock, Users, MapPin } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed' | 'delayed';
  location: string;
  deadline: string;
  departments: string[];
}

interface ProjectCardProps {
  project: ProjectData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Link to={`/projects/${project.id}`}>
      <GlassmorphicCard interactive className="h-full">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-lg">{project.title}</h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="text-jd-dark-gray mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-col space-y-2 text-sm text-jd-gray">
          <div className="flex items-center">
            <MapPin size={14} className="mr-2" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-2" />
            <span>Due: {project.deadline}</span>
          </div>
          <div className="flex items-center">
            <Users size={14} className="mr-2" />
            <span>{project.departments.length} departments</span>
          </div>
        </div>
      </GlassmorphicCard>
    </Link>
  );
};

export default ProjectCard;
