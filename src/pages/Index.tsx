import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import Dashboard from '@/components/Dashboard';
import CalculatorDialog from '@/components/CalculatorDialog';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null);

  return (
    <>
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
