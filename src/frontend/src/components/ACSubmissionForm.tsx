import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useACSubmission } from '@/hooks/useACSubmission';
import { Loader2, AlertCircle } from 'lucide-react';
import { Condition } from '@/backend';

export default function ACSubmissionForm() {
  const navigate = useNavigate();
  const { submitAC, isSubmitting, error } = useACSubmission();

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    age: '',
    condition: '' as Condition | '',
    customerName: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    }
    
    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }
    
    const ageNum = parseInt(formData.age);
    if (!formData.age || isNaN(ageNum) || ageNum < 0) {
      newErrors.age = 'Please enter a valid age (0 or greater)';
    } else if (ageNum > 20) {
      newErrors.age = 'Age seems too high. Please verify (max 20 years)';
    }
    
    if (!formData.condition) {
      newErrors.condition = 'Please select a condition';
    }
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('[ACSubmissionForm] Form submission started', {
      timestamp: new Date().toISOString(),
      formData: { ...formData, age: formData.age }
    });

    if (!validateForm()) {
      console.warn('[ACSubmissionForm] Form validation failed', errors);
      return;
    }

    try {
      const success = await submitAC({
        brand: formData.brand.trim(),
        model: formData.model.trim(),
        age: BigInt(parseInt(formData.age)),
        condition: formData.condition as Condition,
        customerName: formData.customerName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
      });

      if (success) {
        console.log('[ACSubmissionForm] Submission successful, navigating to success page with contact details');
        navigate({ 
          to: '/success',
          state: {
            customerName: formData.customerName.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim(),
          }
        });
      } else {
        console.error('[ACSubmissionForm] Submission failed (returned false)');
      }
    } catch (err) {
      console.error('[ACSubmissionForm] Unexpected error during submission:', err);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="brand">Brand *</Label>
          <Input
            id="brand"
            placeholder="e.g., LG, Samsung, Daikin"
            value={formData.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            className={errors.brand ? 'border-destructive' : ''}
            disabled={isSubmitting}
          />
          {errors.brand && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.brand}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Model *</Label>
          <Input
            id="model"
            placeholder="e.g., LSN120HSV5"
            value={formData.model}
            onChange={(e) => handleChange('model', e.target.value)}
            className={errors.model ? 'border-destructive' : ''}
            disabled={isSubmitting}
          />
          {errors.model && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.model}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="age">Age (in years) *</Label>
          <Input
            id="age"
            type="number"
            min="0"
            max="20"
            placeholder="e.g., 3"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            className={errors.age ? 'border-destructive' : ''}
            disabled={isSubmitting}
          />
          {errors.age && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.age}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="condition">Condition *</Label>
          <Select
            value={formData.condition}
            onValueChange={(value) => handleChange('condition', value)}
            disabled={isSubmitting}
          >
            <SelectTrigger
              id="condition"
              className={errors.condition ? 'border-destructive' : ''}
            >
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Condition.new_}>Brand New</SelectItem>
              <SelectItem value={Condition.excellent}>Excellent</SelectItem>
              <SelectItem value={Condition.good}>Good</SelectItem>
              <SelectItem value={Condition.average}>Average</SelectItem>
              <SelectItem value={Condition.poor}>Poor</SelectItem>
            </SelectContent>
          </Select>
          {errors.condition && (
            <p className="text-sm text-destructive flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {errors.condition}
            </p>
          )}
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="customerName">Full Name *</Label>
            <Input
              id="customerName"
              placeholder="John Doe"
              value={formData.customerName}
              onChange={(e) => handleChange('customerName', e.target.value)}
              className={errors.customerName ? 'border-destructive' : ''}
              disabled={isSubmitting}
            />
            {errors.customerName && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.customerName}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={errors.phone ? 'border-destructive' : ''}
                disabled={isSubmitting}
              />
              {errors.phone && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={errors.email ? 'border-destructive' : ''}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-destructive mb-1">Submission Error</p>
              <p className="text-sm text-destructive/90">{error}</p>
              <p className="text-xs text-destructive/70 mt-2">
                If the problem persists, please contact support or try again later.
              </p>
            </div>
          </div>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit for Quote'
        )}
      </Button>
    </form>
  );
}
