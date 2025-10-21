import { Calculator, Home, User, Car, TrendingUp, PiggyBank, Repeat, DollarSign, Heart, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import AdBanner from './AdBanner';

interface CalculatorCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  gradient: string;
}

const calculators: CalculatorCard[] = [
  {
    id: 'emi',
    title: 'Loan / EMI',
    icon: <Calculator className="w-8 h-8" />,
    description: 'Calculate monthly installments',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'home-loan',
    title: 'Home Loan',
    icon: <Home className="w-8 h-8" />,
    description: 'Plan your dream home',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'personal-loan',
    title: 'Personal Loan',
    icon: <User className="w-8 h-8" />,
    description: 'Personal financing solutions',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'car-loan',
    title: 'Car Loan',
    icon: <Car className="w-8 h-8" />,
    description: 'Finance your vehicle',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'fd',
    title: 'Fixed Deposit',
    icon: <PiggyBank className="w-8 h-8" />,
    description: 'Calculate FD returns',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    id: 'rd',
    title: 'Recurring Deposit',
    icon: <Repeat className="w-8 h-8" />,
    description: 'Monthly savings calculator',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'sip',
    title: 'SIP Calculator',
    icon: <TrendingUp className="w-8 h-8" />,
    description: 'Systematic investment plan',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    id: 'lumpsum',
    title: 'Lumpsum Investment',
    icon: <DollarSign className="w-8 h-8" />,
    description: 'One-time investment returns',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 'retirement',
    title: 'Retirement Corpus',
    icon: <Heart className="w-8 h-8" />,
    description: 'Plan your golden years',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    id: 'currency',
    title: 'Currency Converter',
    icon: <RefreshCw className="w-8 h-8" />,
    description: 'Convert currencies instantly',
    gradient: 'from-teal-500 to-green-500',
  },
];

interface DashboardProps {
  onSelectCalculator: (id: string) => void;
}

const Dashboard = ({ onSelectCalculator }: DashboardProps) => {
  return (
    <div className="min-h-screen gradient-subtle py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">
            💹 One Stop Financial Calculator
          </h1>
          <p className="text-xl text-muted-foreground font-light">
            All your finance tools in one beautiful place
          </p>
        </header>

        {/* Top Banner Ad */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <AdBanner size="leaderboard" className="hidden md:block" />
          <AdBanner size="mobile" className="md:hidden" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content - Calculator Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {calculators.map((calc, index) => (
                <Card
                  key={calc.id}
                  className="group cursor-pointer overflow-hidden border-0 shadow-card hover:shadow-hover transition-smooth hover:scale-105 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => onSelectCalculator(calc.id)}
                >
                  <div className="p-6 space-y-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${calc.gradient} flex items-center justify-center text-white transition-smooth group-hover:scale-110`}>
                      {calc.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold text-card-foreground">
                        {calc.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {calc.description}
                      </p>
                    </div>
                  </div>
                  <div className={`h-1 bg-gradient-to-r ${calc.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
                </Card>
              ))}
            </div>

            {/* Mid-Content Ad (Between Sections) */}
            <div className="mt-8 flex justify-center animate-fade-in" style={{ animationDelay: '500ms' }}>
              <AdBanner size="rectangle" />
            </div>
          </div>

          {/* Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-6 space-y-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <AdBanner size="rectangle" />
              <AdBanner size="rectangle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
