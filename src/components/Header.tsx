import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/AuthContext';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type?: 'appointment' | 'lab-result' | 'message' | 'prescription' | 'general';
}

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Generate role-specific notifications when the component mounts
  useEffect(() => {
    if (user?.role) {
      setNotifications(generateNotificationsForRole(user.role));
    }
  }, [user?.role]);

  const generateNotificationsForRole = (role: string): Notification[] => {
    // Return different notifications based on user role
    if (role.toLowerCase() === 'patient') {
      return [
        {
          id: '1',
          title: 'New Appointment Confirmed',
          message: 'Your appointment with Dr. Johnson has been confirmed for tomorrow at 10:00 AM.',
          time: '10 min ago',
          read: false,
          type: 'appointment'
        },
        {
          id: '2',
          title: 'New Lab Results Available',
          message: 'Your blood test results from May 15 are now available to view.',
          time: '30 min ago',
          read: false,
          type: 'lab-result'
        },
        {
          id: '3',
          title: 'New Message from Dr. Sara Mohamed',
          message: 'Dr. Sara has sent you a new message regarding your treatment plan.',
          time: '1 hour ago',
          read: false,
          type: 'message'
        },
        {
          id: '4',
          title: 'Prescription Renewal',
          message: 'Your prescription for Metformin has been renewed and is ready for pickup.',
          time: '2 hours ago',
          read: true,
          type: 'prescription'
        }
      ];
    } else if (role.toLowerCase() === 'doctor') {
      return [
        {
          id: '1',
          title: 'New lab results',
          message: 'Lab results for John Smith have arrived',
          time: '10 min ago',
          read: false,
        },
        {
          id: '2',
          title: 'Appointment reminder',
          message: 'You have a meeting with Dr. Ali in 30 minutes',
          time: '30 min ago',
          read: false,
        }
      ];
    } else {
      // Admin and other roles
      return [
        {
          id: '1',
          title: 'System Update',
          message: 'System maintenance scheduled for tonight at 2 AM',
          time: '10 min ago',
          read: false,
        },
        {
          id: '2',
          title: 'New user registration',
          message: 'A new doctor account has been created',
          time: '30 min ago',
          read: false,
        }
      ];
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);

    // Navigate based on notification type for patients
    if (user?.role?.toLowerCase() === 'patient' && notification.type) {
      switch (notification.type) {
        case 'appointment':
          navigate('/appointments');
          break;
        case 'lab-result':
          navigate('/lab-results');
          break;
        case 'message':
          navigate('/messages');
          break;
        case 'prescription':
          navigate('/prescriptions');
          break;
        default:
          // Do nothing for general notifications
          break;
      }
    }
  };

  // Get notification icon color based on type
  const getNotificationColor = (type?: string) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-500';
      case 'lab-result':
        return 'bg-green-500';
      case 'message':
        return 'bg-purple-500';
      case 'prescription':
        return 'bg-orange-500';
      default:
        return 'bg-primary';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <div className="p-2 h-7 rounded-md bg-primary/25 text-primary flex justify-center items-center gap-1 text-center">
          <span className='font-medium'>{user?.role?.replace(/\b\w/g, char => char.toUpperCase())} Portal</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                Mark all as read
              </Button>
            </div>
            <div className="max-h-96 overflow-auto">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} onSelect={() => handleNotificationClick(notification)} className="cursor-pointer">
                    <div className="flex items-start py-1">
                      <div className={`w-2 h-2 mt-2 mr-2 rounded-full ${notification.read ? 'bg-gray-300' : getNotificationColor(notification.type)}`} />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{notification.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="py-4 text-center text-sm text-gray-500">
                  No notifications
                </div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
          <Settings className="h-5 w-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar>
                <AvatarImage src={user?.profileImage} alt={`${user?.firstName} ${user?.lastName}`} />
                <AvatarFallback className="bg-primary text-white">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">
                {user?.role?.toLowerCase() === 'doctor' ? 'Dr. ' : ''}{user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()} className="text-red-500 focus:text-red-500">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
