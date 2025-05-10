
import React from 'react';
import AppIcon from './AppIcon';

interface Props {
  style?: 'filled' | 'outline';
  size?: 'default' | 'small' | 'large';
  textColor?: string;
  className?: string;
  showText?: boolean;
}

const AppLogo: React.FC<Props> = ({ 
  style = 'filled', 
  size = 'default',
  textColor = 'text-2xl',
  className = '',
  showText = true
}) => {
  const width = size === 'large' ? 48 : size === 'small' ? 32 : 40; // Default width to 40
  const containerClasses = `flex items-center py-1 rounded ${className}`;

  return (
    <div className={containerClasses}>
      <div className="cura-logo text-white text-lg font-bold mr-2">
        <AppIcon />
      </div>
      {showText && (
        <span className={`font-medium ${textColor}`}>Cura Agent</span>
      )}
    </div>
  );
};

export default AppLogo;
