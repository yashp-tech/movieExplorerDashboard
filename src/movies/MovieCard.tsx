import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addToFavorites, removeFromFavorites } from '../redux/MovieSlice';
import { fetchMovieById } from '../api/MovieAPI';
import type { Movie } from '../types/movie';
import toast from 'react-hot-toast';
import useTranslatedText from '../hooks/useTranslatedText';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = memo(({ movie }: MovieCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.movies.favorites);
  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
  const [hoverPlot, setHoverPlot] = useState<string | null>(null);
  const [hoverActors, setHoverActors] = useState<string | null>(null);
  const [plotLoading, setPlotLoading] = useState(false);

  const { translated: translatedTitle } = useTranslatedText(movie.Title);
  const { translated: translatedPlot, translating: plotTranslating } = useTranslatedText(hoverPlot ?? '');

  const handleMouseEnter = useCallback(async () => {
    if (hoverPlot) return;
    setPlotLoading(true);
    try {
      const details = await fetchMovieById(movie.imdbID);
      setHoverPlot(details.Plot || null);
      if (details.Actors && details.Actors !== 'N/A') {
        // Take only first 3 actors
        const top3 = details.Actors.split(',').slice(0, 3).map(a => a.trim()).join(', ');
        setHoverActors(top3);
      }
    } catch {
      setHoverPlot(null);
      setHoverActors(null);
    } finally {
      setPlotLoading(false);
    }
  }, [movie.imdbID, hoverPlot]);

  const handleClick = useCallback(() => {
    navigate(`/movie/${movie.imdbID}`);
  }, [navigate, movie.imdbID]);

  const handleFavoriteToggle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.imdbID));
      toast.success(`${movie.Title} removed from your favorites`);
    } else {
      dispatch(addToFavorites(movie));
      toast.success(`${movie.Title} added to your favorites`);
    }
  }, [dispatch, isFavorite, movie]);

  return (
    <div
      className="rounded-2xl shadow-2xl overflow-visible cursor-pointer hover:scale-110 hover:z-50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-all duration-300 border border-gray-200 dark:border-gray-800 group relative bg-white dark:bg-gray-900"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <div className="relative rounded-2xl">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
          alt={movie.Title}
          className="w-full h-80 object-cover group-hover:brightness-50 transition duration-300 rounded-2xl"
        />
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-2 right-2 z-10 p-1 transition-transform hover:scale-125"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={`w-7 h-7 drop-shadow-lg transition-colors duration-200 ${isFavorite ? 'fill-red-500 stroke-red-500' : 'fill-transparent stroke-white group-hover:stroke-red-400'}`}
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Default bottom info — hidden on hover */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 group-hover:opacity-0 transition-opacity duration-300">
          <h3 className="text-lg font-bold text-white truncate drop-shadow-md">{translatedTitle}</h3>
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

        {/* Hover overlay with full details */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/95 via-black/70 to-black/30 rounded-2xl">
          <h3 className="text-base font-bold text-white leading-tight mb-1 drop-shadow-lg line-clamp-2">{translatedTitle}</h3>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs text-yellow-300 font-semibold">{movie.Year}</span>
            <span className="text-xs text-gray-300 capitalize bg-white/10 px-2 py-0.5 rounded-full">{movie.Type}</span>
            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <span className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" className="w-3 h-3"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                {movie.imdbRating}
              </span>
            )}
          </div>
          <div className="mt-2">
            {(plotLoading || plotTranslating) && (
              <p className="text-xs text-gray-300 italic">Loading description...</p>
            )}
            {!plotLoading && !plotTranslating && translatedPlot && (
              <p className="text-xs text-gray-200 leading-relaxed line-clamp-3">{translatedPlot}</p>
            )}
            {!plotLoading && !plotTranslating && !translatedPlot && (
              <p className="text-xs text-gray-400 italic">No description available.</p>
            )}
            {!plotLoading && hoverActors && (
              <p className="text-xs text-gray-300 mt-2">
                <span className="text-yellow-400 font-semibold">Starring: </span>
                {hoverActors}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;
