
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/shared/contexts/AuthContext";
import {
  Calendar,
  FileText,
  Home,
  MessageSquare,
  PanelLeft,
  Pills,
  Settings,
  User,
  Users,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useMobile } from "@/shared/hooks/use-mobile";
import { Button } from "@/shared/ui/button";
import AppIcon from "@/shared/components/AppIcon";

interface SidebarProps {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

const Sidebar = ({ expanded, setExpanded }: SidebarProps) => {
  const { user } = useAuth();
  const isMobile = useMobile();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const navigation = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: Home,
      visible: true,
    },
    {
      name: "Patients",
      to: "/patients",
      icon: User,
      visible: user?.role === "doctor" || user?.role === "receptionist" || user?.role === "admin",
    },
    {
      name: "Doctors",
      to: "/doctors",
      icon: Users,
      visible: user?.role === "admin" || user?.role === "receptionist",
    },
    {
      name: "Nurses",
      to: "/nurses",
      icon: Users,
      visible: user?.role === "admin" || user?.role === "doctor",
    },
    {
      name: "Receptionists",
      to: "/receptionists",
      icon: Users,
      visible: user?.role === "admin",
    },
    {
      name: "Appointments",
      to: "/appointments",
      icon: Calendar,
      visible: true,
    },
    {
      name: "Medical Records",
      to: "/medical-records",
      icon: FileText,
      visible: user?.role === "doctor" || user?.role === "nurse" || user?.role === "admin",
    },
    {
      name: "Prescriptions",
      to: "/prescriptions",
      icon: Pills,
      visible: user?.role === "doctor" || user?.role === "pharmacist" || user?.role === "admin",
    },
    {
      name: "Messages",
      to: "/messages",
      icon: MessageSquare,
      visible: true,
    },
    {
      name: "Settings",
      to: "/settings",
      icon: Settings,
      visible: true,
    },
  ];

  const filteredNavigation = navigation.filter(item => item.visible);

  return (
    <div
      className={cn(
        "h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {expanded ? (
          <div className="flex items-center gap-2">
            <AppIcon className="h-6 w-6" />
            <span className="font-semibold text-xl">Cura</span>
          </div>
        ) : (
          <AppIcon className="h-6 w-6 mx-auto" />
        )}

        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {filteredNavigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100",
                    !expanded && "justify-center"
                  )
                }
              >
                <item.icon className="flex-shrink-0 h-5 w-5" />
                {expanded && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
