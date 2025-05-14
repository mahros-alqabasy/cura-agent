// src/pages/screen-guides/dashboard.tsx
import React from "react";


import screenshot from "@/assets/screenshots/dashboard.png";
const DashboardScreenGuide = () => {
  return (
    <div className="prose max-w-none">
      <h1>Dashboard</h1>
      <p>The dashboard provides an overview of hospital activity, recent interactions, and quick access to modules.</p>

      <h2>Screenshot</h2>
      <img src={screenshot} alt="Dashboard screen" className="rounded-xl shadow" />

      <h2>Key Elements</h2>
      <ul>
        <li>Real-time summary cards</li>
        <li>Patient admission graph</li>
        <li>Quick actions (e.g., admit patient, schedule visit)</li>
      </ul>

      <h2>Notes</h2>
      <p>This screen is role-sensitive; admin and doctors see different widgets based on permissions.</p>
    </div>
  );
};

export default DashboardScreenGuide;
