
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define a structure for search results
interface SearchResult {
  title: string;
  url: string;
  excerpt: string;
  category: string;
}

// Mock search index - in a real app, this would come from a backend service or search API
const searchIndex: SearchResult[] = [
  {
    title: "Introduction to Cura Agent",
    url: "/docs/getting-started/introduction",
    excerpt: "Welcome to Cura Agent, an advanced Hospital Information System designed to streamline healthcare workflows...",
    category: "Getting Started",
  },
  {
    title: "Patient Management",
    url: "/docs/guides/patient-management",
    excerpt: "The Patient Management module is the central hub for all patient-related information in Cura Agent...",
    category: "Guides",
  },
  {
    title: "AI Assistant",
    url: "/docs/ai-features/ai-assistant",
    excerpt: "Cura Agent's AI Assistant is an advanced clinical support tool powered by large language models...",
    category: "AI Features",
  },
  {
    title: "Authentication API",
    url: "/docs/api/authentication",
    excerpt: "The authentication API provides secure access to the Cura Agent system with JWT tokens...",
    category: "API Reference",
  },
  {
    title: "Button Components",
    url: "/docs/components/buttons",
    excerpt: "Cura Agent provides several button variants for different actions and contexts...",
    category: "Components",
  },
  {
    title: "Common Issues",
    url: "/docs/troubleshooting/common-issues",
    excerpt: "Solutions to frequently encountered problems when using Cura Agent...",
    category: "Troubleshooting",
  },
  {
    title: "Appointment Scheduling",
    url: "/docs/guides/appointment-scheduling",
    excerpt: "Learn how to schedule, reschedule, and manage appointments efficiently...",
    category: "Guides",
  },
  {
    title: "Laboratory Integration",
    url: "/docs/guides/laboratory-integration",
    excerpt: "How to integrate laboratory services with patient records and clinical workflows...",
    category: "Guides",
  }
];

interface DocsSearchProps {
  className?: string;
  onClose?: () => void;
  isMobile?: boolean;
}

const DocsSearch: React.FC<DocsSearchProps> = ({ className = "", onClose, isMobile = false }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Effect to handle clicks outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsResultsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Effect to listen for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command+K or Ctrl+K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }

      if (!isResultsOpen) return;

      // Handle keyboard navigation in results
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            handleSelectResult(results[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsResultsOpen(false);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isResultsOpen, results, selectedIndex]);

  // Effect to perform search when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsResultsOpen(false);
      return;
    }

    setIsSearching(true);
    setIsResultsOpen(true);

    // Simulate API delay
    const timer = setTimeout(() => {
      const filtered = searchIndex.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.excerpt.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsSearching(false);
      setSelectedIndex(0);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectResult = (result: SearchResult) => {
    navigate(result.url);
    setQuery("");
    setIsResultsOpen(false);
    if (onClose && isMobile) {
      onClose();
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search documentation..."
          className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsResultsOpen(true)}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Keyboard shortcut indicator */}
      {!isMobile && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded border hidden md:flex items-center">
          <span className="mr-1 font-medium">⌘</span>K
        </div>
      )}

      {/* Search results */}
      {isResultsOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-md shadow-lg border max-h-[80vh] overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : results.length > 0 ? (
            <div>
              {results.map((result, index) => (
                <div
                  key={result.url}
                  className={`p-3 hover:bg-gray-50 cursor-pointer ${
                    selectedIndex === index ? "bg-gray-50" : ""
                  }`}
                  onClick={() => handleSelectResult(result)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium">{result.title}</span>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                      {result.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {result.excerpt}
                  </p>
                  <div className="flex items-center mt-2 text-primary text-xs">
                    View <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found for "{query}"
            </div>
          )}
          
          <div className="p-3 border-t">
            <div className="text-xs text-gray-500">
              <span className="font-medium">Tip:</span> Use arrow keys to navigate, Enter to select
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocsSearch;
