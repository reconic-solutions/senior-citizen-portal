'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { jobService } from '@/lib/data-service';
import { 
  Clock, 
  Briefcase, 
  Shield, 
  Heart, 
  ArrowRight, 
  CheckCircle, 
  Search,
  MapPin,
  DollarSign,
  Star,
  Quote,
  Phone,
  Mail,
  Globe,
  Users,
  Zap,
  Target,
  TrendingUp,
  Award,
  Building,
  Calendar,
  FileText,
  CreditCard,
  GraduationCap,
  Trophy,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProfessionalMenu } from '@/components/professional-menu';
import { PartTimerLogo } from '@/components/part-timer-logo';
import { AuthPopup } from '@/components/auth-popup';
import { EnhancedFooter } from '@/components/enhanced-footer';

export function LandingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredJobs, setFeaturedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getJobs({ limit: 6 });
        setFeaturedJobs(response.jobs || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setFeaturedJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const features = [
    {
      icon: UserCheck,
      title: 'Age-Inclusive Platform',
      description: 'Exclusively for professionals 50+ or with 10+ years experience - where wisdom is valued'
    },
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'Protected transactions with escrow services and guaranteed payment for completed work'
    },
    {
      icon: Trophy,
      title: 'Experience Matters',
      description: 'Connect with employers who specifically seek seasoned professionals and their expertise'
    },
    {
      icon: FileText,
      title: 'Professional Tools',
      description: 'Complete contract management, invoicing, and time tracking built for mature professionals'
    }
  ];

  const stats = [
    { number: '25,000+', label: 'Professionals 50+' },
    { number: '15+ Years', label: 'Average Experience' },
    { number: '98%', label: 'Success Rate' },
    { number: '$5M+', label: 'Paid to Seniors' }
  ];

  const testimonials = [
    {
      name: 'Margaret Thompson',
      age: '62',
      role: 'Business Consultant',
      experience: '30+ years',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      quote: 'At 62, I thought my career was over. Part Timer connected me with companies that value my three decades of experience.',
      rating: 5
    },
    {
      name: 'Robert Johnson',
      age: '58',
      role: 'Financial Advisor',
      experience: '25+ years',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      quote: 'Finally, a platform that appreciates the wisdom and reliability that comes with age and experience.',
      rating: 5
    },
    {
      name: 'Linda Davis',
      age: '55',
      role: 'Project Manager',
      experience: '20+ years',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      quote: 'Part Timer understands that experience is an asset, not a liability. I found my perfect role in weeks.',
      rating: 5
    }
  ];

  const categories = [
    { name: 'Senior Consulting', count: '2,500+ opportunities', icon: '👔', requirement: '15+ years exp' },
    { name: 'Executive Mentoring', count: '1,800+ roles', icon: '🎯', requirement: '20+ years exp' },
    { name: 'Strategic Advisory', count: '1,200+ positions', icon: '📊', requirement: '25+ years exp' },
    { name: 'Project Leadership', count: '900+ jobs', icon: '🚀', requirement: '10+ years exp' },
    { name: 'Training & Development', count: '750+ roles', icon: '📚', requirement: '15+ years exp' },
    { name: 'Industry Expertise', count: '650+ positions', icon: '⚡', requirement: '12+ years exp' }
  ];

  const filteredJobs = featuredJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <ProfessionalMenu />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8"
          >
            <Badge className="mb-6 px-8 py-3 text-xl bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200 dark:from-blue-900 dark:to-indigo-900 dark:text-blue-200">
              🎯 Exclusively for Professionals 50+ or 10+ Years Experience
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Your Experience
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
              Is Your Advantage
            </span>
          </motion.h1>
          
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl mb-8 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🎯 Age 50+ or 10+ Years Experience Required
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto">
              Join the premier platform where seasoned professionals connect with employers 
              who value wisdom, expertise, and the reliability that comes with experience.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Link href="/auth/register?role=candidate">
              <Button size="lg" className="text-2xl px-12 py-6 h-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all">
                Find Senior-Friendly Work <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/auth/register?role=employer">
              <Button size="lg" variant="outline" className="text-2xl px-12 py-6 h-auto border-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                Hire Experienced Talent
              </Button>
            </Link>
          </motion.div>

          {/* Age/Experience Requirements */}
          <motion.div 
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border-2 border-blue-200 dark:border-blue-700 hover:shadow-lg transition-all">
              <div className="text-center">
                <div className="text-6xl mb-4">👥</div>
                <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2">Age 50+</h3>
                <p className="text-blue-800 dark:text-blue-200 text-lg">
                  Celebrating the wisdom and stability that comes with life experience
                </p>
              </div>
            </Card>
            
            <Card className="p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 border-2 border-indigo-200 dark:border-indigo-700 hover:shadow-lg transition-all">
              <div className="text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-2">10+ Years Experience</h3>
                <p className="text-purple-800 dark:text-purple-200 text-lg">
                  Recognizing the value of deep professional expertise and proven track records
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Trusted by Experienced Professionals</h2>
            <p className="text-xl text-blue-100">Where age and experience are valued assets</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-5xl md:text-6xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Senior Professional Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Opportunities designed for seasoned professionals with proven expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-blue-600 transition-colors dark:text-white">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">{category.count}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-sm font-medium">
                    Requires: {category.requirement}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="bg-white dark:bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Senior-Friendly Opportunities
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Hand-picked positions from employers who value experienced professionals
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <Input
                  placeholder="Search senior-friendly jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="p-6 h-64 animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-4"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-3/4"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group dark:bg-gray-700 dark:border-gray-600">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-3 rounded-lg group-hover:from-blue-200 group-hover:to-purple-200 dark:group-hover:from-blue-800 dark:group-hover:to-purple-800 transition-all">
                        <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="capitalize mb-2">
                          {job.type}
                        </Badge>
                        <Badge variant="outline" className="block">
                          50+ Welcome
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors dark:text-white">
                      {job.title}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                      <Building className="h-4 w-4 mr-1" />
                      <span className="truncate">{job.company}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {job.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center text-green-600 dark:text-green-400 font-semibold">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span className="text-sm">{job.salary}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(job.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link href="/auth/register?role=candidate">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-xl px-8 py-4">
                View All Senior-Friendly Jobs <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Built for Experienced Professionals
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A platform that understands and celebrates the value of age and experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group dark:bg-gray-800 dark:border-gray-700">
                  <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg p-4 w-fit mx-auto mb-6 group-hover:from-blue-200 group-hover:to-indigo-200 dark:group-hover:from-blue-800 dark:group-hover:to-indigo-800 transition-all">
                    <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 group-hover:text-blue-600 transition-colors dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Success Stories from Seasoned Professionals
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real stories from professionals who found their perfect opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-4" />
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <cite className="font-semibold text-gray-900 dark:text-white not-italic">
                        {testimonial.name}, {testimonial.age}
                      </cite>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                      <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">{testimonial.experience}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12 rounded-3xl shadow-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Your Experience Deserves Recognition
              </h2>
              <p className="text-xl mb-8 leading-relaxed">
                Join the platform where age 50+ and 10+ years experience 
                are not just welcomed—they're celebrated and rewarded.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register?role=candidate">
                  <Button size="lg" className="text-xl px-8 py-4 h-auto bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Start Your Senior Career Journey
                  </Button>
                </Link>
                <Link href="/auth/register?role=employer">
                  <Button size="lg" variant="outline" className="text-xl px-8 py-4 h-auto border-2 border-white text-white hover:bg-white/20">
                    <Briefcase className="mr-2 h-5 w-5" />
                    Hire Experienced Professionals
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
}