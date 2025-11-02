import { FileText, AlertCircle, Scale, Ban, Lightbulb, Mail } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Terms = () => {
  const sections = [
    {
      icon: <Scale className="w-6 h-6" />,
      title: 'Acceptance of Terms',
      content: `By accessing and using AllFinCal (the "Service"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Service.

These terms apply to all visitors, users, and others who access or use the Service.`,
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Use of Service',
      content: `AllFinCal provides financial calculators and informational content for personal, non-commercial use.

**You agree to:**
• Use the Service only for lawful purposes
• Not attempt to harm, disable, or impair the Service
• Not use automated systems to access the Service without permission
• Not copy, reproduce, or redistribute content without authorization

**We reserve the right to:**
• Modify or discontinue the Service at any time
• Refuse service to anyone for any reason
• Remove content that violates these terms`,
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: 'Disclaimer of Warranties',
      content: `**IMPORTANT**: AllFinCal calculators are provided for informational and educational purposes only.

• Results are **estimates** based on inputs you provide
• Calculators should **not replace professional financial advice**
• We do not guarantee accuracy, completeness, or reliability
• Actual financial results may differ from calculations
• We are **not liable** for any financial decisions made based on our calculators

**The Service is provided "AS IS" without warranties of any kind**, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.`,
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Financial Advice Disclaimer',
      content: `AllFinCal does **NOT** provide financial, investment, tax, or legal advice.

• Our calculators are tools for **estimation only**
• Results do **not** constitute recommendations
• Always consult qualified professionals (financial advisors, tax consultants, lawyers) before making financial decisions
• We are not responsible for investment losses or financial outcomes

**Past performance does not guarantee future results.** Financial markets are subject to risks and uncertainties.`,
    },
    {
      icon: <Ban className="w-6 h-6" />,
      title: 'Limitation of Liability',
      content: `To the fullest extent permitted by law, AllFinCal and its operators shall not be liable for:

• Any direct, indirect, incidental, special, or consequential damages
• Loss of profits, revenue, data, or business opportunities
• Damages resulting from use or inability to use the Service
• Errors or inaccuracies in calculations or content
• Third-party actions or content

**Your use of the Service is at your own risk.** We provide no guarantees regarding outcomes or results.`,
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Intellectual Property',
      content: `All content on AllFinCal, including text, graphics, logos, calculators, and software, is the property of AllFinCal or its content suppliers and is protected by intellectual property laws.

**You may:**
• Use calculators for personal purposes
• Share links to our Service
• Reference our content with proper attribution

**You may NOT:**
• Copy, reproduce, or redistribute our calculators or content
• Create derivative works without permission
• Remove copyright or proprietary notices
• Use our content for commercial purposes without authorization`,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-subtle py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground mx-auto mb-6">
            <FileText className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Terms & Conditions
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Alert className="border-primary/50 bg-primary/5">
            <AlertCircle className="h-5 w-5 text-primary" />
            <AlertDescription className="text-foreground">
              <strong>Please read these terms carefully.</strong> By using AllFinCal, you agree to these Terms and Conditions. These calculators are for informational purposes only and should not replace professional financial advice.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Terms Sections */}
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

      {/* Additional Terms */}
      <section className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl space-y-8">
          <Card className="p-8 border-0 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Third-Party Links and Services
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              AllFinCal may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party sites. Accessing third-party links is at your own risk, and we encourage you to review their terms and policies.
            </p>
          </Card>

          <Card className="p-8 border-0 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Advertising
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              AllFinCal displays advertisements through Google AdSense. We do not control the content of these ads. Advertisers are solely responsible for ensuring their ads comply with applicable laws. Clicking on ads is at your own discretion.
            </p>
          </Card>

          <Card className="p-8 border-0 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Modifications to Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on this page with an updated "Last updated" date. Continued use of the Service after changes constitutes acceptance of the revised terms.
            </p>
          </Card>

          <Card className="p-8 border-0 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Governing Law
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms or use of the Service shall be subject to the exclusive jurisdiction of the courts in India.
            </p>
          </Card>

          <Card className="p-8 border-0 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Severability
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
            </p>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 border-0 shadow-lg text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground mx-auto mb-4">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              If you have any questions or concerns about these Terms and Conditions, please contact us:
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

export default Terms;
