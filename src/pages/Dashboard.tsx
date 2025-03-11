
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import ProjectCard, { ProjectData } from '@/components/ProjectCard';
import ResourceCard, { ResourceData } from '@/components/ResourceCard';
import AnimatedTransition from '@/components/AnimatedTransition';
import { ArrowRight, PlusCircle, ArrowUpRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Mock data
const recentProjects: ProjectData[] = [
  {
    id: '1',
    title: 'Metro Line Extension Phase II',
    description: 'Extending the existing metro network to connect the southern suburbs with improved transit options.',
    status: 'in-progress',
    location: 'Southern District',
    deadline: 'Dec 2023',
    departments: ['Transportation', 'Urban Planning', 'Finance'],
  },
  {
    id: '2',
    title: 'Smart Water Management System',
    description: 'Implementing IoT-based water monitoring and management systems across the city.',
    status: 'planning',
    location: 'Citywide',
    deadline: 'Mar 2024',
    departments: ['Water Supply', 'IT', 'Environment'],
  },
  {
    id: '3',
    title: 'Urban Green Spaces Development',
    description: 'Creating new parks and green areas to improve air quality and provide recreational spaces.',
    status: 'on-hold',
    location: 'Northern District',
    deadline: 'Jun 2024',
    departments: ['Parks', 'Urban Planning', 'Environment'],
  },
];

const recentResources: ResourceData[] = [
  {
    id: '1',
    title: 'City Transportation Survey 2023',
    description: 'Comprehensive data on citizen transportation habits and needs across all districts.',
    type: 'Dataset',
    department: 'Transportation',
    dateAdded: '15 Oct 2023',
    author: 'Rahul Sharma',
  },
  {
    id: '2',
    title: 'Environmental Impact Assessment Template',
    description: 'Standard template for conducting EIAs for new infrastructure projects.',
    type: 'Template',
    department: 'Environment',
    dateAdded: '03 Nov 2023',
    author: 'Priya Patel',
  },
  {
    id: '3',
    title: 'Budget Allocation Guidelines FY 2023-24',
    description: 'Official guidelines for department budget requests and allocations.',
    type: 'Document',
    department: 'Finance',
    dateAdded: '22 Sep 2023',
    author: 'Amit Kumar',
  },
];

const dashboardMetrics = [
  { label: 'Active Projects', value: '24', change: '+3', changeType: 'positive' },
  { label: 'Departments', value: '12', change: '0', changeType: 'neutral' },
  { label: 'Shared Resources', value: '156', change: '+12', changeType: 'positive' },
  { label: 'Upcoming Deadlines', value: '8', change: '-2', changeType: 'negative' },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedTransition animation="slide-up">
            <header className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Welcome, Admin</h1>
                  <p className="mt-1 text-jd-gray">
                    Here's what's happening across city departments today
                  </p>
                </div>
                <div className="mt-4 md:mt-0 space-x-3">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/projects/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Project
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link to="/resources/new">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      New Resource
                    </Link>
                  </Button>
                </div>
              </div>
            </header>
          </AnimatedTransition>

          <AnimatedTransition animation="fade-in" delay="0.1s">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {dashboardMetrics.map((metric, index) => (
                <GlassmorphicCard key={index}>
                  <h3 className="text-jd-gray text-sm font-medium">{metric.label}</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-semibold text-gray-900">{metric.value}</span>
                    {metric.change !== '0' && (
                      <span className={`ml-2 text-sm ${
                        metric.changeType === 'positive' ? 'text-jd-green' : 
                        metric.changeType === 'negative' ? 'text-jd-red' : 'text-jd-gray'
                      }`}>
                        {metric.change}
                      </span>
                    )}
                  </div>
                </GlassmorphicCard>
              ))}
            </div>
          </AnimatedTransition>

          <AnimatedTransition animation="slide-up" delay="0.2s">
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/projects" className="text-jd-blue flex items-center">
                    View all
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </AnimatedTransition>

          <AnimatedTransition animation="slide-up" delay="0.3s">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Resources</h2>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/resources" className="text-jd-blue flex items-center">
                    View all
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
          </AnimatedTransition>

          <AnimatedTransition animation="fade-in" delay="0.4s">
            <div className="mt-12">
              <GlassmorphicCard className="bg-gradient-to-r from-jd-blue/10 to-jd-green/10">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="mb-6 md:mb-0">
                    <h2 className="text-xl font-semibold mb-2">Collaborate Across Departments</h2>
                    <p className="text-jd-gray max-w-2xl">
                      Find ways to partner with other departments on current initiatives and share expertise.
                    </p>
                  </div>
                  <Button asChild>
                    <Link to="/departments" className="flex items-center">
                      View Departments
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </GlassmorphicCard>
            </div>
          </AnimatedTransition>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
