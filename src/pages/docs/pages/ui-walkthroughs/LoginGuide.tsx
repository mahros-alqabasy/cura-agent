// src/pages/screen-guides/login.tsx
import React from "react";



import screenshot from "@/assets/screenshots/login.png";

const LoginScreenGuide = () => {
  return (
    <div className="prose max-w-none">
      <h1>Login Screen</h1>
      <p>This screen allows users to authenticate using email, phone number, or national ID, along with a password.</p>

      <h2>Screenshot</h2>
      <img src={screenshot} alt="Login screen" className="rounded-xl shadow" />

      <h2>Key Elements</h2>
      <ul>
        <li>Multi-identifier input field</li>
        <li>Password field with toggle visibility</li>
        <li>Forgot password and support link</li>
      </ul>

      <h2>Notes</h2>
      <p>Authentication system supports MFA and brute-force protection behind the scenes.</p>
    </div>
  );
};

export default LoginScreenGuide;
