import React, { lazy, Suspense } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import LoadingFallback from "@/components/ui/LoadingFallback";
import UIWalkthroughsIndex from "@/pages/docs/pages/ui-walkthroughs/UIWalkthroughsIndex";

import Admin from "@/pages/docs/user-roles/Admin";
import Overview from "@/pages/docs/user-roles/Overview";
// Lazy load route components
const Landing = lazy(() => import("@/pages/Landing"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const ChatBot = lazy(() => import("@/pages/ChatBot"));
const FeaturesBacklog = lazy(() => import("@/pages/FeaturesBacklog"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const AIAssistant = lazy(() => import("@/pages/AIAssistant"));
const Doctors = lazy(() => import("@/features/users/pages/Doctors"));
const Patients = lazy(() => import("@/features/users/pages/Patients"));
const Nurses = lazy(() => import("@/features/users/pages/Nurses"));
const Receptionists = lazy(() => import("@/features/users/pages/Receptionists"));
const Logs = lazy(() => import("@/pages/Logs"));
const Messages = lazy(() => import("@/pages/Messages"));
const Departments = lazy(() => import("@/pages/Departments"));
const Appointments = lazy(() => import("@/pages/Appointments"));
const MedicalRecords = lazy(() => import("@/pages/MedicalRecords"));
const LabResults = lazy(() => import("@/pages/LabResults"));
const Prescriptions = lazy(() => import("@/pages/Prescriptions"));
const Settings = lazy(() => import("@/pages/Settings"));
const Help = lazy(() => import("@/pages/Help"));
const KeyboardShortcuts = lazy(() => import("@/pages/KeyboardShortcuts"));
const Profile = lazy(() => import("@/pages/Profile"));
const Authors = lazy(() => import("@/pages/Authors"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Index = lazy(() => import("@/pages/Index"));

// Docs Pages
const DocsLayout = lazy(() => import("@/pages/docs/index"));
const DocsLandingPage = lazy(() => import("@/pages/docs/pages/DocsLandingPage"));
const GettingStartedIntro = lazy(() => import("@/pages/docs/pages/GettingStarted"));
const ApiAuthPage = lazy(() => import("@/pages/docs/pages/ApiAuthPage"));
const ComponentButtonPage = lazy(() => import("@/pages/docs/pages/ComponentButtonPage"));
const PatientManagement = lazy(() => import("@/pages/docs/pages/PatientManagement"));
const AIAssistantDocs = lazy(() => import("@/pages/docs/pages/AIAssistant"));





// Main App Routes


const LoginGuide = lazy(() => import("@/pages/docs/pages/ui-walkthroughs/LoginGuide"));
const DashboardGuide = lazy(() => import("@/pages/docs/pages/ui-walkthroughs/DashboardScreenGuide"));
const PatientIntakeGuide = lazy(() => import("@/pages/docs/pages/ui-walkthroughs/PatientIntakeGuide"));
const ChatRoomGuide = lazy(() => import("@/pages/docs/pages/ui-walkthroughs/ChatRoomGuide"));
const MedicalRecordGuide = lazy(() => import("@/pages/docs/pages/ui-walkthroughs/MedicalRecordGuide"));
const LLMGuide = lazy(() => import("@/pages/docs/pages/ui-walkthroughs/LLMGuide"));
const SettingsGuide = lazy(() => import("@/pages/docs/pages/ui-walkthroughs/SettingsGuide"));


function AppRoutes() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat-bot" element={<ChatBot />} />
        <Route path="/features-backlog" element={<FeaturesBacklog />} />
        <Route path="/index" element={<Index />} />

        {/* Documentation Routes */}
        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<DocsLandingPage />} />
          <Route path="getting-started/introduction" element={<GettingStartedIntro />} />
          <Route path="api/authentication" element={<ApiAuthPage />} />
          <Route path="components/buttons" element={<ComponentButtonPage />} />
          <Route path="guides/patient-management" element={<PatientManagement />} />
          <Route path="ai-features/ai-assistant" element={<AIAssistantDocs />} />



          {/* /guides */}
          <Route path="guides/ui-walkthroughs" element={<UIWalkthroughsIndex />} />

          <Route path="guides/ui-walkthroughs/login" element={<LoginGuide />} />
          <Route path="guides/ui-walkthroughs/dashboard" element={<DashboardGuide />} />
          <Route path="guides/ui-walkthroughs/patient-intake" element={<PatientIntakeGuide />} />
          <Route path="guides/ui-walkthroughs/chat-room" element={<ChatRoomGuide />} />
          <Route path="guides/ui-walkthroughs/medical-record" element={<MedicalRecordGuide />} />
          <Route path="guides/ui-walkthroughs/llm-assist" element={<LLMGuide />} />
          <Route path="guides/ui-walkthroughs/settings" element={<SettingsGuide />} />



          {/* routes for user roles */}
          {/* <Route path="/docs/user-roles/overview" element={<Overview />} /> */}
          <Route path="/docs/user-roles/admin" element={<Admin />} />
          {/* <Route path="/docs/user-roles/doctor" element={<Doctor />} />
          <Route path="/docs/user-roles/nurse" element={<Nurse />} />
          <Route path="/docs/user-roles/receptionist" element={<Receptionist />} />
          <Route path="/docs/user-roles/lab-tech" element={<LabTech />} />
          <Route path="/docs/user-roles/pharmacist" element={<Pharmacist />} /> */}

        </Route>

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
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/nurses" element={<Nurses />} />
          <Route path="/receptionists" element={<Receptionists />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/logs" element={<Logs />} />
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

        {/* Authors routes */}
        <Route path="/authors" element={<Authors />} />

        {/* Redirect /home to / */}
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
