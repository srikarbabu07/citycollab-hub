
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import AnimatedTransition from '@/components/AnimatedTransition';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import { Eye, EyeOff } from 'lucide-react';
import CityMap from '@/components/CityMap';
import { loginUser } from '@/services/databaseService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Attempt to login with database service
      const user = loginUser(email, password);
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError('Failed to login');
        toast.error('Failed to login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <AnimatedTransition animation="fade-in">
          <h2 className="text-center text-3xl font-bold tracking-tight mb-2">
            Sign in to JD
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access the inter-departmental cooperation platform
          </p>
        </AnimatedTransition>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <AnimatedTransition animation="scale-in" delay="0.1s">
          <GlassmorphicCard className="py-8 px-4 sm:px-10">
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
                    <Link to="#" className="font-medium text-jd-blue hover:text-jd-blue/80">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <div className="mt-1 relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
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

              {error && (
                <div className="text-sm text-red-600">{error}</div>
              )}

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
                  <span className="px-2 bg-white bg-opacity-70 text-gray-500">Demo Credentials</span>
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
          </GlassmorphicCard>
        </AnimatedTransition>
      </div>

      {/* Map section */}
      <div className="mt-16 sm:mx-auto sm:w-full sm:max-w-6xl px-4">
        <AnimatedTransition animation="fade-in" delay="0.3s">
          <h3 className="text-center text-2xl font-bold tracking-tight mb-8">
            Streamline City Development
          </h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-2">Unified Project Management</h4>
                <p className="text-jd-gray">
                  Track project progress across departments and ensure alignment with city-wide objectives.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-2">Centralized Resource Hub</h4>
                <p className="text-jd-gray">
                  Access and share critical resources, datasets, and documents from a single location.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-2">Departmental Collaboration</h4>
                <p className="text-jd-gray">
                  Break down silos and facilitate communication between city departments.
                </p>
              </div>
            </div>
            
            <div className="h-[400px] rounded-2xl overflow-hidden">
              <CityMap className="h-full w-full" />
            </div>
          </div>
        </AnimatedTransition>
      </div>
    </div>
  );
};

export default Login;
