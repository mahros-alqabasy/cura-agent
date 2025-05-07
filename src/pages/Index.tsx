
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-primary/20"></div>
        <div className="mt-4 h-4 w-24 bg-primary/20 rounded"></div>
      </div>
    </div>
  );
};

export default Index;
