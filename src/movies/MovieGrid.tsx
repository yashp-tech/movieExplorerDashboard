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
}

const MovieGrid = ({ searchQuery, type, genre, page }: MovieGridProps) => {
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector((state) => state.movies);
  const debouncedSearch = useDebounce(searchQuery, 500);

  const combinedQuery = useMemo(() => {
    if (genre && genre !== '') {
      if (debouncedSearch && debouncedSearch !== '') {
        return `${debouncedSearch} ${genre}`;
      }
      return genre;
    }
    return debouncedSearch;
  }, [debouncedSearch, genre]);

  useEffect(() => {
    dispatch(fetchMovies({
      query: combinedQuery,
      page,
      type,
    }));
  }, [dispatch, combinedQuery, page, type]);

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
      {memoizedMovies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
