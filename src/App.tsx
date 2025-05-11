
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/features/auth/AuthContext";
import { ShortcutsProvider } from "@/utils/shortcuts";

import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient();

const App = () => {
  // GitHub Pages basename configuration
  const basename = "/cura-agent/";

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <TooltipProvider>
            <ShortcutsProvider>
              <Toaster />
              <Sonner />
              <AppRoutes />
            </ShortcutsProvider>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
