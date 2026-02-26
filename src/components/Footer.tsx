const Footer = () => (
  <footer className="w-full bg-gradient-to-r text-white py-6 mt-12 shadow-inner">
    <div className="container mx-auto flex flex-col gap-6 md:gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:items-center md:space-x-8 w-full justify-between">
        <span className="font-semibold text-lg">Movie Explorer Dashboard © 2026</span>
        <nav className="flex gap-4 text-base font-medium">
          <a href="/privacy" className="hover:text-yellow-300 transition">Privacy Policy</a>
          <a href="/company" className="hover:text-yellow-300 transition">Company</a>
          <a href="/about" className="hover:text-yellow-300 transition">About</a>
          <a href="mailto:support@mzviess.com" className="hover:text-yellow-300 transition">Contact</a>
        </nav>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4 md:gap-8">
        <div className="flex gap-6 text-2xl">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-300 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.976 1.246 2.243 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.976.975-2.243 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.976-1.246-2.243-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.976-.975 2.243-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.401 3.678 1.382c-.981.981-1.251 2.093-1.31 3.374C2.013 5.668 2 6.077 2 9.333v5.334c0 3.256.013 3.665.072 4.946.059 1.281.329 2.393 1.31 3.374.981.981 2.093 1.251 3.374 1.31C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.329 3.374-1.31.981-.981 1.251-2.093 1.31-3.374.059-1.281.072-1.69.072-4.946V9.333c0-3.256-.013-3.665-.072-4.946-.059-1.281-.329-2.393-1.31-3.374-.981-.981-2.093-1.251-3.374-1.31C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-red-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M23.498 6.186a2.993 2.993 0 0 0-2.112-2.112C19.354 3.5 12 3.5 12 3.5s-7.354 0-9.386.574A2.993 2.993 0 0 0 .502 6.186C0 8.218 0 12 0 12s0 3.782.502 5.814a2.993 2.993 0 0 0 2.112 2.112C4.646 20.5 12 20.5 12 20.5s7.354 0 9.386-.574a2.993 2.993 0 0 0 2.112-2.112C24 15.782 24 12 24 12s0-3.782-.502-5.814zM9.545 15.568V8.432l6.545 3.568-6.545 3.568z"/></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="hover:text-gray-300 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M17.643 17.643l-5.643-5.643-5.643 5.643-1.414-1.414 5.643-5.643-5.643-5.643 1.414-1.414 5.643 5.643 5.643-5.643 1.414 1.414-5.643 5.643 5.643 5.643z"/></svg>
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-4 text-xs text-gray-300">
        <span>Powered by React, Vite, and Tailwind CSS</span>
      </div>
    </div>
  </footer>
);

export default Footer;
