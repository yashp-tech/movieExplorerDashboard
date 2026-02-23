import { Link, NavLink } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

const Navbar = () => {
	const [theme, toggleTheme] = useTheme();

	return (
		<nav className="bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 shadow-lg rounded-b-2xl mb-8">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<Link to="/" className="flex items-center gap-3 text-2xl font-extrabold text-white tracking-wide">
					<span className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-white rounded-full px-5 py-2 font-black text-xl shadow-lg border-4 border-white/30 drop-shadow-lg tracking-widest uppercase transition-transform duration-300 hover:scale-105 hover:rotate-[-3deg]">
						mzviess
					</span>
					<span className="hidden sm:inline-block"></span>
				</Link>
				<div className="flex items-center gap-6">
					<NavLink
						to="/"
						className={({ isActive }) =>
							`text-lg font-medium px-3 py-2 rounded transition-colors duration-200 ${isActive ? 'bg-white/20 text-white shadow' : 'text-white hover:bg-white/10'}`
						}
						end
					>
						Home
					</NavLink>
					<NavLink
						to="/favorites"
						className={({ isActive }) =>
							`text-lg font-medium px-3 py-2 rounded transition-colors duration-200 ${isActive ? 'bg-white/20 text-white shadow' : 'text-white hover:bg-white/10'}`
						}
					>
						Favorites
					</NavLink>
					<button
						className="ml-4 px-3 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors shadow"
						aria-label="Toggle dark mode"
						onClick={toggleTheme}
					>
						{theme === 'dark' ? '🌙' : '☀️'}
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

