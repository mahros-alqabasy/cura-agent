
import React, { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Version {
  label: string;
  value: string;
  status?: "current" | "beta" | "legacy";
}

const versions: Version[] = [
  { label: "v1.0.0", value: "v1.0.0", status: "current" },
  // { label: "v2.4.0", value: "v2.4.0" },
  // { label: "v2.3.0", value: "v2.3.0" },
  // { label: "v2.2.0", value: "v2.2.0" },
  { label: "v0.0.0", value: "v0.0.0", status: "legacy" },
];

export const VersionSelector = () => {
  const [selectedVersion, setSelectedVersion] = useState<Version>(versions[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 gap-1">
          {selectedVersion.label}
          {selectedVersion.status === "current" && (
            <span className="ml-1 rounded bg-green-100 px-1.5 text-xs font-medium text-green-700">
              Latest
            </span>
          )}
          {selectedVersion.status === "beta" && (
            <span className="ml-1 rounded bg-blue-100 px-1.5 text-xs font-medium text-blue-700">
              Beta
            </span>
          )}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {versions.map((version) => (
          <DropdownMenuItem
            key={version.value}
            className="flex items-center justify-between"
            onSelect={() => setSelectedVersion(version)}
          >
            <div className="flex items-center gap-2">
              {version.label}
              {version.status === "current" && (
                <span className="rounded bg-green-100 px-1.5 text-xs font-medium text-green-700">
                  Latest
                </span>
              )}
              {version.status === "beta" && (
                <span className="rounded bg-blue-100 px-1.5 text-xs font-medium text-blue-700">
                  Beta
                </span>
              )}
              {version.status === "legacy" && (
                <span className="rounded bg-amber-100 px-1.5 text-xs font-medium text-amber-700">
                  Legacy
                </span>
              )}
            </div>
            {selectedVersion.value === version.value && (
              <Check className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
