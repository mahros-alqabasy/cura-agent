import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary';
import mockApi from "./lib/mockApi";

// Example usage of mockApi
mockApi.get("prescriptions").then((data) => {
  console.log("Prescriptions:", data);
});

mockApi.get("appointments").then((data) => {
  console.log("Appointments:", data);
});

// Wrap the application with ErrorBoundary
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
