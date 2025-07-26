'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Check, 
  Clock, 
  Users, 
  Zap, 
  Star,
  ArrowRight,
  Shield,
  Headphones,
  FileText,
  CreditCard
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProfessionalMenu } from '@/components/professional-menu';

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const candidatePlans = [
    {
      name: 'Free',
      price: { monthly: 0, annual: 0 },
      description: 'Perfect for getting started',
      features: [
        'Create professional profile',
        'Apply to unlimited jobs',
        'Basic messaging',
        'Mobile app access',
        'Email support'
      ],
      limitations: [
        'Limited profile visibility',
        'Basic search filters'
      ],
      popular: false,
      cta: 'Get Started Free'
    },
    {
      name: 'Professional',
      price: { monthly: 19, annual: 190 },
      description: 'For serious job seekers',
      features: [
        'Everything in Free',
        'Priority profile visibility',
        'Advanced search filters',
        'Unlimited saved jobs',
        'Professional portfolio',
        'Video introductions',
        'Priority support',
        'Application tracking'
      ],
      limitations: [],
      popular: true,
      cta: 'Start Professional'
    },
    {
      name: 'Premium',
      price: { monthly: 39, annual: 390 },
      description: 'Maximum visibility and features',
      features: [
        'Everything in Professional',
        'Featured profile placement',
        'Direct employer contact',
        'Career coaching session',
        'Resume optimization',
        'Interview preparation',
        'Dedicated account manager',
        'Custom branding'
      ],
      limitations: [],
      popular: false,
      cta: 'Go Premium'
    }
  ];

  const employerPlans = [
    {
      name: 'Starter',
      price: { monthly: 49, annual: 490 },
      description: 'For small businesses',
      features: [
        '5 active job postings',
        'Basic candidate search',
        'Standard support',
        'Basic analytics',
        'Email notifications'
      ],
      limitations: [
        'Limited search filters',
        'Basic messaging'
      ],
      popular: false,
      cta: 'Start Hiring'
    },
    {
      name: 'Professional',
      price: { monthly: 99, annual: 990 },
      description: 'For growing companies',
      features: [
        '15 active job postings',
        'Advanced candidate search',
        'Priority support',
        'Detailed analytics',
        'Team collaboration',
        'Custom branding',
        'Bulk messaging',
        'Interview scheduling'
      ],
      limitations: [],
      popular: true,
      cta: 'Choose Professional'
    },
    {
      name: 'Enterprise',
      price: { monthly: 199, annual: 1990 },
      description: 'For large organizations',
      features: [
        'Unlimited job postings',
        'AI-powered matching',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced analytics',
        'White-label solution',
        'API access',
        'SLA guarantee'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  const additionalServices = [
    {
      name: 'Contract Management',
      price: '$9/month per contract',
      description: 'Professional contract templates and e-signatures',
      icon: FileText
    },
    {
      name: 'Invoice & Payment Processing',
      price: '2.9% + $0.30 per transaction',
      description: 'Automated invoicing and secure payments',
      icon: CreditCard
    },
    {
      name: 'Time Tracking',
      price: '$5/month per user',
      description: 'Accurate time tracking and reporting',
      icon: Clock
    },
    {
      name: 'Priority Support',
      price: '$29/month',
      description: '24/7 phone and chat support',
      icon: Headphones
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ProfessionalMenu />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Simple, Transparent
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block">
              Pricing
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Choose the perfect plan for your part-time work journey. 
            No hidden fees, cancel anytime.
          </motion.p>

          {/* Annual/Monthly Toggle */}
          <motion.div 
            className="flex items-center justify-center space-x-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Label htmlFor="billing-toggle" className="text-lg">Monthly</Label>
            <Switch
              id="billing-toggle"
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <Label htmlFor="billing-toggle" className="text-lg">Annual</Label>
            <Badge variant="secondary" className="ml-2">Save 20%</Badge>
          </motion.div>
        </div>
      </section>

      {/* Job Seekers Pricing */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">For Job Seekers</h2>
          <p className="text-xl text-gray-600">Find your perfect part-time opportunity</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {candidatePlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`p-8 h-full relative ${plan.popular ? 'border-2 border-blue-500 shadow-xl' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ${isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    {plan.price.monthly > 0 && (
                      <span className="text-gray-600">
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {isAnnual && plan.price.monthly > 0 && (
                    <p className="text-sm text-green-600">
                      Save ${(plan.price.monthly * 12) - plan.price.annual} per year
                    </p>
                  )}
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, idx) => (
                    <div key={idx} className="flex items-center opacity-60">
                      <div className="h-5 w-5 mr-3 flex-shrink-0 flex items-center justify-center">
                        <div className="h-1 w-3 bg-gray-400 rounded"></div>
                      </div>
                      <span className="text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Link href="/auth/register?role=candidate">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Employers Pricing */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Employers</h2>
            <p className="text-xl text-gray-600">Find and hire the best part-time talent</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {employerPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`p-8 h-full relative ${plan.popular ? 'border-2 border-blue-500 shadow-xl' : ''}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                      Most Popular
                    </Badge>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                      </span>
                      <span className="text-gray-600">
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    </div>
                    {isAnnual && (
                      <p className="text-sm text-green-600">
                        Save ${(plan.price.monthly * 12) - plan.price.annual} per year
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/auth/register?role=employer">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Services</h2>
          <p className="text-xl text-gray-600">Professional tools to enhance your workflow</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {additionalServices.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-3 w-fit mx-auto mb-4">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                <p className="font-bold text-blue-600">{service.price}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Can I change my plan anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
              },
              {
                question: "Is there a free trial?",
                answer: "We offer a free plan for job seekers and a 14-day free trial for all employer plans. No credit card required to get started."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans. All payments are processed securely."
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. Contact our support team for assistance."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">Join thousands of professionals already using Part Timer</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register?role=candidate">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Start as Job Seeker
              </Button>
            </Link>
            <Link href="/auth/register?role=employer">
              <Button size="lg" variant="outline">
                Start Hiring
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Part Timer</span>
            </div>
            <div className="text-gray-400">
              <p>&copy; 2024 Part Timer. Professional part-time work platform.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}