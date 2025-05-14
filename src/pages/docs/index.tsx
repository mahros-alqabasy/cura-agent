
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DocsHeader from "@/pages/docs/components/DocsHeader";
import DocsSidebar from "@/pages/docs/components/DocsSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import MobileSearch from "./components/MobileSearch";

const DocsLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="docs-layout flex flex-col min-h-screen bg-background">
      <DocsHeader />
      <div className="flex flex-1 container mx-auto max-w-[1400px]">
        {/* Desktop sidebar */}
        <DocsSidebar />
        
        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed bottom-4 right-4 z-50">
          <Button
            onClick={toggleSidebar}
            size="icon"
            variant="outline"
            className="rounded-full shadow-lg bg-primary text-white hover:bg-primary/90"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        
        {/* Mobile search button */}
        <div className="md:hidden fixed bottom-4 left-4 z-50">
          <MobileSearch />
        </div>
        
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <>
            <div 
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 z-50 w-80 bg-background border-r">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-lg">Documentation</h2>
                <Button 
                  variant="ghost" 
                  className="absolute top-4 right-4"
                  onClick={() => setSidebarOpen(false)}
                >
                  ✕
                </Button>
              </div>
              <div className="overflow-y-auto h-[calc(100vh-65px)]">
                <DocsSidebar />
              </div>
            </div>
          </>
        )}
        
        <main className="flex-1 p-6 md:p-8 overflow-hidden">
          <div className="max-w-3xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;
