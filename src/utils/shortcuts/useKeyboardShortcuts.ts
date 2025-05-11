
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { Shortcut, ShortcutScope } from './types';
import { parseKeyCombination, isInputField } from './keyboardUtils';
import {
  getNavigationShortcuts,
  getSidebarShortcuts,
  getFormShortcuts,
  getModalShortcuts,
  getUIShortcuts
} from './shortcutDefinitions';

/**
 * Central keyboard shortcuts hook
 * All application shortcuts should be registered through this hook
 */
export const useKeyboardShortcuts = (toggleSidebar: () => void) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  /**
   * Get all shortcuts combined from various categories
   */
  const getShortcuts = useCallback((): Shortcut[] => {
    return [
      ...getNavigationShortcuts(navigate),
      ...getSidebarShortcuts(toggleSidebar),
      ...getFormShortcuts(),
      ...getModalShortcuts(),
      ...getUIShortcuts(navigate),
    ];
  }, [navigate, toggleSidebar]);

  /**
   * Handle keyboard events and trigger appropriate shortcut actions
   */
  const handleKeyDown = useCallback((e: KeyboardEvent, activeScope?: ShortcutScope) => {
    // Don't trigger shortcuts when typing in input fields (unless it's a read-only field)
    if (isInputField(e.target)) {
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
