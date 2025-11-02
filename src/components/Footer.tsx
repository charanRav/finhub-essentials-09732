import { Link } from 'react-router-dom';
import { Calculator, Mail, FileText, Shield, Book } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about', icon: <Book className="w-4 h-4" /> },
      { label: 'Contact', path: '/contact', icon: <Mail className="w-4 h-4" /> },
      { label: 'Blog', path: '/blog', icon: <FileText className="w-4 h-4" /> },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy', icon: <Shield className="w-4 h-4" /> },
      { label: 'Terms & Conditions', path: '/terms', icon: <FileText className="w-4 h-4" /> },
    ],
    calculators: [
      { label: 'EMI Calculator', path: '/#emi' },
      { label: 'SIP Calculator', path: '/#sip' },
      { label: 'Home Loan Calculator', path: '/#home-loan' },
      { label: 'FD Calculator', path: '/#fd' },
    ],
  };

  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                AllFinCal
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for financial planning and investment decisions. Free calculators and expert insights.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Calculators */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Popular Calculators</h3>
            <ul className="space-y-3">
              {footerLinks.calculators.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {currentYear} AllFinCal. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground text-center md:text-right">
            Made with ❤️ for better financial decisions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
