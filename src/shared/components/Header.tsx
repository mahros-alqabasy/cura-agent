
import { useState } from "react";
import { useAuth } from "@/shared/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/shared/ui/button";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useMobile } from "@/shared/hooks/use-mobile";
import { toast } from "sonner";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMobile();
  const [notifications, setNotifications] = useState([
    "New appointment request",
    "Lab results ready",
  ]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const clearNotifications = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 md:px-6">
      <div className="flex justify-between items-center">
        <div>
          {isMobile && (
            <Button variant="ghost" size="icon" className="mr-2">
              <Bell className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {!isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <span className="font-medium">Notifications</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearNotifications}
                    disabled={notifications.length === 0}
                  >
                    Clear all
                  </Button>
                </div>
                {notifications.length === 0 ? (
                  <div className="px-4 py-6 text-center text-gray-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification, index) => (
                    <DropdownMenuItem key={index} className="px-4 py-3 cursor-pointer">
                      <div>
                        <p className="font-medium">{notification}</p>
                        <p className="text-xs text-gray-500">1 min ago</p>
                      </div>
                    </DropdownMenuItem>
                  ))
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profileImage} alt={user?.firstName} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {!isMobile && (
                  <>
                    <div className="text-sm text-left mr-1">
                      <div className="font-medium">{user?.firstName} {user?.lastName}</div>
                      <div className="text-xs text-gray-500 capitalize">{user?.role}</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                My Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
