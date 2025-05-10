
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useKeyboardShortcuts } from '@/utils/keyboardShortcuts';

const MainLayout = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const sidebarWidth = sidebarExpanded ? '240px' : '80px';
  const headerHeight = '64px';

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  // Toggle sidebar function for shortcut
  const toggleSidebar = () => {
    setSidebarExpanded(prev => !prev);
  };

  // Initialize keyboard shortcuts with sidebar scope
  const { handleKeyDown } = useKeyboardShortcuts(toggleSidebar);

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
        <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      </div>

      {/* Content area: margin-left to make room for the fixed sidebar */}
      <div className="flex flex-col flex-1 ml-[<SIDEBAR_WIDTH>]">
        {/* Header: Fixed to the top */}
        <div className="sticky top-0 left-[<SIDEBAR_WIDTH>] right-0 z-30">
          <Header />
        </div>

        {/* Scrollable content: padding-top to offset fixed header */}
        <main className="flex-1 overflow-y-auto p-6 pt-[<HEADER_HEIGHT>]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
