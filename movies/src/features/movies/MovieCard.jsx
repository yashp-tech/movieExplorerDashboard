import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from './movieSlice';
import toast from 'react-hot-toast';

const MovieCard = memo(({ movie }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.movies.favorites);
  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  const handleClick = useCallback(() => {
    navigate(`/movie/${movie.imdbID}`);
  }, [navigate, movie.imdbID]);

  const handleFavoriteToggle = useCallback((e) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.imdbID));
      toast.error(`${movie.Title} removed from your favorites`);
    } else {
      dispatch(addToFavorites(movie));
      toast.success(`${movie.Title} added to your favorites`);
    }
  }, [dispatch, isFavorite, movie]);

  return (
    <div
      className="bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:scale-105 hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-all duration-300 border border-gray-100 dark:border-gray-800 group"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
          alt={movie.Title}
          className="w-full h-80 object-cover group-hover:brightness-90 transition duration-300"
        />
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg hover:scale-125 transition-transform border border-gray-200 dark:border-gray-700"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <span className={`text-2xl transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-400 group-hover:text-red-400'}`}>
            {isFavorite ? '❤️' : '♡'}
          </span>
        </button>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="text-lg font-bold text-white truncate drop-shadow-md">
            {movie.Title}
          </h3>
          <div className="flex justify-between items-center text-xs text-gray-200">
            <span>{movie.Year}</span>
            <span className="capitalize">{movie.Type}</span>
          </div>
          {movie.imdbRating && movie.imdbRating !== 'N/A' && (
            <div className="flex items-center gap-1 text-yellow-400 text-sm font-semibold mt-1 drop-shadow">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-4 h-4 inline-block"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
              {movie.imdbRating}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;

