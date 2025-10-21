import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 300);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center gradient-primary transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <div className="p-6 bg-white/20 backdrop-blur-sm rounded-3xl animate-scale-in">
            <TrendingUp className="w-20 h-20 text-white" strokeWidth={1.5} />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            One Stop Calculator
          </h1>
          <p className="text-xl text-white/90 font-light">
            Simplify Your Finance
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
