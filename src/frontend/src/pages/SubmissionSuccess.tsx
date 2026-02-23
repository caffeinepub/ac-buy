import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Home, Send } from 'lucide-react';

export default function SubmissionSuccess() {
  const navigate = useNavigate();

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

              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-center">
                  <strong>Need immediate assistance?</strong>
                  <br />
                  Call us at (555) 123-4567 or email info@acbuy.com
                </p>
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
