
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShortcutScope, Shortcut } from './types';
import { 
  getNavigationShortcuts,
  getSidebarShortcuts,
  getFormShortcuts,
  getModalShortcuts,
  getUIShortcuts
} from './shortcutDefinitions';

interface ShortcutsContextType {
  sidebarExpanded: boolean;
  toggleSidebar: () => void;
  handleKeyDown: (e: KeyboardEvent, activeScope?: ShortcutScope) => void;
  shortcuts: Shortcut[];
  getShortcutsByScope: (scope?: ShortcutScope) => Shortcut[];
}

const ShortcutsContext = createContext<ShortcutsContextType | undefined>(undefined);

export const ShortcutsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  /**
   * Toggle sidebar expanded state
   */
  const toggleSidebar = useCallback(() => {
    setSidebarExpanded(prev => !prev);
  }, []);

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
   * Gets all shortcuts filtered by user role and scope
   * 
   * @param scope Optional scope to filter shortcuts by
   * @returns Filtered array of shortcuts
   */
  const getShortcutsByScope = useCallback((scope?: ShortcutScope): Shortcut[] => {
    const shortcuts = getShortcuts();
    const userRole = user?.role?.toLowerCase() || '';
    
    return shortcuts.filter(shortcut => 
      // Filter by role if roles are specified
      (!shortcut.roles || shortcut.roles.includes(userRole)) &&
      // Filter by scope if specified
      (!scope || shortcut.scope === scope || shortcut.scope === 'global')
    );
  }, [getShortcuts, user]);

  /**
   * Handle keyboard events and trigger appropriate shortcut actions
   */
  const handleKeyDown = useCallback((e: KeyboardEvent, activeScope?: ShortcutScope) => {
    if (!user) return; // Don't process shortcuts if user is not authenticated
    
    // Get shortcuts that match the user's role
    const availableShortcuts = getShortcutsByScope(activeScope);
    
    for (const shortcut of availableShortcuts) {
      // Parse the key combination
      const keyParts = shortcut.key.split('+').map(part => part.trim().toLowerCase());
      const key = keyParts.filter(part => !['ctrl', 'alt', 'shift'].includes(part))[0];
      const needsCtrl = keyParts.includes('ctrl');
      const needsShift = keyParts.includes('shift');
      const needsAlt = keyParts.includes('alt');
      
      // Check if the pressed combination matches the shortcut
      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        e.ctrlKey === needsCtrl &&
        e.shiftKey === needsShift &&
        e.altKey === needsAlt
      ) {
        // Skip if we're in an input field and this is not a form shortcut
        if (
          shortcut.scope !== 'form' &&
          ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as Element)?.tagName) &&
          !((e.target as HTMLInputElement)?.readOnly)
        ) {
          continue;
        }
        
        // Execute the shortcut action
        const result = shortcut.action();
        if (result !== false) {
          e.preventDefault();
        }
        break;
      }
    }
  }, [getShortcutsByScope, user]);

  const value = {
    sidebarExpanded,
    toggleSidebar,
    handleKeyDown,
    shortcuts: getShortcutsByScope(),
    getShortcutsByScope,
  };

  return (
    <ShortcutsContext.Provider value={value}>
      {children}
    </ShortcutsContext.Provider>
  );
};

export const useShortcuts = (): ShortcutsContextType => {
  const context = useContext(ShortcutsContext);
  if (context === undefined) {
    throw new Error('useShortcuts must be used within a ShortcutsProvider');
  }
  return context;
};

export default ShortcutsContext;
