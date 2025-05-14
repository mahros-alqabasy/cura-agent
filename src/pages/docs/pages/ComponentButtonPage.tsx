
import React from "react";
import DocContent from "../components/DocContent";
import CodeBlock from "../components/CodeBlock";
import { Button } from "@/components/ui/button";

const ComponentButtonPage = () => {
  return (
    <DocContent
      title="Button Component"
      lastUpdated={new Date("2025-05-08")}
    >
      <p className="text-lg mb-6">
        Versatile button component with multiple variants and states
      </p>

      <div className="flex flex-wrap gap-4 my-6">
        <Button>Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="destructive">Danger Button</Button>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Properties</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Size</h3>
          <select className="w-full border rounded p-2">
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>
        
        <div className="border rounded-md p-4">
          <h3 className="font-medium mb-2">Variant</h3>
          <select className="w-full border rounded p-2">
            <option>Primary</option>
            <option>Secondary</option>
            <option>Outline</option>
            <option>Ghost</option>
            <option>Link</option>
            <option>Destructive</option>
          </select>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Code</h2>
      
      <CodeBlock language="typescript">
{`import { Button } from '@cura/components';

function Example() {
  return (
    <>
      <Button>Primary Button</Button>
      
      <Button variant="secondary">
        Secondary Button
      </Button>
      
      <Button variant="destructive">
        Danger Button
      </Button>
    </>
  );
}`}
      </CodeBlock>
    </DocContent>
  );
};

export default ComponentButtonPage;
