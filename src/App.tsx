
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/features/auth/AuthContext";

import AppRoutes from "./routes/AppRoutes";
import GlobalShortcuts from "./utils/GlobalShortcuts";
import { ShortcutsProvider } from "./utils/shortcuts/ShortcutsContext";
import { BASENAME } from "./conf/Conf";

const queryClient = new QueryClient();



const App = () => {
  // GitHub Pages basename configuration
  const basename = BASENAME();
  console.log(basename)
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <ShortcutsProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AppRoutes />
              <GlobalShortcuts />
            </TooltipProvider>
          </ShortcutsProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
