
import React from "react";
import DocContent from "../components/DocContent";
import CodeBlock from "../components/CodeBlock";

const ApiAuthPage = () => {
  return (
    <DocContent
      title="Authentication API"
      lastUpdated={new Date("2025-05-10")}
    >
      <p className="text-lg mb-6">
        The authentication API provides endpoints for managing user access and authentication tokens in the Cura Agent system.
      </p>

      <div className="endpoint-section my-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded">POST</span>
          <h3 className="text-xl font-medium">/auth/token</h3>
        </div>
        <p className="mb-4">Generate a new authentication token for API access</p>

        <h4 className="font-medium mt-6 mb-2">Request</h4>
        <h5 className="text-sm font-medium mt-4 mb-2">Headers</h5>
        <CodeBlock language="json">
          {`{
  "Content-Type": "application/json",
  "Accept": "application/json"
}`}
        </CodeBlock>

        <h5 className="text-sm font-medium mt-4 mb-2">Request Body</h5>
        <CodeBlock language="json">
          {`{
  "client_id": "string",
  "client_secret": "string",
  "grant_type": "client_credentials"
}`}
        </CodeBlock>

        <h4 className="font-medium mt-6 mb-2">Response</h4>
        <div className="flex items-center gap-2 my-2">
          <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">200</span>
          <span className="text-sm font-medium">Success</span>
        </div>
        <CodeBlock language="json">
          {`{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600
}`}
        </CodeBlock>

        <div className="flex items-center gap-2 my-2">
          <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">400</span>
          <span className="text-sm font-medium">Bad Request</span>
        </div>
        <CodeBlock language="json">
          {`{
  "error": "invalid_request",
  "error_description": "missing required parameters"
}`}
        </CodeBlock>

        <h4 className="font-medium mt-6 mb-2">Code Examples</h4>
        <CodeBlock language="javascript" title="JavaScript">
          {`fetch('https://api.cura-agent.com/v2/auth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET',
    grant_type: 'client_credentials'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
        </CodeBlock>
      </div>

      <div className="endpoint-section my-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">DELETE</span>
          <h3 className="text-xl font-medium">/auth/revoke</h3>
        </div>
        <p className="mb-4">Revoke an existing authentication token</p>
      </div>
    </DocContent>
  );
};

export default ApiAuthPage;
