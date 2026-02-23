import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator } from 'lucide-react';

type AgeRange = '2-3' | '3-5' | 'dead' | '';

interface PriceInfo {
  min?: number;
  max?: number;
  fixed?: number;
  label: string;
}

const priceMap: Record<Exclude<AgeRange, ''>, PriceInfo> = {
  '2-3': {
    min: 3000,
    max: 4000,
    label: '2-3 Years Old',
  },
  '3-5': {
    fixed: 2500,
    label: '3-5 Years Old',
  },
  'dead': {
    fixed: 2000,
    label: 'Dead/Non-Functional',
  },
};

export default function PricingCalculator() {
  const [selectedAge, setSelectedAge] = useState<AgeRange>('');

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getPriceDisplay = () => {
    if (!selectedAge) return null;

    const priceInfo = priceMap[selectedAge];
    
    if (priceInfo.min && priceInfo.max) {
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Estimated Price Range</p>
          <p className="text-4xl font-bold text-primary">
            {formatPrice(priceInfo.min)} - {formatPrice(priceInfo.max)}
          </p>
        </div>
      );
    }

    if (priceInfo.fixed) {
      return (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Estimated Price</p>
          <p className="text-4xl font-bold text-primary">
            {formatPrice(priceInfo.fixed)}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calculator className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Quick Price Estimator</CardTitle>
            <CardDescription className="text-base">
              Get an instant estimate based on your AC's age and condition
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="age-range" className="text-base font-medium">
            Select AC Age/Condition
          </Label>
          <Select value={selectedAge} onValueChange={(value) => setSelectedAge(value as AgeRange)}>
            <SelectTrigger id="age-range" className="w-full h-12 text-base">
              <SelectValue placeholder="Choose your AC's age or condition..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2-3" className="text-base py-3">
                2-3 Years Old (Good Condition)
              </SelectItem>
              <SelectItem value="3-5" className="text-base py-3">
                3-5 Years Old (Working Condition)
              </SelectItem>
              <SelectItem value="dead" className="text-base py-3">
                Dead/Non-Functional
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedAge && (
          <div className="mt-6 p-6 bg-primary/5 rounded-lg border border-primary/20">
            {getPriceDisplay()}
            <p className="text-sm text-muted-foreground text-center mt-4">
              * This is a base estimate. Final price may vary based on brand, model, and detailed condition assessment.
            </p>
          </div>
        )}

        {!selectedAge && (
          <div className="p-6 bg-muted/50 rounded-lg text-center">
            <p className="text-muted-foreground">
              Select an age range above to see your estimated price
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
