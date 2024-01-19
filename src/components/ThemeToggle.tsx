'use client'
import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {theme === 'light' && <DarkModeOutlined />}
      {theme === 'dark' && <LightModeOutlined/>}
    </IconButton>
  );
};

export default ThemeToggle;
