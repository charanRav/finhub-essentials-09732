import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SEO from '@/components/SEO';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact AllFinCal",
    "description": "Get in touch with AllFinCal for support, feedback, or partnership inquiries",
    "url": "https://allfincal.vercel.app/contact"
  };

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Message Sent!',
      description: 'Thank you for contacting us. We\'ll get back to you within 24-48 hours.',
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      content: 'support@allfincal.com',
      description: 'We typically respond within 24 hours',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Business Inquiries',
      content: 'partnerships@allfincal.com',
      description: 'For collaborations and partnerships',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      content: 'India',
      description: 'Serving users across the nation',
    },
  ];

  return (
    <>
      <SEO 
        title="Contact Us - Get in Touch with AllFinCal Team"
        description="Have questions about our financial calculators? Need support or want to provide feedback? Contact AllFinCal team for assistance with your financial planning needs."
        keywords="contact AllFinCal, financial calculator support, investment tools help, feedback"
        canonical="/contact"
        schema={schema}
      />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-4 h-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Contact</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="min-h-screen">
          {/* Hero Section */}
          <section className="gradient-subtle py-20 px-4">
            <div className="container mx-auto max-w-4xl text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Have questions, feedback, or suggestions? We'd love to hear from you!
              </p>
            </div>
          </section>

          {/* Contact Info Cards */}
          <section className="py-16 px-4 -mt-8">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="p-6 text-center border-0 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground mx-auto mb-4">
                      {info.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {info.title}
                    </h3>
                    <p className="text-primary font-medium mb-1">{info.content}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-2xl">
              <Card className="p-8 md:p-12 border-0 shadow-lg">
                <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full gap-2" size="lg">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <Card className="p-6 border-0 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Are your calculators accurate?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes! All our calculators use industry-standard formulas and are regularly updated to ensure accuracy. However, results should be used as estimates, and we recommend consulting with financial advisors for major decisions.
                  </p>
                </Card>

                <Card className="p-6 border-0 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Is AllFinCal really free?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Absolutely! All calculators and tools are completely free to use. We're supported by ethical advertising to keep our services free for everyone.
                  </p>
                </Card>

                <Card className="p-6 border-0 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Do you store my financial data?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    No. All calculations happen in your browser, and we don't store any of your financial information. Your privacy and security are our top priorities.
                  </p>
                </Card>

                <Card className="p-6 border-0 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Can I suggest new calculators or features?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes, we'd love to hear your ideas! Use the contact form above to share your suggestions, and we'll consider them for future updates.
                  </p>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Contact;
