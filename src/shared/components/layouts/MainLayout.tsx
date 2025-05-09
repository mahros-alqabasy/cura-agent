
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext';
import Sidebar from '@/shared/components/Sidebar';
import Header from '@/shared/components/Header';
import { useKeyboardShortcuts } from '@/shared/lib/keyboardShortcuts';

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
    <div className="flex h-screen">
      {/* Sidebar: Fixed to the left, full height */}
      <div className="sticky top-0 left-0 h-screen z-40">
        <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      </div>

      {/* Content area: margin-left to make room for the sidebar */}
      <div className={`flex flex-col flex-1 ${sidebarExpanded ? "ml-64" : "ml-16"} transition-all duration-300`}>
        {/* Header: Fixed to the top */}
        <div className={`sticky top-0 right-0 z-30 bg-white`}>
          <Header />
        </div>

        {/* Scrollable content: padding-top to offset fixed header */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>

  );
};

export default MainLayout;
