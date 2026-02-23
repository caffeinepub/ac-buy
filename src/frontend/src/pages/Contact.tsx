import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContactInfo from '@/components/ContactInfo';
import { Mail, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We're here to help. Reach out to us through any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Quick Response</CardTitle>
                <CardDescription>
                  We typically respond to all inquiries within 24 hours during business days.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Multiple Channels</CardTitle>
                <CardDescription>
                  Contact us via phone, email, or submit your AC details directly through our form.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <ContactInfo />

          <Card className="mt-8 bg-muted/50">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">How long does the quote process take?</h3>
                <p className="text-muted-foreground">
                  We review all submissions within 24 hours and provide a competitive quote via your preferred contact method.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you offer pickup services?</h3>
                <p className="text-muted-foreground">
                  Yes! Once you accept our offer, we arrange a convenient pickup time at no additional cost.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What brands do you accept?</h3>
                <p className="text-muted-foreground">
                  We purchase all major brands including LG, Samsung, Daikin, Mitsubishi, Carrier, and more.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you buy non-working units?</h3>
                <p className="text-muted-foreground">
                  Yes, we consider all units. While working units receive higher offers, we also purchase non-working units for parts and recycling.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
