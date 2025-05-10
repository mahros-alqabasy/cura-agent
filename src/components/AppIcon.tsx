import { FC, HTMLProps } from 'react';
import appIcon from '/favicons/web/icons8-hospital-apple-sf-regular-filled-96.png'

interface AppIconProps {
  size?: 'default' | 'small' | 'large';
  background?: 'default' | 'trans'
}

const AppIcon: FC<AppIconProps> = ({ size = 'default', ...props }) => {
  const dimension = {
    'default': 'w-8 h-8 rounded rounded-2 bg-white',
    'small': 'w-5 h-5 rounded rounded-2 bg-white',
    'large': 'w-12 h-12 rounded rounded-2 bg-white',
  }[size];

  const background = {
    'default': 'white',
    'trans': 'transparent'
  }[props["background"]]

  return (
    <img className={dimension} src={appIcon} alt="User" {...props} style={{ backgroundColor: background }} />
  );
};

export default AppIcon;