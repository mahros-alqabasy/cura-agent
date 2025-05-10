import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/features/auth/AuthContext";

import AppRoutes from "./routes/AppRoutes";
import GlobalFormShortcut from "./utils/GlobalFormShortcut";
// import Doctors from "@/features/users/pages/Doctors";
// import Patients from "@/features/users/pages/Patients";
// import Nurses from "@/features/users/pages/Nurses";
// import Receptionists from "@/features/users/pages/Receptionists";

const queryClient = new QueryClient();

const App = () => {
  // GitHub Pages basename configuration
  const basename = "/cura-agent/";

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
            <GlobalFormShortcut />
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
