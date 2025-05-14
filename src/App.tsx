import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/features/auth/AuthContext";
import { ShortcutsProvider } from "@/utils/shortcuts";
// import { useToast } from "@/hooks/use-toast";

import AppRoutes from "./routes/AppRoutes";
// import Docs from "./pages/Docs";
import DocsLayout from "./pages/docs/index";

const queryClient = new QueryClient();
import { toast } from "@/components/ui/sonner";
const App = () => {
  // const { toast } = useToast();

  // Example: Trigger a toast notification on component mount
  React.useEffect(() => {

    toast.success(`Welcome back!`);
  }, [toast]);

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
