import { useState } from 'react';
import SEO from '@/components/SEO';
import SplashScreen from '@/components/SplashScreen';
import Dashboard from '@/components/Dashboard';
import CalculatorDialog from '@/components/CalculatorDialog';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AllFinCal",
    "applicationCategory": "FinanceApplication",
    "description": "Free financial calculators and investment planning tools for smart money management",
    "url": "https://allfincal.vercel.app",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };

  return (
    <>
      <SEO 
        title="Smart Financial Calculator & Investment Tools"
        description="AllFinCal helps you calculate RD, FD, SIP, and loan returns easily with accurate results and clean design. Free tools for smart financial planning."
        keywords="financial calculator, RD calculator, SIP calculator, FD calculator, loan EMI calculator, investment tools, retirement planning"
        canonical="/"
        schema={schema}
      />
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      {!showSplash && (
        <>
          <Dashboard onSelectCalculator={setSelectedCalculator} />
          <CalculatorDialog 
            calculatorId={selectedCalculator} 
            onClose={() => setSelectedCalculator(null)} 
          />
        </>
      )}
    </>
  );
};

export default Index;
