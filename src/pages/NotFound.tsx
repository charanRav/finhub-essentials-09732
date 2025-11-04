import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';

const NotFound = () => {
  return (
    <>
      <SEO 
        title="Page Not Found - 404 Error"
        description="The page you're looking for doesn't exist. Return to AllFinCal homepage to access our financial calculators and investment tools."
        canonical="/404"
      />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-3xl font-semibold text-foreground mt-4 mb-2">
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/">
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/blog">
                <Search className="w-5 h-5" />
                Browse Blog
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
