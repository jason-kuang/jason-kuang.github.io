import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className='flex justify-start py-8 px-4 grid-cols-4 sm:grid '>
        {mounted && (
          <button
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }
          >
            {resolvedTheme === 'light' ? "dark mode button" : "light mode button"}
          </button>
        )}
    </header>
  );
}