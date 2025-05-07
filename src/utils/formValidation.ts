
export const validateRegisterForm = (formData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}) => {
  if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
    return 'Please fill in all required fields';
  }

  if (formData.password !== formData.confirmPassword) {
    return 'Passwords do not match';
  }

  if (!formData.agreeToTerms) {
    return 'You must agree to the Terms of Service and Privacy Policy';
  }

  return null; // No errors
};
