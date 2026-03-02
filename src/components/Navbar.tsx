import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useTheme from '../hooks/useTheme';
import useLanguage from '../hooks/useLanguage';
import { LANGUAGES } from '../utils/languageConstants';

const Navbar = () => {
  const [theme, toggleTheme] = useTheme();
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r shadow-lg rounded-b-2xl mb-8 bg-black">
      <div className="container mx-auto px-2 py-3 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 md:grid md:grid-cols-3 md:gap-0">
        <div className="flex items-center min-w-0 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-extrabold text-white tracking-wide min-w-0">
            <span className="bg-gradient-to-r text-white rounded-full px-3 md:px-5 py-2 font-black text-lg md:text-xl shadow-lg border-4 border-white/30 drop-shadow-lg tracking-widest uppercase transition-transform duration-300 hover:scale-105 hover:rotate-[-3deg] focus:outline-none focus:ring-2 border-yellow-400 focus:ring-yellow-400/60 focus:ring-offset-2">
              mzviess
            </span>
            <span className="hidden sm:inline-block"></span>
          </Link>
        </div>
        <div className="w-full md:w-auto flex justify-center md:justify-center order-3 md:order-none mt-2 md:mt-0">
          <span className="italic text-sm md:text-base text-yellow-200 text-center block whitespace-nowrap truncate max-w-full">Discover, explore, and save your favorite movies and series!</span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2 md:gap-6 min-w-0">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-base md:text-lg font-medium px-2 md:px-3 py-1.5 md:py-2 rounded transition-colors duration-200 ${isActive ? ' text-white shadow' : 'text-white hover:text-yellow-400 hover:scale-105 hover:bg-yellow/10'}`
            }
            end
          >
            ⚛️ Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `text-base md:text-lg font-medium px-2 md:px-3 py-1.5 md:py-2 rounded transition-colors duration-200 ${isActive ? ' text-white shadow' : 'text-white hover:text-yellow-400 hover:bg-yellow/10'}`
            }
          >
            Favorites
          </NavLink>

          {/* Language Selector */}
          <div className="relative min-w-[120px]" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-white/10 text-white hover:bg-yellow-400/20 hover:text-yellow-400 transition-colors duration-200 font-medium text-xs md:text-sm border border-white/20 w-full md:w-auto"
              aria-label="Select language"
            >
              <span>{selectedLanguage.flag}</span>
              <span className="hidden sm:inline">{selectedLanguage.label}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 md:w-48 bg-gray-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code || 'all'}
                    onClick={() => { setSelectedLanguage(lang); setDropdownOpen(false); }}
                    className={`w-full flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 text-xs md:text-sm transition-colors duration-150 ${
                      selectedLanguage.code === lang.code
                        ? 'bg-yellow-400/20 text-yellow-400 font-semibold'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                    {selectedLanguage.code === lang.code && (
                      <span className="ml-auto text-yellow-400">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="ml-1 md:ml-2 px-2 md:px-3 py-1.5 md:py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors shadow"
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
