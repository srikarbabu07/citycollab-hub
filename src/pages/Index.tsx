
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedTransition from '@/components/AnimatedTransition';
import GlassmorphicCard from '@/components/GlassmorphicCard';
import { ArrowRight, Building2, Users, FileText, Map } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 pt-16 pb-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedTransition animation="slide-up">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Inter-departmental Cooperation Platform
              </h1>
              <p className="text-xl text-jd-dark-gray/80 mb-10 max-w-3xl mx-auto">
                JD connects city departments for seamless collaboration, resource sharing, 
                and coordinated project implementation across Indian cities.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="rounded-full px-8 py-6 text-base">
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-base">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
          </AnimatedTransition>

          <AnimatedTransition animation="fade-in" delay="0.3s" className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <GlassmorphicCard className="text-center">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-jd-blue" />
                <h3 className="text-lg font-semibold mb-2">Departmental Integration</h3>
                <p className="text-jd-gray">Connect city departments for unified planning and execution</p>
              </GlassmorphicCard>
              
              <GlassmorphicCard className="text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-jd-green" />
                <h3 className="text-lg font-semibold mb-2">Resource Sharing</h3>
                <p className="text-jd-gray">Share datasets, documents, and resources across departments</p>
              </GlassmorphicCard>
              
              <GlassmorphicCard className="text-center">
                <Map className="h-12 w-12 mx-auto mb-4 text-jd-orange" />
                <h3 className="text-lg font-semibold mb-2">Project Coordination</h3>
                <p className="text-jd-gray">Coordinate project phasing and implementation citywide</p>
              </GlassmorphicCard>
              
              <GlassmorphicCard className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-jd-yellow" />
                <h3 className="text-lg font-semibold mb-2">Collaborative Planning</h3>
                <p className="text-jd-gray">Plan together to maximize impact and minimize disruptions</p>
              </GlassmorphicCard>
            </div>
          </AnimatedTransition>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedTransition animation="slide-up">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Streamline City Development
              </h2>
              <p className="text-xl text-jd-gray max-w-3xl mx-auto">
                Our platform simplifies coordination across urban development initiatives
              </p>
            </div>
          </AnimatedTransition>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedTransition animation="slide-up" delay="0.2s">
              <div className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-500/10 to-green-500/10 aspect-video"></div>
            </AnimatedTransition>
            
            <AnimatedTransition animation="slide-up" delay="0.4s">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Unified Project Management</h3>
                  <p className="text-jd-gray">
                    Track project progress across departments and ensure alignment with city-wide objectives.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Centralized Resource Hub</h3>
                  <p className="text-jd-gray">
                    Access and share critical resources, datasets, and documents from a single location.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Departmental Collaboration</h3>
                  <p className="text-jd-gray">
                    Break down silos and facilitate communication between city departments.
                  </p>
                </div>
                
                <Button asChild className="mt-4 rounded-full px-6">
                  <Link to="/signup">
                    Create an Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </AnimatedTransition>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
