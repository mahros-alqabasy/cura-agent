import React from "react";
import DocContent from "../components/DocContent";
import CodeBlock from "../components/CodeBlock";

const IntroductionPage = () => {
  const tableOfContents = [
    { id: "introduction", title: "Introduction", level: 2 },
    { id: "key-features", title: "Key Features", level: 2 },
    // { id: "system-overview", title: "System Overview", level: 2 },
    // { id: "installation", title: "Installation", level: 2 },
    // { id: "system-requirements", title: "System Requirements", level: 2 },
    // { id: "footnotes", title: "Footnotes", level: 2 },
  ];

  return (
    <DocContent
      title="Introduction to Cura Agent"
      lastUpdated={new Date("2025-05-14")}
      tableOfContents={tableOfContents}
    >
      <p className="text-lg mb-6">
        Cura Agent is an intelligent hospital information system designed to streamline medical workflows, enhance administrative efficiency, and integrate large language model (LLM) capabilities into clinical environments. Whether you're managing patient data, staff interactions, or AI-assisted medical insights, Cura Agent provides a secure and scalable infrastructure for modern healthcare institutions.
      </p>

      <h2 id="key-features" className="text-2xl font-semibold mt-12 mb-4">Key Features</h2>
      <ul className="space-y-2 mt-4 mb-6">
        <li className="flex items-start gap-2">
          <span className="text-primary">✓</span>
          <span>LLM-powered prompt management for real-time medical support</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary">✓</span>
          <span>Modular dashboards for admins, doctors, reception, and labs</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary">✓</span>
          <span>Multi-floor architecture support for complex facility navigation</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary">✓</span>
          <span>Authentication via email, phone number, or national ID</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary">✓</span>
          <span>Integrated chat, file uploads, and session tracking for medical communication</span>
        </li>
      </ul>

      {/* <h2 id="system-overview" className="text-2xl font-semibold mt-12 mb-4">System Overview</h2>
      <p className="mb-6">
        Cura Agent's architecture separates backend logic, RESTful APIs, WebSocket communication, and the React TypeScript frontend. It is designed to be flexible, extensible, and deployable across on-premise or cloud-based infrastructures.
      </p>
      <ul className="list-disc list-inside space-y-2 mb-6">
        <li>Frontend: Vite + React + TailwindCSS, hosted on GitHub Pages</li>
        <li>Backend: Node.js-based with authentication, messaging, and LLM services</li>
        <li>Database: Relational model optimized for hospitals, supporting modular prompt storage</li>
        <li>Deployment: GitHub CI/CD pipelines with Docker support</li>
      </ul>

      <h2 id="installation" className="text-2xl font-semibold mt-12 mb-4">Installation</h2>
      <CodeBlock language="bash" title="Developer Setup (Optional)">
        {`git clone https://github.com/mahros-alqabasy/cura-agent
cd cura-agent
npm install
npm run dev`}
      </CodeBlock>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
        <div className="flex gap-2">
          <span className="text-amber-500 font-bold">⚠</span>
          <div>
            <p className="font-medium">Important Note</p>
            <p className="text-sm">This platform is intended for institutional deployment. Ensure all backend services and databases are correctly provisioned before launching in production.</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
        <div className="flex gap-2">
          <span className="text-blue-500 font-bold">ℹ</span>
          <div>
            <p className="font-medium">Pro Tip</p>
            <p className="text-sm">Use GitHub Actions to automatically deploy your frontend to GitHub Pages upon push to the main branch, conditional on a successful build.</p>
          </div>
        </div>
      </div>

      <h2 id="system-requirements" className="text-2xl font-semibold mt-12 mb-4">System Requirements</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4">Component</th>
              <th className="text-left py-2 px-4">Minimum</th>
              <th className="text-left py-2 px-4">Recommended</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 px-4">Node.js</td>
              <td className="py-2 px-4">v16.0.0</td>
              <td className="py-2 px-4">v18.0.0+</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4">RAM</td>
              <td className="py-2 px-4">4GB</td>
              <td className="py-2 px-4">8GB+</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4">Storage</td>
              <td className="py-2 px-4">20GB</td>
              <td className="py-2 px-4">40GB+</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 px-4">Database</td>
              <td className="py-2 px-4">MySQL 8+</td>
              <td className="py-2 px-4">Managed RDS (AWS/GCP) or PostgreSQL</td>
            </tr>
          </tbody>
        </table>
      </div> */}

      {/* <h2 id="footnotes" className="text-2xl font-semibold mt-12 mb-4">Footnotes</h2>
      <ol className="list-decimal list-inside space-y-2">
        <li>Performance metrics may vary based on deployment region, backend load, and LLM provider latency.</li>
        <li>LLM integrations may require an API key and incur additional costs depending on usage.</li>
        <li>Admin-only features (e.g., prompt analytics, role permissions) are only available to authorized staff with elevated roles.</li>
      </ol> */}
    </DocContent>
  );
};

export default IntroductionPage;
