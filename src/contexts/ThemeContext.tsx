import React, { createContext, useContext, type ReactNode } from 'react';

interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textLight: string;
    success: string;
    warning: string;
    error: string;
  };
}

const defaultTheme: Theme = {
  colors: {
    primary: '#7c3aed',
    secondary: '#8b5cf6',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#1f2937',
    textLight: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  }
};

const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {children}
    </ThemeContext.Provider>
  );
};