import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchMovies } from './MovieSlice';
import MovieCard from './MovieCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import useDebounce from '../hooks/useDebounce';

interface MovieGridProps {
  searchQuery: string;
  type: string;
  genre: string;
  page: number;
  actorQuery: string;
  language?: string;
}

const MovieGrid = ({ searchQuery, type, genre, page, actorQuery, language }: MovieGridProps) => {
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector((state) => state.movies);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const debouncedActor = useDebounce(actorQuery, 500);

  const isUpcoming = type === 'upcoming';

  const combinedQuery = useMemo(() => {
    // Only append language if not empty and not 'All Languages'
    const shouldAppendLang = language && language !== '' && language.toLowerCase() !== 'all languages';
    const langSuffix = shouldAppendLang && debouncedSearch ? ` ${language}` : '';
    if (debouncedActor) {
      return debouncedActor;
    }
    if (isUpcoming) {
      return `${debouncedSearch || '2025 2026'}`;
    }
    if (genre && genre !== '') {
      if (debouncedSearch && debouncedSearch !== '') {
        return `${debouncedSearch} ${genre}${langSuffix}`;
      }
      return `${genre}`;
    }
    return `${debouncedSearch}${langSuffix}`;
  }, [debouncedSearch, debouncedActor, genre, isUpcoming, language]);

  const apiType = isUpcoming ? 'movie' : type;

  useEffect(() => {
    dispatch(fetchMovies({
      query: combinedQuery,
      page,
      type: debouncedActor ? 'movie' : apiType,
    }));
  }, [dispatch, combinedQuery, page, apiType, debouncedActor]);

  const memoizedMovies = useMemo(() => movies, [movies]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (memoizedMovies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          No movies found. Try a different search.
        </p>
      </div>
    );
  }

  return (
    <>
      {debouncedActor && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🎭</span>
          <h2 className="text-lg font-bold text-yellow-400">Movies featuring "{debouncedActor}"</h2>
        </div>
      )}
      {isUpcoming && !debouncedActor && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🗓️</span>
          <h2 className="text-lg font-bold text-yellow-400">Upcoming &amp; Recent Movies (2025–2026)</h2>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {memoizedMovies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MovieGrid;
