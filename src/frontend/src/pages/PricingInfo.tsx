import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PricingFactorCard from '@/components/PricingFactorCard';
import { Calendar, Award, Zap, TrendingUp, Wrench, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from '@tanstack/react-router';

export default function PricingInfo() {
  const navigate = useNavigate();

  const pricingFactors = [
    {
      icon: Calendar,
      title: 'Age of Unit',
      description:
        'Newer units typically command higher prices. Units under 5 years old are especially valuable.',
    },
    {
      icon: Wrench,
      title: 'Condition',
      description:
        'Working units in excellent condition receive premium pricing. Minor issues may reduce the offer.',
    },
    {
      icon: Award,
      title: 'Brand Reputation',
      description:
        'Premium brands like Daikin, Mitsubishi, and LG often fetch better prices due to reliability.',
    },
    {
      icon: Zap,
      title: 'Energy Efficiency',
      description:
        'High-efficiency units with good energy ratings are more valuable in the resale market.',
    },
    {
      icon: TrendingUp,
      title: 'Market Demand',
      description:
        'Seasonal demand and current market conditions influence pricing. Summer months see higher demand.',
    },
    {
      icon: DollarSign,
      title: 'Original Value',
      description:
        'Higher-end models with advanced features retain more value over time.',
      iconSrc: '/assets/generated/eco-icon.dim_128x128.png',
    },
  ];

  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Understanding Our Pricing
            </h1>
            <p className="text-lg text-muted-foreground">
              We evaluate multiple factors to provide you with the most competitive offer for your used air conditioner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {pricingFactors.map((factor, index) => (
              <PricingFactorCard key={index} {...factor} />
            ))}
          </div>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Get Your Personalized Quote</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Every air conditioner is unique. Submit your AC details to receive a customized quote based on all these factors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate({ to: '/submit' })}
              >
                Submit Your AC for Quote
              </Button>
            </CardContent>
          </Card>

          <div className="mt-12 bg-muted/50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Pricing Examples</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex justify-between items-center pb-3 border-b">
                <div>
                  <p className="font-medium text-foreground">Premium Brand, 2 Years Old, Excellent Condition</p>
                  <p className="text-sm">High-efficiency unit, fully functional</p>
                </div>
                <p className="text-lg font-semibold text-foreground">₹₹₹₹</p>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <div>
                  <p className="font-medium text-foreground">Mid-Range Brand, 5 Years Old, Good Condition</p>
                  <p className="text-sm">Working well, minor cosmetic wear</p>
                </div>
                <p className="text-lg font-semibold text-foreground">₹₹₹</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-foreground">Standard Brand, 8 Years Old, Fair Condition</p>
                  <p className="text-sm">Functional but showing age</p>
                </div>
                <p className="text-lg font-semibold text-foreground">₹₹</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4 italic">
              * These are general examples. Actual quotes depend on detailed evaluation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
