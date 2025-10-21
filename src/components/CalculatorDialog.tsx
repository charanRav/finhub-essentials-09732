import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AdBanner from './AdBanner';
import EMICalculator from './calculators/EMICalculator';
import HomeLoanCalculator from './calculators/HomeLoanCalculator';
import PersonalLoanCalculator from './calculators/PersonalLoanCalculator';
import CarLoanCalculator from './calculators/CarLoanCalculator';
import FDCalculator from './calculators/FDCalculator';
import RDCalculator from './calculators/RDCalculator';
import SIPCalculator from './calculators/SIPCalculator';
import LumpsumCalculator from './calculators/LumpsumCalculator';
import RetirementCalculator from './calculators/RetirementCalculator';
import CurrencyConverter from './calculators/CurrencyConverter';

interface CalculatorDialogProps {
  calculatorId: string | null;
  onClose: () => void;
}

const calculatorConfigs = {
  'emi': { title: 'Loan / EMI Calculator', description: 'Calculate your monthly loan installments with amortization', component: EMICalculator },
  'home-loan': { title: 'Home Loan Calculator', description: 'Calculate home loan with down payment and processing fees', component: HomeLoanCalculator },
  'personal-loan': { title: 'Personal Loan Calculator', description: 'Calculate personal loan with flexible payment frequency', component: PersonalLoanCalculator },
  'car-loan': { title: 'Car Loan Calculator', description: 'Calculate car loan with optional balloon payment', component: CarLoanCalculator },
  'fd': { title: 'Fixed Deposit Calculator', description: 'Calculate FD maturity with compounding frequency', component: FDCalculator },
  'rd': { title: 'Recurring Deposit Calculator', description: 'Calculate RD maturity with monthly deposits', component: RDCalculator },
  'sip': { title: 'SIP Calculator', description: 'Calculate SIP returns with step-up option', component: SIPCalculator },
  'lumpsum': { title: 'Lumpsum Investment Calculator', description: 'Calculate lumpsum investment returns', component: LumpsumCalculator },
  'retirement': { title: 'Retirement Corpus Calculator', description: 'Plan your retirement corpus and withdrawals', component: RetirementCalculator },
  'currency': { title: 'Currency Converter', description: 'Convert between currencies instantly', component: CurrencyConverter },
};

const CalculatorDialog = ({ calculatorId, onClose }: CalculatorDialogProps) => {
  const config = calculatorId ? calculatorConfigs[calculatorId as keyof typeof calculatorConfigs] : null;
  const CalculatorComponent = config?.component;

  return (
    <Dialog open={!!calculatorId} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          {/* Main Calculator Content */}
          <div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{config?.title}</DialogTitle>
              <DialogDescription>{config?.description}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              {CalculatorComponent && <CalculatorComponent />}
            </div>
          </div>

          {/* Ad Sidebar - Hidden on mobile, visible on larger screens */}
          <div className="hidden lg:flex flex-col gap-4 pt-4">
            <AdBanner size="rectangle" />
            <AdBanner size="rectangle" />
          </div>
        </div>

        {/* Mobile Ad - Shown only on smaller screens at the bottom */}
        <div className="lg:hidden mt-6 flex justify-center border-t border-border pt-6">
          <AdBanner size="mobile" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorDialog;
