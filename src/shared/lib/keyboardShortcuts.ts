
import { useEffect } from 'react';
import { useAuth } from '@/shared/contexts/AuthContext';

/**
 * A hook to set up global keyboard shortcuts
 * @param toggleSidebar Function to toggle sidebar visibility
 */
export const useKeyboardShortcuts = (toggleSidebar: () => void) => {
  const { user } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only apply shortcuts if user is authenticated
      if (!user) {
        return;
      }

      // Toggle sidebar: Alt + S
      if (e.altKey && e.key === 's') {
        toggleSidebar();
        e.preventDefault();
      }

      // Global keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'd':
            // Go to dashboard
            window.location.href = '/dashboard';
            e.preventDefault();
            break;
          case 'h':
            // Go to help page
            window.location.href = '/help/keyboard-shortcuts';
            e.preventDefault();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleSidebar, user]);
};
