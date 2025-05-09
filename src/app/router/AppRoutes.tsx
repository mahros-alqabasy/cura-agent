
import MainLayout from "@/shared/components/layouts/MainLayout";
import ProtectedRoute from "@/shared/components/ProtectedRoute";

import AIAssistant from "@/features/aiAssistant/pages/AIAssistantPage";
import ChatBot from "@/features/chat/pages/ChatBotPage";
import Dashboard from "@/features/dashboard/pages/DashboardPage";
import Index from "@/features/core/pages/IndexPage";
import Landing from "@/features/core/pages/LandingPage";
import Login from "@/features/auth/pages/LoginPage";
import NotFound from "@/features/core/pages/NotFoundPage";
import Register from "@/features/auth/pages/RegisterPage";
import Authors from "@/features/core/pages/AuthorsPage";
import Appointments from "@/features/appointments/pages/AppointmentsPage";
import MedicalRecords from "@/features/medicalRecords/pages/MedicalRecordsPage";
import LabResults from "@/features/labResults/pages/LabResultsPage";
import Prescriptions from "@/features/prescriptions/pages/PrescriptionsPage";
import Settings from "@/features/settings/pages/SettingsPage";
import Help from "@/features/help/pages/HelpPage";
import KeyboardShortcuts from "@/features/help/pages/KeyboardShortcutsPage";
import Profile from "@/features/users/pages/ProfilePage";
import Doctors from "@/features/users/pages/DoctorsPage";
import Patients from "@/features/users/pages/PatientsPage";
import Nurses from "@/features/users/pages/NursesPage";
import Receptionists from "@/features/users/pages/ReceptionistsPage";
import Logs from "@/features/logs/pages/LogsPage";
import Messages from "@/features/messages/pages/MessagesPage";
import Departments from "@/features/departments/pages/DepartmentsPage";

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
