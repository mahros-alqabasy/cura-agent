
import React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface DocContentProps {
  title: string;
  lastUpdated?: Date;
  author?: string;
  children: React.ReactNode;
  showTableOfContents?: boolean;
  tableOfContents?: Array<{ id: string; title: string; level: number }>;
}

const DocContent: React.FC<DocContentProps> = ({
  title,
  lastUpdated,
  author = "Dev Team",
  children,
  showTableOfContents = true,
  tableOfContents = [],
}) => {
  return (
    <div className="doc-content">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        {lastUpdated && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div>Updated {format(lastUpdated, "MMM dd, yyyy")}</div>
            <div>By {author}</div>
          </div>
        )}
      </div>

      <div className="flex gap-8">
        <div className="prose prose-slate max-w-none flex-1">
          {children}

          {/* Feedback section at bottom of doc */}
          <div className="mt-12 border rounded-lg p-6 bg-card">
            <h3 className="text-lg font-medium mb-4">Was this page helpful?</h3>
            <div className="flex gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <span>👍</span> Yes
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <span>👎</span> No
              </Button>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" className="flex items-center gap-2">
              ← Previous
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              Next →
            </Button>
          </div>
        </div>

        {showTableOfContents && tableOfContents.length > 0 && (
          <div className="w-48 shrink-0 hidden lg:block">
            <div className="sticky top-8">
              <h4 className="text-sm font-medium mb-3">On this page</h4>
              <ul className="space-y-2 text-sm">
                {tableOfContents.map((item) => (
                  <li key={item.id} style={{ marginLeft: `${(item.level - 2) * 12}px` }}>
                    <a
                      href={`#${item.id}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocContent;
