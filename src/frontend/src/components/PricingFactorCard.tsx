import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface PricingFactorCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconSrc?: string;
}

export default function PricingFactorCard({
  icon: Icon,
  title,
  description,
  iconSrc,
}: PricingFactorCardProps) {
  return (
    <Card className="hover:border-primary transition-colors">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
          {iconSrc ? (
            <img src={iconSrc} alt={title} className="w-8 h-8" />
          ) : (
            <Icon className="h-6 w-6 text-primary" />
          )}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
