import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Shield, 
  Lock, 
  Eye,
  FileText,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { AccessibilityControls } from '@/components/accessibility-controls';

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      icon: FileText,
      content: [
        'Personal information you provide when creating an account (name, email, phone number)',
        'Professional information including work history, skills, and preferences',
        'Resume and portfolio documents you choose to upload',
        'Communication records between users on our platform',
        'Usage data and analytics to improve our services'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        'To create and maintain your account and profile',
        'To match you with relevant job opportunities or candidates',
        'To facilitate communication between job seekers and employers',
        'To provide customer support and respond to your inquiries',
        'To improve our platform and develop new features',
        'To send important updates about our services (with your consent)'
      ]
    },
    {
      title: 'Information Sharing',
      icon: Users,
      content: [
        'We never sell your personal information to third parties',
        'Job seekers\' profiles are visible to verified employers on our platform',
        'Employers\' company information is visible to job seekers',
        'We may share aggregated, non-personal data for research purposes',
        'Legal compliance: We may disclose information when required by law'
      ]
    },
    {
      title: 'Data Security',
      icon: Shield,
      content: [
        'All data is encrypted in transit and at rest using industry-standard protocols',
        'Regular security audits and penetration testing',
        'Secure data centers with 24/7 monitoring',
        'Employee access is limited and monitored',
        'Regular backups to prevent data loss'
      ]
    },
    {
      title: 'Your Rights',
      icon: Lock,
      content: [
        'Access: Request a copy of your personal data',
        'Correction: Update or correct inaccurate information',
        'Deletion: Request deletion of your account and data',
        'Portability: Export your data in a standard format',
        'Opt-out: Unsubscribe from marketing communications',
        'Complaint: Contact us or regulatory authorities with concerns'
      ]
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
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Your privacy is our priority. We're committed to protecting your personal information 
            and being transparent about how we collect, use, and safeguard your data.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 inline-block">
            <div className="flex items-center text-green-800">
              <CheckCircle className="h-6 w-6 mr-3" />
              <span className="font-semibold">Last updated: January 1, 2024</span>
            </div>
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Privacy Principles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide how we handle your personal information
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="bg-blue-100 rounded-lg p-4 w-fit mx-auto mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Transparency</h3>
              <p className="text-gray-600">
                We clearly explain what data we collect, why we collect it, and how we use it.
              </p>
            </Card>
            
            <Card className="p-8 text-center">
              <div className="bg-green-100 rounded-lg p-4 w-fit mx-auto mb-6">
                <Lock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Security</h3>
              <p className="text-gray-600">
                Your data is protected with industry-leading security measures and encryption.
              </p>
            </Card>
            
            <Card className="p-8 text-center">
              <div className="bg-purple-100 rounded-lg p-4 w-fit mx-auto mb-6">
                <Eye className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Control</h3>
              <p className="text-gray-600">
                You have full control over your data and can access, modify, or delete it anytime.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <Card key={index} className="p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-primary/10 rounded-lg p-3 mr-4">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Age-Specific Privacy */}
      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-lg p-3 mr-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Special Considerations for Senior Users</h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  We recognize that senior users may have specific privacy concerns and needs. 
                  We've implemented additional protections and considerations:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Enhanced fraud protection and monitoring for suspicious activity</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Clear, large-font privacy notices and consent forms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Phone support for privacy-related questions and concerns</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Option to limit profile visibility and control information sharing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span>Regular privacy education and tips for safe online job searching</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Your Privacy?</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                If you have any questions about this Privacy Policy or how we handle your data, 
                please don't hesitate to contact us. We're here to help and ensure your privacy is protected.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg">
                    Contact Privacy Team
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Download Privacy Policy (PDF)
                </Button>
              </div>
              <div className="mt-6 text-sm text-gray-500">
                <p>Email: privacy@seniorworks.com | Phone: +1 (555) 123-4567</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="bg-yellow-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">Important Notice</h3>
                <p className="text-yellow-800 leading-relaxed">
                  This Privacy Policy may be updated from time to time to reflect changes in our practices 
                  or legal requirements. We will notify you of any significant changes via email or through 
                  our platform. Your continued use of Part Timer after such changes constitutes acceptance 
                  of the updated policy.
                </p>
              </div>
            </div>
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