
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useKeyboardShortcuts } from '@/utils/keyboardShortcuts';

const MainLayout = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  // Toggle sidebar function for shortcut
  const toggleSidebar = () => {
    setSidebarExpanded(prev => !prev);
  };

  // Initialize keyboard shortcuts
  useKeyboardShortcuts(toggleSidebar);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-primary/20"></div>
          <div className="mt-4 h-4 w-24 bg-primary/20 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
