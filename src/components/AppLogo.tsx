import React from 'react';
import AppIcon from './AppIcon';

interface Props {
  style?: 'filled' | 'outline';
  size?: 'default' | 'small' | 'large';
}

const AppLogo: React.FC<Props> = ({ style = 'filled', size = 'default' }) => {
  const width = size === 'large' ? 48 : size === 'small' ? 32 : 40; // Default width to 40


  return (
    <div className="flex items-center py-1  rounded">
      <div className="cura-logo text-white text-lg font-bold mr-2">
        <AppIcon />
      </div>
      <span className="text-2xl font-medium">Cura Agent</span>
    </div>
  )

};

export default AppLogo;