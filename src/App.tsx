
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/layouts/MainLayout";

// Public pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Protected pages
import Dashboard from "./pages/Dashboard";
import AIAssistant from "./pages/AIAssistant";

const queryClient = new QueryClient();

const App = () => {
  // GitHub Pages basename configuration
  const basename = "/cura-agent";

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={basename}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected routes using MainLayout */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                {/* Add more protected routes here */}
                <Route path="/appointments" element={<div className="p-6">Appointments Page (Coming Soon)</div>} />
                <Route path="/patients" element={<div className="p-6">Patients Page (Coming Soon)</div>} />
                <Route path="/medical-records" element={<div className="p-6">Medical Records Page (Coming Soon)</div>} />
                <Route path="/lab-results" element={<div className="p-6">Lab Results Page (Coming Soon)</div>} />
                <Route path="/prescriptions" element={<div className="p-6">Prescriptions Page (Coming Soon)</div>} />
                <Route path="/settings" element={<div className="p-6">Settings Page (Coming Soon)</div>} />
                <Route path="/help" element={<div className="p-6">Help Page (Coming Soon)</div>} />
                <Route path="/profile" element={<div className="p-6">Profile Page (Coming Soon)</div>} />
              </Route>
              
              {/* Redirect /home to / */}
              <Route path="/home" element={<Navigate to="/" replace />} />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
