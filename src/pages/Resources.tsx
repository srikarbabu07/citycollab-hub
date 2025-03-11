
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import ResourceCard, { ResourceData } from '@/components/ResourceCard';
import AnimatedTransition from '@/components/AnimatedTransition';
import { PlusCircle, Search, Filter } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Expanded mock data
const allResources: ResourceData[] = [
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
  {
    id: '4',
    title: 'City Masterplan 2040',
    description: 'Long-term development plan with zoning regulations and growth projections.',
    type: 'Document',
    department: 'Urban Planning',
    dateAdded: '05 Aug 2023',
    author: 'Neha Singh',
  },
  {
    id: '5',
    title: 'Water Quality Monitoring Data Q3 2023',
    description: 'Quarterly water quality measurements from monitoring stations across the city.',
    type: 'Dataset',
    department: 'Water Supply',
    dateAdded: '12 Oct 2023',
    author: 'Vikram Reddy',
  },
  {
    id: '6',
    title: 'Public Housing Eligibility Criteria',
    description: 'Updated criteria and application process for public housing programs.',
    type: 'Document',
    department: 'Housing',
    dateAdded: '18 Sep 2023',
    author: 'Meena Joshi',
  },
  {
    id: '7',
    title: 'Traffic Flow Analysis Tool',
    description: 'Interactive tool for analyzing traffic patterns and congestion points.',
    type: 'Tool',
    department: 'Transportation',
    dateAdded: '28 Oct 2023',
    author: 'Arjun Patel',
  },
  {
    id: '8',
    title: 'Healthcare Facilities Mapping Dataset',
    description: 'Geospatial data on all public healthcare facilities with service details.',
    type: 'Dataset',
    department: 'Health',
    dateAdded: '10 Nov 2023',
    author: 'Dr. Sanjay Kumar',
  },
  {
    id: '9',
    title: 'Project Management Handbook',
    description: 'Comprehensive guide to managing interdepartmental projects effectively.',
    type: 'Template',
    department: 'Administration',
    dateAdded: '01 Sep 2023',
    author: 'Deepak Sharma',
  },
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredResources = allResources.filter((resource) => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = 
      typeFilter === 'all' || 
      resource.type.toLowerCase() === typeFilter.toLowerCase();
    
    const matchesDepartment = 
      departmentFilter === 'all' || 
      resource.department.toLowerCase() === departmentFilter.toLowerCase();
    
    return matchesSearch && matchesType && matchesDepartment;
  });

  // Get unique departments for filter
  const departments = Array.from(new Set(allResources.map(r => r.department)));
  
  // Get unique types for filter
  const types = Array.from(new Set(allResources.map(r => r.type)));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedTransition animation="slide-up">
            <header className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
                  <p className="mt-1 text-jd-gray">
                    Access and share interdepartmental resources
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button asChild>
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
            <GlassmorphicCard className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-jd-gray" />
                  <Input
                    placeholder="Search resources..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2 min-w-[180px]">
                    <Filter className="h-4 w-4 text-jd-gray shrink-0" />
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Resource type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {types.map((type) => (
                          <SelectItem key={type} value={type.toLowerCase()}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="min-w-[180px]">
                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept.toLowerCase()}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>
          </AnimatedTransition>

          <AnimatedTransition animation="slide-up" delay="0.2s">
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                <p className="text-jd-gray mb-6">Try adjusting your search or filter criteria</p>
                <Button asChild variant="outline">
                  <Link to="/resources/new">Add a New Resource</Link>
                </Button>
              </div>
            )}
          </AnimatedTransition>
        </div>
      </main>
    </div>
  );
};

export default Resources;
