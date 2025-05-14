// src/pages/screen-guides/settings.tsx
import React from "react";



import screenshot from "@/assets/screenshots/settings.png";
const SettingsGuide = () => {
  return (
    <div className="prose max-w-none">
      <h1>Settings</h1>
      <p>Manages user preferences, role permissions, system-wide toggles, and integrations.</p>

      <h2>Screenshot</h2>
      <img src={screenshot} alt="Settings screen" className="rounded-xl shadow" />

      <h2>Key Elements</h2>
      <ul>
        <li>General, account, and system settings tabs</li>
        <li>Feature toggles and API keys</li>
        <li>Permission group management for admins</li>
      </ul>
    </div>
  );
};

export default SettingsGuide;
