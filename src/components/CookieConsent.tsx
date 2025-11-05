import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom">
      <Card className="max-w-4xl mx-auto p-6 shadow-2xl border-2">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              We Value Your Privacy
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies. Read our{' '}
              <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a> for more information.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={acceptCookies} size="sm">
                Accept All
              </Button>
              <Button onClick={declineCookies} variant="outline" size="sm">
                Decline
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={declineCookies}
            className="flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;
