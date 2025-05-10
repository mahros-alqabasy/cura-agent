import { useEffect } from "react";

const GlobalShortcuts = () => {
    useEffect(() => {
        function handler(e) {
            if (e.ctrlKey && e.key === "Enter") {
                const active = document.activeElement;
                const form = active && active.closest && active.closest("form");
                if (form) {
                    e.preventDefault();
                    form.requestSubmit ? form.requestSubmit() : form.submit();
                }
            }
        }
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);
    return null;
}

export default GlobalShortcuts;
