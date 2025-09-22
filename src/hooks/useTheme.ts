import { useState, useEffect } from 'react';
import { Theme } from '../types';
import { getInitialTheme, applyTheme } from '../utils/helpers';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};