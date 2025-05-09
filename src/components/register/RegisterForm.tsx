
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import PersonalInfoFields from './PersonalInfoFields';
import PasswordFields from './PasswordFields';
import TermsAgreement from './TermsAgreement';
import { validateRegisterForm } from '@/utils/formValidation';

interface RegisterFormProps {
  onSubmit: (formData: RegisterFormData) => void;
  error: string | null;
  loading: boolean;
}

export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nid: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  gender: string;
  agreeToTerms: boolean;
}

const RegisterForm = ({ onSubmit, error, loading }: RegisterFormProps) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    nid: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    gender: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeToTerms: checked }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    const validationResult = validateRegisterForm(formData);
    if (validationResult) {
      setValidationError(validationResult);
      return;
    }

    setValidationError(null);
    onSubmit(formData);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Fill out the form below to create your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {(error || validationError) && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error || validationError}</AlertDescription>
            </Alert>
          )}

          <PersonalInfoFields
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />

          <PasswordFields
            formData={formData}
            handleChange={handleChange}
            showPassword={showPassword}
            showConfirmPassword={showConfirmPassword}
            setShowPassword={setShowPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />

          <TermsAgreement
            checked={formData.agreeToTerms}
            onCheckedChange={handleCheckboxChange}
          />
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary-600"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <div className="text-center">
            <span className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in here
              </Link>
            </span>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterForm;
