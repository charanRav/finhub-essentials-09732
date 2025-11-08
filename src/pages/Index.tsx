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
        keywords="financial calculator, calculator, finance calculator, EMI calculator, SIP calculator, FD calculator, RD calculator, loan calculator, home loan calculator, car loan calculator, personal loan calculator, investment calculator, retirement calculator, lumpsum calculator, mutual fund calculator, SWP calculator, PPF calculator, NPS calculator, tax calculator, interest calculator, compound interest calculator, simple interest calculator, mortgage calculator, education loan calculator, fixed deposit calculator, recurring deposit calculator, savings calculator, budget calculator, debt calculator, credit card calculator, insurance calculator, GST calculator, TDS calculator, gratuity calculator, HRA calculator, salary calculator, income tax calculator, EPF calculator, APY calculator, sukanya samriddhi calculator, money calculator, financial planning tools, investment planning, wealth calculator, return calculator, profit calculator, ROI calculator, CAGR calculator, India financial calculator, online calculator, free calculator, calculate EMI, calculate SIP, calculate returns, calculate interest, financial tools, money management tools, personal finance calculator, business calculator, loan EMI, monthly EMI, EMI planning, loan planning, investment returns, FD returns, RD maturity, SIP returns, retirement planning, pension calculator, wealth management, financial advisor tools, bank calculator, NBFC calculator, investment advisor"
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
