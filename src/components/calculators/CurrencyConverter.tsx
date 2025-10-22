import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const currencySymbols: Record<string, string> = {
  USD: '$', EUR: '€', GBP: '£', INR: '₹', JPY: '¥',
  AUD: 'A$', CAD: 'C$', CHF: 'CHF', CNY: '¥',
  SEK: 'kr', NOK: 'kr', DKK: 'kr', NZD: 'NZ$',
  MXN: '$', BRL: 'R$', KRW: '₩', SGD: 'S$',
  HKD: 'HK$', THB: '฿', RUB: '₽'
};

const currencyNames: Record<string, string> = {
  USD: 'US Dollar', EUR: 'Euro', GBP: 'British Pound',
  INR: 'Indian Rupee', JPY: 'Japanese Yen', AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar', CHF: 'Swiss Franc', CNY: 'Chinese Yuan',
  SEK: 'Swedish Krona', NOK: 'Norwegian Krone', DKK: 'Danish Krone',
  NZD: 'New Zealand Dollar', MXN: 'Mexican Peso', BRL: 'Brazilian Real',
  KRW: 'South Korean Won', SGD: 'Singapore Dollar', HKD: 'Hong Kong Dollar',
  THB: 'Thai Baht', RUB: 'Russian Ruble'
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [result, setResult] = useState(0);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchExchangeRates(fromCurrency);
  }, [fromCurrency]);

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency, rates]);

  const fetchExchangeRates = async (baseCurrency: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      
      const data = await response.json();
      setRates(data.rates);
      setLastUpdated(new Date(data.time_last_update * 1000));
      
      toast({
        title: "Rates updated",
        description: "Exchange rates refreshed successfully",
      });
    } catch (err) {
      setError('Failed to fetch exchange rates. Using cached data.');
      toast({
        title: "Update failed",
        description: "Could not fetch latest rates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const convertCurrency = () => {
    const amt = parseFloat(amount) || 0;
    if (amt > 0 && rates[toCurrency]) {
      const converted = amt * rates[toCurrency];
      setResult(converted);
    } else {
      setResult(0);
    }
  };

  const handleRefresh = () => {
    fetchExchangeRates(fromCurrency);
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

  const getDecimalPlaces = (currency: string) => {
    return currency === 'JPY' || currency === 'KRW' ? 0 : 2;
  };

  return (
    <div className="space-y-6">
      {/* Live Status and Refresh */}
      <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500' : error ? 'bg-red-500' : 'bg-green-500'}`} />
            {!isLoading && !error && (
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping" />
            )}
          </div>
          <span className="text-xs font-medium">
            {isLoading ? 'Updating...' : error ? 'Offline' : 'Live Rates'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {lastUpdated && !isNaN(lastUpdated.getTime()) && (
            <span className="text-xs text-muted-foreground">
              Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
            </span>
          )}
          <Button
            onClick={handleRefresh}
            variant="ghost"
            size="sm"
            disabled={isLoading}
            className="h-7 px-2"
          >
            {isLoading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <RefreshCw className="w-3 h-3" />
            )}
          </Button>
        </div>
      </div>

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
                {Object.entries(currencyNames).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {currencySymbols[code]} {code} - {name}
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
                {Object.entries(currencyNames).map(([code, name]) => (
                  <SelectItem key={code} value={code}>
                    {currencySymbols[code]} {code} - {name}
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

      <div className="space-y-4 p-6 bg-muted rounded-xl border border-border">
        <div className="flex items-center gap-2 text-primary mb-4">
          <TrendingUp className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Conversion Result</h3>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">You get</p>
            <p className="text-4xl font-bold text-primary">
              {currencySymbols[toCurrency]}{result.toLocaleString('en-US', { 
                minimumFractionDigits: getDecimalPlaces(toCurrency),
                maximumFractionDigits: getDecimalPlaces(toCurrency)
              })}
            </p>
            <p className="text-lg text-muted-foreground">
              {result.toLocaleString('en-US', { 
                minimumFractionDigits: getDecimalPlaces(toCurrency),
                maximumFractionDigits: getDecimalPlaces(toCurrency)
              })} {toCurrency}
            </p>
          </div>

          {rates[toCurrency] && (
            <div className="pt-4 border-t border-border space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Exchange Rate</span>
                <span className="font-semibold">
                  1 {fromCurrency} = {rates[toCurrency].toFixed(4)} {toCurrency}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Reverse Rate</span>
                <span className="font-semibold">
                  1 {toCurrency} = {(1 / rates[toCurrency]).toFixed(4)} {fromCurrency}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Button onClick={handleReset} variant="outline" className="w-full">
        Reset
      </Button>
    </div>
  );
};

export default CurrencyConverter;
