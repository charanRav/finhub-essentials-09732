import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Heart, Info } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';

const RetirementCalculator = () => {
  const [desiredIncome, setDesiredIncome] = useState('50000');
  const [retirementYears, setRetirementYears] = useState('25');
  const [expectedReturn, setExpectedReturn] = useState('8');
  const [inflation, setInflation] = useState('6');
  const [requiredCorpus, setRequiredCorpus] = useState(0);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(0);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('yearly');

  useEffect(() => {
    calculateRetirement();
  }, [desiredIncome, retirementYears, expectedReturn, inflation]);

  const calculateRetirement = () => {
    const D = parseFloat(desiredIncome) || 0;
    const Y = parseFloat(retirementYears) || 0;
    const annualReturn = parseFloat(expectedReturn) || 0;
    const inflationRate = parseFloat(inflation) || 0;

    if (D > 0 && Y > 0 && annualReturn > 0) {
      // Calculate real rate of return (adjusted for inflation)
      const realRate = ((1 + annualReturn / 100) / (1 + inflationRate / 100)) - 1;
      const monthlyRealRate = realRate / 12;
      const N = Y * 12; // Total months

      // Present value of annuity formula
      let corpus;
      if (monthlyRealRate === 0) {
        corpus = D * N;
      } else {
        corpus = D * (1 - Math.pow(1 + monthlyRealRate, -N)) / monthlyRealRate;
      }

      setRequiredCorpus(corpus);
      setMonthlyWithdrawal(D);
    } else {
      setRequiredCorpus(0);
      setMonthlyWithdrawal(0);
    }
  };

  const handleReset = () => {
    setDesiredIncome('50000');
    setRetirementYears('25');
    setExpectedReturn('8');
    setInflation('6');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="desired-income">Desired Monthly Income (₹)</Label>
          <Input
            id="desired-income"
            type="number"
            value={desiredIncome}
            onChange={(e) => setDesiredIncome(e.target.value)}
            placeholder="Enter desired monthly income"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="retirement-years">Retirement Duration (years)</Label>
          <Input
            id="retirement-years"
            type="number"
            value={retirementYears}
            onChange={(e) => setRetirementYears(e.target.value)}
            placeholder="Enter retirement duration"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expected-return">Expected Annual Return (%)</Label>
          <Input
            id="expected-return"
            type="number"
            step="0.1"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            placeholder="Enter expected return"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="inflation">Expected Inflation (%)</Label>
          <Input
            id="inflation"
            type="number"
            step="0.1"
            value={inflation}
            onChange={(e) => setInflation(e.target.value)}
            placeholder="Enter expected inflation"
          />
        </div>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          💡 <strong>Tip:</strong> Most people prefer viewing retirement corpus in <strong>yearly</strong> mode to understand annual income needs and long-term planning.
        </AlertDescription>
      </Alert>

      <div className="space-y-4 p-6 bg-muted rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary">
            <Heart className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Results</h3>
          </div>
          <RadioGroup value={viewMode} onValueChange={(value) => setViewMode(value as 'monthly' | 'yearly')} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="retirement-monthly" />
              <Label htmlFor="retirement-monthly" className="cursor-pointer">Monthly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yearly" id="retirement-yearly" />
              <Label htmlFor="retirement-yearly" className="cursor-pointer">Yearly</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1 md:col-span-2">
            <p className="text-sm text-muted-foreground">Required Corpus at Retirement</p>
            <p className="text-3xl font-bold text-primary">
              ₹{requiredCorpus.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{viewMode === 'monthly' ? 'Monthly Withdrawal' : 'Yearly Withdrawal'}</p>
            <p className="text-2xl font-bold text-secondary">
              ₹{(viewMode === 'monthly' ? monthlyWithdrawal : monthlyWithdrawal * 12).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Real Rate of Return</p>
            <p className="text-2xl font-bold text-accent">
              {(((1 + parseFloat(expectedReturn) / 100) / (1 + parseFloat(inflation) / 100) - 1) * 100).toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            This calculation assumes inflation-adjusted returns and considers the time value of money over {retirementYears} years.
          </p>
        </div>
      </div>

      <Button onClick={handleReset} variant="outline" className="w-full">
        Reset
      </Button>
    </div>
  );
};

export default RetirementCalculator;
