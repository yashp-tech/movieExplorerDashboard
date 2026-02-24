import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from './movieSlice';
import MovieCard from './MovieCard';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/ErrorMessage';
import useDebounce from '../../hooks/useDebounce';

const MovieGrid = ({ searchQuery, type, page }) => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    dispatch(fetchMovies({ 
      query: debouncedSearch, 
      page, 
      type 
    }));
  }, [dispatch, debouncedSearch, page, type]);

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {memoizedMovies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;

