import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { TrendingUp, Info } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('5000');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [tenure, setTenure] = useState('10');
  const [stepUp, setStepUp] = useState('0');
  const [futureValue, setFutureValue] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('yearly');

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, expectedReturn, tenure, stepUp]);

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment) || 0;
    const annualReturn = parseFloat(expectedReturn) || 0;
    const years = parseFloat(tenure) || 0;
    const g = parseFloat(stepUp) / 100 || 0;

    const r_month = annualReturn / 12 / 100;
    const N = years * 12;

    if (P > 0 && N > 0) {
      let FV = 0;
      let totalInv = 0;

      if (g === 0) {
        // Standard SIP formula (no step-up)
        if (r_month === 0) {
          FV = P * N;
        } else {
          FV = P * ((Math.pow(1 + r_month, N) - 1) / r_month);
        }
        totalInv = P * N;
      } else {
        // Step-up SIP (iterative calculation)
        for (let m = 1; m <= N; m++) {
          const yearIndex = Math.floor((m - 1) / 12);
          const contrib = P * Math.pow(1 + g, yearIndex);
          FV = FV * (1 + r_month) + contrib;
          totalInv += contrib;
        }
      }

      const returns = FV - totalInv;

      setFutureValue(FV);
      setTotalInvested(totalInv);
      setTotalReturns(returns);
    } else {
      setFutureValue(0);
      setTotalInvested(0);
      setTotalReturns(0);
    }
  };

  const handleReset = () => {
    setMonthlyInvestment('5000');
    setExpectedReturn('12');
    setTenure('10');
    setStepUp('0');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="sip-monthly">Monthly Investment (₹)</Label>
          <Input
            id="sip-monthly"
            type="number"
            value={monthlyInvestment}
            onChange={(e) => setMonthlyInvestment(e.target.value)}
            placeholder="Enter monthly investment"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sip-return">Expected Return Rate (% per annum)</Label>
          <Input
            id="sip-return"
            type="number"
            step="0.1"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(e.target.value)}
            placeholder="Enter expected return rate"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sip-tenure">Investment Period (years)</Label>
          <Input
            id="sip-tenure"
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            placeholder="Enter investment period"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="step-up">Annual Step-Up (%)</Label>
          <Input
            id="step-up"
            type="number"
            step="1"
            value={stepUp}
            onChange={(e) => setStepUp(e.target.value)}
            placeholder="Enter annual step-up percentage"
          />
          <p className="text-xs text-muted-foreground">Annual increase in SIP amount (e.g., 10 for 10%)</p>
        </div>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          💡 <strong>Tip:</strong> Most people prefer viewing SIP returns in <strong>yearly</strong> mode to understand long-term wealth accumulation and annual growth.
        </AlertDescription>
      </Alert>

      <div className="space-y-4 p-6 bg-muted rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Results</h3>
          </div>
          <RadioGroup value={viewMode} onValueChange={(value) => setViewMode(value as 'monthly' | 'yearly')} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="sip-monthly" />
              <Label htmlFor="sip-monthly" className="cursor-pointer">Monthly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yearly" id="sip-yearly" />
              <Label htmlFor="sip-yearly" className="cursor-pointer">Yearly</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Future Value</p>
            <p className="text-2xl font-bold text-primary">
              ₹{futureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{viewMode === 'monthly' ? 'Monthly Investment' : 'Yearly Investment'}</p>
            <p className="text-2xl font-bold text-secondary">
              ₹{(viewMode === 'monthly' ? parseFloat(monthlyInvestment) : parseFloat(monthlyInvestment) * 12).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Returns</p>
            <p className="text-2xl font-bold text-accent">
              ₹{totalReturns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>
      </div>

      <Button onClick={handleReset} variant="outline" className="w-full">
        Reset
      </Button>
    </div>
  );
};

export default SIPCalculator;
