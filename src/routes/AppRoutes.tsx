
import MainLayout from "@/components/layouts/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import AIAssistant from "@/pages/AIAssistant";
import ChatBot from "@/pages/ChatBot";
import Dashboard from "@/pages/Dashboard";
import Index from "@/pages/Index";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import Authors from "@/pages/Authors";
import { Navigate, Route, Routes } from "react-router-dom";

function AppRoutes() {
  return <Routes>
    {/* Public routes */}
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* any one can access this public chat bot */}
    <Route path="/chat-bot" element={<ChatBot />} />

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

    {/* Index route for redirection logic */}
    <Route path="/index" element={<Index />} />

    {/* Authors routes */}
    <Route path="/authors" element={<Authors />} />

    {/* Redirect /home to / */}
    <Route path="/home" element={<Navigate to="/" replace />} />

    {/* 404 route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
}



export default AppRoutes;