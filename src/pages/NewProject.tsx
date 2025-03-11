import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { toast } from 'sonner';
import AnimatedTransition from '@/components/AnimatedTransition';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import Navbar from '@/components/Navbar';
import { CalendarIcon, X } from 'lucide-react';
import { createProject } from '@/services/databaseService';

// Mock department data
const departments = [
  { id: 'urban-planning', name: 'Urban Planning' },
  { id: 'transportation', name: 'Transportation' },
  { id: 'water-supply', name: 'Water Supply' },
  { id: 'sanitation', name: 'Sanitation' },
  { id: 'energy', name: 'Energy' },
  { id: 'housing', name: 'Housing' },
  { id: 'health', name: 'Health' },
  { id: 'education', name: 'Education' },
  { id: 'finance', name: 'Finance' },
  { id: 'it', name: 'Information Technology' },
  { id: 'public-works', name: 'Public Works' },
  { id: 'environment', name: 'Environment' },
];

const NewProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    status: 'planning',
  });
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDepartment = (departmentId: string) => {
    if (!selectedDepartments.includes(departmentId)) {
      setSelectedDepartments((prev) => [...prev, departmentId]);
    }
  };

  const handleRemoveDepartment = (departmentId: string) => {
    setSelectedDepartments((prev) => prev.filter((id) => id !== departmentId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !deadline || selectedDepartments.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create the project in the database
      createProject({
        title: formData.title,
        description: formData.description,
        status: formData.status as 'planning' | 'in-progress' | 'completed' | 'on-hold',
        location: formData.location,
        deadline: deadline.toISOString(),
        departments: selectedDepartments,
      });
      
      toast.success('Project created successfully!');
      navigate('/projects');
    } catch (error) {
      toast.error('Failed to create project: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedTransition animation="slide-up">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
              <p className="mt-1 text-jd-gray">
                Start a new interdepartmental collaboration
              </p>
            </header>
          </AnimatedTransition>

          <AnimatedTransition animation="fade-in" delay="0.1s">
            <GlassmorphicCard className="mb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Project Title <span className="text-jd-red">*</span></Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter project title"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description <span className="text-jd-red">*</span></Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the project objectives and scope"
                      className="mt-1 resize-none h-32"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location <span className="text-jd-red">*</span></Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Project location"
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger id="status" className="mt-1">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planning">Planning</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="on-hold">On Hold</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="delayed">Delayed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Deadline <span className="text-jd-red">*</span></Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full mt-1 justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {deadline ? format(deadline, 'PPP') : <span>Select a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={deadline}
                          onSelect={setDeadline}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label>Departments <span className="text-jd-red">*</span></Label>
                    <Select onValueChange={handleAddDepartment}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Add departments" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem
                            key={dept.id}
                            value={dept.id}
                            disabled={selectedDepartments.includes(dept.id)}
                          >
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedDepartments.map((deptId) => {
                        const dept = departments.find((d) => d.id === deptId);
                        return (
                          <div
                            key={deptId}
                            className="flex items-center bg-jd-blue/10 text-jd-blue text-xs rounded-full px-3 py-1"
                          >
                            <span>{dept?.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveDepartment(deptId)}
                              className="ml-1.5 rounded-full hover:bg-jd-blue/20 p-0.5"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        );
                      })}
                      {selectedDepartments.length === 0 && (
                        <p className="text-sm text-jd-gray">No departments selected</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/projects')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating...' : 'Create Project'}
                  </Button>
                </div>
              </form>
            </GlassmorphicCard>
          </AnimatedTransition>
        </div>
      </main>
    </div>
  );
};

export default NewProject;
