import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  MessageCircle,
  Send,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { AccessibilityControls } from '@/components/accessibility-controls';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@seniorworks.com',
      action: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our team directly',
      contact: '+1 (555) 123-4567',
      action: 'Call Now'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with us in real-time',
      contact: 'Available 9 AM - 6 PM EST',
      action: 'Start Chat'
    }
  ];

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click the "Get Started" button and choose whether you\'re a job seeker or employer. Follow the simple registration process to set up your profile.'
    },
    {
      question: 'Is SeniorWorks really free for job seekers?',
      answer: 'Yes! Creating a profile, browsing jobs, and applying is completely free for all job seekers. We believe everyone deserves access to employment opportunities.'
    },
    {
      question: 'How do you ensure age-friendly employers?',
      answer: 'We carefully vet all employers and only partner with companies that demonstrate a commitment to age-inclusive hiring practices.'
    },
    {
      question: 'What if I need help using the platform?',
      answer: 'We offer comprehensive support including phone assistance, email help, and detailed guides. Our platform is designed to be senior-friendly with accessibility features.'
    }
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
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            We're here to help you succeed. Reach out with any questions, concerns, 
            or feedback about your Part Timer experience.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 rounded-lg p-4 w-fit mx-auto mb-6">
                <method.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
              <p className="text-gray-600 mb-4">{method.description}</p>
              <p className="font-medium text-gray-900 mb-6">{method.contact}</p>
              <Button className="w-full">{method.action}</Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <Card className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" className="mt-1" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" type="tel" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      className="mt-1" 
                      rows={6}
                      placeholder="Please describe how we can help you..."
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <Card className="p-8 mb-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Office Address</h3>
                      <p className="text-gray-600">
                        123 Business Avenue<br />
                        Suite 456<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                        Saturday: 10:00 AM - 4:00 PM EST<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <HelpCircle className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg">Emergency Support</h3>
                      <p className="text-gray-600">
                        For urgent technical issues, call our 24/7 helpline:<br />
                        <span className="font-medium">+1 (555) 999-HELP</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* FAQ Section */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index} className="p-6">
                      <h4 className="font-semibold text-lg text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </Card>
                  ))}
                  <p className="text-gray-600">support@parttimer.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
            <p className="text-xl text-gray-600">
              We welcome visitors by appointment. Schedule a meeting to discuss partnerships or get personalized assistance.
            </p>
          </div>
          
          <Card className="overflow-hidden">
            <div className="bg-gray-200 h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Interactive Map</p>
                <p className="text-gray-500">123 Business Avenue, New York, NY 10001</p>
              </div>
            </div>
          </Card>
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