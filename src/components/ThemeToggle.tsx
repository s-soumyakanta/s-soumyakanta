"use client"
import { useState } from 'react';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false)
  return (
    <button onClick={() => setIsDark(!isDark)}>
      {
        isDark ? <LightModeOutlinedIcon fontSize={'large'} /> : <DarkModeOutlinedIcon fontSize={'large'} />
      }
    </button>
  )
}

export default ThemeToggle