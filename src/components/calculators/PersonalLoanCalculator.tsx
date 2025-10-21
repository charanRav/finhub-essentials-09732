import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, Info } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PersonalLoanCalculator = () => {
  const [principal, setPrincipal] = useState('50000');
  const [rate, setRate] = useState('12');
  const [tenure, setTenure] = useState('12');
  const [tenureUnit, setTenureUnit] = useState<'months' | 'years'>('months');
  const [paymentFreq, setPaymentFreq] = useState<'monthly' | 'bi-weekly' | 'weekly'>('monthly');
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [numberOfPayments, setNumberOfPayments] = useState(0);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    calculatePersonalLoan();
  }, [principal, rate, tenure, tenureUnit, paymentFreq]);

  const calculatePersonalLoan = () => {
    const P = parseFloat(principal) || 0;
    const annualRate = parseFloat(rate) || 0;
    const tenureValue = parseFloat(tenure) || 0;

    // Determine periods per year
    const periodsPerYear = paymentFreq === 'monthly' ? 12 : paymentFreq === 'bi-weekly' ? 26 : 52;

    // Convert tenure to years
    const years = tenureUnit === 'months' ? tenureValue / 12 : tenureValue;

    // Total number of payments
    const n = Math.round(years * periodsPerYear);

    // Periodic interest rate
    const r = annualRate / 100 / periodsPerYear;

    if (P > 0 && n > 0) {
      let paymentValue;
      if (r === 0) {
        paymentValue = P / n;
      } else {
        paymentValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }
      const total = paymentValue * n;
      const interest = total - P;

      setEmi(paymentValue);
      setTotalInterest(interest);
      setTotalAmount(total);
      setNumberOfPayments(n);
    } else {
      setEmi(0);
      setTotalInterest(0);
      setTotalAmount(0);
      setNumberOfPayments(0);
    }
  };

  const handleReset = () => {
    setPrincipal('50000');
    setRate('12');
    setTenure('12');
    setTenureUnit('months');
    setPaymentFreq('monthly');
  };

  const getPaymentLabel = () => {
    if (viewMode === 'monthly') {
      return paymentFreq === 'monthly' ? 'Monthly Payment' : paymentFreq === 'bi-weekly' ? 'Bi-weekly Payment' : 'Weekly Payment';
    }
    return 'Yearly Payment';
  };

  const getPaymentAmount = () => {
    if (viewMode === 'monthly') {
      return emi;
    }
    const periodsPerYear = paymentFreq === 'monthly' ? 12 : paymentFreq === 'bi-weekly' ? 26 : 52;
    return emi * periodsPerYear;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="principal">Loan Amount (₹)</Label>
          <Input
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter loan amount"
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
          <Label htmlFor="tenure">Loan Tenure</Label>
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

        <div className="space-y-2">
          <Label htmlFor="payment-freq">Payment Frequency</Label>
          <Select value={paymentFreq} onValueChange={(value: 'monthly' | 'bi-weekly' | 'weekly') => setPaymentFreq(value)}>
            <SelectTrigger id="payment-freq">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          💡 <strong>Tip:</strong> Most people prefer viewing personal loan in <strong>monthly</strong> mode to match their salary cycles.
        </AlertDescription>
      </Alert>

      <div className="space-y-4 p-6 bg-muted rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary">
            <User className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Results</h3>
          </div>
          <RadioGroup value={viewMode} onValueChange={(value) => setViewMode(value as 'monthly' | 'yearly')} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="personal-monthly" />
              <Label htmlFor="personal-monthly" className="cursor-pointer">Monthly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yearly" id="personal-yearly" />
              <Label htmlFor="personal-yearly" className="cursor-pointer">Yearly</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{getPaymentLabel()}</p>
            <p className="text-2xl font-bold text-primary">
              ₹{getPaymentAmount().toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Interest</p>
            <p className="text-2xl font-bold text-secondary">
              ₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold text-accent">
              ₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">Total Payments: <span className="font-semibold text-foreground">{numberOfPayments}</span></p>
        </div>
      </div>

      <Button onClick={handleReset} variant="outline" className="w-full">
        Reset
      </Button>
    </div>
  );
};

export default PersonalLoanCalculator;
