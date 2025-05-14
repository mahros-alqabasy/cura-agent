// src/pages/screen-guides/patient-intake.tsx
import React from "react";



import screenshot from "@/assets/screenshots/patient-dashboard.png";


const PatientIntakeGuide = () => {
  return (
    <div className="prose max-w-none">
      <h1>Patient Intake</h1>
      <p>This form is used to register new patients or update information for returning ones.</p>

      <h2>Screenshot</h2>
      <img src={screenshot} alt="Patient intake screen" className="rounded-xl shadow" />

      <h2>Key Elements</h2>
      <ul>
        <li>National ID and contact fields</li>
        <li>Dropdowns for gender, blood type, and insurance</li>
        <li>Toggle for walk-in vs appointment-based intake</li>
      </ul>
    </div>
  );
};

export default PatientIntakeGuide;
