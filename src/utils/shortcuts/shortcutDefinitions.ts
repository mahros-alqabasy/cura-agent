import { Shortcut, ShortcutScope } from './types';
import { NavigateFunction } from 'react-router-dom';
import { toast } from "sonner";

/**
 * Get navigation shortcuts
 */
export const getNavigationShortcuts = (navigate: NavigateFunction): Shortcut[] => {
  return [
    {
      key: 'Ctrl+1',
      description: 'Open Dashboard',
      action: () => {
        navigate('/dashboard');
        return true;
      },
      scope: 'navigation',
    },
    {
      key: 'Ctrl+2',
      description: 'Open Appointments',
      action: () => {
        navigate('/appointments');
        return true;
      },
      scope: 'navigation',
    },
    {
      key: 'Ctrl+D',
      description: 'Open Dashboard',
      action: () => {
        navigate('/dashboard');
        return true;
      },
      scope: 'global',
    },
    {
      key: 'Ctrl+Shift+H',
      description: 'Go to landing page',
      action: () => {
        navigate('/');
        return true;
      },
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
  ];
};

/**
 * Get sidebar shortcuts
 */
export const getSidebarShortcuts = (toggleSidebar: () => void): Shortcut[] => {
  return [
    {
      key: 'Ctrl+B',
      description: 'Toggle sidebar collapse/expand',
      action: () => {
        setTimeout(() => toggleSidebar(), 50); // Add a slight delay to prevent rapid toggling
        return true;
      },
      scope: 'global',
    },
  ];
};

/**
 * Get form shortcuts
 */
export const getFormShortcuts = (): Shortcut[] => {
  return [
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
  ];
};

/**
 * Get modal shortcuts
 */
export const getModalShortcuts = (): Shortcut[] => {
  return [
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
  ];
};

/**
 * Get UI/UX shortcuts
 */
export const getUIShortcuts = (navigate: NavigateFunction): Shortcut[] => {
  return [
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
      key: 'Ctrl+Alt+L',
      description: 'Log out',
      action: () => {
        toast.info("Logout shortcut triggered");
        // Actual logout will be handled by the auth context consumer
        const logoutBtn = document.querySelector('button[data-logout="true"]') as HTMLButtonElement;
        if (logoutBtn) {
          logoutBtn.click();
          return true;
        }
        return true;
      },
      scope: 'global',
    },
  ];
};
