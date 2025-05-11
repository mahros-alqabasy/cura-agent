
import { useEffect } from "react";
import { useShortcuts } from "./shortcuts/ShortcutsContext";

/**
 * Global keyboard shortcuts handler component
 * This component registers global keyboard event listeners to handle shortcuts
 */
const GlobalShortcuts = () => {
    // Use the shortcuts context
    const { handleKeyDown } = useShortcuts();
    
    useEffect(() => {
        // Setup global keyboard event handler
        const keyboardHandler = (e: KeyboardEvent) => {
            handleKeyDown(e);
        };
        
        window.addEventListener("keydown", keyboardHandler);
        
        // Clean up event listeners on unmount
        return () => {
            window.removeEventListener("keydown", keyboardHandler);
        };
    }, [handleKeyDown]);
    
    // This component doesn't render anything
    return null;
}

export default GlobalShortcuts;
