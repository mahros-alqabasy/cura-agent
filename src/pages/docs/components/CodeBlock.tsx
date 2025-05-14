
import React from "react";

interface CodeBlockProps {
  language?: string;
  title?: string;
  children: string;
  showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  language = "typescript",
  title,
  children,
  showLineNumbers = false,
}) => {
  return (
    <div className="code-block rounded-md overflow-hidden border mb-6">
      {title && (
        <div className="bg-accent px-4 py-2 text-sm font-medium border-b flex items-center justify-between">
          {title}
        </div>
      )}
      <div className="bg-card p-4 overflow-x-auto">
        <pre className={`language-${language} ${showLineNumbers ? 'line-numbers' : ''}`}>
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
