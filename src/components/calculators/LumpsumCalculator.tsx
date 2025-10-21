import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { DollarSign, Info } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LumpsumCalculator = () => {
  const [principal, setPrincipal] = useState('100000');
  const [rate, setRate] = useState('12');
  const [tenure, setTenure] = useState('10');
  const [tenureUnit, setTenureUnit] = useState<'months' | 'years'>('years');
  const [compoundingFreq, setCompoundingFreq] = useState<'12' | '4' | '2' | '1'>('12');
  const [futureValue, setFutureValue] = useState(0);
  const [totalGains, setTotalGains] = useState(0);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('yearly');

  useEffect(() => {
    calculateLumpsum();
  }, [principal, rate, tenure, tenureUnit, compoundingFreq]);

  const calculateLumpsum = () => {
    const P = parseFloat(principal) || 0;
    const annualRate = parseFloat(rate) || 0;
    const tenureValue = parseFloat(tenure) || 0;
    const n = parseInt(compoundingFreq);

    const years = tenureUnit === 'months' ? tenureValue / 12 : tenureValue;
    const r = annualRate / 100;

    if (P > 0 && years > 0) {
      const A = P * Math.pow(1 + r / n, n * years);
      const gains = A - P;

      setFutureValue(A);
      setTotalGains(gains);
    } else {
      setFutureValue(0);
      setTotalGains(0);
    }
  };

  const handleReset = () => {
    setPrincipal('100000');
    setRate('12');
    setTenure('10');
    setTenureUnit('years');
    setCompoundingFreq('12');
  };

  const getCompoundingLabel = () => {
    switch (compoundingFreq) {
      case '1': return 'Annually';
      case '2': return 'Semi-annually';
      case '4': return 'Quarterly';
      case '12': return 'Monthly';
      default: return 'Monthly';
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="principal">Investment Amount (₹)</Label>
          <Input
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter investment amount"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rate">Expected Return Rate (% per annum)</Label>
          <Input
            id="rate"
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter expected return rate"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tenure">Investment Period</Label>
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
          <Label htmlFor="compounding">Compounding Frequency</Label>
          <Select value={compoundingFreq} onValueChange={(value: '12' | '4' | '2' | '1') => setCompoundingFreq(value)}>
            <SelectTrigger id="compounding">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">Monthly</SelectItem>
              <SelectItem value="4">Quarterly</SelectItem>
              <SelectItem value="2">Semi-annually</SelectItem>
              <SelectItem value="1">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Alert className="bg-primary/5 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          💡 <strong>Tip:</strong> Most people prefer viewing lumpsum returns in <strong>yearly</strong> mode to understand annual wealth growth and compound interest effect.
        </AlertDescription>
      </Alert>

      <div className="space-y-4 p-6 bg-muted rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary">
            <DollarSign className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Results</h3>
          </div>
          <RadioGroup value={viewMode} onValueChange={(value) => setViewMode(value as 'monthly' | 'yearly')} className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="lumpsum-monthly" />
              <Label htmlFor="lumpsum-monthly" className="cursor-pointer">Monthly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yearly" id="lumpsum-yearly" />
              <Label htmlFor="lumpsum-yearly" className="cursor-pointer">Yearly</Label>
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
            <p className="text-sm text-muted-foreground">{viewMode === 'monthly' ? 'Monthly Gains' : 'Yearly Gains'}</p>
            <p className="text-2xl font-bold text-secondary">
              ₹{(viewMode === 'monthly' ? totalGains / (parseFloat(tenure) * (tenureUnit === 'years' ? 12 : 1)) : totalGains / (tenureUnit === 'months' ? parseFloat(tenure) / 12 : parseFloat(tenure))).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Gains</p>
            <p className="text-2xl font-bold text-accent">
              ₹{totalGains.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Compounding: <span className="font-semibold text-foreground">{getCompoundingLabel()}</span>
          </p>
        </div>
      </div>

      <Button onClick={handleReset} variant="outline" className="w-full">
        Reset
      </Button>
    </div>
  );
};

export default LumpsumCalculator;
