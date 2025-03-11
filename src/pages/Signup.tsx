
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import AnimatedTransition from '@/components/AnimatedTransition';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import { Eye, EyeOff, Building } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const departments = [
    "Urban Planning",
    "Public Works",
    "Water Supply",
    "Sewerage",
    "Solid Waste Management",
    "Smart City Mission",
    "Municipal Administration",
    "Transport",
    "Electricity",
    "Environment",
    "Health",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    
    setIsLoading(true);
    
    // Simulating registration process
    setTimeout(() => {
      setIsLoading(false);
      
      if (name && email && department && password) {
        // Store user data in localStorage (in a real app, this would be sent to a backend)
        localStorage.setItem('jd_user', JSON.stringify({ name, email, department }));
        toast.success('Account created successfully!');
        navigate('/dashboard');
      } else {
        toast.error('Please fill in all fields');
      }
    }, 1000);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AnimatedTransition animation="fade-in">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-2">
            Create your JD account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join the inter-departmental cooperation platform
          </p>
        </AnimatedTransition>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AnimatedTransition animation="scale-in" delay="0.1s">
          <GlassmorphicCard className="py-8 px-4 sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="mt-1">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email address</Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <div className="mt-1">
                  <Select onValueChange={setDepartment} value={department}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="mt-1">
                  <Input
                    id="confirm-password"
                    name="confirm-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center"
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-jd-blue hover:text-jd-blue/80">
                  Sign in
                </Link>
              </p>
            </div>
          </GlassmorphicCard>
        </AnimatedTransition>
      </div>
    </div>
  );
};

export default Signup;
