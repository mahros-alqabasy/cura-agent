
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DocsSearch from "./DocsSearch";

const MobileSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        variant="outline"
        className="rounded-full shadow-lg bg-primary text-white hover:bg-primary/90"
      >
        <Search className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md p-0">
          <div className="p-4 space-y-4">
            <h2 className="text-lg font-semibold">Search Documentation</h2>
            <DocsSearch isMobile={true} onClose={() => setIsOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MobileSearch;
