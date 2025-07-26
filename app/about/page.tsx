import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Heart, 
  Target, 
  Award,
  ArrowRight,
  CheckCircle,
  Globe,
  Shield,
  Lightbulb
} from 'lucide-react';
import Link from 'next/link';
import { AccessibilityControls } from '@/components/accessibility-controls';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Respect & Dignity',
      description: 'We believe every professional deserves respect regardless of age, and that experience brings invaluable wisdom.'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'We maintain the highest standards of security and privacy to protect our community members.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Our platform is designed to be accessible to everyone, with features that accommodate different needs and abilities.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously innovate to create better solutions for connecting experienced professionals with opportunities.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Former HR executive with 20+ years experience in talent acquisition and age-inclusive hiring practices.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Technology leader passionate about creating accessible digital experiences for all age groups.'
    },
    {
      name: 'Dr. Linda Rodriguez',
      role: 'Head of Community',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
      bio: 'Gerontologist and advocate for senior employment rights with extensive research in workplace age diversity.'
    }
  ];

  const milestones = [
    { year: '2020', event: 'SeniorWorks founded with a mission to combat age discrimination in hiring' },
    { year: '2021', event: 'Launched beta platform with 100 senior professionals and 25 employers' },
    { year: '2022', event: 'Reached 5,000 active users and facilitated 1,000+ successful job placements' },
    { year: '2023', event: 'Expanded to 10 major cities and partnered with 500+ age-friendly employers' },
    { year: '2024', event: 'Serving 10,000+ professionals with 85% job placement success rate' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Part Timer</span>
          </Link>
          <div className="flex items-center space-x-4">
            <AccessibilityControls />
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-primary">Part Timer</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            We're on a mission to eliminate age discrimination in the workplace and 
            connect experienced professionals with employers who value wisdom, expertise, and dedication.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Part Timer was born from a simple belief: age should be an asset, not a barrier. 
                We've witnessed too many talented professionals struggle to find employment simply 
                because of their age, despite having decades of valuable experience.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our platform bridges this gap by connecting senior professionals with forward-thinking 
                employers who understand that experience, wisdom, and strong work ethic are invaluable 
                assets in today's competitive marketplace.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-lg">Combat age discrimination in hiring</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-lg">Celebrate the value of experience</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                  <span className="text-lg">Create meaningful employment opportunities</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
                alt="Senior professionals collaborating"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do and shape how we serve our community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 rounded-lg p-4 w-fit mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team combines decades of experience in technology, human resources, 
              and senior advocacy
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-8 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small startup to a leading platform for experienced professionals
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start mb-8 last:mb-0">
                <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm mr-6 flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="flex-1 pt-3">
                  <p className="text-lg text-gray-700 leading-relaxed">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Senior Professionals Served</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">85%</div>
              <div className="text-blue-100">Job Placement Success Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Partner Employers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">$2.5M+</div>
              <div className="text-blue-100">Total Salaries Facilitated</div>
            </div>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Every number represents a life changed, a career revitalized, and a workplace enriched 
            by the wisdom and experience of senior professionals.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a senior professional seeking opportunities or an employer 
            looking for experienced talent, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register?role=candidate">
              <Button size="lg" className="text-lg px-8 py-4">
                Find Opportunities <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/register?role=employer">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                Hire Senior Talent
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-primary rounded-lg p-2">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Part Timer</span>
            </div>
            <div className="text-gray-400">
              <p>&copy; 2024 Part Timer. Connecting experience with opportunity.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}