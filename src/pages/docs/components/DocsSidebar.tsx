import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BookOpen, ChevronDown, FileText, List, ListOrdered, Info, Search, ListVideo, HelpCircle, RussianRuble, LeafyGreen, Book, Users } from "lucide-react";

interface SidebarItemProps {
  title: string;
  to: string;
  icon?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block text-sm py-1.5 px-2 rounded-md transition-colors ${isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-foreground/70 hover:text-foreground hover:bg-accent"
        }`
      }
    >
      {title}
    </NavLink>
  );
};

interface SidebarSectionProps {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  title,
  icon,
  defaultOpen = false,
  children,
}) => {
  // Use location to determine if this section should be open
  const location = useLocation();
  const childrenArray = React.Children.toArray(children);

  // Check if any child is active (meaning its path matches current location)
  const shouldBeOpen = childrenArray.some((child) => {
    if (React.isValidElement(child) && child.props.to) {
      return location.pathname === child.props.to;
    }
    return false;
  });

  const [isOpen, setIsOpen] = React.useState(defaultOpen || shouldBeOpen);

  React.useEffect(() => {
    if (shouldBeOpen) {
      setIsOpen(true);
    }
  }, [shouldBeOpen]);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="py-2">
      <CollapsibleTrigger className="flex items-center w-full gap-2 text-sm font-medium py-1 px-2 hover:text-primary">
        <span className="text-primary/80">{icon}</span>
        {title}
        <ChevronDown
          className={`ml-auto h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-6 mt-1 space-y-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
};

const DocsSidebar = () => {
  return (
    <div className="w-64 border-r border-border shrink-0 hidden md:block overflow-y-auto h-[calc(100vh-4rem)]">
      <div className="p-4">
        {/* Getting Started Section */}
        <SidebarSection
          title="Getting Started"
          icon={<BookOpen className="h-5 w-5" />}
          defaultOpen={true}
        >
          <SidebarItem title="Introduction" to="/docs/getting-started/introduction" />
          {/* <SidebarItem title="Quick Start" to="/docs/getting-started/quick-start" /> */}
          {/* <SidebarItem title="Installation" to="/docs/getting-started/installation" /> */}
          {/* <SidebarItem title="User Roles" to="/docs/getting-started/user-roles" /> */}


        </SidebarSection>



        {/* User Roles Section */}
        <SidebarSection
          title="User Roles"
          icon={<Users className="h-5 w-5" />}
        >
          {/* <SidebarItem title="Overview" to="/docs/user-roles/overview" /> */}
          <SidebarItem title="Administrator" to="/docs/user-roles/admin" />
          {/* <SidebarItem title="Doctor / Clinician" to="/docs/user-roles/doctor" />
            <SidebarItem title="Nurse" to="/docs/user-roles/nurse" />
            <SidebarItem title="Receptionist" to="/docs/user-roles/receptionist" />
            <SidebarItem title="Lab Technician" to="/docs/user-roles/lab-tech" />
            <SidebarItem title="Pharmacist" to="/docs/user-roles/pharmacist" /> */}
        </SidebarSection>
        {/* Core Concepts Section */}
        {/* <SidebarSection 
          title="Core Concepts" 
          icon={<ListOrdered className="h-5 w-5" />}
        >
          <SidebarItem title="Architecture" to="/docs/concepts/architecture" />
          <SidebarItem title="Data Flow" to="/docs/concepts/data-flow" />
          <SidebarItem title="Security" to="/docs/concepts/security" />
          <SidebarItem title="User Management" to="/docs/concepts/user-management" />
        </SidebarSection> */}



        {/* Components Section */}
        {/* <SidebarSection
          title="Components"
          icon={<List className="h-5 w-5" />}
        >
          <SidebarItem title="Buttons" to="/docs/components/buttons" />
          <SidebarItem title="Form Elements" to="/docs/components/form-elements" />
          <SidebarItem title="Data Display" to="/docs/components/data-display" />
          <SidebarItem title="Navigation" to="/docs/components/navigation" />
          <SidebarItem title="Modals" to="/docs/components/modals" />
        </SidebarSection> */}

        {/* Guides Section */}
        <SidebarSection
          title="Guides"
          icon={<Info className="h-5 w-5" />}
        >
          {/* <SidebarSection title="Walkthrough" icon={<Book className="h-5 w-5" />}> */}
          <SidebarItem title="Patient Management" to="/docs/guides/patient-management" />
          {/* <SidebarItem title="UI Walkthroughs Index" to="/docs/guides/ui-walkthroughs" /> */}
          <SidebarItem title="Login & Registration" to="/docs/guides/ui-walkthroughs/login" />
          <SidebarItem title="Dashboard Overview" to="/docs/guides/ui-walkthroughs/dashboard" />
          <SidebarItem title="Patient Intake Form" to="/docs/guides/ui-walkthroughs/patient-intake" />
          <SidebarItem title="Real-Time Chat Rooms" to="/docs/guides/ui-walkthroughs/chat-room" />
          <SidebarItem title="Medical Record Viewer" to="/docs/guides/ui-walkthroughs/medical-record" />
          {/* <SidebarItem title="AI Assistant Interface" to="/docs/guides/ui-walkthroughs/llm-assist" /> */}
          <SidebarItem title="Settings & Preferences" to="/docs/guides/ui-walkthroughs/settings" />
          {/* </SidebarSection> */}
        </SidebarSection>


        {/* AI Features Section */}
        <SidebarSection
          title="AI Features"
          icon={<ListVideo className="h-5 w-5" />}
        >
          <SidebarItem title="AI Assistant" to="/docs/ai-features/ai-assistant" />
          {/* <SidebarItem title="Voice Commands" to="/docs/ai-features/voice-commands" />
          <SidebarItem title="Clinical Decision Support" to="/docs/ai-features/clinical-decision-support" />
          <SidebarItem title="Medical Transcription" to="/docs/ai-features/medical-transcription" /> */}
        </SidebarSection>

        {/* Troubleshooting Section */}
        {/* <SidebarSection
          title="Troubleshooting"
          icon={<HelpCircle className="h-5 w-5" />}
        >
          <SidebarItem title="Common Issues" to="/docs/troubleshooting/common-issues" />
          <SidebarItem title="FAQ" to="/docs/troubleshooting/faq" />
          <SidebarItem title="Error Codes" to="/docs/troubleshooting/error-codes" />
          <SidebarItem title="Contact Support" to="/docs/troubleshooting/contact-support" />
        </SidebarSection> */}


        {/* API Reference Section */}
        <SidebarSection
          title="API Reference"
          icon={<FileText className="h-5 w-5" />}
        >
          <SidebarItem title="Authentication" to="/docs/api/authentication" />
          {/* <SidebarItem title="Endpoints" to="/docs/api/endpoints" /> */}
          {/* <SidebarItem title="Error Handling" to="/docs/api/error-handling" /> */}
          {/* <SidebarItem title="Rate Limits" to="/docs/api/rate-limits" /> */}
        </SidebarSection>
      </div>
    </div>
  );
};

export default DocsSidebar;
