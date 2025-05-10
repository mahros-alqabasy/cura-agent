

import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { toast } from "sonner";

export interface Shortcut {
  key: string;
  description: string;
  action: () => void | boolean;
  scope: 'global' | 'sidebar' | 'form' | 'modal';
  roles?: string[];
}

const parseKeyCombination = (combination: string): { key: string; ctrl: boolean; shift: boolean; alt: boolean } => {
  const parts = combination.split('+').map(part => part.trim().toLowerCase());

  return {
    key: parts.filter(part => !['ctrl', 'shift', 'alt'].includes(part))[0],
    ctrl: parts.includes('ctrl'),
    shift: parts.includes('shift'),
    alt: parts.includes('alt')
  };
};

export const useKeyboardShortcuts = (toggleSidebar: () => void) => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
            return true;
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
          toast.info("New appointment shortcut triggered");
          return true;
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
          toast.info("Logout shortcut triggered");
          return true;
        },
        scope: 'global',
      },
      'Escape': {
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
      'Ctrl+Enter': {
        key: 'Ctrl+Enter',
        description: 'Submit current form (global)',
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
      'Ctrl+Shift+H': {
        key: 'Ctrl+Shift+H',
        description: 'Go to landing page',
        action: () => navigate('/'),
        scope: 'global',
      },
      'Ctrl+D': {
        key: 'Ctrl+D',
        description: 'Open Dashboard',
        action: () => navigate('/dashboard'),
        scope: 'global',
      },
    };
  }, [navigate, toggleSidebar]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (
      ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as Element).tagName) &&
      !((e.target as HTMLInputElement).readOnly)
    ) {
      return;
    }
    const shortcuts = getShortcuts();

    for (const shortcut of Object.values(shortcuts)) {
      const { key, ctrl, shift, alt } = parseKeyCombination(shortcut.key);

      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        e.ctrlKey === ctrl &&
        e.shiftKey === shift &&
        e.altKey === alt
      ) {
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

  const getAllShortcuts = useCallback(() => {
    const shortcuts = getShortcuts();

    return Object.values(shortcuts).filter(shortcut =>
      !shortcut.roles || shortcut.roles.includes(user?.role || '')
    );
  }, [getShortcuts, user]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return { shortcuts: getAllShortcuts() };
};
