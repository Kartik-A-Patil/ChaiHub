
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'react-native';


export interface ThemeColors {
  primary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  card: string;
  notification: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}


export const lightTheme: ThemeColors = {
  primary: '#D4AF37',
  background: '#fff',
  surface: '#F8F9FA',
  text: '#212529',
  textSecondary: '#6C757D',
  border: '#E9ECEF',
  card: '#fff',
  notification: '#FF6B6B',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};


export const darkTheme: ThemeColors = {
  primary: '#FFD700',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#fff',
  textSecondary: '#B0B0B0',
  border: '#333',
  card: '#2C2C2C',
  notification: '#FF5722',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
};


interface ThemeContextType {
  isDarkMode: boolean;
  theme: ThemeColors;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const pref = await AsyncStorage.getItem('theme_preference');
        if (pref) setIsDarkMode(pref === 'dark');
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true);
  }, [isDarkMode]);

  const saveTheme = async (isDark: boolean) => {
    try {
      await AsyncStorage.setItem('theme_preference', isDark ? 'dark' : 'light');
    } catch {}
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      saveTheme(!prev);
      return !prev;
    });
  };

  const setTheme = (isDark: boolean) => {
    setIsDarkMode(isDark);
    saveTheme(isDark);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
};
