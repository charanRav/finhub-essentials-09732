import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Home, Info } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const HomeLoanCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState('5000000');
  const [downPayment, setDownPayment] = useState('20');
  const [downPaymentUnit, setDownPaymentUnit] = useState<'percent' | 'amount'>('percent');
  const [rate, setRate] = useState('8.5');
  const [tenure, setTenure] = useState('20');
  const [tenureUnit, setTenureUnit] = useState<'months' | 'years'>('years');
  const [processingFee, setProcessingFee] = useState('0.5');
  const [processingFeeMode, setProcessingFeeMode] = useState<'percent' | 'flat'>('percent');
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [ltv, setLtv] = useState(0);
  const [processingFeeAmount, setProcessingFeeAmount] = useState(0);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    calculateHomeLoan();
  }, [propertyPrice, downPayment, downPaymentUnit, rate, tenure, tenureUnit, processingFee, processingFeeMode]);

  const calculateHomeLoan = () => {
    const price = parseFloat(propertyPrice) || 0;
    const downValue = parseFloat(downPayment) || 0;
    const annualRate = parseFloat(rate) || 0;
    const tenureValue = parseFloat(tenure) || 0;
    const processingValue = parseFloat(processingFee) || 0;

    // Calculate down payment
    const downPaymentAmount = downPaymentUnit === 'percent' 
      ? (price * downValue) / 100 
      : downValue;

    // Calculate loan amount
    const P = price - downPaymentAmount;

    // Calculate processing fee
    const procFee = processingFeeMode === 'percent'
      ? (price * processingValue) / 100
      : processingValue;

    // Calculate tenure in months
    const n = tenureUnit === 'years' ? tenureValue * 12 : tenureValue;
    const r = annualRate / 12 / 100;

    // Calculate LTV
    const ltvValue = (P / price) * 100;

    if (P > 0 && n > 0 && price > 0) {
      let emiValue;
      if (r === 0) {
        emiValue = P / n;
      } else {
        emiValue = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      }
      const total = emiValue * n;
      const interest = total - P;

      setEmi(emiValue);
      setTotalInterest(interest);
      setTotalAmount(total);
      setLoanAmount(P);
      setLtv(ltvValue);
      setProcessingFeeAmount(procFee);
    } else {
      setEmi(0);
      setTotalInterest(0);
      setTotalAmount(0);
      setLoanAmount(0);
      setLtv(0);
      setProcessingFeeAmount(0);
    }
  };

  const handleReset = () => {
    setPropertyPrice('5000000');
    setDownPayment('20');
    setDownPaymentUnit('percent');
    setRate('8.5');
    setTenure('20');
    setTenureUnit('years');
    setProcessingFee('0.5');
    setProcessingFeeMode('percent');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="property-price">Property Price (₹)</Label>
          <Input
            id="property-price"
            type="number"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(e.target.value)}
            placeholder="Enter property price"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="down-payment">Down Payment</Label>
          <div className="flex gap-2">
            <Input
              id="down-payment"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="Enter down payment"
              className="flex-1"
            />
            <Select value={downPaymentUnit} onValueChange={(value: 'percent' | 'amount') => setDownPaymentUnit(value)}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percent">%</SelectItem>
                <SelectItem value="amount">₹</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
          <Label htmlFor="processing-fee">Processing Fee</Label>
          <div className="flex gap-2">
            <Input
              id="processing-fee"
              type="number"
              step="0.1"
              value={processingFee}
              onChange={(e) => setProcessingFee(e.target.value)}
              placeholder="Enter processing fee"
              className="flex-1"
            />
            <Select value={processingFeeMode} onValueChange={(value: 'percent' | 'flat') => setProcessingFeeMode(value)}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percent">%</SelectItem>
                <SelectItem value="flat">₹</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          💡 <strong>Tip:</strong> Most people prefer viewing home loan in <strong>monthly</strong> mode to plan their budget effectively.
        </AlertDescription>
      </Alert>

      <div className="space-y-4 p-6 bg-muted rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary">
            <Home className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Results</h3>
          </div>
          <RadioGroup value={viewMode} onValueChange={(value) => setViewMode(value as 'monthly' | 'yearly')} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="home-monthly" />
              <Label htmlFor="home-monthly" className="cursor-pointer">Monthly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yearly" id="home-yearly" />
              <Label htmlFor="home-yearly" className="cursor-pointer">Yearly</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Loan Amount</p>
            <p className="text-2xl font-bold text-primary">
              ₹{loanAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">LTV Ratio</p>
            <p className="text-2xl font-bold text-secondary">
              {ltv.toFixed(1)}%
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{viewMode === 'monthly' ? 'Monthly EMI' : 'Yearly Payment'}</p>
            <p className="text-2xl font-bold text-accent">
              ₹{(viewMode === 'monthly' ? emi : emi * 12).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Processing Fee</p>
            <p className="text-2xl font-bold text-primary">
              ₹{processingFeeAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
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
      </div>

      <Button onClick={handleReset} variant="outline" className="w-full">
        Reset
      </Button>
    </div>
  );
};

export default HomeLoanCalculator;
