
import { useEffect } from "react";
import { useKeyboardShortcuts } from "./shortcuts";

/**
 * Global keyboard shortcuts handler component
 * This component registers global keyboard event listeners to handle shortcuts
 */
const GlobalShortcuts = () => {
    // Pass an empty function as toggleSidebar since this component doesn't actually toggle the sidebar
    // The MainLayout component will handle that
    const { handleKeyDown } = useKeyboardShortcuts(() => {});
    
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
