
import { Suspense, lazy } from 'react';
import { LucideProps } from 'lucide-react';

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  iconName: string;
}

function DynamicIcon({ iconName, ...rest }: DynamicIconProps) {
    // Use a more direct approach that avoids type issues
    const IconComponent = lazy(() =>
        import('lucide-react')
            .then(module => {
                const Icon = module[iconName as keyof typeof module];
                if (!Icon) {
                    return { default: () => <span>Invalid icon</span> };
                }
                return { default: Icon };
            })
    );

    return (
        <Suspense fallback={<div className="w-4 h-4 animate-pulse bg-gray-200 rounded"></div>}>
            <IconComponent {...rest} />
        </Suspense>
    );
}

export default DynamicIcon;
