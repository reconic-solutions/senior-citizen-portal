'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Shield,
  Award,
  Users,
  Heart,
  Star,
  ArrowRight
} from 'lucide-react';
import { PartTimerLogo } from '@/components/part-timer-logo';
import { AuthPopup } from '@/components/auth-popup';

export function EnhancedFooter() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'For Job Seekers',
      links: [
        { title: 'Browse Jobs', href: '/jobs' },
        { title: 'Senior-Friendly Employers', href: '/employers' },
        { title: 'Career Resources', href: '/resources' },
        { title: 'Success Stories', href: '/success-stories' },
        { title: 'Resume Builder', href: '/resume-builder' },
        { title: 'Interview Tips', href: '/interview-tips' }
      ]
    },
    {
      title: 'For Employers',
      links: [
        { title: 'Post a Job', href: '/employer/jobs/new' },
        { title: 'Browse Talent', href: '/talent' },
        { title: 'Pricing Plans', href: '/pricing' },
        { title: 'Employer Resources', href: '/employer-resources' },
        { title: 'Age-Inclusive Hiring', href: '/age-inclusive-hiring' },
        { title: 'Enterprise Solutions', href: '/enterprise' }
      ]
    },
    {
      title: 'Services & Tools',
      links: [
        { title: 'Contract Management', href: '/contracts' },
        { title: 'Invoice & Payments', href: '/invoices' },
        { title: 'Time Tracking', href: '/time-tracking' },
        { title: 'Project Management', href: '/project-management' },
        { title: 'Tax Resources', href: '/tax-resources' },
        { title: 'Legal Support', href: '/legal-support' }
      ]
    },
    {
      title: 'Company',
      links: [
        { title: 'About Us', href: '/about' },
        { title: 'Our Mission', href: '/mission' },
        { title: 'Careers', href: '/careers' },
        { title: 'Press & Media', href: '/press' },
        { title: 'Partner Program', href: '/partners' },
        { title: 'Investor Relations', href: '/investors' }
      ]
    },
    {
      title: 'Support & Legal',
      links: [
        { title: 'Help Center', href: '/help' },
        { title: 'Contact Support', href: '/contact' },
        { title: 'Community Forum', href: '/community' },
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Service', href: '/terms' },
        { title: 'Cookie Policy', href: '/cookies' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/parttimer', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/parttimer', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/parttimer', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com/parttimer', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/parttimer', label: 'YouTube' }
  ];

  const trustIndicators = [
    { icon: Shield, text: 'SSL Secured' },
    { icon: Award, text: 'Industry Certified' },
    { icon: Users, text: '25,000+ Members' },
    { icon: Heart, text: 'Senior Focused' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Connected with Senior-Friendly Opportunities
            </h3>
            <p className="text-blue-100 text-lg mb-8">
              Get weekly job alerts, career tips, and exclusive content for professionals 50+
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-100 h-12"
              />
              <Button className="bg-white text-primary hover:bg-gray-100 h-12 px-8">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-blue-100 text-sm mt-4">
              Join 15,000+ professionals receiving our weekly newsletter
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <PartTimerLogo size="lg" className="mb-6" />
              <p className="text-gray-400 mb-6 leading-relaxed">
                The premier platform exclusively for professionals 50+ and those with 10+ years experience. 
                Where wisdom meets opportunity and age is celebrated as an asset.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-400">
                  <Phone className="h-4 w-4 mr-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail className="h-4 w-4 mr-3" />
                  <span>hello@parttimer.com</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-4 w-4 mr-3" />
                  <span>123 Business Ave, Suite 456, New York, NY 10001</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center text-gray-400">
                <indicator.icon className="h-5 w-5 mr-2" />
                <span className="text-sm">{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>&copy; {currentYear} Part Timer. All rights reserved.</p>
              <p className="mt-1">Exclusively for professionals 50+ or with 10+ years experience.</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-yellow-400">
                <Star className="h-4 w-4 fill-current mr-1" />
                <span className="text-sm">4.9/5 from 2,500+ reviews</span>
              </div>
              
              <div className="flex space-x-4 text-sm">
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Terms
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-600 p-4 md:hidden z-40">
        <div className="flex space-x-2">
          <Link href="/auth/register?role=candidate">
            <Button className="flex-1 bg-white text-blue-600 hover:bg-gray-100">
              Find Work
            </Button>
          </Link>
          <Link href="/auth/register?role=employer">
            <Button variant="outline" className="flex-1 border-white text-white hover:bg-white/10">
              Hire Talent
            </Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}