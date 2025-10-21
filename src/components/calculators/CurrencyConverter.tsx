import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const currencies = {
  USD: { name: 'US Dollar', rate: 1 },
  EUR: { name: 'Euro', rate: 0.92 },
  GBP: { name: 'British Pound', rate: 0.79 },
  INR: { name: 'Indian Rupee', rate: 83.12 },
  JPY: { name: 'Japanese Yen', rate: 149.50 },
  AUD: { name: 'Australian Dollar', rate: 1.52 },
  CAD: { name: 'Canadian Dollar', rate: 1.36 },
  CHF: { name: 'Swiss Franc', rate: 0.88 },
  CNY: { name: 'Chinese Yuan', rate: 7.24 },
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [result, setResult] = useState(0);

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const convertCurrency = () => {
    const amt = parseFloat(amount) || 0;
    if (amt > 0) {
      const fromRate = currencies[fromCurrency as keyof typeof currencies].rate;
      const toRate = currencies[toCurrency as keyof typeof currencies].rate;
      const converted = (amt / fromRate) * toRate;
      setResult(converted);
    } else {
      setResult(0);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleReset = () => {
    setAmount('100');
    setFromCurrency('USD');
    setToCurrency('INR');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from-currency">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger id="from-currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(currencies).map(([code, { name }]) => (
                  <SelectItem key={code} value={code}>
                    {code} - {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-currency">To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger id="to-currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(currencies).map(([code, { name }]) => (
                  <SelectItem key={code} value={code}>
                    {code} - {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleSwap} variant="outline" className="w-full">
          <RefreshCw className="w-4 h-4 mr-2" />
          Swap Currencies
        </Button>
      </div>

      <div className="space-y-4 p-6 bg-muted rounded-xl">
        <div className="flex items-center gap-2 text-primary mb-4">
          <RefreshCw className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Result</h3>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Converted Amount</p>
          <p className="text-3xl font-bold text-primary">
            {result.toLocaleString('en-US', { 
              minimumFractionDigits: 2,
              maximumFractionDigits: 2 
            })} {toCurrency}
          </p>
          <p className="text-xs text-muted-foreground">
            Exchange Rate: 1 {fromCurrency} = {(currencies[toCurrency as keyof typeof currencies].rate / currencies[fromCurrency as keyof typeof currencies].rate).toFixed(4)} {toCurrency}
          </p>
        </div>
      </div>

      <Button onClick={handleReset} variant="outline" className="w-full">
        Reset
      </Button>
    </div>
  );
};

export default CurrencyConverter;
