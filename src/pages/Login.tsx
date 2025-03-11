
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import AnimatedTransition from '@/components/AnimatedTransition';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating authentication
    setTimeout(() => {
      setIsLoading(false);
      // Mock login logic - in a real app this would validate credentials
      if (email && password) {
        toast.success('Successfully logged in!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AnimatedTransition animation="fade-in">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Sign in to JD
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access the inter-departmental cooperation platform
          </p>
        </AnimatedTransition>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AnimatedTransition animation="scale-in" delay="0.1s">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 backdrop-blur-sm border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-jd-blue hover:text-jd-blue/80">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div className="mt-1">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
                </div>
              </div>

              <div className="mt-2 grid grid-cols-1 gap-3">
                <div className="border border-gray-200 rounded-md p-2 text-center text-sm">
                  <p className="font-medium text-gray-700">Admin User</p>
                  <p className="text-gray-500">admin@city.gov.in | password123</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-jd-blue hover:text-jd-blue/80">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </AnimatedTransition>
      </div>
    </div>
  );
};

export default Login;
