// src/pages/screen-guides/medical-record.tsx
import React from "react";


import screenshot from "@/assets/screenshots/medical-records.png";

const MedicalRecordGuide = () => {
  return (
    <div className="prose max-w-none">
      <h1>Medical Record</h1>
      <p>Displays structured data for each patient including history, test results, diagnoses, and prescriptions.</p>

      <h2>Screenshot</h2>
      <img src={screenshot} alt="Medical record screen" className="rounded-xl shadow" />

      <h2>Key Elements</h2>
      <ul>
        <li>Tab-based navigation for history, labs, and medications</li>
        <li>Editable notes and attachments</li>
        <li>Doctor sign-off metadata</li>
      </ul>
    </div>
  );
};

export default MedicalRecordGuide;
