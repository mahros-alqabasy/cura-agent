
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useShortcuts } from '@/utils/shortcuts/ShortcutsContext';

const MainLayout = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  // Use the shortcuts context instead of managing state directly
  const { sidebarExpanded, toggleSidebar, handleKeyDown } = useShortcuts();
  
  const sidebarWidth = sidebarExpanded ? '240px' : '80px';
  const headerHeight = '64px';

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  // Add keyboard event listener specifically for sidebar shortcuts
  useEffect(() => {
    const sidebarKeyHandler = (e: KeyboardEvent) => {
      handleKeyDown(e, 'sidebar');
    };
    
    window.addEventListener('keydown', sidebarKeyHandler);
    
    return () => {
      window.removeEventListener('keydown', sidebarKeyHandler);
    };
  }, [handleKeyDown]);

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
      <div className="sticky top-0 left-0 h-screen z-40 transition-all duration-300 ease-in-out">
        <Sidebar expanded={sidebarExpanded} setExpanded={toggleSidebar} />
      </div>

      {/* Content area: margin-left to make room for the fixed sidebar */}
      <div className="flex flex-col flex-1" style={{ marginLeft: sidebarWidth }}>
        {/* Header: Fixed to the top */}
        <div className="sticky top-0 right-0 z-30" style={{ left: sidebarWidth }}>
          <Header />
        </div>

        {/* Scrollable content: padding-top to offset fixed header */}
        <main className="flex-1 overflow-y-auto p-6" style={{ paddingTop: `calc(${headerHeight} + 1.5rem)` }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
