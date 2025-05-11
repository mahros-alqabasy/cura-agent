import AppIcon from '@/components/AppIcon'
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';
import { useShortcuts } from '@/utils/shortcuts';
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
  LogOut,
  User,
  ClipboardList,
  MessageSquare,
  PiIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Main navigation items grouped by category
const getNavItems = (role) => {
  // Base items all roles can access
  const baseItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="h-5 w-5" /> }
  ];

  // Role-specific items
  const roleItems = {
    doctor: [
      { name: 'Patients', path: '/patients', icon: <Users className="h-5 w-5" /> },
      { name: 'Lab Results', path: '/lab-results', icon: <Beaker className="h-5 w-5" /> },
      { name: 'Appointments', path: '/appointments', icon: <Calendar className="h-5 w-5" /> },
      { name: 'AI Assistant', path: '/ai-assistant', icon: <Bot className="h-5 w-5" /> },
      { name: 'Prescriptions', path: '/prescriptions', icon: <PillIcon className="h-5 w-5" /> },
      { name: 'Medical Records', path: '/medical-records', icon: <FileText className="h-5 w-5" /> },
    ],
    admin: [
      {
        name: 'Users',
        path: null,
        icon: <Users className="h-5 w-5" />,
        submenu: [
          { name: 'Nurses', path: '/nurses' },
          { name: 'Doctors', path: '/doctors' },
          { name: 'Patients', path: '/patients' },
          { name: 'Receptionists', path: '/receptionists' },
        ]
      },
      { name: 'Logs', path: '/logs', icon: <ClipboardList className="h-5 w-5" /> },
      { name: 'Lab Results', path: '/lab-results', icon: <Beaker className="h-5 w-5" /> },
      { name: 'Appointments', path: '/appointments', icon: <Calendar className="h-5 w-5" /> },
      { name: 'Departments', path: '/departments', icon: <PiIcon className="h-5 w-5" /> },
      { name: 'AI Assistant', path: '/ai-assistant', icon: <Bot className="h-5 w-5" /> },
      { name: 'Prescriptions', path: '/prescriptions', icon: <PillIcon className="h-5 w-5" /> },
      { name: 'Medical Records', path: '/medical-records', icon: <FileText className="h-5 w-5" /> },
    ],
    nurse: [
      { name: 'Patients', path: '/patients', icon: <Users className="h-5 w-5" /> },
      { name: 'Lab Results', path: '/lab-results', icon: <Beaker className="h-5 w-5" /> },
      { name: 'Appointments', path: '/appointments', icon: <Calendar className="h-5 w-5" /> },
      { name: 'Medical Records', path: '/medical-records', icon: <FileText className="h-5 w-5" /> },
    ],
    receptionist: [
      { name: 'Patients', path: '/patients', icon: <Users className="h-5 w-5" /> },
      { name: 'Appointments', path: '/appointments', icon: <Calendar className="h-5 w-5" /> },
    ],
    patient: [
      { name: 'Messages', path: '/messages', icon: <MessageSquare className="h-5 w-5" /> },
      { name: 'Lab Results', path: '/lab-results', icon: <Beaker className="h-5 w-5" /> },
      { name: 'Appointments', path: '/appointments', icon: <Calendar className="h-5 w-5" /> },
      { name: 'Prescriptions', path: '/prescriptions', icon: <PillIcon className="h-5 w-5" /> },
      { name: 'Medical Records', path: '/medical-records', icon: <FileText className="h-5 w-5" /> },
    ]
  };

  return [...baseItems, ...(roleItems[role.toLowerCase()] || [])];
};

const Sidebar = ({ expanded }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { sidebarExpanded, toggleSidebar } = useShortcuts();
  
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);

  const navItems = getNavItems(user?.role || 'patient');

  // Add the unread message count for patient users
  useEffect(() => {
    if (user?.role?.toLowerCase() === 'patient') {
      // In a real app, this would be fetched from an API
      // For now, let's simulate 3 unread messages
      setUnreadMessageCount(3);
    }
  }, [user?.role]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const toggleSubmenu = (name) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Set sidebar state based on context
  useEffect(() => {
    // This ensures the sidebar state respects the global context
    if (expanded !== sidebarExpanded) {
      toggleSidebar();
    }
  }, []);

  // Collapse sidebar on mobile/tablet screen sizes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)'); // Tailwind md breakpoint

    const handleResize = () => {
      if (mediaQuery.matches && sidebarExpanded) {
        toggleSidebar();
      } else if (!mediaQuery.matches && !sidebarExpanded) {
        toggleSidebar();
      }
    };

    handleResize(); // set initial state
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, [toggleSidebar, sidebarExpanded]);

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out h-screen",
      sidebarExpanded ? "w-64" : "w-[70px]"
    )}>
      {/* Logo and App Name */}
      <div className={cn(
        "h-16 flex items-center px-4",
        sidebarExpanded ? "justify-start" : "justify-center"
      )}>
        <NavLink to="/dashboard" className="flex items-center">
          <div className="cura-logo text-white text-lg font-bold">
            <AppIcon />
          </div>
          {sidebarExpanded && (
            <span className="ml-2 text-lg font-semibold">Cura Agent</span>
          )}
        </NavLink>
        <button
          onClick={toggleSidebar}
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center",
            sidebarExpanded ? "ml-auto" : "hidden"
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
      {sidebarExpanded && (
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
              <p className="text-sm font-medium text-gray-800">
                {user?.role === 'doctor' ? 'Dr. ' : ''}{user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                {user?.role || 'User'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path || item.name}>
              {item.submenu ? (
                <div className="space-y-1">
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    className={cn(
                      "flex items-center w-full px-2 py-2 text-sm font-medium rounded-md",
                      "text-gray-700 hover:bg-gray-100",
                      !expanded && "justify-center"
                    )}
                  >
                    {item.icon}
                    {expanded && (
                      <>
                        <span className="ml-3">{item.name}</span>
                        <svg
                          className={cn(
                            "ml-auto h-5 w-5 transition-transform",
                            openSubmenus[item.name] ? "rotate-90" : ""
                          )}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </>
                    )}
                  </button>

                  {expanded && openSubmenus[item.name] && (
                    <ul className="mt-1 pl-8 space-y-1">
                      {item.submenu.map((subitem) => (
                        <li key={subitem.path}>
                          <NavLink
                            to={subitem.path}
                            className={({ isActive }) =>
                              cn(
                                "flex items-center px-2 py-1.5 text-sm rounded-md",
                                isActive
                                  ? "bg-primary-50 text-primary"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              )
                            }
                          >
                            {subitem.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
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
                  {expanded && (
                    <span className="ml-3 flex items-center">
                      {item.name}
                      {/* Display unread message badge for patient */}
                      {user?.role === 'patient' && item.name === 'Messages' && unreadMessageCount > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {unreadMessageCount}
                        </span>
                      )}
                    </span>
                  )}
                  {/* Show badge on icon-only view */}
                  {!expanded && user?.role === 'patient' && item.name === 'Messages' && unreadMessageCount > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {unreadMessageCount}
                    </span>
                  )}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-2 border-t border-gray-200 pt-4">
        <div className="space-y-1">
          {/* Help */}
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

          {/* Profile */}
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              cn(
                "flex items-center px-2 py-2 text-sm font-medium rounded-md",
                isActive ? "bg-primary-50 text-primary" : "text-gray-700 hover:bg-gray-100",
                !expanded && "justify-center"
              )
            }
          >
            <User className="h-5 w-5" />
            {expanded && <span className="ml-3">Profile</span>}
          </NavLink>

          {/* Settings */}
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
        </div>

        {sidebarExpanded && <hr className="my-4 border-t border-gray-200" />}
        {/* Logout button */}
        <div className="mt-4 pb-4">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              "flex items-center text-red-500 hover:bg-red-50 hover:text-red-600 w-full justify-start",
              !sidebarExpanded && "justify-center"
            )}
            data-logout="true"
          >
            <LogOut className="h-5 w-5" />
            {sidebarExpanded && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
