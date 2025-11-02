import { Shield, Eye, Cookie, Lock, Database, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Privacy = () => {
  const sections = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Information We Collect',
      content: `AllFinCal is designed with privacy in mind. We collect minimal information to provide and improve our services:

• **Usage Data**: We use anonymous analytics to understand how our calculators are used, which helps us improve user experience.
• **Browser Information**: Basic technical information like browser type, device type, and operating system for optimization purposes.
• **Cookies**: We use cookies for analytics and advertising purposes (see Cookie Policy below).

**We DO NOT collect:**
• Personal financial data entered into calculators
• Banking details or account information
• Passwords or sensitive personal information`,
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'How We Use Your Information',
      content: `Any data we collect is used solely for:

• **Improving Services**: Understanding which calculators are most useful and where we can enhance functionality.
• **Analytics**: Measuring website performance and user engagement to optimize the experience.
• **Advertising**: Showing relevant ads through Google AdSense to keep our services free.
• **Communication**: If you contact us via our contact form, we use your email to respond to your inquiry.

We never sell, rent, or share your personal information with third parties except as required by law.`,
    },
    {
      icon: <Cookie className="w-6 h-6" />,
      title: 'Cookie Policy',
      content: `AllFinCal uses cookies to enhance your experience:

**Essential Cookies**: Required for basic site functionality.
**Analytics Cookies**: Help us understand how visitors interact with our site (via Google Analytics).
**Advertising Cookies**: Enable personalized ads through Google AdSense.

You can control cookies through your browser settings. Note that disabling certain cookies may affect site functionality.`,
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Data Security',
      content: `We take security seriously:

• All calculator operations happen **locally in your browser** - your financial inputs never leave your device.
• Our website uses **HTTPS encryption** to protect data transmission.
• We implement industry-standard security measures to protect any information we collect.
• We regularly review and update our security practices.

However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.`,
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Third-Party Services',
      content: `AllFinCal uses trusted third-party services:

**Google AdSense**: For displaying ads. Google may use cookies to show personalized ads. [Read Google's Privacy Policy](https://policies.google.com/privacy)

**Google Analytics**: For understanding site usage. Data is anonymized and aggregated. [Read Google Analytics Privacy Policy](https://support.google.com/analytics/answer/6004245)

These services have their own privacy policies, and we encourage you to review them.`,
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Your Rights',
      content: `You have the right to:

• **Access**: Request information about data we hold about you.
• **Correction**: Request correction of inaccurate data.
• **Deletion**: Request deletion of your data (where applicable).
• **Object**: Object to processing of your data.
• **Opt-out**: Disable cookies or opt-out of personalized advertising.

To exercise these rights, contact us at support@allfincal.com.`,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-subtle py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground mx-auto mb-6">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 border-0 shadow-lg">
            <p className="text-muted-foreground leading-relaxed">
              At AllFinCal, your privacy is paramount. This Privacy Policy explains how we collect, use, protect, and handle your information when you use our financial calculators and services. By using AllFinCal, you agree to the practices described in this policy.
            </p>
          </Card>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl space-y-8">
          {sections.map((section, index) => (
            <Card key={index} className="p-8 border-0 shadow-card">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground flex-shrink-0">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {section.title}
                </h2>
              </div>
              <div className="ml-16 text-muted-foreground leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Children's Privacy */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 border-0 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Children's Privacy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              AllFinCal is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately at support@allfincal.com.
            </p>
          </Card>
        </div>
      </section>

      {/* Changes to Policy */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 border-0 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the updated policy on this page with a new "Last updated" date.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
            </p>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 border-0 shadow-lg text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Questions or Concerns?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              If you have any questions about this Privacy Policy or our privacy practices, please don't hesitate to contact us:
            </p>
            <div className="space-y-2 text-primary font-medium">
              <p>Email: support@allfincal.com</p>
              <p>Through our <a href="/contact" className="underline hover:text-primary/80">Contact Page</a></p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
