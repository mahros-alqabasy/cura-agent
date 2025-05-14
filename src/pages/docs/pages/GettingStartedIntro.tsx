
import React from "react";
import DocContent from "../components/DocContent";

const GettingStartedIntro = () => {
  // Table of contents for this page
  const tableOfContents = [
    { id: "introduction", title: "Introduction", level: 2 },
    { id: "key-features", title: "Key Features", level: 2 },
    { id: "user-roles", title: "User Roles", level: 2 },
    { id: "system-requirements", title: "System Requirements", level: 2 },
    { id: "accessing-cura", title: "Accessing Cura Agent", level: 2 },
    { id: "navigation-basics", title: "Navigation Basics", level: 2 },
  ];

  return (
    <DocContent
      title="Introduction to Cura Agent"
      lastUpdated={new Date("2025-05-10")}
      author="Cura Documentation Team"
      tableOfContents={tableOfContents}
    >
      <h2 id="introduction">Introduction</h2>
      <p>
        Welcome to Cura Agent, an advanced Hospital Information System (HIS) designed to streamline healthcare workflows, enhance patient care, and improve operational efficiency across your healthcare facility.
      </p>
      <p>
        Cura Agent integrates all aspects of hospital operations—from patient registration and appointment scheduling to medical records management, billing, and analytics—into one unified platform. With AI-powered assistance and role-based access, Cura Agent adapts to the needs of every user in your healthcare ecosystem.
      </p>

      <h2 id="key-features">Key Features</h2>
      <ul>
        <li><strong>Intuitive Dashboard</strong> - Customized views for each role with relevant KPIs and quick action buttons</li>
        <li><strong>Comprehensive Patient Management</strong> - Complete patient profiles with medical history, appointments, and billing information</li>
        <li><strong>AI-Powered Clinical Decision Support</strong> - Advanced assistance for diagnostics and treatment planning</li>
        <li><strong>Real-time Collaboration</strong> - Secure messaging and notifications between healthcare providers</li>
        <li><strong>Digital Medical Records</strong> - Paperless documentation with easy search and retrieval</li>
        <li><strong>Laboratory Integration</strong> - Seamless ordering and viewing of lab tests and results</li>
        <li><strong>Pharmacy Management</strong> - Electronic prescription processing and medication inventory</li>
        <li><strong>Intelligent Appointment Scheduling</strong> - Optimized scheduling with conflict detection</li>
        <li><strong>Financial Management</strong> - Comprehensive billing, insurance claims, and revenue tracking</li>
      </ul>

      <h2 id="user-roles">User Roles</h2>
      <p>
        Cura Agent is designed with role-based access control to ensure users can access the features they need while maintaining data security. The main roles include:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6">
        <div className="border rounded-md p-4 bg-card/50">
          <h3 className="text-base font-medium mb-2">Doctors</h3>
          <p className="text-sm">
            Access to patient records, diagnostics, prescriptions, lab results, and AI-assisted decision support.
          </p>
        </div>
        <div className="border rounded-md p-4 bg-card/50">
          <h3 className="text-base font-medium mb-2">Nurses</h3>
          <p className="text-sm">
            Access to patient care records, vital signs tracking, task management, and medication administration.
          </p>
        </div>
        <div className="border rounded-md p-4 bg-card/50">
          <h3 className="text-base font-medium mb-2">Receptionists</h3>
          <p className="text-sm">
            Patient registration, appointment scheduling, visitor management, and general inquiries.
          </p>
        </div>
        <div className="border rounded-md p-4 bg-card/50">
          <h3 className="text-base font-medium mb-2">Administrators</h3>
          <p className="text-sm">
            System configuration, user management, department settings, and access to all operational data.
          </p>
        </div>
        <div className="border rounded-md p-4 bg-card/50">
          <h3 className="text-base font-medium mb-2">Lab Technicians</h3>
          <p className="text-sm">
            Laboratory test processing, result entry, sample management, and quality control.
          </p>
        </div>
        <div className="border rounded-md p-4 bg-card/50">
          <h3 className="text-base font-medium mb-2">Pharmacists</h3>
          <p className="text-sm">
            Medication dispensing, inventory management, prescription verification, and patient counseling.
          </p>
        </div>
      </div>

      <h2 id="system-requirements">System Requirements</h2>
      <p>
        Cura Agent is a web-based application accessible through any modern browser. For optimal performance, we recommend:
      </p>

      <div className="my-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="border p-2 text-left">Component</th>
              <th className="border p-2 text-left">Minimum Requirements</th>
              <th className="border p-2 text-left">Recommended</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Web Browser</td>
              <td className="border p-2">Chrome 90+, Firefox 90+, Safari 14+, Edge 90+</td>
              <td className="border p-2">Latest version of Chrome or Edge</td>
            </tr>
            <tr>
              <td className="border p-2">Internet Connection</td>
              <td className="border p-2">5 Mbps download, 1 Mbps upload</td>
              <td className="border p-2">25+ Mbps download, 5+ Mbps upload</td>
            </tr>
            <tr>
              <td className="border p-2">Display Resolution</td>
              <td className="border p-2">1366 × 768</td>
              <td className="border p-2">1920 × 1080 or higher</td>
            </tr>
            <tr>
              <td className="border p-2">Devices</td>
              <td className="border p-2">Desktop, laptop, tablet</td>
              <td className="border p-2">Desktop or laptop for full functionality</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0 text-blue-400">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Note</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                While Cura Agent is accessible on mobile devices, some advanced features may have limited functionality on smaller screens.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 id="accessing-cura">Accessing Cura Agent</h2>
      <p>
        To access Cura Agent, follow these steps:
      </p>

      <ol className="list-decimal pl-5 space-y-2 mb-4">
        <li>Open your preferred web browser on your computer or device.</li>
        <li>Navigate to your hospital's Cura Agent URL (typically <code>https://[your-hospital].curaagent.com</code>).</li>
        <li>Enter your username and password provided by your system administrator.</li>
        <li>Select your authentication method (Email/Password, National ID, or Phone).</li>
        <li>Click "Sign In" to access your personalized dashboard.</li>
      </ol>

      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0 text-amber-400">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">Security Warning</h3>
            <div className="mt-2 text-sm text-amber-700">
              <p>
                Never share your login credentials with others. Always log out when you finish using Cura Agent, especially on shared computers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 id="navigation-basics">Navigation Basics</h2>
      <p>
        Once logged in, you'll see your role-specific dashboard. Here are the key navigation elements:
      </p>

      <ul className="space-y-3 mb-6">
        <li>
          <strong>Sidebar Menu</strong>: The main navigation menu on the left side of the screen. It contains links to all modules available to your role.
        </li>
        <li>
          <strong>Top Header</strong>: Contains search functionality, notifications, and your user profile menu.
        </li>
        <li>
          <strong>Dashboard Widgets</strong>: Quick-access cards showing summaries and important information relevant to your role.
        </li>
        <li>
          <strong>Action Buttons</strong>: Primary actions are highlighted with blue buttons (e.g., "Add Patient," "New Appointment").
        </li>
        <li>
          <strong>Breadcrumbs</strong>: Located at the top of content areas, these help you track your location in the system and navigate back to previous screens.
        </li>
      </ul>

      <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6">
        <div className="flex">
          <div className="flex-shrink-0 text-green-400">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Tip</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>
                Use keyboard shortcuts to navigate faster. Press <kbd className="px-2 py-1 text-xs font-semibold bg-gray-100 border border-gray-200 rounded">?</kbd> anywhere in Cura Agent to see the available shortcuts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6">
        In the next sections, we'll explore each module in detail and provide step-by-step guides for common workflows in Cura Agent.
      </p>
    </DocContent>
  );
};

export default GettingStartedIntro;
