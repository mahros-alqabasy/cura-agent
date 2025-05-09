
import MainLayout from "../../shared/components/layouts/MainLayout";
import ProtectedRoute from "../../shared/components/ProtectedRoute";

import { Navigate, Route, Routes } from "react-router-dom";

// Import pages from existing locations instead of new feature structure
import AIAssistant from "../../pages/AIAssistant";
import ChatBot from "../../pages/ChatBot";
import Dashboard from "../../pages/Dashboard";
import Index from "../../pages/Index";
import Landing from "../../pages/Landing";
import Login from "../../pages/Login";
import NotFound from "../../pages/NotFound";
import Register from "../../pages/Register";
import Authors from "../../pages/Authors";
import Appointments from "../../pages/Appointments";
import MedicalRecords from "../../pages/MedicalRecords";
import LabResults from "../../pages/LabResults";
import Prescriptions from "../../pages/Prescriptions";
import Settings from "../../pages/Settings";
import Help from "../../pages/Help";
import KeyboardShortcuts from "../../pages/KeyboardShortcuts";
import Profile from "../../pages/Profile";
import Doctors from "../../pages/users/Doctors";
import Patients from "../../pages/users/Patients";
import Nurses from "../../pages/users/Nurses";
import Receptionists from "../../pages/users/Receptionists";
import Logs from "../../pages/Logs";
import Messages from "../../pages/Messages";
import Departments from "../../pages/Departments";

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

      {/* User management routes */}
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/nurses" element={<Nurses />} />
      <Route path="/receptionists" element={<Receptionists />} />

      {/* Department management (admin only) */}
      <Route path="/departments" element={<Departments />} />

      {/* System logs */}
      <Route path="/logs" element={<Logs />} />

      {/* Main feature routes */}
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/medical-records" element={<MedicalRecords />} />
      <Route path="/lab-results" element={<LabResults />} />
      <Route path="/prescriptions" element={<Prescriptions />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<Help />} />
      <Route path="/help/keyboard-shortcuts" element={<KeyboardShortcuts />} /> 
      <Route path="/profile" element={<Profile />} />
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
