
import { ParsedKeyCombination } from './types';

/**
 * Parse key combination strings like "Ctrl+A" into component parts
 */
export const parseKeyCombination = (combination: string): ParsedKeyCombination => {
  const parts = combination.split('+').map(part => part.trim().toLowerCase());

  return {
    key: parts.filter(part => !['ctrl', 'shift', 'alt'].includes(part))[0],
    ctrl: parts.includes('ctrl'),
    shift: parts.includes('shift'),
    alt: parts.includes('alt')
  };
};

/**
 * Check if element is an input field that should prevent shortcuts
 */
export const isInputField = (target: EventTarget | null): boolean => {
  if (!target) return false;
  
  return (
    ['INPUT', 'TEXTAREA', 'SELECT'].includes((target as Element).tagName) &&
    !((target as HTMLInputElement).readOnly)
  );
};
