import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Car, Info } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CarLoanCalculator = () => {
  const [principal, setPrincipal] = useState('500000');
  const [rate, setRate] = useState('9');
  const [tenure, setTenure] = useState('5');
  const [tenureUnit, setTenureUnit] = useState<'months' | 'years'>('years');
  const [balloonPayment, setBalloonPayment] = useState('0');
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    calculateCarLoan();
  }, [principal, rate, tenure, tenureUnit, balloonPayment]);

  const calculateCarLoan = () => {
    const P = parseFloat(principal) || 0;
    const annualRate = parseFloat(rate) || 0;
    const tenureValue = parseFloat(tenure) || 0;
    const B = parseFloat(balloonPayment) || 0;

    const n = tenureUnit === 'years' ? tenureValue * 12 : tenureValue;
    const r = annualRate / 12 / 100;

    if (P > 0 && n > 0) {
      let paymentValue;
      
      if (r === 0) {
        paymentValue = (P - B) / n;
      } else if (B > 0) {
        // Balloon payment formula
        const presentValueOfBalloon = B / Math.pow(1 + r, n);
        const denom = (1 - Math.pow(1 + r, -n)) / r;
        paymentValue = (P - presentValueOfBalloon) / denom;
      } else {
        // Standard EMI formula
        paymentValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }

      const totalPaid = (paymentValue * n) + B;
      const interest = totalPaid - P;

      setEmi(paymentValue);
      setTotalInterest(interest);
      setTotalAmount(totalPaid);
    } else {
      setEmi(0);
      setTotalInterest(0);
      setTotalAmount(0);
    }
  };

  const handleReset = () => {
    setPrincipal('500000');
    setRate('9');
    setTenure('5');
    setTenureUnit('years');
    setBalloonPayment('0');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="principal">Car Price / Loan Amount (₹)</Label>
          <Input
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter car price"
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
          <Label htmlFor="balloon">Balloon Payment (Optional) (₹)</Label>
          <Input
            id="balloon"
            type="number"
            value={balloonPayment}
            onChange={(e) => setBalloonPayment(e.target.value)}
            placeholder="Enter balloon payment amount"
          />
          <p className="text-xs text-muted-foreground">Amount to be paid at the end of the loan term</p>
        </div>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          💡 <strong>Tip:</strong> Most people prefer viewing car loan in <strong>monthly</strong> mode to plan their monthly budget alongside other expenses.
        </AlertDescription>
      </Alert>

      <div className="space-y-4 p-6 bg-muted rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary">
            <Car className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Results</h3>
          </div>
          <RadioGroup value={viewMode} onValueChange={(value) => setViewMode(value as 'monthly' | 'yearly')} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="car-monthly" />
              <Label htmlFor="car-monthly" className="cursor-pointer">Monthly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yearly" id="car-yearly" />
              <Label htmlFor="car-yearly" className="cursor-pointer">Yearly</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{viewMode === 'monthly' ? 'Monthly EMI' : 'Yearly Payment'}</p>
            <p className="text-2xl font-bold text-primary">
              ₹{(viewMode === 'monthly' ? emi : emi * 12).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
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

        {parseFloat(balloonPayment) > 0 && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Balloon Payment at End: <span className="font-semibold text-foreground">₹{parseFloat(balloonPayment).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </p>
          </div>
        )}
      </div>

      <Button onClick={handleReset} variant="outline" className="w-full">
        Reset
      </Button>
    </div>
  );
};

export default CarLoanCalculator;
