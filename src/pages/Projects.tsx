import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import ProjectCard, { ProjectData } from '@/components/ProjectCard';
import AnimatedTransition from '@/components/AnimatedTransition';
import { PlusCircle, Search, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { getProjects } from '@/services/databaseService';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    // Fetch projects from the database
    const fetchedProjects = getProjects();
    setProjects(fetchedProjects);
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      statusFilter === 'all' || 
      project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedTransition animation="slide-up">
            <header className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
                  <p className="mt-1 text-jd-gray">
                    View and manage all interdepartmental projects
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button asChild>
                    <Link to="/projects/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Project
                    </Link>
                  </Button>
                </div>
              </div>
            </header>
          </AnimatedTransition>

          <AnimatedTransition animation="fade-in" delay="0.1s">
            <GlassmorphicCard className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-jd-gray" />
                  <Input
                    placeholder="Search projects..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 min-w-[200px]">
                  <Filter className="h-4 w-4 text-jd-gray" />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="delayed">Delayed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </GlassmorphicCard>
          </AnimatedTransition>

          <AnimatedTransition animation="slide-up" delay="0.2s">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-jd-gray mb-6">Try adjusting your search or filter criteria</p>
                <Button asChild variant="outline">
                  <Link to="/projects/new">Create a New Project</Link>
                </Button>
              </div>
            )}
          </AnimatedTransition>
        </div>
      </main>
    </div>
  );
};

export default Projects;
