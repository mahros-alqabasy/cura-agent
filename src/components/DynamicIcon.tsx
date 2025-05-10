
import { Suspense, lazy, ComponentType } from 'react';
import { LucideIcon, LucideProps } from 'lucide-react';

interface DynamicIconProps {
  iconName: string;
  [key: string]: any;
}

function DynamicIcon({ iconName, ...rest }: DynamicIconProps) {
    // Cast the dynamic import to the correct return type
    const IconComponent = lazy<ComponentType<LucideProps>>(() =>
        import('lucide-react').then(module => {
            const Icon = module[iconName as keyof typeof module];
            return {
                default: Icon || (() => <span>Invalid icon</span>)
            };
        })
    );

    return (
        <Suspense fallback={<div className="w-4 h-4 animate-pulse bg-gray-200 rounded"></div>}>
            <IconComponent {...rest} />
        </Suspense>
    );
}

export default DynamicIcon;
