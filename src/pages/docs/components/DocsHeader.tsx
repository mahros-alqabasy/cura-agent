
import React from "react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { VersionSelector } from "./VersionSelector";
import DocsSearch from "./DocsSearch";

const DocsHeader = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl">Cura Agent</span>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/docs" className={navigationMenuTriggerStyle()}>
                  Documentation
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/features-backlog" className={navigationMenuTriggerStyle()}>
                  Features
                </Link>
              </NavigationMenuItem>
              {/* <NavigationMenuItem>
                <Link to="/help" className={navigationMenuTriggerStyle()}>
                  Support
                </Link>
              </NavigationMenuItem> */}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <DocsSearch className="hidden md:flex w-[200px] lg:w-[300px]" />
          <VersionSelector />
        </div>
      </div>
    </header>
  );
};

export default DocsHeader;
