
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Button } from '@/shared/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui/select';

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  userType: 'doctor' | 'patient' | 'nurse' | 'receptionist';
  defaultValues?: any;
}

const UserForm = ({ open, onOpenChange, onSubmit, userType, defaultValues }: UserFormProps) => {
  const isEditing = !!defaultValues;

  // Define form schema based on user type
  const getUserSchema = () => {
    const baseSchema = {
      firstName: z.string().min(2, 'First name is required'),
      lastName: z.string().min(2, 'Last name is required'),
      email: z.string().email('Invalid email address'),
      mobile: z.string().min(10, 'Phone number must be at least 10 digits'),
      nationalId: z.string().min(10, 'National ID must be at least 10 digits'),
    };

    if (userType === 'doctor') {
      return z.object({
        ...baseSchema,
        specialty: z.string().min(1, 'Specialty is required'),
      });
    }

    return z.object(baseSchema);
  };

  const schema = getUserSchema();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      nationalId: '',
      specialty: userType === 'doctor' ? '' : undefined,
    },
  });

  // Reset form when defaultValues change
  useEffect(() => {
    if (open) {
      if (defaultValues) {
        form.reset(defaultValues);
      } else {
        form.reset({
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          nationalId: '',
          specialty: userType === 'doctor' ? '' : undefined,
        });
      }
    }
  }, [defaultValues, open, form, userType]);

  const handleFormSubmit = (data: any) => {
    onSubmit({ ...data, role: userType });
  };

  // List of medical specialties for doctors
  const specialties = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology", 
    "Obstetrics",
    "Oncology",
    "Ophthalmology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
    "Urology"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? `Edit ${userType}` : `Add New ${userType}`}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                {...form.register('firstName')}
                placeholder="First name" 
              />
              {form.formState.errors.firstName && (
                <p className="text-red-500 text-xs">{form.formState.errors.firstName.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                {...form.register('lastName')} 
                placeholder="Last name" 
              />
              {form.formState.errors.lastName && (
                <p className="text-red-500 text-xs">{form.formState.errors.lastName.message as string}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              {...form.register('email')} 
              placeholder="Email address" 
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs">{form.formState.errors.email.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile">Phone Number</Label>
            <Input 
              id="mobile" 
              {...form.register('mobile')} 
              placeholder="Phone number" 
            />
            {form.formState.errors.mobile && (
              <p className="text-red-500 text-xs">{form.formState.errors.mobile.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nationalId">National ID</Label>
            <Input 
              id="nationalId" 
              {...form.register('nationalId')} 
              placeholder="National ID" 
            />
            {form.formState.errors.nationalId && (
              <p className="text-red-500 text-xs">{form.formState.errors.nationalId.message as string}</p>
            )}
          </div>

          {userType === 'doctor' && (
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Select 
                onValueChange={(value) => form.setValue('specialty', value)}
                defaultValue={defaultValues?.specialty || ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a specialty" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.specialty && (
                <p className="text-red-500 text-xs">{form.formState.errors.specialty.message as string}</p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Update' : 'Add'} {userType}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
