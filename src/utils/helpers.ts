import React from 'react';
import { Theme } from '../types';

/**
 * Gets the initial theme from localStorage or system preference
 */
export const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('pitchcraft-theme') as Theme | null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    return savedTheme;
  }
  
  return prefersDark ? 'dark' : 'light';
};

/**
 * Applies the theme to the document and saves it to localStorage
 */
export const applyTheme = (theme: Theme): void => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem('pitchcraft-theme', theme);
};

/**
 * Available pitch styles
 */
export const PITCH_STYLES = [
  "Elevator Pitch",
  "Formal Investor Deck",
  "Casual Social Media Blurb",
  "Feature-Focused",
  "Benefit-Driven"
];

export type PitchStyle = typeof PITCH_STYLES[number];

/**
 * Formats analysis or suggestions text with basic markdown parsing
 */
export const formatMarkdownText = (text: string): React.ReactElement[] => {
  return text.split('\n').map((line, index) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      return React.createElement('h4', { 
        key: index, 
        className: "text-lg font-semibold text-teal-600 dark:text-teal-400 mt-4 mb-2" 
      }, trimmedLine.replace(/\*\*/g, ''));
    }
    if (trimmedLine.startsWith('* ')) {
      return React.createElement('li', { 
        key: index, 
        className: "text-gray-700 dark:text-gray-300 ml-4 list-disc" 
      }, trimmedLine.substring(2));
    }
    return React.createElement('p', { 
      key: index, 
      className: "text-gray-700 dark:text-gray-300" 
    }, trimmedLine);
  });
};