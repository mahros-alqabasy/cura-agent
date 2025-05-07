
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import AppIcon from '@/components/AppIcon';
const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-8">
      <div className="max-w-md w-full text-center">
        <div className="cura-logo text-white text-2xl font-bold w-16 h-16 flex items-center justify-center mx-auto mb-6">

          <AppIcon/>
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>

        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link to="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
