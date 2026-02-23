import { useNavigate, useLocation } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Home, Send, User, Phone, Mail, Headphones } from 'lucide-react';

export default function SubmissionSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { customerName?: string; phone?: string; email?: string } | undefined;

  const customerName = state?.customerName;
  const phone = state?.phone;
  const email = state?.email;

  const ownerPhoneNumbers = [
    '889700937',
    '6304843930',
    '+917095510215'
  ];

  return (
    <div className="py-12 md:py-16 min-h-[calc(100vh-4rem)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-3xl">Submission Successful!</CardTitle>
              <CardDescription className="text-base mt-2">
                Thank you for submitting your air conditioner details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {customerName && (
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-5">
                  <h3 className="font-semibold text-lg mb-3">Your Contact Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{customerName}</p>
                      </div>
                    </div>
                    {phone && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{phone}</p>
                        </div>
                      </div>
                    )}
                    {email && (
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium break-all">{email}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-lg">What happens next?</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Our team will review your submission within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>We'll contact you via phone or email with a competitive quote</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>If you accept, we'll arrange a convenient pickup time</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Headphones className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1">Contact Us</h3>
                    <p className="text-sm text-muted-foreground">
                      Need immediate assistance? Reach out to us directly:
                    </p>
                  </div>
                </div>
                <div className="space-y-2 ml-13">
                  {ownerPhoneNumbers.map((phoneNumber) => (
                    <div key={phoneNumber} className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                      <a 
                        href={`tel:${phoneNumber}`}
                        className="text-sm font-medium hover:text-primary transition-colors"
                      >
                        {phoneNumber}
                      </a>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 pt-1">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <a 
                      href="mailto:info@acbuy.com"
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      info@acbuy.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate({ to: '/' })}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => navigate({ to: '/submit' })}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit Another AC
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
