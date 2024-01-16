'use client'

import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import {DarkModeOutlined, DesktopMacOutlined, LightModeOutlined } from '@mui/icons-material';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('system');

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      setTheme(currentTheme);
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDarkMode ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    let newTheme = '';
    switch (theme) {
      case 'system':
        newTheme = 'light';
        break;
      case 'light':
        newTheme = 'dark';
        break;
      case 'dark':
        newTheme = 'system';
        break;
      default:
        newTheme = 'system';
    }

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {theme === 'system' && <DesktopMacOutlined />}
      {theme === 'light' && <LightModeOutlined />}
      {theme === 'dark' && <DarkModeOutlined />}
    </IconButton>
  );
};

export default ThemeToggle;
