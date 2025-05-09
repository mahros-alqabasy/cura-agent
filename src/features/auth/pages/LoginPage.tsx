
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/shared/contexts/AuthContext';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Alert, AlertDescription } from '@/shared/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Checkbox } from '@/shared/ui/checkbox';
import { EyeIcon, EyeOffIcon, InfoIcon } from 'lucide-react';
import AppIcon from '@/shared/components/AppIcon';
import isDevelopment from '@/shared/config/Conf';

type LoginMethod = 'email' | 'nationalId' | 'phone';

const Login = () => {
  const { login } = useAuth();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [method, setMethod] = useState<LoginMethod>('email');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const isDev = isDevelopment;

  // Prefill credentials in development mode
  useEffect(() => {
    if (isDev && method) {
      switch (method) {
        case 'email':
          setCredential('doctor@example.com');
          break;
        case 'nationalId':
          setCredential('29001010123456');
          break;
        case 'phone':
          setCredential('01000000000');
          break;
        default:
          setCredential('');
      }
      setPassword('password123');
    }
  }, [method, isDev]);

  const validateCredential = (): boolean => {
    if (!credential) {
      setError(`${getMethodLabel(method)} is required`);
      return false;
    }

    // Basic validation for each method
    switch (method) {
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credential)) {
          setError('Please enter a valid email address');
          return false;
        }
        break;
      case 'nationalId':
        if (!/^\d{14}$/.test(credential)) {
          setError('National ID must be 14 digits');
          return false;
        }
        break;
      case 'phone':
        if (!/^01\d{9}$/.test(credential)) {
          setError('Please enter a valid Egyptian phone number (e.g., 01xxxxxxxxx)');
          return false;
        }
        break;
    }

    return true;
  };

  const getMethodLabel = (method: LoginMethod): string => {
    switch (method) {
      case 'email':
        return 'Email Address';
      case 'nationalId':
        return 'National ID';
      case 'phone':
        return 'Phone Number';
      default:
        return 'Credential';
    }
  };

  const getMethodPlaceholder = (method: LoginMethod): string => {
    switch (method) {
      case 'email':
        return 'Enter your email address';
      case 'nationalId':
        return 'Enter your 14-digit national ID';
      case 'phone':
        return 'Enter your phone number (e.g., 01xxxxxxxxx)';
      default:
        return 'Enter your credential';
    }
  };

  const getInputType = (method: LoginMethod): string => {
    switch (method) {
      case 'email':
        return 'email';
      case 'nationalId':
      case 'phone':
        return 'tel';
      default:
        return 'text';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError('Password is required');
      return;
    }

    if (!validateCredential()) {
      return;
    }

    try {
      setLoading(true);
      // Send both the method and credential to the authentication service
      await login(credential, password, method);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <div className="cura-logo text-white text-2xl font-bold w-12 h-12 flex items-center justify-center">
            <AppIcon />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome to Cura Agent</h1>
          <p className="text-gray-500 mt-2">Sign in to access your dashboard</p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isDev && (
                <Alert className="bg-blue-50 border-blue-200 mb-4">
                  <InfoIcon className="h-4 w-4 text-blue-500 mr-2" />
                  <AlertDescription className="text-blue-800">
                    Development mode: Sample credentials will be provided
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="method">Login Method</Label>
                <Select 
                  value={method} 
                  onValueChange={(value) => {
                    setMethod(value as LoginMethod);
                    setCredential(''); // Clear credential when changing method
                  }}
                  required
                >
                  <SelectTrigger id="method" className="w-full">
                    <SelectValue placeholder="Select login method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email Address</SelectItem>
                    <SelectItem value="nationalId">National ID</SelectItem>
                    <SelectItem value="phone">Phone Number</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="credential">{getMethodLabel(method)}</Label>
                <Input
                  id="credential"
                  type={getInputType(method)}
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  placeholder={getMethodPlaceholder(method)}
                  required
                  autoComplete={method === 'email' ? 'email' : 'off'}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-500" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Keep me signed in
                </label>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-600"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-center">
                <span className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary hover:underline">
                    Register here
                  </Link>
                </span>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center">
          <Button
            variant="link"
            className="text-sm"
            onClick={() => window.location.href = '/'}
          >
            Need help signing in?
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
