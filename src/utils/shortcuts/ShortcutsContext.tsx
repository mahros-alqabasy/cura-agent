
import React, { createContext, useContext, useState, useCallback } from 'react';
import { ShortcutScope } from './types';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';

// Define the context type
interface ShortcutsContextType {
  // Core shortcut functionality
  handleKeyDown: (e: KeyboardEvent, activeScope?: ShortcutScope) => void;
  getShortcutsByScope: (scope?: ShortcutScope) => any[];
  
  // UI state control functions
  toggleSidebar: () => void;
  sidebarExpanded: boolean;
}

// Create the context with a default value
const ShortcutsContext = createContext<ShortcutsContextType | undefined>(undefined);

/**
 * ShortcutsProvider component that provides shortcut functionality throughout the app
 */
export const ShortcutsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State for UI elements controlled by shortcuts - set to true by default to ensure sidebar is expanded on app load
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  
  // Toggle sidebar function that will be available throughout the app
  const toggleSidebar = useCallback(() => {
    setSidebarExpanded(prev => !prev);
  }, []);
  
  // Initialize keyboard shortcuts with sidebar toggle
  const { handleKeyDown, getShortcutsByScope } = useKeyboardShortcuts(toggleSidebar);
  
  // Create the context value
  const contextValue = {
    handleKeyDown,
    getShortcutsByScope,
    toggleSidebar,
    sidebarExpanded
  };
  
  return (
    <ShortcutsContext.Provider value={contextValue}>
      {children}
    </ShortcutsContext.Provider>
  );
};

/**
 * Custom hook to use shortcuts context
 */
export const useShortcuts = (): ShortcutsContextType => {
  const context = useContext(ShortcutsContext);
  
  if (context === undefined) {
    throw new Error('useShortcuts must be used within a ShortcutsProvider');
  }
  
  return context;
};
