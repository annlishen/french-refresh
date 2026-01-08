import { clsx, type ClassValue } from 'clsx';

/**
 * Utility for conditionally joining classNames
 * Similar to the popular 'classnames' library but lightweight
 */
export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ');
}

/**
 * Alternative implementation without external dependency
 */
export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
