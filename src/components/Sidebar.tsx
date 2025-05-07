
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Beaker,
  PillIcon,
  Bot,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: 'Appointments', path: '/appointments', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Patients', path: '/patients', icon: <Users className="h-5 w-5" /> },
    { name: 'Medical Records', path: '/medical-records', icon: <FileText className="h-5 w-5" /> },
    { name: 'Lab Results', path: '/lab-results', icon: <Beaker className="h-5 w-5" /> },
    { name: 'Prescriptions', path: '/prescriptions', icon: <PillIcon className="h-5 w-5" /> },
    { name: 'AI Assistant', path: '/ai-assistant', icon: <Bot className="h-5 w-5" /> },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out",
      expanded ? "w-64" : "w-[70px]"
    )}>
      {/* Logo and App Name */}
      <div className={cn(
        "h-16 flex items-center px-4",
        expanded ? "justify-start" : "justify-center"
      )}>
        <NavLink to="/dashboard" className="flex items-center">
          <div className="cura-logo text-white text-lg font-bold">
            <span>CA</span>
          </div>
          {expanded && (
            <span className="ml-2 text-lg font-semibold">Cura Agent</span>
          )}
        </NavLink>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center",
            expanded ? "ml-auto" : "hidden"
          )}
        >
          <span className="sr-only">Toggle sidebar</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* User Profile */}
      {expanded && (
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm font-medium">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </span>
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">Dr. {user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                Doctor
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-2 py-2 text-sm font-medium rounded-md",
                    isActive
                      ? "bg-primary-50 text-primary"
                      : "text-gray-700 hover:bg-gray-100",
                    !expanded && "justify-center"
                  )
                }
              >
                {item.icon}
                {expanded && <span className="ml-3">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
        
        <div className="px-2 mt-6 space-y-1">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                "flex items-center px-2 py-2 text-sm font-medium rounded-md",
                isActive ? "bg-primary-50 text-primary" : "text-gray-700 hover:bg-gray-100",
                !expanded && "justify-center"
              )
            }
          >
            <Settings className="h-5 w-5" />
            {expanded && <span className="ml-3">Settings</span>}
          </NavLink>
          
          <NavLink
            to="/help"
            className={({ isActive }) =>
              cn(
                "flex items-center px-2 py-2 text-sm font-medium rounded-md",
                isActive ? "bg-primary-50 text-primary" : "text-gray-700 hover:bg-gray-100",
                !expanded && "justify-center"
              )
            }
          >
            <HelpCircle className="h-5 w-5" />
            {expanded && <span className="ml-3">Help</span>}
          </NavLink>
        </div>
      </nav>

      {/* Sign Out Button */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className={cn(
            "flex items-center text-red-500 hover:bg-red-50 hover:text-red-600 w-full justify-start",
            !expanded && "justify-center"
          )}
        >
          <LogOut className="h-5 w-5" />
          {expanded && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
