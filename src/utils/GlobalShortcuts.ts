
import { toast } from "@/components/ui/sonner";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useGlobalShortcuts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle keyboard shortcuts if ctrl/cmd key is pressed
      if (!(event.ctrlKey || event.metaKey)) {
        return;
      }

      // Documentation shortcuts
      if (event.key === "d") {
        event.preventDefault();
        navigate("/docs");
        toast.success("Navigated to documentation");
      }

      // Dashboard shortcut
      if (event.key === "h") {
        event.preventDefault();
        navigate("/dashboard");
        toast.success("Navigated to dashboard");
      }

      // Search docs shortcut - only when already in docs section
      if (event.key === "k" && location.pathname.startsWith("/docs")) {
        event.preventDefault();
        // In a real app, this would trigger the search UI
        toast.info("Documentation search activated");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate, location]);
};

export const documentationShortcuts = [
  { key: "Ctrl + D", description: "Navigate to Documentation" },
  { key: "Ctrl + H", description: "Navigate to Dashboard" },
  { key: "Ctrl + K", description: "Search Documentation (when in docs section)" },
];
