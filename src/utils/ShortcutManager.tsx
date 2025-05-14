import React, { useEffect } from "react";
import { useShortcuts } from "./shortcuts/ShortcutsContext";
import { getSidebarShortcuts, getFormShortcuts } from "./shortcuts/shortcutDefinitions";

/**
 * Centralized Shortcut Manager Component
 * This component consolidates all app-wide shortcuts and manages them centrally.
 */
const ShortcutManager = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { handleKeyDown, registerShortcuts } = useShortcuts();

  useEffect(() => {
    // Register global shortcuts
    const globalShortcuts = [
      ...getSidebarShortcuts(toggleSidebar),
      ...getFormShortcuts(),
    ];

    registerShortcuts(globalShortcuts);

    // Setup global keyboard event handler
    const keyboardHandler = (e: KeyboardEvent) => {
      handleKeyDown(e, "global");
    };

    window.addEventListener("keydown", keyboardHandler);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener("keydown", keyboardHandler);
    };
  }, [handleKeyDown, registerShortcuts, toggleSidebar]);

  // This component doesn't render anything
  return null;
};

export default ShortcutManager;
