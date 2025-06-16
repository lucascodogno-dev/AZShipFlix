import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeSwitcher } from './ThemeSwitcher';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

export const Header = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(html.getAttribute('data-theme') || 'light');
    });

    observer.observe(html, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    setTheme(html.getAttribute('data-theme') || 'light');
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [isMobile, sidebarOpen]);

  useEffect(() => {
    const closeSidebar = () => setSidebarOpen(false);
    window.addEventListener('click', closeSidebar);
    return () => window.removeEventListener('click', closeSidebar);
  }, []);

  const handleSidebarClick = (e: React.MouseEvent) => e.stopPropagation();

  const navLinkStyle = (path: string) =>
    `px-4 py-2 rounded-full transition-all duration-300 ${
      location.pathname === path
        ? 'bg-pink-500 text-white font-semibold shadow-md'
        : theme === 'dark'
        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
        : 'text-gray-700 hover:bg-pink-100 hover:text-pink-600'
    }`;

  const mobileNavLinkStyle = (path: string) =>
    `block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
      location.pathname === path
        ? 'bg-pink-600 text-white'
        : theme === 'dark'
        ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
        : 'text-gray-900 hover:bg-pink-100 hover:text-pink-600'
    }`;

  const headerClasses = `sticky top-0 z-50 transition-all duration-300 ${
    theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
  } ${isScrolled ? 'bg-opacity-90 backdrop-blur-sm shadow-sm' : 'bg-opacity-100'}`;

  return (
    <>
      <header className={headerClasses}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link
                to="/"
                className={`font-bold text-2xl transition-colors flex items-center ${
                  theme === 'dark' ? 'text-white hover:text-pink-400' : 'text-gray-800 hover:text-pink-500'
                }`}
              >
                <span className="mr-2">🎬</span>
                AZShipFlix
              </Link>
            </div>

            {!isMobile && (
              <div className="flex items-center space-x-2">
                <Link to="/" className={navLinkStyle('/')}>Início</Link>
                <Link to="/favorites" className={navLinkStyle('/favorites')}>Favoritos</Link>
                <Link to="/characters" className={navLinkStyle('/characters')}>Personagens</Link>
              </div>
            )}

            <div className="flex items-center space-x-4">
              {!isMobile && <ThemeSwitcher />}

              {isMobile && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSidebarOpen(!sidebarOpen);
                  }}
                  className={`inline-flex items-center justify-center p-2 rounded-md ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-pink-400'
                      : 'text-gray-600 hover:text-pink-500'
                  } focus:outline-none`}
                  aria-expanded="false"
                >
                  <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40">
            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`relative flex flex-col w-80 h-full shadow-xl backdrop-blur-sm transition-colors duration-300 ${
                theme === 'dark' ? 'bg-gray-900/95 text-white' : 'bg-white/80 text-gray-900'
              }`}
              onClick={handleSidebarClick}
            >
              <div
                className={`px-6 pt-6 pb-4 flex items-center justify-between border-b transition-colors ${
                  theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
                }`}
              >
                <div className="font-bold text-xl flex items-center">
                  <span className="mr-2">🍿</span> Menu
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className={`p-2 rounded-full transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-2">
                <Link to="/" className={mobileNavLinkStyle('/')} onClick={() => setSidebarOpen(false)}>Início</Link>
                <Link to="/favorites" className={mobileNavLinkStyle('/favorites')} onClick={() => setSidebarOpen(false)}>Favoritos</Link>
                <Link to="/characters" className={mobileNavLinkStyle('/characters')} onClick={() => setSidebarOpen(false)}>Personagens</Link>
              </nav>

              <div className={`p-6 border-t transition-colors ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}>Alternar tema</span>
                  <ThemeSwitcher />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
