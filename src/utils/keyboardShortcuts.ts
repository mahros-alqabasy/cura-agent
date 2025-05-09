
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

// Define shortcut interfaces
export interface Shortcut {
  key: string;
  description: string;
  action: () => void | boolean;
  scope: 'global' | 'sidebar' | 'form' | 'modal';
  roles?: string[]; // Optional: Only specific roles can use this shortcut
}

// Helper function to parse key combinations
const parseKeyCombination = (combination: string): { key: string; ctrl: boolean; shift: boolean; alt: boolean } => {
  const parts = combination.split('+').map(part => part.trim().toLowerCase());
  
  return {
    key: parts.filter(part => !['ctrl', 'shift', 'alt'].includes(part))[0],
    ctrl: parts.includes('ctrl'),
    shift: parts.includes('shift'),
    alt: parts.includes('alt')
  };
};

// Create hook for managing keyboard shortcuts
export const useKeyboardShortcuts = (toggleSidebar: () => void) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Define the shortcut configurations
  const getShortcuts = useCallback((): Record<string, Shortcut> => {
    return {
      'Ctrl+B': {
        key: 'Ctrl+B',
        description: 'Toggle sidebar collapse/expand',
        action: () => toggleSidebar(),
        scope: 'global',
      },
      'Ctrl+1': {
        key: 'Ctrl+1',
        description: 'Open Dashboard',
        action: () => navigate('/dashboard'),
        scope: 'sidebar',
      },
      'Ctrl+2': {
        key: 'Ctrl+2',
        description: 'Open Appointments',
        action: () => navigate('/appointments'),
        scope: 'sidebar',
      },
      'Ctrl+F': {
        key: 'Ctrl+F',
        description: 'Focus search bar',
        action: () => {
          const searchInput = document.querySelector('input[placeholder="Search..."]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
            return true; // Prevent default browser search
          }
          return false;
        },
        scope: 'global',
      },
      'Ctrl+N': {
        key: 'Ctrl+N',
        description: 'Create new appointment',
        action: () => {
          navigate('/appointments');
          // This would open the new appointment modal, to be implemented
          toast.info("New appointment shortcut triggered");
          return true; // Prevent browser default
        },
        scope: 'global',
      },
      'Ctrl+Shift+D': {
        key: 'Ctrl+Shift+D',
        description: 'Open Doctor Assistant panel',
        action: () => {
          navigate('/ai-assistant');
          return true;
        },
        scope: 'global',
        roles: ['doctor', 'admin']
      },
      'Ctrl+/': {
        key: 'Ctrl+/',
        description: 'Open Help/Shortcut Guide',
        action: () => {
          navigate('/help/keyboard-shortcuts');
          return true;
        },
        scope: 'global',
      },
      'Alt+S': {
        key: 'Alt+S',
        description: 'Submit current form',
        action: () => {
          const submitBtn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
          if (submitBtn) {
            submitBtn.click();
            return true;
          }
          return false;
        },
        scope: 'form',
      },
      'Ctrl+U': {
        key: 'Ctrl+U',
        description: 'Open user profile',
        action: () => {
          navigate('/profile');
          return true;
        },
        scope: 'global',
      },
      'Ctrl+Alt+L': {
        key: 'Ctrl+Alt+L',
        description: 'Log out',
        action: () => {
          // This would call the logout function
          toast.info("Logout shortcut triggered");
          return true;
        },
        scope: 'global',
      },
      'Escape': {
        key: 'Escape',
        description: 'Close modals/popups',
        action: () => {
          // This would close active modals
          const closeBtn = document.querySelector('[data-dialog-close="true"]') as HTMLButtonElement;
          if (closeBtn) {
            closeBtn.click();
            return true;
          }
          return false;
        },
        scope: 'modal',
      }
    };
  }, [navigate, toggleSidebar]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't process shortcuts when focus is in an input, textarea, or select
    if (
      ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as Element).tagName) &&
      !((e.target as HTMLInputElement).readOnly)
    ) {
      return;
    }
    
    const shortcuts = getShortcuts();
    
    for (const shortcut of Object.values(shortcuts)) {
      const { key, ctrl, shift, alt } = parseKeyCombination(shortcut.key);
      
      // Check if the key combination matches
      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        e.ctrlKey === ctrl &&
        e.shiftKey === shift &&
        e.altKey === alt
      ) {
        // Check role restrictions
        if (shortcut.roles && !shortcut.roles.includes(user?.role || '')) {
          continue;
        }
        
        // Execute action and prevent default if needed
        const result = shortcut.action();
        // Fix for the TS2367 error - check if result is explicitly false
        if (result !== false) {
          e.preventDefault();
        }
        break;
      }
    }
  }, [getShortcuts, user]);

  // Get all shortcuts for the current user's role
  const getAllShortcuts = useCallback(() => {
    const shortcuts = getShortcuts();
    
    return Object.values(shortcuts).filter(shortcut => 
      !shortcut.roles || shortcut.roles.includes(user?.role || '')
    );
  }, [getShortcuts, user]);

  // Initialize keyboard listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return { shortcuts: getAllShortcuts() };
};
