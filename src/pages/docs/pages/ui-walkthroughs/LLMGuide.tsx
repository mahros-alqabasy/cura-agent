// src/pages/screen-guides/llm-assist.tsx
import React from "react";

const LLMGuide = () => {
  return (
    <div className="prose max-w-none">
      <h1>LLM Assist</h1>
      <p>This screen integrates AI assistant support for query generation, document drafting, and suggestions.</p>

      <h2>Screenshot</h2>
      <img src="/screenshots/llm-assist.png" alt="LLM Assist screen" className="rounded-xl shadow" />

      <h2>Key Elements</h2>
      <ul>
        <li>Prompt input and system response panel</li>
        <li>Options for prompt templates and patient context</li>
        <li>Streamed output rendering with markdown</li>
      </ul>
    </div>
  );
};

export default LLMGuide;
