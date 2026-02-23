import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import ACSubmissionForm from '@/components/ACSubmissionForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function SubmitAC() {
  return (
    <div className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Submit Your Air Conditioner Details
            </h1>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and we'll get back to you with a competitive quote within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-base">Quick Response</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Get a quote within 24 hours</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-base">No Obligation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Free quote with no commitment</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-base">Secure Process</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Your information is safe with us</CardDescription>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AC Information</CardTitle>
              <CardDescription>
                Please provide accurate details about your air conditioner for the best quote.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ACSubmissionForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
