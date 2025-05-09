
import { ReactNode } from "react";
import { useAuth } from "@/shared/contexts/AuthContext";
import { Button } from "@/shared/ui/button";
import { Search } from "lucide-react";

interface PageLayoutProps {
  title: string;
  children: ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  } | null;
  onSearch?: ((query: string) => void) | null;
  showSearch?: boolean;
}

const PageLayout = ({
  title,
  children,
  actionButton,
  onSearch,
  showSearch = true,
}: PageLayoutProps) => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-gray-500">Welcome back, {user?.role === 'doctor' ? 'Dr. ' : ''}{user?.lastName}.</p>
        </div>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          {showSearch && (
            <div className="relative flex-1 md:flex-none md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-md border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                onChange={(e) => onSearch && onSearch(e.target.value)}
              />
            </div>
          )}

          {actionButton && (
            <Button className="bg-primary hover:bg-primary-700" onClick={actionButton.onClick}>
              {actionButton.icon && <span className="mr-2">{actionButton.icon}</span>}
              {actionButton.label}
            </Button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default PageLayout;
