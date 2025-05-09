
import { ReactNode } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Search } from 'lucide-react';

interface ActionButton {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
}

interface PageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  actionButton?: ActionButton;
  onSearch?: (query: string) => void;
}

const PageLayout = ({
  title,
  description,
  children,
  actionButton,
  onSearch,
}: PageLayoutProps) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          {onSearch && (
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 w-full md:w-[200px] lg:w-[300px]"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          )}
          {actionButton && (
            <Button
              onClick={actionButton.onClick}
              variant={actionButton.variant || 'default'}
              className="whitespace-nowrap"
            >
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
