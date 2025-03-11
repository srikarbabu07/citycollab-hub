import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import AnimatedTransition from '@/components/AnimatedTransition';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import Navbar from '@/components/Navbar';
import { Upload } from 'lucide-react';
import { createResource } from '@/services/databaseService';

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
  { id: 'administration', name: 'Administration' },
];

const resourceTypes = [
  { id: 'dataset', name: 'Dataset' },
  { id: 'document', name: 'Document' },
  { id: 'template', name: 'Template' },
  { id: 'tool', name: 'Tool' },
  { id: 'report', name: 'Report' },
  { id: 'policy', name: 'Policy' },
  { id: 'guideline', name: 'Guideline' },
];

const NewResource = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
    type: '',
    author: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.department || !formData.type) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create the resource in the database
      createResource({
        title: formData.title,
        description: formData.description,
        department: formData.department,
        type: formData.type,
        author: formData.author,
        fileUrl: file ? URL.createObjectURL(file) : undefined,
      });
      
      toast.success('Resource added successfully!');
      navigate('/resources');
    } catch (error) {
      toast.error('Failed to add resource: ' + (error instanceof Error ? error.message : 'Unknown error'));
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
              <h1 className="text-3xl font-bold text-gray-900">Add New Resource</h1>
              <p className="mt-1 text-jd-gray">
                Share a resource with other departments
              </p>
            </header>
          </AnimatedTransition>

          <AnimatedTransition animation="fade-in" delay="0.1s">
            <GlassmorphicCard className="mb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Resource Title <span className="text-jd-red">*</span></Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter resource title"
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
                      placeholder="Describe the resource and its relevance"
                      className="mt-1 resize-none h-32"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="department">Department <span className="text-jd-red">*</span></Label>
                      <Select
                        value={formData.department}
                        onValueChange={(value) => handleSelectChange('department', value)}
                      >
                        <SelectTrigger id="department" className="mt-1">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.id}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="type">Resource Type <span className="text-jd-red">*</span></Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => handleSelectChange('type', value)}
                      >
                        <SelectTrigger id="type" className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {resourceTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="author">Your Name <span className="text-jd-red">*</span></Label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="file">Upload File</Label>
                    <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-jd-gray" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-jd-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-jd-blue focus-within:ring-offset-2 hover:text-jd-blue/80"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PDF, DOC, XLS, CSV, XLSX, ZIP up to 10MB
                        </p>
                        {file && (
                          <p className="mt-2 text-sm text-jd-blue font-medium">
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/resources')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Adding...' : 'Add Resource'}
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

export default NewResource;
