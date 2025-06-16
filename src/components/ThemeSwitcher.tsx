import { useEffect, useState } from 'react';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <select
      className="select select-bordered w-fit"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      {['light','dark'].map(t => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  );
};
