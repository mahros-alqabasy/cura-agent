
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { toast } from "sonner";

export type ShortcutScope = 'global' | 'navigation' | 'form' | 'modal' | 'sidebar' | 'page';

export interface Shortcut {
  key: string;
  description: string;
  action: () => void | boolean;
  scope: ShortcutScope;
  roles?: string[];
}

// Parse key combination strings like "Ctrl+A" into component parts
const parseKeyCombination = (combination: string): { 
  key: string; 
  ctrl: boolean; 
  shift: boolean; 
  alt: boolean 
} => {
  const parts = combination.split('+').map(part => part.trim().toLowerCase());

  return {
    key: parts.filter(part => !['ctrl', 'shift', 'alt'].includes(part))[0],
    ctrl: parts.includes('ctrl'),
    shift: parts.includes('shift'),
    alt: parts.includes('alt')
  };
};

/**
 * Central keyboard shortcuts registry
 * All application shortcuts should be registered here
 */
export const useKeyboardShortcuts = (toggleSidebar: () => void) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getShortcuts = useCallback((): Shortcut[] => {
    return [
      // Navigation shortcuts
      {
        key: 'Ctrl+1',
        description: 'Open Dashboard',
        action: () => navigate('/dashboard'),
        scope: 'navigation',
      },
      {
        key: 'Ctrl+2',
        description: 'Open Appointments',
        action: () => navigate('/appointments'),
        scope: 'navigation',
      },
      {
        key: 'Ctrl+D',
        description: 'Open Dashboard',
        action: () => navigate('/dashboard'),
        scope: 'global',
      },
      {
        key: 'Ctrl+Shift+H',
        description: 'Go to landing page',
        action: () => navigate('/'),
        scope: 'global',
      },
      {
        key: 'Ctrl+U',
        description: 'Open user profile',
        action: () => {
          navigate('/profile');
          return true;
        },
        scope: 'global',
      },
      
      // Sidebar shortcuts
      {
        key: 'Ctrl+B',
        description: 'Toggle sidebar collapse/expand',
        action: () => toggleSidebar(),
        scope: 'sidebar',
      },
      
      // Search shortcuts
      {
        key: 'Ctrl+F',
        description: 'Focus search bar',
        action: () => {
          const searchInput = document.querySelector('input[placeholder="Search..."]') as HTMLInputElement;
          if (searchInput) {
            searchInput.focus();
            return true;
          }
          return false;
        },
        scope: 'global',
      },
      
      // Form shortcuts
      {
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
      {
        key: 'Ctrl+Enter',
        description: 'Submit current form',
        action: () => {
          const active = document.activeElement as HTMLElement | null;
          const form = active?.closest?.('form');
          if (form) {
            if (typeof (form as HTMLFormElement).requestSubmit === 'function') {
              (form as HTMLFormElement).requestSubmit();
            } else {
              (form as HTMLFormElement).submit();
            }
            return true;
          }
          return false;
        },
        scope: 'form',
      },
      
      // Modal shortcuts
      {
        key: 'Escape',
        description: 'Close modals/popups',
        action: () => {
          const closeBtn = document.querySelector('[data-dialog-close="true"]') as HTMLButtonElement;
          if (closeBtn) {
            closeBtn.click();
            return true;
          }
          return false;
        },
        scope: 'modal',
      },
      
      // Functionality shortcuts
      {
        key: 'Ctrl+N',
        description: 'Create new appointment',
        action: () => {
          navigate('/appointments');
          toast.info("New appointment shortcut triggered");
          return true;
        },
        scope: 'global',
      },
      {
        key: 'Ctrl+Shift+D',
        description: 'Open Doctor Assistant panel',
        action: () => {
          navigate('/ai-assistant');
          return true;
        },
        scope: 'global',
        roles: ['doctor', 'admin']
      },
      {
        key: 'Ctrl+/',
        description: 'Open Help/Shortcut Guide',
        action: () => {
          navigate('/help/keyboard-shortcuts');
          return true;
        },
        scope: 'global',
      },
      {
        key: 'Ctrl+Alt+L',
        description: 'Log out',
        action: () => {
          toast.info("Logout shortcut triggered");
          return true;
        },
        scope: 'global',
      },
    ];
  }, [navigate, toggleSidebar, user]);

  const handleKeyDown = useCallback((e: KeyboardEvent, activeScope?: ShortcutScope) => {
    // Don't trigger shortcuts when typing in input fields (unless it's a read-only field)
    if (
      ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as Element).tagName) &&
      !((e.target as HTMLInputElement).readOnly)
    ) {
      return;
    }
    
    const shortcuts = getShortcuts();

    for (const shortcut of shortcuts) {
      // Skip shortcuts that don't match the active scope, unless they're global
      if (activeScope && shortcut.scope !== activeScope && shortcut.scope !== 'global') {
        continue;
      }
      
      const { key, ctrl, shift, alt } = parseKeyCombination(shortcut.key);

      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        e.ctrlKey === ctrl &&
        e.shiftKey === shift &&
        e.altKey === alt
      ) {
        // Skip shortcuts that require specific roles the user doesn't have
        if (shortcut.roles && !shortcut.roles.includes(user?.role || '')) {
          continue;
        }

        const result = shortcut.action();
        if (result !== false) {
          e.preventDefault();
        }
        break;
      }
    }
  }, [getShortcuts, user]);

  /**
   * Gets all shortcuts filtered by user role and scope
   * 
   * @param scope Optional scope to filter shortcuts by
   * @returns Filtered array of shortcuts
   */
  const getShortcutsByScope = useCallback((scope?: ShortcutScope): Shortcut[] => {
    const shortcuts = getShortcuts();
    
    return shortcuts.filter(shortcut => 
      (!shortcut.roles || shortcut.roles.includes(user?.role || '')) &&
      (!scope || shortcut.scope === scope || shortcut.scope === 'global')
    );
  }, [getShortcuts, user]);

  return { 
    shortcuts: getShortcutsByScope(),
    getShortcutsByScope,
    handleKeyDown
  };
};
