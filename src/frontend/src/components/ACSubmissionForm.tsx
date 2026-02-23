import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useACSubmission } from '@/hooks/useACSubmission';
import { Loader2 } from 'lucide-react';

export default function ACSubmissionForm() {
  const navigate = useNavigate();
  const { submitAC, isSubmitting, error } = useACSubmission();

  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    age: '',
    condition: '',
    customerName: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.model.trim()) newErrors.model = 'Model is required';
    if (!formData.age || parseInt(formData.age) < 0) {
      newErrors.age = 'Please enter a valid age';
    }
    if (!formData.condition.trim()) newErrors.condition = 'Condition description is required';
    if (!formData.customerName.trim()) newErrors.customerName = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const success = await submitAC({
      brand: formData.brand,
      model: formData.model,
      age: BigInt(parseInt(formData.age)),
      condition: { description: formData.condition },
      customerName: formData.customerName,
      phone: formData.phone,
      email: formData.email,
    });

    if (success) {
      navigate({ to: '/success' });
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
          />
          {errors.brand && <p className="text-sm text-destructive">{errors.brand}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">Model *</Label>
          <Input
            id="model"
            placeholder="e.g., LSN120HSV5"
            value={formData.model}
            onChange={(e) => handleChange('model', e.target.value)}
            className={errors.model ? 'border-destructive' : ''}
          />
          {errors.model && <p className="text-sm text-destructive">{errors.model}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age (in years) *</Label>
        <Input
          id="age"
          type="number"
          min="0"
          placeholder="e.g., 3"
          value={formData.age}
          onChange={(e) => handleChange('age', e.target.value)}
          className={errors.age ? 'border-destructive' : ''}
        />
        {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="condition">Condition Description *</Label>
        <Textarea
          id="condition"
          placeholder="Please describe the condition of your AC unit (e.g., working perfectly, minor issues, needs repair, etc.)"
          rows={4}
          value={formData.condition}
          onChange={(e) => handleChange('condition', e.target.value)}
          className={errors.condition ? 'border-destructive' : ''}
        />
        {errors.condition && <p className="text-sm text-destructive">{errors.condition}</p>}
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
            />
            {errors.customerName && (
              <p className="text-sm text-destructive">{errors.customerName}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={errors.phone ? 'border-destructive' : ''}
              />
              {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
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
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
          <p className="text-sm text-destructive">{error}</p>
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
