import { Link } from "react-router-dom";

export default function UIWalkthroughsIndex() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">UI Walkthroughs</h1>
      <p className="text-gray-700 mb-6">
        Explore the guided documentation for each core screen in the Cura Agent system. Each walkthrough
        demonstrates the purpose, components, and key interactions of the user interface.
      </p>

      <ul className="space-y-4">
        <li>
          <Link to="/docs/guides/ui-walkthroughs/login" className="text-blue-600 hover:underline">
            Login & Registration
          </Link>
        </li>
        <li>
          <Link to="/docs/guides/ui-walkthroughs/dashboard" className="text-blue-600 hover:underline">
            Dashboard Overview
          </Link>
        </li>
        <li>
          <Link to="/docs/guides/ui-walkthroughs/patient-intake" className="text-blue-600 hover:underline">
            Patient Intake Form
          </Link>
        </li>
        <li>
          <Link to="/docs/guides/ui-walkthroughs/chat-room" className="text-blue-600 hover:underline">
            Real-Time Chat Rooms
          </Link>
        </li>
        <li>
          <Link to="/docs/guides/ui-walkthroughs/medical-record" className="text-blue-600 hover:underline">
            Medical Record Viewer
          </Link>
        </li>
        {/* <li>
          <Link to="/docs/guides/ui-walkthroughs/llm-assist" className="text-blue-600 hover:underline">
            AI Assistant Interface
          </Link>
        </li> */}
        <li>
          <Link to="/docs/guides/ui-walkthroughs/settings" className="text-blue-600 hover:underline">
            Settings & Preferences
          </Link>
        </li>
      </ul>
    </div>
  );
}
