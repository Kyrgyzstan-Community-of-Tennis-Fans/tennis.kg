import React from 'react';
import { useTheme } from '@/ThemeProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className='p-2 rounded-md bg-transparent text-secondary'>
      {theme === 'dark' ? <SunIcon className={'size-5 text-white'} /> : <MoonIcon className={'size-5'} />}
    </button>
  );
};

export default ThemeSwitcher;
