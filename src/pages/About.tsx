import { Calculator, Target, Users, TrendingUp, Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SEO from '@/components/SEO';

const About = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About AllFinCal",
    "description": "Learn about AllFinCal's mission to simplify personal finance and investment planning for everyone",
    "url": "https://allfincal.vercel.app/about"
  };

  const values = [
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Accurate Calculations',
      description: 'Precision-engineered calculators using verified financial formulas and industry standards.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'User-Focused Design',
      description: 'Simple, intuitive interface that makes complex financial planning accessible to everyone.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Driven',
      description: 'Built for real people making real financial decisions every day.',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Free Forever',
      description: 'No hidden fees, no premium tiers. Quality financial tools accessible to all.',
    },
  ];

  return (
    <>
      <SEO 
        title="About Us - Your Trusted Financial Planning Partner"
        description="Learn about AllFinCal's mission to simplify personal finance and investment planning. Discover how we help millions make smarter financial decisions with free calculators and expert insights."
        keywords="about AllFinCal, financial planning mission, investment tools team, finance calculator about, about us, who we are, our mission, our vision, financial literacy, financial education, free financial tools, trusted financial calculator, accurate calculator, reliable financial tools, Indian financial planning, personal finance India, investment planning India, financial planning company, financial technology, fintech tools, money management platform, wealth planning tools, financial calculator website, best financial calculator, top financial tools India, financial planning resources, financial calculator team, expert financial tools, professional calculators, financial guidance, money planning assistance, investment advice tools, financial decision tools, smart money management, financial empowerment, democratizing finance, accessible financial planning, user-friendly calculators, financial independence tools, financial wellness platform, comprehensive financial tools"
        canonical="/about"
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
              <BreadcrumbPage>About</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="min-h-screen">
          {/* Hero Section */}
          <section className="gradient-subtle py-20 px-4">
            <div className="container mx-auto max-w-4xl text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                About AllFinCal
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Empowering Indians to make smarter financial decisions through free, accurate, and easy-to-use calculators.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <Card className="p-8 md:p-12 border-0 shadow-lg">
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    AllFinCal was created with a simple vision: to make financial planning accessible to everyone, regardless of their background or expertise. We believe that everyone deserves the tools and knowledge to make informed financial decisions.
                  </p>
                  <p>
                    In today's complex financial landscape, understanding loans, investments, and savings can be overwhelming. That's where we come in. Our suite of calculators helps you visualize your financial future, compare options, and plan confidently.
                  </p>
                  <p>
                    Whether you're a young professional planning your first home loan, a parent saving for your child's education through SIPs, or someone looking to maximize returns on fixed deposits, AllFinCal provides the clarity you need.
                  </p>
                </div>
              </Card>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold text-foreground text-center mb-12">
                What We Stand For
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <Card
                    key={index}
                    className="p-6 border-0 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Why Choose AllFinCal?
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    📊 Comprehensive Calculator Suite
                  </h3>
                  <p>
                    From basic EMI calculations to complex retirement planning, we cover all aspects of personal finance. Our calculators include EMI, Home Loan, Car Loan, Personal Loan, SIP, FD, RD, Lumpsum, Retirement, and Currency Converter.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    🎯 Accuracy You Can Trust
                  </h3>
                  <p>
                    Every calculator uses verified mathematical formulas aligned with industry standards and regulatory guidelines. We regularly update our tools to reflect current market practices.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    🚀 No Registration Required
                  </h3>
                  <p>
                    Jump straight into calculations without creating accounts or sharing personal information. Your privacy matters to us.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    📱 Mobile-Friendly Experience
                  </h3>
                  <p>
                    Access all tools seamlessly on any device. Calculate on the go, whether you're at the bank, meeting with advisors, or researching from home.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="container mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Built by Finance Enthusiasts
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Our team combines expertise in finance, technology, and user experience design. We're passionate about democratizing financial literacy and creating tools that genuinely help people achieve their financial goals.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
