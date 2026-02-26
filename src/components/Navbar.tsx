import { Link, NavLink } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

const Navbar = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <nav className="bg-gradient-to-r shadow-lg rounded-b-2xl mb-8 bg-black">
      <div className="container mx-auto px-4 py-4 grid grid-cols-3 items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-3 text-2xl font-extrabold text-white tracking-wide">
            <span className="bg-gradient-to-r  text-white rounded-full px-5 py-2 font-black text-xl shadow-lg border-4 border-white/30 drop-shadow-lg tracking-widest uppercase transition-transform duration-300 hover:scale-105 hover:rotate-[-3deg] focus:outline-none focus:ring-2 border-yellow-400 focus:ring-yellow-400/60 focus:ring-offset-2">
              mzviess
            </span>
            <span className="hidden sm:inline-block"></span>
          </Link>
        </div>
        <div className="flex justify-center">
          <span className="italic text-base text-yellow-200 text-center block whitespace-nowrap">Discover, explore, and save your favorite movies and series!</span>
        </div>
        <div className="flex items-center justify-end gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium px-3 py-2 rounded transition-colors duration-200 ${isActive ? ' text-white shadow' : 'text-white hover:text-yellow-400 hover:scale-105 hover:bg-yellow/10'}`
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `text-lg font-medium px-3 py-2 rounded transition-colors duration-200 ${isActive ? ' text-white shadow' : 'text-white  hover:text-yellow-400  hover:bg-yellow/10'}`
            }
          >
            Favorites
          </NavLink>
          <button
            className="ml-4 px-3 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors shadow"
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
          >
            {theme === 'dark' ? '🌙' : '🌞'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
