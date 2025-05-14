import React from "react";

const Overview: React.FC = () => {
  return (
    <div>
      <h1>User Roles Overview</h1>
      <p>
        This section provides an overview of the various user roles within the system. Each role has specific permissions and responsibilities.
      </p>
      <ul>
        <li><strong>Admin:</strong> Full access to manage the system.</li>
        <li><strong>Doctor:</strong> Access to patient records and medical tools.</li>
        <li><strong>Nurse:</strong> Support for patient care and record updates.</li>
        <li><strong>Receptionist:</strong> Handles appointments and front-desk operations.</li>
        <li><strong>Lab Technician:</strong> Manages lab tests and results.</li>
        <li><strong>Pharmacist:</strong> Oversees medication and prescriptions.</li>
      </ul>
    </div>
  );
};

export default Overview;