'use client'
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';

const ThemeToggler = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    // Toggle the dark mode state
    setIsDarkMode(!isDarkMode);

    // Apply the dark mode class to the document
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {isDarkMode ? <LightModeOutlined /> : <DarkModeOutlined />}
    </IconButton>
  );
};

export default ThemeToggler;
