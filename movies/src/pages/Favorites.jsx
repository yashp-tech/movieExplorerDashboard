import { useSelector } from 'react-redux';
import MovieCard from '../features/movies/MovieCard';

const Favorites = () => {
  const favorites = useSelector((state) => state.movies.favorites);

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          No Favorites Yet
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add movies to your favorites to see them here!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        My Favorites ({favorites.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;

