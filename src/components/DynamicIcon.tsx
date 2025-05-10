
import { Suspense, lazy } from 'react';
import { LucideIcon } from 'lucide-react';

interface DynamicIconProps {
  iconName: string;
  [key: string]: any;
}

function DynamicIcon({ iconName, ...rest }: DynamicIconProps) {
    const IconComponent = lazy<LucideIcon>(() =>
        import('lucide-react').then(module => ({
            default: module[iconName as keyof typeof module] || (() => <span>Invalid icon</span>)
        }))
    );

    return (
        <Suspense fallback={<div className="w-4 h-4 animate-pulse bg-gray-200 rounded"></div>}>
            <IconComponent {...rest} />
        </Suspense>
    );
}

export default DynamicIcon;
