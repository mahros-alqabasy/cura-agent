import { Suspense, lazy } from 'react';

function DynamicIcon({ iconName, ...rest }) {
    const IconComponent = lazy(() =>
        import('lucide-react').then(module => ({
            default: module[iconName] || (() => <span>Invalid icon</span>)
        }))
    );

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <IconComponent {...rest} />
        </Suspense>
    );
}

export default DynamicIcon;
