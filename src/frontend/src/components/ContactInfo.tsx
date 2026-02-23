import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: Phone,
      title: 'Phone',
      content: '(555) 123-4567',
      description: 'Call us during business hours',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@acbuy.com',
      description: 'We respond within 24 hours',
    },
    {
      icon: MapPin,
      title: 'Address',
      content: '123 AC Street, Cool City, CC 12345',
      description: 'Visit our office',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Monday - Saturday',
      description: '9:00 AM - 6:00 PM',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactDetails.map((detail, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <detail.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{detail.title}</h3>
                <p className="text-foreground mb-1">{detail.content}</p>
                <p className="text-sm text-muted-foreground">{detail.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
