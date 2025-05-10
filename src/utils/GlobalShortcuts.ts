
import { useEffect } from "react";

interface KeyboardEvent {
  ctrlKey: boolean;
  key: string;
  preventDefault: () => void;
}

interface HTMLFormElement extends HTMLElement {
  requestSubmit?: () => void;
  submit: () => void;
}

const GlobalShortcuts = () => {
    useEffect(() => {
        function handler(e: KeyboardEvent) {
            if (e.ctrlKey && e.key === "Enter") {
                const active = document.activeElement as HTMLElement | null;
                const form = active && active.closest && active.closest("form") as HTMLFormElement | null;
                if (form) {
                    e.preventDefault();
                    form.requestSubmit ? form.requestSubmit() : form.submit();
                }
            }
        }
        window.addEventListener("keydown", handler as any);
        return () => window.removeEventListener("keydown", handler as any);
    }, []);
    return null;
}

export default GlobalShortcuts;
