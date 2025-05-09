
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext';
import AppIcon from '@/shared/components/AppIcon';
import RegisterForm, { RegisterFormData } from '@/features/auth/components/RegisterForm';
import SecurityNotice from '@/features/auth/components/SecurityNotice';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (formData: RegisterFormData) => {
    try {
      setLoading(true);
      setError(null);
      await register({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: formData.phoneNumber,
        password: formData.password,
        date_of_birth: formData.dateOfBirth,
        gender: formData.gender,
      });
      navigate('/login');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div className="flex justify-center">
          <div className="cura-logo text-white text-2xl font-bold w-12 h-12 flex items-center justify-center">
            <AppIcon />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-gray-500 mt-2">Join Cura Agent for better healthcare management</p>
        </div>

        <RegisterForm 
          onSubmit={handleRegister} 
          error={error} 
          loading={loading} 
        />

        <div className="text-center">
          <SecurityNotice />
        </div>
      </div>
    </div>
  );
};

export default Register;
