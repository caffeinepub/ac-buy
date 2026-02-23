import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Leaf, Clock, Shield } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: DollarSign,
      title: 'Competitive Prices',
      description: 'We offer the best prices in the market for your used air conditioners.',
    },
    {
      icon: Clock,
      title: 'Quick Process',
      description: 'Submit your AC details and get a quote within 24 hours.',
    },
    {
      icon: Shield,
      title: 'Trusted Service',
      description: 'Years of experience in the AC industry with thousands of satisfied customers.',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Help the environment by recycling and giving your AC a second life.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/assets/generated/hero-ac.dim_1200x600.png"
            alt="Air conditioning units"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/70" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Sell Your Used Air Conditioner for Top Rupees
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              We purchase used air conditioners at competitive prices. Fast, reliable, and environmentally responsible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => navigate({ to: '/submit' })}>
                Get a Quote Now
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ to: '/pricing' })}>
                Learn About Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AC Buy?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make selling your used air conditioner simple, fast, and rewarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to sell your used air conditioner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit Details</h3>
              <p className="text-muted-foreground">
                Fill out our simple form with your AC's brand, model, age, and condition.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Get a Quote</h3>
              <p className="text-muted-foreground">
                Our team reviews your submission and provides a competitive quote within 24 hours.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Paid</h3>
              <p className="text-muted-foreground">
                Accept our offer and we'll arrange pickup and payment. It's that simple!
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => navigate({ to: '/submit' })}>
              Start Your Submission
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Sell Your Air Conditioner?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Get started today and receive a competitive quote for your used AC unit.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate({ to: '/submit' })}
          >
            Get Your Free Quote
          </Button>
        </div>
      </section>
    </div>
  );
}
