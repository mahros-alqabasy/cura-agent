
/**
 * Types for keyboard shortcuts system
 */

export type ShortcutScope = 'global' | 'navigation' | 'form' | 'modal' | 'sidebar' | 'page';

export interface Shortcut {
  key: string;
  description: string;
  action: () => void | boolean;
  scope: ShortcutScope;
  roles?: string[];
}

/**
 * Parsed key combination with modifiers
 */
export interface ParsedKeyCombination {
  key: string;
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
}
