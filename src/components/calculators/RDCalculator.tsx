import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Repeat, Info } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const RDCalculator = () => {
  const [monthlyDeposit, setMonthlyDeposit] = useState('5000');
  const [rate, setRate] = useState('6.5');
  const [tenure, setTenure] = useState('5');
  const [tenureUnit, setTenureUnit] = useState<'months' | 'years'>('years');
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('yearly');

  useEffect(() => {
    calculateRD();
  }, [monthlyDeposit, rate, tenure, tenureUnit]);

  const calculateRD = () => {
    const M = parseFloat(monthlyDeposit) || 0;
    const annualRate = parseFloat(rate) || 0;
    const tenureValue = parseFloat(tenure) || 0;

    const N = tenureUnit === 'years' ? tenureValue * 12 : tenureValue;
    const r = annualRate / 100 / 12;

    if (M > 0 && N > 0) {
      let A;
      if (r === 0) {
        A = M * N;
      } else {
        // Standard RD formula (deposits at end of month)
        A = M * (Math.pow(1 + r, N) - 1) / r;
      }

      const deposited = M * N;
      const interest = A - deposited;

      setMaturityAmount(A);
      setTotalDeposit(deposited);
      setTotalInterest(interest);
    } else {
      setMaturityAmount(0);
      setTotalDeposit(0);
      setTotalInterest(0);
    }
  };

  const handleReset = () => {
    setMonthlyDeposit('5000');
    setRate('6.5');
    setTenure('5');
    setTenureUnit('years');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="monthly-deposit">Monthly Deposit (₹)</Label>
          <Input
            id="monthly-deposit"
            type="number"
            value={monthlyDeposit}
            onChange={(e) => setMonthlyDeposit(e.target.value)}
            placeholder="Enter monthly deposit"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rate">Interest Rate (% per annum)</Label>
          <Input
            id="rate"
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter interest rate"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tenure">Tenure</Label>
          <div className="flex gap-2">
            <Input
              id="tenure"
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="Enter tenure"
              className="flex-1"
            />
            <Select value={tenureUnit} onValueChange={(value: 'months' | 'years') => setTenureUnit(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="months">Months</SelectItem>
                <SelectItem value="years">Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          💡 <strong>Tip:</strong> Most people prefer viewing RD returns in <strong>yearly</strong> mode to track long-term savings goals and annual interest growth.
        </AlertDescription>
      </Alert>

      <div className="space-y-4 p-6 bg-muted rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary">
            <Repeat className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Results</h3>
          </div>
          <RadioGroup value={viewMode} onValueChange={(value) => setViewMode(value as 'monthly' | 'yearly')} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="rd-monthly" />
              <Label htmlFor="rd-monthly" className="cursor-pointer">Monthly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yearly" id="rd-yearly" />
              <Label htmlFor="rd-yearly" className="cursor-pointer">Yearly</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Maturity Amount</p>
            <p className="text-2xl font-bold text-primary">
              ₹{maturityAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{viewMode === 'monthly' ? 'Monthly Interest' : 'Yearly Interest'}</p>
            <p className="text-2xl font-bold text-secondary">
              ₹{(viewMode === 'monthly' ? totalInterest / (parseFloat(tenure) * (tenureUnit === 'years' ? 12 : 1)) : totalInterest / (tenureUnit === 'months' ? parseFloat(tenure) / 12 : parseFloat(tenure))).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Interest</p>
            <p className="text-2xl font-bold text-accent">
              ₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Total Deposited: <span className="font-semibold text-foreground">₹{totalDeposit.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
          </p>
        </div>
      </div>

      <Button onClick={handleReset} variant="outline" className="w-full">
        Reset
      </Button>
    </div>
  );
};

export default RDCalculator;
